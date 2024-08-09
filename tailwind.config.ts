import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    colors: {
      primary: "#1e40af",
      primaryHover: "#1d4ed8",
      secondary: "#f4f4fe",
      white: "#fdfdff",
      black: "#000000",
      backgroundTo: "#040a1f",
      error: "#ff0000",
      gray: "#E5E4E2",
      zinc: {
        900: "#44403c",
      },
      green: {
        600: "#38a169",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateY(-10%)", opacity: "0.3" },
          "100%": { transform: "translateY(0%)", opacity: "1" },
        },
      },
      animation: {
        slideIn: "slideIn 500ms ease-in-out",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;
