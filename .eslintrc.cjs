module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'playwright.config.js'],
  plugins: ['react-refresh'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.jsx'] }],
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'import/extensions': ['error', 'ignorePackages', { js: 'never', jsx: 'never' }],
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['vite.config.js', '**/*.test.js', '**/*.test.jsx', '**/__tests__/**'] }],
    'no-underscore-dangle': 'off',
  },
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.jsx'] },
    },
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.js', '**/__tests__/**/*.jsx', '**/*.test.js', '**/*.test.jsx'],
      env: { node: true },
      rules: {
        'no-await-in-loop': 'off',
      },
    },
  ],
};
