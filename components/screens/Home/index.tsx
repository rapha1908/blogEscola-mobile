import PostCard from '@/components/PostCard';
// Remova ou comente a linha de importa&#231;&#227;o do IconSymbol
// import { IconSymbol } from '@/components/ui/IconSymbol';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { GetPosts } from '../../../api/login';

export default function Home({ route }) {
  console.log("Route params:", route.params); // Adicione esta linha

  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(route.params?.token);
  const [userEmail, setUserEmail] = useState(route.params?.email);
  const [userType, setUserType] = useState(route.params?.userType);
  const [filterText, setFilterText] = useState("");
  const navigation = useNavigation();

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
      alert('Erro ao buscar posts. Por favor, tente novamente.');
    }
  };

  const handleCreatePost = () => {
    navigation.navigate('create', { token, onPostCreated: fetchPosts });
  };

  const handlePostPress = (post) => {
    navigation.navigate('detail', {
      title: post.titulo,
      author: post.autor.nome,
      subject: post.materia,
      content: post.conteudo,
    });
  };

  const handleLogout = () => {
    setToken(null);
    setUserEmail(null);
    setUserType(null);
    navigation.navigate('login');
  };

  const filteredPosts = posts.filter(post => 
    post.titulo.toLowerCase().includes(filterText.toLowerCase()) ||
    post.autor.nome.toLowerCase().includes(filterText.toLowerCase()) ||
    post.conteudo.toLowerCase().includes(filterText.toLowerCase())
  );

  const canCreatePost = userType === 'Administrador' || userType === 'Professor';
  console.log("User type:", userType, "Can create post:", canCreatePost);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Bem-vindo ao Blog Escola!</Text>
        {userEmail && (
          <Text style={styles.subHeaderText}>Voc&#234; est&#225; logado como: {userEmail}</Text>
        )}
      </View>
      
      <TextInput
        style={styles.filterInput}
        placeholder="Buscar por t&#237;tulo, autor ou conte&#250;do"
        value={filterText}
        onChangeText={setFilterText}
        placeholderTextColor="#9CA3AF"
      />

      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePostPress(item)}>
            <PostCard
              key={item._id}
              id={item._id}
              title={item.titulo}
              author={item.autor.nome}
              subject={item.materia}
              content={item.conteudo}
            />
          </TouchableOpacity>
        )}
      />

      <View style={styles.footer}>
        {canCreatePost && (
          <TouchableOpacity style={styles.createButton} onPress={handleCreatePost}>
            <Text style={styles.createButtonText}>+</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
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
  filterInput: {
    height: 40,
    borderColor: '#9CA3AF',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 20,
    color: 'white',
    backgroundColor: '#374151',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#374151',
  },
  createButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#DC2626',
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
