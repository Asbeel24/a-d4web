// Store catalogue. Everything the store, cart and checkout know about a product lives here.
// Prices are in CNY. The server always recomputes prices from this file, never from the browser.
//
// To change a price: edit `price` below (and `compareAt` for the crossed-out original price),
// commit to main, and Vercel redeploys.

export type ProductStatus = 'free' | 'on-sale' | 'in-development';

export type Product = {
  slug: string;
  // Two lowercase letters, unique. Written into the ZPAY order number so the
  // payment callback knows what was bought without a database. Never change it
  // for a product that has been sold.
  code: string;
  name: string;
  short: string;
  summary: string;
  status: ProductStatus;
  price: number | null; // null = not for sale yet
  compareAt?: number | null; // original price, shown crossed out
  formats: string[];
  platforms: string[];
  image: string;
  imageAlt: string;
  accent: string;
  // Public download for free products. Empty = not uploaded yet.
  download?: { url: string; label: string; note: string };
};

export const products: Product[] = [
  {
    slug: 'spike-mix-hub',
    code: 'sp',
    name: 'SPIKE MIX HUB',
    short: '一个插件，三种模式：人声、鼓组、总线',
    summary:
      'UDG 的 Pro 版。VOCAL 把人声压紧推到前面，DRUM 让鼓和 808 更狠，MASTER 做响度、粘合和清晰度。每个模式 10 个出厂预设，选模式、挑预设、拧几下就出声音。',
    status: 'in-development',
    price: null,
    formats: ['VST3', 'AU'],
    platforms: ['macOS', 'Windows'],
    image: '/store/media/spike/ui-vocal.webp',
    imageAlt: 'SPIKE MIX HUB 插件界面',
    accent: '#3dff5c',
  },
  {
    slug: 'hardick',
    code: 'hd',
    name: 'HARDICK',
    short: '让 808 站起来。一个旋钮的管子饱和',
    summary:
      '挂在 808、Kick 或者鼓组总线上，一拧就是更暖、更厚、更响。808 在手机外放上也听得见，峰值守在 −1 dBFS。',
    status: 'on-sale',
    price: 39.9,
    formats: ['VST3', 'AU'],
    platforms: ['macOS', 'Windows'],
    image: '/store/media/hardick/ui-050-1000.webp',
    imageAlt: 'HARDICK 插件界面',
    accent: '#77AEB1',
  },
  {
    slug: 'udg',
    code: 'ud',
    name: 'UDG',
    short: '两个旋钮的说唱整轨效果器，免费',
    summary:
      '挂在整条伴奏或总线上，一个 UDG 旋钮推动磁带饱和、多段压缩、软削波、空间和镶边。脏、压得狠，但依然清楚。',
    status: 'free',
    price: 0,
    formats: ['VST3', 'AU'],
    platforms: ['macOS', 'Windows'],
    image: '/store/media/udg/ui.jpg',
    imageAlt: 'UDG 插件界面',
    accent: '#9dff6a',
    download: {
      url: 'https://pan.baidu.com/s/1ToCR22MqkWfQrRq5YZTWNA?pwd=rzyj',
      label: '百度网盘下载',
      note: 'macOS + Windows 安装包 · 提取码 rzyj',
    },
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductByCode(code: string) {
  return products.find((p) => p.code === code);
}

export function isPurchasable(p: Product) {
  return p.status === 'on-sale' && p.price !== null && p.price > 0;
}

export const statusLabel: Record<ProductStatus, string> = {
  free: '免费',
  'on-sale': '在售',
  'in-development': '开发中',
};

export function formatPrice(n: number) {
  return '¥' + n.toLocaleString('zh-CN', { maximumFractionDigits: 2 });
}
