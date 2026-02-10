module.exports = {
  env: { browser: true, es2020: true },
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true
      }
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    'react-refresh',
    'react',
    '@typescript-eslint',
    'import',
    'simple-import-sort'
  ],
  rules: {
    'array-callback-return': ['error', { checkForEach: true }],
    'no-await-in-loop': 'error',
    'no-constant-binary-expression': 'error',
    'no-constructor-return': 'error',
    'no-promise-executor-return': 'error',
    'no-self-compare': 'error',
    'no-template-curly-in-string': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unreachable-loop': 'error',
    'no-unused-private-class-members': 'error',
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
        variables: true,
        allowNamedExports: false
      }
    ],
    'require-atomic-updates': 'error',

    camelcase: ['error', { properties: 'never' }],
    eqeqeq: 'error',
    'new-cap': ['error', { capIsNew: false }],
    'no-array-constructor': 'error',
    'no-console': ['error', { allow: ['error'] }],
    'no-else-return': ['error', { allowElseIf: false }],
    'no-extend-native': 'error',
    'no-lonely-if': 'error',
    'no-param-reassign': 'error',
    'no-return-assign': 'error',
    'no-throw-literal': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-const': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    radix: 'error',
    yoda: 'error',

    curly: 'error',
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' }
    ],

    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'react-refresh/only-export-components': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/no-unresolved': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ],
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    '@typescript-eslint/no-unsafe-call': 'warn',
    '@typescript-eslint/no-unsafe-member-access': 'warn',
    'prettier/prettier': [
      'error',
      {
        usePrettierrc: true
      }
    ]
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname
      },
      rules: {
        '@typescript-eslint/member-ordering': [
          'error',
          {
            default: [
              'signature',
              'public-static-field',
              'protected-static-field',
              'private-static-field',
              'public-decorated-field',
              'protected-decorated-field',
              'private-decorated-field',
              'public-instance-field',
              'protected-instance-field',
              'private-instance-field',
              'public-abstract-field',
              'protected-abstract-field',
              'public-constructor',
              'protected-constructor',
              'private-constructor',
              'public-abstract-method',
              'protected-abstract-method',
              'public-static-method',
              'protected-static-method',
              'private-static-method',
              'public-decorated-method',
              'protected-decorated-method',
              'private-decorated-method',
              'public-instance-method',
              'protected-instance-method',
              'private-instance-method'
            ]
          }
        ],
        '@typescript-eslint/no-confusing-non-null-assertion': ['error'],
        '@typescript-eslint/no-confusing-void-expression': [
          'error',
          { ignoreArrowShorthand: true }
        ],
        '@typescript-eslint/no-explicit-any': ['warn'],
        '@typescript-eslint/no-extra-non-null-assertion': ['error'],
        '@typescript-eslint/no-floating-promises': ['error'],
        '@typescript-eslint/no-non-null-asserted-optional-chain': ['error'],
        '@typescript-eslint/no-non-null-assertion': ['error'],
        '@typescript-eslint/no-require-imports': ['error'],
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': ['error'],
        '@typescript-eslint/no-unnecessary-condition': ['error'],
        '@typescript-eslint/no-useless-constructor': ['error'],
        '@typescript-eslint/prefer-for-of': ['error'],
        '@typescript-eslint/prefer-nullish-coalescing': ['error'],
        '@typescript-eslint/prefer-readonly': ['error'],
        '@typescript-eslint/promise-function-async': [
          'error',
          { checkArrowFunctions: false }
        ],
        '@typescript-eslint/switch-exhaustiveness-check': ['error']
      }
    },
    {
      files: ['*.ts'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': ['error']
      }
    }
  ]
};
