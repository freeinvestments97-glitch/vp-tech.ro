export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LegalDocument = {
  title: string;
  effectiveDate: string;
  summary: string;
  disclaimer: string;
  sections: LegalSection[];
};

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  effectiveDate: "May 23, 2026",
  summary:
    "This Privacy Policy explains how VP INVESTMENTS SRL collects, uses, stores, and protects personal data in connection with our website, pre-contract communications, and professional technology services.",
  disclaimer:
    "Brand: VP TECHNOLOGIES (vp-tech.ro). Legal entity: VP INVESTMENTS SRL, CUI 51453103, Trade Register J2025018400006, EUID ROONRC.J2025018400006. This policy is drafted to align with core GDPR and EU ePrivacy principles and common Google transparency requirements. It remains your responsibility to validate final legal compliance with qualified counsel in every jurisdiction where services are offered.",
  sections: [
    {
      id: "scope",
      title: "1. Scope and Controller Information",
      paragraphs: [
        "VP INVESTMENTS SRL acts as a data controller for personal data processed through this website, pre-sales communication channels, and service-delivery interactions.",
        "This policy applies to prospective clients, existing clients, partner representatives, vendors, job candidates where applicable, and other individuals who interact with us electronically or operationally.",
        "Where we process data strictly on behalf of a client (for example, when supporting systems controlled by that client), we may operate as a data processor under client instructions and a separate processing agreement.",
      ],
    },
    {
      id: "data-collected",
      title: "2. Categories of Data We Collect",
      paragraphs: [
        "We collect information directly provided by you, information created during contractual collaboration, and technical information generated through website usage.",
        "We apply data minimization principles and collect only data reasonably necessary for legitimate business purposes, support quality, and legal obligations.",
      ],
      bullets: [
        "Identity and contact data, such as name, business email, phone number, company details, and role.",
        "Project and operational data, including infrastructure requirements, service requests, incident details, delivery notes, and related communication history.",
        "Billing and transaction data, such as invoicing details and payment status where required for contractual performance.",
        "Technical and usage data, such as IP address, browser type, device metadata, timestamps, pages visited, referral sources, and approximate location derived from network information.",
        "Security telemetry, including logs and alerts used to protect website services and investigate suspicious behavior.",
      ],
    },
    {
      id: "lawful-basis",
      title: "3. Legal Bases for Processing",
      paragraphs: [
        "Where applicable under Regulation (EU) 2016/679 (GDPR) and related national laws, we process personal data under one or more lawful bases.",
        "The lawful basis may vary by data category and processing activity. We maintain internal records to map processing purposes to legal grounds.",
      ],
      bullets: [
        "Performance of a contract, including service delivery, support, account management, and billing.",
        "Pre-contractual steps at your request, such as responding to a quotation or technical assessment request.",
        "Legitimate interests, including service quality improvement, system reliability, business continuity, network defense, and fraud prevention.",
        "Compliance with legal obligations.",
        "Consent, where processing specifically requires prior authorization (for example, certain non-essential cookies in the EU/EEA).",
      ],
    },
    {
      id: "purpose",
      title: "4. Purposes of Processing",
      paragraphs: [
        "We process data only for specific, explicit, and legitimate purposes connected to service delivery, website operation, and lawful business administration.",
      ],
      bullets: [
        "Responding to inquiries, quotations, and support requests.",
        "Designing, delivering, and maintaining contracted services.",
        "Service administration, invoicing, and operational coordination.",
        "Website security, incident detection, and abuse prevention.",
        "Performance measurement and user-experience improvements.",
        "Regulatory, accounting, contractual, and dispute-resolution obligations.",
      ],
    },
    {
      id: "google-services",
      title: "5. Google Services and Policy Transparency",
      paragraphs: [
        "Where Google products or services are enabled on this website (for example, analytics, advertising, tags, embedded content, or API-based integrations), we provide disclosures consistent with applicable Google policy requirements and local law.",
        "In the European Economic Area, United Kingdom, and Switzerland, consent-sensitive Google technologies should be activated only after obtaining valid user consent when required by law, including via a compliant consent mechanism.",
      ],
      bullets: [
        "Clear notice of data collection and use for analytics or advertising purposes.",
        "User controls for consent, rejection, and withdrawal where required.",
        "Respect for EU User Consent principles when Google advertising or measurement products are used.",
        "Contractual and configuration measures designed to avoid unauthorized data use.",
      ],
    },
    {
      id: "sharing",
      title: "6. Data Sharing and International Transfers",
      paragraphs: [
        "We do not sell personal data. We share data only where necessary with trusted processors and service providers that support hosting, communications, analytics, infrastructure operations, or security monitoring.",
        "We require third-party processors to handle personal data under appropriate contractual obligations, confidentiality duties, and security controls.",
        "Where transfers outside the EEA occur, we rely on recognized safeguards (such as adequacy decisions, Standard Contractual Clauses, and supplementary controls where appropriate).",
      ],
    },
    {
      id: "retention",
      title: "7. Data Retention and Security",
      paragraphs: [
        "We retain personal data only for as long as needed for stated purposes, contractual commitments, legal obligations, and legitimate security interests.",
        "Retention periods are determined according to data category, business necessity, legal requirements, and risk considerations. Data that is no longer needed is deleted, anonymized, or securely archived.",
        "We implement technical and organizational safeguards proportionate to processing risk, including role-based access controls, credential hygiene, encryption in transit where applicable, backup protections, and incident-response procedures.",
      ],
    },
    {
      id: "rights",
      title: "8. Data Subject Rights",
      paragraphs: [
        "Depending on your jurisdiction, you may have statutory rights regarding your personal data, particularly under GDPR for EU/EEA residents.",
        "Where a request cannot be fulfilled in full due to legal exemptions or overriding obligations, we will provide an explanation as required by law.",
      ],
      bullets: [
        "Right to access and obtain a copy of your personal data.",
        "Right to rectification of inaccurate or incomplete data.",
        "Right to erasure, where legally applicable.",
        "Right to object to or restrict certain processing activities.",
        "Right to data portability for applicable datasets.",
        "Right to withdraw consent for consent-based processing.",
        "Right to lodge a complaint with a competent supervisory authority.",
      ],
    },
    {
      id: "children",
      title: "9. Children and Sensitive Data",
      paragraphs: [
        "Our website and business services are intended for professional and business audiences and are not directed to children.",
        "We do not knowingly collect personal data from children under the age threshold established by applicable law without lawful authorization.",
        "We request that users avoid submitting unnecessary sensitive personal data through general contact channels unless explicitly requested and legally justified.",
      ],
    },
    {
      id: "contact",
      title: "10. Contact, Requests, and Policy Updates",
      paragraphs: [
        "For privacy-related requests, use the Contact page and provide sufficient details for identity verification and request handling.",
        "We may request additional information where reasonably necessary to confirm identity and protect data against unauthorized disclosure.",
        "We may revise this policy periodically to reflect legal, technical, or business changes. Material updates become effective upon publication with a revised date.",
      ],
    },
  ],
};

