/* ==========================================================================
   data.js — single source of truth for all site content.
   Verbatim port of the former `src/data/profile.ts`; no content was changed.
   Plain classic script (no ES modules) so the site also runs from file://.
   ========================================================================== */
(function (global) {
  "use strict";

  var TBU = "Information to be updated";

  var professorProfile = {
    name: "Dr. Gouri Ashok Gargate",
    shortName: "Gouri Ashok Gargate",
    title: "Assistant Professor (Grade-I)",
    school: "Rajiv Gandhi School of Intellectual Property Law",
    institute: "Indian Institute of Technology Kharagpur",
    tagline:
      "Research at the intersection of Intellectual Property, Law, Management, Technology and Innovation.",
    email: "gouri@rgsoipl.iitkgp.ac.in",
    location: "Kharagpur, West Bengal, India – 721302",
    cvUrl: null, // add a CV PDF link here
    portraitUrl: "./assets/gouri-ashok-gargate.jpg",
    bio: [
      "Dr. Gouri Ashok Gargate is an Assistant Professor (Grade-I) at the Rajiv Gandhi School of Intellectual Property Law, Indian Institute of Technology Kharagpur. Her academic and research interests lie at the intersection of Intellectual Property Law, Management, Technology and Innovation.",
      "Her work examines how intellectual assets can be strategically governed, managed and transformed into economic and societal value. Her interdisciplinary profile spans law, IP management and life sciences, together with experience in academia, patent practice, industry and technology commercialization.",
    ],
    lifecycle: [
      "IP identification",
      "IP protection",
      "IP valuation",
      "IP audit",
      "IP portfolio management",
      "Commercialization",
      "Technology transfer",
      "Entrepreneurship",
    ],
    themes: [
      "IP and competition law",
      "Patent pools",
      "Standard Essential Patents (SEPs)",
      "IP and emerging technologies",
      "Artificial Intelligence and IP",
      "Digitalization",
      "Responsible technology governance",
      "Traditional Knowledge",
      "Innovation ecosystems",
    ],
    methodology: ["Legal theory", "Managerial decision-making", "Technological change", "Public policy"],
  };

  var metrics = [
    { value: "22", label: "Publications", source: "IRINS" },
    { value: "75", label: "Scopus citations", source: "Scopus via IRINS" },
    { value: "5", label: "h-index", source: "Scopus via IRINS" },
    { value: "55846303200", label: "Scopus ID", source: "Scopus" },
    { value: "158432", label: "Vidwan ID", source: "Vidwan" },
  ];

  var researchAreas = [
    {
      title: "Intellectual Property Law",
      text: "Legal frameworks governing intellectual property and innovation.",
    },
    {
      title: "IP Management",
      text: "Strategic management of intellectual assets across organizations and innovation ecosystems.",
    },
    {
      title: "IP Audit & Valuation",
      text: "Identifying, evaluating and strategically managing intellectual assets.",
    },
    {
      title: "Technology Transfer & Commercialization",
      text: "How research and technology move from institutions to practical and economic applications.",
    },
    {
      title: "IP & Competition Law",
      text: "The relationship between IP rights, markets, licensing and competition.",
    },
    {
      title: "Patent Pools & SEPs",
      text: "Patent pools, Standard Essential Patents and innovation-oriented licensing structures.",
    },
    {
      title: "Emerging Technologies & IP",
      text: "AI, digitalization, blockchain and other emerging technologies and their IP implications.",
    },
    {
      title: "Traditional Knowledge & IP",
      text: "Documentation, governance, protection and responsible commercialization of Traditional Knowledge, particularly in India.",
    },
    {
      title: "IP Strategy for Startups & MSMEs",
      text: "How startups and smaller enterprises can strategically use intellectual property.",
    },
    {
      title: "AI, Research & Responsible Governance",
      text: "Future-oriented research on AI, IP, research practices and responsible governance.",
    },
  ];

  var ecosystem = [
    "Law",
    "IP",
    "Management",
    "Technology",
    "Innovation",
    "Commercialization",
    "Society",
  ];

  var impactFlow = [
    "Research",
    "IP",
    "Innovation",
    "Technology Transfer",
    "Commercialization",
    "Societal Impact",
  ];

  var agenda = [
    "Strategic IP Governance",
    "Technology Commercialization",
    "AI and Intellectual Property",
    "Research with AI",
    "IP Strategy for Startups and MSMEs",
    "IP–Competition Interfaces",
    "Standard Essential Patents",
    "Sustainable Management of Traditional Knowledge",
  ];

  var publications = [
    {
      title: "Intellectual Property Management in Academic and Research Organizations: The Role of a Laboratory Notebook",
      authors: "Gargate G. A.",
      venue: "Vikalpa",
      volume: "49",
      pages: "45–66",
      year: 2024,
      type: "Journal",
    },
    {
      title: "IP Audit of an Academic Institute – Case Study of Central University and Institute of Excellence in India",
      authors: "Singh P., Rathore H.S., Chhetri N.B., Gargate G.",
      venue: "International Journal of Intellectual Property Management",
      volume: "14",
      pages: "160–181",
      year: 2024,
      type: "Journal",
    },
    {
      title: "Legal Jurisprudence of Solid Waste Management in India: Development Through the Decades",
      authors: "Gargate G. A.",
      venue: "International Journal of Global Environmental Issues",
      volume: "22",
      pages: "268–294",
      year: 2023,
      type: "Journal",
    },
    {
      title: "Patent Pools and Innovation-Based Approach in Global Healthcare Crisis",
      authors: "Gargate G. A.",
      venue: "Journal of World Intellectual Property",
      volume: "26",
      pages: "315–335",
      year: 2023,
      type: "Journal",
    },
    {
      title: "Emerging Technology of Blockchain for Energy Sector",
      authors: "Chowdhury A.R., Vridhi M., Gargate G.A.",
      venue: "Journal of Intellectual Property Rights",
      volume: "27",
      pages: "141–145",
      year: 2022,
      type: "Journal",
    },
    {
      title: "IP Audit: A Case Study of IIT Delhi",
      authors: "Sen P., Gargate G.",
      venue: "Journal of Intellectual Property Rights",
      volume: "27",
      pages: "339–350",
      year: 2022,
      type: "Journal",
    },
    {
      title: "IP Policy Framework – A Tool for IP Policy Development",
      authors: "Gargate G.A., Chowdhury A.R., Jain K.",
      venue: "Journal of Intellectual Property Rights",
      volume: "27",
      pages: "277–284",
      year: 2022,
      type: "Journal",
      doi: "10.56042/jipr.v27i4.53981",
    },
    {
      title: "The Trends in CRISPR Research: A Patent and Literature Study with a Focus on India",
      authors: "Roy Chowdhury A., Gargate G.A.",
      venue: "World Patent Information",
      volume: "65",
      year: 2021,
      type: "Journal",
    },
    {
      title: "Legal Protection, Consolidation and Evaluation of IP in Academic Units",
      authors: "Singh P., Gargate G.",
      venue: "Journal of Intellectual Property Rights",
      volume: "26",
      pages: "69–82",
      year: 2021,
      type: "Journal",
    },
    {
      title: "Intellectual Property Audit of an Organization",
      authors: "Gargate G., Siddiquee Q., Wingkar C.",
      venue: "Journal of World Intellectual Property",
      volume: "22",
      pages: "16–35",
      year: 2019,
      type: "Journal",
    },
    {
      title: "Developing Your Intellectual Property Management System: Self-Assessment and Building Up Using IPM Model",
      authors: "Gargate G.A.",
      venue: "World Patent Information",
      volume: "52",
      year: 2018,
      type: "Journal",
    },
    {
      title: "Comparative Study of Intellectual Property Management Practices – Firm, Industry and National Level",
      authors: "Gargate G.A.",
      venue: "Law Quest",
      volume: "1",
      pages: "76–86",
      year: 2017,
      type: "Journal",
    },
    {
      title: "Role of IP Policy in Innovation and Entrepreneurship Development: Case Study of HEI in India",
      authors: "Gargate G.A.",
      venue: "Udhyog Pragati",
      volume: "37",
      pages: "19–29",
      year: 2013,
      type: "Journal",
    },
    {
      title: "A Framework to Comprehend the Position of Intellectual Property Rights in Complex Organizational Capital",
      authors: "Gargate G.A.",
      venue: "IJIPM",
      volume: "6",
      pages: "201–216",
      year: 2013,
      type: "Journal",
    },
    { title: "IP for Development: The Emerging Paradigm", year: 2014, type: "Book" },
    { title: "A Textbook of Microbiology (Introductory Microbiology)", year: 2013, type: "Book" },
    { title: "IP System", year: 2024, type: "Patent" },
  ];

  var conferences = [
    {
      title: "Re-envisioning Legal Frameworks for Temple Traditional Knowledge: Beyond the Constraints of Intellectual Property Law",
      venue: "IPIRA Conference",
      year: 2025,
    },
    { title: "Role of Indian Temples in Preserving Traditional Ecological and Medicinal Knowledge", year: 2025 },
    { title: "Guardians of Heritage: A Comparative Legal Analysis of Traditional Knowledge Regimes", year: 2025 },
    {
      title: "Codifying Remedies, Silencing Voices? Re-evaluating Traditional Knowledge in Light of Global Public Health",
      venue: "IPIRA Conference",
      year: 2025,
    },
    {
      title: "Role of Technology in the Preservation and Protection of Traditional Knowledge",
      venue: "PICMET",
      year: 2024,
    },
    {
      title: "Patent Pools in the Automobile Industry: A Case Study of Internet of Things",
      venue: "PICMET",
      year: 2024,
    },
    { title: "IOT for Solid Waste Management in India: A Road Towards Sustainability", venue: "PICMET", year: 2024 },
    { title: "IP Evaluation and Technology Transfer", venue: "PICMET", year: 2024 },
    {
      title: "Innovation-based Patent Pool Models in Automobile Industry in the Smart Car Era",
      venue: "IPIRA Conference",
      year: 2023,
    },
    {
      title: "IPR Ecosystem in Developing Countries: A Case Study of an Institute of Eminence",
      venue: "IAMOT",
      year: 2022,
    },
    { title: "Role of Blockchain Technology in Intellectual Property Management", venue: "INDAM", year: 2020 },
    { title: "IP Management and Artificial Intelligence", venue: "MIPS", year: 2020 },
    { title: "Intellectual Property and Entrepreneurship: Indian Experience", venue: "AMRC", year: 2019 },
    {
      title: "Innovation and Intellectual Property Management – Integrative Approach for Competitiveness",
      venue: "IAMOT",
      year: 2018,
    },
  ];

  var books = publications.filter(function (p) {
    return p.type === "Book";
  });

  var educationalPackages = [
    {
      title: "Introduction to IP – For School Teachers Training Program – Marathi, Hindi and English",
      year: 2025,
    },
    { title: "Intellectual Property Disputes – Court Practices and Enforcement", year: 2024 },
    { title: "School Innovation SIATP", year: 2024 },
    { title: "Introduction to IP", year: 2023 },
    { title: "IP Management & Technology Transfer", year: 2023 },
    { title: "Entrepreneurship & IP Strategy", year: 2020 },
    { title: "Roadmap for Patent Creation", year: 2019 },
  ];

  var projects = {
    pi: [
      "Intellectual Property Audit of Academic and Research Institutes",
      "Geomapping, IP Infringement Analysis & Enforcement of Waste Management Technology",
      "IP Audit and Valuation for Mechanical Device",
      "Development of MOOC for SWAYAM",
      "MOOC – Introduction to Intellectual Property – 2024",
      "MOOC – Introduction to Intellectual Property – 2025",
      "Investigating the Effect of Iron Impurity in the Feed Salt for Chlor-Alkali Process in Durgapur Chemicals Limited",
    ],
    coPi: ["KIRAN-IPR Women Scientist Scheme (WOS-C)"],
  };

  var students = [
    { name: "Rishika Seal", area: "Traditional Knowledge & IP" },
    {
      name: "Sherin Priyan",
      area: "Innovation, patent pooling and competition law",
      thesis: "Patent Pools and Interface with IP and Competition Law: A Policy Framework for India",
      year: 2025,
    },
    { name: "Das Piu Sanjib Jayanti", area: "Constitutional Process" },
    { name: "R. Chameli" },
  ];

  var courses = [
    { title: "Introduction to Intellectual Property", platform: "NPTEL / SWAYAM" },
    { title: "IP Management & Technology Transfer" },
    { title: "Entrepreneurship & IP Strategy" },
  ];

  var coursesUrl = "https://nptel.ac.in"; // replace with the exact course page

  var awards = [
    "WIPF Powerful Women in IP – India 2021",
    "Successful TIFAC Scientist",
    "Y.V. Chandrachud Memorial Prize",
    "M.Sc. Gold Medal",
    "Late Nani A. Palkhivala Memorial Gold Medal",
    "Late Justice M. C. Chagla Gold Medal",
  ];

  var academicProfiles = [
    { label: "Google Scholar", url: "https://scholar.google.com/citations?user=jsken3YAAAAJ&hl=en" },
    { label: "IIT Kharagpur Faculty Profile", url: "https://www.iitkgp.ac.in/department/IP/faculty/ip-gouri" },
    { label: "IRINS", url: "https://iitkgp.irins.org/profile/158432" },
    { label: "Vidwan", url: "https://vidwan.inflibnet.ac.in/profile/158432" },
    { label: "Scopus", url: null },
    { label: "ORCID", url: null },
    { label: "ResearchGate", url: null },
    { label: "LinkedIn", url: null },
  ];

  /* Navigation labels — kept in the original order. */
  var NAV = ["About", "Research", "Publications", "Projects", "Teaching", "Students", "Awards", "Contact"];

  /* Publication type filter tabs. */
  var FILTERS = [
    "All",
    "Journal",
    "Conference",
    "Book",
    "Edited Volume",
    "Educational Package",
    "Patent",
    "Workshop",
    "Other",
  ];

  /* Footer links. */
  var FOOTER_LINKS = [
    ["Research", "research"],
    ["Publications", "publications"],
    ["Teaching", "teaching"],
    ["Students", "students"],
    ["Academic Profiles", "profiles"],
    ["Contact", "contact"],
  ];

  global.SITE_DATA = {
    TBU: TBU,
    professorProfile: professorProfile,
    metrics: metrics,
    researchAreas: researchAreas,
    ecosystem: ecosystem,
    impactFlow: impactFlow,
    agenda: agenda,
    publications: publications,
    conferences: conferences,
    books: books,
    educationalPackages: educationalPackages,
    projects: projects,
    students: students,
    courses: courses,
    coursesUrl: coursesUrl,
    awards: awards,
    academicProfiles: academicProfiles,
    NAV: NAV,
    FILTERS: FILTERS,
    FOOTER_LINKS: FOOTER_LINKS,
  };
})(window);
