import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { Product } from '../../../types/product'
import { Category } from '../../../types/category'
import { set } from 'react-hook-form'

const Home = () => {

    const router = useRouter()

    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${process.env.API_URL}/product/category`)
            const data: Category[] = await response.json()
            setCategories(data)
        } catch (err) {
            setError(true)
        }
    }


    // Efecto para cargar productos una vez que el componente se monta
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
                setError(false)
                const response = await fetch(`${process.env.API_URL}/product`)
                const data: Product[] = await response.json()
                setProducts(data)
            } catch (err) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
        fetchCategories()
    }, [])

    const categoryMap = new Map(categories.map(cat => [cat._id, cat.name]))

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

    const renderItem = ({ item }: { item: Product }) => {
        return (
            <View style={styles.card}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image }} style={styles.productImage} />
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.category}>{String(categoryMap.get(item.category))}</Text>

                    {/* Botón táctil para ir a la pantalla de detalles */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => { router.push(`/products/${item._id}`) }}
                    >
                        <Text style={styles.buttonText}>Ver Detalles</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>🛒 Productos Disponibles</Text>
            <FlatList
                data={products}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                numColumns={2} // si quieres varias columnas, ajusta estilos y activa esta línea
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.listContent}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F3F3',
        padding: 16,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    listContent: {
        paddingBottom: 16,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    card: {
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 12,
        marginHorizontal: 4,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    imageContainer: {
        width: '100%',
        height: 180,
        overflow: 'hidden',
        borderRadius: 8,
        marginBottom: 8,
    },
    productImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    infoContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    category: {
        fontSize: 14,
        color: '#888',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 8,
    },
    button: {
        backgroundColor: '#1E90FF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 6,
        marginTop: 4,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 8,
        fontSize: 16,
        color: '#333',
    },
    errorText: {
        fontSize: 16,
        color: '#FF0000',
    },
})

export default Home
