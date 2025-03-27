// Pantalla: Lista de dispositivos con acceso al registro separado

import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'

interface Device {
  _id: string
  name: string
  macAddress: string
}

export default function MisDispositivosScreen() {
  const router = useRouter()
  const [dispositivos, setDispositivos] = useState<Device[]>([])
  const [loading, setLoading] = useState(true)

  const fetchDispositivos = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      const res = await fetch(`${process.env.API_URL}/device/mine`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await res.json()
      setDispositivos(json)
    } catch (err) {
      console.error('Error obteniendo dispositivos:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setInterval(fetchDispositivos, 3000)
  }, [])

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text>Cargando dispositivos...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Dispositivos</Text>

      <FlatList
        data={dispositivos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.deviceCard}>
            <View>
              <Text style={styles.deviceName}>{item.name}</Text>
              <Text style={styles.deviceMac}>{item.macAddress}</Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push(`/iot/${item._id}`)}
            >
              <Text style={styles.buttonText}>Ver Panel</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text>No tienes dispositivos aún.</Text>}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <TouchableOpacity
        onPress={() => router.push('/iot/register')}
        style={[styles.button, { marginTop: 20 }]}
      >
        <Text style={styles.buttonText}>Registrar nuevo dispositivo</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF2F7',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2B6CB0',
    marginBottom: 16,
    textAlign: 'center',
  },
  deviceCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  deviceName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#2D3748',
  },
  deviceMac: {
    fontSize: 13,
    color: '#718096',
  },
  button: {
    backgroundColor: '#4299E1',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})
