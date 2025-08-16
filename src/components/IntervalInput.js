import { useRef } from "react"
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"

const styles = StyleSheet.create({
    display_container: {
        backgroundColor: "blue",
        marginTop: 200,
    },
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontFamily: "B612_700Bold",
        fontSize: 32,
    },
})

const IntervalInput = ({ editable, interval, setInterval }) => {
    const inputRef = useRef(null)

    const handlePress = () => {
        if (inputRef.current && editable) {
            inputRef.current.focus()
        }
    }

    return (
        <View>
            <Pressable onPress={handlePress}>
                <View style={styles.container}>
                    <Text style={styles.text}>Interval: </Text>
                    <TextInput
                        keyboardType="numeric"
                        onChangeText={setInterval}
                        ref={inputRef}
                        style={styles.text}
                        value={String(interval)}
                        editable={editable}
                    />
                    <Text style={styles.text}>m</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default IntervalInput
