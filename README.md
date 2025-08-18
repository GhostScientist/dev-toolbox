# Dev Toolbox 🚀

**Welcome! Start your adventure here 🚀**

A crowd-curated directory of developer tools and tips, built by the community for the community. You may have come from the blog post [Shipping your first feature with Claude Code](https://www.anthropic.com/news/claude-code)… if so, yay! If not, you may want to check it out alongside this repo.

## What is Dev Toolbox?

Dev Toolbox is a beginner-friendly, zero-ops static site where developers can discover and share:
- **Tools**: Curated list of developer tools with detailed information
- **Tips**: Practical advice, best practices, and code examples
- **Knowledge**: Community-driven content that helps developers grow

## ✨ Features

- 🔍 **Smart Search**: Find tools and tips using fuzzy search
- 🏷️ **Tag & Category Filtering**: Browse by technology or use case
- 🌙 **Dark Mode**: Easy on the eyes during late coding sessions
- 📱 **Mobile Friendly**: Works great on all devices
- 🚀 **Fast Loading**: Built with Vite for optimal performance
- ♿ **Accessible**: Designed with accessibility in mind

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/dev-toolbox/dev-toolbox.git
cd dev-toolbox

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

## 📁 Project Structure

```
dev-toolbox/
├── src/
│   ├── components/          # React components
│   ├── data/
│   │   ├── tools/          # Tool JSON files
│   │   ├── tips/           # Tip Markdown files
│   │   └── categories.json # Available categories
│   ├── lib/                # Utilities and schemas
│   ├── pages/              # Route components
│   └── ...
├── schemas/                # JSON schemas for validation
├── scripts/                # Build and validation scripts
└── .github/                # GitHub workflows and templates
```

## 🤝 Contributing

We love contributions! There are several ways to help:

### 🔧 Add a Tool
Share a developer tool that you find useful:
1. Use our [Claude Code prompt](./CONTRIBUTING.md#add-a-tool) (easiest!)
2. Create an issue with the [Add Tool template](https://github.com/dev-toolbox/dev-toolbox/issues/new?template=add-tool.yml)
3. Submit a PR with a new JSON file in `src/data/tools/`

### 💡 Share a Tip
Contribute knowledge with practical tips:
1. Use our [Claude Code prompt](./CONTRIBUTING.md#share-a-tip) (easiest!)
2. Create an issue with the [Add Tip template](https://github.com/dev-toolbox/dev-toolbox/issues/new?template=add-tip.yml)
3. Submit a PR with a new Markdown file in `src/data/tips/`

### 🚀 Improve the Site
Help make Dev Toolbox better:
1. Create an issue with the [Improve Site template](https://github.com/dev-toolbox/dev-toolbox/issues/new?template=improve-site.yml)
2. Submit a PR with bug fixes or enhancements
3. Improve documentation or add tests

See our [Contributing Guide](./CONTRIBUTING.md) for detailed instructions.

## 🧪 Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm run test

# Lint code
npm run lint

# Format code
npm run format

# Validate data
npm run validate

# Check external links
npm run check:links

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📊 Data Validation

The project includes robust validation to ensure data quality:

- **Schema Validation**: All tools and tips must match their JSON schemas
- **Link Checking**: External links are verified during CI
- **Duplicate Detection**: Prevents duplicate IDs and content
- **Format Validation**: Ensures consistent data structure

Run `npm run validate` to check your data locally.

## 🚀 Deployment

Dev Toolbox is designed for easy deployment to static hosting platforms:

### Vercel (Recommended)
1. Fork this repository
2. Connect your fork to [Vercel](https://vercel.com)
3. Deploy with default settings
4. Enable PR previews for contributions

### Netlify
1. Fork this repository
2. Connect your fork to [Netlify](https://netlify.com)
3. Set build command to `npm run build`
4. Set publish directory to `dist`
5. Enable PR previews for contributions

### Other Platforms
The built site in the `dist/` folder can be deployed to any static hosting service.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Community

- 🐛 [Report bugs](https://github.com/dev-toolbox/dev-toolbox/issues)
- 💡 [Request features](https://github.com/dev-toolbox/dev-toolbox/issues)
- 📖 [Read contributing guide](./CONTRIBUTING.md)
- 🤝 [Code of conduct](./CODE_OF_CONDUCT.md)

---

**Made with ❤️ by the developer community**

Open source and always free. Help us build the best directory of developer tools and tips!
