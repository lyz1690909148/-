/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0F1B2D",
          deep: "#091223",
          soft: "#1A2A42",
        },
        paper: {
          DEFAULT: "#F2EDE2",
          warm: "#EBE3D2",
          cool: "#F7F4EC",
        },
        rule: "#11151C",
        bone: "#D9CFB7",
        copper: "#C45A2A",
        moss: "#5C7A4F",
        amber: "#B8862E",
        slate2: "#6E7A86",
        oxide: "#8B3A1E",
      },
      fontFamily: {
        display: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        wider2: "0.18em",
      },
      boxShadow: {
        plate: "0 1px 0 0 #11151C",
        hard: "4px 4px 0 0 #11151C",
        "hard-sm": "2px 2px 0 0 #11151C",
        "hard-copper": "4px 4px 0 0 #C45A2A",
      },
      backgroundImage: {
        "paper-grain":
          "radial-gradient(rgba(17,21,28,0.06) 1px, transparent 1px)",
        "grid-faint":
          "linear-gradient(to right, rgba(17,21,28,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,21,28,0.06) 1px, transparent 1px)",
        "noise":
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.05 0 0 0 0 0.05 0 0 0 0 0.05 0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.18'/></svg>\")",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        riseIn: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        cursor: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        rise: "riseIn 0.7s cubic-bezier(0.2,0.7,0.2,1) both",
        cursor: "cursor 1.1s steps(2) infinite",
      },
    },
  },
  plugins: [],
};
