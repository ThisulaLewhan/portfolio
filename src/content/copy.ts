/**
 * All page copy outside site config. Written to be edited: keep it true and
 * in your own voice.
 */

export const sections = [
  { id: "about", label: "About" },
  { id: "perspective", label: "Perspective" },
  { id: "skyradix", label: "Skyradix" },
  { id: "groundwork", label: "Groundwork" },
  { id: "person", label: "Person" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

export const about = {
  title: "The root of it",
  manifesto:
    "I'm Thisula. I study information technology, I run a business, and I spend most of my time where those two overlap. Technology on its own doesn't interest me much. What it makes possible does: a problem finally understood, a process that stops wasting people's time, an idea that becomes something real and useful.",
  facts: [
    { label: "Based in", value: "Colombo, Sri Lanka" },
    { label: "Building", value: "Skyradix, as founder" },
    { label: "Studying", value: "IT at SLIIT, final year" },
  ],
};

export const perspective = {
  title: "Four things I keep connecting",
  intro: "None of them is enough on its own. The useful work happens where they overlap.",
  lenses: [
    {
      id: "technology",
      word: "Technology",
      body: "The tool, not the point. I like it most when it disappears into something that simply works for the person using it.",
    },
    {
      id: "business",
      word: "Business",
      body: "Everything worth building has someone on the other side: paying for it, relying on it, or getting time back because of it. I try to start with them.",
    },
    {
      id: "marketing",
      word: "Marketing",
      body: "A good product that nobody understands goes nowhere. It's why I studied marketing alongside IT, and why how something is explained matters to me as much as how it's built.",
    },
    {
      id: "creativity",
      word: "Creativity",
      body: "Most problems have an obvious answer and a better one. Looking for the better one, and being curious enough to keep looking, is where the interesting work is.",
    },
  ],
};

/** Everything here is taken from skyradix.com. */
export const skyradix = {
  label: "The business I founded",
  meaning: [
    { part: "Sky", gloss: "Limitless potential" },
    { part: "Radix", gloss: "The root, the foundation" },
  ],
  intro:
    "Skyradix is the IT business I founded. It turns ideas into digital products and builds the software, websites and systems that help businesses grow.",
  services: [
    "Web development",
    "Software and systems development",
    "Mobile application development",
    "ERP and enterprise solutions",
    "SaaS and platform development",
    "UI/UX and product design",
    "Digital marketing and growth strategy",
  ],
};

export const groundwork = {
  title: "Groundwork",
  intro: "Where I've been learning how things actually run.",
  rows: [
    {
      org: "MAS Holdings",
      role: "Technology services intern",
      when: "Six months",
      body: "Data analytics and IT operations inside a large organisation: Power BI dashboards, Microsoft 365 licence optimisation, IT asset management, Power Apps backend tasks, ServiceNow integration work and Microsoft Intune device-management workflows.",
      note: "Team work, and the details stay inside the company. I'm happy to talk about how we approached it.",
    },
    {
      org: "IEEE at SLIIT",
      role: "Webmaster, Student Branch",
      when: "Involved since 2024",
      body: "Looking after how the branch shows up online. Executive Committee in 2026, Standing Committee in 2025, and Public Visibility Team Lead for IEEE Day 2024 and Path to Internship 2025.",
      note: "",
    },
    {
      org: "SLIIT",
      role: "BSc (Hons) Information Technology",
      when: "Final year",
      body: "Specialising in Information Technology at the Sri Lanka Institute of Information Technology.",
      note: "",
    },
    {
      org: "SLIM",
      role: "Professional Certificate in Marketing",
      when: "2023",
      body: "Taken alongside an IT degree, because building something is only half the job. People also have to understand why it matters.",
      note: "",
    },
  ],
};

export const person = {
  title: "Off the clock",
  lead: "Curious first, technical second.",
  paragraphs: [
    "I keep getting pulled toward the business side of things: why some ideas find customers and others don't, how a brand earns trust, what makes someone choose one product over another.",
    "I learn on purpose. Outside the degree that's meant courses in marketing, Python, web design and Power BI, and a lot of learning by building.",
    "Away from a screen, I train consistently. It's the same habit as everything else: show up, put in the work, come back tomorrow.",
  ],
  starters: [
    "Starting a business while still at university",
    "Why an IT student took a marketing course",
    "What makes people trust a brand",
    "What a Webmaster actually does at IEEE",
  ],
};
