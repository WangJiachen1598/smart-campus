const fs = require('fs');
const path = require('path');

// 创建一个简单的有效PNG图标
function createPNG(width, height, color) {
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
  
  const compressed = zlib.deflateSync(Buffer.from(rawData));
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

// 灰色图标
const gray = [102, 102, 102];
// 蓝色图标
const blue = [26, 115, 232];
// 浅灰色（空状态）
const lightGray = [200, 200, 200];
// 橙色图标
const orange = [255, 152, 0];

// 需要生成的图标列表
const icons = [
  { name: 'edit.png', color: gray, size: [48, 48] },
  { name: 'arrow-right.png', color: gray, size: [48, 48] },
  { name: 'scan.png', color: blue, size: [64, 64] },
  { name: 'time.png', color: blue, size: [32, 32] },
  { name: 'location.png', color: blue, size: [32, 32] },
  { name: 'people.png', color: blue, size: [32, 32] },
  { name: 'checkin.png', color: orange, size: [32, 32] },
  { name: 'search.png', color: gray, size: [48, 48] },
  { name: 'clear.png', color: gray, size: [32, 32] },
  { name: 'member.png', color: blue, size: [32, 32] },
  { name: 'activity.png', color: orange, size: [32, 32] },
  { name: 'hot.png', color: orange, size: [32, 32] },
  { name: 'message.png', color: blue, size: [32, 32] },
  { name: 'dashboard.png', color: blue, size: [48, 48] },
  { name: 'admin-club.png', color: blue, size: [48, 48] },
  { name: 'admin-activity.png', color: orange, size: [48, 48] },
  { name: 'admin-member.png', color: blue, size: [48, 48] },
];

// 需要生成的图片列表
const images = [
  { name: 'empty.png', color: lightGray, size: [200, 200] },
  { name: 'empty-message.png', color: lightGray, size: [200, 200] },
  { name: 'empty-feedback.png', color: lightGray, size: [200, 200] },
  { name: 'logo.png', color: blue, size: [120, 120] },
  { name: 'default-avatar.png', color: blue, size: [100, 100] },
];

// 生成图标
console.log('生成 icons 目录下的图标...');
icons.forEach(item => {
  const png = createPNG(item.size[0], item.size[1], item.color);
  const filepath = path.join(iconsDir, item.name);
  fs.writeFileSync(filepath, png);
  console.log(`✓ ${item.name}`);
});

// 生成图片
console.log('\n生成 images 目录下的图片...');
images.forEach(item => {
  const png = createPNG(item.size[0], item.size[1], item.color);
  const filepath = path.join(imagesDir, item.name);
  fs.writeFileSync(filepath, png);
  console.log(`✓ ${item.name}`);
});

console.log('\n✅ 所有图片已生成！');
