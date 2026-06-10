import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "..", "server.env") });

import mongoose from "mongoose";
import { connectDB } from "./config/db";
import { Design } from "./models/Design";
import { Blog } from "./models/Blog";
import { Pricing } from "./models/Pricing";
import { Content } from "./models/Content";

const designs = [
  // ==================== FIGMA UI KITS ====================
  {
    title: "SaaS Dashboard UI Kit",
    slug: "saas-dashboard-ui-kit",
    price: "$49",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    ],
    description: "A complete dashboard UI kit with 60+ responsive components, charts, tables, and data visualization widgets. Built for Figma with auto-layout and dark mode support.",
    features: [
      "60+ dashboard components",
      "Auto-layout ready",
      "Light & dark mode support",
      "Responsive grid system",
      "Fully customizable charts",
    ],
    categories: ["Figma", "UI Kits", "Dashboard"],
  },
  {
    title: "E-Commerce Pro UI Kit",
    slug: "ecommerce-pro-ui-kit",
    price: "$59",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    ],
    description: "Complete e-commerce design system featuring product cards, checkout flows, cart UI, and user profile screens. Pixel-perfect Figma components with a modern aesthetic.",
    features: [
      "80+ components and modules",
      "Full checkout and cart flow",
      "Responsive mobile layout included",
      "Clean layer organization",
      "Figma design tokens included",
    ],
    categories: ["Figma", "UI Kits", "E-Commerce"],
  },
  {
    title: "Mobile App Wireframe Kit",
    slug: "mobile-app-wireframe-kit",
    price: "$29",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&q=80",
    ],
    description: "A library of 120+ pre-designed mobile application layouts to help you mockup your iOS or Android app ideas in record time. Includes user onboarding, profile settings, and payment pages.",
    features: [
      "120+ pre-made mobile wireframe screens",
      "Covers 15 popular app categories",
      "Global color and text styles",
      "Android & iOS dimensions",
      "Vector-based customizable icons",
    ],
    categories: ["Figma", "UI Kits", "Mobile"],
  },
  {
    title: "Fintech Mobile Banking UI Kit",
    slug: "fintech-mobile-banking-ui",
    price: "$69",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
    ],
    description: "Secure, modern, and detailed user interface kit for digital banking apps. Includes transaction details, card management, dark theme variants, and animated transitions guidelines.",
    features: [
      "55+ high-fidelity mobile screens",
      "Interactive prototype included",
      "Fully compliant with accessibility standards",
      "Dark and light modes included",
      "Design system with nested variants"
    ],
    categories: ["Figma", "UI Kits", "Fintech"],
  },
  {
    title: "Healthcare Telemedicine App UI Kit",
    slug: "healthcare-app-ui-kit",
    price: "$39",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80"
    ],
    description: "Telemedicine mobile UI design system for patient-doctor appointments, symptom checkers, digital prescriptions, and video calling layouts.",
    features: [
      "45+ telemedicine screens",
      "Doctor directory & profile templates",
      "Standard interactive design components",
      "Fully responsive on Apple and Android",
      "Auto-layout ready components"
    ],
    categories: ["Figma", "UI Kits", "Healthcare"],
  },
  {
    title: "Modern Real Estate UI Kit",
    slug: "real-estate-ui-kit",
    price: "$45",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80"
    ],
    description: "Premium property searching, filtering, and listing app components. Optimized user onboarding, mortgage calculators, and listing page layouts.",
    features: [
      "50 responsive components",
      "Grid search & map list views",
      "Dark mode theme options",
      "High-resolution property templates",
      "Figma styles and tokens support"
    ],
    categories: ["Figma", "UI Kits", "Real Estate"],
  },
  {
    title: "Cryptocurrency Exchange UI Kit",
    slug: "crypto-trading-ui-kit",
    price: "$79",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80",
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80"
    ],
    description: "Advanced crypto-trading UI kit with live chart interfaces, transaction logs, buy/sell widgets, wallet dashboards, and crypto-asset trackers.",
    features: [
      "70 trading and exchange components",
      "Live order-book table layouts",
      "Light and dark themes customizable",
      "Figma local variables setup",
      "Interactive components built-in"
    ],
    categories: ["Figma", "UI Kits", "Crypto"],
  },

  // ==================== POSTERS ====================
  {
    title: "Modern Event Poster Template",
    slug: "modern-event-poster",
    price: "$19",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"],
    description: "A typography-heavy event flyer or poster designed to stand out. Highly customizable vector file in CMYK print-ready configuration.",
    features: [
      "Print-ready CMYK files at 300 DPI",
      "Available in Figma and Illustrator formats",
      "Fully vector-scaled layouts",
      "Font files link included",
      "Three layout alternatives"
    ],
    categories: ["Poster", "Posters"],
  },
  {
    title: "Corporate Business Marketing Poster",
    slug: "corporate-marketing-poster",
    price: "$15",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80"],
    description: "Clean, professional poster template for marketing campaigns, internal agency branding, or corporate notifications.",
    features: [
      "Figma and Photoshop files",
      "Clean geometric grid systems",
      "Highly readable layout formats",
      "Placeholder blocks for custom text",
      "High resolution file export"
    ],
    categories: ["Poster", "Posters"],
  },
  {
    title: "Social Media Promo Poster",
    slug: "social-media-promo-poster",
    price: "$12",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80"],
    description: "Eye-catching banner/poster template designed to boost product launches and promotions on digital displays and feeds.",
    features: [
      "Square and vertical resolutions included",
      "Vibrant high-contrast design",
      "Perfect for digital ad campaigns",
      "Editable design assets",
      "Includes font guide files"
    ],
    categories: ["Poster", "Posters"],
  },
  {
    title: "Minimalist Creative Print Flyer",
    slug: "minimalist-creative-flyer",
    price: "$18",
    image: "https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?w=800&q=80"],
    description: "Elegant and minimal artistic flyer layout. Uses sleek line elements and high negative space to draw focus to central headlines.",
    features: [
      "Minimalist, modern editorial grid",
      "CMYK print format A4 size",
      "Easily adjustable layers",
      "Recommended vector asset collections",
      "Figma file access"
    ],
    categories: ["Poster", "Posters"],
  },
  {
    title: "Retro Music Festival Poster",
    slug: "retro-music-festival-poster",
    price: "$25",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80"],
    description: "A vintage-inspired retro poster layout suitable for music gigs, outdoor festivals, and themed parties.",
    features: [
      "3 retro color schemes built-in",
      "Distressed texture overlays included",
      "Fully layered vector files",
      "Photoshop & Figma support",
      "Clean guidelines for event listings"
    ],
    categories: ["Poster", "Posters"],
  },
  {
    title: "Healthy Food & Café Menu Poster",
    slug: "healthy-food-cafe-poster",
    price: "$14",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80"],
    description: "Organic-themed promo poster for cafés, restaurants, and healthy eating campaigns. Clean image blocks and elegant serif typography.",
    features: [
      "Grid layouts for menu cards",
      "3 high-quality food graphic layers",
      "Print-ready CMYK files",
      "Easily swap item titles & pricing",
      "Free commercial fonts included"
    ],
    categories: ["Poster", "Posters"],
  },
  {
    title: "Fitness & Gym Promo Flyer",
    slug: "fitness-gym-flyer",
    price: "$20",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80"],
    description: "High-energy poster layout to promote gym memberships, fitness bootcamps, or personal training programs.",
    features: [
      "Bold typographic contrast layouts",
      "Easily replace model photography placeholder",
      "High resolution print file A3 format",
      "Editable vector icons included",
      "Figma template access"
    ],
    categories: ["Poster", "Posters"],
  },

  // ==================== BANNERS ====================
  {
    title: "Digital Marketing Google Banner",
    slug: "digital-marketing-banner",
    price: "$19",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"],
    description: "A bundle of 15 IAB standard Google Ad banner formats. Optimized for high click-through rates and digital marketing campaigns.",
    features: [
      "15 popular IAB banner size formats",
      "Optimized file weight for ad networks",
      "Clear call-to-action buttons",
      "Figma & Photoshop versions",
      "Pixel-perfect assets layout"
    ],
    categories: ["Banner", "Banners"],
  },
  {
    title: "E-Commerce Sale & Discount Banner",
    slug: "ecommerce-sale-banner",
    price: "$24",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80"],
    description: "Modern promotional banners designed for retail platforms. Features clean product display blocks and striking discount layouts.",
    features: [
      "10 social media and web banner formats",
      "Modern aesthetic with bold colors",
      "Product showcase placeholders",
      "Fully customizable design variables",
      "Optimized for high CTR"
    ],
    categories: ["Banner", "Banners"],
  },
  {
    title: "Modern Website Hero Banner Set",
    slug: "modern-website-hero-banner",
    price: "$29",
    image: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=800&q=80"],
    description: "Stunning hero section background configurations for website landings. Ideal for tech, creative agencies, and startups.",
    features: [
      "6 unique hero layouts",
      "Clean background graphics layers",
      "Optimized web asset resolutions",
      "Fully layered and grouped in Figma",
      "Sleek visual hierarchy"
    ],
    categories: ["Banner", "Banners"],
  },
  {
    title: "Corporate Business Web Banner Bundle",
    slug: "corporate-business-banner",
    price: "$35",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"],
    description: "Professional, trust-building web headers and display banners for accounting, real estate, or banking websites.",
    features: [
      "Professional corporate aesthetics",
      "High resolution layouts suitable for headers",
      "Structured vector patterns layers",
      "Figma local styling guide included",
      "Responsive spacing formats"
    ],
    categories: ["Banner", "Banners"],
  },
  {
    title: "Creative Fluid Gradient Banners",
    slug: "creative-gradient-banner",
    price: "$15",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80"],
    description: "Modern abstract fluid gradient templates for website backgrounds, cover arts, and promotional web assets.",
    features: [
      "8 abstract gradient options",
      "Smooth fluid blending shapes",
      "High-resolution vector assets",
      "Figma vector paths customizable",
      "Perfect for background design needs"
    ],
    categories: ["Banner", "Banners"],
  },
  {
    title: "Cyber Security Technology Banner",
    slug: "cyber-security-banner",
    price: "$30",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80"],
    description: "Tech-themed header graphics for software platforms, network tools, and security service providers.",
    features: [
      "Modern tech grid overlays",
      "High quality vector server illustrations",
      "Dark blueprint theme styling",
      "Customizable elements",
      "Figma file access"
    ],
    categories: ["Banner", "Banners"],
  },
  {
    title: "Black Friday Special Offer Banner Bundle",
    slug: "black-friday-banner",
    price: "$25",
    image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800&q=80"],
    description: "Highly engaging neon-themed marketing banners designed to boost online sales conversions during retail campaigns.",
    features: [
      "12 custom promotional layouts",
      "Vibrant neon styling elements",
      "Striking typographic headers",
      "Figma and Photoshop files available",
      "Easy text edits"
    ],
    categories: ["Banner", "Banners"],
  },

  // ==================== WEB & PRESENTATION TEMPLATES ====================
  {
    title: "Modern SaaS Landing Page Template",
    slug: "modern-saas-landing-page",
    price: "$39",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    ],
    description: "High-converting SaaS landing page template including hero sections, feature grids, testimonial sliders, pricing tables, and footer variations.",
    features: [
      "12 unique landing page sections",
      "Fully responsive desktop & mobile screens",
      "Optimized for high conversion rates",
      "Figma auto-layout 4.0",
      "Well-organized style guide",
    ],
    categories: ["Figma", "Templates", "SaaS"],
  },
  {
    title: "Creative Agency Portfolio Template",
    slug: "creative-agency-portfolio",
    price: "$35",
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    ],
    description: "A dark-themed portfolio website template optimized for design agencies, freelance developers, and creative directors. Sleek layout with interactive hover effects.",
    features: [
      "Interactive hover state guidelines",
      "Case studies and portfolio grids",
      "Dark mode by default",
      "Figma design files with style guide",
      "Fully responsive components",
    ],
    categories: ["Figma", "Templates", "Portfolio"],
  },
  {
    title: "Startup Investor Pitch Deck Template",
    slug: "startup-investor-pitch-deck",
    price: "$45",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    ],
    description: "Beautifully styled presentation deck for startups looking to raise venture capital. Includes slides for problem definition, market size, business model, and financial projections.",
    features: [
      "35 professionally designed presentation slides",
      "Includes editable charts, timelines, and metrics",
      "Figma and Google Slides formats",
      "16:9 widescreen layout",
      "Investor-ready structured content",
    ],
    categories: ["Templates", "Presentation"],
  },
  {
    title: "Business Annual Report Deck",
    slug: "business-annual-report-deck",
    price: "$40",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80"],
    description: "Clean financial and operational reporting presentation deck for mid-to-large business review meetings.",
    features: [
      "40 unique clean presentation slides",
      "Editable layout graphs and tabular designs",
      "Corporate blue and gray styling tones",
      "Figma, PowerPoint, and Keynote support",
      "Standard vector icon pack included"
    ],
    categories: ["Templates", "Presentation"],
  },
  {
    title: "Instagram Brand Identity Post Templates",
    slug: "instagram-brand-identity-templates",
    price: "$19",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80"],
    description: "A pack of 30 clean Instagram layout templates. Easily configurable for brand launches, quotes, blogs, and marketing announcements.",
    features: [
      "30 square templates (1080x1080px)",
      "Designed for cohesive grid layout styles",
      "Figma variables configuration support",
      "Clean typographic presets",
      "Instructions for quick exports"
    ],
    categories: ["Templates", "Social Media"],
  },
  {
    title: "Personal Resume/CV Portfolio Website",
    slug: "personal-resume-cv-website",
    price: "$35",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"],
    description: "A sleek, content-focused portfolio template built for developers, designers, and authors. High-contrast layout with modern typography.",
    features: [
      "Light/Dark Mode toggle layouts",
      "Clean timeline components for experience",
      "Case study reading templates",
      "Responsive grid structure in Figma",
      "Full typography style sheets"
    ],
    categories: ["Template", "Templates", "Portfolio"],
  },
  {
    title: "E-learning Portal Dashboard Template",
    slug: "elearning-portal-website",
    price: "$49",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"],
    description: "A modern web system template layout for online academies, course catalogs, student portals, and video lectures.",
    features: [
      "15 custom page layouts",
      "Course catalog & video view templates",
      "Student dashboard and grade views",
      "Fully responsive wireframes",
      "Interactive component systems"
    ],
    categories: ["Template", "Templates", "SaaS"],
  }
];

