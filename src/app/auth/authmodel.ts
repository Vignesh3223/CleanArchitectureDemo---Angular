export interface Login {
    username: string;
    password: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
}

export interface Response {
    statuscode: number;
    message: string;
    token: string;
}