export interface ClientEntity {
    id: string;
    name: string;
    secret: string;
    redirect_uris?: string[];
    icon?: string;
    theme?: string;
    tos?: string;
    privacy_policy?: string;
    confidential?: boolean;
}