export const cookiePolicy: LegalDocument = {
  title: "Cookie Policy",
  effectiveDate: "May 23, 2026",
  summary:
    "This Cookie Policy explains how VP INVESTMENTS SRL uses cookies and related technologies to operate, secure, measure, and improve this website in line with EU transparency and consent principles.",
  disclaimer:
    "Brand: VP TECHNOLOGIES (vp-tech.ro). Legal entity: VP INVESTMENTS SRL, CUI 51453103, Trade Register J2025018400006, EUID ROONRC.J2025018400006. This policy is designed to align with EU ePrivacy and GDPR consent principles and common Google disclosure expectations. You should validate banner behavior and consent implementation with legal and compliance advisors.",
  sections: [
    {
      id: "what-are-cookies",
      title: "1. What Cookies Are",
      paragraphs: [
        "Cookies are small text files stored in your browser when visiting a website. Similar technologies include local storage, tags, and analytics identifiers.",
        "These technologies help maintain session continuity, improve functionality, and measure website performance in order to maintain quality and security.",
        "Some cookies are strictly necessary for technical operation, while others support analytics, personalization, or advertising-related functions where enabled.",
      ],
    },
    {
      id: "categories",
      title: "2. Categories of Cookies We Use",
      paragraphs: [
        "We classify cookies by technical purpose and legal basis, and we provide users with clear consent options where required.",
      ],
      bullets: [
        "Strictly necessary cookies: required for core operation, security, load balancing, and fraud mitigation.",
        "Functional cookies: remember language, accessibility, and user-interface preferences.",
        "Performance and analytics cookies: provide aggregated insight into traffic, content quality, and technical reliability.",
        "Measurement or advertising-related cookies: may support campaign effectiveness and audience insights where these features are enabled and lawful.",
      ],
    },
    {
      id: "purposes",
      title: "3. Why We Use Cookies",
      paragraphs: [
        "We use cookies and related technologies only for legitimate and disclosed purposes that support operation, quality, and legal compliance.",
      ],
      bullets: [
        "Authenticate sessions and preserve form or navigation state.",
        "Protect website infrastructure against abuse and anomalous traffic.",
        "Understand user journeys and improve content relevance.",
        "Monitor service availability and technical performance trends.",
        "Measure campaign or referral performance where applicable and consented.",
      ],
    },
    {
      id: "consent",
      title: "4. Consent Under EU/EEA Rules",
      paragraphs: [
        "In the EU/EEA and other jurisdictions with opt-in requirements, non-essential cookies should be activated only after valid consent is obtained.",
        "Consent requests should be specific, informed, and freely given, with a clear option to refuse non-essential processing without losing access to core website functionality.",
        "Users must be able to revisit and update consent preferences as easily as they granted them.",
      ],
    },
    {
      id: "google",
      title: "5. Google Technologies and Consent Signals",
      paragraphs: [
        "Where Google technologies (for example Google Analytics, Google Ads tags, or related Google measurement tools) are used, we provide disclosures about data collection, processing purposes, and available controls.",
        "Where legally required, consent signals should be transmitted to downstream measurement or advertising tools before non-essential Google tags execute.",
      ],
      bullets: [
        "Transparency about analytics and advertising-related identifiers.",
        "Support for consent-state updates and withdrawal behavior.",
        "Configuration intended to limit processing when consent is denied.",
      ],
    },
    {
      id: "third-parties",
      title: "6. Third-Party Technologies",
      paragraphs: [
        "Some cookies may be placed by approved third-party vendors that provide analytics, infrastructure, hosting, security, or communication services.",
        "Third parties process data according to their own policies and contractual obligations with us, and may act as independent controllers for portions of processing.",
      ],
    },
    {
      id: "consent-controls",
      title: "7. Browser and Device Controls",
      paragraphs: [
        "You can manage cookie preferences through browser settings and, where implemented, website-level consent controls.",
        "Blocking certain cookies may affect website functionality, personalized settings, analytics precision, or troubleshooting effectiveness.",
        "Most browsers also allow deletion of stored cookies and restriction of third-party cookies.",
      ],
    },
    {
      id: "retention",
      title: "8. Cookie Duration and Retention",
      paragraphs: [
        "Cookies may be session-based (deleted when your browser closes) or persistent (stored for a defined period).",
        "Retention periods vary by cookie purpose and are reviewed periodically for proportionality, security, and regulatory alignment.",
        "Cookie-related logs may be retained for security and auditing purposes for legally and operationally justified periods.",
      ],
    },
    {
      id: "updates",
      title: "9. Policy Changes",
      paragraphs: [
        "We may update this Cookie Policy as website features, vendor configurations, and legal requirements evolve.",
        "Updated versions become effective when published with a revised effective date.",
      ],
    },
  ],
};

