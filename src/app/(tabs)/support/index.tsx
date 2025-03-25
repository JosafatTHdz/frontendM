import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

export default function SoporteIndex() {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Centro de Soporte</Text>

      <TouchableOpacity style={styles.card} onPress={() => router.push('/support/faq')}>
        <Text style={styles.cardTitle}>Preguntas Frecuentes</Text>
        <Text style={styles.cardSubtitle}>Resuelve tus dudas rápidamente</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => router.push('/support/terms')}>
        <Text style={styles.cardTitle}>Términos y Condiciones</Text>
        <Text style={styles.cardSubtitle}>Conoce cómo funciona el servicio</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => router.push('/support/policies')}>
        <Text style={styles.cardTitle}>Políticas de Privacidad</Text>
        <Text style={styles.cardSubtitle}>Protegemos tu información</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1A202C',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2B6CB0',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#4A5568',
    marginTop: 4,
  },
})
