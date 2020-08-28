import { useState } from 'react'

export default function useForm({ defaultValue }) {
    const [value, setValue] = useState(defaultValue)

    return { value, setValue }
}
