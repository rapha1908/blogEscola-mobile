import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.170:5000',
  timeout: 5000,
});

export const registerUser = async (nome: string, email: string, senha: string, tipo: string) => {
  try {
    const response = await api.post('/users', { nome, email, senha, tipo });
    console.log('Registro realizado com sucesso:', response.data.token);

    return response.data;
  } catch (error) {
    console.error('Erro detalhado:', error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (email: string, senha: string) => {
  try {
    const response = await api.post('/users/login', { email, senha });
    return response.data;
  } catch (error) {
    console.error('Erro de login:', error.response?.data || error.message);
    throw error;
  }
};