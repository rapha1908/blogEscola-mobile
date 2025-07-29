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

export const GetPosts = async (token: string) => {
  try {
    const response = await api.get('/Posts', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar posts:', error.response?.data || error.message);
    throw error;
  }
}

export const createPost = async (postData: { titulo: string, conteudo: string, materia: string }, token: string) => {
  try {
    const response = await api.post('/Posts', postData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar post:', error.response?.data || error.message);
    throw error;
  }
};

export const deletePost = async (id: string, token: string) => {
  try {
    const response = await api.delete(`/Posts/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar post:', error.response?.data || error.message);
    throw error;
  }
};

export const UpdatePost = async (id: string, postData: { titulo: string, conteudo: string, materia: string }, token: string) => {
  try {
    const response = await api.put(`/Posts/${id}`, postData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar post:', error.response?.data || error.message);
    throw error;
  }
};

export const getUsers = async (token: string) => {
  try {
    const response = await api.get('/users', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteUser = async (userId: string, token: string) => {
  try {
    const response = await api.delete(`/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar usuário:', error.response?.data || error.message);
    throw error;
  }
};