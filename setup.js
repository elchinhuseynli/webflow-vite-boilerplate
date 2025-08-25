import readline from 'readline';
import fs from 'fs';
import path from 'path';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const packageJsonPath = path.resolve('package.json');

const askQuestion = (query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

async function setup() {
  console.log('--- Webflow Vite Boilerplate Setup ---');

  const projectName = await askQuestion('Enter your project name (e.g., My Awesome Site): ');
  const projectSlug = await askQuestion('Enter your project slug (e.g., my-awesome-site): ');

  rl.close();

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

    console.log('\n✅ Setup complete! Your project is configured.');
    console.log(`\nYour project name: ${projectName}`);
    console.log(`Your production URL: ${prodUrl}`);

    console.log('\n--- How to connect to Webflow ---');
    console.log('\n➡️  For Development (run "npm run dev"):');
    console.log('Add this to your site\'s Custom Code (before <\/body>):');
    console.log('\x1b[32m%s\x1b[0m', '<script type="module" src="http://localhost:5174/src/loader.js" defer></script>');


    console.log('\n➡️  For Production (after "npm run build" and deploy):');
    console.log('Add this to your site\'s Custom Code (before <\/body>):');
    console.log('\x1b[32m%s\x1b[0m', `<script type="module" src="${prodUrl}/assets/loader.js" defer></script>`);
    console.log('\x1b[32m%s\x1b[0m', `<link rel="stylesheet" href="${prodUrl}/assets/loader.css" type="text/css">`);


  } catch (error) {
    console.error('\n❌ Error during setup:', error);
  }
}

setup();
