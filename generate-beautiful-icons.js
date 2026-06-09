const fs = require('fs');
const path = require('path');

// 创建精美PNG图标 - 带渐变和阴影效果
function createBeautifulIcon(width, height, type, isActive) {
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
      
      switch(type) {
        case 'home':
          // 精美的房子图标 - 带渐变
          const houseY = y / height;
          const houseX = x / width;
          
          if (houseY >= 0.45 && houseY <= 0.85 && 
              houseX >= 0.22 && houseX <= 0.78) {
            const gradient = 1 - (houseY - 0.45) / 0.4;
            pixelColor = [
              Math.round(color[0] * gradient + colorLight[0] * (1 - gradient)),
              Math.round(color[1] * gradient + colorLight[1] * (1 - gradient)),
              Math.round(color[2] * gradient + colorLight[2] * (1 - gradient))
            ];
          } else if (houseY >= 0.2 && houseY <= 0.5 && 
                     houseY >= 0.55 - Math.abs(houseX - 0.5) * 1.5) {
            const gradient = 1 - (houseY - 0.2) / 0.3;
            pixelColor = [
              Math.round(color[0] * gradient + colorLight[0] * (1 - gradient)),
              Math.round(color[1] * gradient + colorLight[1] * (1 - gradient)),
              Math.round(color[2] * gradient + colorLight[2] * (1 - gradient))
            ];
          }
          // 门
          if (houseY >= 0.55 && houseY <= 0.85 && 
              houseX >= 0.4 && houseX <= 0.6) {
            pixelColor = [255, 255, 255];
          }
          break;
          
        case 'club':
          // 精美的三个人群图标
          for (let i = -1; i <= 1; i++) {
            const personX = cx + i * width * 0.22;
            const d = Math.sqrt((x - personX) ** 2 + (y - cy) ** 2);
            if (d < width * 0.18) {
              const gradient = 1 - d / (width * 0.18);
              pixelColor = [
                Math.round(color[0] * gradient + colorLight[0] * (1 - gradient)),
                Math.round(color[1] * gradient + colorLight[1] * (1 - gradient)),
                Math.round(color[2] * gradient + colorLight[2] * (1 - gradient))
              ];
            }
          }
          break;
          
        case 'grades':
          // 精美的柱状图图标
          const barHeights = [0.4, 0.6, 0.9];
          for (let i = 0; i < 3; i++) {
            const barX = width * 0.2 + i * width * 0.25;
            const barH = height * barHeights[i];
            if (x >= barX && x <= barX + width * 0.2 &&
                y >= height - barH && y <= height * 0.88) {
              const gradient = 1 - (height - y - barH * 0.1) / barH;
              pixelColor = [
                Math.round(color[0] * gradient + colorLight[0] * (1 - gradient)),
                Math.round(color[1] * gradient + colorLight[1] * (1 - gradient)),
                Math.round(color[2] * gradient + colorLight[2] * (1 - gradient))
              ];
            }
          }
          // 底部横线
          if (y >= height * 0.88 && y <= height * 0.92 && 
              x >= width * 0.1 && x <= width * 0.9) {
            pixelColor = gray;
          }
          break;
          
        case 'message':
          // 精美的信封图标
          const msgX = x / width;
          const msgY = y / height;
          
          if (msgY >= 0.2 && msgY <= 0.8 && 
              msgX >= 0.1 && msgX <= 0.9) {
            const gradient = 1 - (msgY - 0.2) / 0.6;
            pixelColor = [
              Math.round(color[0] * gradient + colorLight[0] * (1 - gradient)),
              Math.round(color[1] * gradient + colorLight[1] * (1 - gradient)),
              Math.round(color[2] * gradient + colorLight[2] * (1 - gradient))
            ];
          }
          // 信封封口
          if (msgY >= 0.2 && msgY <= 0.5 && 
              Math.abs(msgY - 0.5 - (msgX - 0.5) * 0.6) < 0.08) {
            pixelColor = [255, 255, 255];
          }
          break;
          
        case 'profile':
          // 精美的用户头像图标
          const dHead = Math.sqrt((x - cx) ** 2 + (y - cy * 0.6) ** 2);
          if (dHead < width * 0.3) {
            const gradient = 1 - dHead / (width * 0.3);
            pixelColor = [
              Math.round(color[0] * gradient + colorLight[0] * (1 - gradient)),
              Math.round(color[1] * gradient + colorLight[1] * (1 - gradient)),
              Math.round(color[2] * gradient + colorLight[2] * (1 - gradient))
            ];
          }
          // 身体部分
          if (y >= height * 0.55 && y <= height * 0.9 && 
              x >= width * 0.18 && x <= width * 0.82) {
            const bodyGradient = 1 - (y - height * 0.55) / (height * 0.35);
            pixelColor = [
              Math.round(color[0] * bodyGradient + colorLight[0] * (1 - bodyGradient)),
              Math.round(color[1] * bodyGradient + colorLight[1] * (1 - bodyGradient)),
              Math.round(color[2] * bodyGradient + colorLight[2] * (1 - bodyGradient))
            ];
          }
          break;
          
        case 'edit':
          // 精美的铅笔图标
          if (y <= height * 0.9 && Math.abs(x - cx - (height * 0.5 - y) * 0.8) < width * 0.1) {
            const gradient = y / height;
            pixelColor = [
              Math.round(color[0] * gradient + colorLight[0] * (1 - gradient)),
              Math.round(color[1] * gradient + colorLight[1] * (1 - gradient)),
              Math.round(color[2] * gradient + colorLight[2] * (1 - gradient))
            ];
          }
          // 笔尖
          if (y >= height * 0.88 && x >= width * 0.4 && x <= width * 0.6) {
            pixelColor = [80, 80, 80];
          }
          break;
          
        case 'arrow':
          // 精美的右箭头
          if (y >= height * 0.35 && y <= height * 0.65 && x <= width * 0.55) {
            const gradient = 1 - Math.abs(y - cy) / (height * 0.15);
            pixelColor = [
              Math.round(color[0] * gradient + colorLight[0] * (1 - gradient)),
              Math.round(color[1] * gradient + colorLight[1] * (1 - gradient)),
              Math.round(color[2] * gradient + colorLight[2] * (1 - gradient))
            ];
          } else if (y >= height * 0.25 && y <= height * 0.75 && 
                     x >= width * 0.35 && x <= width * 0.8 && 
                     Math.abs(x - cx - (cy - y) * 0.5) < width * 0.12) {
            const gradient = 1 - Math.abs(x - width * 0.57) / (width * 0.22);
            pixelColor = [
              Math.round(color[0] * gradient + colorLight[0] * (1 - gradient)),
              Math.round(color[1] * gradient + colorLight[1] * (1 - gradient)),
              Math.round(color[2] * gradient + colorLight[2] * (1 - gradient))
            ];
          }
          break;
          
        case 'search':
          // 精美的搜索图标
          const sCx = cx * 0.88;
          const sCy = cy * 0.88;
          const sD = Math.sqrt((x - sCx) ** 2 + (y - sCy) ** 2);
          if (sD < width * 0.28 && sD > width * 0.18) {
            const gradient = 1 - Math.abs(sD - width * 0.23) / (width * 0.05);
            pixelColor = [
              Math.round(color[0] * gradient + colorLight[0] * (1 - gradient)),
              Math.round(color[1] * gradient + colorLight[1] * (1 - gradient)),
              Math.round(color[2] * gradient + colorLight[2] * (1 - gradient))
            ];
          }
          // 手柄
          if (x >= width * 0.68 && y >= height * 0.68 && 
              Math.abs(x - y) < width * 0.12) {
            const gradient = 1 - (x + y - width * 1.36) / (width * 0.24);
            pixelColor = [
              Math.round(color[0] * gradient + colorLight[0] * (1 - gradient)),
              Math.round(color[1] * gradient + colorLight[1] * (1 - gradient)),
              Math.round(color[2] * gradient + colorLight[2] * (1 - gradient))
            ];
          }
          break;
          
        case 'time':
          // 精美的时钟图标
          const tD = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
          if (tD < width * 0.43 && tD > width * 0.33) {
            const gradient = 1 - Math.abs(tD - width * 0.38) / (width * 0.05);
            pixelColor = [
              Math.round(color[0] * gradient + colorLight[0] * (1 - gradient)),
              Math.round(color[1] * gradient + colorLight[1] * (1 - gradient)),
              Math.round(color[2] * gradient + colorLight[2] * (1 - gradient))
            ];
          }
          // 时针
          if (y <= cy + height * 0.03 && y >= cy - height * 0.03 && x <= cx + width * 0.03) {
            pixelColor = color;
          }
          // 分针
          if (x >= cx - width * 0.02 && x <= cx + width * 0.02 && y <= cy) {
            pixelColor = color;
          }
          break;
          
        case 'location':
          // 精美的定位图标
          const lD = Math.sqrt((x - cx) ** 2 + (y - cy * 0.7) ** 2);
          if (lD < width * 0.38) {
            const gradient = 1 - lD / (width * 0.38);
            pixelColor = [
              Math.round(color[0] * gradient + colorLight[0] * (1 - gradient)),
              Math.round(color[1] * gradient + colorLight[1] * (1 - gradient)),
              Math.round(color[2] * gradient + colorLight[2] * (1 - gradient))
            ];
          }
          // 中心点
          if (lD < width * 0.12) {
            pixelColor = [255, 255, 255];
          }
          break;
          
        case 'people':
          // 精美的人群图标
          for (let i = 0; i <= 1; i++) {
            const pX = cx + (i === 0 ? -1 : 1) * width * 0.2;
            const pD = Math.sqrt((x - pX) ** 2 + (y - cy) ** 2);
            if (pD < width * 0.22) {
              const gradient = 1 - pD / (width * 0.22);
              pixelColor = [
                Math.round(color[0] * gradient + colorLight[0] * (1 - gradient)),
                Math.round(color[1] * gradient + colorLight[1] * (1 - gradient)),
                Math.round(color[2] * gradient + colorLight[2] * (1 - gradient))
              ];
            }
          }
          break;
          
        case 'checkin':
          // 精美的对勾图标
          const checkX = x / width;
          const checkY = y / height;
          
          if ((checkX > 0.15 && checkX < 0.85 && 
               checkY > 0.2 && checkY < 0.8 && 
               (checkX < 0.5 ? 
                (checkX < checkY * 0.6 + 0.22) : 
                (checkX + checkY * 0.6 > 0.48 + 0.25)))) {
            const gradient = checkX < 0.5 ? 
              1 - (checkY - 0.2) / 0.3 : 
              1 - (checkX - 0.5) / 0.35;
            pixelColor = [
              Math.round(color[0] * gradient + colorLight[0] * (1 - gradient)),
              Math.round(color[1] * gradient + colorLight[1] * (1 - gradient)),
              Math.round(color[2] * gradient + colorLight[2] * (1 - gradient))
            ];
          }
          break;
          
        case 'member':
          // 精美的成员图标
          const mD = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
          if (mD < width * 0.35) {
            const gradient = 1 - mD / (width * 0.35);
            pixelColor = [
              Math.round(color[0] * gradient + colorLight[0] * (1 - gradient)),
              Math.round(color[1] * gradient + colorLight[1] * (1 - gradient)),
              Math.round(color[2] * gradient + colorLight[2] * (1 - gradient))
            ];
          }
          break;
          
        case 'activity':
          // 精美的星星图标
          const aX = x / width;
          const aY = y / height;
          const angle = Math.atan2(aY - 0.5, aX - 0.5);
          const aR = Math.sqrt((aX - 0.5) ** 2 + (aY - 0.5) ** 2);
          const starR = 0.28 + 0.12 * Math.abs(Math.cos(angle * 2.5));
          
          if (aR < starR) {
            const gradient = 1 - aR / starR;
            pixelColor = [
              Math.round(color[0] * gradient + colorLight[0] * (1 - gradient)),
              Math.round(color[1] * gradient + colorLight[1] * (1 - gradient)),
              Math.round(color[2] * gradient + colorLight[2] * (1 - gradient))
            ];
          }
          break;
          
        case 'hot':
          // 精美的热点/火焰图标
          const hX = x / width;
          const hY = y / height;
          
          if (hX > 0.2 && hX < 0.8 && 
              Math.abs(hX - 0.5) < (0.7 - hY) * 0.7) {
            const gradient = 1 - (0.7 - hY) / 0.5;
            pixelColor = [
              Math.round(color[0] * gradient + colorLight[0] * (1 - gradient)),
              Math.round(color[1] * gradient + colorLight[1] * (1 - gradient)),
              Math.round(color[2] * gradient + colorLight[2] * (1 - gradient))
            ];
          }
          break;
          
        case 'scan':
          // 精美的扫描图标
          const scanLine = Math.sin((Date.now() % 3000) / 3000 * Math.PI * 2);
          
          if (y >= height * 0.15 && y <= height * 0.85 && 
              ((x >= width * 0.1 && x <= width * 0.18) || 
               (x >= width * 0.82 && x <= width * 0.9))) {
            pixelColor = color;
          } else if (x >= width * 0.1 && x <= width * 0.9 && 
                     ((y >= height * 0.1 && y <= height * 0.18) || 
                      (y >= height * 0.82 && y <= height * 0.9))) {
            pixelColor = color;
          }
          // 扫描线
          if (Math.abs(y - cy - scanLine * height * 0.3) < height * 0.05 &&
              x >= width * 0.2 && x <= width * 0.8) {
            pixelColor = colorLight;
          }
          break;
          
        case 'dashboard':
          // 精美的仪表板图标
          const dbD = Math.sqrt((x - cx) ** 2 + (y - height) ** 2);
          if (dbD < width * 0.45 && dbD > width * 0.35 && y >= height * 0.3) {
            const gradient = 1 - Math.abs(dbD - width * 0.4) / (width * 0.05);
            pixelColor = [
              Math.round(color[0] * gradient + colorLight[0] * (1 - gradient)),
              Math.round(color[1] * gradient + colorLight[1] * (1 - gradient)),
              Math.round(color[2] * gradient + colorLight[2] * (1 - gradient))
            ];
          }
          break;
          
        case 'clear':
          // 精美的清除X图标
          if ((Math.abs(x - y) < width * 0.18 && y > height * 0.1 && y < height * 0.9) ||
              (Math.abs(x + y - width) < width * 0.18 && y > height * 0.1 && y < height * 0.9)) {
            const gradient = 1 - Math.abs(x + (x < y ? y : -y) - (x < y ? cx : cx)) / (width * 0.6);
            pixelColor = [
              Math.round(color[0] * gradient + colorLight[0] * (1 - gradient)),
              Math.round(color[1] * gradient + colorLight[1] * (1 - gradient)),
              Math.round(color[2] * gradient + colorLight[2] * (1 - gradient))
            ];
          }
          break;
          
        case 'logo':
          // 精美的Logo图标
          const logoD1 = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
          if (logoD1 < width * 0.47 && logoD1 > width * 0.37) {
            const gradient = 1 - Math.abs(logoD1 - width * 0.42) / (width * 0.05);
            pixelColor = [
              Math.round(color[0] * gradient + colorLight[0] * (1 - gradient)),
              Math.round(color[1] * gradient + colorLight[1] * (1 - gradient)),
              Math.round(color[2] * gradient + colorLight[2] * (1 - gradient))
            ];
          }
          const logoD2 = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
          if (logoD2 < width * 0.22) {
            const gradient = 1 - logoD2 / (width * 0.22);
            pixelColor = [
              Math.round(color[0] * gradient + colorLight[0] * (1 - gradient)),
              Math.round(color[1] * gradient + colorLight[1] * (1 - gradient)),
              Math.round(color[2] * gradient + colorLight[2] * (1 - gradient))
            ];
          }
          break;
          
        case 'avatar':
          // 精美的头像图标
          const avDHead = Math.sqrt((x - cx) ** 2 + (y - cy * 0.55) ** 2);
          if (avDHead < width * 0.3) {
            const gradient = 1 - avDHead / (width * 0.3);
            pixelColor = [
              Math.round(color[0] * gradient + colorLight[0] * (1 - gradient)),
              Math.round(color[1] * gradient + colorLight[1] * (1 - gradient)),
              Math.round(color[2] * gradient + colorLight[2] * (1 - gradient))
            ];
          }
          if (y >= height * 0.5 && y <= height * 0.88 && 
              x >= width * 0.15 && x <= width * 0.85) {
            const avGrad = 1 - (y - height * 0.5) / (height * 0.38);
            pixelColor = [
              Math.round(color[0] * avGrad + colorLight[0] * (1 - avGrad)),
              Math.round(color[1] * avGrad + colorLight[1] * (1 - avGrad)),
              Math.round(color[2] * avGrad + colorLight[2] * (1 - avGrad))
            ];
          }
          break;
          
        case 'empty':
          // 精美的空状态图标
          const emptyD = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
          if (emptyD < width * 0.47 && emptyD > width * 0.37) {
            const gradient = 1 - Math.abs(emptyD - width * 0.42) / (width * 0.05);
            pixelColor = [
              Math.round(gray[0] * gradient + 180 * (1 - gradient)),
              Math.round(gray[1] * gradient + 180 * (1 - gradient)),
              Math.round(gray[2] * gradient + 180 * (1 - gradient))
            ];
          }
          break;
          
        default:
          // 默认圆形图标
          const defD = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
          if (defD < width * 0.4) {
            const gradient = 1 - defD / (width * 0.4);
            pixelColor = [
              Math.round(color[0] * gradient + colorLight[0] * (1 - gradient)),
              Math.round(color[1] * gradient + colorLight[1] * (1 - gradient)),
              Math.round(color[2] * gradient + colorLight[2] * (1 - gradient))
            ];
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

// TabBar图标（81x81）
const tabIcons = [
  { name: 'home', icon: 'home', size: [81, 81] },
  { name: 'clubs', icon: 'club', size: [81, 81] },
  { name: 'grades', icon: 'grades', size: [81, 81] },
  { name: 'messages', icon: 'message', size: [81, 81] },
  { name: 'profile', icon: 'profile', size: [81, 81] },
];

console.log('生成精美 TabBar 图标...');
tabIcons.forEach(item => {
  // 未选中状态（灰色渐变）
  const pngGray = createBeautifulIcon(item.size[0], item.size[1], item.icon, false);
  fs.writeFileSync(path.join(iconsDir, `${item.name}.png`), pngGray);
  
  // 选中状态（蓝色渐变）
  const pngBlue = createBeautifulIcon(item.size[0], item.size[1], item.icon, true);
  fs.writeFileSync(path.join(iconsDir, `${item.name}-active.png`), pngBlue);
  
  console.log(`✓ ${item.name}.png / ${item.name}-active.png`);
});

// 其他功能图标
console.log('\n生成精美功能图标...');
const funcIcons = [
  { name: 'edit.png', icon: 'edit', size: [48, 48], isActive: false },
  { name: 'arrow-right.png', icon: 'arrow', size: [48, 48], isActive: false },
  { name: 'search.png', icon: 'search', size: [48, 48], isActive: false },
  { name: 'clear.png', icon: 'clear', size: [32, 32], isActive: false },
  { name: 'time.png', icon: 'time', size: [32, 32], isActive: true },
  { name: 'location.png', icon: 'location', size: [32, 32], isActive: true },
  { name: 'people.png', icon: 'people', size: [32, 32], isActive: true },
  { name: 'checkin.png', icon: 'checkin', size: [32, 32], isActive: false },
  { name: 'member.png', icon: 'member', size: [32, 32], isActive: true },
  { name: 'activity.png', icon: 'activity', size: [32, 32], isActive: false },
  { name: 'hot.png', icon: 'hot', size: [32, 32], isActive: false },
  { name: 'message.png', icon: 'message', size: [32, 32], isActive: true },
  { name: 'scan.png', icon: 'scan', size: [64, 64], isActive: true },
  { name: 'dashboard.png', icon: 'dashboard', size: [48, 48], isActive: true },
  { name: 'admin-club.png', icon: 'club', size: [48, 48], isActive: true },
  { name: 'admin-activity.png', icon: 'activity', size: [48, 48], isActive: false },
  { name: 'admin-member.png', icon: 'people', size: [48, 48], isActive: true },
];

funcIcons.forEach(item => {
  const png = createBeautifulIcon(item.size[0], item.size[1], item.icon, item.isActive);
  fs.writeFileSync(path.join(iconsDir, item.name), png);
  console.log(`✓ ${item.name}`);
});

// 图片资源
console.log('\n生成精美图片资源...');
const images = [
  { name: 'empty.png', icon: 'empty', size: [200, 200], isActive: false },
  { name: 'empty-message.png', icon: 'message', size: [200, 200], isActive: false },
  { name: 'empty-feedback.png', icon: 'message', size: [200, 200], isActive: false },
  { name: 'logo.png', icon: 'logo', size: [120, 120], isActive: true },
  { name: 'default-avatar.png', icon: 'avatar', size: [100, 100], isActive: true },
];

images.forEach(item => {
  const png = createBeautifulIcon(item.size[0], item.size[1], item.icon, item.isActive);
  fs.writeFileSync(path.join(imagesDir, item.name), png);
  console.log(`✓ ${item.name}`);
});

console.log('\n✅ 所有精美图标已生成！');
console.log('图标现在带有渐变效果，更加专业美观！');
