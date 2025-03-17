import { Stack } from "expo-router";

export default function ProfileStack() {
    return (
        <Stack screenOptions={{ headerShown: true }}>
            <Stack.Screen name="index" options={{ title: "Mi Perfil" }} />
            <Stack.Screen name="edit" options={{ title: "Editar Perfil" }} />
        </Stack>
    );
}
