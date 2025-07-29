import axios from 'axios';

export const registerUser = async (nome: string, email: string, senha: string, tipo: string) => {
  try {
    const response = await axios.post('http://localhost:5000/', {
      nome,
      email,
      senha,
      tipo
    });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};