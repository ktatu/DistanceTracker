import { B612_400Regular, B612_700Bold, useFonts } from "@expo-google-fonts/b612"
import Constants from "expo-constants"
import { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import usePermissions from "../hooks/usePermissions"
import DistanceInput from "./DistanceInput"
import TrackButton from "./TrackButton"
import TrackingDisplay from "./TrackingDisplay"

const styles = StyleSheet.create({
    main_container: {
        marginTop: Constants.statusBarHeight,
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: "red",
    },
    display_container: {
        flexDirection: "column",
        alignItems: "center",
        gap: 200,
        backgroundColor: "blue",
        marginTop: 300,
    },
    inputs_container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 30,
    },
    location_error_container: {
        marginTop: 100,
    },
    error_text: {
        fontFamily: "B612_700Bold",
        fontSize: 64,
    },
})

const Main = () => {
    let [loadedFonts] = useFonts({ B612_700Bold, B612_400Regular })
    const [distance, setDistance] = useState("20")
    const [isTracking, setIsTracking] = useState(false)
    const { errorMsg: locationErrorMsg } = usePermissions()

    if (!loadedFonts) {
        return null
    }

    if (locationErrorMsg) {
        return (
            <View style={styles.display_container}>
                <Text style={styles.error_text}>{locationErrorMsg}</Text>
            </View>
        )
    }

    return (
        <View style={styles.main_container}>
            <View style={styles.display_container}>
                <TrackingDisplay isTracking={isTracking} />
                <View style={styles.inputs_container}>
                    <DistanceInput
                        editable={!isTracking}
                        distance={distance}
                        setDistance={setDistance}
                    />
                    <TrackButton buttonText={isTracking ? "Stop" : "Start"} />
                </View>
            </View>
        </View>
    )
}

export default Main
