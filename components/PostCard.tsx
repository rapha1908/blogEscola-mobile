import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PostCardProps {
  id: string | number;
  title: string;
  author: string;
  subject: string;
  content: string;
  canEdit: boolean;
  onEdit: (id: string | number) => void;
  onDelete: (id: string | number) => void;
}

const PostCard: React.FC<PostCardProps> = ({ id, title, author, subject, content, canEdit, onEdit, onDelete }) => {
  const description = content.length > 100 ? content.substring(0, 97) + '...' : content;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.author}>Autor: {author}</Text>
      <Text style={styles.subject}>Matéria: {subject}</Text>
      <Text style={styles.description}>{description}</Text>
      {canEdit && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => onEdit(id)}>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => onDelete(id)}>
            <Text style={styles.buttonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2D3748',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  author: {
    fontSize: 14,
    color: '#A0AEC0',
    marginBottom: 4,
  },
  subject: {
    fontSize: 14,
    color: '#A0AEC0',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#E2E8F0',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#4A5568',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 8,
  },
  deleteButton: {
    backgroundColor: '#E53E3E', 
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default PostCard;