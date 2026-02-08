import { useRouter } from "next/router";

const metaTags = (
  <>
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <meta
      name="description"
      content="从零开始学习美股投资，掌握 DCF 估值、财报分析等核心技能"
    />
    <meta name="keywords" content="美股投资, 投资教程, DCF估值, 财报分析, 自由现金流, 股票估值" />
    <meta property="og:title" content="美股投资教程" />
    <meta property="og:description" content="从零开始学习美股投资，掌握 DCF 估值、财报分析等核心技能" />
  </>
);

const config = {
  head: metaTags,
  logo: <span>美股投资教程</span>,
  project: {
    link: "https://github.com/YaokunLee/invest-tutorial",
  },
  docsRepositoryBase:
    "https://github.com/YaokunLee/invest-tutorial/blob/main",
  search: {
    placeholder: "搜索",
  },
  sidebar: {
    toggleButton: true,
  },
  toc: {
    backToTop: true,
  },
  editLink: { component: () => null },
  feedback: { content: null },
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath === "/") {
      return {
        titleTemplate: "美股投资教程",
      };
    }

    return {
      titleTemplate: "%s - 美股投资教程",
    };
  },
  gitTimestamp: null,
  footer: {
    text: (
      <span>
        <a
          href="https://github.com/YaokunLee/invest-tutorial/blob/main/LICENSE"
          target="_blank"
        >
          MIT License - Copyright (c) 2025
        </a>
      </span>
    ),
  },
};

export default config;
