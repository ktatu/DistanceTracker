import { Text, View } from "react-native"

const TrackingDisplay = ({ isTracking }) => {
    if (!isTracking) {
        return <View />
    }

    return (
        <View>
            <Text>Remaining:</Text>
            <Text>25.6 km</Text>
        </View>
    )
}

export default TrackingDisplay
