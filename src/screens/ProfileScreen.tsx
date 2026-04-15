import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useUser } from '../hooks/useUser';

export const ProfileScreen: React.FC = () => {
  const { user, loading, updateUser } = useUser();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={user.name}
        onChangeText={text => void updateUser({ name: text })}
        placeholder='Seu nome'
        placeholderTextColor='#9C97B9'
      />

      <Text style={styles.label}>Sexo</Text>
      <TextInput
        style={styles.input}
        value={user.gender}
        onChangeText={text => void updateUser({ gender: text })}
        placeholder='Masculino / Feminino'
        placeholderTextColor='#9C97B9'
      />

      <View style={styles.buttonContainer}>
        <Button title='Salvar' color='#5F4AD6' onPress={() => console.log('Perfil salvo', user)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F5F3FF',
  },
  label: {
    color: '#4B3D8A',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 20,
  },
  input: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(141, 96, 198, 0.16)',
    paddingHorizontal: 16,
    color: '#2B2164',
  },
  buttonContainer: {
    marginTop: 30,
    borderRadius: 18,
    overflow: 'hidden',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F3FF',
  },
  loadingText: {
    color: '#6F5AE0',
    fontSize: 16,
    fontWeight: '600',
  },
});
