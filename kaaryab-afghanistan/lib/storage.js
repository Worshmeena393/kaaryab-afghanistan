import { opportunities } from "@/data/opportunities";

const STORAGE_KEY = "kaarYab-opportunities";
const FAVORITES_KEY = "kaarYab-favorites";
const MESSAGES_KEY = "kaarYab-messages";
const THEME_KEY = "kaarYab-theme";
const LANGUAGE_KEY = "kaarYab-language";
const SEED_USER_STATE_KEY = "kaarYab-seed-user-state";

const SERVER_MAP_KEYS = new Set([
  STORAGE_KEY,
  FAVORITES_KEY,
  MESSAGES_KEY,
  THEME_KEY,
  LANGUAGE_KEY,
]);

const serverStore = new Map();

const ensureServerBucket = (key, fallback) => {
  if (!SERVER_MAP_KEYS.has(key)) return fallback;
  if (!serverStore.has(key)) {
    if (key === STORAGE_KEY) {
      serverStore.set(
        key,
        JSON.parse(JSON.stringify(Array.isArray(fallback) ? fallback : opportunities)),
      );
    } else if (Array.isArray(fallback)) {
      serverStore.set(key, JSON.parse(JSON.stringify(fallback)));
    } else {
      serverStore.set(key, fallback);
    }
  }
  return serverStore.get(key);
};

