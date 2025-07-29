import PostCard from '@/components/PostCard';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const Posts = [
  {
    id: '1',
    title: 'Introdução à Matemática',
    author: 'Prof. Silva',
    subject: 'Matemática',
    content: 'Neste post, vamos explorar os conceitos básicos da matemática e como eles se aplicam no nosso dia a dia...',
  },
  {
    id: '2',
    title: 'A importância da leitura',
    author: 'Profa. Santos',
    subject: 'Português',
    content: 'A leitura é fundamental para o desenvolvimento intelectual e emocional. Neste artigo, discutiremos os benefícios da leitura regular...',
  },
  {
    id: '3',
    title: 'Revolução Industrial',
    author: 'Prof. Oliveira',
    subject: 'História',
    content: 'A Revolução Industrial foi um período de grandes mudanças tecnológicas e sociais. Vamos analisar seus impactos na sociedade moderna...',
  },
];

export default function Home({route}) {


  const { email } = route.params;
    return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Bem-vindo ao Blog Escola!</Text>
        <Text style={styles.subHeaderText}>Você está logado como: {email}</Text>
      </View>
      {Posts.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          author={post.author}
          subject={post.subject}
          content={post.content}
          onEdit={() => handleEdit(post.id)}
          onDelete={() => handleDelete(post.id)}
        />
      ))}
    </ScrollView>
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
});
