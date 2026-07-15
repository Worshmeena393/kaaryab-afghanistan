import { opportunities } from "@/data/opportunities";

const STORAGE_KEY = "kaarYab-opportunities";
const FAVORITES_KEY = "kaarYab-favorites";
const MESSAGES_KEY = "kaarYab-messages";

export function getStoredOpportunities() {
  if (typeof window === "undefined") return opportunities;

  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");

  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(opportunities));
    return opportunities;
  }

  return stored;
}

export function saveOpportunities(list) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function addOpportunity(entry) {
  const current = getStoredOpportunities();
  const updated = [entry, ...current];
  saveOpportunities(updated);
  return updated;
}

export function updateOpportunity(updatedItem) {
  const current = getStoredOpportunities();
  const updated = current.map((item) =>
    item.id === updatedItem.id ? updatedItem : item
  );
  saveOpportunities(updated);
  return updated;
}

export function deleteOpportunity(id) {
  const current = getStoredOpportunities();
  const updated = current.filter((item) => item.id !== id);
  saveOpportunities(updated);
  return updated;
}

export function getFavorites() {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
}

export function toggleFavorite(item) {
  if (typeof window === "undefined") return [];
  const list = getFavorites();
  const exists = list.some((favorite) => favorite.id === item.id);
  const updated = exists ? list.filter((favorite) => favorite.id !== item.id) : [...list, item];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  return updated;
}

export function deleteFavorite(id) {
  if (typeof window === "undefined") return [];
  const list = getFavorites();
  const updated = list.filter((favorite) => favorite.id !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  return updated;
}

export function clearFavorites() {
  if (typeof window === "undefined") return [];
  localStorage.removeItem(FAVORITES_KEY);
  return [];
}

export function isFavorite(id) {
  if (typeof window === "undefined") return false;
  return getFavorites().some((item) => item.id === id);
}

export function getMessages() {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(MESSAGES_KEY) || "[]");
}

export function saveMessage(message) {
  if (typeof window === "undefined") return [];
  const current = getMessages();
  const updated = [message, ...current];
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(updated));
  return updated;
}

export function deleteMessage(id) {
  if (typeof window === "undefined") return [];
  const list = getMessages();
  const updated = list.filter((message) => message.id !== id);
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(updated));
  return updated;
}

export function clearMessages() {
  if (typeof window === "undefined") return [];
  localStorage.removeItem(MESSAGES_KEY);
  return [];
}
