import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Image,
} from 'react-native';

const anchoPantalla = Dimensions.get('window').width;
const alturaPantalla = Dimensions.get('window').height;

const imagenNoDisponible =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png';

function recortarTexto(texto) {
  return texto.slice(0, 120) + (texto.length > 120 ? '...' : '');
}

function comprobarJSON(lista) {
  for (var name in lista) {
    if (typeof lista[name].thumbnail == 'undefined') {
      lista[name].thumbnail = imagenNoDisponible;
    }
  }
}

export default ResultadoBusqueda = ({route, navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const {busqueda} = route.params;
  let listaResultados = [];

  let URL = `https://es.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrsearch=${busqueda}&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&pithumbsize=500`;

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((json) => setData(json.query.pages))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  for (var name in data) {
    if (data.hasOwnProperty(name)) {
      listaResultados.push(data[name]);
    }
  }

  comprobarJSON(listaResultados);
  console.log(busqueda);

  return (
    <View>
      {isLoading ? (
        <Text>Cargando...</Text>
      ) : (
        <FlatList
          data={listaResultados}
          keyExtractor={({pageid}, index) => pageid.toString()}
          renderItem={({item}) => (
            <>
              <TouchableHighlight
                onPress={() => console.log('uwu')}
                underlayColor="rgba(255, 240, 0, 0.2)">
                <View style={styles.articuloContenedor}>
                  <View>
                    <Image
                      style={styles.miniatura}
                      source={{
                        uri: item.thumbnail.source || item.thumbnail,
                      }}
                    />
                  </View>
                  <View style={styles.descripcion}>
                    <Text style={styles.titulo}>{item.title}</Text>
                    <Text style={styles.contenido}>
                      {recortarTexto(item.extract)}
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
            </>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pantalla: {
    height: alturaPantalla,
  },
  busquedaLogo: {
    flex: 2,
    backgroundColor: 'black',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: anchoPantalla / 2,
    height: 100,
    resizeMode: 'contain',
  },
  articulosDestacados: {
    flex: 3,
  },
  articuloContenedor: {
    height: 100,
    padding: 5,
    margin: 3,
    width: anchoPantalla - 6,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
  },
  miniatura: {
    height: 88,
    width: 80,
    resizeMode: 'cover',
  },
  descripcion: {
    width: anchoPantalla - 100,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  titulo: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 15,
  },
  espacio: {
    marginVertical: 1,
  },
});
