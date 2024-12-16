import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: "marquee 25s linear infinite",
        marquee2: "marquee2 25s linear infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-green-progress-bar": "linear-gradient(0.32deg, #86E7A7 -62.68%, #EBFF38 99.81%)",
        "gradient-red-progress-bar": "linear-gradient(185.03deg, #FF386B 15.14%, #A34FDE 143.04%)",
        "gradient-purple-progress-bar": "linear-gradient(358.14deg, #758CE8 -55%, #A34FDE 70.59%)",
        "gradient-blue-progress-bar": "linear-gradient(0.32deg, #405BFF -62.68%, #3DD6F5 99.81%)",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-scoreboard-timer-text":
          "linear-gradient(126.05deg, #FFFFFF 50.31%, rgba(255, 255, 255, 0) 123.98%)",
        "gradient-scoreboard-timer-background":
          "linear-gradient(180deg, #151515 0%, rgba(125, 125, 125, 0) 100%)",
        "gradient-purple-winner-background":
          "linear-gradient(218.69deg, #405BFF 2.83%, #A34FDE 105.13%)",
        "gradient-red-winner-background":
          "linear-gradient(223.42deg, #FF386B -1.29%, #A34FDE 110.16%)",
        "gradient-blue-winner-background":
          "linear-gradient(224.68deg, #405BFF -5.3%, #3DD6F5 112.86%)",
      },
      colors: {
        context: "var(--context-color)",
        amazonColor: "#FF9900",
        ldblue: "#3DD6F5",
        lddblue: "#3F8FFB",
        ldgreen: "#86E7A7",
        ldred: "#FF386B",
        lddred: "#C547B4",
        ldpurple: "#A34FDE",
        lddpurple: "#758CE8",
        ldyellow: "#EBFF38",
        ldgray: "#282828",
        ldgraytext: "#BCBEC0",
        ldhl: "#EBFF38",
        ldgdcol1: "#DEE8C8",
        ldgdcol2: "#A7B6EA",
        ldinput: "#212121",
        ldinputback: "#282828",
        ldtsgray: "#D1D3D4",
        ldbackground: "#191919",
        ldsiteblue: "#405BFF",
        ldsitehover: "#7084FF",
        lddarkstatus: "#58595B",
        ldskipbuttons: "#D1D3D4",
        ldcomplicatedwhite: "#E6E6E6",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        sohne: ["Sohne"],
        sohnemono: ["Sohne Mono"],
        audimat: ["Audimat"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
