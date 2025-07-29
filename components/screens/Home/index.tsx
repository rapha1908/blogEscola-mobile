import PostCard from '@/components/PostCard';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GetPosts } from '../../../api/login';

export default function Home({ route }) {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(route.params?.token);
  const [userEmail, setUserEmail] = useState(route.params?.email);
  const navigation = useNavigation();

  useEffect(() => {
    if (token) {
      fetchPosts(token);
    }
  }, [token]);

  const fetchPosts = async (token) => {
    try {
      const postsData = await GetPosts(token);
      setPosts(postsData);
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
      // Você pode adicionar um alerta ou uma mensagem de erro aqui
    }
  };

  const handleEdit = (id) => {
    console.log(`Editar post ${id}`);
    // Implementar a l&oacute;gica de edi&ccedil;&atilde;o
  };

  const handleDelete = (id) => {
    console.log(`Excluir post ${id}`);
    // Implementar a l&oacute;gica de exclus&atilde;o
  };

 return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Bem-vindo ao Blog Escola!</Text>
        {userEmail && (
          <Text style={styles.subHeaderText}>Você está logado como: {userEmail}</Text>
        )}
      </View>
      <TouchableOpacity 
        style={styles.createButton} 
        onPress={() => navigation.navigate('create', { token: token })}
      >
        <Text style={styles.createButtonText}>Criar Novo Post</Text>
      </TouchableOpacity>
      {posts.map((post) => (
        <PostCard
          key={post._id}
          id={post._id}
          title={post.titulo}
          author={post.autor.nome}
          subject={post.materia}
          content={post.conteudo}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2937',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeaderText: {
    color: '#9CA3AF',
    fontSize: 16,
  },
  createButton: {
    backgroundColor: '#3498DB',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  createButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
