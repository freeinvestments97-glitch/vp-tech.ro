import fs from "node:fs/promises";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const OUTPUT_DIR = path.resolve("docs");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "VP-TECHNOLOGIES-Client-Presentation.pdf");

const BRAND = "VP TECHNOLOGIES";
const DOMAIN = "vp-tech.ro";

const colors = {
  bg: rgb(0.015, 0.04, 0.09),
  panel: rgb(0.055, 0.1, 0.19),
  panelSoft: rgb(0.07, 0.13, 0.24),
  cyan: rgb(0.24, 0.76, 0.97),
  cyanSoft: rgb(0.36, 0.82, 0.98),
  white: rgb(0.97, 0.98, 1),
  text: rgb(0.9, 0.95, 1),
  muted: rgb(0.67, 0.77, 0.9),
  accent: rgb(0.2, 0.86, 0.62),
  amber: rgb(0.98, 0.71, 0.27),
};

function wrapLines(text, font, size, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    const width = font.widthOfTextAtSize(candidate, size);
    if (width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function drawBackground(page, width, height) {
  page.drawRectangle({ x: 0, y: 0, width, height, color: colors.bg });
  page.drawRectangle({
    x: 0,
    y: height - 96,
    width,
    height: 96,
    color: colors.panel,
    opacity: 0.9,
  });
  page.drawRectangle({ x: 0, y: 0, width, height: 64, color: colors.panel, opacity: 0.9 });
  page.drawRectangle({ x: 42, y: height - 96, width: width - 84, height: 1, color: colors.cyan, opacity: 0.35 });
  page.drawCircle({ x: width - 120, y: 130, size: 140, color: colors.panelSoft, opacity: 0.2 });
  page.drawCircle({ x: 120, y: height - 180, size: 120, color: colors.panelSoft, opacity: 0.18 });
}

function drawHeader(page, fonts, slideTitle, subtitle) {
  const { bold, regular } = fonts;
  const { height } = page.getSize();
  const topY = height - 44;

  page.drawText(BRAND, {
    x: 42,
    y: topY,
    size: 24,
    font: bold,
    color: colors.white,
  });

  page.drawText(`https://${DOMAIN}`, {
    x: 42,
    y: height - 64,
    size: 12,
    font: regular,
    color: colors.cyanSoft,
  });

  page.drawText(slideTitle, {
    x: 42,
    y: height - 124,
    size: 25,
    font: bold,
    color: colors.white,
  });
  if (subtitle) {
    page.drawText(subtitle, {
      x: 42,
      y: height - 146,
      size: 12,
      font: regular,
      color: colors.muted,
    });
  }
}

function drawFooter(page, fonts, pageNumber) {
  const { regular } = fonts;
  const { width } = page.getSize();
  page.drawText(
    "Confidential client presentation | VP TECHNOLOGIES (brand) | VP INVESTMENTS SRL (legal entity)",
    {
      x: 42,
      y: 24,
      size: 9,
      font: regular,
      color: colors.muted,
    },
  );
  page.drawText(String(pageNumber), {
    x: width - 54,
    y: 24,
    size: 10,
    font: regular,
    color: colors.muted,
  });
}

function drawParagraph(page, fonts, text, opts) {
  const { regular } = fonts;
  const lines = wrapLines(text, regular, opts.size ?? 14, opts.maxWidth ?? 1120);
  let y = opts.y;
  for (const line of lines) {
    page.drawText(line, {
      x: opts.x,
      y,
      size: opts.size ?? 14,
      font: regular,
      color: opts.color ?? colors.text,
    });
    y -= (opts.leading ?? 20);
  }
  return y;
}

function drawBullets(page, fonts, bullets, opts) {
  const { regular } = fonts;
  let y = opts.y;
  for (const bullet of bullets) {
    page.drawCircle({ x: opts.x + 4, y: y + 5, size: 2.5, color: colors.cyan });
    const lines = wrapLines(bullet, regular, 13, opts.maxWidth);
    let lineY = y;
    for (const line of lines) {
      page.drawText(line, {
        x: opts.x + 14,
        y: lineY,
        size: 13,
        font: regular,
        color: colors.text,
      });
      lineY -= 18;
    }
    y = lineY - 8;
  }
  return y;
}

function drawCard(page, x, y, width, height, title, body, fonts, accent = colors.cyan) {
  const { bold } = fonts;
  page.drawRectangle({
    x,
    y,
    width,
    height,
    color: colors.panel,
    borderColor: accent,
    borderWidth: 0.9,
  });
  page.drawText(title, {
    x: x + 18,
    y: y + height - 34,
    size: 16,
    font: bold,
    color: accent,
  });
  drawParagraph(page, fonts, body, {
    x: x + 18,
    y: y + height - 62,
    size: 12.5,
    maxWidth: width - 36,
    color: colors.text,
    leading: 18,
  });
}

async function build() {
  const pdf = await PDFDocument.create();
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const fonts = { regular, bold };

  const size = [1366, 768];
  let pageIndex = 1;

  // Slide 1 - Cover
  {
    const page = pdf.addPage(size);
    const { width, height } = page.getSize();
    drawBackground(page, width, height);
    drawHeader(page, fonts, "Executive Client Presentation", "Technology partnership proposal");
    let y = 548;
    page.drawText("Enterprise IT. Business Growth. Zero Guesswork.", {
      x: 42,
      y,
      size: 36,
      font: bold,
      color: colors.white,
    });
    y -= 62;
    y = drawParagraph(
      page,
      fonts,
      "VP TECHNOLOGIES helps business owners and management teams transform IT from a cost center into a growth engine. We combine infrastructure, cybersecurity, cloud, and software execution under one accountable delivery model focused on measurable outcomes.",
      { x: 42, y, size: 16, maxWidth: 980, leading: 26, color: colors.text },
    );

    drawCard(
      page,
      42,
      164,
      640,
      180,
      "Core Commercial Promise",
      "We reduce operational friction, protect revenue-critical systems, and create technology foundations that scale with your growth. You get strategic clarity, disciplined implementation, and executive-level reporting from day one.",
      fonts,
      colors.cyan,
    );

    page.drawRectangle({
      x: 720,
      y: 164,
      width: 604,
      height: 180,
      color: colors.panel,
      borderColor: colors.accent,
      borderWidth: 0.9,
    });
    page.drawText("Impact Themes", { x: 740, y: 310, size: 16, font: bold, color: colors.accent });
    drawBullets(
      page,
      fonts,
      [
        "Lower downtime and less operational uncertainty",
        "Improved cyber resilience and compliance posture",
        "Faster delivery cycles for business initiatives",
        "Higher confidence for leadership decisions",
      ],
      { x: 740, y: 282, maxWidth: 552 },
    );
    drawFooter(page, fonts, pageIndex++);
  }

  // Slide 2 - Market pain
  {
    const page = pdf.addPage(size);
    const { width, height } = page.getSize();
    drawBackground(page, width, height);
    drawHeader(page, fonts, "Why Clients Engage Us", "Typical business and operational pain points");

    const columns = [
      {
        title: "Operational Instability",
        bullets: [
          "Recurring incidents impacting business continuity",
          "Reactive firefighting instead of controlled operations",
          "Limited visibility into system health and risk",
          "Team productivity blocked by technical bottlenecks",
        ],
      },
      {
        title: "Security & Risk Exposure",
        bullets: [
          "Unclear security baselines and policy gaps",
          "Weak access governance and fragmented controls",
          "High cost of unmanaged vulnerabilities",
          "No mature incident preparedness process",
        ],
      },
      {
        title: "Growth Friction",
        bullets: [
          "Legacy systems slowing down expansion plans",
          "Disconnected platforms and duplicated manual work",
          "Lack of automation and decision-grade telemetry",
          "Technology strategy misaligned with business targets",
        ],
      },
    ];

    let x = 42;
    for (const col of columns) {
      page.drawRectangle({
        x,
        y: 130,
        width: 390,
        height: 460,
        color: colors.panel,
        borderColor: colors.cyan,
        borderWidth: 0.8,
      });
      page.drawText(col.title, { x: x + 20, y: 560, size: 17, font: bold, color: colors.cyanSoft });
      drawBullets(page, fonts, col.bullets, { x: x + 20, y: 528, maxWidth: 340 });
      x += 410;
    }
    drawFooter(page, fonts, pageIndex++);
  }

  // Slide 3 - Service architecture
  {
    const page = pdf.addPage(size);
    const { width, height } = page.getSize();
    drawBackground(page, width, height);
    drawHeader(page, fonts, "Integrated Service Architecture", "One partner, multiple execution lanes");

    drawCard(
      page,
      42,
      426,
      414,
      174,
      "Infrastructure & Cloud",
      "Server administration, Microsoft 365, Exchange, hosting controls, and operational support to keep mission-critical systems stable and performant.",
      fonts,
      colors.cyan,
    );
    drawCard(
      page,
      476,
      426,
      414,
      174,
      "Network & Cybersecurity",
      "Network architecture, physical infrastructure, firewall/VPN/IDS controls, and risk-focused hardening to protect continuity and reputation.",
      fonts,
      colors.accent,
    );
    drawCard(
      page,
      910,
      426,
      414,
      174,
      "Digital Platforms & AI",
      "Web/eCommerce delivery, custom CRM/ERP development, and AI automation to accelerate revenue operations and strategic decision-making.",
      fonts,
      colors.amber,
    );

    const phases = [
      {
        title: "Advisory + Implementation + Managed Operations",
        text: "Our model combines strategy, execution, and ongoing optimization. This means clients avoid fragmented vendors, reduce communication overhead, and gain a single accountable partner for delivery outcomes.",
      },
      {
        title: "Cross-functional expertise with executive reporting",
        text: "Each engagement includes decision-ready summaries for management and detailed execution plans for technical teams, ensuring both governance and speed.",
      },
    ];

    let y = 384;
    for (const phase of phases) {
      page.drawRectangle({
        x: 42,
        y: y - 124,
        width: 1282,
        height: 110,
        color: colors.panel,
        borderColor: colors.cyan,
        borderWidth: 0.8,
      });
      page.drawText(phase.title, { x: 62, y: y - 44, size: 18, font: bold, color: colors.cyan });
      drawParagraph(page, fonts, phase.text, {
        x: 62,
        y: y - 74,
        size: 14,
        maxWidth: 1140,
        color: colors.text,
        leading: 20,
      });
      y -= 132;
    }
    drawFooter(page, fonts, pageIndex++);
  }

  // Slide 4 - Delivery framework
  {
    const page = pdf.addPage(size);
    const { width, height } = page.getSize();
    drawBackground(page, width, height);
    drawHeader(page, fonts, "Delivery Framework", "How we convert strategy into outcomes");

    const phases = [
      {
        title: "Phase 01 | Assessment & Priority Mapping",
        text: "Technical and business baseline, risk map, dependency review, and executive alignment on what matters first.",
      },
      {
        title: "Phase 02 | Controlled Implementation",
        text: "Sequenced execution with milestones, quality gates, and progress reporting to ensure predictable delivery.",
      },
      {
        title: "Phase 03 | Stabilization & Optimization",
        text: "Post-go-live hardening, performance tuning, and continuous improvements tied to operational and commercial KPIs.",
      },
    ];
    let y = 560;
    for (const p of phases) {
      page.drawRectangle({
        x: 42,
        y: y - 132,
        width: 1282,
        height: 118,
        color: colors.panel,
        borderColor: colors.cyan,
        borderWidth: 0.9,
      });
      page.drawText(p.title, {
        x: 64,
        y: y - 46,
        size: 19,
        font: bold,
        color: colors.cyanSoft,
      });
      drawParagraph(page, fonts, p.text, {
        x: 64,
        y: y - 77,
        size: 14,
        maxWidth: 1220,
        color: colors.text,
        leading: 22,
      });
      y -= 144;
    }
    drawFooter(page, fonts, pageIndex++);
  }

  // Slide 5 - Outcomes and proof
  {
    const page = pdf.addPage(size);
    const { width, height } = page.getSize();
    drawBackground(page, width, height);
    drawHeader(page, fonts, "Expected Business Outcomes", "Measurable value areas");

    drawCard(
      page,
      42,
      392,
      418,
      196,
      "Reliability & Continuity",
      "Lower service interruptions, stronger operational discipline, and better business continuity under pressure.",
      fonts,
      colors.cyan,
    );
    drawCard(
      page,
      474,
      392,
      418,
      196,
      "Security & Governance",
      "Improved security posture through practical controls, clearer ownership, and better incident readiness.",
      fonts,
      colors.accent,
    );
    drawCard(
      page,
      906,
      392,
      418,
      196,
      "Productivity & Growth",
      "Faster execution, less technical debt, and digital systems aligned with revenue and expansion priorities.",
      fonts,
      colors.amber,
    );

    const models = [
      {
        title: "Executive Visibility",
        text: "Clear status reports, transparent milestones, and risk-based recommendations for leadership teams.",
      },
      {
        title: "Operational Discipline",
        text: "Runbooks, standards, and repeatable processes that reduce ad-hoc firefighting.",
      },
      {
        title: "Scalable Architecture",
        text: "Technology choices and delivery plans built to support future growth and modernization.",
      },
    ];

    let x = 42;
    for (const model of models) {
      page.drawRectangle({
        x,
        y: 146,
        width: 418,
        height: 210,
        color: colors.panel,
        borderColor: colors.cyan,
        borderWidth: 0.8,
      });
      page.drawText(model.title, {
        x: x + 22,
        y: 324,
        size: 18,
        font: bold,
        color: colors.cyan,
      });
      drawParagraph(page, fonts, model.text, {
        x: x + 22,
        y: 292,
        size: 14,
        maxWidth: 368,
        color: colors.text,
        leading: 21,
      });
      x += 432;
    }
    drawFooter(page, fonts, pageIndex++);
  }

  // Slide 6 - Engagement models
  {
    const page = pdf.addPage(size);
    const { width, height } = page.getSize();
    drawBackground(page, width, height);
    drawHeader(page, fonts, "Engagement Models", "Flexible structures by maturity and urgency");

    const models = [
      {
        title: "Managed Services Partnership",
        bullets: [
          "Continuous monitoring, support, and optimization",
          "Predictable operational governance and SLAs",
          "Best for organizations needing stable long-term execution",
        ],
      },
      {
        title: "Project-Based Implementation",
        bullets: [
          "Defined scope, timeline, milestones, and acceptance criteria",
          "Controlled delivery for transformation initiatives",
          "Best for migrations, modernization, or specific upgrades",
        ],
      },
      {
        title: "Advisory & Architecture Guidance",
        bullets: [
          "Leadership advisory and technical roadmap planning",
          "Risk-based recommendations and investment prioritization",
          "Best for decision-stage planning and strategic alignment",
        ],
      },
    ];

    let y = 560;
    for (const model of models) {
      page.drawRectangle({
        x: 42,
        y: y - 132,
        width: 1282,
        height: 116,
        color: colors.panel,
        borderColor: colors.cyan,
        borderWidth: 0.9,
      });
      page.drawText(model.title, {
        x: 64,
        y: y - 46,
        size: 18,
        font: bold,
        color: colors.cyanSoft,
      });
      drawBullets(page, fonts, model.bullets, { x: 64, y: y - 74, maxWidth: 1220 });
      y -= 144;
    }
    drawFooter(page, fonts, pageIndex++);
  }

  // Slide 7 - Company and legal
  {
    const page = pdf.addPage(size);
    const { width, height } = page.getSize();
    drawBackground(page, width, height);
    drawHeader(page, fonts, "Company & Compliance Information", "Legal identity and registered details");

    const legalLines = [
      "Commercial Brand: VP TECHNOLOGIES | Domain: vp-tech.ro",
      "Legal Entity: VP INVESTMENTS SRL",
      "CUI: 51453103",
      "Trade Register: J2025018400006",
      "EUID: ROONRC.J2025018400006",
      "Incorporation Date: 2025-03-13",
      "Registered Office: VP INVESTMENTS SRL - verified contact information via Call Center",
      "County: Bucuresti | Locality: Sectorul 3",
      "Address: Bdul. Basarabia 242 Bl. MY7 Et. 7 Ap. 32 Cod 030352",
    ];

    page.drawRectangle({
      x: 42,
      y: 130,
      width: 1282,
      height: 460,
      color: colors.panel,
      borderColor: colors.cyan,
      borderWidth: 0.8,
    });

    drawBullets(page, fonts, legalLines, { x: 66, y: 548, maxWidth: 1220 });

    page.drawText("Next Step", {
      x: 66,
      y: 188,
      size: 16,
      font: bold,
      color: colors.accent,
    });
    drawParagraph(
      page,
      fonts,
      "Schedule a discovery session to map priorities, define delivery scope, and receive a recommended execution plan.",
      {
        x: 66,
        y: 164,
        size: 13,
        maxWidth: 1080,
        color: colors.text,
        leading: 19,
      },
    );

    drawFooter(page, fonts, pageIndex++);
  }

  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  const bytes = await pdf.save();
  await fs.writeFile(OUTPUT_FILE, bytes);
  console.log(`Generated: ${OUTPUT_FILE}`);
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
