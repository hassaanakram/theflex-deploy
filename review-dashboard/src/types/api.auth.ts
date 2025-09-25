export interface UserBase {
  username: string;
  email: string;
  role: UserRole;
}

export enum UserRole {
  FLEX_ADMIN = "flexAdmin",
  LANDLORD = "landlord",
}

export interface UserResponse extends UserBase {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: UserResponse;
}