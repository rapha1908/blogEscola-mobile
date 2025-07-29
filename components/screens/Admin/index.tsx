import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getUsers, deleteUser } from '../../../api/login'; // Você precisará criar essas funções
import Home from '../Home'

interface User {
  _id: string;
  nome: string;
  email: string;
  tipo: string;
}

export default function AdminScreen({ route }) {
  const [users, setUsers] = useState<User[]>([]);
  const [token, setToken] = useState(route.params?.token);
  const navigation = useNavigation();

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]);

  const fetchUsers = async () => {
    try {
      const usersData = await getUsers(token);
      setUsers(usersData);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      Alert.alert('Erro', 'Não foi possível carregar a lista de usuários.');
    }
  };

  const handleEditUser = (user: User) => {
    // Navegue para a tela de edição de usuário
    navigation.navigate('EditUser', { user, token, onUserUpdated: fetchUsers });
  };

  const handleDeleteUser = async (userId: string) => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir este usuário?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Excluir", 
          onPress: async () => {
            try {
              await deleteUser(userId, token);
              Alert.alert('Sucesso', 'Usuário excluído com sucesso!');
              fetchUsers(); // Atualiza a lista de usuários
            } catch (error) {
              console.error('Erro ao excluir usuário:', error);
              Alert.alert('Erro', 'Não foi possível excluir o usuário.');
            }
          }
        }
      ]
    );
  };

  const renderUserItem = ({ item }: { item: User }) => (
    <View style={styles.userItem}>
      <Text style={styles.userName}>{item.nome}</Text>
      <Text style={styles.userEmail}>{item.email}</Text>
      <Text style={styles.userType}>{item.tipo}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => handleEditUser(item)}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteUser(item._id)}>
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciar Usuários</Text>
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2937',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  userItem: {
    backgroundColor: '#374151',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  userEmail: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  userType: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  editButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});