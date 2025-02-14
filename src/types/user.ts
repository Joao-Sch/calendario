export type User = {
    email: string;
    password: string;
    id: number;
    checkPassword?: boolean;
    isLogged: boolean;
}