export const termsAndConditions: LegalDocument = {
  title: "Terms and Conditions",
  effectiveDate: "May 23, 2026",
  summary:
    "These Terms and Conditions govern the use of this website and set out general legal principles for engaging VP INVESTMENTS SRL for professional services.",
  disclaimer:
    "Brand: VP TECHNOLOGIES (vp-tech.ro). Legal entity: VP INVESTMENTS SRL, CUI 51453103, Trade Register J2025018400006, EUID ROONRC.J2025018400006. These website terms are drafted to support transparency and legal clarity, including EU consumer and digital transparency principles where relevant. They do not replace signed service agreements or jurisdiction-specific legal advice.",
  sections: [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      paragraphs: [
        "By accessing or using this website, you acknowledge and agree to these Terms and Conditions.",
        "If you do not agree with these terms, you must discontinue website use.",
        "These terms apply to all visitors, users, and entities interacting with this website, subject to mandatory rights provided by applicable law.",
      ],
    },
    {
      id: "website-use",
      title: "2. Permitted Website Use",
      paragraphs: [
        "You may use this website for lawful business-information and communication purposes only.",
        "You agree to use the website in a manner that does not harm service stability, compromise security, or violate rights of others.",
      ],
      bullets: [
        "You must not attempt unauthorized access, disruption, scraping abuse, or security circumvention.",
        "You must not use website content in a misleading, unlawful, or infringing manner.",
        "You must not upload malware, execute automated abuse traffic, or attempt to interfere with logs, monitoring, or protective controls.",
      ],
    },
    {
      id: "services",
      title: "3. Professional Services and Contracts",
      paragraphs: [
        "Website descriptions are informational and do not constitute a binding offer.",
        "Any service engagement requires a separate written agreement that defines scope, deliverables, pricing, SLAs, responsibilities, and acceptance criteria.",
        "Where conflicts exist between these website terms and a signed agreement, the signed agreement governs the commercial relationship.",
      ],
    },
    {
      id: "fees",
      title: "4. Fees, Invoicing, and Payment",
      paragraphs: [
        "Commercial terms are set in project-specific contracts, proposals, or statements of work and may include fixed-fee, milestone-based, or recurring-service models.",
      ],
      bullets: [
        "Invoices are payable under the agreed payment schedule.",
        "Late or disputed payments may affect delivery timelines where contractually permitted.",
        "Taxes, duties, and regulatory charges are handled as specified in the governing agreement.",
      ],
    },
    {
      id: "ip",
      title: "5. Intellectual Property Rights",
      paragraphs: [
        "Unless otherwise agreed in writing, all pre-existing methodologies, frameworks, templates, and proprietary tools remain the property of VP INVESTMENTS SRL.",
        "Ownership and license rights for project-specific deliverables are defined in the relevant signed agreement.",
        "Third-party software, open-source components, and vendor licenses remain subject to their respective license terms and restrictions.",
      ],
    },
    {
      id: "confidentiality",
      title: "6. Confidentiality and Information Security",
      paragraphs: [
        "Both parties are expected to protect confidential business, technical, and operational information exchanged during collaboration.",
        "Each party remains responsible for security controls over systems, credentials, and endpoints within its own control.",
        "Confidential information must be used only for legitimate contractual purposes and protected with a degree of care consistent with industry practice and legal requirements.",
      ],
    },
    {
      id: "availability",
      title: "7. Website Availability and Changes",
      paragraphs: [
        "We may update, suspend, or modify website features, content, and technical components at any time to maintain quality, security, and operational reliability.",
        "While we strive for high availability, uninterrupted access is not guaranteed due to maintenance, upstream provider issues, or events beyond reasonable control.",
      ],
    },
    {
      id: "warranty-liability",
      title: "8. Warranties and Limitation of Liability",
      paragraphs: [
        "This website is provided on an \"as is\" and \"as available\" basis for informational purposes.",
        "To the maximum extent permitted by applicable law, VP INVESTMENTS SRL disclaims implied warranties and is not liable for indirect, incidental, consequential, special, or punitive damages arising from website use.",
        "Nothing in these terms excludes liability that cannot be lawfully excluded under applicable mandatory law.",
      ],
    },
    {
      id: "governing",
      title: "9. Governing Law and Dispute Handling",
      paragraphs: [
        "Applicable governing law and dispute-resolution mechanisms are specified in the signed commercial agreement between the parties.",
        "Where no signed agreement exists, disputes related solely to website use will be handled under the mandatory legal framework applicable to the relevant parties and forum.",
      ],
    },
    {
      id: "changes",
      title: "10. Amendments",
      paragraphs: [
        "We may update these Terms and Conditions periodically to reflect legal, technical, and service changes.",
        "Continued use of the website after publication of updated terms constitutes acceptance of the revised version to the extent permitted by law.",
      ],
    },
  ],
};

