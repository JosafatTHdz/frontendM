import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const products = [
    { id: "1", name: "Producto 1" },
    { id: "2", name: "Producto 2" },
    { id: "3", name: "Producto 3" },
];

export default function HomeScreen() {
    const router = useRouter();

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>Productos</Text>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => router.push(`/home/detail?id=${item.id}`)}>
                        <Text style={{ fontSize: 18, padding: 10 }}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
