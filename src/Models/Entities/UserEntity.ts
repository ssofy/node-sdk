export interface UserEntity {
    id: string
    hash: string
    display_name?: string
    name?: string
    picture?: string
    profile?: string
    email?: string
    email_verified?: boolean
    phone?: string
    phone_verified?: boolean
    additional?: any
}
