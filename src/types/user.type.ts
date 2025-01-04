interface UserMetadata {
  avatar: string;
  name: string;
}
export interface UserType {
  id: string;
  name: string;
  email: string;
  identities: { id: string; provider: string }[];
  user_metadata: UserMetadata;
  role: string;
  avatar: string;
  [key: string]: any;
}
