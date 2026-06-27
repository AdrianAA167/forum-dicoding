module.exports = {
  root: true,
  env: { browser: true, es2020: true },
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
  },
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.jsx'] },
    },
  },
};
