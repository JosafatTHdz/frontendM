import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native"
import { useAuth } from "../../../context/authContext"
import { useRouter } from "expo-router"
import { useState } from "react"

export default function ProfileScreen() {
  const { user, logout } = useAuth()!
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    await logout()
    setLoading(false)
    router.replace("/login")
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No estás autenticado</Text>
        <Text style={styles.subtitle}>Por favor, inicia sesión para acceder al perfil</Text>

        <TouchableOpacity style={styles.loginBtn} onPress={() => router.push("/login")}>
          <Text style={styles.loginText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Hola, {user.name}!</Text>
      <Text style={styles.subtitle}>Aquí puedes administrar tu cuenta</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#e74c3c" style={{ marginTop: 30 }} />
      ) : (
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.editBtn} onPress={() => router.push("/profile/edit")}>
            <Text style={styles.editText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#4A5568",
    marginBottom: 20,
    textAlign: "center",
  },
  loginBtn: {
    backgroundColor: "#3182CE",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  loginText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
  buttonGroup: {
    marginTop: 32,
    width: "100%",
    alignItems: "center",
  },
  logoutBtn: {
    backgroundColor: "#E53E3E",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 16,
    width: "80%",
    alignItems: "center",
  },
  logoutText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
  editBtn: {
    backgroundColor: "#38A169",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  editText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
})
