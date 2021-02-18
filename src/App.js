import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

import Inicio from './Inicio';
import ResultadoBusqueda from './ResultadoBusqueda';
import Articulo from './Articulo';

const Stack = createStackNavigator();

function cambiarPagina({screenName}) {
  const navigation = useNavigation();
  navigation.navigate(screenName);
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Inicio"
          component={Inicio}
          options={{title: 'Inicio', headerShown: false}}
        />
        <Stack.Screen
          name="Resultados de búsqueda"
          component={ResultadoBusqueda}
          options={{title: 'Resultado de búsqueda', headerShown: true}}
        />
        <Stack.Screen
          name="Artículo"
          component={Articulo}
          options={{title: 'Artículo', headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export {App, cambiarPagina};
