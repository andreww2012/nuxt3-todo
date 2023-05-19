// https://eslint.org/docs/latest/use/configure/configuration-files
module.exports = {
  root: true,

  env: {
    commonjs: true,
    es6: true,
    browser: true,
  },

  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2022,
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
  },

  plugins: [
    '@typescript-eslint',
    'optimize-regex',
    'sonarjs',
    'unicorn',
    'require-extensions',
  ],

  extends: [
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended',

    'eslint:recommended',
    'airbnb-base',

    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:require-extensions/recommended',

    'plugin:@typescript-eslint/recommended',

    'plugin:vue/vue3-recommended',
    'plugin:promise/recommended',

    'plugin:prettier/recommended',
  ],

  settings: {
    'import/resolver': {
      typescript: true,
    },

    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },

  rules: {
    /* Vue */
    'vue/component-name-in-template-casing': [
      2,
      'kebab-case',
      {
        registeredComponentsOnly: false,
      },
    ],
    'vue/html-self-closing': [
      2,
      {
        html: {
          void: 'any', // Always set to any if used with Prettier
          normal: 'never',
          component: 'never',
        },
      },
    ],
    'vue/multi-word-component-names': 0,
    'vue/no-template-target-blank': 2,
    'vue/no-this-in-before-route-enter': 2,
    'vue/no-undef-components': 2,
    'vue/no-useless-mustaches': 2,
    'vue/no-v-html': 2,
    'vue/require-explicit-emits': 0,
    'vue/require-default-prop': 0,
    'vue/v-on-function-call': [2, 'always'],

    /* Optimize regex */
    'optimize-regex/optimize-regex': 1,

    /* sonarjs */
    'sonarjs/cognitive-complexity': 0,
    'sonarjs/no-duplicate-string': 0,
    'sonarjs/no-nested-template-literals': 0,
    'sonarjs/prefer-immediate-return': 0,

    /* unicorn */
    'unicorn/catch-error-name': 0,
    'unicorn/consistent-destructuring': 0,
    'unicorn/filename-case': 0,
    'unicorn/no-array-callback-reference': 0,
    'unicorn/no-array-for-each': 0,
    'unicorn/no-array-reduce': 0,
    'unicorn/no-await-expression-member': 0,
    'unicorn/no-for-loop': 0,
    'unicorn/no-nested-ternary': 0,
    'unicorn/no-null': 0,
    'unicorn/no-unreadable-array-destructuring': 0,
    'unicorn/no-useless-undefined': 0,
    'array-callback-return': [2, {allowImplicit: true}],
    'unicorn/numeric-separators-style': [2, {onlyIfContainsSeparator: true}],
    'unicorn/prefer-event-target': 0,
    'unicorn/prefer-module': 0,
    'unicorn/prefer-node-protocol': 0,
    'unicorn/prefer-regexp-test': 0,
    'unicorn/prefer-spread': 0, // TODO
    'unicorn/prefer-switch': [2, {minimumCases: 4, emptyDefaultCase: 'do-nothing-comment'}],
    'unicorn/prevent-abbreviations': 0,
    'unicorn/explicit-length-check': 0,
    'unicorn/prefer-dom-node-text-content': 0,
    'unicorn/prefer-top-level-await': 0,

    // import
    'import/extensions': [
      2,
      'ignorePackages',
      {
        js: 'always',
        ts: 'never',
      },
    ],
    'import/order': [
      2,
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],

        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
          },
        ],

        alphabetize: {
          order: 'asc',
        },
      },
    ],
    'import/prefer-default-export': 0,

    // typescript
    '@typescript-eslint/consistent-type-definitions': [2, 'interface'],
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-extraneous-class': 2,
    '@typescript-eslint/no-unused-vars': 2,
    '@typescript-eslint/no-useless-constructor': 2,
    '@typescript-eslint/no-shadow': 2,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/ban-types': [
      2,
      {
        types: {
          object: false,
          '{}': false,
        },
      },
    ],

    /* Promise */
    'promise/always-return': 1,
    'promise/catch-or-return': [
      2,
      {
        allowThen: true,
        allowFinally: true,
      },
    ],

    /* airbnb */
    camelcase: 1,
    'class-methods-use-this': 0,
    'func-names': 0,
    'lines-between-class-members': 0,
    'max-classes-per-file': 0,
    'no-await-in-loop': 1,
    'no-bitwise': 0,
    'no-continue': 0,
    'no-implicit-coercion': [2, {boolean: true}],
    'no-nested-ternary': 0,
    'no-new': 1,
    'no-param-reassign': [2, {props: false}],
    'no-plusplus': 0,
    'no-restricted-syntax': [2, 'ForInStatement', 'LabeledStatement', 'WithStatement'],
    'no-return-await': 0,
    'no-sequences': 0,
    'no-shadow': 0,
    'no-underscore-dangle': 0,
    'no-unused-expressions': [
      2,
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    'no-useless-constructor': 2,
    'prefer-const': 2,
    'prefer-destructuring': [
      2,
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
    ],
    'prefer-rest-params': 0,
    'sort-imports': [2, {ignoreDeclarationSort: true}],
  },
};
