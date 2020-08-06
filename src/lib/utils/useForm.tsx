import { useState, useEffect } from 'react'

export default function useForm({ defaultValues }) {
    const [values, setValues] = useState(defaultValues)

    return { values, setValues }
}
