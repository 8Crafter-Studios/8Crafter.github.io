const SitemapGenerator = require('sitemap-generator');

// create generator
const generator = SitemapGenerator('https://www.dev.8crafter.com/', {
  stripQuerystring: false
});

const crawler = generator.getCrawler()
const sitemap = generator.getSitemap()

sitemap.addURL('https://www.dev.8crafter.com/debug-sticks-add-on/andexdbnbtstructureloader.html')

generator.on('add', (url) => {
  console.log(url);
  // log url
});

// register event listeners
generator.on('done', () => {
  // sitemaps created
});

// start the crawler
generator.start();