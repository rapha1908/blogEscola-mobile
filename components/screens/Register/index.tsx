import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('');

  const handleRegister = async () => {
    console.log('Register attempt with:', nome, email, senha, tipo);
    // Aqui voc&#234; implementaria a l&#243;gica de registro
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Registrar</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#A0A0A0"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#A0A0A0"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#A0A0A0"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={tipo}
            onValueChange={(itemValue) => setTipo(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecione o tipo de usu&#225;rio" value="" />
            <Picker.Item label="Administrador" value="Administrador" />
            <Picker.Item label="Professor" value="Professor" />
            <Picker.Item label="Aluno" value="Aluno" />
          </Picker>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.back()}
          >
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.registerButton, (!nome || !senha || !email || !tipo) && styles.disabledButton]}
            onPress={handleRegister}
            disabled={!nome || !senha || !email || !tipo}
          >
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#1F2937',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#5865F2',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: 'white',
    backgroundColor: '#374151',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#5865F2',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#374151',
  },
  picker: {
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#5865F2',
  },
  registerButton: {
    backgroundColor: '#5865F2',
    marginLeft: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});