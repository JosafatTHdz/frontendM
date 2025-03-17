import { View, Text, Button } from 'react-native'
import { useRouter } from 'expo-router'

export default function faq() {
    const router = useRouter()
    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>FAQs</Text>  
            <Button title="Volver" onPress={() => router.back()} />
        </View>
    )
}