export default [
  {
    ignores: ["eslint.config.js"],
    files: ["**/*.{js,jsx}"], // ← JSXも含めるように！
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "no-alert": "error",
      "id-length": ["error", { max: 12 }],
    },
  },
];
