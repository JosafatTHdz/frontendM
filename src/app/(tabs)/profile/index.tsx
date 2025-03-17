import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native"
import { useAuth } from "../../../context/authContext"
import { useRouter } from "expo-router"
import { useState } from "react"

export default function ProfileScreen() {
    const { user, logout } = useAuth()!
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    console.log("👤 User:", user)

    const handleLogout = async () => {
        setLoading(true)
        await logout()
        setLoading(false)
        router.replace("/login")
    };

    if (!user) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>No estás autenticado. Inicia sesión</Text>
                <TouchableOpacity
                    onPress={() => router.push("/login")}
                    style={{
                        marginTop: 20,
                        padding: 10,
                        backgroundColor: "#3498db",
                        borderRadius: 8,
                    }}
                >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>Iniciar Sesión</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Bienvenido, {user.name}!</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#e74c3c" style={{ marginTop: 20 }} />
            ) : (
                <TouchableOpacity
                    onPress={handleLogout}
                    style={{
                        marginTop: 20,
                        padding: 10,
                        backgroundColor: "#e74c3c",
                        borderRadius: 8,
                    }}
                >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>Cerrar Sesión</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}
