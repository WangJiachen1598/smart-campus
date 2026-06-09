# 图标生成说明

## 问题
微信小程序 TabBar 需要本地图标文件，但项目中缺失。

## 解决方案（选择一种）

### 方法1：一键生成（推荐）
1. 双击运行 `run-icon-generator.bat`
2. 等待生成完成
3. 在微信开发者工具中点击"编译"

### 方法2：手动运行脚本
1. 打开命令行（cmd 或 PowerShell）
2. 进入项目目录：`cd e:\Trae\smart-campus`
3. 运行：`node decode-icons.js`

### 方法3：PowerShell 直接运行
1. 右键 `generate-icons.ps1`
2. 选择"使用 PowerShell 运行"

## 图标说明
生成后会在 `assets/icons/` 目录下创建 10 个图标：
- home.png / home-active.png (首页)
- clubs.png / clubs-active.png (社团)
- grades.png / grades-active.png (学情)
- messages.png / messages-active.png (消息)
- profile.png / profile-active.png (我的)

## 注意事项
- 图标大小：81x81 像素
- 格式：PNG
- 灰色图标：未选中状态
- 蓝色图标：选中状态

生成后即可正常预览小程序！
