export interface UserType {
  id: string;
  name: string;
  email: string;
  identities: { id: string; provider: string }[];
  role: string; // e.g., "authenticated", "admin", etc.
  avatar: string; // Optional fields
  [key: string]: any; // If you expect additional fields
}
