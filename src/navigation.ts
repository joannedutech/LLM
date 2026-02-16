import { getPermalink, getBlogPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: '所有文章',
      href: getBlogPermalink(),
    },
    {
      text: '分類',
      links: [
        {
          text: '投資知識',
          href: getPermalink('投資知識', 'category'),
        },
        {
          text: '產品管理',
          href: getPermalink('產品管理', 'category'),
        },
        {
          text: '讀書心得',
          href: getPermalink('讀書心得', 'category'),
        },
        {
          text: '人機互動',
          href: getPermalink('人機互動', 'category'),
        },
      ],
    },
    {
      text: '標籤總覽',
      href: getPermalink('/tags'),
    },
    {
      text: '搜尋',
      href: getPermalink('/search'),
    },
  ],
  actions: [],
};

export const footerData = {
  links: [],
  secondaryLinks: [],
  socialLinks: [],
  footNote: `
    陳孟真的blog — 投資知識・產品管理・讀書心得・人機互動
  `,
};
