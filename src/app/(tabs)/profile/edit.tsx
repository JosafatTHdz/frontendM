import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native'
import { useRouter } from 'expo-router'

import { updateProfile } from '../../../api/BabyDreamsApi'
import { User } from '../../../types/user'
// O si tienes un AuthContext con el usuario ya cargado
import { useAuth } from '../../../context/authContext'

export default function EditProfile() {
  const router = useRouter()

  // Si en la web tenías el "user" en React Query con queryKey ['user'],
  // aquí podrías obtenerlo de algún context o local fetch.
  // Por ejemplo, si lo tienes en un AuthContext:
  const { user } = useAuth()

  // Estados del formulario
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [handle, setHandle] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState('')

  // Cargar valores iniciales del user (simil “defaultValues” en react-hook-form)
  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setHandle(user.handle)
      setPhone(user.phone)
      setRole(user.role)
    }
  }, [user])

  // Manejo de la actualización del perfil
  const handleUpdateProfile = async () => {
    try {
      // Llamada a updateProfile con los campos que quieras actualizar
      const responseMsg = await updateProfile({
        name,
        email,
        handle,
        phone,
        role,
      })

      // Aquí ya se actualizó. Muestra un Alert o un toast si quieres
      Alert.alert('Perfil actualizado', responseMsg, [
        { text: 'OK', onPress: () => router.back() },
      ])

      // Si necesitas refetch del user global, hazlo aquí
      // p. ej. fetchAgainUser() o context.loadUser()

    } catch (error: any) {
      Alert.alert('Error al actualizar perfil', error.message)
    }
  }

  // Botón para volver sin actualizar
  const handleGoBack = () => {
    router.back()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Editar Perfil</Text>

      {/* Nombre */}
      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Tu Nombre"
      />

      {/* Email */}
      <Text style={styles.label}>Correo Electrónico</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Tu correo"
        keyboardType="email-address"
      />

      {/* Usuario */}
      <Text style={styles.label}>Usuario</Text>
      <TextInput
        style={styles.input}
        value={handle}
        onChangeText={setHandle}
        placeholder="Nombre de usuario"
      />

      {/* Teléfono */}
      <Text style={styles.label}>Teléfono</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Tu número"
        keyboardType="phone-pad"
      />

      {/* Role (opcional) */}
      <Text style={styles.label}>Role</Text>
      <TextInput
        style={styles.input}
        value={role}
        onChangeText={setRole}
        placeholder="Rol"
      />

      <TouchableOpacity style={styles.btnUpdate} onPress={handleUpdateProfile}>
        <Text style={styles.btnUpdateText}>ACTUALIZAR PERFIL</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnBack} onPress={handleGoBack}>
        <Text style={styles.btnBackText}>VOLVER</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginTop: 12,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 4,
  },
  btnUpdate: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
  },
  btnUpdateText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnBack: {
    borderColor: '#007AFF',
    borderWidth: 1,
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
  },
  btnBackText: {
    color: '#007AFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
