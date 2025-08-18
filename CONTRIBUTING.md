# Contributing to Dev Toolbox

Thank you for your interest in contributing to Dev Toolbox! This guide will help you get started with adding tools, sharing tips, or improving the site.

## Table of Contents

- [Getting Started](#getting-started)
- [Ways to Contribute](#ways-to-contribute)
- [Add a Tool](#add-a-tool)
- [Share a Tip](#share-a-tip)
- [Development Setup](#development-setup)
- [Data Validation](#data-validation)
- [Style Guidelines](#style-guidelines)
- [Review Process](#review-process)

## Getting Started

Dev Toolbox is built to be contributor-friendly. Whether you're a first-time contributor or an experienced developer, we have options for everyone:

1. **Easiest**: Use our Claude Code prompts (see below)
2. **Simple**: Create GitHub issues with our templates
3. **Advanced**: Submit pull requests directly

## Ways to Contribute

### 🔧 Add a Tool
Share developer tools that you find useful with the community.

### 💡 Share a Tip
Contribute practical advice, best practices, or code examples.

### 🚀 Improve the Site
Help make Dev Toolbox better with bug fixes, features, or enhancements.

### 📖 Improve Documentation
Help make our guides clearer and more comprehensive.

## Add a Tool

### Claude Code Prompt (Easiest!)

Copy this prompt, fill in your tool details, and paste it into Claude Code:

```
I'd like to add a new developer tool to the dev-toolbox repository. Here are the details:

Tool Name: [Your tool name]
Website: [Tool's official website]
Category: [Choose from: AI, Backend, Build, CLI, Cloud, Collab, Data, DevEx, Frontend, Infra, Mobile, Observability, Performance, Security, Testing, UX]
Tags: [Comma-separated list of relevant tags]
Summary: [Brief description of what the tool does - max 200 characters]
Why it's useful: [Explain what problem it solves]
Pricing: [Choose from: Free, Freemium, Paid, Open Source]
Getting Started: [Quick instructions for new users]
GitHub (optional): [GitHub repository URL]
Documentation (optional): [Documentation URL]

Please help me:
1. Create a new JSON file in src/data/tools/ following the schema
2. Validate the data matches the required format
3. Run the validation scripts to ensure everything is correct

My contributor info:
- Name: [Your name or username]
- Date: [Today's date in YYYY-MM-DD format]
```

### Manual Process

1. **Create the tool file**: Add `src/data/tools/your-tool-id.json`
2. **Follow the schema**: Use `schemas/tool.schema.json` as reference
3. **Required fields**: id, name, website, category, tags, summary, why, pricing, getting_started, added_by
4. **Validate**: Run `npm run validate`
5. **Test**: Run `npm run dev` to see your tool

#### Example Tool JSON

```json
{
  "id": "astro",
  "name": "Astro",
  "website": "https://astro.build",
  "category": "Frontend",
  "tags": ["static-site-generator", "javascript", "typescript", "performance"],
  "summary": "Modern static site generator with component islands architecture for optimal performance",
  "why": "Astro delivers the fastest websites by shipping zero JavaScript by default and only hydrating components when needed.",
  "pricing": "Open Source",
  "getting_started": "Run `npm create astro@latest` to create a new project. Choose from templates or start blank.",
  "added_by": {
    "name": "your-username",
    "date": "2024-01-01"
  },
  "github": "https://github.com/withastro/astro",
  "docs": "https://docs.astro.build"
}
```

## Share a Tip

### Claude Code Prompt (Easiest!)

Copy this prompt, fill in your tip details, and paste it into Claude Code:

```
I'd like to add a new developer tip to the dev-toolbox repository. Here are the details:

Tip Title: [Your tip title]
Category: [Choose from: AI, Backend, Build, CLI, Cloud, Collab, Data, DevEx, Frontend, Infra, Mobile, Observability, Performance, Security, Testing, UX]
Tags: [Comma-separated list of relevant tags]
Summary (optional): [Brief summary - max 200 characters]

Tip Content:
[Write your tip in Markdown format here. Include code examples, explanations, and any relevant links or resources.]

Please help me:
1. Create a new Markdown file in src/data/tips/ with proper frontmatter
2. Validate the frontmatter matches the required schema
3. Run the validation scripts to ensure everything is correct

My contributor info:
- Name: [Your name or username]
- Date: [Today's date in YYYY-MM-DD format]
```

### Manual Process

1. **Create the tip file**: Add `src/data/tips/your-tip-id.md`
2. **Add frontmatter**: Follow `schemas/tip.frontmatter.schema.json`
3. **Write content**: Use Markdown with clear examples
4. **Validate**: Run `npm run validate`
5. **Test**: Run `npm run dev` to see your tip

#### Example Tip Structure

```markdown
---
id: readable-commits
title: Writing Readable Git Commits
category: DevEx
tags: ["git", "commits", "best-practices", "teamwork"]
added_by:
  name: your-username
  date: 2024-01-01
summary: Learn how to write clear, meaningful commit messages
---

# Writing Readable Git Commits

Your tip content goes here in Markdown format...

## Examples

\`\`\`bash
# Good commit
feat(auth): add password reset functionality

# Bad commit
fixed stuff
\`\`\`

More content...
```

## Development Setup

```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/dev-toolbox.git
cd dev-toolbox

# Install dependencies
npm install

# Start development server
npm run dev

# Run validation
npm run validate

# Check links
npm run check:links

# Build project
npm run build
```

## Data Validation

We use automated validation to ensure data quality:

### Schema Validation
- Tools must match `schemas/tool.schema.json`
- Tips must match `schemas/tip.frontmatter.schema.json`
- Categories must be from the approved list

### Automated Checks
- **Duplicate IDs**: No two items can have the same ID
- **Filename matching**: File names must match the ID field
- **Link validation**: External links are checked for availability
- **Required fields**: All mandatory fields must be present

### Running Validation

```bash
# Validate all data
npm run validate

# Check external links
npm run check:links

# Run complete pre-commit checks
npm run precommit
```

## Style Guidelines

### JSON Files (Tools)
- Use consistent formatting (2-space indentation)
- Keep summaries under 200 characters
- Use descriptive tags
- Include working links only

### Markdown Files (Tips)
- Use clear headings and structure
- Include practical code examples
- Test all code snippets
- Keep explanations beginner-friendly

### General Guidelines
- Write for beginners when possible
- Include real-world examples
- Keep content focused and actionable
- Use inclusive language

## Review Process

1. **Automated Checks**: CI runs validation, link checking, and builds
2. **Manual Review**: Maintainers review for quality and relevance
3. **Feedback**: We may suggest improvements or ask questions
4. **Approval**: Once approved, your contribution will be merged
5. **Deployment**: Changes are automatically deployed to the live site

### What We Look For

✅ **Good Contributions**
- Tools that solve real problems
- Tips with practical examples
- Clear, well-tested content
- Proper formatting and validation

❌ **Avoid These**
- Duplicate content
- Outdated or broken tools
- Promotional content without value
- Incomplete or unclear information

## Questions or Help?

- 📖 [Read the README](./README.md)
- 🐛 [Report issues](https://github.com/dev-toolbox/dev-toolbox/issues)
- 💬 [Ask questions in discussions](https://github.com/dev-toolbox/dev-toolbox/discussions)
- 🤝 [Review our code of conduct](./CODE_OF_CONDUCT.md)

## Recognition

All contributors are recognized in our community. Your GitHub profile will be linked, and we appreciate every contribution, no matter how small!

---

Thank you for helping make Dev Toolbox better for everyone! 🚀