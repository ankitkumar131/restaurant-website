export interface User {
  id: string;
  _id?: string; // For MongoDB compatibility
  name: string;
  email: string;
  role?: string;
  isActive?: boolean;
  createdAt?: string;
  address?: string; // Simplified to a single string
  phone?: string;
}