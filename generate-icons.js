// 这是一个生成TabBar图标的脚本
// 由于微信小程序不支持网络图片，需要本地图标

// 创建一个简单的 81x81 PNG 图标（蓝色圆形图标）
// 使用纯 JavaScript 生成 PNG 格式

const fs = require('fs');
const path = require('path');

// 创建一个简单的单色 PNG 图标
function createSimplePNG(width, height, r, g, b) {
  // PNG 文件头
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);  // Width
  ihdrData.writeUInt32BE(height, 4); // Height
  ihdrData.writeUInt8(8, 8);   // Bit depth
  ihdrData.writeUInt8(6, 9);   // Color type (RGBA)
  ihdrData.writeUInt8(0, 10); // Compression method
  ihdrData.writeUInt8(0, 11); // Filter method
  ihdrData.writeUInt8(0, 12); // Interlace method

  const ihdrChunk = createChunk('IHDR', ihdrData);

  // IDAT chunk (image data)
  const rawData = [];
  for (let y = 0; y < height; y++) {
    rawData.push(0); // Filter byte
    for (let x = 0; x < width; x++) {
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) / 2 - 5;
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);

      if (dist < radius) {
        rawData.push(r, g, b, 255); // Inside circle
      } else {
        rawData.push(255, 255, 255, 0); // Outside (transparent)
      }
    }
  }

  const zlib = require('zlib');
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

// 创建图标
const iconsDir = path.join(__dirname, 'assets', 'icons');

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// 创建不同颜色的图标
const icons = [
  { name: 'home', r: 102, g: 102, b: 102 },         // 灰色
  { name: 'home-active', r: 26, g: 115, b: 232 },   // 蓝色
  { name: 'clubs', r: 102, g: 102, b: 102 },
  { name: 'clubs-active', r: 26, g: 115, b: 232 },
  { name: 'grades', r: 102, g: 102, b: 102 },
  { name: 'grades-active', r: 26, g: 115, b: 232 },
  { name: 'messages', r: 102, g: 102, b: 102 },
  { name: 'messages-active', r: 26, g: 115, b: 232 },
  { name: 'profile', r: 102, g: 102, b: 102 },
  { name: 'profile-active', r: 26, g: 115, b: 232 },
];

icons.forEach(icon => {
  const png = createSimplePNG(81, 81, icon.r, icon.g, icon.b);
  const filename = `${icon.name}.png`;
  fs.writeFileSync(path.join(iconsDir, filename), png);
  console.log(`✓ Created ${filename}`);
});

console.log('\n✅ All icons created successfully!');
console.log('Now run: node app.json or refresh your WeChat DevTools');
