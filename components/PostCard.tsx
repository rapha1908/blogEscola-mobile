import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PostCardProps {
  title: string;
  author: string;
  subject: string;
  content: string;
  onEdit: () => void;
  onDelete: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ title, author, subject, content, onEdit, onDelete }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.author}>por {author}</Text>
      <Text style={styles.subject}>Matéria: {subject}</Text>
      <Text style={styles.content} numberOfLines={2}>
        {content}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={onEdit}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2C3E50',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: '#95A5A6',
    marginBottom: 4,
  },
  subject: {
    fontSize: 14,
    color: '#3498DB',
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    color: 'white',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  editButton: {
    backgroundColor: '#3498DB',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#E74C3C',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PostCard;