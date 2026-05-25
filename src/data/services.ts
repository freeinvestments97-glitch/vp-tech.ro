export type ServiceModule = {
  slug: string;
  title: string;
  unit: string;
  description: string;
  scope: string;
  details: string[];
  deliverables: string[];
  engagement: string[];
};

export const serviceModules: ServiceModule[] = [
  {
    slug: "windows-server-administration",
    title: "Windows Server Administration",
    unit: "Infrastructure Operations",
    description:
      "Expert deployment, configuration, and ongoing management of Windows Server environments including Active Directory, file services, hardening, and performance tuning.",
    scope:
      "Enterprise-grade Windows environments requiring stable identity, storage, and policy control.",
    details: [
      "Deployment and lifecycle maintenance for all Windows Server versions.",
      "Active Directory, policy governance, and file service optimization.",
      "Security hardening baselines and sustained performance tuning.",
    ],
    deliverables: [
      "Active Directory health assessment and remediation plan.",
      "Group Policy baseline templates for secure operations.",
      "Server performance report with tuning recommendations.",
    ],
    engagement: [
      "Initial audit and architecture review.",
      "Phased implementation with validation checkpoints.",
      "Ongoing monitoring and monthly optimization cycle.",
    ],
  },
  {
    slug: "linux-server-management",
    title: "Linux Server Management",
    unit: "Infrastructure Operations",
    description:
      "Comprehensive support for Ubuntu, CentOS, and other distributions including installation, package lifecycle, security configuration, and troubleshooting.",
    scope:
      "Production Linux servers running web, database, automation, and business-critical workloads.",
    details: [
      "Installation and configuration across production Linux distributions.",
      "Package management, patching strategy, and service availability control.",
      "Hardening, incident response, and deep troubleshooting workflows.",
    ],
    deliverables: [
      "Hardened server build aligned with security best practices.",
      "Patch and package lifecycle policy for predictable updates.",
      "Runbook for incidents, service restarts, and troubleshooting.",
    ],
    engagement: [
      "Provisioning and baseline configuration.",
      "Security and reliability checks per release window.",
      "Operational support with escalation paths.",
    ],
  },
  {
    slug: "cpanel-whm-server-management",
    title: "cPanel & WHM Server Management",
    unit: "Hosting Control",
    description:
      "Efficient management of cPanel and WHM stacks for streamlined hosting operations, account management, and website upkeep.",
    scope:
      "Shared and dedicated hosting stacks where uptime and account isolation are essential.",
    details: [
      "Server provisioning, account lifecycle operations, and panel hygiene.",
      "Operational monitoring for hosting uptime and issue prevention.",
      "Maintenance strategy for predictable and stable web platform delivery.",
    ],
    deliverables: [
      "WHM/cPanel environment baseline and security configuration.",
      "Account provisioning standards and backup strategy.",
      "Hosting maintenance checklist for recurring operations.",
    ],
    engagement: [
      "Platform assessment and hardening.",
      "Account migration and DNS cutover planning.",
      "Continuous maintenance and outage prevention.",
    ],
  },
  {
    slug: "microsoft-exchange-services",
    title: "Microsoft Exchange Services",
    unit: "Communication Systems",
    description:
      "Professional setup, migration, and management of on-premise or cloud Microsoft Exchange for secure and reliable business communications.",
    scope:
      "Email infrastructures requiring secure collaboration, migration continuity, and policy governance.",
    details: [
      "Exchange architecture, setup, and mailbox migration planning.",
      "On-premise and cloud service administration with continuity controls.",
      "Security posture, policy governance, and business email reliability.",
    ],
    deliverables: [
      "Migration path with phased mailbox transition plan.",
      "Mail flow and anti-spam/anti-malware policy configuration.",
      "Operational handover document for administrators.",
    ],
    engagement: [
      "Discovery and dependency mapping.",
      "Pilot migration and full production rollout.",
      "Post-migration support and optimization.",
    ],
  },
  {
    slug: "network-design-implementation",
    title: "Network Design & Implementation",
    unit: "Network Engineering",
    description:
      "Secure and scalable LAN and WAN environments from architecture planning through hardware deployment and live configuration.",
    scope:
      "Organizations scaling offices or sites that need resilient, high-performance networks.",
    details: [
      "Network blueprinting for LAN and WAN performance objectives.",
      "Hardware installation and configuration across secure topologies.",
      "Scalable architecture tuned for growth and operational resilience.",
    ],
    deliverables: [
      "Network topology and segmentation design.",
      "Device configuration standards and failover strategy.",
      "Documentation pack with diagrams and IP allocation plans.",
    ],
    engagement: [
      "Capacity and requirement assessment.",
      "Design, staged deployment, and acceptance testing.",
      "Operational optimization after go-live.",
    ],
  },
  {
    slug: "network-cable-installations",
    title: "Network Cable Installations",
    unit: "Field Infrastructure",
    description:
      "Professional structured cabling for new and existing commercial locations, including shopping centers and retail spaces.",
    scope:
      "Commercial spaces needing clean, standards-based physical network infrastructure.",
    details: [
      "Structured cabling for new constructions and existing facilities.",
      "Commercial deployment support for malls, stores, and office zones.",
      "Physical layer standards that sustain high-throughput operations.",
    ],
    deliverables: [
      "Site survey and cable route design.",
      "Installation with labeling and termination standards.",
      "Certification test report and as-built documentation.",
    ],
    engagement: [
      "On-site survey and installation planning.",
      "Low-disruption execution with quality checks.",
      "Final testing and handover package.",
    ],
  },
  {
    slug: "network-security-solutions",
    title: "Network Security Solutions",
    unit: "Cyber Defense",
    description:
      "Firewall, VPN, and intrusion detection implementation to protect digital operations from internal and external threats.",
    scope:
      "Businesses requiring layered defense and controlled remote access across locations.",
    details: [
      "Firewall policy architecture and hardened access boundaries.",
      "VPN deployment for secure remote traffic and team connectivity.",
      "Intrusion detection implementation and threat-response readiness.",
    ],
    deliverables: [
      "Security architecture map and risk-reduction priorities.",
      "Firewall rulebook and VPN access policy documentation.",
      "Alerting baseline with response procedures.",
    ],
    engagement: [
      "Risk analysis and architecture design.",
      "Security control rollout and policy validation.",
      "Ongoing rule tuning and incident readiness checks.",
    ],
  },
  {
    slug: "wordpress-development",
    title: "WordPress Development",
    unit: "Web Operations",
    description:
      "Custom theme and plugin development with maintenance and performance optimization for business-critical WordPress platforms.",
    scope:
      "Marketing and content platforms that need custom behavior, speed, and maintainability.",
    details: [
      "Custom theme and plugin engineering for exact business requirements.",
      "Maintenance pipelines that reduce risk and preserve stability.",
      "Performance optimization to improve speed and platform reliability.",
    ],
    deliverables: [
      "Custom theme/plugin package with documented configuration.",
      "Security and update maintenance workflow.",
      "Performance baseline and optimization report.",
    ],
    engagement: [
      "Requirements workshop and architecture definition.",
      "Iterative development with QA review cycles.",
      "Post-launch support and optimization sprints.",
    ],
  },
  {
    slug: "ai-development",
    title: "AI Development",
    unit: "Advanced Systems",
    description:
      "Artificial intelligence integrations that automate workflows, surface insights, and power smarter operational decisions.",
    scope:
      "Teams seeking practical AI capabilities that produce measurable efficiency gains.",
    details: [
      "AI integration for process automation and reduced manual effort.",
      "Insight generation pipelines for data-informed decision support.",
      "Custom intelligent features embedded into operational software.",
    ],
    deliverables: [
      "Use-case map prioritizing highest-value automation opportunities.",
      "AI workflow prototype integrated with existing systems.",
      "Monitoring framework for quality, latency, and model behavior.",
    ],
    engagement: [
      "Discovery workshop and data readiness review.",
      "Pilot build with measurable success criteria.",
      "Scale-up rollout and governance alignment.",
    ],
  },
  {
    slug: "online-stores",
    title: "Online Stores",
    unit: "Commerce Systems",
    description:
      "E-commerce engineering using OpenCart, Shopify, WooCommerce, or fully custom platforms tailored to your sales model.",
    scope:
      "Commerce teams launching or modernizing online sales channels and checkout operations.",
    details: [
      "Development across OpenCart, Shopify, WooCommerce, and custom stacks.",
      "Checkout, catalog, and inventory systems aligned with sales strategy.",
      "Secure and scalable storefront operations for sustained growth.",
    ],
    deliverables: [
      "Store architecture and platform implementation plan.",
      "Payment, shipping, and catalog integration setup.",
      "Performance and conversion optimization roadmap.",
    ],
    engagement: [
      "Business model and catalog planning.",
      "Build, integration, and launch readiness testing.",
      "Continuous conversion and operational improvements.",
    ],
  },
  {
    slug: "custom-crm-erp-development",
    title: "Custom CRM & ERP Development",
    unit: "Business Intelligence",
    description:
      "Custom software platforms for schools, e-commerce, and SaaS companies designed around exact business workflows.",
    scope:
      "Organizations needing bespoke operational software rather than off-the-shelf constraints.",
    details: [
      "Workflow-driven CRM and ERP systems tailored to operations.",
      "Platforms built for online schools, e-commerce, and SaaS models.",
      "End-to-end process visibility and operational control by design.",
    ],
    deliverables: [
      "Process map and solution architecture blueprint.",
      "Custom modules for sales, operations, and reporting.",
      "Admin dashboards and role-based access controls.",
    ],
    engagement: [
      "Process discovery and platform design.",
      "Phased build with milestone-based delivery.",
      "Enhancement cycles tied to business KPIs.",
    ],
  },
  {
    slug: "microsoft-365-administration",
    title: "Microsoft 365 Administration",
    unit: "Cloud Operations",
    description:
      "End-to-end Microsoft 365 management including users, licenses, security policies, SharePoint, Teams, and Exchange Online.",
    scope:
      "Cloud productivity environments that need governance, security, and support continuity.",
    details: [
      "User lifecycle and license governance across Microsoft 365.",
      "Policy and security administration for compliance-oriented operations.",
      "SharePoint, Teams, and Exchange Online service oversight.",
    ],
    deliverables: [
      "Tenant governance framework and admin baselines.",
      "Security policy package for identity and device control.",
      "Operational guide for daily admin and escalations.",
    ],
    engagement: [
      "Tenant assessment and policy alignment.",
      "Configuration rollout with stakeholder enablement.",
      "Managed administration and regular reviews.",
    ],
  },
  {
    slug: "on-site-remote-it-support",
    title: "On-Site & Remote IT Support",
    unit: "Support Command",
    description:
      "Fast technical support for desktops, laptops, and peripherals with both field and remote intervention capabilities.",
    scope:
      "Business users requiring rapid issue resolution and minimal downtime across endpoints.",
    details: [
      "Rapid issue response for desktop, laptop, and device environments.",
      "On-site intervention for physical incidents and infrastructure faults.",
      "Remote support for immediate triage and continuity preservation.",
    ],
    deliverables: [
      "Ticket triage workflow and escalation matrix.",
      "Remote support toolkit and response procedures.",
      "Recurring incident analysis for preventive action.",
    ],
    engagement: [
      "Support baseline setup and SLA definition.",
      "Daily operational support with priority handling.",
      "Monthly review of incidents and improvements.",
    ],
  },
  {
    slug: "microsoft-windows-support",
    title: "Microsoft Windows Support",
    unit: "Endpoint Management",
    description:
      "Expert troubleshooting, optimization, and maintenance for all Microsoft Windows operating system versions.",
    scope:
      "Workstations and business devices running Windows that need reliability and performance tuning.",
    details: [
      "Troubleshooting and repair across modern and legacy Windows editions.",
      "System optimization for speed, reliability, and user productivity.",
      "Maintenance strategy for stable endpoint operations at scale.",
    ],
    deliverables: [
      "Endpoint health check and remediation actions.",
      "Performance optimization playbook for user devices.",
      "Maintenance plan with patch and update governance.",
    ],
    engagement: [
      "Diagnostic assessment and prioritization.",
      "Remediation and optimization execution.",
      "Preventive maintenance and support continuity.",
    ],
  },
  {
    slug: "payment-terminal-services",
    title: "Payment Terminal Services",
    unit: "Retail Systems",
    description:
      "Installation, configuration, and troubleshooting of POS terminals for secure and uninterrupted transaction processing.",
    scope:
      "Retail and service environments where payment uptime directly impacts revenue.",
    details: [
      "POS terminal deployment and live environment configuration.",
      "Operational troubleshooting for transaction continuity.",
      "Secure payment workflows aligned with retail uptime requirements.",
    ],
    deliverables: [
      "Terminal deployment checklist and site configuration records.",
      "Connectivity and transaction validation report.",
      "Incident response guide for payment disruptions.",
    ],
    engagement: [
      "Pre-deployment readiness review.",
      "Installation and on-site verification.",
      "Ongoing support for updates and troubleshooting.",
    ],
  },
];

