import fs from "node:fs/promises";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const OUTPUT_DIR = path.resolve("docs");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "VP-TECHNOLOGIES-Client-Presentation.pdf");

const BRAND = "VP TECHNOLOGIES";
const DOMAIN = "vp-tech.ro";

const palette = {
  bg: rgb(0.965, 0.978, 1),
  ink: rgb(0.07, 0.12, 0.19),
  muted: rgb(0.34, 0.43, 0.56),
  blue: rgb(0.08, 0.48, 0.95),
  cyan: rgb(0.06, 0.72, 0.86),
  teal: rgb(0.05, 0.68, 0.52),
  violet: rgb(0.39, 0.31, 0.92),
  panel: rgb(1, 1, 1),
  border: rgb(0.8, 0.88, 0.96),
  soft: rgb(0.9, 0.95, 1),
};

function wrapLines(text, font, size, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function drawPageBase(page) {
  const { width, height } = page.getSize();
  page.drawRectangle({ x: 0, y: 0, width, height, color: palette.bg });
  page.drawRectangle({ x: 0, y: height - 84, width, height: 84, color: palette.panel });
  page.drawRectangle({ x: 0, y: height - 84, width, height: 1.2, color: palette.border });
  page.drawRectangle({ x: 0, y: 0, width, height: 56, color: palette.panel });
  page.drawRectangle({ x: 0, y: 56, width, height: 1.2, color: palette.border });
}

function drawHeader(page, fonts, title, subtitle) {
  const { bold, regular } = fonts;
  const { height } = page.getSize();
  page.drawText(BRAND, {
    x: 44,
    y: height - 46,
    size: 20,
    font: bold,
    color: palette.ink,
  });
  page.drawText(`https://${DOMAIN}`, {
    x: 44,
    y: height - 64,
    size: 11.5,
    font: regular,
    color: palette.blue,
  });
  page.drawText(title, {
    x: 44,
    y: height - 112,
    size: 28,
    font: bold,
    color: palette.ink,
  });
  if (subtitle) {
    page.drawText(subtitle, {
      x: 44,
      y: height - 136,
      size: 13,
      font: regular,
      color: palette.muted,
    });
  }
}

function drawFooter(page, fonts, pageNumber) {
  const { regular } = fonts;
  const { width } = page.getSize();
  page.drawText("Marketing presentation | VP TECHNOLOGIES", {
    x: 44,
    y: 22,
    size: 10,
    font: regular,
    color: palette.muted,
  });
  page.drawText(String(pageNumber), {
    x: width - 40,
    y: 22,
    size: 10,
    font: regular,
    color: palette.muted,
  });
}

function drawParagraph(page, fonts, text, x, y, maxWidth, size = 14, leading = 20, color = palette.ink) {
  const { regular } = fonts;
  const lines = wrapLines(text, regular, size, maxWidth);
  let currentY = y;
  for (const line of lines) {
    page.drawText(line, { x, y: currentY, size, font: regular, color });
    currentY -= leading;
  }
  return currentY;
}

function drawBulletList(page, fonts, items, x, y, maxWidth, size = 13.5) {
  const { regular } = fonts;
  let cursorY = y;
  for (const item of items) {
    page.drawCircle({ x: x + 4, y: cursorY + 5, size: 2.6, color: palette.blue });
    const lines = wrapLines(item, regular, size, maxWidth - 18);
    let itemY = cursorY;
    for (const line of lines) {
      page.drawText(line, { x: x + 14, y: itemY, size, font: regular, color: palette.ink });
      itemY -= 18;
    }
    cursorY = itemY - 8;
  }
  return cursorY;
}

function drawCard(page, fonts, cfg) {
  page.drawRectangle({
    x: cfg.x,
    y: cfg.y,
    width: cfg.w,
    height: cfg.h,
    color: cfg.bg ?? palette.panel,
    borderColor: cfg.border ?? palette.border,
    borderWidth: 1,
  });
  page.drawText(cfg.title, {
    x: cfg.x + 18,
    y: cfg.y + cfg.h - 34,
    size: 16,
    font: fonts.bold,
    color: cfg.titleColor ?? palette.blue,
  });
  let bodyY = cfg.y + cfg.h - 58;
  const paragraphs = String(cfg.body).split("\n");
  for (const paragraph of paragraphs) {
    if (!paragraph.trim()) {
      bodyY -= 8;
      continue;
    }
    bodyY = drawParagraph(
      page,
      fonts,
      paragraph,
      cfg.x + 18,
      bodyY,
      cfg.w - 36,
      12.5,
      18,
      palette.ink,
    );
    bodyY -= 6;
  }
}

function drawVectorScene(page, type, x, y, w, h) {
  page.drawRectangle({ x, y, width: w, height: h, color: palette.soft, borderColor: palette.border, borderWidth: 1 });

  if (type === "hero") {
    page.drawCircle({ x: x + w - 90, y: y + h - 70, size: 54, color: palette.cyan, opacity: 0.18 });
    page.drawCircle({ x: x + 90, y: y + 64, size: 40, color: palette.violet, opacity: 0.18 });
    page.drawRectangle({ x: x + 44, y: y + 38, width: w - 88, height: 8, color: palette.blue, opacity: 0.24 });
    page.drawRectangle({ x: x + 44, y: y + 62, width: w - 120, height: 8, color: palette.cyan, opacity: 0.34 });
    page.drawRectangle({ x: x + 44, y: y + 86, width: w - 72, height: 8, color: palette.violet, opacity: 0.22 });
    page.drawCircle({ x: x + 58, y: y + h - 40, size: 9, color: palette.blue });
    page.drawCircle({ x: x + 86, y: y + h - 40, size: 9, color: palette.cyan });
    page.drawCircle({ x: x + 114, y: y + h - 40, size: 9, color: palette.teal });
    return;
  }

  if (type === "network") {
    const nodes = [
      [x + 70, y + h - 50], [x + 170, y + h - 80], [x + 270, y + h - 50], [x + 220, y + 52], [x + 120, y + 52],
    ];
    for (const [nx, ny] of nodes) page.drawCircle({ x: nx, y: ny, size: 14, color: palette.blue, opacity: 0.22 });
    page.drawLine({ start: { x: nodes[0][0], y: nodes[0][1] }, end: { x: nodes[1][0], y: nodes[1][1] }, color: palette.blue, thickness: 2 });
    page.drawLine({ start: { x: nodes[1][0], y: nodes[1][1] }, end: { x: nodes[2][0], y: nodes[2][1] }, color: palette.blue, thickness: 2 });
    page.drawLine({ start: { x: nodes[2][0], y: nodes[2][1] }, end: { x: nodes[3][0], y: nodes[3][1] }, color: palette.cyan, thickness: 2 });
    page.drawLine({ start: { x: nodes[3][0], y: nodes[3][1] }, end: { x: nodes[4][0], y: nodes[4][1] }, color: palette.cyan, thickness: 2 });
    page.drawLine({ start: { x: nodes[4][0], y: nodes[4][1] }, end: { x: nodes[0][0], y: nodes[0][1] }, color: palette.teal, thickness: 2 });
    return;
  }

  if (type === "security") {
    page.drawRectangle({ x: x + 70, y: y + 34, width: w - 140, height: h - 82, color: palette.panel, borderColor: palette.border, borderWidth: 1 });
    page.drawLine({ start: { x: x + 92, y: y + h - 62 }, end: { x: x + w - 92, y: y + h - 62 }, color: palette.border, thickness: 1 });
    const sx = x + w / 2;
    const sy = y + h / 2 + 10;
    page.drawSvgPath(`M ${sx} ${sy + 58} L ${sx + 54} ${sy + 22} L ${sx + 54} ${sy - 26} L ${sx} ${sy - 52} L ${sx - 54} ${sy - 26} L ${sx - 54} ${sy + 22} Z`, {
      color: palette.blue,
      borderColor: palette.blue,
      opacity: 0.18,
    });
    page.drawLine({ start: { x: sx - 18, y: sy }, end: { x: sx - 2, y: sy - 16 }, color: palette.cyan, thickness: 3 });
    page.drawLine({ start: { x: sx - 2, y: sy - 16 }, end: { x: sx + 24, y: sy + 12 }, color: palette.cyan, thickness: 3 });
    return;
  }

  if (type === "digital") {
    page.drawRectangle({ x: x + 42, y: y + 46, width: w - 84, height: h - 92, color: palette.panel, borderColor: palette.border, borderWidth: 1 });
    page.drawLine({ start: { x: x + 42, y: y + h - 74 }, end: { x: x + w - 42, y: y + h - 74 }, color: palette.border, thickness: 1 });
    page.drawCircle({ x: x + 58, y: y + h - 61 }, { size: 4, color: palette.blue });
    page.drawCircle({ x: x + 74, y: y + h - 61 }, { size: 4, color: palette.cyan });
    page.drawCircle({ x: x + 90, y: y + h - 61 }, { size: 4, color: palette.teal });
    page.drawRectangle({ x: x + 66, y: y + 70, width: w - 132, height: 12, color: palette.blue, opacity: 0.2 });
    page.drawRectangle({ x: x + 66, y: y + 94, width: w - 190, height: 10, color: palette.cyan, opacity: 0.32 });
    page.drawRectangle({ x: x + 66, y: y + 114, width: w - 154, height: 10, color: palette.violet, opacity: 0.22 });
    return;
  }

  // default abstract scene
  page.drawCircle({ x: x + w / 2, y: y + h / 2, size: 72, color: palette.blue, opacity: 0.2 });
  page.drawRectangle({ x: x + 46, y: y + h / 2 - 4, width: w - 92, height: 8, color: palette.cyan, opacity: 0.42 });
}

async function buildDeck() {
  const pdf = await PDFDocument.create();
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const fonts = { regular, bold };
  const pageSize = [1366, 768];
  let pageNo = 1;

  // 1. Cover
  {
    const page = pdf.addPage(pageSize);
    drawPageBase(page);
    drawHeader(page, fonts, "Boardroom Marketing Deck", "Technology partner profile");
    page.drawText("Build a stronger, safer, faster digital business.", {
      x: 44,
      y: 528,
      size: 40,
      font: bold,
      color: palette.ink,
    });
    drawParagraph(
      page,
      fonts,
      "VP TECHNOLOGIES helps companies reduce operational risk, modernize core systems, and scale confidently through integrated infrastructure, cybersecurity, cloud, and software delivery.",
      44,
      484,
      760,
      16,
      25,
      palette.muted,
    );
    drawVectorScene(page, "hero", 846, 260, 476, 300);
    drawCard(page, fonts, {
      x: 44, y: 236, w: 760, h: 176,
      title: "Positioning Statement",
      body: "We are not another ad-hoc IT vendor. We act as an execution partner that aligns technology decisions to revenue, continuity, and strategic growth priorities.",
      titleColor: palette.blue,
    });
    drawFooter(page, fonts, pageNo++);
  }

  // 2. Client challenges
  {
    const page = pdf.addPage(pageSize);
    drawPageBase(page);
    drawHeader(page, fonts, "What Clients Are Solving", "Real-world pressure points");
    drawCard(page, fonts, {
      x: 44, y: 390, w: 410, h: 232,
      title: "Operational Bottlenecks",
      body: "Unplanned downtime, fragmented tools, and reactive support create friction that slows teams and impacts customer experience.",
      titleColor: palette.blue,
    });
    drawCard(page, fonts, {
      x: 478, y: 390, w: 410, h: 232,
      title: "Security & Compliance Pressure",
      body: "Growing threat exposure and unclear governance demand stronger controls, clearer accountability, and better incident readiness.",
      titleColor: palette.teal,
    });
    drawCard(page, fonts, {
      x: 912, y: 390, w: 410, h: 232,
      title: "Growth Constraints",
      body: "Legacy systems and disconnected processes make it harder to scale operations, launch initiatives, and make confident decisions.",
      titleColor: palette.violet,
    });
    drawVectorScene(page, "network", 44, 126, 620, 228);
    drawBulletList(
      page,
      fonts,
      [
        "Need for a single accountable delivery partner",
        "Need for executive-level visibility and progress clarity",
        "Need for faster project execution with reduced risk",
      ],
      700,
      310,
      620,
    );
    drawFooter(page, fonts, pageNo++);
  }

  // 3. Offer architecture
  {
    const page = pdf.addPage(pageSize);
    drawPageBase(page);
    drawHeader(page, fonts, "Our Service Architecture", "Three integrated value pillars");

    drawVectorScene(page, "network", 44, 406, 404, 216);
    drawCard(page, fonts, {
      x: 44, y: 166, w: 404, h: 220,
      title: "Infrastructure & Cloud",
      body: "Server administration, Microsoft 365, Exchange, hosting governance, and support operations to keep business-critical systems reliable.",
      titleColor: palette.blue,
    });

    drawVectorScene(page, "security", 480, 406, 404, 216);
    drawCard(page, fonts, {
      x: 480, y: 166, w: 404, h: 220,
      title: "Network & Cybersecurity",
      body: "Network engineering, security controls, hardening, and readiness frameworks to reduce attack surface and business disruption.",
      titleColor: palette.teal,
    });

    drawVectorScene(page, "digital", 916, 406, 406, 216);
    drawCard(page, fonts, {
      x: 916, y: 166, w: 406, h: 220,
      title: "Digital Platforms & AI",
      body: "Web/eCommerce platforms, custom CRM/ERP software, and practical AI automations that improve productivity and decision velocity.",
      titleColor: palette.violet,
    });

    drawFooter(page, fonts, pageNo++);
  }

  // 4. Delivery model
  {
    const page = pdf.addPage(pageSize);
    drawPageBase(page);
    drawHeader(page, fonts, "Delivery Model", "How we execute from strategy to outcomes");

    const phases = [
      {
        t: "Phase 01 | Discovery & Priority Mapping",
        d: "Business and technical baseline, risk profile, dependency review, and success criteria agreed with stakeholders.",
      },
      {
        t: "Phase 02 | Controlled Implementation",
        d: "Sequenced rollouts, quality gates, and transparent progress reporting across technical and management tracks.",
      },
      {
        t: "Phase 03 | Stabilization & Optimization",
        d: "Performance tuning, security reinforcement, and operational refinement aligned with measurable KPIs.",
      },
    ];

    let y = 580;
    for (const phase of phases) {
      page.drawRectangle({
        x: 44, y: y - 142, width: 1278, height: 124,
        color: palette.panel, borderColor: palette.border, borderWidth: 1,
      });
      page.drawText(phase.t, { x: 66, y: y - 48, size: 20, font: bold, color: palette.blue });
      drawParagraph(page, fonts, phase.d, 66, y - 80, 1230, 14.5, 22, palette.ink);
      y -= 156;
    }

    drawFooter(page, fonts, pageNo++);
  }

  // 5. Outcomes
  {
    const page = pdf.addPage(pageSize);
    drawPageBase(page);
    drawHeader(page, fonts, "Business Outcomes", "Value clients should expect");

    drawBulletList(
      page,
      fonts,
      [
        "Higher service reliability and reduced operational volatility",
        "Stronger cybersecurity governance and incident readiness",
        "Faster execution for strategic initiatives and change programs",
        "Improved team productivity through process and automation",
        "Clearer leadership visibility with structured reporting",
      ],
      58,
      586,
      730,
      15,
    );

    drawCard(page, fonts, {
      x: 810, y: 420, w: 512, h: 202,
      title: "Commercial Impact Story",
      body: "When systems are stable and secure, teams move faster, customer trust improves, and leadership can invest in growth instead of firefighting.",
      titleColor: palette.teal,
    });
    drawVectorScene(page, "hero", 810, 166, 512, 230);
    drawFooter(page, fonts, pageNo++);
  }

  // 6. Engagement options
  {
    const page = pdf.addPage(pageSize);
    drawPageBase(page);
    drawHeader(page, fonts, "Engagement Options", "Flexible formats by business stage");

    drawCard(page, fonts, {
      x: 44, y: 188, w: 406, h: 426,
      title: "Managed Services Partnership",
      body: "Continuous operations, support, and optimization with defined governance rhythms.\n\nBest for companies that need long-term reliability and ongoing improvement.",
      titleColor: palette.blue,
    });
    drawCard(page, fonts, {
      x: 480, y: 188, w: 406, h: 426,
      title: "Project-Based Implementation",
      body: "Defined scope, timeline, and milestones for migrations, upgrades, and strategic rollouts.\n\nBest for organizations running targeted transformation initiatives.",
      titleColor: palette.teal,
    });
    drawCard(page, fonts, {
      x: 916, y: 188, w: 406, h: 426,
      title: "Advisory & Architecture",
      body: "Executive advisory, roadmap planning, and investment prioritization guidance.\n\nBest for leadership teams preparing modernization decisions.",
      titleColor: palette.violet,
    });
    drawFooter(page, fonts, pageNo++);
  }

  // 7. CTA
  {
    const page = pdf.addPage(pageSize);
    drawPageBase(page);
    drawHeader(page, fonts, "Next Step", "Discovery workshop proposal");

    page.drawText("Schedule a 60-minute discovery session.", {
      x: 44,
      y: 536,
      size: 38,
      font: bold,
      color: palette.ink,
    });
    drawParagraph(
      page,
      fonts,
      "In this session, we map priorities, identify immediate risk/opportunity areas, and define a practical execution plan for your team.",
      44,
      490,
      900,
      16,
      25,
      palette.muted,
    );

    drawCard(page, fonts, {
      x: 44, y: 214, w: 840, h: 214,
      title: "Workshop Deliverables",
      body: "1) Priority matrix and risk view\n2) Recommended delivery model\n3) Initial implementation roadmap\n4) Commercial proposal direction",
      titleColor: palette.blue,
    });
    drawVectorScene(page, "digital", 918, 214, 404, 214);

    page.drawText("Contact:", { x: 44, y: 172, size: 14, font: bold, color: palette.ink });
    page.drawText(`Website: https://${DOMAIN}`, { x: 44, y: 152, size: 13, font: regular, color: palette.blue });
    page.drawText("Brand: VP TECHNOLOGIES", { x: 44, y: 132, size: 12, font: regular, color: palette.muted });
    drawFooter(page, fonts, pageNo++);
  }

  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  const bytes = await pdf.save();
  await fs.writeFile(OUTPUT_FILE, bytes);
  console.log(`Generated: ${OUTPUT_FILE}`);
}

buildDeck().catch((error) => {
  console.error(error);
  process.exit(1);
});
