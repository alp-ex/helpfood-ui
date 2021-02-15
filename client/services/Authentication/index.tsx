import {
    createContext,
    Dispatch,
    ReactElement,
    ReactNode,
    useContext,
    useReducer,
} from 'react'
import {
    updateUserPassword as updateUserPasswordAPI,
    updateUserEmail as updateUserEmailAPI,
    deleteUserAccount as deleteUserAccountAPI,
    logout as logoutAPI,
    login as loginAPI,
} from '~/services/Authentication/AuthenticationAPI'

type User = {
    id: string
    email: string
}
type Action = {
    type: string
    payload?: {
        user?: User
    }
}
type State = {
    isUserAuthenticated: boolean
    user: User
}
type AuthenticationProviderProps = {
    children: ReactNode
}

const AuthenticationStateContext = createContext<State | undefined>(undefined)
const AuthenticationDispatchContext = createContext<
    Dispatch<Action> | undefined
>(undefined)

const { LOGIN_SUCCEED, DISCONNECT_USER } = Object.seal({
    LOGIN_SUCCEED: 'user login succeed',
    DISCONNECT_USER:
        'user successfully disconnected by information update or manual logout',
})

const initialState = {
    isUserAuthenticated: false,
    user: {
        id: '',
        email: '',
    },
}

const reducer = (prevState: State, { type, payload }: Action) => {
    switch (type) {
        case LOGIN_SUCCEED: {
            return {
                ...prevState,
                isUserAuthenticated: true,
                user: payload?.user || initialState.user,
            }
        }
        case DISCONNECT_USER: {
            return {
                ...prevState,
                isUserAuthenticated: false,
            }
        }
        default:
            throw new Error('unknown type from authentication provider')
    }
}

export const AuthenticationProvider = ({
    children,
}: AuthenticationProviderProps): ReactElement => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <AuthenticationStateContext.Provider value={state}>
            <AuthenticationDispatchContext.Provider value={dispatch}>
                {children}
            </AuthenticationDispatchContext.Provider>
        </AuthenticationStateContext.Provider>
    )
}

const useAuthenticationState = () => {
    const context = useContext(AuthenticationStateContext)

    if (context === undefined) {
        throw new Error(
            'useAuthenticationState must be used within an AuthenticationProvider'
        )
    }

    return context
}

const useAuthenticationDispatch = () => {
    const context = useContext(AuthenticationDispatchContext)

    if (context === undefined) {
        throw new Error(
            'useAuthenticationDispatch must be used within an AuthenticationProvider'
        )
    }

    return context
}

export const useAuthentication = (): {
    state: State
    dispatch: Dispatch<Action>
} => ({
    state: useAuthenticationState(),
    dispatch: useAuthenticationDispatch(),
})

export const updateUserEmail = async ({
    dispatch,
    user: { id, email },
}: {
    dispatch: Dispatch<Action>
    user: User
}): Promise<void> => {
    try {
        await updateUserEmailAPI({ id, email })

        dispatch({ type: DISCONNECT_USER })
    } catch (e) {
        console.error(e)
    }
}

export const updateUserPassword = async ({
    dispatch,
    user: { id, password },
}: {
    dispatch: Dispatch<Action>
    user: { id: string; password: string }
}): Promise<void> => {
    try {
        await updateUserPasswordAPI({ id, password })

        dispatch({ type: DISCONNECT_USER })
    } catch (e) {
        console.error(e)
    }
}

export const deleteUserAccount = async ({
    dispatch,
    id,
}: {
    dispatch: Dispatch<Action>
    id: string
}): Promise<void> => {
    try {
        await deleteUserAccountAPI({ id })

        dispatch({ type: DISCONNECT_USER })
    } catch (e) {
        console.error(e)
    }
}

export const logout = async ({
    dispatch,
    id,
}: {
    dispatch: Dispatch<Action>
    id: string
}): Promise<void> => {
    try {
        await logoutAPI({ id })

        dispatch({ type: DISCONNECT_USER })
    } catch (e) {
        console.error(e)
    }
}

export const login = async ({
    dispatch,
    email,
    password,
}: {
    dispatch: Dispatch<Action>
    email: string
    password: string
}): Promise<void> => {
    try {
        const user = await loginAPI({ email, password })

        dispatch({ type: DISCONNECT_USER, payload: { user } })
    } catch (e) {
        console.error(e)
    }
}
