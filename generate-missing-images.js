const fs = require('fs');
const path = require('path');

// 创建精美的横幅图片
function createBanner(width, height, colors) {
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
      
      // 添加一些装饰性圆形
      const cx = width / 2;
      const cy = height / 2;
      const dist1 = Math.sqrt((x - cx * 0.3) ** 2 + (y - cy * 0.5) ** 2);
      const dist2 = Math.sqrt((x - cx * 1.7) ** 2 + (y - cy * 1.5) ** 2);
      
      if (dist1 < width * 0.15 || dist2 < width * 0.2) {
        const alpha = 0.1;
        rawData.push(
          Math.round(r * (1 - alpha) + 255 * alpha),
          Math.round(g * (1 - alpha) + 255 * alpha),
          Math.round(b * (1 - alpha) + 255 * alpha)
        );
      } else {
        rawData.push(r, g, b);
      }
    }
  }
  
  const compressed = zlib.deflateSync(Buffer.from(rawData));
  const idatChunk = createChunk('IDAT', compressed);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));
  
  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// 创建精美图标
function createIcon(width, height, type, isActive) {
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
  ihdrData.writeUInt32BE(6, 9); // RGBA
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
      
      let pixelColor = [255, 255, 255, 0]; // 透明背景
      let alpha = 0;
      
      switch(type) {
        case 'club':
          // 社团图标 - 房子+人群
          const clubY = y / height;
          const clubX = x / width;
          
          // 房子
          if (clubY >= 0.4 && clubY <= 0.75 && 
              clubX >= 0.2 && clubX <= 0.8) {
            const gradient = 1 - (clubY - 0.4) / 0.35;
            pixelColor = [
              Math.round(color[0] * gradient + colorLight[0] * (1 - gradient)),
              Math.round(color[1] * gradient + colorLight[1] * (1 - gradient)),
              Math.round(color[2] * gradient + colorLight[2] * (1 - gradient)),
              255
            ];
            alpha = 1;
          } else if (clubY >= 0.15 && clubY <= 0.45 && 
                     clubY >= 0.5 - Math.abs(clubX - 0.5) * 1.2) {
            const gradient = 1 - (clubY - 0.15) / 0.3;
            pixelColor = [
              Math.round(color[0] * gradient + colorLight[0] * (1 - gradient)),
              Math.round(color[1] * gradient + colorLight[1] * (1 - gradient)),
              Math.round(color[2] * gradient + colorLight[2] * (1 - gradient)),
              255
            ];
            alpha = 1;
          }
          // 门上的人
          for (let i = -1; i <= 1; i++) {
            const personX = cx + i * width * 0.18;
            const d = Math.sqrt((x - personX) ** 2 + (y - cy * 0.45) ** 2);
            if (d < width * 0.12) {
              pixelColor = [
                Math.round(color[0] * 0.8 + 255 * 0.2),
                Math.round(color[1] * 0.8 + 255 * 0.2),
                Math.round(color[2] * 0.8 + 255 * 0.2),
                255
              ];
              alpha = 1;
            }
          }
          break;
          
        case 'signin':
          // 签到图标 - 手指点击
          const siX = x / width;
          const siY = y / height;
          
          if (siY >= 0.2 && siY <= 0.8 && siX >= 0.2 && siX <= 0.8) {
            const gradient = 1 - (Math.abs(siX - 0.5) + Math.abs(siY - 0.5)) / 0.8;
            pixelColor = [
              Math.round(color[0] * gradient + colorLight[0] * (1 - gradient)),
              Math.round(color[1] * gradient + colorLight[1] * (1 - gradient)),
              Math.round(color[2] * gradient + colorLight[2] * (1 - gradient)),
              255
            ];
            alpha = 1;
          }
          // 手指
          if (siX > 0.5 && siX < 0.75 && siY > 0.3 && siY < 0.7) {
            pixelColor = [
              colorLight[0],
              colorLight[1],
              colorLight[2],
              255
            ];
          }
          break;
          
        case 'grade':
          // 成绩图标 - 分数徽章
          const gradeD = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
          if (gradeD < width * 0.42) {
            const gradient = 1 - gradeD / (width * 0.42);
            pixelColor = [
              Math.round(color[0] * gradient + colorLight[0] * (1 - gradient)),
              Math.round(color[1] * gradient + colorLight[1] * (1 - gradient)),
              Math.round(color[2] * gradient + colorLight[2] * (1 - gradient)),
              255
            ];
            alpha = 1;
          }
          if (gradeD < width * 0.32) {
            pixelColor = [255, 255, 255, 255];
            alpha = 1;
          }
          break;
          
        case 'attendance':
          // 考勤图标 - 日历
          const attX = x / width;
          const attY = y / height;
          
          // 日历背景
          if (attY >= 0.15 && attY <= 0.9 && attX >= 0.1 && attX <= 0.9) {
            const gradient = 1 - (attY - 0.15) / 0.75;
            pixelColor = [
              Math.round(color[0] * gradient + colorLight[0] * (1 - gradient)),
              Math.round(color[1] * gradient + colorLight[1] * (1 - gradient)),
              Math.round(color[2] * gradient + colorLight[2] * (1 - gradient)),
              255
            ];
            alpha = 1;
          }
          // 日历头部
          if (attY >= 0.15 && attY <= 0.35 && attX >= 0.1 && attX <= 0.9) {
            pixelColor = [colorLight[0], colorLight[1], colorLight[2], 255];
          }
          // 打勾
          if (attY >= 0.4 && attY <= 0.8 && 
              (attX < 0.5 ? attX > attY * 0.5 + 0.2 : attX + attY * 0.5 > 0.3 + 0.65)) {
            pixelColor = [76, 175, 80, 255];
            alpha = 1;
          }
          break;
          
        default:
          // 默认圆形
          const defD = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
          if (defD < width * 0.4) {
            const gradient = 1 - defD / (width * 0.4);
            pixelColor = [
              Math.round(color[0] * gradient + colorLight[0] * (1 - gradient)),
              Math.round(color[1] * gradient + colorLight[1] * (1 - gradient)),
              Math.round(color[2] * gradient + colorLight[2] * (1 - gradient)),
              255
            ];
            alpha = 1;
          }
      }
      
      rawData.push(pixelColor[0], pixelColor[1], pixelColor[2], pixelColor[3]);
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
const imagesDir = path.join(__dirname, 'assets', 'images');
const iconsDir = path.join(__dirname, 'assets', 'icons');

if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });
if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true });

