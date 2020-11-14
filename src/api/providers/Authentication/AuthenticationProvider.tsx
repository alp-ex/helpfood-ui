import {
    createContext,
    Dispatch,
    ReactElement,
    ReactNode,
    useContext,
    useReducer,
} from 'react'

type Action = {
    type: string
    payload?: {
        isUserAuthenticated: boolean
    }
}
type State = {
    isUserAuthenticated: boolean
}
type AuthenticationProviderProps = {
    children: ReactNode
}

const AuthenticationStateContext = createContext<State | undefined>(undefined)
const AuthenticationDispatchContext = createContext<
    Dispatch<Action> | undefined
>(undefined)

const { USER_LOGIN_SUCCEED } = Object.seal({
    USER_LOGIN_SUCCEED: 'user login succeed',
})

const initialState = {
    isUserAuthenticated: false,
}

const reducer = (prevState: State, { type }: Action) => {
    switch (type) {
        case USER_LOGIN_SUCCEED: {
            return {
                ...prevState,
                isUserAuthenticated: true,
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
