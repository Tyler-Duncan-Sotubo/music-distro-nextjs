import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.tsx"],
  theme: {
    colors: {
      primary: "rgb(29, 78, 216)",
      primaryHover: "rgba(29, 78, 216, 0.8)",
      secondary: "#f4f4fe",
      white: "#fdfdff",
      black: "#000000",
      backgroundTo: "#040a1f",
      error: "#ff0000",
      warning: "#ffae00",
      gray: "#E5E4E2",
      zinc: {
        "900": "#44403c",
      },
      green: {
        "600": "#38a169",
      },
    },
    extend: {
      fontSize: {
        "2sm": "1rem",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      keyframes: {
        slideIn: {
          "0%": {
            transform: "translateY(-10%)",
            opacity: "0.3",
          },
          "100%": {
            transform: "translateY(0%)",
            opacity: "1",
          },
        },
      },
      animation: {
        slideIn: "slideIn 500ms ease-in-out",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwindcss-animate")],
} satisfies Config;
