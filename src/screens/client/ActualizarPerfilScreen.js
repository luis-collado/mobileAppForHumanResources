import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

import styles from '../../styles/client/ActualizarPerfilScreenStyles';
import { useActualizarPerfilScreenController } from '../../controllers/client/ActualizarPerfilScreenController';

const ActualizarPerfilScreen = ({ route, navigation }) => {
  const { userData, setUserData, error, actualizarPerfil, handleChange } = useActualizarPerfilScreenController(route, navigation);


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Actualizar Perfil</Text>
      {Object.keys(userData)
        .filter((key) => key !== 'mis_ofertas' && key !== 'foto_perfil' && key !== 'CV')
        .map((key) => (
          <View key={key} style={styles.inputContainer}>
            <Text style={styles.label}>{key}:</Text>
            <TextInput
              style={styles.input}
              value={userData[key] ? userData[key].toString() : ''} // Verificación añadida
              onChangeText={(value) => handleChange(key, value)}
            />
          </View>
        ))}

      {error && <Text>Error al actualizar los datos: {error}</Text>}
      <Button mode="contained" onPress={actualizarPerfil} style={styles.button}>
        Guardar cambios
      </Button>
       <Button
          onPress={() => navigation.goBack()}
          style={[styles.buttonback, { marginTop: 10 }]}
        >
          Volver
        </Button>
    </ScrollView>
  );
};


export default ActualizarPerfilScreen;