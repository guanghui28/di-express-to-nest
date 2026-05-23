export default {
  extends: ['@commitlint/config-conventional'],

  helpUrl: 'https://www.conventionalcommits.org/en/v1.0.0/#summary',

  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w+)(\(([^)]+)\))?: \[defect id: (.+)\] (.+)$/,

      headerCorrespondence: ['type', 'scope', 'defectId', 'subject'],
    },
  },

  rules: {
    'type-enum': [
      2,
      'always',
      ['build', 'ci', 'chore', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test'],
    ],

    'type-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
  },

  prompt: {
    messages: {
      skip: ':skip',
      max: 'upper %d chars',
      min: '%d chars at least',
      emptyWarning: 'can not be empty',
      upperLimitWarning: 'over limit',
      lowerLimitWarning: 'below limit',
    },

    questions: {
      type: {
        description: 'Select the type of change that you are committing',
        enum: {
          build: {
            description: 'Changes that affect the build system or external dependencies',
            title: 'Builds',
          },
          ci: {
            description: 'Changes to CI configuration files and scripts',
            title: 'Continuous Integrations',
          },
          chore: {
            description: 'Add something without touching production code',
            title: 'Chores',
          },
          docs: {
            description: 'Documentation only changes',
            title: 'Documentation',
          },
          feat: {
            description: 'A new feature',
            title: 'Features',
          },
          fix: {
            description: 'A bug fix',
            title: 'Bug Fixes',
          },
          perf: {
            description: 'A code change that improves performance',
            title: 'Performance Improvements',
          },
          refactor: {
            description: 'Code change that neither fixes a bug nor adds a feature',
            title: 'Refactoring',
          },
          revert: {
            description: 'Reverts a previous commit',
            title: 'Reverts',
          },
          style: {
            description: 'Changes that do not affect the meaning of the code',
            title: 'Styles',
          },
          test: {
            description: 'Adding missing tests or correcting existing tests',
            title: 'Tests',
          },
        },
      },
    },
  },
};
