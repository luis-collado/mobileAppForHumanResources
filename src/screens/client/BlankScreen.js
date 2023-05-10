import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {Button} from 'react-native-paper';

import styles from '../../styles/client/BlankScreenStyles';
import BlankScreenController from '../../controllers/client/BlankScreenController';

const BlankScreen = ({route, navigation}) => {
  const {email} = route.params;
  const { offers, selectedOffer, handleSelectOffer, handleApplyOffer, handleGoBack } = BlankScreenController(email);

  const applyOffer = async (offerId) => {
    const success = await handleApplyOffer(offerId);
    if (success) {
      Alert.alert(
        '¡Aplicación exitosa!',
        'Has aplicado correctamente a la oferta',
        [{ text: 'OK', onPress: () => handleGoBack() }],
      );
    }
  };
  

  if (selectedOffer) {
    console.log(selectedOffer);
    return (
      <View style={styles.container}>
        <ScrollView>
        <Button
          style={styles.applyButtonColor}
          onPress={() => applyOffer(selectedOffer.Codigo)}
        >
          Aplicar
        </Button>
          {/* Detalles de la oferta seleccionada */}
          <Text style={styles.title}>{selectedOffer.Oferta}</Text>
          <Text style={styles.description}>{selectedOffer.Empresa}</Text>
          <Text style={styles.info}>Fecha: {selectedOffer.Fecha}</Text>
          <Text style={styles.info}>Estado: {selectedOffer.Estado}</Text>
          <Text style={styles.info}>Tipo Contrato: {selectedOffer['Tipo contrato']}</Text>
          <Text style={styles.info}>Duración: {selectedOffer.Duración}</Text>
          <Text style={styles.info}>Puestos: {selectedOffer.Puestos}</Text>
          {/* Muestra más información de la oferta aquí */}
          {Object.entries(selectedOffer).map(([key, value]) => (
            key !== 'Oferta' && key !== 'Empresa' && key !== 'Fecha' && key !== 'Estado' &&
            key !== 'Tipo contrato' && key !== 'Duración' && key !== 'Puestos' && key !== 'ofertaId' ? (
              <Text style={styles.info} key={key}>
                {key}: {value}
              </Text>
            ) : null
          ))}
          <Button onPress={handleGoBack} style={styles.button}>
            Volver
          </Button>
        </ScrollView>
      </View>
    );
  }else {
    return (
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Ofertas</Text>
        <FlatList
          data={offers}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => handleSelectOffer(item)}
              style={styles.offerContainer}
            >
              <Text style={styles.title}>{item.Oferta}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
};


export default BlankScreen;      