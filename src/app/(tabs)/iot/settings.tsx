import { View, Text, Button } from 'react-native'
import { useRouter } from 'expo-router'

export default function settings() {
    const router = useRouter()
    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>Configuracion</Text>
            <Button title="Volver" onPress={() => router.back()} />
        </View>
    )
}