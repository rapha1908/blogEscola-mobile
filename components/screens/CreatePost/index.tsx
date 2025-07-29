import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { createPost } from '../../../api/login';

export default function CreatePost({ route }) {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [materia, setMateria] = useState('');
  const navigation = useNavigation();
  const { token, onPostCreated } = route.params;

  const handleSubmit = async () => {
    if (!titulo || !conteudo || !materia) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }
    try {
      await createPost({ titulo, conteudo, materia }, token);
      Alert.alert('Sucesso', 'Post criado com sucesso!');
      onPostCreated(); // Chama a função de callback para atualizar a lista na Home
      navigation.goBack(); // Volta para a tela Home
    } catch (error) {
      console.error('Erro ao criar post:', error);
      Alert.alert('Erro', 'Não foi possível criar o post.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Matéria"
        value={materia}
        onChangeText={setMateria}
        placeholderTextColor="#999"
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Conteúdo"
        value={conteudo}
        onChangeText={setConteudo}
        multiline
        numberOfLines={10}
        textAlignVertical="top"
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Criar Post</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    fontSize: 16,
  },
  textArea: {
    height: 200,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
