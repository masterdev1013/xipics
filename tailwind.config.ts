import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"node_modules/preline/dist/*.js"
	],
	darkMode: "class",
	safelist: [
		"bg-primary",
		"bg-primary-100",
		"bg-danger",
		"bg-danger-100",
		"bg-success",
		"bg-success-100",
		"bg-dark",
		"bg-dark-100",
		"bg-info",
		"bg-info-100"
	],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: "#5148fa",
					100: "#5d55fa"
				},
				danger: {
					DEFAULT: "#ab003c",
					100: "#c70e4f"
				},
				success: {
					DEFAULT: "#00b0ff",
					100: "#2bbcfc"
				},
				dark: {
					DEFAULT: "#0c0b0d",
					100: "#1a181c"
				},
				info: {
					DEFAULT: "#000000",
					100: "#000000"
				},
				"input-boarder": "#24242b"
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
			}
		}
	},
	plugins: [require("preline/plugin")]
};
export default config;
