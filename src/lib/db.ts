import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";
import { blogSeedPosts } from "@/lib/blog-seed";

const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, "app.db");

declare global {
  var __bhDb: DatabaseSync | undefined;
}

function createConnection() {
  const database = new DatabaseSync(dbPath);
  database.exec("PRAGMA journal_mode = WAL;");
  database.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL DEFAULT '',
      meta_description TEXT NOT NULL DEFAULT '',
      category TEXT NOT NULL DEFAULT 'General',
      content_markdown TEXT NOT NULL DEFAULT '',
      cover_image_path TEXT,
      status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
      published_at TEXT,
      created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
      updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
    );
  `);

  const { count } = database.prepare("SELECT COUNT(*) as count FROM posts").get() as {
    count: number;
  };

  if (count === 0) {
    const insert = database.prepare(`
      INSERT INTO posts
        (slug, title, excerpt, meta_description, category, content_markdown, status, published_at)
      VALUES (?, ?, ?, ?, ?, ?, 'published', ?)
    `);
    for (const post of blogSeedPosts) {
      insert.run(
        post.slug,
        post.title,
        post.excerpt,
        post.metaDescription,
        post.category,
        post.contentMarkdown,
        `${post.publishedAt}T09:00:00.000Z`
      );
    }
  }

  return database;
}

export function getDb(): DatabaseSync {
  if (!global.__bhDb) {
    global.__bhDb = createConnection();
  }
  return global.__bhDb;
}
