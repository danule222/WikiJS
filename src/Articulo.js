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
  ScrollView,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import HTMLView from 'react-native-htmlview';

const anchoPantalla = Dimensions.get('window').width;
const alturaPantalla = Dimensions.get('window').height;

export default Articulo = ({route, navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const {titulo} = route.params;

  let listaResultados = [];

  let URL = `https://es.wikipedia.org/w/api.php?action=parse&prop=text&page=${titulo}&format=json`;

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((json) => setData(json.parse.text))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  for (var name in data) {
    if (data.hasOwnProperty(name)) {
      let pagina = data[name];
      pagina = pagina.replace(/\"\/wiki/g, '"https://es.wikipedia.org/wiki');
      pagina = pagina.replace(/\"\/\/upload/g, '"https://upload');
      pagina = pagina.replace(/\[.*\]/g, ' ');
      pagina = pagina.replace(/<div class="noprint AP rellink">.*<\/div>/g, '');
      pagina = pagina.replace(/style=".*;"/g, '');
      console.log(pagina);
      listaResultados[0] = pagina;
    }
  }

  return (
    <View>
      {isLoading ? (
        <Text>Cargando...</Text>
      ) : (
        <ScrollView>
          <HTMLView
            value={listaResultados[0]}
            stylesheet={styles}
            style={styles.sv}
          />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sv: {
    width: anchoPantalla,
  },
  a: {
    fontWeight: '300',
    color: '#FF3366',
  },
});
