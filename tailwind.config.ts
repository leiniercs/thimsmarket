import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
   content: [
      "./types/*.ts",
      "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{ts,tsx}",
      "./app/**/*.{ts,tsx}"
   ],
   darkMode: "class",
   theme: {
      extend: {}
   },
   plugins: [nextui()]
};

export default config;
