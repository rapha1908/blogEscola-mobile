import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import { createPost } from '../../../api/login';

export default function CreatePost({ route }) {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [materia, setMateria] = useState('');
  const navigation = useNavigation();
  const { token } = route.params;

  const handleSubmit = async () => {
    if (!titulo || !conteudo || !materia) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      const newPost = await createPost({ titulo, conteudo, materia }, token);
      Alert.alert('Sucesso', 'Post criado com sucesso!');
      console.log(token);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar o post. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={styles.input}
        placeholder="Matéria"
        value={materia}
        onChangeText={setMateria}
      />
      <TextInput
        style={styles.input}
        placeholder="Conteúdo"
        value={conteudo}
        onChangeText={setConteudo}
        multiline
      />

      
      <Button title="Criar Post" onPress={handleSubmit} />
    </View>
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
  },
});
