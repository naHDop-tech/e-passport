import { Sex } from '@root/interfaces/user'
import { useState, useEffect } from 'react'

export function useIsFieldWasTouched(obj1: Record<string, string | undefined | Sex>, obj2: Record<string, string | undefined | Sex | number | null>): boolean {
    const [isTouched, setIsTouched] = useState(false)

    useEffect(() => {
        if (JSON.stringify(obj1) === JSON.stringify(obj2)) {
            setIsTouched(true)
        } else {
            setIsTouched(false)
        }
    }, [obj1, obj2])

    return isTouched
}