export const privacyPolicyRo: LegalDocument = {
  title: "Politică de confidențialitate",
  effectiveDate: "23 mai 2026",
  summary:
    "Această Politică de confidențialitate explică modul în care VP INVESTMENTS SRL colectează, utilizează, stochează și protejează datele cu caracter personal în legătură cu site-ul web, comunicarea precontractuală și serviciile noastre profesionale.",
  disclaimer:
    "Brand: VP TECHNOLOGIES (vp-tech.ro). Entitate juridică: VP INVESTMENTS SRL, CUI 51453103, Nr. Reg. Com. J2025018400006, EUID ROONRC.J2025018400006. Documentul urmărește principiile GDPR și ePrivacy, precum și cerințele de transparență uzuale ale platformelor digitale. Pentru conformitate juridică finală în fiecare jurisdicție este necesară validarea de către un consilier juridic.",
  sections: [
    {
      id: "scope",
      title: "1. Domeniu de aplicare și rolul operatorului",
      paragraphs: [
        "VP INVESTMENTS SRL acționează ca operator de date pentru prelucrările realizate prin acest site web, canale de comunicare comerciale și activități asociate prestării serviciilor.",
        "Politica se aplică persoanelor care interacționează cu noi ca potențiali clienți, clienți existenți, parteneri, furnizori sau alte persoane vizate.",
        "În scenariile în care prelucrăm date exclusiv la instrucțiunile clientului, putem acționa ca persoana împuternicită, în baza unui acord separat de prelucrare.",
      ],
    },
    {
      id: "data-collected",
      title: "2. Categorii de date prelucrate",
      paragraphs: [
        "Colectăm date furnizate direct de utilizator, date generate în cadrul relației contractuale și date tehnice rezultate din utilizarea site-ului web.",
        "Aplicăm principiul minimizării datelor și colectăm doar informațiile necesare pentru scopurile declarate.",
      ],
      bullets: [
        "Date de identificare și contact: nume, email, telefon, companie, funcție.",
        "Date operaționale și de proiect: cerințe tehnice, solicitări de servicii, istoric de comunicare, note de implementare.",
        "Date de facturare și tranzacție, acolo unde sunt necesare pentru executarea contractului.",
        "Date tehnice și de utilizare: IP, browser, metadate dispozitiv, timestamp-uri, pagini vizitate, surse de trafic, localizare aproximativă.",
        "Date de securitate: log-uri, alerte și indicatori necesari prevenirii abuzurilor și investigării incidentelor.",
      ],
    },
    {
      id: "lawful-basis",
      title: "3. Temeiuri legale ale prelucrării",
      paragraphs: [
        "În măsura aplicabilității Regulamentului (UE) 2016/679 (GDPR), prelucrăm datele în baza unuia sau mai multor temeiuri legale.",
        "Temeiul poate diferi în funcție de tipul datelor și scopul prelucrării.",
      ],
      bullets: [
        "Executarea unui contract sau demersuri precontractuale la solicitarea persoanei vizate.",
        "Interes legitim pentru securitate, continuitate, calitate și prevenirea fraudei.",
        "Respectarea obligațiilor legale, fiscale, contabile sau de conformitate.",
        "Consimțământ, acolo unde legea solicită explicit acord prealabil (ex. cookie-uri neesențiale în UE/SEE).",
      ],
    },
    {
      id: "purpose",
      title: "4. Scopurile prelucrării",
      paragraphs: [
        "Datele sunt prelucrate doar în scopuri explicite, legitime și relevante pentru activitatea noastră.",
      ],
      bullets: [
        "Răspuns la solicitări comerciale, oferte și cereri de suport.",
        "Planificarea, livrarea și mentenanța serviciilor contractate.",
        "Administrare operațională, facturare și coordonare proiect.",
        "Securitatea site-ului web, detecția anomaliilor și prevenirea utilizării abuzive.",
        "Analiza performanței și îmbunătățirea experienței utilizatorilor.",
        "Respectarea obligațiilor legale și gestionarea eventualelor litigii.",
      ],
    },
    {
      id: "google-services",
      title: "5. Servicii Google și transparență",
      paragraphs: [
        "Dacă sunt activate servicii Google (de exemplu, analytics, tag-uri de măsurare sau instrumente publicitare), oferim informații privind datele colectate, scopurile și controalele disponibile.",
        "Pentru SEE/UE/Elveția/Marea Britanie, tehnologiile neesențiale trebuie activate doar după obținerea unui consimțământ valid, acolo unde legea o impune.",
      ],
      bullets: [
        "Informare clară privind utilizarea identificatorilor de măsurare/publicitate.",
        "Mecanisme de acord, refuz și retragere a consimțământului.",
        "Configurări tehnice pentru limitarea prelucrării în lipsa consimțământului.",
      ],
    },
    {
      id: "sharing",
      title: "6. Partajare date și transferuri internaționale",
      paragraphs: [
        "Nu vindem date personale. Partajăm date doar cu furnizori de încredere, strict în măsura necesară furnizării serviciilor (hosting, comunicare, securitate, analitice).",
        "Furnizorii sunt obligați contractual să respecte confidențialitatea și securitatea datelor.",
        "Pentru transferuri în afara SEE, utilizăm mecanisme recunoscute (ex. SCC, decizii de adecvare, măsuri suplimentare unde este necesar).",
      ],
    },
    {
      id: "retention",
      title: "7. Retenție și securitate",
      paragraphs: [
        "Datele sunt păstrate doar pe perioade necesare scopurilor declarate, obligațiilor legale și intereselor legitime de securitate.",
        "Aplicăm măsuri tehnice și organizatorice proporționale cu riscul: control al accesului pe roluri, protecția credențialelor, criptare în tranzit unde este aplicabil, backup-uri și proceduri de răspuns la incidente.",
      ],
    },
    {
      id: "rights",
      title: "8. Drepturile persoanelor vizate",
      paragraphs: [
        "În funcție de jurisdicție, poți beneficia de drepturi legale asupra datelor tale, inclusiv conform GDPR.",
      ],
      bullets: [
        "Dreptul de acces la datele personale.",
        "Dreptul la rectificare a datelor inexacte sau incomplete.",
        "Dreptul la ștergere, în limitele prevăzute de lege.",
        "Dreptul la restricționare sau opoziție față de anumite prelucrări.",
        "Dreptul la portabilitate, unde este aplicabil.",
        "Dreptul de retragere a consimțământului pentru prelucrări bazate pe acord.",
        "Dreptul de a depune plângere la autoritatea de supraveghere competentă.",
      ],
    },
    {
      id: "children",
      title: "9. Date ale minorilor și date sensibile",
      paragraphs: [
        "Website-ul și serviciile noastre sunt orientate către mediul profesional și nu sunt destinate minorilor.",
        "Nu colectăm în mod intenționat date de la minori fără o bază legală adecvată.",
        "Solicităm utilizatorilor să nu transmită date sensibile nenecesare prin canalele generale de contact.",
      ],
    },
    {
      id: "contact",
      title: "10. Contact și actualizări",
      paragraphs: [
        "Pentru solicitări legate de protecția datelor, folosește pagina Contact și include informații suficiente pentru verificarea identității.",
        "Putem actualiza periodic această politică pentru a reflecta schimbări legale, tehnice sau operaționale. Versiunea actualizată produce efecte la publicare.",
      ],
    },
  ],
};

