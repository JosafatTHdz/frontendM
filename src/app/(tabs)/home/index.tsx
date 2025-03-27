import React, { useEffect, useState } from 'react'
import {
  View, Text, StyleSheet, ActivityIndicator,
  FlatList, Image, TouchableOpacity
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useRouter } from 'expo-router'
import { Product } from '../../../types/product'
import { Category } from '../../../types/category'

const PRODUCTS_PER_PAGE = 10

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const productoEstrella = {
  _id: 'estrella-001',
  name: 'Cuna Inteligente BabyDreams',
  description: 'Una cuna automatizada con sensores, carrusel y control por app.',
  image: 'https://res.cloudinary.com/josafat/image/upload/v1743039356/crib_jv2lrn.jpg',
  category: '',
  price: 4999.99,
}

export default function Home() {
  const router = useRouter()

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(false)
      const response = await fetch(`${process.env.API_URL}/product`)
      const data: Product[] = await response.json()
      const ramdomized = shuffleArray(data)
      setProducts(ramdomized)
    } catch (err) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}/product/category`)
      const data: Category[] = await response.json()
      setCategories(data)
    } catch (err) {
      setError(true)
    }
  }

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const categoryMap = new Map(categories.map(cat => [cat._id, cat.name]))

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory)

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const currentProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE)

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.category}>{categoryMap.get(item.category)}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push(`/home/${item._id}`)}
      >
        <Text style={styles.buttonText}>Ver Detalles</Text>
      </TouchableOpacity>
    </View>
  )

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#333" />
        <Text style={styles.loadingText}>Cargando productos...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error al cargar los productos.</Text>
      </View>
    )
  }

  return (
    <FlatList
      ListHeaderComponent={
        <View>
          {/* Producto Estrella */}
          <Text style={styles.featuredTitle}>🌟 Oferta Destacada</Text>
          <TouchableOpacity onPress={() => router.push(`/home/crib`)} style={styles.featuredCard}>
            <Image source={{ uri: productoEstrella.image }} style={styles.featuredImage} />
            <Text style={styles.featuredName}>{productoEstrella.name}</Text>
            <Text style={styles.featuredDesc}>{productoEstrella.description}</Text>
            <Text style={styles.featuredPrice}>${productoEstrella.price.toFixed(2)} MXN</Text>
            <Text style={styles.featuredCTA}>Ver Detalles →</Text>
          </TouchableOpacity>

          {/* Filtro */}
          <Text style={styles.label}>Filtrar por categoría:</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(value) => {
                setSelectedCategory(value)
                setCurrentPage(1)
              }}
              style={styles.picker}
            >
              <Picker.Item label="Todas" value="all" />
              {categories.map(cat => (
                <Picker.Item key={cat._id} label={cat.name} value={cat._id} />
              ))}
            </Picker>
          </View>

          <Text style={styles.header}>🛒 Productos Disponibles</Text>
        </View>
      }
      data={currentProducts}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.listContent}
      ListFooterComponent={
        <View style={styles.pagination}>
          <TouchableOpacity
            onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={[styles.pageBtn, currentPage === 1 && styles.disabledBtn]}
          >
            <Text style={styles.pageText}>Anterior</Text>
          </TouchableOpacity>

          <Text style={styles.pageIndicator}>{currentPage} / {totalPages}</Text>

          <TouchableOpacity
            onPress={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={[styles.pageBtn, currentPage === totalPages && styles.disabledBtn]}
          >
            <Text style={styles.pageText}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      }
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    color: '#4A5568',
    marginTop: 20,
    paddingHorizontal: 4
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#CBD5E0',
    borderRadius: 8,
    marginBottom: 12,
  },
  picker: {
    height: 48,
    color: '#2D3748',
    paddingHorizontal: 8,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    color: '#2D3748',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 10
  },
  listContent: {
    paddingBottom: 16,
    paddingHorizontal: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    textAlign: 'center',
  },
  category: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 8,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3498DB',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginTop: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 12,
  },
  pageBtn: {
    backgroundColor: '#4A90E2',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  disabledBtn: {
    backgroundColor: '#A0AEC0',
  },
  pageText: {
    color: '#FFF',
    fontWeight: '600',
  },
  pageIndicator: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2D3748',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    fontSize: 16,
    color: '#E53E3E',
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    color: '#2B6CB0',
  },
  featuredCard: {
    backgroundColor: '#EDF2F7',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  featuredImage: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  featuredName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    textAlign: 'center',
  },
  featuredDesc: {
    fontSize: 14,
    color: '#4A5568',
    textAlign: 'center',
    marginVertical: 6,
  },
  featuredPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#38A169',
    marginBottom: 6,
  },
  featuredCTA: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3182CE',
  },
})