type ServiceTranslation = Omit<ServiceModule, "slug">;

const serviceModulesRo: Record<string, ServiceTranslation> = {
  "windows-server-administration": {
    title: "Administrare Windows Server",
    unit: "Operațiuni Infrastructură",
    description:
      "Implementare, configurare și administrare continuă pentru medii Windows Server, inclusiv Active Directory, servicii de fișiere, consolidare de securitate și optimizare de performanță.",
    scope:
      "Medii enterprise Windows care necesită control stabil al identității, stocării și politicilor.",
    details: [
      "Implementare și mentenanță pentru toate versiunile Windows Server.",
      "Administrare Active Directory, Group Policy și optimizare servicii de fișiere.",
      "Consolidare de securitate și ajustare periodică a performanței.",
    ],
    deliverables: [
      "Audit Active Directory cu plan de remediere.",
      "Configurație de bază Group Policy pentru operare sigură.",
      "Raport de performanță cu recomandări aplicabile.",
    ],
    engagement: [
      "Audit inițial și evaluare arhitecturală.",
      "Implementare etapizată cu validări tehnice.",
      "Monitorizare continuă și optimizare periodică.",
    ],
  },
  "linux-server-management": {
    title: "Administrare Servere Linux",
    unit: "Operațiuni Infrastructură",
    description:
      "Suport complet pentru distribuții Linux (Ubuntu, CentOS etc.), incluzând instalare, configurare de securitate, administrarea actualizărilor și depanare.",
    scope:
      "Servere Linux de producție pentru workload-uri web, baze de date, automatizare și aplicații critice.",
    details: [
      "Instalare și configurare pentru distribuții Linux enterprise.",
      "Administrare pachete, actualizări și controlul disponibilității serviciilor.",
      "Consolidare de securitate, răspuns la incidente și depanare avansată.",
    ],
    deliverables: [
      "Configurare Linux consolidată conform bunelor practici.",
      "Politică de actualizare și ciclu predictibil de update-uri.",
      "Runbook operațional pentru incidente și recuperare.",
    ],
    engagement: [
      "Configurare inițială și stabilirea parametrilor de bază.",
      "Verificări de securitate și fiabilitate pe ferestre de schimbare.",
      "Suport operațional cu escaladare clară.",
    ],
  },
  "cpanel-whm-server-management": {
    title: "Administrare cPanel și WHM",
    unit: "Control Hosting",
    description:
      "Administrare eficientă a serverelor cPanel/WHM pentru operarea platformelor de hosting, administrarea conturilor și mentenanța site-urilor web.",
    scope:
      "Stack-uri hosting shared sau dedicate unde uptime-ul și izolarea conturilor sunt esențiale.",
    details: [
      "Configurare inițială server, operațiuni pe conturi și menținerea sănătății platformei.",
      "Monitorizare operațională pentru prevenirea incidentelor.",
      "Plan de mentenanță pentru livrare stabilă în producție.",
    ],
    deliverables: [
      "Baseline de securitate pentru WHM/cPanel.",
      "Standard de configurare conturi și strategie de backup.",
      "Checklist de operare recurentă pentru hosting.",
    ],
    engagement: [
      "Evaluare platformă și hardening.",
      "Migrare conturi și planificare DNS cutover.",
      "Mentenanță continuă și prevenire întreruperi.",
    ],
  },
  "microsoft-exchange-services": {
    title: "Servicii Microsoft Exchange",
    unit: "Sisteme de Comunicare",
    description:
      "Implementare, migrare și administrare Exchange on-premise sau cloud pentru comunicare de afaceri sigură și fiabilă.",
    scope:
      "Infrastructuri email care necesită continuitate, politici de securitate și colaborare controlată.",
    details: [
      "Arhitectură Exchange, configurare inițială și planificare migrare mailbox-uri.",
      "Administrare on-premise și cloud cu măsuri de continuitate.",
      "Configurare securitate, politici și fiabilitate mail-flow.",
    ],
    deliverables: [
      "Plan de migrare etapizat pentru cutover controlat.",
      "Configurări anti-spam/anti-malware și politici mail-flow.",
      "Document de transfer operațional pentru administratori.",
    ],
    engagement: [
      "Discovery tehnic și mapare dependințe.",
      "Pilot de migrare urmat de implementare completă în producție.",
      "Suport post-migrare și optimizare.",
    ],
  },
  "network-design-implementation": {
    title: "Design și Implementare Rețea",
    unit: "Inginerie Rețea",
    description:
      "Rețele LAN/WAN sigure și scalabile, de la arhitectură și planificare până la instalare hardware și configurare în producție.",
    scope:
      "Companii care extind locații și au nevoie de rețele reziliente, performante și ușor de administrat.",
    details: [
      "Proiectare topologie LAN/WAN orientată pe performanță.",
      "Instalare echipamente și configurare topologii securizate.",
      "Arhitectură scalabilă pentru creștere susținută.",
    ],
    deliverables: [
      "Design de topologie și segmentare rețea.",
      "Standarde de configurare echipamente și failover.",
      "Documentație tehnică cu diagrame și plan IP.",
    ],
    engagement: [
      "Evaluare capacitate și cerințe.",
      "Design, implementare etapizată și testare de acceptanță.",
      "Optimizare operațională după lansarea în producție.",
    ],
  },
  "network-cable-installations": {
    title: "Instalări Cablare Rețea",
    unit: "Infrastructură Fizică",
    description:
      "Cablare structurată profesională pentru spații comerciale noi sau existente, inclusiv mall-uri și magazine.",
    scope:
      "Locații comerciale care necesită infrastructură fizică standardizată și fiabilă.",
    details: [
      "Cablare structurată pentru construcții noi și modernizări.",
      "Implementare în centre comerciale, retail și birouri.",
      "Standardizare a stratului fizic pentru debit ridicat.",
    ],
    deliverables: [
      "Analiză la fața locului și proiectare trasee de cablare.",
      "Instalare cu etichetare și terminare conform standardelor.",
      "Raport certificare și documentație as-built.",
    ],
    engagement: [
      "Analiza locație și planificare implementare.",
      "Execuție cu impact minim asupra operațiunilor.",
      "Testare finală și predare tehnică.",
    ],
  },
  "network-security-solutions": {
    title: "Soluții de Securitate Rețea",
    unit: "Apărare Cibernetică",
    description:
      "Implementare firewall, VPN și sisteme de detecție intruziuni pentru protecție împotriva amenințărilor interne și externe.",
    scope:
      "Companii care au nevoie de apărare stratificată și acces la distanță controlat.",
    details: [
      "Arhitectură politici firewall și control acces.",
      "Implementare VPN pentru trafic securizat la distanță.",
      "Detectarea intruziunilor și pregătire pentru răspuns la incidente.",
    ],
    deliverables: [
      "Hartă arhitectură securitate și priorități de risc.",
      "Rulebook firewall și politici de acces VPN.",
      "Baseline alertare și proceduri de răspuns.",
    ],
    engagement: [
      "Analiza risc și design arhitectural.",
      "Implementare controale și validare politici.",
      "Ajustare continuă a regulilor și pregătire operațională.",
    ],
  },
  "wordpress-development": {
    title: "Dezvoltare WordPress",
    unit: "Operațiuni Web",
    description:
      "Dezvoltare teme și plugin-uri personalizate, mentenanță și optimizare de performanță pentru platforme WordPress critice pentru afaceri.",
    scope:
      "Platforme de marketing și conținut care necesită funcționalități personalizate și viteză ridicată.",
    details: [
      "Dezvoltare temă/plugin conform cerințelor de afaceri.",
      "Fluxuri de mentenanță pentru stabilitate și siguranță.",
      "Optimizare performanță pentru viteză și disponibilitate.",
    ],
    deliverables: [
      "Pachet personalizat temă/plugin cu documentație.",
      "Flux de lucru pentru actualizare și mentenanță securizată.",
      "Raport de bază pentru performanță și optimizare.",
    ],
    engagement: [
      "Workshop cerințe și definire arhitectură.",
      "Dezvoltare iterativă cu cicluri QA.",
      "Suport post-lansare și sprinturi de optimizare.",
    ],
  },
  "ai-development": {
    title: "Dezvoltare AI",
    unit: "Sisteme Avansate",
    description:
      "Integrare soluții AI pentru automatizarea proceselor, generarea de informații utile și aplicații de afaceri mai inteligente.",
    scope:
      "Echipe care doresc capabilități AI practice cu impact măsurabil.",
    details: [
      "Automatizare fluxuri și reducere efort manual.",
      "Fluxuri de analiză pentru decizii informate.",
      "Capabilități inteligente integrate în software-ul existent.",
    ],
    deliverables: [
      "Hartă de cazuri de utilizare cu prioritizare după valoare.",
      "Prototip AI integrat cu sistemele existente.",
      "Cadru de monitorizare pentru calitate și latență.",
    ],
    engagement: [
      "Discovery și evaluare a nivelului de pregătire a datelor.",
      "Pilot cu criterii clare de succes.",
      "Extindere în producție cu guvernanță adecvată.",
    ],
  },
  "online-stores": {
    title: "Magazine Online",
    unit: "Sisteme E-Commerce",
    description:
      "Dezvoltare soluții e-commerce pe OpenCart, Shopify, WooCommerce sau platforme personalizate, adaptate modelului comercial.",
    scope:
      "Companii care lansează sau modernizează canale de vânzare online.",
    details: [
      "Implementare pe OpenCart, Shopify, WooCommerce sau platforme personalizate.",
      "Checkout, catalog și inventar aliniate obiectivelor de vânzare.",
      "Storefront sigur și scalabil pentru creștere susținută.",
    ],
    deliverables: [
      "Arhitectură magazin și plan de implementare.",
      "Configurare plăți, livrare și integrări catalog.",
      "Roadmap optimizare conversie și performanță.",
    ],
    engagement: [
      "Planificare model de afaceri și structură catalog.",
      "Build, integrare și testare pre-launch.",
      "Optimizare continuă pentru creștere conversie.",
    ],
  },
  "custom-crm-erp-development": {
    title: "Dezvoltare CRM și ERP Custom",
    unit: "Inteligență de Business",
    description:
      "Platforme software personalizate pentru școli online, e-commerce și SaaS, proiectate în jurul fluxurilor reale de lucru.",
    scope:
      "Organizații care au nevoie de software personalizat, nu limitări din soluții standard.",
    details: [
      "Sisteme CRM/ERP proiectate pe procese operaționale reale.",
      "Platforme pentru școli online, e-commerce și companii SaaS.",
      "Vizibilitate end-to-end asupra operațiunilor.",
    ],
    deliverables: [
      "Hartă proceselor și blueprint de arhitectură.",
      "Module personalizate pentru vânzări, operațiuni și raportare.",
      "Panouri de control administrative și control acces pe roluri.",
    ],
    engagement: [
      "Discovery de procese și design platformă.",
      "Dezvoltare etapizată pe milestone-uri.",
      "Cicluri de îmbunătățire corelate cu indicatori de performanță pentru afacere.",
    ],
  },
  "microsoft-365-administration": {
    title: "Administrare Microsoft 365",
    unit: "Operațiuni Cloud",
    description:
      "Management complet Microsoft 365: utilizatori, licențe, politici de securitate, SharePoint, Teams și Exchange Online.",
    scope:
      "Medii cloud de productivitate care necesită guvernanță, securitate și suport continuu.",
    details: [
      "Administrare ciclul utilizatorilor și guvernanță licențe.",
      "Politici de securitate pentru operațiuni conforme.",
      "Administrare SharePoint, Teams și Exchange Online.",
    ],
    deliverables: [
      "Cadru de guvernanță tenant și configurație administrativă de bază.",
      "Pachet de politici securitate identitate/dispozitive.",
      "Ghid operațional pentru administrare zilnică.",
    ],
    engagement: [
      "Evaluare tenant și aliniere politici.",
      "Implementare configurări și onboarding stakeholderi.",
      "Administrare gestionată și revizuiri periodice.",
    ],
  },
  "on-site-remote-it-support": {
    title: "Suport IT On-Site și Remote",
    unit: "Comandă Suport",
    description:
      "Suport tehnic rapid pentru desktop, laptop și periferice, atât la sediu, cât și la distanță.",
    scope:
      "Utilizatori de business care necesită rezolvare rapidă și minimizarea timpului de indisponibilitate.",
    details: [
      "Răspuns rapid pentru incidente endpoint și periferice.",
      "Intervenție la sediu pentru probleme fizice sau de infrastructură.",
      "Suport la distanță pentru triere imediată și continuitate.",
    ],
    deliverables: [
      "Flux de triere ticket și matrice de escaladare.",
      "Set de instrumente pentru suport la distanță și proceduri standard.",
      "Analiza incidentelor recurente pentru prevenire.",
    ],
    engagement: [
      "Stabilire nivel de bază pentru suport și SLA.",
      "Suport operațional zilnic pe priorități.",
      "Review lunar și plan de îmbunătățire.",
    ],
  },
  "microsoft-windows-support": {
    title: "Suport Microsoft Windows",
    unit: "Management Endpoint",
    description:
      "Diagnostic și optimizare pentru toate versiunile Microsoft Windows, împreună cu mentenanță continuă.",
    scope:
      "Stații de lucru pentru business care necesită stabilitate, performanță și mentenanță predictibilă.",
    details: [
      "Diagnostic și remediere pentru versiuni moderne și legacy.",
      "Optimizare sistem pentru viteză și productivitate utilizatori.",
      "Strategie de mentenanță pentru operare stabilă la scară.",
    ],
    deliverables: [
      "Health check endpoint cu acțiuni de remediere.",
      "Playbook de optimizare performanță pentru Windows.",
      "Plan de mentenanță și guvernanță update-uri.",
    ],
    engagement: [
      "Evaluare diagnostică și prioritizare probleme.",
      "Execuție remediere și optimizare.",
      "Mentenanță preventivă și continuitate suport.",
    ],
  },
  "payment-terminal-services": {
    title: "Servicii Terminale de Plată",
    unit: "Sisteme Retail",
    description:
      "Instalare, configurare și depanare POS pentru tranzacții sigure și continuitate operațională.",
    scope:
      "Medii retail și servicii unde uptime-ul plăților influențează direct veniturile.",
    details: [
      "Implementare terminale POS și configurare producție.",
      "Depanare operațională pentru continuitatea tranzacțiilor.",
      "Fluxuri de plată securizate și aliniate cerințelor retail.",
    ],
    deliverables: [
      "Listă de verificare pentru implementare și configurări per locație.",
      "Raport validare conectivitate și tranzacții.",
      "Ghid de răspuns la incidente de plată.",
    ],
    engagement: [
      "Evaluare a nivelului de pregătire înainte de implementare.",
      "Instalare și verificare la sediu.",
      "Suport continuu pentru update-uri și incidente.",
    ],
  },
};

export function getServiceModules(locale: "en" | "ro"): ServiceModule[] {
  if (locale === "en") {
    return serviceModules;
  }

  return serviceModules.map((service) => ({
    ...service,
    ...serviceModulesRo[service.slug],
  }));
}

