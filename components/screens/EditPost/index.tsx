import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { UpdatePost } from '../../../api/login';

export default function EditPost({ route, navigation }) {
  const { postId, title: initialTitle, subject: initialSubject, content: initialContent, token, onPostUpdated } = route.params;

  const [title, setTitle] = useState(initialTitle);
  const [subject, setSubject] = useState(initialSubject);
  const [content, setContent] = useState(initialContent);

  const handleUpdatePost = async () => {
    try {
      await UpdatePost(postId, { titulo: title, materia: subject, conteudo: content }, token);
      alert('Post atualizado com sucesso!');
      onPostUpdated();
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao atualizar post:', error);
      alert('Erro ao atualizar post. Por favor, tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Título do post"
      />
      <Text style={styles.label}>Matéria:</Text>
      <TextInput
        style={styles.input}
        value={subject}
        onChangeText={setSubject}
        placeholder="Matéria do post"
      />
      <Text style={styles.label}>Conteúdo:</Text>
      <TextInput
        style={[styles.input, styles.contentInput]}
        value={content}
        onChangeText={setContent}
        placeholder="Conteúdo do post"
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdatePost}>
        <Text style={styles.buttonText}>Atualizar Post</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1F2937',
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#374151',
    color: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  contentInput: {
    height: 150,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
