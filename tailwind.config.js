/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2493DF",
        secondary: "#1C1D24",
        destructive: "#ef4444",
        ring: "#2493DF",
        background: "#1C1D24",
        foreground: "#ffffff",
        "primary-foreground": "#ffffff",
        "secondary-foreground": "#ffffff",
        "destructive-foreground": "#ffffff",
        input: "#2C2D34",
        accent: "#2493DF",
        "accent-foreground": "#ffffff",
      },
    },
  },
  plugins: [],
} 