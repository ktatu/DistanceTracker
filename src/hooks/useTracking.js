import * as Location from "expo-location"
import { useCallback, useEffect, useRef, useState } from "react"
import useCompletionSound from "./useCompletionSound"

const useTracking = () => {
    const [goalDistance, setGoalDistance] = useState(20)
    const [totalDistanceTraveled, setTotalDistanceTraveled] = useState(0)
    const [isTracking, setIsTracking] = useState(false)
    const [trackingInterval, setTrackingInterval] = useState(10)

    const { playCompletionSound } = useCompletionSound()
    const watchPositionSubscription = useRef(null)
    const hasPlayedCompletionSound = useRef(false)

    useEffect(() => {
        return () => {
            if (watchPositionSubscription.current) {
                watchPositionSubscription.current.remove()
                watchPositionSubscription.current = null
            }
        }
    }, [])

    const updateDistanceTraveled = useCallback(() => {
        setTotalDistanceTraveled((prev = 0) => {
            const newTotal = prev + trackingInterval

            if (newTotal >= goalDistance && !hasPlayedCompletionSound.current) {
                hasPlayedCompletionSound.current = true
                stopTracking()
                playCompletionSound()
            }

            return newTotal
        })
    }, [trackingInterval, goalDistance, playCompletionSound])

    const startTracking = useCallback(async () => {
        if (isTracking) {
            return
        }

        setTotalDistanceTraveled(0)
        setIsTracking(true)
        hasPlayedCompletionSound.current = false

        const subscription = await Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.BestForNavigation,
                distanceInterval: trackingInterval,
            },
            updateDistanceTraveled
        )

        watchPositionSubscription.current = subscription
    }, [isTracking, trackingInterval, updateDistanceTraveled])

    const stopTracking = useCallback(() => {
        if (!isTracking) return

        setIsTracking(false)
        setTotalDistanceTraveled(0)

        if (watchPositionSubscription.current) {
            watchPositionSubscription.current.remove()
            watchPositionSubscription.current = null
        }
    }, [isTracking])

    const toggleTracking = useCallback(async () => {
        if (isTracking) {
            stopTracking()
        } else {
            await startTracking()
        }
    }, [isTracking, startTracking, stopTracking])

    return {
        totalDistanceTraveled,
        isTracking,
        toggleTracking,
        goalDistance,
        setGoalDistance,
        trackingInterval,
        setTrackingInterval,
        startTracking,
        stopTracking,
    }
}

export default useTracking
