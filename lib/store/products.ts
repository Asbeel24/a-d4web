// Store catalogue. Everything the store, cart and checkout know about a product lives here.
// Prices are in CNY. The server always recomputes prices from this file, never from the browser.

export type ProductStatus = 'free' | 'on-sale' | 'in-development';

export type Product = {
  slug: string;
  // Two lowercase letters, unique. Written into the ZPAY order number so the
  // payment callback knows what was bought without a database. Never change it
  // for a product that has been sold.
  code: string;
  name: string;
  kind: string; // e.g. "PLUGIN", "SOFTWARE"
  short: string;
  summary: string;
  features: string[];
  status: ProductStatus;
  price: number | null;
  formats: string[];
  platforms: string[];
  image: string;
  imageAlt: string;
  accent: string;
  // Before / after audio for the A/B player. Optional.
  preview?: { dry: string; wet: string; dryLabel: string; wetLabel: string };
  // Public download for free products. Empty = not uploaded yet.
  freeDownload?: string;
};

export const products: Product[] = [
  {
    slug: 'hardick',
    code: 'hd',
    name: 'HARDICK',
    kind: 'PLUGIN',
    short: '让 808 站起来。一个旋钮的管子饱和',
    summary:
      '挂在 808、Kick 或者鼓组总线上，一拧就是更暖、更厚、更响。808 在手机外放上也听得见，峰值守在 −1 dBFS。',
    features: ['单旋钮电子管饱和', '为 808 / Kick 调校', '输出峰值自动守在 −1 dBFS', '低 CPU 占用'],
    status: 'on-sale',
    price: 0.01, // TEMP: payment test, restore to 199
    formats: ['VST3', 'AU'],
    platforms: ['macOS', 'Windows'],
    image: '/store/hardick.webp',
    imageAlt: 'HARDICK 插件界面',
    accent: '#77AEB1',
    preview: { dry: '/store/hardick-dry.mp3', wet: '/store/hardick-wet.mp3', dryLabel: 'DRY', wetLabel: 'HARDICK MAX' },
  },
  {
    slug: 'udg',
    code: 'ud',
    name: 'UDG',
    kind: 'PLUGIN',
    short: '两个旋钮的说唱整轨效果器，免费',
    summary:
      '挂在整条伴奏或总线上，一个 UDG 旋钮推动磁带饱和、多段压缩、软削波、空间和镶边。脏、压得狠，但依然清楚。',
    features: ['磁带饱和 + 多段压缩', '软削波与空间', '两个旋钮搞定整轨', '免费下载'],
    status: 'free',
    price: 0,
    formats: ['VST3', 'AU'],
    platforms: ['macOS', 'Windows'],
    image: '/store/udg.jpg',
    imageAlt: 'UDG 插件界面',
    accent: '#9dff6a',
    preview: { dry: '/store/udg-dry.mp3', wet: '/store/udg-wet.mp3', dryLabel: 'DRY', wetLabel: 'UDG COMP MAX' },
    freeDownload: '',
  },
  {
    slug: 'spike-mix-hub',
    code: 'sp',
    name: 'SPIKE MIX HUB',
    kind: 'PLUGIN',
    short: '一个插件，三种模式：人声、鼓组、总线',
    summary:
      'UDG 的 Pro 版。VOCAL 把人声压紧推到前面，DRUM 让鼓和 808 更狠，MASTER 做响度、粘合和清晰度。每个模式 10 个出厂预设。',
    features: ['VOCAL / DRUM / MASTER 三种模式', '每个模式 10 个出厂预设', '一屏操作'],
    status: 'in-development',
    price: null,
    formats: ['VST3', 'AU'],
    platforms: ['macOS', 'Windows'],
    image: '/store/spike.webp',
    imageAlt: 'SPIKE MIX HUB 插件界面',
    accent: '#3dff5c',
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
  free: 'FREE',
  'on-sale': 'ON SALE',
  'in-development': 'IN DEV',
};

export function formatPrice(n: number) {
  return '¥' + n.toLocaleString('zh-CN');
}
