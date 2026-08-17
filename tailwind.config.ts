import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#14110F",
        surface: "#1E1A17",
        surface2: "#2A2420",
        line: "#3A322C",
        paper: "#F2EDE7",
        muted: "#B8AFA6",
        flame: "#FF5A36",
        flame2: "#FF8A3D",
        lime: "#C6F135",
        water: "#3EC6FF",
        danger: "#FF4D6D",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        glow: "0 0 24px rgba(255, 90, 54, 0.35)",
        glowLime: "0 0 24px rgba(198, 241, 53, 0.3)",
      },
      keyframes: {
        pulseSlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
        rise: {
          "0%": { transform: "translateY(8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        pulseSlow: "pulseSlow 2.4s ease-in-out infinite",
        rise: "rise 0.4s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
