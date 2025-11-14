import { existsSync, write } from "node:fs";
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path, { matchesGlob } from "node:path";
import mime from "mime-types";
const sitemapConfig: typeof import("./sitemapConfig.json") = (await import("./sitemapConfig.json", { with: { type: "json" } })).default;

interface SitemapEntry {
    path: string;
    lastmod: string;
    changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" | undefined;
}

const sitemapEntries: SitemapEntry[] = [];

const fullSitemapEntries: SitemapEntry[] = [];

const nodeModulesFullSitemapEntries: SitemapEntry[] = [];

for (const file of readdirSync("./", {
    withFileTypes: true,
    recursive: true,
})) {
    if (!file.isFile()) continue;
    const filePath: string = path.join(file.parentPath, file.name);
    const rootRelativePath: string = path
        .relative("./", filePath)
        .replaceAll("\\", "/")
        .replace(/^(?:\\.\/|(?!\\.*\/))/, "/");
    if (sitemapConfig.exclude.some((entry) => matchesGlob(rootRelativePath, entry))) continue;
    (rootRelativePath.startsWith("/node_modules/") ? nodeModulesFullSitemapEntries : fullSitemapEntries).push({
        path: encodeURI(rootRelativePath).replaceAll("&", "&amp;").replaceAll("'", "&apos;"),
        lastmod: statSync(filePath).mtime.toISOString() /* .split("T")[0] */,
        changefreq: <SitemapEntry["changefreq"] | undefined>(
            sitemapConfig.changeFrequencies.find((entry) => new RegExp(entry.regex, entry.flags).test(rootRelativePath))?.changeFrequency
        ),
    });
    if (rootRelativePath.startsWith("/node_modules/")) continue;
    let mimeType: string | false = mime.lookup(rootRelativePath);
    if (!mimeType) continue;
    mimeType = mimeType.toLowerCase();
    if (
        !(
            mimeType.endsWith("/html") ||
            mimeType.startsWith("image/") ||
            mimeType.startsWith("audio/") ||
            (mimeType.startsWith("video/") && !["video/mp2t"].includes(mimeType))
        )
    )
        continue;
    sitemapEntries.push({
        path: encodeURI(rootRelativePath).replaceAll("&", "&amp;").replaceAll("'", "&apos;"),
        lastmod: statSync(filePath).mtime.toISOString() /* .split("T")[0] */,
        changefreq: <SitemapEntry["changefreq"] | undefined>(
            sitemapConfig.changeFrequencies.find((entry) => new RegExp(entry.regex, entry.flags).test(rootRelativePath))?.changeFrequency
        ),
    });
}

if (existsSync("index.html")) {
    sitemapEntries.unshift({
        path: "/",
        lastmod: statSync("index.html").mtime.toISOString() /* .split("T")[0] */,
        changefreq: undefined,
    });
    fullSitemapEntries.unshift({ ...sitemapEntries[0]! });
}

const sitemapContents = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
                        http://www.google.com/schemas/sitemap-news/0.9 http://www.google.com/schemas/sitemap-news/0.9/sitemap-news.xsd
                        http://www.google.com/schemas/sitemap-video/1.1 http://www.google.com/schemas/sitemap-video/1.1/sitemap-video.xsd"
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
    xmlns:xhtml="http://www.w3.org/1999/xhtml">${sitemapEntries.length > 0 ? "\n" : ""}${sitemapEntries
    .map(
        (sitemap: SitemapEntry): string =>
            `    <url>
        <loc>https://www.8crafter.com${sitemap.path}</loc>
        <lastmod>${sitemap.lastmod}</lastmod>${sitemap.changefreq ? `\n${" ".repeat(8)}<changefreq>${sitemap.changefreq}</changefreq>` : ""}
    </url>`
    )
    .join("\n")}
</urlset>` as const;

if (!existsSync("sitemap.xml") || sitemapContents !== readFileSync("sitemap.xml", "utf-8")) {
    writeFileSync("sitemap.xml", sitemapContents, "utf-8");
}

const fullSitemapContents = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
                        http://www.google.com/schemas/sitemap-news/0.9 http://www.google.com/schemas/sitemap-news/0.9/sitemap-news.xsd
                        http://www.google.com/schemas/sitemap-video/1.1 http://www.google.com/schemas/sitemap-video/1.1/sitemap-video.xsd"
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
    xmlns:xhtml="http://www.w3.org/1999/xhtml">${fullSitemapEntries.length > 0 ? "\n" : ""}${fullSitemapEntries
    .map(
        (sitemap: SitemapEntry): string =>
            `    <url>
        <loc>https://www.8crafter.com${sitemap.path}</loc>
        <lastmod>${sitemap.lastmod}</lastmod>${sitemap.changefreq ? `\n${" ".repeat(8)}<changefreq>${sitemap.changefreq}</changefreq>` : ""}
    </url>`
    )
    .join("\n")}
</urlset>` as const;

if (!existsSync("fullsite_index.xml") || fullSitemapContents !== readFileSync("fullsite_index.xml", "utf-8")) {
    writeFileSync("fullsite_index.xml", fullSitemapContents, "utf-8");
}

const nodeModulesSitemapContents = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
                        http://www.google.com/schemas/sitemap-news/0.9 http://www.google.com/schemas/sitemap-news/0.9/sitemap-news.xsd
                        http://www.google.com/schemas/sitemap-video/1.1 http://www.google.com/schemas/sitemap-video/1.1/sitemap-video.xsd"
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
    xmlns:xhtml="http://www.w3.org/1999/xhtml">${nodeModulesFullSitemapEntries.length > 0 ? "\n" : ""}${nodeModulesFullSitemapEntries
    .map(
        (sitemap: SitemapEntry): string =>
            `    <url>
        <loc>https://www.8crafter.com${sitemap.path}</loc>
        <lastmod>${sitemap.lastmod}</lastmod>${sitemap.changefreq ? `\n${" ".repeat(8)}<changefreq>${sitemap.changefreq}</changefreq>` : ""}
    </url>`
    )
    .join("\n")}
</urlset>` as const;

if (!existsSync("node_modules/fullsite_index.xml") || nodeModulesSitemapContents !== readFileSync("node_modules/fullsite_index.xml", "utf-8")) {
    writeFileSync("node_modules/fullsite_index.xml", nodeModulesSitemapContents, "utf-8");
}

const sitemapFiles: { path: string; lastmod: string }[] = [];

for (const filePath of [path.resolve("./sitemap.xml"), path.resolve("./fullsite_index.xml"), path.resolve("./node_modules/fullsite_index.xml")]) {
    const rootRelativePath: string = path
        .relative("./", filePath)
        .replaceAll("\\", "/")
        .replace(/^(?:\\.\/|(?!\\.*\/))/, "/");
    sitemapFiles.push({
        path: rootRelativePath,
        lastmod: statSync(filePath).mtime.toISOString() /* .split("T")[0] */,
    });
}

const sitemapIndexContents = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd"
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml">${sitemapFiles.length > 0 ? "\n" : ""}${sitemapFiles
    .map(
        (sitemap) =>
            `    <sitemap>
        <loc>https://www.8crafter.com${sitemap.path}</loc>
        <lastmod>${sitemap.lastmod}</lastmod>
    </sitemap>`
    )
    .join("\n")}
</sitemapindex>` as const;

if (!existsSync("sitemap_index.xml") || sitemapIndexContents !== readFileSync("sitemap_index.xml", "utf-8")) {
    writeFileSync("sitemap_index.xml", sitemapIndexContents, "utf-8");
}
