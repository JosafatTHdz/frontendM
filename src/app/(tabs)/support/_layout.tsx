import { Stack } from "expo-router";

export default function SupportStack() {
    return (
        <Stack screenOptions={{ headerShown: true }}>
            <Stack.Screen name="index" options={{ title: "Centro de Ayuda" }} />
            <Stack.Screen name="faq" options={{ title: "Preguntas Frecuentes" }} />
            <Stack.Screen name="terms" options={{ title: "Terminos y Condiciones" }} />
            <Stack.Screen name="policies" options={{ title: "Politicas" }} />
        </Stack>
    );
}
