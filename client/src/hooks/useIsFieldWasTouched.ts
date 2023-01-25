import { useState, useEffect } from 'react'
import {IUserProfile} from "@root/interfaces/user";

export function useIsFieldWasTouched(
    currentUserFields: Record<string, any>,
    applicantUserField: Record<string, any>
): boolean {
    const [isTouched, setIsTouched] = useState(false)

    useEffect(() => {
        if (JSON.stringify(currentUserFields) !== JSON.stringify(applicantUserField)) {
            setIsTouched(true)
        } else {
            setIsTouched(false)
        }
    }, [currentUserFields, applicantUserField])

    return isTouched
}