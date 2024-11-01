export type UserRoleType = 'INTERN' | 'ADMIN' | 'ENGINEER';

export interface UserData{
    id?: number;
    email: string;
    role: UserRoleType;
    name: string;
}