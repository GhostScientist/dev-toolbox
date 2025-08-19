---
id: readable-commits
title: Writing Readable Git Commits
category: DevEx
tags: ["git", "commits", "best-practices", "teamwork"]
added_by:
  name: dev-toolbox
  date: "2024-01-01"
summary: Learn how to write clear, meaningful commit messages that help your team understand changes
---

# Writing Readable Git Commits

Good commit messages are essential for maintaining a clean, understandable project history. They help your team (and future you) understand what changed and why.

## The Anatomy of a Good Commit Message

```
type(scope): short description

Longer explanation of what changed and why.
Include motivation for the change and contrast
with previous behavior.
```

## Types to Use

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code changes that neither fix bugs nor add features
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

## Examples

```bash
# Good commits
feat(auth): add password reset functionality
fix(api): handle null response in user service
docs: update deployment instructions for Docker

# Bad commits
fixed stuff
update
wip
asdf
```

## Pro Tips

1. **Keep the first line under 50 characters** - it shows fully in most tools
2. **Use the imperative mood** - "Add feature" not "Added feature"
3. **Explain the why, not the what** - the diff shows what changed
4. **Reference issues when relevant** - "fixes #123" or "closes #456"

## Tools to Help

- Use `git commit --verbose` to see your changes while writing
- Set up commit message templates with `git config commit.template`
- Consider using Conventional Commits for consistency

Remember: your commit message is a love letter to your future self and your teammates. Make it count!