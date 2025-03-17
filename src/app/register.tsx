import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"
import { useAuth } from "../context/authContext"
import { useRouter } from "expo-router";
import styles from "./styles/authStyles"

export default function SignupScreen() {
    const { register } = useAuth()!
    const router = useRouter()

    // 📌 Manejo de estados con useState
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [handle, setHandle] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")

    const onSubmit = async () => {
        if (!name || !email || !handle || !phone || !password || !passwordConfirmation) {
            alert("Todos los campos son obligatorios")
            return
        }
        if (password !== passwordConfirmation) {
            alert("Las contraseñas no coinciden")
            return
        }

        await register({ name, email, handle, phone, password, password_confirmation: passwordConfirmation })
        router.replace("/login")
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear Cuenta</Text>

            <TextInput placeholder="Nombre completo" style={styles.input} value={name} onChangeText={setName} />
            <TextInput placeholder="Correo electrónico" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            <TextInput placeholder="Usuario" style={styles.input} value={handle} onChangeText={setHandle} />
            <TextInput placeholder="Teléfono" style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
            <TextInput placeholder="Contraseña" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
            <TextInput placeholder="Confirmar contraseña" style={styles.input} value={passwordConfirmation} onChangeText={setPasswordConfirmation} secureTextEntry />

            <TouchableOpacity style={styles.button} onPress={onSubmit}>
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/login")}>
                <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
            </TouchableOpacity>
        </View>
    );
}
