import fs from "node:fs/promises";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const OUT_DIR = path.resolve("docs");
const OUT_FILE = path.join(OUT_DIR, "VP-TECHNOLOGIES-Client-Presentation.pdf");

// Page geometry
const PW = 1280;
const PH = 720;
const PANEL = 290;          // left panel width
const CX = PANEL + 46;      // right content start x
const CW = PW - PANEL - 70; // right content width (~964px)

// Design tokens
const C = {
  navy:    rgb(0.04, 0.09, 0.20),
  navyMid: rgb(0.07, 0.14, 0.28),
  blue:    rgb(0.09, 0.40, 0.95),
  blueL:   rgb(0.28, 0.56, 1.00),
  cyan:    rgb(0.05, 0.72, 0.88),
  teal:    rgb(0.10, 0.68, 0.52),
  amber:   rgb(0.97, 0.63, 0.14),
  white:   rgb(1.00, 1.00, 1.00),
  ink:     rgb(0.06, 0.09, 0.18),
  inkMid:  rgb(0.14, 0.20, 0.34),
  dim:     rgb(0.36, 0.46, 0.60),
  border:  rgb(0.83, 0.89, 0.97),
  soft:    rgb(0.95, 0.97, 1.00),
  pText:   rgb(0.88, 0.93, 1.00),
  pDim:    rgb(0.46, 0.62, 0.82),
};

// ─── Text utilities ──────────────────────────────────────────────────────────

function drawStr(page, str, x, y, size, font, color) {
  page.drawText(String(str), { x, y, size, font, color });
}

function drawCentered(page, str, cx, y, size, font, color) {
  const w = font.widthOfTextAtSize(String(str), size);
  page.drawText(String(str), { x: cx - w / 2, y, size, font, color });
}

function drawWrapped(page, str, x, y, maxW, size, font, color, leading) {
  const lh = leading ?? Math.round(size * 1.52);
  const words = String(str).split(" ");
  let line = "";
  let cy = y;
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) > maxW && line) {
      page.drawText(line, { x, y: cy, size, font, color });
      cy -= lh;
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) {
    page.drawText(line, { x, y: cy, size, font, color });
    cy -= lh;
  }
  return cy;
}

// ─── Layout primitives ───────────────────────────────────────────────────────

function drawPageShell(page, fonts, category, slideNum, decFn) {
  // White right area
  page.drawRectangle({ x: PANEL, y: 0, width: PW - PANEL, height: PH, color: C.white });
  // Navy left panel
  page.drawRectangle({ x: 0, y: 0, width: PANEL, height: PH, color: C.navy });
  // Blue hairline separating panel from content
  page.drawRectangle({ x: PANEL - 4, y: 0, width: 4, height: PH, color: C.blue });

  // Brand block
  drawStr(page, "VP TECHNOLOGIES", 24, PH - 37, 15, fonts.bold, C.white);
  drawStr(page, "https://vp-tech.ro", 24, PH - 57, 9, fonts.regular, C.pDim);
  page.drawRectangle({ x: 24, y: PH - 67, width: PANEL - 48, height: 1, color: C.blue, opacity: 0.35 });

  // Category + slide number in panel footer
  drawStr(page, category.toUpperCase(), 24, 62, 7.5, fonts.regular, C.pDim);
  page.drawCircle({ x: PANEL / 2, y: 32, size: 18, color: C.blue });
  drawCentered(page, slideNum, PANEL / 2, 26, 12, fonts.bold, C.white);

  // Content footer line
  page.drawRectangle({ x: PANEL + 4, y: 50, width: PW - PANEL - 4, height: 1, color: C.border });
  drawStr(page, "VP TECHNOLOGIES  \u00b7  Confidential", CX, 20, 8, fonts.regular, C.dim);

  // Per-slide illustration in panel
  if (decFn) decFn(page, fonts);
}

function drawSlideTag(page, fonts, label, accent) {
  // 4px color bar across the top of the right area
  page.drawRectangle({ x: PANEL, y: PH - 4, width: PW - PANEL, height: 4, color: accent });
  // Tag pill
  page.drawRectangle({ x: CX, y: PH - 30, width: 3, height: 20, color: accent });
  drawStr(page, label.toUpperCase(), CX + 10, PH - 28, 9, fonts.regular, accent);
}

