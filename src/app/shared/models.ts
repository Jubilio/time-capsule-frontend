export interface User {
  id?: number;
  username: string;
  email: string;
  profilePhotoUrl?: string;
}

export interface Capsule {
  id?: number;
  ownerId: number;
  message: string;
  sendDate: string;         // ISO
  recipients: string[];
  sent?: boolean;
}
