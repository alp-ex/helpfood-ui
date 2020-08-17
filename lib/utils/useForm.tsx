import { useState, useEffect } from 'react'

export default function useForm({ defaultValues }) {
    const [values, setValues] = useState(defaultValues)

    // errors/helpers handling

    return { values, setValues }
}
