// 📱 Vista de registro de dispositivo (pantalla separada)
import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'

export default function RegisterDeviceScreen() {
  const router = useRouter()
  const [nombre, setNombre] = useState('')
  const [mac, setMac] = useState('')

  const registrarDispositivo = async () => {
    if (!nombre || !mac)
      return Alert.alert('Campos requeridos', 'Completa todos los campos')

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
      Alert.alert('Éxito', 'Dispositivo registrado correctamente')
      router.back()
    } catch (err) {
      Alert.alert('Error', 'No se pudo registrar el dispositivo')
      console.error(err)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar nuevo dispositivo</Text>

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

      <TouchableOpacity style={styles.button} onPress={registrarDispositivo}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.navigate('/iot')} style={styles.secondaryButton}>
        <Text style={styles.secondaryButtonText}>← Volver</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF2F7',
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2B6CB0',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#CBD5E0',
  },
  button: {
    backgroundColor: '#4299E1',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#4A5568',
    fontSize: 15,
  },
})
