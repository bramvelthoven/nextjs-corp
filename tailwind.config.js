module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./public/index.html",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },
    extend: {
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
      },
      maxWidth: {
        "8xl": "90rem",
      },
      colors: {
        background: { DEFAULT: "oklch(1 0 0)" },
        foreground: { DEFAULT: "oklch(0.141 0.005 285.823)" },
        primary: { DEFAULT: "#638763" },
        "primary-foreground": { DEFAULT: "oklch(0.982 0.018 155.826)" },
        border: { DEFAULT: "oklch(0.92 0.004 286.32)" },
        input: { DEFAULT: "oklch(0.92 0.004 286.32)" },

        "dark-background": { DEFAULT: "oklch(0.141 0.005 285.823)" },
        "dark-foreground": { DEFAULT: "oklch(0.985 0 0)" },
        "dark-primary": { DEFAULT: "#638763" },
        "dark-primary-foreground": { DEFAULT: "oklch(0.393 0.095 152.535)" },
        "dark-border": { DEFAULT: "oklch(1 0 0 / 10%)" },
        "dark-input": { DEFAULT: "oklch(1 0 0 / 15%)" },
      },
    },
  },
  plugins: [],
};
