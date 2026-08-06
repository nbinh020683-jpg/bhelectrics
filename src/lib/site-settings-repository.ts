import { getPool, ensureSchema } from "@/lib/db";
import type { RowDataPacket } from "mysql2";

export async function getSetting(key: string): Promise<string | null> {
  await ensureSchema();
  const pool = getPool();
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT setting_value AS value FROM site_settings WHERE setting_key = ? LIMIT 1",
    [key]
  );
  return rows[0]?.value ?? null;
}

export async function setSetting(key: string, value: string): Promise<void> {
  await ensureSchema();
  const pool = getPool();
  await pool.query(
    `INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
    [key, value]
  );
}

export async function deleteSetting(key: string): Promise<void> {
  await ensureSchema();
  const pool = getPool();
  await pool.query("DELETE FROM site_settings WHERE setting_key = ?", [key]);
}
