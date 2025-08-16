import * as Location from "expo-location"
import { useEffect, useState } from "react"

const usePermissions = () => {
    const [errorMsg, setErrorMsg] = useState(null)

    useEffect(() => {
        const getPermissions = async () => {
            const foregroundPermObj = await Location.requestForegroundPermissionsAsync()
            if (foregroundPermObj.status !== "granted") {
                setErrorMsg("Foreground location permission required")
                return
            }
        }

        getPermissions()
    }, [])

    return { errorMsg }
}

export default usePermissions
