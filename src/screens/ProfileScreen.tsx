import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Button, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useUser } from '../hooks/useUser';

export const ProfileScreen: React.FC = () => {
  const { user, loading, updateUser, logout } = useUser();
  const router = useRouter();
  const [genderModalVisible, setGenderModalVisible] = useState(false);

  const genderOptions = ['Masculino', 'Feminino'];

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

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
      <TouchableOpacity
        style={styles.input}
        onPress={() => setGenderModalVisible(true)}
      >
        <Text style={[styles.inputText, !user.gender && { color: '#9C97B9' }]}>
          {user.gender || 'Selecione seu sexo'}
        </Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <Button title='Salvar' color='#5F4AD6' onPress={() => console.log('Perfil salvo', user)} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title='Sair' color='#FF4D4D' onPress={handleLogout} />
      </View>

      {/* Modal para seleção de gênero */}
      <Modal
        visible={genderModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setGenderModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione seu sexo</Text>
            {genderOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.modalOption}
                onPress={() => {
                  void updateUser({ gender: option });
                  setGenderModalVisible(false);
                }}
              >
                <Text style={styles.modalOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setGenderModalVisible(false)}
            >
              <Text style={styles.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  inputText: {
    color: '#2B2164',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 24,
    width: '80%',
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4B3D8A',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#F5F3FF',
    marginBottom: 8,
  },
  modalOptionText: {
    fontSize: 16,
    color: '#2B2164',
    textAlign: 'center',
  },
  modalCancel: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#E5E3F0',
    marginTop: 10,
  },
  modalCancelText: {
    fontSize: 16,
    color: '#6F5AE0',
    textAlign: 'center',
    fontWeight: '600',
  },
  loadingText: {
    color: '#6F5AE0',
    fontSize: 16,
    fontWeight: '600',
  },
});
