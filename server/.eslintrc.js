module.exports = {
  extends: 'standard',
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': ['error', 'always'],
    semi: ['error', 'always'],
    'no-tabs': 0,
    indent: ['error', 'tab']
  }
}
