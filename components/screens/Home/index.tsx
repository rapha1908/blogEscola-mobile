import { Text, View } from 'react-native';

export default function Home({route}) {

  const { email } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen {email}</Text>
      <Text>Bem-vindo ao Blog Escola!</Text>
      <Text>Você está logado como: {email}</Text>
    </View>
  );
}