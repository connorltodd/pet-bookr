import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        // Add your custom viewport breakpoints here
        xs: "480px", // Extra small screen
        sm: "640px", // Small screen (default Tailwind)
        md: "768px", // Medium screen (default Tailwind)
        lg: "1024px", // Large screen (default Tailwind)
        xl: "1280px", // Extra large screen (default Tailwind)
        "2xl": "1536px", // 2x Extra large screen (default Tailwind)
      },
    },
  },
  daisyui: {
    themes: [
      {
        corporate: {
          primary: "#957C6A",
          "primary-focus": "#cdb19d",
          "primary-content": "#FFF",

          secondary: "#E7E1D9",
          "secondary-focus": "#cbc5be",
          "secondary-content": "#FFF",

          accent: "#67cba0",
          "accent-focus": "#41be88",
          "accent-content": "#161827",

          neutral: "#E7E1D9",
          "neutral-focus": "#cbc5be",
          "neutral-content": "#161827",

          "base-100": "#ffffff",
          "base-200": "#f7fafd",
          "base-300": "#eaf0f6",
          "base-content": "#161827",

          info: "#1c92f2",
          success: "#009485",
          warning: "#ff9900",
          error: "#ff5724",

          "--rounded-box": "1rem",
          "--rounded-btn": ".5rem",
          "--rounded-badge": "1.9rem",

          "--animation-btn": "0",
          "--animation-input": "0",

          "--btn-text-case": "uppercase",
          "--navbar-padding": ".5rem",
          "--border-btn": "1px",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};

export default config;
