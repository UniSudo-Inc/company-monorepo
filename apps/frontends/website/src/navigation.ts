import { getPermalink } from './utils/permalinks';

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
          href: getPermalink('/roadmap'),
        },
        {
          text: '技术创新',
          href: getPermalink('/technology'),
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
          text: '数字人展厅',
          href: getPermalink('/solutions/digital-human'),
        },
        {
          text: '数据服务',
          href: getPermalink('/solutions/data-service'),
        },
        {
          text: '模型训练',
          href: getPermalink('/solutions/model-training'),
        },
        {
          text: '智能客服',
          href: getPermalink('/solutions/customer-service'),
        },
        {
          text: '企业数智化',
          href: getPermalink('/solutions/enterprise-digitalization'),
        },
        {
          text: '行业解决方案',
          href: getPermalink('/solutions/industry-solutions'),
        },
      ],
    },
    {
      text: '产品体系',
      links: [
        {
          text: 'UniChat',
          href: getPermalink('/products/unichat'),
        },
        {
          text: 'A1 Platform',
          href: 'https://a1.unisudo.dev/landing-page',
        },
        // {
        //   text: 'UniSpeech',
        //   href: getPermalink('/speech'),
        // },
        {
          text: 'UniData',
          href: 'https://datai.unisudo.com/',
        },
        {
          text: '数据标注服务',
          href: 'http://120.27.240.221:32051',
        },
        // {
        //   text: '智能硬件服务',
        //   href: getPermalink('/hardware'),
        // },
      ],
    },
    {
      text: '联系我们',
      href: getPermalink('/contact'),
    },
  ],
  actions: [{ text: '加入我们', href: getPermalink('/career'), target: '_blank' }],
};

export const headerDataEn = {
  links: [
    {
      text: 'About Us',
      links: [
        {
          text: 'Company Profile',
          href: getPermalink('/en/about'),
        },
        {
          text: 'Roadmap',
          href: getPermalink('/en/roadmap'),
        },
        {
          text: 'Technology Innovation',
          href: getPermalink('/en/technology'),
        },
        {
          text: 'Contact Us',
          href: getPermalink('/en/contact'),
        },
        {
          text: 'Join Us',
          href: getPermalink('/en/career'),
        },
      ],
    },
    {
      text: 'Solutions',
      links: [
        {
          text: 'Digital Human Exhibition',
          href: getPermalink('/en/solutions/digital-human'),
        },
        {
          text: 'Data Service',
          href: getPermalink('/en/solutions/data-service'),
        },
        {
          text: 'Model Training',
          href: getPermalink('/en/solutions/model-training'),
        },
        {
          text: 'Customer Service',
          href: getPermalink('/en/solutions/customer-service'),
        },
        {
          text: 'Enterprise Digitalization',
          href: getPermalink('/en/solutions/enterprise-digitalization'),
        },
        {
          text: 'Industry Solutions',
          href: getPermalink('/en/solutions/industry-solutions'),
        },
      ],
    },
    {
      text: 'Product System',
      links: [
        {
          text: 'UniChat',
          href: getPermalink('/en/products/unichat'),
        },
        {
          text: 'A1 Platform',
          href: 'https://a1.unisudo.dev/landing-page',
        },
        // {
        //   text: 'UniSpeech',
        //   href: getPermalink('/en/speech'),
        // },
        {
          text: 'UniData',
          href: 'https://datai.unisudo.com/',
        },
        {
          text: 'Data Annotation Service',
          href: 'http://120.27.240.221:32051',
        },
        // {
        //   text: 'Smart Hardware Service',
        //   href: getPermalink('/en/hardware'),
        // },
      ],
    },
    {
      text: 'Contact Us',
      href: getPermalink('/en/contact'),
    },
  ],
  actions: [{ text: 'Join Us', href: getPermalink('/en/career'), target: '_blank' }],
};

