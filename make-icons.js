const fs = require('fs');
const path = require('path');

// 创建简单的圆形图标 PNG（81x81）
function createIcon(r, g, b) {
  const width = 81;
  const height = 81;
  
  // PNG 文件头
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  
  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8);
  ihdr.writeUInt8(6, 9);
  ihdr.writeUInt8(0, 10);
  ihdr.writeUInt8(0, 11);
  ihdr.writeUInt8(0, 12);
  
  const ihdrChunk = createChunk('IHDR', ihdr);
  
  // IDAT chunk - 简单的渐变圆
  const zlib = require('zlib');
  const raw = [];
  for (let y = 0; y < height; y++) {
    raw.push(0); // filter
    for (let x = 0; x < width; x++) {
      const cx = width / 2;
      const cy = height / 2;
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      const maxDist = Math.min(width, height) / 2 - 2;
      
      if (dist < maxDist) {
        const alpha = Math.floor(255 * (1 - dist / maxDist));
        raw.push(r, g, b, alpha);
      } else {
        raw.push(255, 255, 255, 0);
      }
    }
  }
  
  const compressed = zlib.deflateSync(Buffer.from(raw));
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

// 生成图标
const icons = [
  { name: 'home', color: [102, 102, 102] },
  { name: 'home-active', color: [26, 115, 232] },
  { name: 'clubs', color: [102, 102, 102] },
  { name: 'clubs-active', color: [26, 115, 232] },
  { name: 'grades', color: [102, 102, 102] },
  { name: 'grades-active', color: [26, 115, 232] },
  { name: 'messages', color: [102, 102, 102] },
  { name: 'messages-active', color: [26, 115, 232] },
  { name: 'profile', color: [102, 102, 102] },
  { name: 'profile-active', color: [26, 115, 232] },
];

icons.forEach(icon => {
  const png = createIcon(...icon.color);
  const filepath = path.join(iconsDir, `${icon.name}.png`);
  fs.writeFileSync(filepath, png);
  console.log(`✓ ${icon.name}.png`);
});

console.log('\n✅ 所有图标已生成！');
console.log('目录：', iconsDir);
