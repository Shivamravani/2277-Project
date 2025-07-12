# Running SkillSwap Platform in VS Code

## Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **VS Code** with recommended extensions

## Setup Instructions

### 1. Clone and Install

\`\`\`bash
git clone <your-repo-url>
cd skillswap-platform
npm install
\`\`\`

### 2. VS Code Extensions (Recommended)

Install these extensions for the best development experience:

- **ES7+ React/Redux/React-Native snippets**
- **TypeScript Importer**
- **Tailwind CSS IntelliSense**
- **Auto Rename Tag**
- **Prettier - Code formatter**
- **ESLint**

### 3. Development Commands

\`\`\`bash
# Start development server (both frontend and backend)
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Type checking
npm run typecheck

# Format code
npm run format.fix
\`\`\`

### 4. VS Code Settings

Create `.vscode/settings.json`:

\`\`\`json
{
  "typescript.preferences.includePackageJsonAutoImports": "auto",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "tailwindCSS.includeLanguages": {
    "typescript": "typescript",
    "typescriptreact": "typescriptreact"
  }
}
\`\`\`

### 5. Folder Structure

\`\`\`
client/           # React frontend
├── components/   # UI components
├── pages/        # Route pages
├── lib/          # Utilities
└── global.css    # Styles

server/           # Express backend
├── routes/       # API routes
└── index.ts      # Server entry

shared/           # Shared types
\`\`\`

### 6. Development Workflow

1. Open project in VS Code: `code .`
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Open browser to `http://localhost:8080`
5. Make changes and see live updates!

### 7. Debugging

- Use VS Code's built-in terminal: `Ctrl/Cmd + `
- Check browser console for frontend issues
- Check terminal output for backend issues
- Use React DevTools browser extension

## Troubleshooting

- **Port conflicts**: Check if port 8080 is available
- **Module errors**: Try `rm -rf node_modules && npm install`
- **TypeScript errors**: Run `npm run typecheck`
