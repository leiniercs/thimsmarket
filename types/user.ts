export enum UserRole {
   Administrator = 0,
   User = 1
}

export enum UserStatus {
   Suspended = 0,
   Active = 1
}

export interface User {
   _id: string;
   email: string;
   role: number;
   status: number;
   accessToken: string;
}
