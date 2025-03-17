import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../../../context/authContext";
import { useRouter } from "expo-router";
import styles from "../../styles/checkoutStyles"; // ✅ Reutilizamos el mismo estilo

export default function IoTScreen() {
    const auth = useAuth();
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cuna Automatizada</Text>

            {!auth?.isAuthenticated ? (
                <View style={styles.authBox}>
                    <Text style={styles.message}>Para registrar tu cuna, inicia sesión.</Text>
                    <TouchableOpacity style={styles.button} onPress={() => router.push("/login")}>
                        <Text style={styles.buttonText}>Iniciar Sesión</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.purchaseBox}>
                    <Text style={styles.message}>Aquí irá la administración de IoT.</Text>
                </View>
            )}
        </View>
    );
}
