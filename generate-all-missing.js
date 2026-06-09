const fs = require('fs');
const path = require('path');

// 创建简单的彩色图标
function createSimpleIcon(size, color) {
  const [r, g, b] = color;
  
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(size, 0);
  ihdrData.writeUInt32BE(size, 4);
  ihdrData.writeUInt8(8, 8);
  ihdrData.writeUInt8(2, 9);
  ihdrData.writeUInt8(0, 10);
  ihdrData.writeUInt8(0, 11);
  ihdrData.writeUInt8(0, 12);
  
  const ihdrChunk = createChunk('IHDR', ihdrData);
  
  const zlib = require('zlib');
  const rawData = [];
  
  for (let y = 0; y < size; y++) {
    rawData.push(0);
    for (let x = 0; x < size; x++) {
      const cx = size / 2;
      const cy = size / 2;
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      
      if (dist < size * 0.4) {
        rawData.push(r, g, b);
      } else {
        rawData.push(255, 255, 255);
      }
    }
  }
  
  const compressed = zlib.deflateSync(Buffer.from(rawData), { level: 9 });
  const idatChunk = createChunk('IDAT', compressed);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));
  
  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createSimpleBanner(width, height, color) {
  const [r, g, b] = color;
  
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8);
  ihdrData.writeUInt8(2, 9);
  ihdrData.writeUInt8(0, 10);
  ihdrData.writeUInt8(0, 11);
  ihdrData.writeUInt8(0, 12);
  
  const ihdrChunk = createChunk('IHDR', ihdrData);
  
  const zlib = require('zlib');
  const rawData = [];
  
  for (let y = 0; y < height; y++) {
    rawData.push(0);
    for (let x = 0; x < width; x++) {
      rawData.push(r, g, b);
    }
  }
  
  const compressed = zlib.deflateSync(Buffer.from(rawData), { level: 9 });
  const idatChunk = createChunk('IDAT', compressed);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));
  
  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  
  const typeBuffer = Buffer.from(type);
  const crcData = Buffer.concat([typeBuffer, data]);
  
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(crcData), 0);
  
  return Buffer.concat([length, typeBuffer, data, crc]);
}

function crc32(buffer) {
  let crc = 0xFFFFFFFF;
  const table = [];
  
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[n] = c;
  }
  
  for (let i = 0; i < buffer.length; i++) {
    crc = table[(crc ^ buffer[i]) & 0xFF] ^ (crc >>> 8);
  }
  
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

// 创建目录
const iconsDir = path.join(__dirname, 'assets', 'icons');
const imagesDir = path.join(__dirname, 'assets', 'images');

if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true });
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

// 颜色定义
const blue = [26, 115, 232];
const green = [76, 175, 80];
const orange = [255, 152, 0];
const purple = [156, 39, 176];
const gray = [102, 102, 102];
const red = [244, 67, 54];

console.log('🔧 生成所有缺失的图片...\n');

// 社团封面
console.log('📸 生成社团封面...');
['club5.jpg', 'club6.jpg'].forEach(name => {
  const png = createSimpleBanner(300, 200, purple);
  fs.writeFileSync(path.join(imagesDir, name), png);
  console.log('✓', name);
});

// Logo图片
console.log('\n🎨 生成Logo图片...');
['school-logo.png', 'club-logo.png'].forEach(name => {
  const png = createSimpleIcon(120, blue);
  fs.writeFileSync(path.join(imagesDir, name), png);
  console.log('✓', name);
});

// 功能图标
console.log('\n🎯 生成功能图标...');
const icons = [
  { name: 'feedback.png', size: 64, color: blue },
  { name: 'my-clubs.png', size: 64, color: green },
  { name: 'my-activities.png', size: 64, color: orange },
  { name: 'settings.png', size: 64, color: gray },
  { name: 'about.png', size: 64, color: purple },
];

icons.forEach(item => {
  const png = createSimpleIcon(item.size, item.color);
  fs.writeFileSync(path.join(iconsDir, item.name), png);
  console.log('✓', item.name);
});

console.log('\n✅ 所有缺失的图片已生成！');
console.log('\n请在微信开发者工具中：');
console.log('1. 点击「编译」');
console.log('2. 如果还有问题，点击「工具」→「清除缓存」→「清除全部」');
console.log('3. 重新编译');