const blogs = [
  {
    title: "Mastering Design Systems in Figma",
    slug: "mastering-design-systems-in-figma",
    summary: "Learn how to build scalable, component-based design systems using Figma's auto-layout, variables, and component properties.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80",
    date: "June 10, 2026",
    content: [
      { type: "paragraph", text: "A design system is a collection of reusable components, guided by clear standards, that can be assembled together to build any number of applications." },
      { type: "heading", text: "Why Build a Design System?" },
      { type: "paragraph", text: "Design systems improve consistency, design speed, and team collaboration. Instead of redesigning elements from scratch, you rely on a single source of truth." },
      { type: "heading", text: "Key Steps in Creating Your System" },
      { type: "list", items: [
        "Audit existing UI components and layouts.",
        "Define global design tokens (colors, spacing, typography).",
        "Build foundational atomic components (buttons, inputs).",
        "Document guidelines for responsive spacing and usage.",
        "Maintain and iterate based on developer feedback."
      ]}
    ]
  },
  {
    title: "SaaS Landing Page Design Best Practices",
    slug: "saas-landing-page-design-best-practices",
    summary: "Explore the anatomical breakdown of landing pages that convert visitors into signed-up users.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    date: "June 05, 2026",
    content: [
      { type: "paragraph", text: "Landing pages are critical for SaaS applications. The goal is to convey value quickly, build trust, and prompt the user to take action." },
      { type: "heading", text: "The Anatomy of a High-Converting Hero Section" },
      { type: "paragraph", text: "Your hero section needs a clear H1 headline that explains the core benefit, a secondary description elaborating on how it works, and a prominent CTA button." },
      { type: "list", items: [
        "Hook the user within 3 seconds with a strong value proposition.",
        "Include high-fidelity screenshots or clean product mockups.",
        "Use social proof (customer logos, testimonials) directly under the CTA.",
        "Keep the navigation bar simple and focused on onboarding."
      ]}
    ]
  },
  {
    title: "UI Typography Rules for Beginners",
    slug: "ui-typography-rules-beginners",
    summary: "Essential guidelines to master hierarchy, line height, character spacing, and font pairings in digital layouts.",
    image: "https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?w=800&q=80",
    date: "May 28, 2026",
    content: [
      { type: "paragraph", text: "Typography is the foundation of user interface design. Excellent typography guides the eye, establishes branding, and makes information readable." },
      { type: "heading", text: "Hierarchy is King" },
      { type: "paragraph", text: "A user should instantly distinguish headlines from paragraphs. Use size, weight, and color differences to map out visual structure clearly." },
      { type: "list", items: [
        "Stick to 1 or 2 font families max in a system.",
        "Set body line heights to 150%-160% of size for best reading.",
        "Slightly reduce tracking (character spacing) for large headings.",
        "Avoid using purely black text; use dark grays like Slate 900 for a softer look."
      ]}
    ]
  },
  {
    title: "Color Psychology in Web Design",
    slug: "color-psychology-web-design",
    summary: "How colors trigger emotions and influence customer trust, conversions, and interaction rates.",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80",
    date: "May 20, 2026",
    content: [
      { type: "paragraph", text: "Every color carries psychological weight. Choosing the right palette for your brand can guide user sentiment and drive higher interaction numbers." },
      { type: "heading", text: "Understanding Primary Color Roles" },
      { type: "paragraph", text: "Blue conveys security and trust, which is why banks use it. Green represents growth, health, and sustainability. Red signals urgency or error states." },
      { type: "list", items: [
        "Apply the 60-30-10 color rule for balanced visual weight.",
        "Keep contrast high enough to meet WCAG AA accessibility standards.",
        "Use color sparingly on interactive elements like buttons to make CTAs pop.",
        "Maintain clean gray variations for borders, tables, and spacing backgrounds."
      ]}
    ]
  },
  {
    title: "Figma Files Developer Handoff Guide",
    slug: "figma-files-developer-handoff",
    summary: "Avoid translation errors between design and code. How to structure frames, components, and variables for developers.",
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&q=80",
    date: "May 15, 2026",
    content: [
      { type: "paragraph", text: "The handoff is where design meets engineering. Clear files minimize back-and-forth and guarantee that the coded project matches the designs perfectly." },
      { type: "heading", text: "Best Practices for Organizing Handoff Files" },
      { type: "paragraph", text: "Make sure all elements use Figma's auto-layout. Static boxes are hard to code, while auto-layout naturally matches CSS flexbox structure." },
      { type: "list", items: [
        "Define clear naming rules for colors, text sizes, and spacings.",
        "Provide interactive state components (hover, focus, disabled).",
        "Clean up unused layout drafts, assets, and styles.",
        "Group screen variations by user flow logic."
      ]}
    ]
  },
  {
    title: "How to Build an Agency Pitch Deck",
    slug: "how-build-agency-pitch-deck",
    summary: "Structure slides that win clients: problem definition, case studies, scope, and pricing formulas.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
    date: "May 08, 2026",
    content: [
      { type: "paragraph", text: "A pitch deck isn't just about showing off; it is about solving a problem for a client. Keep it short, visual, and highly metric-focused." },
      { type: "heading", text: "The Winning Slide Structure" },
      { type: "paragraph", text: "Start by showing that you understand the client's current pain points, introduce your proposed solution, present case studies, and wrap up with clear pricing options." },
      { type: "list", items: [
        "Focus on metrics (e.g., 'We boosted conversion by 45%').",
        "Use high-contrast clean slide designs.",
        "Include timeline layouts outlining phase deliverables.",
        "End with a clear, next-step CTA for the client."
      ]}
    ]
  }
];