console.log('生成 Banner 图片...');

// Banner 图片
const banners = [
  { name: 'banner1.jpg', colors: [[26, 115, 232], [66, 165, 245]] }, // 蓝色渐变
  { name: 'banner2.jpg', colors: [[76, 175, 80], [139, 195, 74]] },   // 绿色渐变
  { name: 'banner3.jpg', colors: [[255, 152, 0], [255, 193, 7]] },   // 橙色渐变
];

banners.forEach(item => {
  const png = createBanner(750, 300, item.colors);
  const filepath = path.join(imagesDir, item.name);
  fs.writeFileSync(filepath, png);
  console.log(`✓ ${item.name}`);
});

console.log('\n生成快捷入口图标...');

// 快捷入口图标 (80x80)
const quickIcons = [
  { name: 'club.png', icon: 'club', size: [80, 80], isActive: true },
  { name: 'signin.png', icon: 'signin', size: [80, 80], isActive: true },
  { name: 'grade.png', icon: 'grade', size: [80, 80], isActive: true },
  { name: 'attendance.png', icon: 'attendance', size: [80, 80], isActive: true },
];

quickIcons.forEach(item => {
  const png = createIcon(item.size[0], item.size[1], item.icon, item.isActive);
  const filepath = path.join(iconsDir, item.name);
  fs.writeFileSync(filepath, png);
  console.log(`✓ ${item.name}`);
});

console.log('\n生成其他缺失的图片...');

// 生成其他缺失的用户头像
const avatars = [
  { name: 'avatar1.jpg', color: [26, 115, 232] },
  { name: 'avatar2.jpg', color: [76, 175, 80] },
  { name: 'avatar3.jpg', color: [255, 152, 0] },
  { name: 'avatar-admin.jpg', color: [156, 39, 176] },
];

const avatarImg = createIcon(100, 100, 'avatar', true);
avatars.forEach(item => {
  const filepath = path.join(imagesDir, item.name);
  fs.writeFileSync(filepath, avatarImg);
  console.log(`✓ ${item.name}`);
});

// 生成社团封面
const clubCovers = [
  { name: 'club1.jpg', color: [26, 115, 232] },
  { name: 'club2.jpg', color: [76, 175, 80] },
  { name: 'club3.jpg', color: [255, 152, 0] },
  { name: 'club4.jpg', color: [156, 39, 176] },
];

const clubImg = createBanner(400, 300, [[26, 115, 232], [66, 165, 245]]);
clubCovers.forEach(item => {
  const filepath = path.join(imagesDir, item.name);
  fs.writeFileSync(filepath, clubImg);
  console.log(`✓ ${item.name}`);
});

console.log('\n✅ 所有缺失的图片已生成！');
console.log('现在可以正常使用小程序了！');
