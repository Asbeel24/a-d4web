# ASBEEL/D4nn9 音乐制作人网站

这是 ASBEEL/D4nn9 音乐制作人网站的 Next.js 版本，从 Wix 平台迁移而来。

## 项目概述

这是一个音乐制作人的作品展示网站，包含以下页面：
- **首页 (HOME)**: 全屏视频背景、标题、社交链接
- **作品页 (WORK)**: 音乐作品、视频作品、Spotify 嵌入播放器
- **关于页 (ABOUT)**: 关于内容
- **EDA PROJECT 页**: 编号作品列表（001-039）

## 技术栈

- **框架**: Next.js 16+ (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **字体**: Geist Sans & Geist Mono

## 开始使用

### 安装依赖

```bash
npm install
```

### 运行开发服务器

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

### 构建生产版本

```bash
npm run build
npm start
```

## 媒体文件

媒体文件应放置在 `public/media/` 目录下：

```
public/media/
├── videos/          # 视频文件
│   ├── 8789_raw.mp4
│   ├── nanoparticles.mp4
│   ├── untitled.mov
│   └── ...
├── audio/           # 音频文件
│   ├── works1.mp3
│   ├── works2.mp3
│   └── ...
└── images/          # 图片文件
    ├── note.png
    ├── gallery1.jpg
    └── ...
```

**注意**: 当前项目使用占位符路径。请将实际的媒体文件放置在相应的目录中。

## 项目结构

```
web/
├── app/                    # Next.js App Router 页面
│   ├── page.tsx           # 首页
│   ├── work/              # 作品页
│   ├── about/             # 关于页
│   └── eda-project/       # EDA PROJECT 页
├── components/            # React 组件
│   ├── Layout.tsx         # 布局组件
│   ├── Navigation.tsx     # 导航组件
│   ├── VideoPlayer.tsx    # 视频播放器
│   ├── AudioPlayer.tsx    # 音频播放器
│   ├── SocialLinks.tsx    # 社交链接
│   ├── SpotifyEmbed.tsx   # Spotify 嵌入
│   └── ImageGallery.tsx    # 图片画廊
├── public/                # 静态资源
│   └── media/             # 媒体文件目录
└── ...
```

## 功能特性

- ✅ 响应式设计，支持移动端和桌面端
- ✅ 全屏视频背景播放
- ✅ 音频播放器（播放、暂停、进度控制）
- ✅ 视频播放器（静音/取消静音）
- ✅ Spotify 嵌入播放器
- ✅ 图片画廊（轮播）
- ✅ 深色主题
- ✅ 平滑滚动和过渡动画

## 部署

### Vercel 部署

最简单的方式是使用 [Vercel Platform](https://vercel.com/new) 部署。

### 其他平台

项目可以部署到任何支持 Next.js 的平台，如：
- Netlify
- AWS Amplify
- Railway
- 自托管服务器

## 开发说明

- 所有组件都使用 TypeScript 编写
- 样式使用 Tailwind CSS
- 媒体文件路径使用占位符，需要替换为实际文件
- 响应式设计已优化，适配各种屏幕尺寸

## 许可证

本项目为个人作品展示网站。
