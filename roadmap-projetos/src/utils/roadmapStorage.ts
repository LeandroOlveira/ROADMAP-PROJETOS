import type { Project } from "../types/Roadmap"

const STORAGE_KEY = "roadmap-projects"

export function saveRoadmap(projects: Project[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
}

export function loadRoadmap(): Project[] | null {
  const data = localStorage.getItem(STORAGE_KEY)
  if (!data) return null

  try {
    return JSON.parse(data) as Project[]
  } catch {
    return null
  }
}

export function clearRoadmap() {
  localStorage.removeItem(STORAGE_KEY)
}