export const footerData = {
  links: [
    {
      title: '产品体系',
      links: [
        {
          text: 'UniChat',
          href: getPermalink('/products/unichat'),
        },
        {
          text: 'A1 Platform',
          href: 'https://a1.unisudo.dev/landing-page',
        },
        // {
        //   text: 'UniSpeech',
        //   href: getPermalink('/en/speech'),
        // },
        {
          text: 'UniData',
          href: 'https://datai.unisudo.com/',
        },
        {
          text: '数据标注服务',
          href: 'http://120.27.240.221:32051',
        },
        // {
        //   text: '智能硬件服务',
        //   href: getPermalink('/hardware'),
        // },
      ],
    },
    {
      text: '解决方案',
      links: [
        {
          text: '数字人展厅',
          href: getPermalink('/solutions/digital-human'),
        },
        {
          text: '数据服务',
          href: getPermalink('/solutions/data-service'),
        },
        {
          text: '模型训练',
          href: getPermalink('/solutions/model-training'),
        },
        {
          text: '智能客服',
          href: getPermalink('/solutions/customer-service'),
        },
        {
          text: '企业数智化',
          href: getPermalink('/solutions/enterprise-digitalization'),
        },
        {
          text: '行业解决方案',
          href: getPermalink('/solutions/industry-solutions'),
        },
      ],
    },
    {
      text: '关于我们',
      links: [
        {
          text: '公司简介',
          href: getPermalink('/about'),
        },
        {
          text: '发展历程',
          href: getPermalink('/roadmap'),
        },
        {
          text: '技术创新',
          href: getPermalink('/technology'),
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
    // { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/UniSudo-Inc' },
  ],
  footNote: `
    <p>© ${new Date().getFullYear()} 上海智独数科技有限公司<\p>
    <p>沪ICP备2024105225号<\p>
  `,
};

export const footerDataEn = {
  links: [
    {
      title: 'Product System',
      links: [
        {
          text: 'UniChat',
          href: getPermalink('/products/unichat'),
        },
        {
          text: 'A1 Platform',
          href: 'https://a1.unisudo.dev/landing-page',
        },
        // {
        //   text: 'UniSpeech',
        //   href: getPermalink('/en/speech'),
        // },
        {
          text: 'UniData',
          href: 'https://datai.unisudo.com/',
        },
        {
          text: 'Data Annotation Service',
          href: 'http://120.27.240.221:32051',
        },
        // {
        //   text: 'Smart Hardware Service',
        //   href: getPermalink('/en/hardware'),
        // },
      ],
    },
    {
      title: 'Solutions',
      links: [
        {
          text: 'Digital Human Exhibition',
          href: getPermalink('/en/solutions/digital-human'),
        },
        {
          text: 'Data Service',
          href: getPermalink('/en/solutions/data-service'),
        },
        {
          text: 'Model Training',
          href: getPermalink('/en/solutions/model-training'),
        },
        {
          text: 'Customer Service',
          href: getPermalink('/en/solutions/customer-service'),
        },
        {
          text: 'Enterprise Digitalization',
          href: getPermalink('/en/solutions/enterprise-digitalization'),
        },
        {
          text: 'Industry Solutions',
          href: getPermalink('/en/solutions/industry-solutions'),
        },
      ],
    },
    {
      title: 'About Us',
      links: [
        {
          text: 'Company Profile',
          href: getPermalink('/en/about'),
        },
        {
          text: 'Roadmap',
          href: getPermalink('/en/roadmap'),
        },
        {
          text: 'Technology Innovation',
          href: getPermalink('/en/technology'),
        },
        {
          text: 'Contact Us',
          href: getPermalink('/en/contact'),
        },
        {
          text: 'Join Us',
          href: getPermalink('/en/career'),
        },
      ],
    },
    {
      title: 'Contact Us',
      links: [
        {
          text: 'Business Cooperation',
          href: 'mailto:contact@unisudo.com',
        },
        {
          text: 'Customer Support',
          href: 'mailto:support@unisudo.com',
        },
        {
          text: 'Media Consulting',
          href: 'mailto:media@unisudo.com',
        },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms of Service', href: getPermalink('/en/terms') },
    { text: 'Privacy Policy', href: getPermalink('/en/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    // { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/UniSudo-Inc' },
  ],
  footNote: `<p>© ${new Date().getFullYear()} UniSudo, Inc.<\p>`,
};
