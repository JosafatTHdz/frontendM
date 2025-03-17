import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

const api = axios.create({
    baseURL: process.env.API_URL || 'http://192.168.101.8:4000'
})

export default api 