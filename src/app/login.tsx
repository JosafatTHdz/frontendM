import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"
import { useAuth } from "../context/authContext"
import { useRouter } from "expo-router"
import styles from "./styles/authStyles"

export default function LoginScreen() {
    const { login } = useAuth()!
    const router = useRouter()
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {
        await login({ email, password })
    }

    const handleGoBack = async () => {
        router.back()
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>

            <TextInput
                placeholder="Correo electrónico"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                placeholder="Contraseña"
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

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
                <Text style={styles.btnBackText}>Volver</Text>
            </TouchableOpacity>
        </View>
    );
}
