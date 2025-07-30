import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

const PostDetails = ({ route }) => {
  const { title, author, subject, content } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.author}>Autor: {author}</Text>
      <Text style={styles.subject}>Matéria: {subject}</Text>
      <Text style={styles.content}>{content}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2937',
    padding:30,
    paddingTop: 50, 
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    color: '#A0AEC0',
    marginBottom: 4,
  },
  subject: {
    fontSize: 16,
    color: '#A0AEC0',
    marginBottom: 16,
  },
  content: {
    fontSize: 18,
    color: '#E2E8F0',
    lineHeight: 24,
  },
});

export default PostDetails;