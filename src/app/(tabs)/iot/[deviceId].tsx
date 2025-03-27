import AsyncStorage from '@react-native-async-storage/async-storage'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Switch,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import { io } from "socket.io-client"

// Interfaz para los datos que recibes de /iot/realtime
interface RealtimeData {
  temperature: number
  humidity: number
  obstaculo: boolean
}

// Componente TarjetaControl (para cuna y carrusel)
interface TarjetaControlProps {
  titulo: string
  descripcion: string
  imagenEstatica: any
  imagenAnimada: any
  estado: boolean
  setEstado: (val: boolean) => void
  endPointApi: string
}

const TarjetaControl = ({
  titulo,
  descripcion,
  imagenEstatica,
  imagenAnimada,
  estado,
  setEstado,
  endPointApi,
}: TarjetaControlProps) => {
  const deviceId = useLocalSearchParams().deviceId;
  const [cargando, setCargando] = useState(false)
  const [mensaje, setMensaje] = useState("")
  const alternarSwitch = async (value: boolean) => {
    setCargando(true)
    setMensaje(value ? "Encendiendo..." : "Apagando...")
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await fetch(`${process.env.API_URL}${endPointApi}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ estado: value }),
      });
  
      if (!res.ok) throw new Error("Error en backend");
  
      console.log(`✅ Estado confirmado: ${value}`);
  
      const id = deviceId?.toString();
      const confirm = await fetch(`${process.env.API_URL}/iot/realtime/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const latest = await confirm.json();
      const final = endPointApi.includes("balanceo")
        ? latest.balanceoActivo
        : latest.carruselActivo;
  
      setEstado(final); // 💡 Solo actualizar si se refleja realmente
      setTimeout(() => setCargando(false), 3300)
    } catch (error) {
      console.error("Error sincronizando estado:", error);
    }
  };
  

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{titulo}</Text>
      <Text style={styles.cardDescription}>{descripcion}</Text>

      <Image
        source={estado ? imagenAnimada : imagenEstatica}
        style={styles.cardImage}
      />

      <Switch
        value={estado}
        onValueChange={alternarSwitch}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={estado ? '#f5dd4b' : '#f4f3f4'}
      />

      <Text style={[styles.estadoText, { color: cargando ? "#007AFF" : (estado ? 'green' : 'red') }]}>
        {cargando ? mensaje : (estado ? "Encendido" : 'Apagado')}
      </Text>
    </View>
  )
}

// Pantalla principal
export default function ControlCuna() {
  // Datos que vienen de /iot/realtime
  const deviceId = useLocalSearchParams().deviceId
  const [data, setData] = useState<RealtimeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // Estados de encendido/apagado de la cuna y del carrusel
  const [estadoMotor, setEstadoMotor] = useState(false)
  const [estadoCarrusel, setEstadoCarrusel] = useState(false)

  // Cargar datos de /iot/realtime cada 5s
  useEffect(() => {
    let interval: NodeJS.Timeout
  
    const fetchRealtimeData = async () => {
      try {
        setError(false)
        const token = await AsyncStorage.getItem('token')
        const res = await fetch(`${process.env.API_URL}/iot/realtime/${deviceId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        const json = await res.json()
        setEstadoMotor(json.balanceoActivo)
        setEstadoCarrusel(json.carruselActivo)
        setData(json)
      } catch (err) {
        console.error('Error en fetchRealtimeData:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
  
    // 🔹 Fetch inicial
    fetchRealtimeData()
  
    // 🔹 Socket para escuchar actualizaciones en tiempo real
    const socket = io(`${process.env.API_URL}`, {
      transports: ['websocket'],
      autoConnect: true,
    })
  
    socket.on('realtime-update', (update) => {
      if (update.deviceId === deviceId) {
        console.log('📡 Actualización en tiempo real:', update)
        setData(update)
      }
    })
  
    // 🔄 Refrescar cada 5s por seguridad
    interval = setInterval(fetchRealtimeData, 2100)
  
    return () => {
      clearInterval(interval)
      socket.disconnect()
    }
  }, [])
  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text>Cargando datos...</Text>
      </View>
    )
  }

  if (error || !data) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Ocurrió un error al cargar los datos.</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        {/* Temperatura */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Estado de la Temperatura</Text>
          <Image
            source={require('../../img/temperatura.gif')}
            style={styles.cardImage}
          />
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Temperatura: </Text>
            {data.temperature} °C
          </Text>
        </View>

        {/* Humedad */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Nivel de Humedad</Text>
          <Image
            source={require('../../img/humedad.gif')}
            style={styles.cardImage}
          />
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Humedad: </Text>
            {data.humidity} %
          </Text>
        </View>

        {/* Presencia */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Presencia del bebé</Text>
          <Image
            source={require('../../img/bebe.gif')}
            style={styles.cardImage}
          />
          <Text
            style={[
              styles.infoText,
              { color: data.obstaculo ? 'green' : 'red', marginTop: 8 },
            ]}
          >
            {data.obstaculo ? 'Bebé en la cuna' : '¡Cuna vacía!'}
          </Text>
        </View>

        {/* Control de Movimiento de la cuna */}
        <TarjetaControl
          titulo="Movimiento de la Cuna"
          descripcion="Activa o desactiva el movimiento automático de la cuna."
          imagenEstatica={require('../../img/cuna.png')}
          imagenAnimada={require('../../img/cuna.gif')}
          estado={estadoMotor}
          setEstado={setEstadoMotor}
          endPointApi="/iot/control/balanceo"
        />

        {/* Control de Giro del Carrusel */}
        <TarjetaControl
          titulo="Giro del Carrusel"
          descripcion="Controla el movimiento del carrusel para entretener al bebé."
          imagenEstatica={require('../../img/juguete-de-la-cuna.png')}
          imagenAnimada={require('../../img/juguete-de-la-cuna.gif')}
          estado={estadoCarrusel}
          setEstado={setEstadoCarrusel}
          endPointApi="/iot/control/carrusel"
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BEE3F8', // azul claro
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Para que baje de línea
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#FFF',
    width: '48%', // 2 columnas (aprox)
    marginBottom: 16,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 4,
  },
  cardImage: {
    width: 64,
    height: 64,
    marginVertical: 8,
    resizeMode: 'contain',
  },
  infoLabel: {
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginTop: 4,
  },
  estadoText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
})
