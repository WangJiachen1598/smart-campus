const fs = require('fs');
const path = require('path');

// 创建有意义的PNG图标
function createIcon(width, height, type, color) {
  const [r, g, b] = color;
  const gray = [102, 102, 102];
  
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
      
      switch(type) {
        case 'home':
          // 房子图标
          if (y >= height * 0.4 && y <= height * 0.8 && 
              x >= width * 0.25 && x <= width * 0.75) {
            pixelColor = color;
          } else if (y >= height * 0.2 && y <= height * 0.4 && 
                     y >= height * 0.4 - (x - cx)) {
            pixelColor = color;
          }
          break;
          
        case 'club':
          // 三个人群图标
          if ((Math.abs(x - cx) < width * 0.1 && Math.abs(y - cy) < height * 0.15) ||
              (Math.abs(x - cx * 0.65) < width * 0.1 && Math.abs(y - cy) < height * 0.15) ||
              (Math.abs(x - cx * 1.35) < width * 0.1 && Math.abs(y - cy) < height * 0.15)) {
            pixelColor = color;
          }
          break;
          
        case 'grades':
          // 图表图标
          if (y >= height * 0.7 && x >= width * 0.2 && x <= width * 0.35) {
            pixelColor = color;
          } else if (y >= height * 0.5 && x >= width * 0.4 && x <= width * 0.55) {
            pixelColor = color;
          } else if (y >= height * 0.3 && x >= width * 0.6 && x <= width * 0.75) {
            pixelColor = color;
          } else if (y >= height * 0.85 && x >= width * 0.1 && x <= width * 0.9) {
            pixelColor = gray;
          }
          break;
          
        case 'message':
          // 信封图标
          if (y >= height * 0.25 && y <= height * 0.75 && 
              x >= width * 0.15 && x <= width * 0.85) {
            pixelColor = color;
          } else if (y >= height * 0.25 && y <= height * 0.5 && 
                     Math.abs(y - cy + width * 0.2) < height * 0.1) {
            pixelColor = [255, 255, 255];
          }
          break;
          
        case 'profile':
          // 人头图标
          if ((y >= height * 0.15 && y <= height * 0.5 && 
               Math.sqrt((x - cx) ** 2 + (y - cy * 0.65) ** 2) < width * 0.25) ||
              (y >= height * 0.5 && y <= height * 0.85 && 
               x >= width * 0.25 && x <= width * 0.75)) {
            pixelColor = color;
          }
          break;
          
        case 'edit':
          // 铅笔图标
          if (y <= height * 0.9 && Math.abs(x - cx - (height * 0.5 - y)) < width * 0.1) {
            pixelColor = color;
          } else if (y <= height * 0.95 && x >= width * 0.4 && x <= width * 0.6) {
            pixelColor = gray;
          }
          break;
          
        case 'arrow':
          // 右箭头图标
          if (y >= height * 0.35 && y <= height * 0.65 && x <= width * 0.6) {
            pixelColor = color;
          } else if (y >= height * 0.25 && y <= height * 0.75 && 
                     x >= width * 0.4 && x <= width * 0.75 && 
                     Math.abs(x - cx - (cy - y) * 0.4) < width * 0.1) {
            pixelColor = color;
          }
          break;
          
        case 'search':
          // 搜索图标
          if (Math.sqrt((x - cx * 0.9) ** 2 + (y - cy * 0.9) ** 2) < width * 0.25 && 
              Math.sqrt((x - cx * 0.9) ** 2 + (y - cy * 0.9) ** 2) > width * 0.15) {
            pixelColor = color;
          } else if (x >= width * 0.7 && y >= height * 0.7 && 
                     Math.abs(x - y) < width * 0.1) {
            pixelColor = color;
          }
          break;
          
        case 'time':
          // 时钟图标
          if (Math.sqrt((x - cx) ** 2 + (y - cy) ** 2) < width * 0.4 && 
              Math.sqrt((x - cx) ** 2 + (y - cy) ** 2) > width * 0.3) {
            pixelColor = color;
          } else if ((y <= cy && Math.abs(x - cx) < width * 0.05) ||
                     (x >= cx && Math.abs(y - cy) < height * 0.05)) {
            pixelColor = color;
          }
          break;
          
        case 'location':
          // 定位图标
          const locDist = Math.sqrt((x - cx) ** 2 + (y - cy * 0.8) ** 2);
          if (locDist < width * 0.3) {
            pixelColor = color;
          } else if (locDist < width * 0.35) {
            pixelColor = gray;
          }
          break;
          
        case 'people':
          // 人群图标
          if (Math.abs(x - cx * 0.75) < width * 0.1 && Math.abs(y - cy) < height * 0.25) {
            pixelColor = color;
          } else if (Math.abs(x - cx * 1.25) < width * 0.1 && Math.abs(y - cy) < height * 0.25) {
            pixelColor = color;
          }
          break;
          
        case 'checkin':
          // 签到对勾图标
          if ((x > cx * 0.5 && x < cx * 1.5) && 
              (y > cy * 0.4 && y < cy * 1.6) && 
              (x < width * 0.6 ? (x < y * 0.6 + width * 0.2) : (x + y * 0.6 > width * 0.6 + height * 0.3))) {
            pixelColor = color;
          }
          break;
          
        case 'member':
          // 成员图标
          if (Math.abs(x - cx) < width * 0.15 && Math.abs(y - cy) < height * 0.2) {
            pixelColor = color;
          }
          break;
          
        case 'activity':
          // 活动星星图标
          if (y <= height * 0.8 && 
              (Math.abs(x - cx) < (height * 0.8 - y) * 0.5 || 
               Math.abs(x - cx) > width * 0.15 && Math.abs(y - cy) < height * 0.1)) {
            pixelColor = color;
          }
          break;
          
        case 'hot':
          // 热图标
          if (x > width * 0.25 && x < width * 0.75 && 
              Math.abs(x - cx) < (cy - y) * 0.6) {
            pixelColor = color;
          }
          break;
          
        case 'scan':
          // 扫描图标
          if (y >= height * 0.2 && y <= height * 0.8 && 
              ((x >= width * 0.15 && x <= width * 0.25) || 
               (x >= width * 0.75 && x <= width * 0.85))) {
            pixelColor = color;
          } else if (x >= width * 0.2 && x <= width * 0.8 && 
                     ((y >= height * 0.15 && y <= height * 0.25) || 
                      (y >= height * 0.75 && y <= height * 0.85))) {
            pixelColor = color;
          } else if (x >= width * 0.35 && x <= width * 0.65 && 
                     y >= height * 0.45 && y <= height * 0.55) {
            pixelColor = color;
          }
          break;
          
        case 'dashboard':
          // 看板仪表图标
          if (y >= height * 0.5 && Math.sqrt((x - cx) ** 2 + (y - height) ** 2) < width * 0.4) {
            pixelColor = color;
          }
          break;
          
        case 'clear':
          // 清除X图标
          if ((Math.abs(x - y) < width * 0.15 && y > height * 0.15 && y < height * 0.85) ||
              (Math.abs(x + y - width) < width * 0.15 && y > height * 0.15 && y < height * 0.85)) {
            pixelColor = color;
          }
          break;
          
        case 'logo':
          // Logo图标（大圈带小圈）
          const d1 = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
          if (d1 < width * 0.45 && d1 > width * 0.35) {
            pixelColor = color;
          } else if (d1 < width * 0.2) {
            pixelColor = color;
          }
          break;
          
        case 'avatar':
          // 默认头像图标
          if (Math.sqrt((x - cx) ** 2 + (y - cy * 0.6) ** 2) < width * 0.25) {
            pixelColor = color;
          } else if (y >= height * 0.55 && y <= height * 0.9 && 
                     x >= width * 0.2 && x <= width * 0.8) {
            pixelColor = color;
          }
          break;
          
        case 'empty':
          // 空状态图标（圆形边框）
          const emptyDist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
          if (emptyDist < width * 0.45 && emptyDist > width * 0.4) {
            pixelColor = gray;
          }
          break;
          
        default:
          // 默认圆形图标
          if (Math.sqrt((x - cx) ** 2 + (y - cy) ** 2) < width * 0.4) {
            pixelColor = color;
          }
      }
      
      rawData.push(pixelColor[0], pixelColor[1], pixelColor[2]);
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
// 橙色图标
const orange = [255, 152, 0];
// 红色图标
const red = [244, 67, 54];

// TabBar图标（81x81）
const tabIcons = [
  { name: 'home', icon: 'home', size: [81, 81] },
  { name: 'clubs', icon: 'club', size: [81, 81] },
  { name: 'grades', icon: 'grades', size: [81, 81] },
  { name: 'messages', icon: 'message', size: [81, 81] },
  { name: 'profile', icon: 'profile', size: [81, 81] },
];

console.log('生成 TabBar 图标...');
tabIcons.forEach(item => {
  // 未选中状态（灰色）
  const pngGray = createIcon(item.size[0], item.size[1], item.icon, gray);
  fs.writeFileSync(path.join(iconsDir, `${item.name}.png`), pngGray);
  
  // 选中状态（蓝色）
  const pngBlue = createIcon(item.size[0], item.size[1], item.icon, blue);
  fs.writeFileSync(path.join(iconsDir, `${item.name}-active.png`), pngBlue);
  
  console.log(`✓ ${item.name}.png / ${item.name}-active.png`);
});

// 其他功能图标
console.log('\n生成功能图标...');
const funcIcons = [
  { name: 'edit.png', icon: 'edit', size: [48, 48], color: gray },
  { name: 'arrow-right.png', icon: 'arrow', size: [48, 48], color: gray },
  { name: 'search.png', icon: 'search', size: [48, 48], color: gray },
  { name: 'clear.png', icon: 'clear', size: [32, 32], color: gray },
  { name: 'time.png', icon: 'time', size: [32, 32], color: blue },
  { name: 'location.png', icon: 'location', size: [32, 32], color: blue },
  { name: 'people.png', icon: 'people', size: [32, 32], color: blue },
  { name: 'checkin.png', icon: 'checkin', size: [32, 32], color: orange },
  { name: 'member.png', icon: 'member', size: [32, 32], color: blue },
  { name: 'activity.png', icon: 'activity', size: [32, 32], color: orange },
  { name: 'hot.png', icon: 'hot', size: [32, 32], color: orange },
  { name: 'message.png', icon: 'message', size: [32, 32], color: blue },
  { name: 'scan.png', icon: 'scan', size: [64, 64], color: blue },
  { name: 'dashboard.png', icon: 'dashboard', size: [48, 48], color: blue },
  { name: 'admin-club.png', icon: 'club', size: [48, 48], color: blue },
  { name: 'admin-activity.png', icon: 'activity', size: [48, 48], color: orange },
  { name: 'admin-member.png', icon: 'people', size: [48, 48], color: blue },
];

funcIcons.forEach(item => {
  const png = createIcon(item.size[0], item.size[1], item.icon, item.color);
  fs.writeFileSync(path.join(iconsDir, item.name), png);
  console.log(`✓ ${item.name}`);
});

// 图片资源
console.log('\n生成图片资源...');
const images = [
  { name: 'empty.png', icon: 'empty', size: [200, 200], color: gray },
  { name: 'empty-message.png', icon: 'message', size: [200, 200], color: gray },
  { name: 'empty-feedback.png', icon: 'message', size: [200, 200], color: gray },
  { name: 'logo.png', icon: 'logo', size: [120, 120], color: blue },
  { name: 'default-avatar.png', icon: 'avatar', size: [100, 100], color: blue },
];

images.forEach(item => {
  const png = createIcon(item.size[0], item.size[1], item.icon, item.color);
  fs.writeFileSync(path.join(imagesDir, item.name), png);
  console.log(`✓ ${item.name}`);
});

console.log('\n✅ 所有图标已重新生成！');
console.log('现在图标更贴合内容了！');
