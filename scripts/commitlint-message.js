console.log(`
❌ Invalid commit message

Required format:
type(scope?): [defect id: N/A | BUG-123] subject

Rules:
- max length: 100 characters
- type must be lowercase
- scope is optional

Available types:
- build     Changes affecting build system/dependencies
- ci        CI configuration/scripts
- chore     Maintenance tasks
- docs      Documentation only
- feat      New feature
- fix       Bug fix
- perf      Performance improvements
- refactor  Code refactoring
- revert    Revert previous commit
- style     Formatting/whitespace/semicolon
- test      Add or fix tests

Valid examples:
feat(auth): [defect id: N/A] add google login
fix(api): [defect id: BUG-123] handle null response
docs: [defect id: TASK-1] update README
`);
