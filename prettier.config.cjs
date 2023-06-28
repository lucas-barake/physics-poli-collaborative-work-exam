/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  singleQuote: false,
  semi: true,
  tabWidth: 2,
  trailingComma: "es5",
  printWidth: 100,
  arrowParens: "always",
  bracketSpacing: true,
};

module.exports = config;
