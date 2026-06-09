const fs = require('fs');
const path = require('path');

// 创建小尺寸的精美PNG图标（优化性能）
function createOptimizedIcon(width, height, type, isActive) {
  const gray = [102, 102, 102];
  const blue = [26, 115, 232];
  const blueLight = [66, 165, 245];
  const color = isActive ? blue : gray;
  const colorLight = isActive ? blueLight : [150, 150, 150];
  
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
      const cx = width / 2;
      const cy = height / 2;
      
      let pixelColor = [255, 255, 255];
      let isIcon = false;
      
      switch(type) {
        case 'home':
          const hY = y / height;
          const hX = x / width;
          
          if (hY >= 0.45 && hY <= 0.85 && hX >= 0.22 && hX <= 0.78) {
            pixelColor = color;
            isIcon = true;
          } else if (hY >= 0.2 && hY <= 0.5 && hY >= 0.55 - Math.abs(hX - 0.5) * 1.5) {
            pixelColor = color;
            isIcon = true;
          }
          if (hY >= 0.55 && hY <= 0.85 && hX >= 0.4 && hX <= 0.6) {
            pixelColor = [255, 255, 255];
          }
          break;
          
        case 'club':
          for (let i = -1; i <= 1; i++) {
            const personX = cx + i * width * 0.22;
            const d = Math.sqrt((x - personX) ** 2 + (y - cy) ** 2);
            if (d < width * 0.18) {
              pixelColor = color;
              isIcon = true;
            }
          }
          break;
          
        case 'grades':
          const barPositions = [0.25, 0.5, 0.75];
          const barHeights = [0.4, 0.6, 0.9];
          
          for (let i = 0; i < 3; i++) {
            const barX = width * barPositions[i];
            const barH = height * barHeights[i];
            if (x >= barX && x <= barX + width * 0.15 &&
                y >= height - barH && y <= height * 0.88) {
              pixelColor = color;
              isIcon = true;
            }
          }
          if (y >= height * 0.88 && y <= height * 0.92 && x >= width * 0.1 && x <= width * 0.9) {
            pixelColor = gray;
          }
          break;
          
        case 'message':
          const mX = x / width;
          const mY = y / height;
          
          if (mY >= 0.2 && mY <= 0.8 && mX >= 0.1 && mX <= 0.9) {
            pixelColor = color;
            isIcon = true;
          }
          if (mY >= 0.2 && mY <= 0.5 && Math.abs(mY - 0.5 - (mX - 0.5) * 0.6) < 0.08) {
            pixelColor = [255, 255, 255];
          }
          break;
          
        case 'profile':
          const dHead = Math.sqrt((x - cx) ** 2 + (y - cy * 0.6) ** 2);
          if (dHead < width * 0.3) {
            pixelColor = color;
            isIcon = true;
          }
          if (y >= height * 0.55 && y <= height * 0.9 && x >= width * 0.18 && x <= width * 0.82) {
            pixelColor = color;
            isIcon = true;
          }
          break;
          
        default:
          const defD = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
          if (defD < width * 0.4) {
            pixelColor = color;
            isIcon = true;
          }
      }
      
      if (!isIcon) {
        pixelColor = [255, 255, 255];
      }
      
      rawData.push(pixelColor[0], pixelColor[1], pixelColor[2]);
    }
  }
  
  const compressed = zlib.deflateSync(Buffer.from(rawData), { level: 9 });
  const idatChunk = createChunk('IDAT', compressed);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));
  
  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// 创建小尺寸的横幅图片
function createOptimizedBanner(width, height, colors) {
  const [r1, g1, b1] = colors[0];
  const [r2, g2, b2] = colors[1];
  
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
      const gradient = y / height;
      const r = Math.round(r1 * (1 - gradient) + r2 * gradient);
      const g = Math.round(g1 * (1 - gradient) + g2 * gradient);
      const b = Math.round(b1 * (1 - gradient) + b2 * gradient);
      
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
const imagesDir = path.join(__dirname, 'assets', 'images');
const iconsDir = path.join(__dirname, 'assets', 'icons');

if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });
if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true });

console.log('生成优化的小尺寸图片...\n');

// Banner 图片（小尺寸优化）
console.log('生成 Banner 图片（375x150）...');
const banners = [
  { name: 'banner1.jpg', colors: [[26, 115, 232], [66, 165, 245]] },
  { name: 'banner2.jpg', colors: [[76, 175, 80], [139, 195, 74]] },
  { name: 'banner3.jpg', colors: [[255, 152, 0], [255, 193, 7]] },
];

banners.forEach(item => {
  const png = createOptimizedBanner(375, 150, item.colors);
  const filepath = path.join(imagesDir, item.name);
  fs.writeFileSync(filepath, png);
  console.log(`✓ ${item.name} (${png.length} bytes)`);
});

// TabBar 图标（81x81 优化）
console.log('\n生成 TabBar 图标（81x81）...');
const tabIcons = [
  { name: 'home', icon: 'home' },
  { name: 'clubs', icon: 'club' },
  { name: 'grades', icon: 'grades' },
  { name: 'messages', icon: 'message' },
  { name: 'profile', icon: 'profile' },
];

tabIcons.forEach(item => {
  const pngGray = createOptimizedIcon(81, 81, item.icon, false);
  fs.writeFileSync(path.join(iconsDir, `${item.name}.png`), pngGray);
  
  const pngBlue = createOptimizedIcon(81, 81, item.icon, true);
  fs.writeFileSync(path.join(iconsDir, `${item.name}-active.png`), pngBlue);
  
  console.log(`✓ ${item.name}.png / ${item.name}-active.png`);
});

// 快捷入口图标（64x64 优化）
console.log('\n生成快捷入口图标（64x64）...');
const quickIcons = [
  { name: 'club.png', icon: 'club' },
  { name: 'signin.png', icon: 'profile' },
  { name: 'grade.png', icon: 'grades' },
  { name: 'attendance.png', icon: 'profile' },
];

quickIcons.forEach(item => {
  const png = createOptimizedIcon(64, 64, item.icon, true);
  const filepath = path.join(iconsDir, item.name);
  fs.writeFileSync(filepath, png);
  console.log(`✓ ${item.name}`);
});

// 用户头像（80x80 优化）
console.log('\n生成用户头像（80x80）...');
const avatars = ['avatar1.jpg', 'avatar2.jpg', 'avatar3.jpg', 'avatar-admin.jpg'];
const avatarImg = createOptimizedIcon(80, 80, 'profile', true);
avatars.forEach(item => {
  const filepath = path.join(imagesDir, item);
  fs.writeFileSync(filepath, avatarImg);
  console.log(`✓ ${item}`);
});

// 社团封面（300x200 优化）
console.log('\n生成社团封面（300x200）...');
const clubCovers = ['club1.jpg', 'club2.jpg', 'club3.jpg', 'club4.jpg'];
const clubImg = createOptimizedBanner(300, 200, [[26, 115, 232], [66, 165, 245]]);
clubCovers.forEach(item => {
  const filepath = path.join(imagesDir, item);
  fs.writeFileSync(filepath, clubImg);
  console.log(`✓ ${item}`);
});

console.log('\n✅ 所有优化图片已生成！');
console.log('图片尺寸已优化，加载更快！');
