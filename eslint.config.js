import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import vue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import prettierConfig from "eslint-config-prettier";

export default [
  js.configs.recommended,
  ...vue.configs["flat/recommended"],
  prettierConfig,
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptParser,
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        fetch: "readonly",
        window: "readonly",
        document: "readonly",
        console: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "vue/multi-word-component-names": "off",
      // Turn off vue/html-indent to let Prettier handle formatting
      "vue/html-indent": "off",
      "vue/max-attributes-per-line": "off",
      "vue/singleline-html-element-content-newline": "off",
      "vue/multiline-html-element-content-newline": "off",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Vue core and Vue ecosystem packages
            ["^vue", "^vue-"],
            // External packages (node_modules)
            ["^@?\\w"],
            // Internal packages with @/ alias
            ["^@/"],
            // Side effect imports
            ["^\\u0000"],
            // Parent imports (../)
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            // Same-folder imports (./)
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            // Style imports (CSS, SCSS, etc.)
            ["^.+\\.s?css$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
  {
    ignores: ["dist", "node_modules", "*.config.js"],
  },
];
