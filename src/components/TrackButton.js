import { Pressable, StyleSheet, Text } from "react-native"

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
        fontSize: 32,
    },
})

const TrackButton = ({ buttonText }) => {
    return (
        <Pressable style={styles.button_style}>
            <Text style={styles.text}>{buttonText}</Text>
        </Pressable>
    )
}

export default TrackButton
