import glob from "fast-glob";
import * as path from "path";

async function importArticle(articleFilename: string) {
  let { meta, default: component } = await import(
    `../app/articles/${articleFilename}`
  );
  return {
    slug: articleFilename.replace(/(\/index)?\.mdx$/, ""),
    ...meta,
    component,
  };
}

interface Article {
  date: Date;
  slug: string;
  title: string;
  component: React.ComponentType;
}

export async function getAllArticles(): Promise<Article[]> {
  let articleFilenames = await glob(["*.mdx", "*/index.mdx"], {
    cwd: path.join(process.cwd(), "app/articles"),
  });

  let articles = await Promise.all(articleFilenames.map(importArticle));

  return articles.sort(
    (a, z) => new Date(z.date).getTime() - new Date(a.date).getTime()
  );
}
