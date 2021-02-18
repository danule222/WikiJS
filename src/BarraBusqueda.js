import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

const anchoPantalla = Dimensions.get('window').width;
const alturaPantalla = Dimensions.get('window').height;

class BarraBusqueda extends Component {
  state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({search});
  };

  render() {
    const {search} = this.state;
    const {navigation} = this.props;
    const {route} = this.props;

    return (
      <SearchBar
        platform="default"
        containerStyle={styles.barraBusqueda}
        placeholder="Buscar en Wikipedia"
        onChangeText={this.updateSearch}
        returnKeyType="search"
        onSubmitEditing={() =>
          navigation.navigate('Resultados de búsqueda', {
            busqueda: search,
            route: route,
          })
        }
        value={search}
      />
    );
  }
}

const styles = StyleSheet.create({
  barraBusqueda: {
    width: anchoPantalla * 0.8,
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
});

export default BarraBusqueda;
