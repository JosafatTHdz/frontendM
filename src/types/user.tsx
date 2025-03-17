export type User = {
    handle: string
    name: string,
    email: string,
    phone: string,
}

export type RegisterForm = Pick<User, 'handle' | 'email' | 'name' | 'phone'> & {
    password: string
    password_confirmation: string
}

export type LoginForm = Pick<User, 'email'> & {
    password: string
}