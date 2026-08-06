import { getSetting, setSetting, deleteSetting } from "@/lib/site-settings-repository";

const TEAM_PLACEHOLDER_IMAGE_KEY = "about_team_placeholder_image";

export function getTeamPlaceholderImage(): Promise<string | null> {
  return getSetting(TEAM_PLACEHOLDER_IMAGE_KEY);
}

export function setTeamPlaceholderImage(image: string): Promise<void> {
  return setSetting(TEAM_PLACEHOLDER_IMAGE_KEY, image);
}

export function clearTeamPlaceholderImage(): Promise<void> {
  return deleteSetting(TEAM_PLACEHOLDER_IMAGE_KEY);
}
