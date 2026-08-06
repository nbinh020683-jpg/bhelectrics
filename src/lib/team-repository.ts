import type { RowDataPacket } from "mysql2";
import { getPool, ensureSchema } from "@/lib/db";

export type TeamMember = {
  id: number;
  name: string;
  role: string;
  bio: string;
  photoData: string | null;
  sortOrder: number;
  createdAt: string;
};

interface TeamMemberRow extends RowDataPacket {
  id: number;
  name: string;
  role: string;
  bio: string | null;
  photo_data: string | null;
  sort_order: number;
  created_at: string;
}

function mapRow(row: TeamMemberRow): TeamMember {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    bio: row.bio ?? "",
    photoData: row.photo_data,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
  };
}

export async function getAllTeamMembers(): Promise<TeamMember[]> {
  await ensureSchema();
  const [rows] = await getPool().query<TeamMemberRow[]>(
    "SELECT * FROM team_members ORDER BY sort_order ASC, created_at ASC"
  );
  return rows.map(mapRow);
}

export type TeamMemberInput = {
  name: string;
  role: string;
  bio: string;
  photoData: string | null;
};

export async function createTeamMember(input: TeamMemberInput): Promise<TeamMember> {
  await ensureSchema();
  const pool = getPool();

  const [maxRows] = await pool.query<RowDataPacket[]>(
    "SELECT COALESCE(MAX(sort_order), 0) AS maxOrder FROM team_members"
  );
  const nextOrder = (maxRows[0]?.maxOrder ?? 0) + 1;

  const [result] = await pool.query(
    `INSERT INTO team_members (name, role, bio, photo_data, sort_order) VALUES (?, ?, ?, ?, ?)`,
    [input.name, input.role, input.bio, input.photoData, nextOrder]
  );

  const insertId = (result as { insertId: number }).insertId;
  const [rows] = await pool.query<TeamMemberRow[]>(
    "SELECT * FROM team_members WHERE id = ?",
    [insertId]
  );
  return mapRow(rows[0]);
}

export async function deleteTeamMember(id: number): Promise<void> {
  await ensureSchema();
  await getPool().query("DELETE FROM team_members WHERE id = ?", [id]);
}

export async function getTeamMemberById(id: number): Promise<TeamMember | undefined> {
  await ensureSchema();
  const [rows] = await getPool().query<TeamMemberRow[]>(
    "SELECT * FROM team_members WHERE id = ? LIMIT 1",
    [id]
  );
  return rows[0] ? mapRow(rows[0]) : undefined;
}
