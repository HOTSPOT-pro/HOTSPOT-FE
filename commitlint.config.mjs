export default {
  parserPreset: {
    parserOpts: {
      headerCorrespondence: ['ticket', 'type', 'scope', 'subject'],
      headerPattern:
        /^\[(?<ticket>[A-Z]+-\d+)\]\s(?<type>\w+)(?:\((?<scope>[^)]+)\))?:\s(?<subject>.+)$/,
    },
  },
  rules: {
    'header-max-length': [2, 'always', 100],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'ci', 'revert', 'del', 'add'],
    ],
  },
};
