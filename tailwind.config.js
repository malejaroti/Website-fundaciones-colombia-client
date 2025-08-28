/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    // Make Montserrat the default sans font across the app
    fontFamily: {
      sans: ['"Montserrat"', "ui-sans-serif", "system-ui", "sans-serif"],
    },
    extend: {
      // And also expose a utility: font-montserrat
      fontFamily: {
        montserrat: ['"Montserrat"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
};
