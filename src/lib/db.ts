import mysql from "mysql2/promise";
import { blogSeedPosts } from "@/lib/blog-seed";

declare global {
  var __bhPool: mysql.Pool | undefined;
  var __bhSchemaReady: Promise<void> | undefined;
}

function createPool(): mysql.Pool {
  const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
  if (!DB_HOST || !DB_USER || !DB_NAME) {
    throw new Error(
      "Database is not configured. Set DB_HOST, DB_USER, DB_PASSWORD, and DB_NAME env vars (see .env.example)."
    );
  }

  return mysql.createPool({
    host: DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
    charset: "utf8mb4",
  });
}

export function getPool(): mysql.Pool {
  if (!global.__bhPool) {
    global.__bhPool = createPool();
  }
  return global.__bhPool;
}

async function initSchema(): Promise<void> {
  const pool = getPool();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS posts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      slug VARCHAR(255) NOT NULL UNIQUE,
      title VARCHAR(500) NOT NULL,
      excerpt TEXT,
      meta_description TEXT,
      category VARCHAR(255) NOT NULL DEFAULT 'General',
      content_markdown LONGTEXT NOT NULL,
      cover_image LONGTEXT,
      status ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
      published_at DATETIME NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  const [rows] = await pool.query<mysql.RowDataPacket[]>("SELECT COUNT(*) AS count FROM posts");
  const count = rows[0]?.count ?? 0;

  if (count === 0) {
    for (const post of blogSeedPosts) {
      await pool.query(
        `INSERT INTO posts
          (slug, title, excerpt, meta_description, category, content_markdown, status, published_at)
         VALUES (?, ?, ?, ?, ?, ?, 'published', ?)`,
        [
          post.slug,
          post.title,
          post.excerpt,
          post.metaDescription,
          post.category,
          post.contentMarkdown,
          `${post.publishedAt} 09:00:00`,
        ]
      );
    }
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS gallery_images (
      id INT AUTO_INCREMENT PRIMARY KEY,
      caption VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL DEFAULT 'General',
      image_data LONGTEXT NOT NULL,
      sort_order INT NOT NULL DEFAULT 0,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
}

export function ensureSchema(): Promise<void> {
  if (!global.__bhSchemaReady) {
    global.__bhSchemaReady = initSchema().catch((error) => {
      // Allow retrying on the next call instead of caching a permanent failure.
      global.__bhSchemaReady = undefined;
      throw error;
    });
  }
  return global.__bhSchemaReady;
}
