const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('/Users/phanthumay/Desktop/mayyoga.health/js/poses-data.js', 'utf8');

// Extract all img paths using regex
const imgRegex = /img:\s*'([^']+)'/g;
const poses = [];
let match;
while ((match = imgRegex.exec(content)) !== null) {
  poses.push(match[1]);
}

console.log(`Found ${poses.length} pose images defined in poses-data.js`);

let missingCount = 0;
poses.forEach(imgPath => {
  const fullPath = path.join('/Users/phanthumay/Desktop/mayyoga.health', imgPath);
  if (!fs.existsSync(fullPath)) {
    console.log(`❌ Missing image file: ${imgPath}`);
    missingCount++;
  }
});

if (missingCount === 0) {
  console.log("✅ All image files exist!");
}

