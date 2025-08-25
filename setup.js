import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);

if (args.length < 2) {
  console.error('\n❌ Error: Missing arguments.');
  console.error('Usage: npm run setup -- "Your Project Name" "your-project-slug"');
  console.error('Example: npm run setup -- "My Awesome Site" "my-awesome-site"');
  process.exit(1);
}

const [projectName, projectSlug] = args;
const packageJsonPath = path.resolve('package.json');

console.log(`--- Setting up project: ${projectName} ---`);

const prodUrl = `https://${projectSlug}.codes.flexagency.cz`;

try {
  const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf-8');
  const packageJson = JSON.parse(packageJsonContent);

  packageJson.name = projectSlug;
  packageJson.projectConfig = {
    name: projectName,
    prodUrl: prodUrl,
  };

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  const devScript = '<script type="module" src="http://localhost:5174/src/loader.js" defer></script>';
  const prodScript = `<script type="module" src="${prodUrl}/assets/loader.js" defer></script>`;
  const prodLink = `<link rel="stylesheet" href="${prodUrl}/assets/loader.css" type="text/css">`;

  const fileContent = `
# Webflow Embed Codes for: ${projectName}

## 🟢 Development Mode

Use these codes when running 
npm run dev
.

### Footer Code (before </body>)

${devScript}

---

## 🚀 Production Mode

Use these codes after deploying the 
dist
 folder.

### Head Code

${prodLink}

### Footer Code (before </body>)

${prodScript}

`;

  fs.writeFileSync('webflow_embed_codes.md', fileContent.trim());

  console.log('\n✅ Setup complete! Your project is configured.');
  console.log('✅ Embed codes have been saved to \x1b[36mwebflow_embed_codes.md\x1b[0m');

} catch (error) {
  console.error('\n❌ Error during setup:', error);
}
