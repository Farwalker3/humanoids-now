/**
 * Site-wide configuration
 * Centralized place for app constants and settings
 */
export const siteConfig = {
  name: "Humanoids Now",
  description: "Building revolutionary bipedal humanoid robots with animal-inspired designs that serve as both autonomous companions and modular prosthetic components.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://humanoids-now.kodair.us",
  links: {
    github: "https://github.com/Farwalker3/humanoids-now",
    twitter: "https://x.com/farwalker3",
    linkedin: "https://www.linkedin.com/in/johncbarr/",
    shop: "https://shop.kodair.us/pages/humanoids-now",
  },
  creator: "John C. Barr",
};

export type SiteConfig = typeof siteConfig;
