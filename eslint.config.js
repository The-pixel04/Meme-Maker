import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
    { ignores: ["dist"] },
    {
        files: ["**/*.{js,jsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                ecmaVersion: "latest",
                ecmaFeatures: { jsx: true },
                sourceType: "module",
            },
        },
        settings: { react: { version: "18.3" } },
        plugins: {
            react,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...react.configs.recommended.rules,
            ...react.configs["jsx-runtime"].rules,
            ...reactHooks.configs.recommended.rules,
            "react/jsx-no-target-blank": "off",
            "react/require-default-props": "off",
            "react-hooks/exhaustive-deps": "off",
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },

            ],
            "no-console": "warn",
            "indent": [
                "error",
                4,
                { "ignoredNodes": ["TemplateLiteral"] },
            ],
            "template-curly-spacing": "off",
            "linebreak-style": [
                "error",
                "windows",
            ],
            "quotes": [
                "error",
                "double",
            ],
            "semi": [
                "error",
                "always",
            ],
            "no-var": "error",
            "no-duplicate-imports": [
                "error",
                {
                    "includeExports": true,
                },
            ],
            "arrow-spacing": [
                "error",
                {
                    "before": true,
                    "after": true,
                },
            ],
            "max-depth": [
                "error",
                4,
            ],
            "camelcase": "error",
            "capitalized-comments": [
                "error",
                "always",
                {
                    "line": {
                        "ignoreConsecutiveComments": true,
                    },
                },
            ],
            "comma-spacing": [
                "error",
                {
                    "before": false,
                    "after": true,
                },
            ],
            "comma-style": "error",
            "array-bracket-newline": [
                "error",
                "consistent",
            ],
            "array-bracket-spacing": [
                "error",
                "never",
            ],
            "complexity": [
                "error",
                20,
            ],
            "max-len": "off",
            "max-lines": "off",
            "curly": "error",
            "no-debugger": "error",
            "no-await-in-loop": "error",
            "no-cond-assign": "error",
            "eqeqeq": [
                "warn",
                "smart",
            ],
            "dot-notation": [
                "error",
                {
                    "allowPattern": "^[a-z]+((_)[a-z]+)+$",
                },
            ],
            "default-case": [
                "error",
                {
                    "commentPattern": "^skip\\sdefault",
                },
            ],
            "no-caller": "error",
            "no-empty-function": "error",
            "no-implied-eval": "error",
            "no-empty-pattern": "error",
            "no-iterator": "error",
            "no-labels": "error",
            "no-lone-blocks": "error",
            "no-loop-func": "error",
            "no-multi-spaces": [
                "error",
                {
                    "ignoreEOLComments": true,
                    "exceptions": {
                        "Property": true,
                        "VariableDeclarator": true,
                        "ImportDeclaration": true,
                    },
                },
            ],
            "key-spacing": "error",
            "keyword-spacing": ["error", { "before": true }],
            "no-script-url": "error",
            "no-sequences": "error",
            "no-unmodified-loop-condition": "error",
            "no-unused-vars": [
                "warn",
                {
                    "vars": "all",
                    "args": "after-used",
                    "ignoreRestSiblings": false,
                },
            ],
            "eol-last": ["warn", "always"],
            "object-curly-spacing": ["warn", "always"],
            "object-shorthand": ["warn", "always", { "avoidQuotes": true }],
            "comma-dangle": ["warn", "always-multiline"],
            "no-mixed-spaces-and-tabs": "warn",
            "no-multiple-empty-lines": ["warn", { "max": 1, "maxEOF": 0, "maxBOF": 0 }],
            "no-trailing-spaces": "warn",
            "prefer-const": [
                "warn",
                {
                    "destructuring": "any",
                    "ignoreReadBeforeAssign": false,
                },
            ],
            "space-infix-ops": ["error", { "int32Hint": false }],
            "jsx-quotes": ["warn", "prefer-double"],
            "react/prop-types": "off",
        },
    },
];
