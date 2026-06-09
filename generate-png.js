const fs = require('fs');
const path = require('path');

// 创建一个简单的有效PNG图标 (81x81)
function createValidPNG(color) {
  const [r, g, b] = color;
  const width = 81;
  const height = 81;
  
  // PNG文件头
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  
  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8);   // bit depth
  ihdrData.writeUInt8(2, 9);   // color type (RGB)
  ihdrData.writeUInt8(0, 10);  // compression
  ihdrData.writeUInt8(0, 11);  // filter
  ihdrData.writeUInt8(0, 12);  // interlace
  
  const ihdrChunk = createChunk('IHDR', ihdrData);
  
  // IDAT chunk - 创建一个简单的渐变圆形图标
  const zlib = require('zlib');
  const rawData = [];
  
  for (let y = 0; y < height; y++) {
    rawData.push(0); // filter byte
    for (let x = 0; x < width; x++) {
      // 计算到中心的距离
      const cx = width / 2;
      const cy = height / 2;
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      const maxDist = 35; // 圆的半径
      
      if (dist < maxDist) {
        // 在圆内，使用指定颜色
        rawData.push(r, g, b);
      } else {
        // 在圆外，使用白色背景
        rawData.push(255, 255, 255);
      }
    }
  }
  
  const compressed = zlib.deflateSync(Buffer.from(rawData));
  const idatChunk = createChunk('IDAT', compressed);
  
  // IEND chunk
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
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// 灰色图标 (未选中状态)
const gray = [102, 102, 102];
// 蓝色图标 (选中状态)
const blue = [26, 115, 232];

// 生成所有图标
const icons = [
  { name: 'home', color: gray },
  { name: 'home-active', color: blue },
  { name: 'clubs', color: gray },
  { name: 'clubs-active', color: blue },
  { name: 'grades', color: gray },
  { name: 'grades-active', color: blue },
  { name: 'messages', color: gray },
  { name: 'messages-active', color: blue },
  { name: 'profile', color: gray },
  { name: 'profile-active', color: blue },
];

icons.forEach(icon => {
  const png = createValidPNG(icon.color);
  const filepath = path.join(iconsDir, `${icon.name}.png`);
  fs.writeFileSync(filepath, png);
  console.log(`✓ ${icon.name}.png (${png.length} bytes)`);
});

console.log('\n✅ 所有图标已重新生成！');
console.log('格式：RGB PNG 81x81');
console.log('现在在微信开发者工具中点击「编译」即可看到图标');
