import { loginUser } from '@/api/login';
import Header from '@/components/shared/Header';
import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';



export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();



  const handleLogin = async () => {
    try {
      const result = await loginUser(email, password);
      console.log('Login successful:', result);
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      navigation.navigate('home', { 
        email: email, 
        token: result.token, 
        userType: result.usuario.tipo 
      });
    } catch (error) {
      console.log('Login attempt with:', email, password);
      console.error('Login failed:', error);
      Alert.alert('Erro', 'Falha no login. Por favor, verifique suas credenciais e tente novamente.');
    }
  };
  
  const handleRegister = () => {
    // Aqui voc&#234; implementaria a l&#243;gica de login
    console.log('Login attempt with:', email, password);
    navigation.navigate('register');
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar-se</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
    
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,

    
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
