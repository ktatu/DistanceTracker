import { StyleSheet, Text, View } from "react-native"

const styles = StyleSheet.create({
    button_style: {
        width: 130,
        height: 80,
        borderRadius: 30,
        backgroundColor: "#c9c2af",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontFamily: "B612_400Regular",
        fontSize: 64,
    },
})

const TrackingDisplay = ({ isTracking, distanceTraveled, goalDistance }) => {
    const remainingDistance = (goalDistance - distanceTraveled / 1000).toFixed(1)

    return (
        <View style={{ height: 150, justifyContent: "center", alignItems: "center" }}>
            {isTracking ? (
                <>
                    <Text style={styles.text}>Remaining:</Text>
                    <Text style={styles.text}>{remainingDistance} km</Text>
                </>
            ) : null}
        </View>
    )
}

export default TrackingDisplay
