// Pantalla: Lista de dispositivos + registro + navegación al panel de control

import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ActivityIndicator, Alert,} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { useRouter } from 'expo-router'

interface Device {
  _id: string
  name: string
  macAddress: string
}

type RootStackParamList = {
  settings: { deviceId: string };
};

export default function MisDispositivosScreen() {
  const router = useRouter()
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [dispositivos, setDispositivos] = useState<Device[]>([])
  const [loading, setLoading] = useState(true)
  const [nombre, setNombre] = useState('')
  const [mac, setMac] = useState('')

  const fetchDispositivos = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      const res = await fetch(`${process.env.API_URL}device/mine`, { //agregar / porque no se actualizaba la variable de entorno
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
    fetchDispositivos()
  }, [])

  const registrarDispositivo = async () => {
    if (!nombre || !mac) return Alert.alert('Campos requeridos', 'Completa todos los campos')

    try {
      const token = await AsyncStorage.getItem('token')
      const res = await fetch(`${process.env.API_URL}/device/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: nombre, macAddress: mac }),
      })

      if (!res.ok) throw new Error('Error registrando dispositivo')
      setNombre('')
      setMac('')
      fetchDispositivos()
    } catch (err) {
      Alert.alert('Error', 'No se pudo registrar el dispositivo')
      console.error(err)
    }
  }

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

      <Text style={styles.subtitle}>Registrar nuevo dispositivo</Text>
      <TextInput
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre del dispositivo"
        style={styles.input}
      />
      <TextInput
        value={mac}
        onChangeText={setMac}
        placeholder="MAC Address (ej: C8:3A:35:13:AA:21)"
        style={styles.input}
      />
      <TouchableOpacity style={[styles.button, { marginTop: 10 }]} onPress={registrarDispositivo}>
        <Text style={styles.buttonText}>Registrar</Text>
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
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#CBD5E0',
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
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})
