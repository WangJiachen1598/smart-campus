// 解码 base64 图标数据并生成 PNG 文件
const fs = require('fs');
const path = require('path');

const iconsData = require('./base64-icons.json');
const iconsDir = path.join(__dirname, 'assets', 'icons');

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

Object.entries(iconsData).forEach(([filename, base64Data]) => {
  const filepath = path.join(iconsDir, filename);
  const buffer = Buffer.from(base64Data, 'base64');
  fs.writeFileSync(filepath, buffer);
  console.log(`✓ Created ${filename}`);
});

console.log('\n✅ All TabBar icons generated successfully!');
console.log('Now refresh your WeChat DevTools to see the icons.');
