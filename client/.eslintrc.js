module.exports = {
  extends: 'react-app',
  rules: {
    'linebreak-style': 0,
    'jsx-a11y/href-no-hash': 0,
    'jsx-a11y/anchor-is-valid': ['off', { aspects: ['invalidHref'] }],
  },
};