export const cookiePolicyRo: LegalDocument = {
  title: "Politică cookie",
  effectiveDate: "23 mai 2026",
  summary:
    "Această Politică cookie explică modul în care VP INVESTMENTS SRL utilizează cookie-uri și tehnologii similare pentru operare, securitate, analiză și optimizarea site-ului web.",
  disclaimer:
    "Brand: VP TECHNOLOGIES (vp-tech.ro). Entitate juridică: VP INVESTMENTS SRL, CUI 51453103, Nr. Reg. Com. J2025018400006, EUID ROONRC.J2025018400006. Textul urmărește principiile ePrivacy/GDPR și cerințele uzuale de transparență. Implementarea tehnică (banner, consimțământ, tagging) trebuie validată juridic.",
  sections: [
    {
      id: "what-are-cookies",
      title: "1. Ce sunt cookie-urile",
      paragraphs: [
        "Cookie-urile sunt fișiere text mici stocate în browserul utilizatorului. Tehnologii similare includ local storage, identificatori de sesiune și tag-uri de măsurare.",
        "Aceste tehnologii susțin funcționarea site-ului web, securitatea, personalizarea experienței și analiza performanței.",
      ],
    },
    {
      id: "categories",
      title: "2. Categorii de cookie-uri",
      paragraphs: [
        "Clasificam cookie-urile în funcție de scop și de baza legală aplicabilă.",
      ],
      bullets: [
        "Cookie-uri strict necesare: funcționare tehnică, securitate, stabilitate.",
        "Cookie-uri funcționale: preferințe de limbă, interfață, accesibilitate.",
        "Cookie-uri de performanță/analiză: măsurare trafic și comportament agregat.",
        "Cookie-uri de măsurare/publicitate: pot fi utilizate unde sunt activate și legal permise.",
      ],
    },
    {
      id: "purposes",
      title: "3. Scopuri de utilizare",
      paragraphs: [
        "Folosim cookie-uri doar pentru scopuri legitime, explicit comunicate utilizatorilor.",
      ],
      bullets: [
        "Menținerea sesiunii și persistența setărilor de bază.",
        "Protecție împotriva utilizării abuzive și monitorizare securitate.",
        "Analiza calității conținutului și a fluxurilor de navigare.",
        "Măsurarea performanței site-ului web și a disponibilității serviciilor.",
      ],
    },
    {
      id: "consent",
      title: "4. Consimțământ în UE/SEE",
      paragraphs: [
        "În jurisdicțiile cu cerințe de opt-in, cookie-urile neesențiale se activează doar după exprimarea unui consimțământ valid.",
        "Utilizatorii trebuie să poată refuza cookie-uri neesențiale fără a pierde accesul la funcționalitățile esențiale ale site-ului web.",
        "Consimțământul poate fi revocat sau modificat la fel de ușor cum a fost acordat.",
      ],
    },
    {
      id: "google",
      title: "5. Tehnologii Google",
      paragraphs: [
        "Dacă folosim tehnologii Google (ex. Google Analytics, tag-uri Google Ads), oferim informații privind datele colectate și scopurile prelucrării.",
        "Acolo unde este obligatoriu legal, semnalele de consimțământ trebuie respectate înainte de execuția tag-urilor neesențiale.",
      ],
    },
    {
      id: "third-parties",
      title: "6. Tehnologii terte",
      paragraphs: [
        "Unele cookie-uri pot fi setate de furnizori terți (hosting, analiză, securitate, comunicare).",
        "Acești furnizori pot acționa ca operatori independenți pentru anumite prelucrări, conform propriilor politici.",
      ],
    },
    {
      id: "consent-controls",
      title: "7. Control cookie-uri",
      paragraphs: [
        "Poți gestiona cookie-urile din setările browserului și, dacă este implementat, din mecanismul de preferințe al site-ului web.",
        "Blocarea anumitor cookie-uri poate afecta funcționalitatea, personalizarea și acuratețea măsurătorilor.",
      ],
    },
    {
      id: "retention",
      title: "8. Durata și retenție",
      paragraphs: [
        "Cookie-urile pot fi de sesiune (se șterg la închiderea browserului) sau persistente (rămân până la expirare sau ștergere manuală).",
        "Duratele sunt revizuite periodic pentru proporționalitate și aliniere la cerințele legale.",
      ],
    },
    {
      id: "updates",
      title: "9. Actualizări politică",
      paragraphs: [
        "Putem actualiza politica cookie în funcție de schimbări tehnice, operaționale sau legislative. Versiunea actualizată intră în vigoare la data publicării.",
      ],
    },
  ],
};

