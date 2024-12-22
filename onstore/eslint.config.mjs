// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// export default [
//   {
//     files: ["*.js", "*.ts", "*.jsx", "*.tsx"],  // Áp dụng cho tất cả các file JS, TS, JSX, TSX
//     parserOptions: {
//       ecmaVersion: "latest",
//       sourceType: "module",  // Để hỗ trợ module imports/exports
//     },
//     languageOptions: {
//       ecmaVersion: "latest",
//       sourceType: "module",
//     },
//     extends: [
//       ...compat.extends("next/core-web-vitals", "next/typescript"),
//     ],
//     rules: {
//       '@typescript-eslint/no-unused-vars': 'off', // Tắt rule no-unused-vars
//     },
//   },
// ];
