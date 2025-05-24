/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#FF552A",
                secondary: "#FF7350",
                third: "#FFFBEE",
            },
        },
    },
    plugins: [require("daisyui")],
    darkMode: "class",
};
