import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Image,Linking  } from 'react-native';
import { Button, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const PerfilesAdmin = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://readapplicants-2b2k6woktq-nw.a.run.app/readApplicants'
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleGoBack = () => {
    setSelectedUser(null);
  };

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  };

  const handleOpenCv = (CV) => {
    Linking.openURL(CV);
  };

  if (selectedUser) {
    return (
      <View style={styles.container}>
        <ScrollView>
          {/* Detalles del usuario seleccionado */}
          <Text style={styles.title}>{selectedUser.nombre}</Text>
          <Text style={styles.description}>{selectedUser.correo}</Text>
          <View style={styles.profileImageContainer}>
            <Image
              style={styles.profileImage}
              source={{ uri: selectedUser.foto_perfil }}
            />
            <Button onPress={() => handleOpenCv(selectedUser.CV)} style={styles.cvButton} color="#d5bf19">
              Ver CV
            </Button>
          </View>
          {Object.entries(selectedUser)
            .filter(([key]) => key !== 'nombre' && key !== 'correo' && key !== 'foto_perfil' && key !== 'CV' && key !== 'mis_ofertas')
            .map(([key, value]) => (
              <Text style={styles.info} key={key}>
                {key}: {value}
              </Text>
          ))}
          <Button onPress={handleGoBack} style={styles.button}>
            Volver
          </Button>
        </ScrollView>
      </View>
    );
  } else {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.container}>
          <Text style={styles.text}>Perfiles de usuarios</Text>
          {users.map((user, index) => (
            <TouchableOpacity
              key={index}
              style={styles.userContainer}
              onPress={() => handleSelectUser(user)}
            >
              <Text style={styles.userName}>{user.Nombre+" "+user.Apellido1 + " " + user.Apellido2}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <FAB
          style={styles.fab}
          icon="logout"
          onPress={handleLogout}
          label="Cerrar sesión"
        />
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 80,
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  userContainer: {
    backgroundColor: '#b5b3b3',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    description: {
      fontSize: 16,
      marginBottom: 10,
    },
    info: {
      fontSize: 16,
      marginBottom: 5,
    },
    button: {
      alignSelf: 'stretch',
      marginBottom: 20,
      borderRadius: 10,
    },
    profileImageContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      marginBottom: 20,
    },
    cvButton: {
      backgroundColor: '#d5bf19',
      alignSelf: 'center',
      borderRadius: 10,
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 20,
      backgroundColor: '#d5bf19',
    },
    profileImage: {
      width: 150,
      height: 150,
      borderRadius: 75,
      alignSelf: 'center',
      marginBottom: 20,
    },
    });
    
    export default PerfilesAdmin;
