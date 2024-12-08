const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const envFile = path.join(rootDir, '.env.local');
const envTemplateFile = path.join(rootDir, '.env.local.template');
const wranglerFile = path.join(rootDir, 'wrangler.toml');
const wranglerTemplateFile = path.join(rootDir, 'wrangler.template.toml');

// Setup environment if needed
if (!fs.existsSync(envFile)) {
    try {
        fs.copyFileSync(envTemplateFile, envFile);
        console.log('.env.local created successfully from template.');
        console.log('Please edit .env.local with your KV namespace IDs before proceeding.');
        process.exit(0);
    } catch (error) {
        console.error('Error creating .env.local:', error.message);
        process.exit(1);
    }
}

// Setup wrangler.toml if needed
if (!fs.existsSync(wranglerFile)) {
    require('dotenv').config({ path: '.env.local' });

    // Check for required environment variables
    if (!process.env.KV_NAMESPACE_ID || !process.env.KV_NAMESPACE_PREVIEW_ID) {
        console.error('Error: Missing required environment variables.');
        console.error('Please check your .env.local file has valid KV namespace IDs.');
        process.exit(1);
    }

    try {
        let content = fs.readFileSync(wranglerTemplateFile, 'utf8');

        // Replace placeholders
        content = content.replace('${KV_NAMESPACE_ID}', process.env.KV_NAMESPACE_ID);
        content = content.replace('${KV_NAMESPACE_PREVIEW_ID}', process.env.KV_NAMESPACE_PREVIEW_ID);

        // Write the final wrangler.toml
        fs.writeFileSync(wranglerFile, content);
        console.log('wrangler.toml has been generated successfully!');
    } catch (error) {
        console.error('Error generating wrangler.toml:', error.message);
        process.exit(1);
    }
} else {
    console.log('All configuration files exist. No action needed.');
}
