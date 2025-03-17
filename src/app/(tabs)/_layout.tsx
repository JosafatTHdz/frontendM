import { Stack, Tabs } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { AuthProvider, useAuth } from "../../context/authContext"

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="home" options={{ 
                title: "Inicio", 
                tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />
            }} />
            <Tabs.Screen name="profile" options={{ 
                title: "Perfil", 
                tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />
            }} />
            <Tabs.Screen name="iot" options={{ 
                title: "IoT", 
                tabBarIcon: ({ color, size }) => <Ionicons name="wifi" color={color} size={size} />
            }} />
            <Tabs.Screen name="support" options={{ 
                title: "Soporte", 
                tabBarIcon: ({ color, size }) => <Ionicons name="help-circle" color={color} size={size} />
            }} />
        </Tabs>
    )
}