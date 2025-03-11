// module.exports = {
//   tailwindConfig: "./tailwind.config.cjs",
//   plugins: [require("prettier-plugin-tailwindcss")],
// };

(async () => {
  const tailwindPlugin = await import('prettier-plugin-tailwindcss');
  module.exports = {
    plugins: [tailwindPlugin.default],
  };
})();