function drawServiceRow(page, fonts, { x, y, w, h, accent, tag, title, body }) {
  page.drawRectangle({ x, y, width: w, height: h, color: C.soft, borderColor: C.border, borderWidth: 1 });
  // Left accent bar
  page.drawRectangle({ x, y, width: 6, height: h, color: accent });
  drawStr(page, tag, x + 20, y + h - 22, 8.5, fonts.regular, accent);
  drawStr(page, title, x + 20, y + h - 44, 19, fonts.bold, C.ink);
  drawWrapped(page, body, x + 20, y + h - 70, w - 40, 12, fonts.regular, C.dim, 17);
}

function drawPhaseRow(page, fonts, { x, y, w, h, accent, phaseLabel, title, body }) {
  page.drawRectangle({ x, y, width: w, height: h, color: C.soft, borderColor: C.border, borderWidth: 1 });
  page.drawRectangle({ x, y, width: 6, height: h, color: accent });
  // Phase number circle
  page.drawCircle({ x: x + 36, y: y + h / 2, size: 22, color: accent, opacity: 0.15 });
  drawCentered(page, phaseLabel, x + 36, y + h / 2 - 7, 14, fonts.bold, accent);
  drawStr(page, title, x + 72, y + h - 38, 20, fonts.bold, C.ink);
  drawWrapped(page, body, x + 72, y + h - 64, w - 92, 12.5, fonts.regular, C.dim, 18);
}

function drawInfoCard(page, fonts, { x, y, w, h, accent, label, title, body }) {
  page.drawRectangle({ x, y, width: w, height: h, color: C.soft, borderColor: C.border, borderWidth: 1 });
  // Top accent bar
  page.drawRectangle({ x, y: y + h - 5, width: w, height: 5, color: accent });
  if (label) drawStr(page, label.toUpperCase(), x + 16, y + h - 24, 8, fonts.regular, accent);
  const titleY = label ? y + h - 44 : y + h - 28;
  drawStr(page, title, x + 16, titleY, 15, fonts.bold, C.ink);
  drawWrapped(page, body, x + 16, titleY - 24, w - 32, 12, fonts.regular, C.dim, 17);
}

function drawStatBox(page, fonts, { x, y, w, h, accent, value, sub, label }) {
  page.drawRectangle({ x, y, width: w, height: h, color: C.soft, borderColor: accent, borderWidth: 1 });
  page.drawRectangle({ x, y: y + h - 5, width: w, height: 5, color: accent });
  drawCentered(page, value, x + w / 2, y + h / 2 + 8, 38, fonts.bold, accent);
  if (sub) drawCentered(page, sub, x + w / 2, y + h / 2 - 18, 20, fonts.bold, accent);
  drawCentered(page, label, x + w / 2, y + 14, 11, fonts.regular, C.dim);
}

// ─── Panel illustrations (per slide) ─────────────────────────────────────────

function decRadar(page) {
  const cx = PANEL / 2;
  const cy = 338;
  [118, 92, 68, 46, 26, 10].forEach((r, i) => {
    page.drawCircle({ x: cx, y: cy, size: r, color: C.blue, opacity: 0.03 + i * 0.028 });
  });
  page.drawCircle({ x: cx, y: cy, size: 10, color: C.blueL });
  page.drawLine({ start: { x: cx - 112, y: cy }, end: { x: cx + 112, y: cy }, color: C.blue, thickness: 0.7, opacity: 0.18 });
  page.drawLine({ start: { x: cx, y: cy - 112 }, end: { x: cx, y: cy + 112 }, color: C.blue, thickness: 0.7, opacity: 0.18 });
  page.drawLine({ start: { x: cx - 80, y: cy - 80 }, end: { x: cx + 80, y: cy + 80 }, color: C.blue, thickness: 0.5, opacity: 0.10 });
  page.drawLine({ start: { x: cx + 80, y: cy - 80 }, end: { x: cx - 80, y: cy + 80 }, color: C.blue, thickness: 0.5, opacity: 0.10 });
  // Orbit ring
  page.drawCircle({ x: cx, y: cy, size: 92, color: C.navy, borderColor: C.blue, borderWidth: 0.8, borderOpacity: 0.30 });
}

