import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "expo-router"
import { LoginForm, RegisterForm, User } from "../types/user"
import api from "../config/axios"

interface AuthContextType {
    user: User | null
    login: (formData: LoginForm) => Promise<void>
    logout: () => Promise<void>
    register: (formData: RegisterForm) => Promise<void>
    isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const router = useRouter()

    useEffect(() => {
    
        const loadUser = async () => {
            try {
                const token = await AsyncStorage.getItem("token");
        
                if (!token) {
                    console.log("⚠️ No hay token en almacenamiento.");
                    router.replace("/login");
                    return;
                }
        
                const {data} = await api.get<User>("/user")
        
                if (!data) {
                    throw new Error("❌ Error al obtener usuario, posible token inválido.");
                }

                setUser(data);
            } catch (error) {
                console.error("❌ Error en loadUser:", error);
            }
        };
        loadUser()
    }, [])

    const login = async (formData: LoginForm) => {
        try {
            const { data } = await api.post<string>("/auth/login", formData);
            
            await AsyncStorage.setItem("token", data);
            console.log("🔑 Token:", data);
            const {data: user} = await api.get<User>("/user");
            setUser(user);
            console.log("👤 Usuario", user)
    
            router.replace("/home");
        } catch (error) {
            console.error("❌ Error al iniciar sesión:", error);
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem("token");
            setUser(null);
            router.replace("/login");
        } catch (error) {
            console.error("❌ Error al cerrar sesión:", error);
        }
    };
    

    const register = async (formData: RegisterForm) => {
        try {
            const {data} = await api.post("/auth/register", formData);
    
            if (!data) {
                throw new Error("❌ Error en el registro.");
            }
    
            router.replace("/login");
        } catch (error) {
            console.error("❌ Error en registro:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};
function setLoading(arg0: boolean) {
    throw new Error("Function not implemented.")
}

