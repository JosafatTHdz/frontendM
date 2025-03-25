import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"
import { useAuth } from "../context/authContext"
import { useRouter } from "expo-router"
import styles from "./styles/authStyles"
import { Ionicons } from "@expo/vector-icons" // 👈

export default function LoginScreen() {
  const { login } = useAuth()!
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false) // 👁️

  const handleLogin = async () => {
    await login({ email, password })
  }

  const handleGoBack = async () => {
    router.navigate("/")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        placeholder="Correo electrónico"
        style={[styles.input, { width: "100%"}]}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.passwordWrapper}>
        <TextInput
          placeholder="Contraseña"
          style={{ flex: 1, fontSize: 16 }}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ paddingHorizontal: 10 }}>
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={22}
            color="#666"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/forgot-password")}>
        <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnBack} onPress={handleGoBack}>
        <Text style={styles.btnBackText}>Inicio</Text>
      </TouchableOpacity>
    </View>
  )
}
