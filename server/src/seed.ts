import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "..", "server.env") });

import mongoose from "mongoose";
import { Design } from "./models/Design";
import { connectDB } from "./config/db";

const designs = [
  {
    title: "Starter Dashboard UI Kit",
    slug: "starter-dashboard-ui-kit",
    price: "$49",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    ],
    description:
      "A complete dashboard UI kit with 60+ responsive components, charts, tables, and data visualization widgets. Built for Figma with auto-layout and dark mode support.",
    features: [
      "60+ dashboard components",
      "Auto-layout ready",
      "Light & dark mode",
      "Responsive grid system",
      "Chart & data widgets",
    ],
    categories: ["Figma", "UI Kits"],
  },
  {
    title: "E-Commerce Pro UI Kit",
    slug: "ecommerce-pro-ui-kit",
    price: "$59",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    ],
    description:
      "Complete e-commerce design system featuring product cards, checkout flows, cart UI, and user profile screens. Pixel-perfect Figma components with a modern aesthetic.",
    features: [
      "80+ Figma components",
      "Product listing layouts",
      "Cart & checkout flow",
      "User profile & order history",
      "Responsive design tokens",
    ],
    categories: ["Figma", "UI Kits"],
  },
  {
    title: "SaaS Landing Page Kit",
    slug: "saas-landing-page-kit",
    price: "$39",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
      "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=800&q=80",
    ],
    description:
      "High-converting SaaS landing page templates for Figma. Includes hero sections, pricing tables, feature grids, testimonials, and footer variations.",
    features: [
      "12 landing page sections",
      "Pricing table variants",
      "Testimonial blocks",
      "Feature grid layouts",
      "CTA button library",
    ],
    categories: ["Figma", "UI Kits", "Template", "Templates"],
  },
  {
    title: "Minimal Poster Collection",
    slug: "minimal-poster-collection",
    price: "$29",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
    ],
    description:
      "A curated set of 20 minimal poster designs with clean typography and geometric accents. Print-ready CMYK files included. Perfect for galleries, offices, and retail spaces.",
    features: [
      "20 unique poster designs",
      "CMYK print-ready files",
      "A2 & A3 size formats",
      "Editable text layers",
      "Typography-focused",
    ],
    categories: ["Poster", "Posters"],
  },
  {
    title: "Event & Concert Poster Pack",
    slug: "event-concert-poster-pack",
    price: "$35",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80",
    ],
    description:
      "Bold, eye-catching event and concert poster templates. Features vibrant gradients, dynamic typography, and high-contrast layouts designed to grab attention.",
    features: [
      "15 event poster templates",
      "Vibrant gradient themes",
      "Dynamic typography styles",
      "Layered PSD + AI files",
      "Social media resize included",
    ],
    categories: ["Poster", "Posters"],
  },
  {
    title: "Brand Identity Poster Series",
    slug: "brand-identity-poster-series",
    price: "$45",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80",
    ],
    description:
      "Professional brand identity poster series with cohesive visual language. Ideal for brand launches, product reveals, and corporate communications.",
    features: [
      "10 brand poster templates",
      "Consistent visual identity",
      "Logo & brand mark placement",
      "Corporate color schemes",
      "Print & digital formats",
    ],
    categories: ["Poster", "Posters"],
  },
  {
    title: "Social Media Starter Bundle",
    slug: "social-media-starter-bundle",
    price: "$25",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80",
    ],
    description:
      "100+ social media post and story templates for Instagram, Facebook, LinkedIn, and Twitter. Modern, on-brand designs ready to customize.",
    features: [
      "100+ post templates",
      "Story & reel formats",
      "Instagram, FB, LinkedIn",
      "Canva & Figma files",
      "Brand color system",
    ],
    categories: ["Social Media", "Template", "Templates"],
  },
  {
    title: "Google Ads Banner System",
    slug: "google-ads-banner-system",
    price: "$32",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80",
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80",
    ],
    description:
      "IAB-standard Google Display Network banner set covering all major ad sizes. High-contrast CTAs and conversion-optimized layouts included.",
    features: [
      "All IAB standard sizes",
      "Conversion-optimized CTAs",
      "A/B test variants",
      "Figma + PSD files",
      "Animation-ready layers",
    ],
    categories: ["Banner", "Banners"],
  },
  {
    title: "Web Hero Banner Collection",
    slug: "web-hero-banner-collection",
    price: "$28",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
    ],
    description:
      "Stunning full-width hero banner designs for websites and landing pages. Features modern gradients, bold headlines, and versatile image placements.",
    features: [
      "12 hero banner designs",
      "Full-width responsive",
      "Gradient & photo styles",
      "Headline typography",
      "Figma & Sketch files",
    ],
    categories: ["Banner", "Banners"],
  },
  {
    title: "Retail & Sale Banner Kit",
    slug: "retail-sale-banner-kit",
    price: "$22",
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    ],
    description:
      "Promotional banner kit designed for retail, seasonal sales, and flash deals. Includes web banners, email headers, and social ad sizes.",
    features: [
      "25+ banner templates",
      "Sale & promo layouts",
      "Email header sizes",
      "Social ad formats",
      "Editable in Canva",
    ],
    categories: ["Banner", "Banners"],
  },
  {
    title: "Pitch Deck Presentation",
    slug: "pitch-deck-presentation",
    price: "$40",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
    ],
    description:
      "Investor-ready pitch deck template with 30 slides covering problem, solution, market, traction, team, and financial projections. Clean, data-driven design.",
    features: [
      "30 slide layouts",
      "Investor-ready structure",
      "Data chart templates",
      "Team & timeline slides",
      "Google Slides + Figma",
    ],
    categories: ["Template", "Templates", "Presentation", "Presentations"],
  },
  {
    title: "Portfolio Website Template",
    slug: "portfolio-website-template",
    price: "$35",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&q=80",
    ],
    description:
      "Sleek portfolio website template designed for designers, photographers, and creatives. Features project showcases, about pages, and contact forms.",
    features: [
      "5 page layouts",
      "Project showcase grid",
      "Responsive on all devices",
      "Dark & light variants",
      "Figma source files",
    ],
    categories: ["Template", "Templates"],
  },
];

async function seed() {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    const deleted = await Design.deleteMany({});
    console.log(`Deleted ${deleted.deletedCount} existing designs`);

    const created = await Design.insertMany(designs as any[]);
    console.log(`Seeded ${created.length} designs successfully`);

    await mongoose.disconnect();
    console.log("Done!");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

seed();
