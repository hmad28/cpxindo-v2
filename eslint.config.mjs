import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: ["lib/db/download-images.ts", ".next/**", "node_modules/**"],
  },
  ...nextVitals,
  {
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-img-element": "off",
    },
  },
];

export default config;
