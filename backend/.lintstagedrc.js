module.exports = {
  '*.{js,ts}': [
    'yarn lint',
  ],
  '"**/*.(js|json|ts)"': ['prettier --write', 'git add '],
};
