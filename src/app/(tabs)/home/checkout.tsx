import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../../../context/authContext";
import { useRouter } from "expo-router";
import styles from "../../styles/checkoutStyles";

export default function CheckoutScreen() {
    const auth = useAuth();
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Proceso de Compra</Text>

            {!auth?.isAuthenticated ? (
                <View style={styles.authBox}>
                    <Text style={styles.message}>Para completar tu compra, inicia sesión o regístrate.</Text>
                    <TouchableOpacity style={styles.button} onPress={() => router.push("/login")}>
                        <Text style={styles.buttonText}>Iniciar Sesión</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => router.push("/register")}>
                        <Text style={styles.secondaryButtonText}>Registrarse</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.purchaseBox}>
                    <Text style={styles.message}>Aquí irá el formulario de pago y la compra.</Text>
                </View>
            )}
        </View>
    );
}
