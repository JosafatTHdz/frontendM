// src/app/producto-estrella.tsx
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native"

const { width } = Dimensions.get("window")

export default function ProductoEstrella() {
  const router = useRouter()
  const [producto, setProducto] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.starTitle}>⭐ Producto Estrella</Text>
      <View style={styles.imageContainer}>
        <Image source={{ uri: 'https://res.cloudinary.com/josafat/image/upload/v1743039356/crib_jv2lrn.jpg' }} style={styles.image} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.name}>Cuna Automatizada</Text>
        <Text style={styles.description}>Nuestra cuna activa movimiento automático, enciende el carrusel y monitorea temperatura, humedad y presencia.</Text>
        <Text style={styles.price}>Precio: $4,999 MXN</Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.navigate('/iot/register')}
        >
          <Text style={styles.addButtonText}>Comprar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()} style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>← Volver</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F8FF" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  starTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ED8936",
    textAlign: "center",
    marginVertical: 12,
  },
  imageContainer: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  image: {
    width: width * 0.85,
    height: width * 0.85,
    resizeMode: "contain",
    borderRadius: 12,
  },
  infoContainer: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 6,
    color: "#2B6CB0",
  },
  price: {
    fontSize: 24,
    color: "#38A169",
    fontWeight: "bold",
    marginVertical: 8,
  },
  description: {
    fontSize: 16,
    color: "#4A5568",
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: "#3182CE",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 16,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    alignItems: "center",
    paddingVertical: 8,
  },
  secondaryButtonText: {
    color: "#718096",
    fontSize: 15,
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: "#4299E1",
  },
})
