import { HTTPCommon } from 'utils/http-common'

type User = {
    id: string
    email: string
    password: string
}

const httpRequests = new HTTPCommon({
    baseUrl: 'http://localhost:3000/auth',
    contentType: 'application/json',
})

export const updateUserPassword = async ({
    id,
    password,
}: Omit<User, 'email'>): Promise<void> => {
    await httpRequests.post('/passwd', {
        data: JSON.stringify({ id, password }),
    })
}

export const updateUserEmail = async ({
    id,
    email,
}: Omit<User, 'password'>): Promise<void> => {
    await httpRequests.post('/mail', {
        data: JSON.stringify({ id, email }),
    })
}
export const deleteUserAccount = async ({
    id,
}: Omit<User, 'password' | 'email'>): Promise<void> => {
    await httpRequests.post('/delete', {
        data: JSON.stringify({ id }),
    })
}

export const login = async ({
    email,
    password,
}: Omit<User, 'id'>): Promise<User> =>
    await httpRequests.post('/login', {
        data: JSON.stringify({ email, password }),
    })

export const logout = async ({
    id,
}: Omit<User, 'password' | 'email'>): Promise<void> => {
    await httpRequests.post('/logout', {
        data: JSON.stringify({ id }),
    })
}
