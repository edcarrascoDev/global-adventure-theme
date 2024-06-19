/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    'body': ['Merriweather Sans']
  },
  purge: {
    enabled: true,
    content: ["./**/*.liquid"],
  },
};