function decTriangle(page) {
  const cx = PANEL / 2;
  page.drawCircle({ x: cx - 38, y: 395, size: 58, color: C.amber, opacity: 0.11 });
  page.drawCircle({ x: cx + 38, y: 395, size: 58, color: C.cyan, opacity: 0.11 });
  page.drawCircle({ x: cx, y: 320, size: 58, color: C.teal, opacity: 0.11 });
  page.drawCircle({ x: cx - 38, y: 395, size: 10, color: C.amber, opacity: 0.65 });
  page.drawCircle({ x: cx + 38, y: 395, size: 10, color: C.cyan, opacity: 0.65 });
  page.drawCircle({ x: cx, y: 320, size: 10, color: C.teal, opacity: 0.65 });
  page.drawLine({ start: { x: cx - 38, y: 395 }, end: { x: cx + 38, y: 395 }, color: C.pDim, thickness: 1, opacity: 0.3 });
  page.drawLine({ start: { x: cx - 38, y: 395 }, end: { x: cx, y: 320 }, color: C.pDim, thickness: 1, opacity: 0.3 });
  page.drawLine({ start: { x: cx + 38, y: 395 }, end: { x: cx, y: 320 }, color: C.pDim, thickness: 1, opacity: 0.3 });
}

function decPillars(page) {
  const cx = PANEL / 2;
  const bw = 220;
  const bx = cx - bw / 2;
  const bars = [{ y: 456, c: C.blue }, { y: 398, c: C.teal }, { y: 340, c: C.cyan }];
  bars.forEach(b => {
    page.drawRectangle({ x: bx, y: b.y, width: bw, height: 42, color: b.c, opacity: 0.16, borderColor: b.c, borderWidth: 1 });
    page.drawRectangle({ x: bx, y: b.y, width: 5, height: 42, color: b.c, opacity: 0.6 });
  });
  page.drawLine({ start: { x: cx, y: 340 }, end: { x: cx, y: 248 }, color: C.pDim, thickness: 1, opacity: 0.35 });
  page.drawCircle({ x: cx, y: 248, size: 8, color: C.blueL });
  page.drawCircle({ x: cx, y: 248, size: 18, color: C.blue, opacity: 0.14 });
}

function decPhaseFlow(page, fonts) {
  const cx = PANEL / 2;
  const ys = [460, 350, 240];
  ys.forEach((y, i) => {
    if (i < ys.length - 1) {
      page.drawLine({ start: { x: cx, y: y - 26 }, end: { x: cx, y: ys[i + 1] + 26 }, color: C.blue, thickness: 1.5, opacity: 0.28 });
    }
    page.drawCircle({ x: cx, y, size: 26, color: C.blue, opacity: 0.12 });
    page.drawCircle({ x: cx, y, size: 14, color: C.blueL });
    drawCentered(page, i + 1, cx, y - 6, 13, fonts.bold, C.white);
  });
}

function decBarchart(page) {
  const cx = PANEL / 2;
  const bars = [
    { h: 160, c: C.blue },
    { h: 120, c: C.teal },
    { h: 175, c: C.cyan },
    { h: 140, c: C.blueL },
  ];
  const bw = 36;
  const gap = 14;
  const totalW = bars.length * bw + (bars.length - 1) * gap;
  let bx = cx - totalW / 2;
  const baseY = 200;
  page.drawLine({ start: { x: bx - 12, y: baseY }, end: { x: bx + totalW + 12, y: baseY }, color: C.pDim, thickness: 1 });
  for (const b of bars) {
    page.drawRectangle({ x: bx, y: baseY, width: bw, height: b.h, color: b.c, opacity: 0.68 });
    bx += bw + gap;
  }
}

function decShield(page) {
  const cx = PANEL / 2;
  const sy = 370;
  page.drawSvgPath(
    `M ${cx} ${sy + 82} L ${cx + 68} ${sy + 36} L ${cx + 68} ${sy - 40} L ${cx} ${sy - 82} L ${cx - 68} ${sy - 40} L ${cx - 68} ${sy + 36} Z`,
    { color: C.blue, opacity: 0.12 }
  );
  page.drawLine({ start: { x: cx - 24, y: sy - 4 }, end: { x: cx - 6, y: sy - 24 }, color: C.teal, thickness: 4 });
  page.drawLine({ start: { x: cx - 6, y: sy - 24 }, end: { x: cx + 30, y: sy + 18 }, color: C.teal, thickness: 4 });
  // Orbiting dots
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const r = 96;
    page.drawCircle({
      x: cx + Math.round(Math.cos(angle) * r),
      y: sy + Math.round(Math.sin(angle) * r),
      size: 3.5,
      color: C.blueL,
      opacity: 0.45,
    });
  }
}

