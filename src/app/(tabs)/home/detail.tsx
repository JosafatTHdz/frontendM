import { View, Text, Button } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function ProductDetail() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>Detalle del Producto {id}</Text>
            <Text>Información detallada del producto...</Text>
            <Button title="Volver" onPress={() => router.back()} />
        </View>
    );
}
