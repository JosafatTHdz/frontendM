import { Stack } from "expo-router";

export default function IoTStack() {
    return (
        <Stack screenOptions={{ headerShown: true }}>
            <Stack.Screen name="index" options={{ title: "IoT Dashboard" }} />
            <Stack.Screen name="settings" options={{ title: "Configuración IoT" }} />
        </Stack>
    );
}
