import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';

const BlankScreen = ({navigation}) => {
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://readoffers-2b2k6woktq-nw.a.run.app/readOffers',
        );
        const data = await response.json();
        setOffers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleGoBack = () => {
    setSelectedOffer(null);
  };

  const handleSelectOffer = (offer) => {
    setSelectedOffer(offer);
  };

  if (selectedOffer) {
    return (
      <View style={styles.container}>
        {/* Detalles de la oferta seleccionada */}
        <Text style={styles.title}>{selectedOffer.Oferta}</Text>
        <Text style={styles.description}>{selectedOffer.Empresa}</Text>
        <Text style={styles.info}>Fecha: {selectedOffer.Fecha}</Text>
        <Text style={styles.info}>Estado: {selectedOffer.Estado}</Text>
        <Text style={styles.info}>Tipo Contrato: {selectedOffer['Tipo contrato']}</Text>
        <Text style={styles.info}>Duración: {selectedOffer.Duración}</Text>
        <Text style={styles.info}>Puestos: {selectedOffer.Puestos}</Text>
        {/* Muestra más información de la oferta aquí */}
        <Button onPress={handleGoBack} style={styles.button}>
          Volver
        </Button>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  offerContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  titleContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 10,
  },
  description: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '500',
  },
  detailsContainer: {
    alignSelf: 'flex-start',
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
});

export default BlankScreen;
 