/**
 * Romanian version of the VP TECHNOLOGIES client presentation.
 *
 * NOTE: pdf-lib's built-in Helvetica uses WinAnsi (Windows-1252) encoding.
 * Characters â (U+00E2) and î (U+00EE) are WinAnsi-safe and kept as-is.
 * Characters ă, ș, ț fall outside WinAnsi and are written without diacritics
 * (e.g. "a", "s", "t") — standard practice in Romanian technical documents.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const OUT_DIR = path.resolve("docs");
const OUT_FILE = path.join(OUT_DIR, "VP-TECHNOLOGIES-Prezentare-Client.pdf");

// Page geometry
const PW = 1280;
const PH = 720;
const PANEL = 290;
const CX = PANEL + 46;
const CW = PW - PANEL - 70;

// Design tokens (identical to EN version for brand consistency)
const C = {
  navy:    rgb(0.04, 0.09, 0.20),
  blue:    rgb(0.09, 0.40, 0.95),
  blueL:   rgb(0.28, 0.56, 1.00),
  cyan:    rgb(0.05, 0.72, 0.88),
  teal:    rgb(0.10, 0.68, 0.52),
  amber:   rgb(0.97, 0.63, 0.14),
  white:   rgb(1.00, 1.00, 1.00),
  ink:     rgb(0.06, 0.09, 0.18),
  dim:     rgb(0.36, 0.46, 0.60),
  border:  rgb(0.83, 0.89, 0.97),
  soft:    rgb(0.95, 0.97, 1.00),
  pText:   rgb(0.88, 0.93, 1.00),
  pDim:    rgb(0.46, 0.62, 0.82),
};

// ─── Text utilities ───────────────────────────────────────────────────────────

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

// ─── Layout primitives ────────────────────────────────────────────────────────

function drawPageShell(page, fonts, category, slideNum, decFn) {
  page.drawRectangle({ x: PANEL, y: 0, width: PW - PANEL, height: PH, color: C.white });
  page.drawRectangle({ x: 0, y: 0, width: PANEL, height: PH, color: C.navy });
  page.drawRectangle({ x: PANEL - 4, y: 0, width: 4, height: PH, color: C.blue });

  drawStr(page, "VP TECHNOLOGIES", 24, PH - 37, 15, fonts.bold, C.white);
  drawStr(page, "https://vp-tech.ro", 24, PH - 57, 9, fonts.regular, C.pDim);
  page.drawRectangle({ x: 24, y: PH - 67, width: PANEL - 48, height: 1, color: C.blue, opacity: 0.35 });

  drawStr(page, category.toUpperCase(), 24, 62, 7.5, fonts.regular, C.pDim);
  page.drawCircle({ x: PANEL / 2, y: 32, size: 18, color: C.blue });
  drawCentered(page, slideNum, PANEL / 2, 26, 12, fonts.bold, C.white);

  page.drawRectangle({ x: PANEL + 4, y: 50, width: PW - PANEL - 4, height: 1, color: C.border });
  drawStr(page, "VP TECHNOLOGIES  \u00b7  Confidential", CX, 20, 8, fonts.regular, C.dim);

  if (decFn) decFn(page, fonts);
}

function drawSlideTag(page, fonts, label, accent) {
  page.drawRectangle({ x: PANEL, y: PH - 4, width: PW - PANEL, height: 4, color: accent });
  page.drawRectangle({ x: CX, y: PH - 30, width: 3, height: 20, color: accent });
  drawStr(page, label.toUpperCase(), CX + 10, PH - 28, 9, fonts.regular, accent);
}

function drawServiceRow(page, fonts, { x, y, w, h, accent, tag, title, body }) {
  page.drawRectangle({ x, y, width: w, height: h, color: C.soft, borderColor: C.border, borderWidth: 1 });
  page.drawRectangle({ x, y, width: 6, height: h, color: accent });
  drawStr(page, tag, x + 20, y + h - 22, 8.5, fonts.regular, accent);
  drawStr(page, title, x + 20, y + h - 44, 19, fonts.bold, C.ink);
  drawWrapped(page, body, x + 20, y + h - 70, w - 40, 12, fonts.regular, C.dim, 17);
}

function drawPhaseRow(page, fonts, { x, y, w, h, accent, phaseLabel, title, body }) {
  page.drawRectangle({ x, y, width: w, height: h, color: C.soft, borderColor: C.border, borderWidth: 1 });
  page.drawRectangle({ x, y, width: 6, height: h, color: accent });
  page.drawCircle({ x: x + 36, y: y + h / 2, size: 22, color: accent, opacity: 0.15 });
  drawCentered(page, phaseLabel, x + 36, y + h / 2 - 7, 14, fonts.bold, accent);
  drawStr(page, title, x + 72, y + h - 38, 20, fonts.bold, C.ink);
  drawWrapped(page, body, x + 72, y + h - 64, w - 92, 12.5, fonts.regular, C.dim, 18);
}

function drawInfoCard(page, fonts, { x, y, w, h, accent, label, title, body }) {
  page.drawRectangle({ x, y, width: w, height: h, color: C.soft, borderColor: C.border, borderWidth: 1 });
  page.drawRectangle({ x, y: y + h - 5, width: w, height: 5, color: accent });
  if (label) drawStr(page, label.toUpperCase(), x + 16, y + h - 24, 8, fonts.regular, accent);
  const titleY = label ? y + h - 44 : y + h - 28;
  drawStr(page, title, x + 16, titleY, 15, fonts.bold, C.ink);
  drawWrapped(page, body, x + 16, titleY - 24, w - 32, 12, fonts.regular, C.dim, 17);
}

// ─── Panel illustrations ──────────────────────────────────────────────────────

function decRadar(page) {
  const cx = PANEL / 2, cy = 338;
  [118, 92, 68, 46, 26, 10].forEach((r, i) => {
    page.drawCircle({ x: cx, y: cy, size: r, color: C.blue, opacity: 0.03 + i * 0.028 });
  });
  page.drawCircle({ x: cx, y: cy, size: 10, color: C.blueL });
  page.drawLine({ start: { x: cx - 112, y: cy }, end: { x: cx + 112, y: cy }, color: C.blue, thickness: 0.7, opacity: 0.18 });
  page.drawLine({ start: { x: cx, y: cy - 112 }, end: { x: cx, y: cy + 112 }, color: C.blue, thickness: 0.7, opacity: 0.18 });
  page.drawLine({ start: { x: cx - 80, y: cy - 80 }, end: { x: cx + 80, y: cy + 80 }, color: C.blue, thickness: 0.5, opacity: 0.10 });
  page.drawLine({ start: { x: cx + 80, y: cy - 80 }, end: { x: cx - 80, y: cy + 80 }, color: C.blue, thickness: 0.5, opacity: 0.10 });
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
  const cx = PANEL / 2, bw = 220, bx = cx - bw / 2;
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
  const bw = 36, gap = 14;
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
  const cx = PANEL / 2, sy = 370;
  page.drawSvgPath(
    `M ${cx} ${sy + 82} L ${cx + 68} ${sy + 36} L ${cx + 68} ${sy - 40} L ${cx} ${sy - 82} L ${cx - 68} ${sy - 40} L ${cx - 68} ${sy + 36} Z`,
    { color: C.blue, opacity: 0.12 },
  );
  page.drawLine({ start: { x: cx - 24, y: sy - 4 }, end: { x: cx - 6, y: sy - 24 }, color: C.teal, thickness: 4 });
  page.drawLine({ start: { x: cx - 6, y: sy - 24 }, end: { x: cx + 30, y: sy + 18 }, color: C.teal, thickness: 4 });
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    page.drawCircle({
      x: cx + Math.round(Math.cos(angle) * 96),
      y: sy + Math.round(Math.sin(angle) * 96),
      size: 3.5,
      color: C.blueL,
      opacity: 0.45,
    });
  }
}

function decLaunch(page) {
  const cx = PANEL / 2, cy = 360;
  page.drawCircle({ x: cx, y: cy, size: 100, color: C.blue, opacity: 0.06 });
  page.drawCircle({ x: cx, y: cy, size: 66, color: C.blue, opacity: 0.10 });
  page.drawCircle({ x: cx, y: cy, size: 34, color: C.blueL, opacity: 0.44 });
  page.drawLine({ start: { x: cx - 16, y: cy }, end: { x: cx + 16, y: cy }, color: C.white, thickness: 3.5 });
  page.drawLine({ start: { x: cx + 4, y: cy - 11 }, end: { x: cx + 16, y: cy }, color: C.white, thickness: 3.5 });
  page.drawLine({ start: { x: cx + 4, y: cy + 11 }, end: { x: cx + 16, y: cy }, color: C.white, thickness: 3.5 });
}

// ─── Build deck ───────────────────────────────────────────────────────────────

async function build() {
  const pdf = await PDFDocument.create();
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold    = await pdf.embedFont(StandardFonts.HelveticaBold);
  const fonts   = { regular, bold };
  let n = 1;

  // ── Slide 1: Coperta ───────────────────────────────────────────────────────
  {
    const page = pdf.addPage([PW, PH]);
    drawPageShell(page, fonts, "Profil Companie", n++, decRadar);
    drawSlideTag(page, fonts, "Profil Companie", C.blue);

    drawStr(page, "Construieste o afacere pe care", CX, 624, 40, bold, C.ink);
    drawStr(page, "tehnologia nu o opreste.", CX, 578, 40, bold, C.blue);

    drawWrapped(
      page,
      "VP TECHNOLOGIES este partenerul strategic IT pentru companii în crestere. Acoperim infrastructura, securitate, cloud si software personalizat — sub un singur model de livrare responsabil, axat pe rezultate masurabile.",
      CX, 542, CW, 15, regular, C.dim, 24,
    );

    const boxW = 284, boxH = 152, boxY = 70;
    const stats = [
      { value: "15+",  sub: null,     label: "Servicii IT acoperite",      accent: C.blue },
      { value: "24",   sub: "/7",     label: "Disponibilitate suport",      accent: C.teal },
      { value: "3",    sub: "Modele", label: "Formate flexibile de angajament", accent: C.cyan },
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

  // ── Slide 2: Provocarile Pietei ────────────────────────────────────────────
  {
    const page = pdf.addPage([PW, PH]);
    drawPageShell(page, fonts, "Contextul Pietei", n++, decTriangle);
    drawSlideTag(page, fonts, "Contextul Pietei", C.amber);

    drawStr(page, "De ce companiile pierd în fata tehnologiei slabe.", CX, 634, 32, bold, C.ink);
    drawWrapped(
      page,
      "Furnizori fragmentati, suport reactiv si vizibilitate redusa nu sunt doar inconveniente operationale — sunt riscuri directe la adresa veniturilor, reputatiei si cresterii.",
      CX, 596, CW, 14.5, regular, C.dim, 23,
    );

    const cW3 = Math.floor((CW - 44) / 3), cH = 240, cY = 68;
    const challenges = [
      {
        accent: C.amber,
        label: "Risc Operational",
        title: "Fiecare incident costa mai mult decat ar trebui",
        body: "Întreruperi repetate, raspuns lent la incidente si rezolvari reactive epuizeaza echipa si deterioreaza increderea clientilor. Costul se acumuleaza cu fiecare eveniment.",
      },
      {
        accent: C.blue,
        label: "Expunere la Securitate",
        title: "Lipsuri critice dintr-un standard nedefinit",
        body: "Fara o linie de baza de securitate, guvernanta accesului si planuri de raspuns la incidente, companiile raman expuse unor amenintari cu costuri din ce în ce mai mari.",
      },
      {
        accent: C.teal,
        label: "Frictiune în Crestere",
        title: "Sistemele vechi blocheaza fiecare initiativa",
        body: "Platformele deconectate si procesele manuale încetinesc integrarea, expansiunea si inovatia. Echipele irosesc capacitate care ar trebui sa genereze valoare comerciala.",
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

  // ── Slide 3: Arhitectura Serviciilor ──────────────────────────────────────
  {
    const page = pdf.addPage([PW, PH]);
    drawPageShell(page, fonts, "Arhitectura Serviciilor", n++, decPillars);
    drawSlideTag(page, fonts, "Arhitectura Serviciilor", C.blue);

    drawStr(page, "IT complet. O singura echipa.", CX, 634, 34, bold, C.ink);
    drawWrapped(
      page,
      "Trei piloni de servicii integrati asigura acoperire tehnologica completa — de la infrastructura de baza pâna la inovatie digitala.",
      CX, 596, CW, 14.5, regular, C.dim, 23,
    );

    const rowH = 132, rowGap = 16;
    const serviceRows = [
      {
        accent: C.blue,
        tag: "INFRASTRUCTURA SI CLOUD",
        title: "Servere, Operatiuni Cloud si Suport Zilnic",
        body: "Administrare Windows si Linux, Microsoft 365 si Exchange Online, managementul gazdelor cPanel/WHM, suport pentru endpoint la distanta si la sediu — mentinând operatiunile stabile zilnic.",
      },
      {
        accent: C.teal,
        tag: "RETEA SI CYBERSECURITATE",
        title: "Retele, Controale de Securitate si Hardening",
        body: "Proiectare si cablare LAN/WAN pentru spatii comerciale, arhitectura firewall si VPN, detectie intruziuni si hardening sistematic al securitatii pentru continuitate operationala.",
      },
      {
        accent: C.cyan,
        tag: "PLATFORME DIGITALE SI AI",
        title: "Web, Software Personalizat si Automatizare",
        body: "Livrare web si eCommerce, platforme CRM/ERP personalizate, automatizare AI a fluxurilor de lucru si integrare terminale de plata — tehnologie care genereaza direct venituri si eficienta.",
      },
    ];
    serviceRows.forEach((row, i) => {
      const ry = 68 + (serviceRows.length - 1 - i) * (rowH + rowGap);
      drawServiceRow(page, fonts, { x: CX, y: ry, w: CW, h: rowH, ...row });
    });
  }

  // ── Slide 4: Model de Livrare ─────────────────────────────────────────────
  {
    const page = pdf.addPage([PW, PH]);
    drawPageShell(page, fonts, "Model de Livrare", n++, (p, f) => decPhaseFlow(p, f));
    drawSlideTag(page, fonts, "Model de Livrare", C.blue);

    drawStr(page, "Livrare precisa, de fiecare data.", CX, 634, 34, bold, C.ink);
    drawWrapped(
      page,
      "Fiecare angajament urmeaza un model structurat în trei faze. Stakeholderii au vizibilitate completa la fiecare etapa — fara surprize, fara ambiguitate.",
      CX, 596, CW, 14.5, regular, C.dim, 23,
    );

    const phases = [
      {
        accent: C.blue,
        phaseLabel: "01",
        title: "Evaluare — Analiza, Prioritati si Harta Riscurilor",
        body: "Audit tehnic si de business, analiza dependentelor, identificare riscuri si criterii de succes agreate cu stakeholderii inainte de orice implementare.",
      },
      {
        accent: C.teal,
        phaseLabel: "02",
        title: "Executie — Implementare Controlata",
        body: "Lansari secventiale cu puncte de control la jaloane, porti de calitate si raportare bidirectionala pentru management si echipele tehnice pe durata livrarii.",
      },
      {
        accent: C.cyan,
        phaseLabel: "03",
        title: "Optimizare — Stabilizare si Îmbunatatire",
        body: "Hardening post-livrare, optimizare performanta, documentare procese si cicluri de îmbunatatire continua legate direct de KPI operationali si comerciali.",
      },
    ];
    const pBoxH = 118, pGap = 15;
    phases.forEach((ph, i) => {
      const py = 68 + (phases.length - 1 - i) * (pBoxH + pGap);
      drawPhaseRow(page, fonts, { x: CX, y: py, w: CW, h: pBoxH, ...ph });
    });
  }

  // ── Slide 5: Rezultate de Business ────────────────────────────────────────
  {
    const page = pdf.addPage([PW, PH]);
    drawPageShell(page, fonts, "Rezultate Clienti", n++, decBarchart);
    drawSlideTag(page, fonts, "Rezultate Clienti", C.teal);

    drawStr(page, "Tehnologie care propulseaza afacerea.", CX, 634, 34, bold, C.ink);
    drawWrapped(
      page,
      "Clientii care lucreaza cu VP TECHNOLOGIES obtin îmbunatatiri masurabile în fiabilitate, postura de securitate si viteza de executie.",
      CX, 596, CW, 14.5, regular, C.dim, 23,
    );

    const leftW = Math.round(CW * 0.56);
    const rightX = CX + leftW + 36;
    const rightW = CW - leftW - 36;

    const outcomes = [
      { label: "Fiabilitate sistem si disponibilitate",       pct: 0.92, accent: C.blue },
      { label: "Postura de securitate si acoperire controale", pct: 0.86, accent: C.teal },
      { label: "Viteza de raspuns la incidente",              pct: 0.88, accent: C.cyan },
      { label: "Viteza de livrare proiecte",                  pct: 0.80, accent: C.blueL },
      { label: "Vizibilitate management si raportare",        pct: 0.94, accent: C.blue },
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

    // Right: impact card
    page.drawRectangle({ x: rightX, y: 68, width: rightW, height: 490, color: C.soft, borderColor: C.teal, borderWidth: 1 });
    page.drawRectangle({ x: rightX, y: 68 + 490 - 5, width: rightW, height: 5, color: C.teal });
    drawStr(page, "IMPACT BUSINESS", rightX + 16, 68 + 490 - 26, 8, regular, C.teal);
    drawWrapped(
      page,
      "Când sistemele sunt fiabile si securizate, echipele înceteaza sa mai rezolve urgente si încep sa execute. Managementul capata increderea sa investeasca în crestere. Tehnologia înceteaza sa fie un blocaj si devine un avantaj competitiv.",
      rightX + 16, 68 + 490 - 56, rightW - 32, 13.5, regular, C.ink, 21,
    );
    page.drawRectangle({ x: rightX + 16, y: 90, width: 3, height: 110, color: C.teal });
    drawWrapped(
      page,
      "Scopul nostru este sa facem IT-ul invizibil — pur si simplu functioneaza, tot timpul.",
      rightX + 28, 180, rightW - 48, 12, regular, C.dim, 18,
    );
  }

  // ── Slide 6: De ce VP TECHNOLOGIES ────────────────────────────────────────
  {
    const page = pdf.addPage([PW, PH]);
    drawPageShell(page, fonts, "Avantaj Competitiv", n++, decShield);
    drawSlideTag(page, fonts, "Avantaj Competitiv", C.blue);

    drawStr(page, "Diferenta VP TECHNOLOGIES.", CX, 634, 34, bold, C.ink);
    drawWrapped(
      page,
      "Patru principii ne diferentiaza de furnizorii IT traditionali si stabilesc standardul pentru cum ar trebui sa functioneze un parteneriat tehnologic.",
      CX, 596, CW, 14.5, regular, C.dim, 23,
    );

    const gW = Math.floor((CW - 22) / 2), gH = 214;
    const grid = [
      {
        x: CX,            y: 320,
        accent: C.blue,
        label: "UN SINGUR PARTENER",
        title: "Responsabilitate unica",
        body: "O singura echipa pentru infrastructura, securitate, retea si software. Fara conflicte între furnizori, fara costuri de coordonare, fara goluri de responsabilitate.",
      },
      {
        x: CX + gW + 22,  y: 320,
        accent: C.teal,
        label: "RAPORTARE",
        title: "Vizibilitate pentru management",
        body: "Raportare structurata a progresului pentru conducere la fiecare etapa. Status clar, riscuri identificate si decizii pregatite de actionat — nu doar jurnale tehnice.",
      },
      {
        x: CX,            y: 86,
        accent: C.cyan,
        label: "EXPERTIZA",
        title: "Competenta multi-domeniu",
        body: "De la hardening servere la automatizare cu AI, echipa noastra aduce expertiza specializata pe fiecare strat al tehnologiei moderne de business.",
      },
      {
        x: CX + gW + 22,  y: 86,
        accent: C.amber,
        label: "CONTINUITATE",
        title: "Construit pentru termen lung",
        body: "Servicii gestionate, livrare de proiecte si modele de advisory care se adapteaza stadiului tau de crestere — nu implementari punctuale care te lasa expus.",
      },
    ];
    for (const g of grid) {
      drawInfoCard(page, fonts, { w: gW, h: gH, ...g });
    }
  }

  // ── Slide 7: Pasul Urmator ─────────────────────────────────────────────────
  {
    const page = pdf.addPage([PW, PH]);
    drawPageShell(page, fonts, "Pasul Urmator", n++, decLaunch);
    drawSlideTag(page, fonts, "Incepe Conversatia", C.blue);

    drawStr(page, "Suntem gata când esti si tu.", CX, 634, 40, bold, C.ink);
    drawWrapped(
      page,
      "Programeaza o sesiune de descoperire de 60 de minute. Cartografiem mediul tau, identificam prioritatile si livram un plan practic — fara angajament necesar.",
      CX, 590, CW, 15, regular, C.dim, 24,
    );

    const sW = Math.floor((CW - 44) / 3), sH = 164, sY = 244;
    const steps = [
      { accent: C.blue, num: "01", title: "Sesiune de Descoperire",  body: "Aflam prioritatile, infrastructura si obiectivele de business într-un apel de 60 de minute." },
      { accent: C.teal, num: "02", title: "Raport de Prioritati",   body: "Primesti o matrice structurata de riscuri si oportunitati cu urmatorii pasi recomandati." },
      { accent: C.cyan, num: "03", title: "Propunere de Livrare",   body: "Prezentam un plan personalizat cu model de angajament, calendar si investitie estimata." },
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
    drawStr(page, "Entitate legala", CX + 524, contactY, 11, bold, C.ink);
    drawStr(page, "VP INVESTMENTS SRL  \u00b7  CUI 51453103", CX + 628, contactY, 11, regular, C.dim);
  }

  // ─── Output ───────────────────────────────────────────────────────────────
  await fs.mkdir(OUT_DIR, { recursive: true });
  const bytes = await pdf.save();
  await fs.writeFile(OUT_FILE, bytes);
  console.log(`Generated: ${OUT_FILE}`);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
