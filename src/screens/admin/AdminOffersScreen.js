import React from 'react';
import { View, StyleSheet, FlatList,Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from '../../styles/admin/AdminOffersStyles';
import useAdminOffersController from '../../controllers/admin/AdminOffersController';



const AdminOffersScreen = () => {
  const {
    offers,
    selectedOffer,
    applicants,
    handleSelectOffer,
    handleGoBack,
    handleDeleteOffer,
    parseJsonOrReturnText,
  } = useAdminOffersController();

  const navigation = useNavigation();
  
  if (selectedOffer) {
    const parsedApplicants = parseJsonOrReturnText(applicants);
    const isArray = Array.isArray(parsedApplicants);
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
      <Text style={styles.title}>{selectedOffer.Oferta}</Text>
      <Button onPress={handleDeleteOffer} style={styles.deleteButton}>
      Eliminar
      </Button>
      </View>
      <Text style={styles.description}>{selectedOffer.Empresa}</Text>
{Object.entries(selectedOffer).map(([key, value]) => (
  key !== 'Oferta' && key !== 'Empresa' ? (
    <View style={styles.fieldContainer} key={key}>
      <Text style={styles.fieldLabel}>{key}:</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  ) : null
))}

<Text style={styles.description}>Solicitantes:</Text>
    {isArray ? (
      parsedApplicants.map((applicant, index) => (
        <TouchableOpacity 
          key={index} 
          onPress={() => navigation.navigate('AdminProfilesScreen', {selectedUser: applicant})}
          style={styles.clickableContainer}
        >
          <Text style={styles.info}>
            {applicant.Nombre } {applicant.Apellido1} {applicant.Apellido2} <Icon name="chevron-forward-outline" size={15} color="blue" />
          </Text>
        </TouchableOpacity>
      ))
    ) : (
  <Text style={styles.info}>{parsedApplicants}</Text>
)}
      <Button onPress={handleGoBack} style={styles.button}>
      Volver
      </Button>
      </ScrollView>
      </View>
      );
      } else {
        return (
          <View style={styles.container}>
            <Text style={styles.pageTitle}>Ofertas</Text>
            <Button
      onPress={() => navigation.navigate('CreateOffersScreen')}
      style={styles.createButton}
      >
      Crear Ofertas
      </Button>
            <FlatList
      data={offers}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => handleSelectOffer(item)}
          style={styles.offerContainer}
        >
          <Text 
      style={[
        styles.title, 
        { 
          color: item.Estado === 'Abierta' ? 'green' : 
          item.Estado === 'Cerrada' ? 'red' : 
          item.Estado === 'En elaboración' ? 'yellow' : 
          'black' 
        }
      ]}
    >
      {item.Oferta}
    </Text>
    
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
    
    
          </View>
        );
      }
      };

      

export default AdminOffersScreen;