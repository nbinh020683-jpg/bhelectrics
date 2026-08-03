import type { RowDataPacket } from "mysql2";
import { getPool, ensureSchema } from "@/lib/db";

export type GalleryImage = {
  id: number;
  caption: string;
  category: string;
  imageData: string;
  sortOrder: number;
  createdAt: string;
};

interface GalleryImageRow extends RowDataPacket {
  id: number;
  caption: string;
  category: string;
  image_data: string;
  sort_order: number;
  created_at: string;
}

function mapRow(row: GalleryImageRow): GalleryImage {
  return {
    id: row.id,
    caption: row.caption,
    category: row.category,
    imageData: row.image_data,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
  };
}

export async function getAllGalleryImages(): Promise<GalleryImage[]> {
  await ensureSchema();
  const [rows] = await getPool().query<GalleryImageRow[]>(
    "SELECT * FROM gallery_images ORDER BY sort_order ASC, created_at DESC"
  );
  return rows.map(mapRow);
}

export type GalleryImageInput = {
  caption: string;
  category: string;
  imageData: string;
};

export async function createGalleryImage(input: GalleryImageInput): Promise<GalleryImage> {
  await ensureSchema();
  const pool = getPool();

  const [maxRows] = await pool.query<RowDataPacket[]>(
    "SELECT COALESCE(MAX(sort_order), 0) AS maxOrder FROM gallery_images"
  );
  const nextOrder = (maxRows[0]?.maxOrder ?? 0) + 1;

  const [result] = await pool.query(
    `INSERT INTO gallery_images (caption, category, image_data, sort_order) VALUES (?, ?, ?, ?)`,
    [input.caption, input.category, input.imageData, nextOrder]
  );

  const insertId = (result as { insertId: number }).insertId;
  const [rows] = await pool.query<GalleryImageRow[]>(
    "SELECT * FROM gallery_images WHERE id = ?",
    [insertId]
  );
  return mapRow(rows[0]);
}

export async function deleteGalleryImage(id: number): Promise<void> {
  await ensureSchema();
  await getPool().query("DELETE FROM gallery_images WHERE id = ?", [id]);
}

export async function getGalleryImageById(id: number): Promise<GalleryImage | undefined> {
  await ensureSchema();
  const [rows] = await getPool().query<GalleryImageRow[]>(
    "SELECT * FROM gallery_images WHERE id = ? LIMIT 1",
    [id]
  );
  return rows[0] ? mapRow(rows[0]) : undefined;
}
