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
        fontSize: 48,
    },
})

const DistanceInput = ({ editable, distance, setDistance }) => {
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
                    <TextInput
                        keyboardType="numeric"
                        onChangeText={setDistance}
                        ref={inputRef}
                        style={styles.text}
                        value={distance}
                        editable={editable}
                    />
                    <Text style={styles.text}>km</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default DistanceInput
