const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const prebidDir = path.join(__dirname, '../node_modules/prebid.js');
const prebidModulesDir = path.join(prebidDir, 'modules');
const adapterDir = path.join(__dirname, '../adapters');

const adapterFiles = fs.readdirSync(adapterDir).filter(file => fs.lstatSync(path.join(adapterDir, file)).isFile());

adapterFiles.forEach(file => {
    const srcPath = path.join(adapterDir, file);
    const destPath = path.join(prebidModulesDir, file);
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${file} to ${destPath}`);
});

console.log('Installing Prebid.js dependencies...');
execSync('npm install', { cwd: prebidDir, stdio: 'inherit' });

const modules = adapterFiles.map(file => path.basename(file, '.js')).join(',');
console.log(`Building Prebid.js with modules: ${modules}`);
execSync(`gulp build --modules=${modules}`, { cwd: prebidDir, stdio: 'inherit' });

console.log('Setup and build completed successfully!');
