import { Stack } from "expo-router";

export default function IoTStack() {
    return (
        <Stack screenOptions={{ headerShown: true }}>
            <Stack.Screen name="index" options={{ title: "IoT Dashboard" }} />
            <Stack.Screen name="register" options={{ title: "Registrar Dispositivo" }} />
            <Stack.Screen name="[deviceId]" options={{ title: "Panel de Control" }} />
        </Stack>
    );
}
