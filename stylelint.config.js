module.exports = {
  plugins: ['stylelint-scss'],
  extends: 'stylelint-config-standard',
  rules: {
    'string-quotes': 'single',
    'max-empty-lines': null,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'extend',
          'for',
          'import',
          'include',
          'mixin',
          'media',
          'if',
          'else',
          'while'
        ]
      }
    ],
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['composes']
      }
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global']
      }
    ]
  }
}
