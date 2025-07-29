import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.170:5000',
  timeout: 5000,
});

export const registerUser = async (nome: string, email: string, senha: string, tipo: string) => {
  try {
    const response = await api.post('/users', { nome, email, senha, tipo });
    return response.data;
  } catch (error) {
    console.error('Erro detalhado:', error.response?.data || error.message);
    throw error;
  }
};