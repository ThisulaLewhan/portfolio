/** All page copy, in Thisula's words. Edit freely. */

export const nav = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "skyradix", label: "Skyradix" },
  { id: "background", label: "Background" },
  { id: "contact", label: "Contact" },
] as const;

export const hero = {
  intro:
    "I’m Thisula. I’m building my own path through business and technology, learning as I go, and working towards ideas I believe are worth pursuing.",
  primary: "Get in touch",
  secondary: "Explore Skyradix",
};

export const about = {
  heading: "A little about me.",
  lead: "I’m interested in how good ideas become useful businesses.",
  paragraphs: [
    "My background brings together business, marketing, and technology, and I’m using that mix to build Skyradix, explore practical opportunities, and learn by doing.",
    "I’m drawn to problems worth solving, clear thinking, and work that creates value beyond the initial idea.",
    "This site is where I share a little of what I’m building, what I’m learning, and how my thinking develops along the way.",
  ],
};

export const skyradix = {
  heading: "Skyradix.",
  line: "Something of my own.",
  paragraphs: [
    "Skyradix is the business I’m building around useful digital and technology solutions.",
    "It gives me a way to work with real problems, turn ideas into practical solutions, and learn what it takes to create lasting value for customers.",
    "My ambition is to grow it deliberately, through good work, honest relationships, and solutions that are genuinely worth paying for.",
  ],
  action: "Visit Skyradix",
};

export const values = {
  heading: "How I think about business.",
  items: [
    { title: "Understand the problem.", body: "Good solutions begin with understanding the problem, the people experiencing it, and what success actually looks like." },
    { title: "Focus on useful outcomes.", body: "Technology should make something better, whether that means saving time, improving decisions, or helping a business serve its customers." },
    { title: "Build trust over time.", body: "Clear communication, following through on commitments, and doing useful work are the foundations of lasting relationships." },
  ],
};

/** A snapshot of current focus. Edit the text here whenever it changes. */
export const currently = {
  label: "Currently",
  heading: "What has my attention.",
  intro: "Right now, I’m focused on building a stronger foundation for my entrepreneurial journey.",
  items: [
    { title: "Growing Skyradix", body: "Building useful digital and technology solutions while learning how to grow a business sustainably." },
    { title: "Understanding real business problems", body: "Learning from business needs, customer conversations, and the practical challenges of running and improving a business." },
    { title: "Exploring sustainable business models", body: "Investigating how repeatable services, thoughtful use of technology, and strong customer value can create long-term opportunities." },
  ],
};

export const background = {
  heading: "A little background.",
  intro: "My education has given me a foundation across business, marketing, and technology.",
  items: [
    // Latest first. Logos sit in a fixed-height box, so different shapes line up.
    { place: "Sri Lanka Institute of Information Technology (SLIIT)", detail: "BSc (Hons) in Information Technology, currently pursuing.", logo: { src: "/images/sliit-logo.png", w: 3368, h: 753 } },
    { place: "Sri Lanka Institute of Marketing (SLIM)", detail: "Professional Certificate in Marketing.", logo: { src: "/images/slim-logo.png", w: 262, h: 125 } },
    { place: "Royal College, Colombo", detail: "School education.", logo: { src: "/images/rc-logo.png", w: 952, h: 1368 } },
  ],
  closing:
    "These are part of my journey, but they don’t tell the whole story. Much of what I’m learning comes from the people I meet and the things I take on.",
};

export type Note = { title: string; date: string; href: string; summary?: string };

export const notes = {
  heading: "Notes, occasionally.",
  lead: "A place for thoughts, lessons, and ideas worth sharing.",
  body: "I write about building businesses, practical technology, and the questions that come up along the way. Occasionally, a useful lesson or observation deserves a little more thought.",
  /** Add real notes here when they exist; the list appears automatically. */
  items: [] as Note[],
};

export const contact = {
  heading: "Let’s connect.",
  lines: ["Have a business enquiry, an idea to discuss, or simply want to say hello?", "I’m always open to a good conversation."],
};

export const footer = "Made with care.";