export const termsAndConditionsRo: LegalDocument = {
  title: "Termeni și condiții",
  effectiveDate: "23 mai 2026",
  summary:
    "Acești Termeni și condiții reglementează utilizarea site-ului web și definesc principiile generale de colaborare cu VP INVESTMENTS SRL.",
  disclaimer:
    "Brand: VP TECHNOLOGIES (vp-tech.ro). Entitate juridică: VP INVESTMENTS SRL, CUI 51453103, Nr. Reg. Com. J2025018400006, EUID ROONRC.J2025018400006. Termenii au caracter informativ pentru site-ul web și nu înlocuiesc contractele comerciale semnate sau consultanța juridică specializată.",
  sections: [
    {
      id: "acceptance",
      title: "1. Acceptarea termenilor",
      paragraphs: [
        "Prin accesarea și utilizarea site-ului web, confirmi că ai citit și accepți acești termeni.",
        "Dacă nu ești de acord cu termenii, trebuie să încetezi utilizarea site-ului web.",
      ],
    },
    {
      id: "website-use",
      title: "2. Utilizare permisă",
      paragraphs: [
        "Site-ul web poate fi utilizat doar în scopuri legale, profesionale și informaționale.",
      ],
      bullets: [
        "Este interzisă încercarea de acces neautorizat, perturbare, scraping abuziv sau ocolire a măsurilor de securitate.",
        "Este interzisă utilizarea conținutului în mod ilegal, înșelător sau care încalcă drepturile terților.",
      ],
    },
    {
      id: "services",
      title: "3. Servicii profesionale și contracte",
      paragraphs: [
        "Descrierile de servicii de pe site-ul web au caracter informativ și nu reprezintă o ofertă contractuală fermă.",
        "Orice colaborare comercială necesită acord scris separat (propunere, SOW, contract) care stabilește scop, livrabile, prețuri, SLA și responsabilități.",
      ],
    },
    {
      id: "fees",
      title: "4. Tarife și plăți",
      paragraphs: [
        "Condițiile comerciale se stabilesc prin documentele contractuale ale fiecărui proiect.",
      ],
      bullets: [
        "Facturile se achită conform termenelor agreate contractual.",
        "Întârzierile de plată pot afecta calendarul de livrare, conform acordului semnat.",
      ],
    },
    {
      id: "ip",
      title: "5. Drepturi de proprietate intelectuală",
      paragraphs: [
        "Metodologiile, cadrele de lucru, șabloanele și instrumentele preexistente rămân proprietatea VP INVESTMENTS SRL, dacă nu se stabilește altfel în scris.",
        "Drepturile asupra livrabilelor specifice proiectului sunt definite în contractul aplicabil.",
      ],
    },
    {
      id: "confidentiality",
      title: "6. Confidențialitate și securitate",
      paragraphs: [
        "Părțile trebuie să protejeze informațiile confidențiale tehnice, comerciale și operaționale schimbate în colaborare.",
        "Fiecare parte este responsabilă pentru securitatea sistemelor și credentialelor aflate sub control propriu.",
      ],
    },
    {
      id: "availability",
      title: "7. Disponibilitatea site-ului web",
      paragraphs: [
        "Putem modifica, suspenda sau actualiza funcționalități ale site-ului web pentru mentenanță, securitate sau optimizare.",
        "Deși urmărim disponibilitate ridicată, accesul continuu nu este garantat în orice moment.",
      ],
    },
    {
      id: "warranty-liability",
      title: "8. Garanții și limitarea răspunderii",
      paragraphs: [
        "Site-ul web este furnizat \"ca atare\" și \"în funcție de disponibilitate\", exclusiv în scop informativ.",
        "În limitele permise de lege, VP INVESTMENTS SRL nu răspunde pentru daune indirecte, incidentale sau consecințe rezultate din utilizarea site-ului web.",
      ],
    },
    {
      id: "governing",
      title: "9. Lege aplicabilă și litigii",
      paragraphs: [
        "Legea aplicabilă și mecanismele de soluționare a litigiilor se stabilesc în contractele comerciale semnate între părți.",
      ],
    },
    {
      id: "changes",
      title: "10. Modificarea termenilor",
      paragraphs: [
        "Putem actualiza periodic acești termeni pentru a reflecta schimbări legale sau operaționale.",
        "Continuarea utilizării site-ului web după publicarea noii versiuni reprezintă acceptarea termenilor actualizați, în limitele legii.",
      ],
    },
  ],
};