function decLaunch(page) {
  const cx = PANEL / 2;
  const cy = 360;
  page.drawCircle({ x: cx, y: cy, size: 100, color: C.blue, opacity: 0.06 });
  page.drawCircle({ x: cx, y: cy, size: 66, color: C.blue, opacity: 0.10 });
  page.drawCircle({ x: cx, y: cy, size: 34, color: C.blueL, opacity: 0.44 });
  page.drawLine({ start: { x: cx - 16, y: cy }, end: { x: cx + 16, y: cy }, color: C.white, thickness: 3.5 });
  page.drawLine({ start: { x: cx + 4, y: cy - 11 }, end: { x: cx + 16, y: cy }, color: C.white, thickness: 3.5 });
  page.drawLine({ start: { x: cx + 4, y: cy + 11 }, end: { x: cx + 16, y: cy }, color: C.white, thickness: 3.5 });
}

// ─── Build deck ──────────────────────────────────────────────────────────────

async function build() {
  const pdf = await PDFDocument.create();
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const fonts = { regular, bold };
  let n = 1;

  // ── Slide 1: Cover ────────────────────────────────────────────────────────
  {
    const page = pdf.addPage([PW, PH]);
    drawPageShell(page, fonts, "Company Profile", n++, decRadar);
    drawSlideTag(page, fonts, "Company Profile", C.blue);

    drawStr(page, "Build a business that technology", CX, 624, 40, bold, C.ink);
    drawStr(page, "never slows down.", CX, 578, 40, bold, C.blue);

    drawWrapped(
      page,
      "VP TECHNOLOGIES is the strategic IT execution partner for growing companies. We combine infrastructure, cybersecurity, cloud, and custom software delivery under one accountable team — focused on measurable business outcomes.",
      CX, 542, CW, 15, regular, C.dim, 24,
    );

    const boxW = 284, boxH = 152, boxY = 70;
    const stats = [
      { value: "15+", sub: null,     label: "Technology services covered", accent: C.blue },
      { value: "24",  sub: "/ 7",    label: "Support availability model",  accent: C.teal },
      { value: "3",   sub: "Models", label: "Flexible engagement formats",  accent: C.cyan },
    ];
    stats.forEach((s, i) => {
      const bx = CX + i * (boxW + 22);
      page.drawRectangle({ x: bx, y: boxY, width: boxW, height: boxH, color: C.soft, borderColor: s.accent, borderWidth: 1 });
      page.drawRectangle({ x: bx, y: boxY + boxH - 5, width: boxW, height: 5, color: s.accent });
      const vcx = bx + boxW / 2;
      if (s.sub) {
        drawCentered(page, s.value, vcx - 18, boxY + boxH / 2 + 8, 40, bold, s.accent);
        drawCentered(page, s.sub, vcx + 28, boxY + boxH / 2 + 10, 22, bold, s.accent);
      } else {
        drawCentered(page, s.value, vcx, boxY + boxH / 2 + 8, 40, bold, s.accent);
      }
      drawCentered(page, s.label, vcx, boxY + 16, 11, regular, C.dim);
    });
  }

  // ── Slide 2: The Challenge ────────────────────────────────────────────────
  {
    const page = pdf.addPage([PW, PH]);
    drawPageShell(page, fonts, "Market Context", n++, decTriangle);
    drawSlideTag(page, fonts, "Market Context", C.amber);

    drawStr(page, "Why companies struggle with IT.", CX, 634, 34, bold, C.ink);
    drawWrapped(
      page,
      "Fragmented vendors, reactive support, and limited executive visibility are not just operational inconveniences — they are direct risks to revenue, reputation, and growth.",
      CX, 596, CW, 14.5, regular, C.dim, 23,
    );

    const cW3 = Math.floor((CW - 44) / 3);
    const cH = 240, cY = 68;
    const challenges = [
      {
        accent: C.amber,
        label: "Operational Risk",
        title: "Every incident costs more than it should",
        body: "Recurring downtime, slow incident response, and reactive firefighting drain team capacity and damage customer trust. The cost is compounding.",
      },
      {
        accent: C.blue,
        label: "Security Exposure",
        title: "Unclear baselines leave critical gaps",
        body: "Without a security baseline, access governance, and incident playbooks, companies are exposed to threats that grow more costly with every passing month.",
      },
      {
        accent: C.teal,
        label: "Growth Friction",
        title: "Legacy systems block every initiative",
        body: "Disconnected platforms and manual workarounds slow down onboarding, expansion, and innovation. Teams waste capacity that should drive business value.",
      },
    ];
    challenges.forEach((ch, i) => {
      const cx = CX + i * (cW3 + 22);
      page.drawRectangle({ x: cx, y: cY, width: cW3, height: cH, color: C.soft, borderColor: C.border, borderWidth: 1 });
      page.drawRectangle({ x: cx, y: cY + cH - 5, width: cW3, height: 5, color: ch.accent });
      drawStr(page, ch.label.toUpperCase(), cx + 16, cY + cH - 24, 8, regular, ch.accent);
      drawStr(page, ch.title, cx + 16, cY + cH - 46, 14, bold, C.ink);
      drawWrapped(page, ch.body, cx + 16, cY + cH - 74, cW3 - 32, 12, regular, C.dim, 17);
    });
  }

  // ── Slide 3: Service Architecture ────────────────────────────────────────
  {
    const page = pdf.addPage([PW, PH]);
    drawPageShell(page, fonts, "Service Architecture", n++, decPillars);
    drawSlideTag(page, fonts, "Service Architecture", C.blue);

    drawStr(page, "Full-spectrum IT. One team.", CX, 634, 34, bold, C.ink);
    drawWrapped(
      page,
      "Three integrated service pillars deliver complete technology coverage — from foundational infrastructure to digital innovation.",
      CX, 596, CW, 14.5, regular, C.dim, 23,
    );

    const rowH = 132, rowGap = 16;
    const serviceRows = [
      {
        accent: C.blue,
        tag: "INFRASTRUCTURE & CLOUD",
        title: "Servers, Cloud Operations & Daily Support",
        body: "Windows and Linux administration, Microsoft 365 and Exchange Online, cPanel/WHM hosting governance, on-site and remote endpoint support — keeping operations stable and reliable every day.",
      },
      {
        accent: C.teal,
        tag: "NETWORK & CYBERSECURITY",
        title: "Networks, Security Controls & Hardening",
        body: "LAN/WAN design and physical cabling for commercial sites, firewall and VPN architecture, intrusion detection, and systematic security hardening for operational continuity.",
      },
      {
        accent: C.cyan,
        tag: "DIGITAL PLATFORMS & AI",
        title: "Web, Custom Software & Automation",
        body: "Web and eCommerce delivery, custom CRM/ERP platforms, AI workflow automation, and payment terminal integration — technology that directly drives revenue and efficiency.",
      },
    ];
    serviceRows.forEach((row, i) => {
      const ry = 68 + (serviceRows.length - 1 - i) * (rowH + rowGap);
      drawServiceRow(page, fonts, { x: CX, y: ry, w: CW, h: rowH, ...row });
    });
  }

  // ── Slide 4: Delivery Framework ──────────────────────────────────────────
  {
    const page = pdf.addPage([PW, PH]);
    drawPageShell(page, fonts, "Delivery Framework", n++, (p, f) => decPhaseFlow(p, f));
    drawSlideTag(page, fonts, "Delivery Framework", C.blue);

    drawStr(page, "Precision delivery, every time.", CX, 634, 34, bold, C.ink);
    drawWrapped(
      page,
      "Every engagement follows a structured three-phase model. Stakeholders get full visibility at each stage — no surprises, no ambiguity.",
      CX, 596, CW, 14.5, regular, C.dim, 23,
    );

    const phases = [
      {
        accent: C.blue,
        phaseLabel: "01",
        title: "Assess — Baseline, Priorities and Risk Map",
        body: "Business and technical audit, dependency review, risk identification, and executive-aligned success criteria before any implementation begins.",
      },
      {
        accent: C.teal,
        phaseLabel: "02",
        title: "Execute — Controlled Implementation",
        body: "Sequenced rollouts with milestone checkpoints, quality gates, and bi-directional reporting for leadership and technical stakeholders throughout delivery.",
      },
      {
        accent: C.cyan,
        phaseLabel: "03",
        title: "Optimize — Stabilize and Improve",
        body: "Post-delivery hardening, performance tuning, process documentation, and continuous improvement cycles tied directly to operational and commercial KPIs.",
      },
    ];
    const pBoxH = 118, pGap = 15;
    phases.forEach((ph, i) => {
      const py = 68 + (phases.length - 1 - i) * (pBoxH + pGap);
      drawPhaseRow(page, fonts, { x: CX, y: py, w: CW, h: pBoxH, ...ph });
    });
  }

  // ── Slide 5: Business Outcomes ───────────────────────────────────────────
  {
    const page = pdf.addPage([PW, PH]);
    drawPageShell(page, fonts, "Client Results", n++, decBarchart);
    drawSlideTag(page, fonts, "Client Results", C.teal);

    drawStr(page, "Technology that moves business forward.", CX, 634, 34, bold, C.ink);
    drawWrapped(
      page,
      "Clients working with VP TECHNOLOGIES gain measurable improvement across reliability, security posture, and execution velocity.",
      CX, 596, CW, 14.5, regular, C.dim, 23,
    );

    const leftW = Math.round(CW * 0.56);
    const rightX = CX + leftW + 36;
    const rightW = CW - leftW - 36;

    const outcomes = [
      { label: "System reliability and uptime",       pct: 0.92, accent: C.blue },
      { label: "Security posture and control coverage", pct: 0.86, accent: C.teal },
      { label: "Incident response speed",              pct: 0.88, accent: C.cyan },
      { label: "Project delivery velocity",            pct: 0.80, accent: C.blueL },
      { label: "Executive visibility and reporting",   pct: 0.94, accent: C.blue },
    ];
    let iy = 548;
    for (const item of outcomes) {
      drawStr(page, item.label, CX, iy, 13.5, bold, C.ink);
      iy -= 20;
      const fillW = Math.round(leftW * item.pct);
      page.drawRectangle({ x: CX, y: iy, width: leftW, height: 9, color: C.border });
      page.drawRectangle({ x: CX, y: iy, width: fillW, height: 9, color: item.accent });
      iy -= 32;
    }

    // Right: impact narrative card
    page.drawRectangle({ x: rightX, y: 68, width: rightW, height: 490, color: C.soft, borderColor: C.teal, borderWidth: 1 });
    page.drawRectangle({ x: rightX, y: 68 + 490 - 5, width: rightW, height: 5, color: C.teal });
    drawStr(page, "IMPACT STATEMENT", rightX + 16, 68 + 490 - 26, 8, regular, C.teal);
    drawWrapped(
      page,
      "When systems are reliable and secure, teams stop firefighting and start executing. Leadership gains the confidence to invest in growth. Technology stops being a bottleneck and becomes a competitive advantage.",
      rightX + 16, 68 + 490 - 56, rightW - 32, 13.5, regular, C.ink, 21,
    );
    // Bottom quote
    page.drawRectangle({ x: rightX + 16, y: 90, width: 3, height: 110, color: C.teal });
    drawWrapped(
      page,
      "Our goal is to make IT invisible — it just works, all the time.",
      rightX + 28, 180, rightW - 48, 12, regular, C.dim, 18,
    );
  }

  // ── Slide 6: Why VP TECHNOLOGIES ─────────────────────────────────────────
  {
    const page = pdf.addPage([PW, PH]);
    drawPageShell(page, fonts, "Competitive Advantage", n++, decShield);
    drawSlideTag(page, fonts, "Competitive Advantage", C.blue);

    drawStr(page, "The VP TECHNOLOGIES difference.", CX, 634, 34, bold, C.ink);
    drawWrapped(
      page,
      "Four principles separate us from traditional IT vendors and set the standard for how technology partnerships should work.",
      CX, 596, CW, 14.5, regular, C.dim, 23,
    );

    const gW = Math.floor((CW - 22) / 2);
    const gH = 214;
    const grid = [
      {
        x: CX,           y: 320,
        accent: C.blue,
        label: "ONE PARTNER",
        title: "Single accountability",
        body: "One team for infrastructure, security, network, and software. No finger-pointing between vendors, no coordination overhead, no accountability gaps.",
      },
      {
        x: CX + gW + 22, y: 320,
        accent: C.teal,
        label: "REPORTING",
        title: "Executive-level visibility",
        body: "Structured progress reporting for leadership at every stage. Clear status, identified risks, and decisions ready to act on — not just technical logs.",
      },
      {
        x: CX,           y: 86,
        accent: C.cyan,
        label: "EXPERTISE",
        title: "Deep multi-domain capability",
        body: "From server hardening to AI workflow automation, our team brings specialised expertise across every layer of modern business technology.",
      },
      {
        x: CX + gW + 22, y: 86,
        accent: C.amber,
        label: "CONTINUITY",
        title: "Built for the long term",
        body: "Managed services, project delivery, and advisory models that adapt to your growth stage — not one-and-done implementations that leave you exposed.",
      },
    ];
    for (const g of grid) {
      drawInfoCard(page, fonts, { w: gW, h: gH, ...g });
    }
  }

  // ── Slide 7: Next Step ────────────────────────────────────────────────────
  {
    const page = pdf.addPage([PW, PH]);
    drawPageShell(page, fonts, "Next Step", n++, decLaunch);
    drawSlideTag(page, fonts, "Start the Conversation", C.blue);

    drawStr(page, "Ready when you are.", CX, 634, 40, bold, C.ink);
    drawWrapped(
      page,
      "Schedule a 60-minute discovery session. We map your environment, identify priority areas, and present a practical, scoped delivery plan — no commitment required.",
      CX, 590, CW, 15, regular, C.dim, 24,
    );

    // 3 step boxes
    const sW = Math.floor((CW - 44) / 3);
    const sH = 164, sY = 244;
    const steps = [
      { accent: C.blue, num: "01", title: "Discovery Session", body: "We learn your priorities, infrastructure, and business goals in a focused 60-minute call." },
      { accent: C.teal, num: "02", title: "Priority Report",   body: "You receive a structured risk and opportunity matrix with recommended next actions." },
      { accent: C.cyan, num: "03", title: "Delivery Proposal", body: "We present a tailored plan with engagement model, timeline, and investment outline." },
    ];
    steps.forEach((s, i) => {
      const sx = CX + i * (sW + 22);
      page.drawRectangle({ x: sx, y: sY, width: sW, height: sH, color: C.soft, borderColor: s.accent, borderWidth: 1 });
      page.drawRectangle({ x: sx, y: sY + sH - 5, width: sW, height: 5, color: s.accent });
      page.drawCircle({ x: sx + sW / 2, y: sY + sH - 34, size: 20, color: s.accent, opacity: 0.14 });
      drawCentered(page, s.num, sx + sW / 2, sY + sH - 40, 14, bold, s.accent);
      drawCentered(page, s.title, sx + sW / 2, sY + sH - 66, 15, bold, C.ink);
      drawWrapped(page, s.body, sx + 16, sY + sH - 96, sW - 32, 12, regular, C.dim, 17);
    });

    // Contact strip
    const contactY = 192;
    page.drawRectangle({ x: CX, y: contactY - 16, width: CW, height: 42, color: C.soft, borderColor: C.border, borderWidth: 1 });
    drawStr(page, "Website", CX + 16, contactY, 11, bold, C.ink);
    drawStr(page, "https://vp-tech.ro", CX + 74, contactY, 11, regular, C.blue);
    drawStr(page, "|", CX + 240, contactY, 11, regular, C.dim);
    drawStr(page, "Brand", CX + 260, contactY, 11, bold, C.ink);
    drawStr(page, "VP TECHNOLOGIES", CX + 308, contactY, 11, regular, C.ink);
    drawStr(page, "|", CX + 504, contactY, 11, regular, C.dim);
    drawStr(page, "Legal entity", CX + 524, contactY, 11, bold, C.ink);
    drawStr(page, "VP INVESTMENTS SRL  \u00b7  CUI 51453103", CX + 624, contactY, 11, regular, C.dim);
  }

  // ── Output ────────────────────────────────────────────────────────────────
  await fs.mkdir(OUT_DIR, { recursive: true });
  const bytes = await pdf.save();
  await fs.writeFile(OUT_FILE, bytes);
  console.log(`Generated: ${OUT_FILE}`);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
