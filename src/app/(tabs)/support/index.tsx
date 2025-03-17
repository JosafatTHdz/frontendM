import { View, Text, Button } from 'react-native'
import { useRouter } from 'expo-router'

export default function index() {
    const router = useRouter()
    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>Soporte</Text>
            <Button title="FAQ" onPress={() => router.push("/support/faq")} />
        </View>
    )
}