const formatDate = (dateStr) => {
  if (!dateStr) return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const safeParseArray = (raw) => {
  try {
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

const safeParseObject = (raw, fallback) => {
  try {
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
};

const safeRead = (key, fallback) => {
  if (typeof window === "undefined") {
    if (SERVER_MAP_KEYS.has(key)) {
      return ensureServerBucket(key, fallback);
    }
    return fallback;
  }
  try {
    const raw = localStorage.getItem(key);
    const parsed = key === SEED_USER_STATE_KEY
      ? safeParseObject(raw, { deletedSeedIds: [], editedSeedIds: [] })
      : safeParseArray(raw);
    if (parsed === null || parsed === undefined) return fallback;
    return parsed;
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
  if (typeof window === "undefined") {
    if (SERVER_MAP_KEYS.has(key)) {
      if (Array.isArray(value)) {
        serverStore.set(key, JSON.parse(JSON.stringify(value)));
      } else {
        serverStore.set(key, value);
      }
    }
    return;
  }
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`[storage] Failed to write ${key}.`, err);
  }
};

const safeRemove = (key) => {
  if (typeof window === "undefined") {
    if (SERVER_MAP_KEYS.has(key)) serverStore.delete(key);
    return;
  }
  try {
    localStorage.removeItem(key);
  } catch {
    /* noop */
  }
};

const normalizeId = (id) => (id == null ? id : String(id));

const SEED_ID_SET = new Set(opportunities.map((item) => normalizeId(item.id)));
const isSeedId = (id) => SEED_ID_SET.has(normalizeId(id));

const readSeedUserState = () =>
  safeRead(SEED_USER_STATE_KEY, { deletedSeedIds: [], editedSeedIds: [] });

const writeSeedUserState = (state) => safeWrite(SEED_USER_STATE_KEY, state);

const markSeedEdited = (id) => {
  const targetId = normalizeId(id);
  if (!isSeedId(targetId)) return;
  const state = readSeedUserState();
  if (!Array.isArray(state.editedSeedIds)) state.editedSeedIds = [];
  if (!state.editedSeedIds.includes(targetId)) {
    state.editedSeedIds.push(targetId);
    writeSeedUserState(state);
  }
};

const markSeedDeleted = (id) => {
  const targetId = normalizeId(id);
  if (!isSeedId(targetId)) return;
  const state = readSeedUserState();
  if (!Array.isArray(state.deletedSeedIds)) state.deletedSeedIds = [];
  if (!state.deletedSeedIds.includes(targetId)) {
    state.deletedSeedIds.push(targetId);
    writeSeedUserState(state);
  }
};

const seedDeletedIdsSet = () => new Set((readSeedUserState().deletedSeedIds || []).map(normalizeId));
const seedEditedIdsSet = () => new Set((readSeedUserState().editedSeedIds || []).map(normalizeId));

const shapeOpportunity = (item, defaults) => {
  const merged = defaults ? { ...defaults, ...item } : item;
  return {
    id: normalizeId(item?.id) ?? normalizeId(defaults?.id) ?? String(Date.now() + Math.random()),
    title: "Untitled Opportunity",
    organization: "Unknown Organization",
    category: "Job",
    location: "Remote",
    type: "Remote",
    deadline: formatDate(merged.deadline),
    description: "No description provided.",
    requirements: [],
    applyLink: "https://example.com/apply",
    tags: [],
    ...merged,
  };
};

export function getStoredOpportunities() {
  if (typeof window === "undefined") {
    const serverList = ensureServerBucket(STORAGE_KEY, opportunities);
    return serverList.map((item) => shapeOpportunity(item));
  }

  const stored = safeRead(STORAGE_KEY, null);
  const deletedSeeds = seedDeletedIdsSet();
  const editedSeeds = seedEditedIdsSet();
  const defaultMap = new Map(opportunities.map((item) => [normalizeId(item.id), item]));

  if (!stored) {
    const initial = opportunities
      .filter((item) => !deletedSeeds.has(normalizeId(item.id)))
      .map((item) => shapeOpportunity(item));
    safeWrite(STORAGE_KEY, initial);
    return initial;
  }

  const migratedStored = stored.map((storedItem) => {
    const normalizedStoredId = normalizeId(storedItem.id);
    const defaultItem = normalizedStoredId != null ? defaultMap.get(normalizedStoredId) : undefined;
    const mergedBase = defaultItem ? { ...defaultItem, ...storedItem } : storedItem;
    const base = shapeOpportunity(
      { ...mergedBase, id: normalizedStoredId },
      defaultItem,
    );
    if (isSeedId(base.id) && defaultItem && !editedSeeds.has(base.id)) {
      base.deadline = defaultItem.deadline;
    }
    return base;
  });

  const storedIds = new Set(migratedStored.map((item) => normalizeId(item.id)));
  const missingDefaults = opportunities.filter(
    (item) => {
      const seedId = normalizeId(item.id);
      return !storedIds.has(seedId) && !deletedSeeds.has(seedId);
    },
  );

  const updated = [...migratedStored, ...missingDefaults.map((item) => shapeOpportunity(item))];
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
  const newId = normalizeId(entry?.id) ?? globalThis.crypto?.randomUUID?.() ?? String(Date.now() + Math.random());
  const enriched = shapeOpportunity({ ...entry, id: newId });
  const updated = [enriched, ...current];
  saveOpportunities(updated);
  return enriched;
}

export function updateOpportunity(updatedItem) {
  const current = getStoredOpportunities();
  const targetId = normalizeId(updatedItem?.id);
  if (!targetId) return current;
  markSeedEdited(targetId);
  const updated = current.map((item) =>
    normalizeId(item.id) === targetId ? { ...item, ...updatedItem, id: targetId } : item,
  );
  saveOpportunities(updated);
  return updated.find((item) => normalizeId(item.id) === targetId) || null;
}

export function deleteOpportunity(id) {
  const targetId = normalizeId(id);
  markSeedDeleted(targetId);
  const current = getStoredOpportunities();
  const updated = current.filter((item) => normalizeId(item.id) !== targetId);
  saveOpportunities(updated);
  return updated;
}

export function getFavorites() {
  if (typeof window === "undefined") {
    return ensureServerBucket(FAVORITES_KEY, []);
  }
  return safeRead(FAVORITES_KEY, []);
}

export function toggleFavorite(item) {
  const list = getFavorites();
  const targetId = normalizeId(item?.id);
  const exists = list.some((favorite) => normalizeId(favorite.id) === targetId);
  const updated = exists
    ? list.filter((favorite) => normalizeId(favorite.id) !== targetId)
    : [{ ...item, id: targetId }, ...list];
  safeWrite(FAVORITES_KEY, updated);
  return updated;
}

export function deleteFavorite(id) {
  const list = getFavorites();
  const targetId = normalizeId(id);
  const updated = list.filter((favorite) => normalizeId(favorite.id) !== targetId);
  safeWrite(FAVORITES_KEY, updated);
  return updated;
}

export function clearFavorites() {
  safeRemove(FAVORITES_KEY);
  return [];
}

export function isFavorite(id) {
  const targetId = normalizeId(id);
  return getFavorites().some((item) => normalizeId(item.id) === targetId);
}

export function getMessages() {
  if (typeof window === "undefined") {
    return ensureServerBucket(MESSAGES_KEY, []);
  }
  return safeRead(MESSAGES_KEY, []);
}

export function saveMessage(message) {
  const current = getMessages();
  const updated = [
    { ...message, id: message?.id ?? String(Date.now() + Math.random()), createdAt: new Date().toISOString() },
    ...current,
  ];
  safeWrite(MESSAGES_KEY, updated);
  return updated[0];
}

export function deleteMessage(id) {
  const list = getMessages();
  const targetId = normalizeId(id);
  const updated = list.filter((message) => normalizeId(message.id) !== targetId);
  safeWrite(MESSAGES_KEY, updated);
  return updated;
}

export function clearMessages() {
  safeRemove(MESSAGES_KEY);
  return [];
}

export function getTheme() {
  if (typeof window === "undefined") {
    return ensureServerBucket(THEME_KEY, "light");
  }
  try {
    return localStorage.getItem(THEME_KEY) || "light";
  } catch {
    return "light";
  }
}

export function saveTheme(theme) {
  safeWrite(THEME_KEY, theme);
}

export function getLanguage() {
  if (typeof window === "undefined") {
    return ensureServerBucket(LANGUAGE_KEY, "en");
  }
  try {
    return localStorage.getItem(LANGUAGE_KEY) || "en";
  } catch {
    return "en";
  }
}

export function saveLanguage(lang) {
  safeWrite(LANGUAGE_KEY, lang);
}
