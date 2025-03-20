import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "expo-router"
import { LoginForm, RegisterForm, User } from "../types/user"

interface AuthContextType {
  user: User | null
  login: (formData: LoginForm) => Promise<void>
  logout: () => Promise<void>
  register: (formData: RegisterForm) => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

// Para acceder fácilmente en tus componentes
export const useAuth = () => {
  return useContext(AuthContext)
}

const API_URL = process.env.API_URL

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token")
        if (!token) {
          console.log("⚠️ No hay token en almacenamiento.")
          router.replace("/login")
          return
        }

        // Llamada GET /user con fetch
        const res = await fetch(`${API_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (res.status === 404) {
            console.log("No ha iniciado sesion o el usuario no existe.")
            router.replace("/login")
        }

        if (!res.ok) {
          throw new Error(`❌ Error al obtener el usuario. Status: ${res.status}`)
        }

        const data: User = await res.json()
        setUser(data)
      } catch (error) {
        console.error("❌ Error en loadUser:", error)
        router.replace("/login")
      }
    }

    loadUser()
  }, [])

  // Iniciar sesión => POST /auth/login => almacena token => GET /user => setUser
  const login = async (formData: LoginForm) => {
    try {
      const resLogin = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!resLogin.ok) {
        throw new Error(`❌ Error al iniciar sesión. Status: ${resLogin.status}`)
      }

      const token = await resLogin.text()
      await AsyncStorage.setItem("token", token)
      const resUser = await fetch(`${API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!resUser.ok) {
        throw new Error(`❌ Error al obtener usuario tras login. Status: ${resUser.status}`)
      }

      const currentUser: User = await resUser.json()
      setUser(currentUser)

      router.replace("/home")
    } catch (error) {
      console.error("❌ Error al iniciar sesión:", error)
    }
  }

  // Cerrar sesión => remueve token => setUser(null) => router /login
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token")
      setUser(null)
      router.replace("/home")
    } catch (error) {
      console.error("❌ Error al cerrar sesión:", error)
    }
  }

  // Registrar => POST /auth/register => si ok => router /login
  const register = async (formData: RegisterForm) => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error(`❌ Error al registrar usuario. Status: ${res.status}`)
      }

      // Si todo salió bien, te redirecciona a /login
      router.replace("/login")
    } catch (error) {
      console.error("❌ Error en registro:", error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
