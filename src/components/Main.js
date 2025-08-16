import { B612_400Regular, B612_700Bold, useFonts } from "@expo-google-fonts/b612"
import Constants from "expo-constants"
import { useKeepAwake } from "expo-keep-awake"
import { StyleSheet, Text, View } from "react-native"
import usePermissions from "../hooks/usePermissions"
import useTracking from "../hooks/useTracking"
import DistanceInput from "./DistanceInput"
import IntervalInput from "./IntervalInput"
import TrackButton from "./TrackButton"
import TrackingDisplay from "./TrackingDisplay"

const styles = StyleSheet.create({
    main_container: {
        marginTop: Constants.statusBarHeight,
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: "#edebe6",
    },
    display_container: {
        flexDirection: "column",
        alignItems: "center",
        marginTop: 100,
    },
    inputs_container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 30,
        marginTop: 300,
    },
    error_text: {
        fontFamily: "B612_700Bold",
        fontSize: 64,
    },
})

const Main = () => {
    let [loadedFonts] = useFonts({ B612_700Bold, B612_400Regular })
    const { errorMsg: permissionErrorMsg } = usePermissions()
    const {
        goalDistance,
        setGoalDistance,
        totalDistanceTraveled,
        isTracking,
        toggleTracking,
        trackingInterval,
        setTrackingInterval,
    } = useTracking()

    useKeepAwake()

    if (!loadedFonts) {
        return null
    }

    if (permissionErrorMsg) {
        return (
            <View style={styles.display_container}>
                <Text style={styles.error_text}>{permissionErrorMsg}</Text>
            </View>
        )
    }

    return (
        <View style={styles.main_container}>
            <View style={styles.display_container}>
                <TrackingDisplay
                    distanceTraveled={totalDistanceTraveled}
                    goalDistance={goalDistance}
                    isTracking={isTracking}
                />
                <View style={{ marginTop: 100 }} />
                <IntervalInput
                    editable={!isTracking}
                    interval={trackingInterval}
                    setInterval={setTrackingInterval}
                />
                <DistanceInput
                    editable={!isTracking}
                    distance={goalDistance}
                    setDistance={setGoalDistance}
                />
                <TrackButton
                    buttonText={isTracking ? "Stop" : "Start"}
                    toggleTracking={toggleTracking}
                />
            </View>
        </View>
    )
}

export default Main
