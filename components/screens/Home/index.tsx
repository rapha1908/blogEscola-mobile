import PostCard from '@/components/PostCard';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { GetPosts, deletePost } from '../../../api/login';

export default function Home({ route }) {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(route.params?.token);
  const [userEmail, setUserEmail] = useState(route.params?.email);
  const navigation = useNavigation();

  const [filterText, setFilterText] = useState("")

  useEffect(() => {
    if (token) {
      fetchPosts();
    }
  }, [token]);

  const fetchPosts = async () => {
    try {
      const postsData = await GetPosts(token);
      setPosts(postsData);
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
      // Voc&#234; pode adicionar um alerta ou uma mensagem de erro aqui
    }
  };
  
  const handleCreatePost = () => {
    navigation.navigate('create', { 
      token: token,
      onPostCreated: fetchPosts // Passa a fun&#231;&#227;o de atualiza&#231;&#227;o como callback
    });
  };

  const handleEdit = (id) => {
    console.log(`Editar post ${id}`);
    // Implementar a l&#243;gica de edi&#231;&#227;o
  };

  const handleDelete = async (id) => {
  try {
    Alert.alert(
      "Confirmar a exclusão do post",
      "Tem certeza que deseja excluir este post?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { 
          text: "OK", 
          onPress: async () => {
            try {
              await deletePost(id, token);
              fetchPosts();
              Alert.alert("Sucesso", "Post deletado com sucesso!");
            } catch (error) {
              console.error('Erro ao deletar post:', error);
              Alert.alert("Erro", "Não foi possível deletar o post.");
            }
          }
        }
      ]
    );
  } catch (error) {
    console.error('Erro ao mostrar alerta:', error);
  }
};

 const filteredPosts = posts.filter(post => 
    post.titulo.toLowerCase().includes(filterText.toLowerCase())
 );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Bem-vindo ao Blog Escola!</Text>
        {userEmail && (
          <Text style={styles.subHeaderText}>Voc&#234; est&#225; logado como: {userEmail}</Text>
        )}
      </View>
      <Button title="Criar Post" onPress={handleCreatePost} />
      <TextInput
        style={styles.filterInput}
        placeholder="Filtrar por título"
        value={filterText}
        onChangeText={setFilterText}
        placeholderTextColor="#9CA3AF"
      />
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <PostCard
            key={item._id}
            id={item._id}
            title={item.titulo}
            author={item.autor.nome}
            subject={item.materia}
            content={item.conteudo}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      />
    </View>
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
