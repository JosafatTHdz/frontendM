import { Stack } from "expo-router";

export default function HomeStack() {
    return (
        <Stack screenOptions={{ headerShown: true }}>
            <Stack.Screen name="index" options={{ title: "Lista de Productos" }} />
            <Stack.Screen name="crib" options={{ title: "Producto Estrella" }} />
            <Stack.Screen name="[id]" options={{ title: "Detalle del Producto" }} />
        </Stack>
    );
}
