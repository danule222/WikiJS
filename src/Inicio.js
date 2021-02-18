import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  Image,
  Dimensions,
  FlatList,
  TouchableHighlight,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import BarraBusqueda from './BarraBusqueda';

const anchoPantalla = Dimensions.get('window').width;
const alturaPantalla = Dimensions.get('window').height;

const fondoLogo = './resources/img/fondoLogo.jpg';
const logo = './resources/img/logo.png';
const Separator = () => <View style={styles.separator} />;
const Espacio = () => <View style={styles.espacio} />;
const imagenNoDisponible =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png';

let Articulos = [
  {
    pageid: 623724,
    ns: 0,
    title: 'Hideo Kojima',
    index: 0,
    thumbnail: {
      source:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/DSC_9703_%2843073679650%29.jpg/334px-DSC_9703_%2843073679650%29.jpg',
      width: 334,
      height: 500,
    },
    pageimage: 'DSC_9703_(43073679650).jpg',
    extract:
      'Hideo Kojima (小島秀夫, Kojima Hideo, 24 de agosto de 1963) es un diseñador y director de videojuegos japonés.',
  },
  {
    pageid: 7390908,
    ns: 0,
    title: 'Re:Zero kara Hajimeru Isekai Seikatsu',
    index: 1,
    thumbnail: {
      source:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Re_Zero_kara_Hajimeru_Isekai_Seikatsu_logo.svg/500px-Re_Zero_kara_Hajimeru_Isekai_Seikatsu_logo.svg.png',
      width: 500,
      height: 202,
    },
    pageimage: 'Re_Zero_kara_Hajimeru_Isekai_Seikatsu_logo.svg',
    extract:
      'Re:Zero kara Hajimeru Isekai Seikatsu (Re（リ）：ゼロから始める異世界生活,, Ri: Zero kara hajimeru isekai Seikatsu?, lit.',
  },
  {
    pageid: 6990836,
    ns: 0,
    title: 'React',
    index: 1,
    extract:
      'React (también llamada React.js o ReactJS) es una biblioteca Javascript de código abierto diseñada para crear interfaces de usuario con el objetivo de facilitar el desarrollo de aplicaciones en una sola página.',
  },
  {
    pageid: 1568,
    ns: 0,
    title: 'JavaScript',
    index: 1,
    thumbnail: {
      source:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/500px-Unofficial_JavaScript_logo_2.svg.png',
      width: 500,
      height: 500,
    },
    pageimage: 'Unofficial_JavaScript_logo_2.svg',
    extract:
      'JavaScript (abreviado comúnmente JS) es un lenguaje de programación interpretado, dialecto del estándar ECMAScript.',
  },
  {
    pageid: 33249,
    ns: 0,
    title: 'Valve Corporation',
    index: 1,
    thumbnail: {
      source:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Valve_Lobby_2016.jpg/500px-Valve_Lobby_2016.jpg',
      width: 500,
      height: 281,
    },
    pageimage: 'Valve_Lobby_2016.jpg',
    extract:
      'Valve Corporation es una empresa estadounidense desarrolladora de videojuegos.',
  },
  {
    pageid: 364484,
    ns: 0,
    title: 'Big Boss',
    index: 1,
    thumbnail: {
      source:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Big_Boss_%28cosplay_Rick_Boer%29.jpg/500px-Big_Boss_%28cosplay_Rick_Boer%29.jpg',
      width: 500,
      height: 462,
    },
    pageimage: 'Big_Boss_(cosplay_Rick_Boer).jpg',
    extract:
      'Big Boss (ビッグ・ボス, Biggu Bosu?) es un personaje ficticio de la serie de videojuegos Metal Gear.',
  },
];

function comprobarJSON() {
  for (var name in Articulos) {
    if (typeof Articulos[name].thumbnail == 'undefined') {
      Articulos[name].thumbnail = imagenNoDisponible;
    }
  }
}

function recortarTexto(texto) {
  return texto.slice(0, 120) + (texto.length > 120 ? '...' : '');
}

function mostrarArticulo(titulo, navigation) {
  navigation.navigate('Artículo', {
    titulo: titulo,
  });
}

export default class Inicio extends Component {
  render() {
    comprobarJSON();
    return (
      <>
        <SafeAreaProvider>
          <StatusBar barStyle="light-content" />
          <View style={styles.busquedaLogo}>
            <ImageBackground source={require(fondoLogo)} style={styles.image}>
              <Image style={styles.logo} source={require(logo)} />
              <Separator />
              <BarraBusqueda
                navigation={this.props.navigation}
                route={this.props.route}
              />
            </ImageBackground>
          </View>
          <View style={styles.articulosDestacados}>
            <FlatList
              data={Articulos}
              keyExtractor={({pageid}, index) => pageid.toString()}
              renderItem={({item}) => (
                <>
                  <TouchableHighlight
                    onPress={() =>
                      mostrarArticulo(item.title, this.props.navigation)
                    }
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
          </View>
        </SafeAreaProvider>
      </>
    );
  }
}

const styles = StyleSheet.create({
  busquedaLogo: {
    height: alturaPantalla * 0.4,
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
    height: alturaPantalla * 0.568,
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
