import { useState, useEffect } from 'react'

export default function useForm({ defaultValues }) {
    const [values, setValues] = useState(defaultValues)

    useEffect(() => {
        console.log(values)
    }, [values])

    return { values, setValues }
}
