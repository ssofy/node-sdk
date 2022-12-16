export interface Token {
    token: string;
    scopes: string[];
    user_id: string;
    client_id: string;
    expires_at: Date;
}
