import { getPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: '关于我们',
      links: [
        {
          text: '公司简介',
          href: getPermalink('/about'),
        },
        {
          text: '发展历程',
          href: getPermalink('/homes/startup'),
        },
        {
          text: '团队介绍',
          href: getPermalink('/team'),
        },
        {
          text: '联系我们',
          href: getPermalink('/contact'),
        },
        {
          text: '加入我们',
          href: getPermalink('/career'),
        },
      ],
    },
    {
      text: '解决方案',
      links: [
        {
          text: '智能制造',
          href: getPermalink('/solutions/industry'),
        },
        {
          text: '智慧交通',
          href: getPermalink('/solutions/transport'),
        },
        {
          text: '智能客服',
          href: getPermalink('/solutions/customer-service'),
        },
        {
          text: '企业服务',
          href: getPermalink('/solutions/enterprise'),
        },
      ],
    },
    {
      text: '产品体系',
      links: [
        {
          text: 'UniChat',
          href: getPermalink('/chat'),
        },
        {
          text: 'UniStudio',
          href: getPermalink('/studio'),
        },
        {
          text: 'UniSpeech',
          href: getPermalink('/speech'),
        },
        {
          text: 'UniData',
          href: getPermalink('/data'),
        },
        {
          text: '数据标注服务',
          href: getPermalink('/labeling'),
        },
        {
          text: '智能硬件服务',
          href: getPermalink('/hardware'),
        },
      ],
    },
    {
      text: '联系我们',
      href: '/contact',
    },
  ],
  actions: [{ text: '加入我们', href: '/career', target: '_blank' }],
};

export const footerData = {
  links: [
    {
      title: '产品体系',
      links: [
        {
          text: 'UniChat',
          href: getPermalink('/chat'),
        },
        {
          text: 'UniStudio',
          href: getPermalink('/studio'),
        },
        {
          text: 'UniSpeech',
          href: getPermalink('/speech'),
        },
        {
          text: 'UniData',
          href: getPermalink('/data'),
        },
        {
          text: '数据标注服务',
          href: getPermalink('/labeling'),
        },
        {
          text: '智能硬件服务',
          href: getPermalink('/hardware'),
        },
      ],
    },
    {
      title: '解决方案',
      links: [
        {
          text: '智能制造',
          href: getPermalink('/solutions/industry'),
        },
        {
          text: '智慧交通',
          href: getPermalink('/solutions/transport'),
        },
        {
          text: '智能客服',
          href: getPermalink('/solutions/customer-service'),
        },
        {
          text: '企业服务',
          href: getPermalink('/solutions/enterprise'),
        },
      ],
    },
    {
      title: '关于我们',
      links: [
        {
          text: '公司简介',
          href: getPermalink('/about'),
        },
        {
          text: '发展历程',
          href: getPermalink('/homes/startup'),
        },
        {
          text: '团队介绍',
          href: getPermalink('/team'),
        },
        {
          text: '加入我们',
          href: getPermalink('/career'),
        },
      ],
    },
    {
      title: '联系我们',
      links: [
        {
          text: '商务合作',
          href: 'mailto:contact@unisudo.com',
        },
        {
          text: '客户支持',
          href: 'mailto:support@unisudo.com',
        },
        {
          text: '媒体咨询',
          href: 'mailto:media@unisudo.com',
        },
      ],
    },
  ],
  secondaryLinks: [
    { text: '服务条款', href: getPermalink('/terms') },
    { text: '隐私政策', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/UniSudo-Inc' },
  ],
  footNote: `
    <img class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm" src="https://onwidget.com/favicon/favicon-32x32.png" alt="onWidget logo" loading="lazy"></img>
    Made by <a class="text-blue-600 underline dark:text-muted" href="https://onwidget.com/"> onWidget</a> · All rights reserved.
  `,
};
