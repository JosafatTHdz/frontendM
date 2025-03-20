import AsyncStorage from "@react-native-async-storage/async-storage"
import { User } from "../types/user"

const token = AsyncStorage.getItem('token')
const API_URL = process.env.API_URL

export const updateProfile = async (userData: Partial<User>): Promise<string> => {
    try {
      const response = await fetch(`${API_URL}/user/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Si necesitas token, agréga aquí:
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(userData),
      })
  
      if (!response.ok) {
        throw new Error(`Error al actualizar perfil. Status: ${response.status}`)
      }
      // Suponiendo que el backend responde un mensaje en texto
      const data = await response.text()
      return data 
    } catch (error) {
      console.error('Error en updateProfile:', error)
      throw error
    }
  }