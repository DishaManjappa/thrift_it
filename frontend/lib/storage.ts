import { Product } from "@/lib/types";

export type Order = {
  id: string;
  item: string;
  total: string;
  status: "paid" | "processing" | "shipped" | "delivered";
};

export const storageKeys = {
  uploads: "thriftit-uploaded-listings",
  orders: "thriftit-orders",
  pendingCheckout: "thriftit-pending-checkout",
  cart: "thriftit-cart",
  sold: "thriftit-sold-product-ids",
  users: "thriftit-users",
  session: "thriftit-session"
};

export type LocalUser = {
  email: string;
  password: string;
};

export function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const value = window.localStorage.getItem(key);
  if (!value) return fallback;

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function readUploadedListings() {
  return readJson<Product[]>(storageKeys.uploads, []);
}

export function saveUploadedListing(product: Product) {
  const current = readUploadedListings();
  writeJson(storageKeys.uploads, [product, ...current]);
}

export function isLoggedIn() {
  return Boolean(readJson<{ email: string } | null>(storageKeys.session, null));
}

export function currentUserEmail() {
  return readJson<{ email: string } | null>(storageKeys.session, null)?.email || "";
}

export function passwordError(password: string) {
  if (password.length < 8) return "Password must be at least 8 characters.";
  if (!/[A-Z]/.test(password)) return "Password must include one uppercase letter.";
  if (!/[a-z]/.test(password)) return "Password must include one lowercase letter.";
  if (!/[0-9]/.test(password)) return "Password must include one number.";
  return "";
}

export function signInOrCreate(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const users = readJson<LocalUser[]>(storageKeys.users, []);
  const existing = users.find((user) => user.email === normalizedEmail);

  if (existing && existing.password !== password) {
    return { ok: false, message: "Incorrect password. Please try again." };
  }

  if (existing) {
    writeJson(storageKeys.session, { email: normalizedEmail });
    return { ok: true, message: "Signed in." };
  }

  const validation = passwordError(password);
  if (validation) {
    return { ok: false, message: validation };
  }

  writeJson(storageKeys.users, [...users, { email: normalizedEmail, password }]);
  writeJson(storageKeys.session, { email: normalizedEmail });
  return { ok: true, message: "Account created." };
}

export function createAccount(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const users = readJson<LocalUser[]>(storageKeys.users, []);

  if (users.some((user) => user.email === normalizedEmail)) {
    return { ok: false, message: "User already exists. Please log in." };
  }

  const validation = passwordError(password);
  if (validation) {
    return { ok: false, message: validation };
  }

  writeJson(storageKeys.users, [...users, { email: normalizedEmail, password }]);
  writeJson(storageKeys.session, { email: normalizedEmail });
  return { ok: true, message: "Account created." };
}

export function logout() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(storageKeys.session);
}

export function requireLogin(redirectTo = "/sign-in") {
  if (typeof window === "undefined") return false;
  if (isLoggedIn()) return true;
  window.location.href = `${redirectTo}?next=${encodeURIComponent(window.location.pathname)}`;
  return false;
}