const pricingPlans = [
  {
    name: "Starter",
    price: "$19",
    description: "Perfect for freelancers and solo creators looking to access high-quality UI assets.",
    features: [
      "Access to 10 standard design templates",
      "Community support access",
      "Standard commercial license",
      "Lifetime updates for downloaded files"
    ],
    highlight: false
  },
  {
    name: "Pro Professional",
    price: "$49",
    description: "Best for growing design and development agencies needing extensive assets.",
    features: [
      "Unlimited access to all UI Kits and templates",
      "Priority customer support (24/7)",
      "Extended commercial agency license",
      "Access to Figma source files and libraries",
      "Weekly new design additions"
    ],
    highlight: true
  },
  {
    name: "Enterprise System",
    price: "$149",
    description: "Designed for large teams requiring custom assets, white labeling, and multi-user seats.",
    features: [
      "Everything in Pro Plan",
      "Unlimited user accounts for team members",
      "Dedicated account manager",
      "Custom template requests",
      "Enterprise security compliance guidelines"
    ],
    highlight: false
  }
];

const staticContents = [
  {
    key: "terms",
    title: "Terms and Conditions",
    body: [
      "Welcome to QuickDzyn. By accessing or using our marketplace website, you agree to comply with and be bound by the following terms of use.",
      "All digital products, templates, and design resources hosted on this site are intellectual property of QuickDzyn or their respective creators.",
      "Purchasing a design gives you a non-exclusive license to use the design according to the purchased tier guidelines. Redistribution or direct resale of downloaded design source files is strictly prohibited.",
      "Refunds are generally not provided for digital assets once they have been downloaded, unless explicitly covered by a warranty or error in checkout files.",
      "We reserve the right to modify these terms at any point. Continued use of the platform constitutes acceptance of updated terms."
    ]
  },
  {
    key: "privacy",
    title: "Privacy Policy",
    body: [
      "At QuickDzyn, we respect your privacy and are committed to protecting your personal data.",
      "We collect information you provide directly to us when setting up an account, purchasing a product, or communicating with support. This includes email address, payment identifiers, and profile names.",
      "Your data is used to process transactions, deliver files, provide client support, and send updates regarding products or billing.",
      "We do not sell, rent, or distribute your personal information to third parties. We utilize industry-standard encryption for securing checkout processes.",
      "You have the right to request deletion of your account and personal information at any time by contacting our administrator."
    ]
  }
];

async function seed() {
  try {
    await connectDB();
    console.log("Connected to MongoDB successfully for seeding.");

    // Delete existing records
    await Design.deleteMany({});
    console.log("Deleted existing Design collections.");

    await Blog.deleteMany({});
    console.log("Deleted existing Blog collections.");

    await Pricing.deleteMany({});
    console.log("Deleted existing Pricing collections.");

    await Content.deleteMany({});
    console.log("Deleted existing Content collections.");

    // Insert new data
    const seededDesigns = await Design.insertMany(designs);
    console.log(`Seeded ${seededDesigns.length} designs successfully.`);

    const seededBlogs = await Blog.insertMany(blogs);
    console.log(`Seeded ${seededBlogs.length} blogs successfully.`);

    const seededPricing = await Pricing.insertMany(pricingPlans);
    console.log(`Seeded ${seededPricing.length} pricing plans successfully.`);

    const seededContent = await Content.insertMany(staticContents);
    console.log(`Seeded ${seededContent.length} static page contents successfully.`);

    console.log("Seeding process completed successfully.");
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Seeding database failed:", error);
    process.exit(1);
  }
}

seed();
