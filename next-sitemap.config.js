/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://cytogenesis.in",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ["/admin/*"],
};
