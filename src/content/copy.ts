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
  lead: "I’ve always believed that the best way to learn is to get involved, ask questions, and work things out for yourself.",
  paragraphs: [
    "My background brings together business, marketing, and technology. Today, I’m focused on building my own business, meeting good people, and creating opportunities to turn ideas into something real.",
    "I’m still learning, still figuring things out, and happy with the process of getting better along the way.",
  ],
};

export const skyradix = {
  heading: "Skyradix",
  line: "Something of my own.",
  paragraphs: [
    "Skyradix is the business I’m building. It gives me a place to develop ideas, work on things that matter to me, and put what I learn into practice.",
    "I see it as a long-term journey, one built through good work, honest relationships, and steady progress.",
  ],
  action: "Visit Skyradix",
};

export const values = {
  heading: "A few things I value.",
  items: [
    { title: "Doing what you say.", body: "Trust is built through actions, not promises." },
    { title: "Keeping things honest.", body: "Clear communication and straightforward relationships matter to me." },
    { title: "Making things useful.", body: "An idea is only worth pursuing when it can make a real difference to someone." },
  ],
};

export const background = {
  heading: "A little background.",
  intro: "My education has given me a foundation across business, marketing, and technology.",
  items: [
    // Latest first. Logos sit in a fixed-height box, so different shapes line up.
    { place: "Sri Lanka Institute of Information Technology (SLIIT)", detail: "BSc (Hons) in Information Technology.", logo: { src: "/images/sliit-logo.png", w: 3368, h: 753 } },
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
  body: "I may write about business, things I’m learning, or observations that stay with me. Nothing on a schedule, just when I have something worth saying.",
  /** Add real notes here when they exist; the list appears automatically. */
  items: [] as Note[],
};

export const contact = {
  heading: "Let’s connect.",
  lines: ["Have a business enquiry, an idea to discuss, or simply want to say hello?", "I’m always open to a good conversation."],
};

export const footer = "Made with care.";
