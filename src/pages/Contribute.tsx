import { Callout } from '../components/Callout';

export function Contribute() {
  const toolPrompt = `I'd like to add a new developer tool to the dev-toolbox repository. Here are the details:

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
- Date: [Today's date in YYYY-MM-DD format]`;

  const tipPrompt = `I'd like to add a new developer tip to the dev-toolbox repository. Here are the details:

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
- Date: [Today's date in YYYY-MM-DD format]`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // You could add a toast notification here
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Contribute to Dev Toolbox
      </h1>

      <Callout type="info" className="mb-8">
        <h2 className="font-semibold mb-2">Help us grow the community!</h2>
        <p>
          Dev Toolbox is built by developers, for developers. Your contributions help other developers
          discover amazing tools and learn valuable tips. Every addition makes the community stronger!
        </p>
      </Callout>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            How to Contribute
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                📋 Prerequisites
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• GitHub account for creating pull requests</li>
                <li>• Basic familiarity with JSON (for tools) or Markdown (for tips)</li>
                <li>• The tool or tip should be genuinely useful to developers</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                🚀 Quick Start with Claude Code
              </h3>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  The easiest way to contribute is using Claude Code! Simply copy one of the prompts below,
                  paste it into Claude Code, fill in your details, and let Claude handle the technical setup.
                </p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Fork the repository on GitHub</li>
                  <li>Clone your fork locally</li>
                  <li>Use one of the Claude Code prompts below</li>
                  <li>Review the changes Claude makes</li>
                  <li>Create a pull request</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            🔧 Add a Developer Tool
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Claude Code Prompt for Adding a Tool
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Copy this prompt, fill in your tool details, and paste it into Claude Code:
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 relative">
              <button
                onClick={() => copyToClipboard(toolPrompt)}
                className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded"
              >
                Copy
              </button>
              <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap pr-16">
                {toolPrompt}
              </pre>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            💡 Share a Developer Tip
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Claude Code Prompt for Adding a Tip
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Copy this prompt, fill in your tip details, and paste it into Claude Code:
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 relative">
              <button
                onClick={() => copyToClipboard(tipPrompt)}
                className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded"
              >
                Copy
              </button>
              <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap pr-16">
                {tipPrompt}
              </pre>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            🔍 Manual Contribution Steps
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                For Tools
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>Create a new JSON file in <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">src/data/tools/your-tool-name.json</code></li>
                <li>Follow the schema defined in <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">schemas/tool.schema.json</code></li>
                <li>Run <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">npm run validate</code> to check your data</li>
                <li>Test locally with <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">npm run dev</code></li>
              </ol>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                For Tips
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>Create a new Markdown file in <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">src/data/tips/your-tip-name.md</code></li>
                <li>Include YAML frontmatter following <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">schemas/tip.frontmatter.schema.json</code></li>
                <li>Write your tip content in Markdown below the frontmatter</li>
                <li>Run <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">npm run validate</code> to check your data</li>
                <li>Test locally with <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">npm run dev</code></li>
              </ol>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            📝 Contribution Guidelines
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Quality Standards</h4>
                <ul className="space-y-1 ml-4">
                  <li>• Tools should be actively maintained and widely useful</li>
                  <li>• Tips should be practical and include clear examples</li>
                  <li>• All links should be working and point to official sources</li>
                  <li>• Content should be beginner-friendly when possible</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">What We're Looking For</h4>
                <ul className="space-y-1 ml-4">
                  <li>• Developer productivity tools</li>
                  <li>• Best practices and workflow improvements</li>
                  <li>• Code quality and debugging tips</li>
                  <li>• Performance optimization techniques</li>
                  <li>• Security recommendations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <Callout type="success">
            <h3 className="font-semibold mb-2">Ready to contribute?</h3>
            <p className="mb-4">
              Join our community of developers making tools and knowledge more accessible to everyone.
              Your contribution, no matter how small, makes a difference!
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/dev-toolbox/dev-toolbox"
                className="inline-flex items-center px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 font-medium transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Repository →
              </a>
              <a
                href="https://github.com/dev-toolbox/dev-toolbox/issues"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Browse Issues →
              </a>
            </div>
          </Callout>
        </section>
      </div>
    </div>
  );
}