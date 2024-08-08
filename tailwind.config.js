/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/views/**/*.{html,ejs}"],
  theme: {
    extend: {
      colors: {
        dark: "#121619",
        primary: "#f7b035",
        secondary: "#fff8ef",
        light: "#ebebeb",
      },
      fontFamily: {
        sans: "Open Sans",
        heading: "Rubik",
      },
      backgroundImage: {
        hero: "url('/static/images/chef-bg.png')",
      },
    },
  },
  plugins: [],
};
