export interface OTPOptionEntity {
    id: string
    type: 'email' | 'sms' | 'call'
    to: string
    hint: string
    user_id: string
    action: 'login' | 'password_reset' | 'password_renew'
}
