import { useAudioPlayer } from "expo-audio"

const audioSource = require("../../assets/completion-sound.mp3")

const useCompletionSound = () => {
    const player = useAudioPlayer(audioSource)

    const playCompletionSound = () => {
        player.seekTo(0)
        player.play()
    }

    return { playCompletionSound }
}

export default useCompletionSound
