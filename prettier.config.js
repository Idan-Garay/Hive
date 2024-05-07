/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  endOfLine: "lf",
  printWidth: 80,
  tabWidth: 2,
  trailingComma: "es5",
};

export default config;
