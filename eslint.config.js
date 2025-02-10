// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      "no-extra-boolean-cast": "error",
      "no-case-declarations": "error",
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/ban-ts-comment": ["off"],
      "@typescript-eslint/no-explicit-any": ["error"],
      "@typescript-eslint/no-non-null-assertion": ["error"],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "rxjs-angular-x/prefer-takeuntil": [
        "error",
        {
          checkComplete: false,
          checkDecorators: ["Component", "Directive", "Injectable"],
          alias: ["takeUntilDestroyed"],
          checkDestroy: false,
        },
      ],
      "rxjs/ban-observables": ["error"],
      "rxjs/ban-operators": ["error"],
      "rxjs/no-connectable": ["error"],
      "rxjs/no-cyclic-action": ["error"],
      "rxjs/no-compat": ["error"],
      "rxjs/no-ignored-replay-buffer": ["error"],
      "rxjs/no-unsafe-catch": ["error"],
      "rxjs/no-unsafe-first": ["error"],
      "rxjs/no-unsafe-switchmap": ["error"],
      "rxjs/no-async-subscribe": ["error"],
      "rxjs/no-create": ["error"], //
      "rxjs/no-ignored-observable": ["error"],
      "rxjs/no-exposed-subjects": ["error"],
      "rxjs/no-nested-subscribe": ["error"],
      "rxjs/no-ignored-notifier": ["error"],
      "rxjs/no-redundant-notify": ["error"],
      "rxjs/no-subject-unsubscribe": ["error"],
      "rxjs/no-unbound-methods": ["error"],
      "rxjs/no-unsafe-subject-next": ["error"],
      "rxjs/no-unsafe-takeuntil": ["error"],
      eqeqeq: ["error", "smart"],
      "prefer-const": "error",
      "no-unused-expressions": "error",
      "@angular-eslint/use-lifecycle-interface": "error",
      "@angular-eslint/no-input-rename": "off",
      "@angular-eslint/no-empty-lifecycle-method": ["error"],
    },
  },
);
