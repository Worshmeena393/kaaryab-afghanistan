import { opportunities } from "@/data/opportunities";

const STORAGE_KEY = "kaarYab-opportunities";
const FAVORITES_KEY = "kaarYab-favorites";
const MESSAGES_KEY = "kaarYab-messages";

const formatDate = (dateStr) => {
  if (!dateStr) return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const safeRead = (key, fallback) => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch (err) {
    console.warn(`[storage] Failed to parse ${key}, resetting.`, err);
    try {
      localStorage.removeItem(key);
    } catch {
      /* noop */
    }
    return fallback;
  }
};

const safeWrite = (key, value) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`[storage] Failed to write ${key}.`, err);
  }
};

const normalizeId = (id) => (id == null ? id : String(id));

export function getStoredOpportunities() {
  if (typeof window === "undefined") return opportunities;

  const stored = safeRead(STORAGE_KEY, null);

  if (!stored) {
    safeWrite(STORAGE_KEY, opportunities);
    return opportunities;
  }

  const defaultMap = new Map(opportunities.map((item) => [normalizeId(item.id), item]));

  const migratedStored = stored.map((storedItem) => {
    const normalizedStoredId = normalizeId(storedItem.id);
    const defaultItem = normalizedStoredId != null ? defaultMap.get(normalizedStoredId) : undefined;
    let mergedItem = storedItem;
    if (defaultItem) {
      mergedItem = { ...defaultItem, ...storedItem };
    }
    return {
      id: normalizedStoredId ?? (defaultItem && normalizeId(defaultItem.id)) ?? String(Date.now() + Math.random()),
      title: "Untitled Opportunity",
      organization: "Unknown Organization",
      category: "Job",
      location: "Remote",
      type: "Remote",
      deadline: formatDate(mergedItem.deadline),
      description: "No description provided.",
      requirements: [],
      applyLink: "https://example.com/apply",
      tags: [],
      ...mergedItem,
    };
  });

  const storedIds = new Set(migratedStored.map((item) => item.id));
  const missingDefaults = opportunities.filter((item) => !storedIds.has(normalizeId(item.id)));

  const updated = [...migratedStored, ...missingDefaults];
  safeWrite(STORAGE_KEY, updated);
  return updated;
}

export function saveOpportunities(list) {
  safeWrite(STORAGE_KEY, list);
}

export function getOpportunityById(id) {
  const targetId = normalizeId(id);
  const list = getStoredOpportunities();
  return list.find((item) => normalizeId(item.id) === targetId) || null;
}

export function addOpportunity(entry) {
  const current = getStoredOpportunities();
  const enriched = { ...entry, id: normalizeId(entry.id) ?? crypto.randomUUID?.() ?? String(Date.now() + Math.random()) };
  const updated = [enriched, ...current];
  saveOpportunities(updated);
  return updated;
}

export function updateOpportunity(updatedItem) {
  const current = getStoredOpportunities();
  const targetId = normalizeId(updatedItem.id);
  const updated = current.map((item) =>
    normalizeId(item.id) === targetId ? { ...updatedItem, id: targetId } : item
  );
  saveOpportunities(updated);
  return updated;
}

export function deleteOpportunity(id) {
  const current = getStoredOpportunities();
  const targetId = normalizeId(id);
  const updated = current.filter((item) => normalizeId(item.id) !== targetId);
  saveOpportunities(updated);
  return updated;
}

export function getFavorites() {
  if (typeof window === "undefined") return [];
  return safeRead(FAVORITES_KEY, []);
}

export function toggleFavorite(item) {
  if (typeof window === "undefined") return [];
  const list = getFavorites();
  const targetId = normalizeId(item.id);
  const exists = list.some((favorite) => normalizeId(favorite.id) === targetId);
  const updated = exists
    ? list.filter((favorite) => normalizeId(favorite.id) !== targetId)
    : [{ ...item, id: targetId }, ...list];
  safeWrite(FAVORITES_KEY, updated);
  return updated;
}

export function deleteFavorite(id) {
  if (typeof window === "undefined") return [];
  const list = getFavorites();
  const targetId = normalizeId(id);
  const updated = list.filter((favorite) => normalizeId(favorite.id) !== targetId);
  safeWrite(FAVORITES_KEY, updated);
  return updated;
}

export function clearFavorites() {
  if (typeof window === "undefined") return [];
  try {
    localStorage.removeItem(FAVORITES_KEY);
  } catch {
    /* noop */
  }
  return [];
}

export function isFavorite(id) {
  if (typeof window === "undefined") return false;
  const targetId = normalizeId(id);
  return getFavorites().some((item) => normalizeId(item.id) === targetId);
}

export function getMessages() {
  if (typeof window === "undefined") return [];
  return safeRead(MESSAGES_KEY, []);
}

export function saveMessage(message) {
  if (typeof window === "undefined") return [];
  const current = getMessages();
  const updated = [
    { ...message, id: message.id ?? String(Date.now() + Math.random()) },
    ...current,
  ];
  safeWrite(MESSAGES_KEY, updated);
  return updated;
}

export function deleteMessage(id) {
  if (typeof window === "undefined") return [];
  const list = getMessages();
  const targetId = normalizeId(id);
  const updated = list.filter((message) => normalizeId(message.id) !== targetId);
  safeWrite(MESSAGES_KEY, updated);
  return updated;
}

export function clearMessages() {
  if (typeof window === "undefined") return [];
  try {
    localStorage.removeItem(MESSAGES_KEY);
  } catch {
    /* noop */
  }
  return [];
}

export function getTheme() {
  if (typeof window === "undefined") return "light";
  try {
    return localStorage.getItem("kaarYab-theme") || "light";
  } catch {
    return "light";
  }
}

export function saveTheme(theme) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("kaarYab-theme", theme);
  } catch {
    /* noop */
  }
}
