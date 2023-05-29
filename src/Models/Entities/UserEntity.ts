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
    given_name?: string
    middle_name?: string
    family_name?: string
    nickname?: string
    website?: string
    gender?: 'male' | 'female'
    birthdate?: string
    address?: string
    location?: string
    zoneinfo?: string
    locale?: string
    custom_1?: string
    custom_2?: string
    custom_3?: string
    custom_4?: string
    custom_5?: string
    custom_6?: string
    custom_7?: string
    custom_8?: string
    custom_9?: string
    additional?: any
}
