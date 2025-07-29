import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { deleteUser, getUsers, updateUser } from '../../../api/login'; // Adicione a fun��o updateUser

interface User {
  _id: string;
  nome: string;
  email: string;
  tipo: string;
}

const userTypes = ["Aluno", "Professor", "Administrador"];

export default function AdminScreen({ route }) {
  const [users, setUsers] = useState<User[]>([]);
  const [token, setToken] = useState(route.params?.token);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editedUser, setEditedUser] = useState<User | null>(null);
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
    setEditingUser(user._id);
    setEditedUser({ ...user });
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditedUser(null);
  };

  const handleSaveEdit = async () => {
    if (editedUser) {
      try {
        await updateUser(editedUser._id, editedUser, token);
        Alert.alert('Sucesso', 'Usuário atualizado com sucesso!');
        setEditingUser(null);
        setEditedUser(null);
        fetchUsers(); // Atualiza a lista de usuários
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        Alert.alert('Erro', 'Não foi possível atualizar o usuário.');
      }
    }
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
      {editingUser === item._id ? (
        // Modo de edição
        <View>
          <TextInput
            style={styles.input}
            value={editedUser?.nome}
            onChangeText={(text) => setEditedUser({ ...editedUser!, nome: text })}
            placeholder="Nome"
          />
          <TextInput
            style={styles.input}
            value={editedUser?.email}
            onChangeText={(text) => setEditedUser({ ...editedUser!, email: text })}
            placeholder="Email"
          />
          <Picker
            selectedValue={editedUser?.tipo}
            style={styles.picker}
            onValueChange={(itemValue) => setEditedUser({ ...editedUser!, tipo: itemValue })}
          >
            {userTypes.map((type) => (
              <Picker.Item key={type} label={type} value={type} />
            ))}
          </Picker>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveEdit}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelEdit}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        // Modo de visualização
        <View>
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
      )}
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
  input: {
    backgroundColor: '#4A5568',
    color: 'white',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  saveButton: {
    backgroundColor: '#48BB78',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 8,
  },
  cancelButton: {
    backgroundColor: '#718096',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  picker: {
    backgroundColor: '#4A5568',
    color: 'white',
    borderRadius: 4,
    marginBottom: 8,
  },
});