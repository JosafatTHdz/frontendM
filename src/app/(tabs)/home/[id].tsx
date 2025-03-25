import { useLocalSearchParams, useRouter } from "expo-router"
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
import { Product } from "../../../types/product"
import { Category } from "../../../types/category"

const { width } = Dimensions.get("window")

export default function ProductDetail() {
  const { id } = useLocalSearchParams()
  const router = useRouter()

  const [product, setProduct] = useState<Product | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.API_URL}product/category`)
        const data: Category[] = await response.json()
        setCategories(data)
      } catch (err) {
        setError(true)
      }
    }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${process.env.API_URL}product/${id}`) // la /
        if (!res.ok) throw new Error("No se encontró el producto")
        const data = await res.json()
        setProduct(data)
      } catch (err) {
        console.error("Error cargando producto:", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
        fetchProduct() 
        fetchCategories()
    }
  }, [id])

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Cargando producto...</Text>
      </View>
    )
  }

  if (error || !product) {
    return (
      <View style={styles.centered}>
        <Text style={{ fontSize: 16, color: "#E53E3E", marginBottom: 10 }}>
          No se pudo cargar el producto.
        </Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const categoryMap = new Map(categories.map(cat => [cat._id, cat.name]))

  return (
    <ScrollView style={styles.container}>
      {/* Imagen */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
      </View>

      {/* Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{product.name}</Text>

        {product.price && (
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        )}

        <Text style={styles.category}>Categoría: {categoryMap.get(product.category)}</Text>

        <Text style={styles.description}>{product.description}</Text>

        {/* Cantidad */}
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Cantidad:</Text>
          <TouchableOpacity
            onPress={() => setQuantity(q => Math.max(q - 1, 1))}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{quantity}</Text>
          <TouchableOpacity
            onPress={() => setQuantity(q => q + 1)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Agregar al carrito */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => alert("Producto agregado al carrito 🛒")}
        >
          <Text style={styles.addButtonText}>Agregar al carrito</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()} style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>← Volver</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  imageContainer: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    resizeMode: "contain",
  },
  infoContainer: {
    padding: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 6,
    color: "#1A202C",
  },
  price: {
    fontSize: 24,
    color: "#38A169",
    fontWeight: "bold",
    marginBottom: 12,
  },
  category: {
    fontSize: 14,
    color: "#718096",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#4A5568",
    marginBottom: 20,
    lineHeight: 22,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  quantityLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  quantityButton: {
    backgroundColor: "#E2E8F0",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  quantityText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2D3748",
  },
  quantityValue: {
    fontSize: 16,
    marginHorizontal: 12,
  },
  addButton: {
    backgroundColor: "#3182CE",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  addButtonText: {
    color: "#FFFFFF",
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
