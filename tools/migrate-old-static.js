const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const TurndownService = require('turndown');

const repoRoot = path.resolve(__dirname, '..');
const oldRoot = process.env.OLD_BLOG_ROOT || 'D:\\Codex\\myweb_page\\song-xudong.github.io\\song-xudong.github.io-main';
const postsDir = path.join(repoRoot, 'source', '_posts');

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
});

turndown.addRule('keepTables', {
  filter: ['table', 'thead', 'tbody', 'tr', 'th', 'td'],
  replacement: (_content, node) => node.outerHTML,
});

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function cleanFileName(name) {
  return name.replace(/[<>:"/\\|?*\u0000-\u001F]/g, '-').replace(/\s+/g, ' ').trim();
}

function yamlString(value) {
  return JSON.stringify(String(value ?? ''));
}

function yamlArray(values) {
  const unique = [...new Set(values.filter(Boolean).map((item) => String(item).trim()).filter(Boolean))];
  if (!unique.length) return '[]';
  return `\n${unique.map((item) => `  - ${yamlString(item)}`).join('\n')}`;
}

function normalizeLocalUrl(url) {
  if (!url) return '';
  return url
    .replace(/^https?:\/\/song-xudong\.github\.io/i, '')
    .replace(/index\.html$/i, '')
    .trim();
}

function toChinaDateTime(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value).slice(0, 19).replace('T', ' ');
  const china = new Date(date.getTime() + 8 * 60 * 60 * 1000);
  const pad = (n) => String(n).padStart(2, '0');
  return `${china.getUTCFullYear()}-${pad(china.getUTCMonth() + 1)}-${pad(china.getUTCDate())} ${pad(china.getUTCHours())}:${pad(china.getUTCMinutes())}:${pad(china.getUTCSeconds())}`;
}

function normalizeImages($, root) {
  root.find('img').each((_index, img) => {
    const $img = $(img);
    const lazy = $img.attr('data-lazy-src');
    const src = normalizeLocalUrl(lazy || $img.attr('src') || '');
    if (src) $img.attr('src', src);
    $img.removeAttr('data-lazy-src');
    $img.removeAttr('onerror');
    $img.removeAttr('data-pjax-state');
    if (!$img.attr('alt')) $img.attr('alt', '');
  });
}

function textList($, selector) {
  return $(selector)
    .map((_index, el) => $(el).text().replace(/^#/, '').trim())
    .get()
    .filter(Boolean);
}

function descriptionFrom($) {
  const desc = $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content') || '';
  return desc.replace(/\s+/g, ' ').trim().slice(0, 180);
}

function migratePosts() {
  ensureDir(postsDir);
  for (const file of fs.readdirSync(postsDir)) {
    if (file.endsWith('.md')) fs.unlinkSync(path.join(postsDir, file));
  }

  const htmlFiles = walk(oldRoot).filter((file) => {
    const rel = path.relative(oldRoot, file).replace(/\\/g, '/');
    return /^\d{4}\/\d{2}\/\d{2}\/[^/]+\/index\.html$/.test(rel);
  });

  const migrated = [];
  for (const file of htmlFiles) {
    const rel = path.relative(oldRoot, file).replace(/\\/g, '/');
    const oldSlug = rel.split('/')[3];
    const html = fs.readFileSync(file, 'utf8');
    const $ = cheerio.load(html, { decodeEntities: false });
    const article = $('article#article-container');
    if (!article.length) continue;

    article.find('header').first().remove();
    article.find('.headerlink').remove();
    article.find('script,noscript').remove();
    normalizeImages($, article);

    const title = $('.post-title').first().text().trim()
      || $('#CrawlerTitle').first().text().trim()
      || $('meta[property="og:title"]').attr('content')
      || decodeURIComponent(rel.split('/')[3]);
    const date = toChinaDateTime($('time.post-meta-date-created').first().attr('datetime') || $('time[itemprop*="datePublished"]').first().attr('datetime'));
    const updated = toChinaDateTime($('time.post-meta-date-updated').first().attr('datetime'));
    const categories = textList($, '#post-info .post-meta-categories a').slice(0, 1);
    const tags = textList($, '#post-info .article-meta__tags span');
    const cover = normalizeLocalUrl($('#post-top-bg').attr('src') || $('meta[property="og:image"]').attr('content') || '');
    const description = descriptionFrom($);

    const markdown = turndown.turndown(article.html() || '').replace(/\n{3,}/g, '\n\n').trim();
    const outFile = path.join(postsDir, `${cleanFileName(oldSlug || title)}.md`);
    const frontMatter = [
      '---',
      `title: ${yamlString(title)}`,
      `date: ${date || '2024-01-01 00:00:00'}`,
      updated ? `updated: ${updated}` : '',
      `categories:${yamlArray(categories)}`,
      `tags:${yamlArray(tags)}`,
      cover ? `cover: ${yamlString(cover)}` : '',
      description ? `description: ${yamlString(description)}` : '',
      '---',
      '',
    ].filter((line) => line !== '').join('\n');

    fs.writeFileSync(outFile, `${frontMatter}\n\n${markdown}\n`, 'utf8');
    migrated.push({ title, rel, out: path.relative(repoRoot, outFile), categories, tags });
  }
  return migrated;
}

function extractPageContent(pagePath, selector) {
  const html = fs.readFileSync(path.join(oldRoot, pagePath, 'index.html'), 'utf8');
  const $ = cheerio.load(html, { decodeEntities: false });
  const root = $(selector).first();
  normalizeImages($, root);
  root.find('script').remove();
  return root.html() ? root.toString() : '';
}

function migratePages() {
  ensureDir(path.join(repoRoot, 'source', 'about'));
  ensureDir(path.join(repoRoot, 'source', 'comments'));

  const aboutContent = extractPageContent('about', '#about-page');
  fs.writeFileSync(
    path.join(repoRoot, 'source', 'about', 'index.md'),
    [
      '---',
      'title: 关于本人',
      'date: 2024-10-11 00:00:00',
      'comments: false',
      'aside: true',
      '---',
      '',
      aboutContent,
      '',
    ].join('\n'),
    'utf8',
  );

  const commentsContent = extractPageContent('comments', '#article-container');
  fs.writeFileSync(
    path.join(repoRoot, 'source', 'comments', 'index.md'),
    [
      '---',
      'title: 留言板',
      'date: 2024-10-11 00:00:00',
      'type: envelope',
      'comments: false',
      'aside: true',
      '---',
      '',
      commentsContent,
      '',
    ].join('\n'),
    'utf8',
  );
}

function main() {
  if (!fs.existsSync(oldRoot)) {
    throw new Error(`Old blog root not found: ${oldRoot}`);
  }
  const posts = migratePosts();
  migratePages();
  console.log(`Migrated ${posts.length} posts from ${oldRoot}`);
  for (const post of posts) {
    console.log(`- ${post.title} -> ${post.out}`);
  }
}

main();
