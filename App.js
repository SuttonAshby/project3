import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StackNavigator,
} from 'react-navigation';
import Login from './src/pages/Login';
import Home from './src/pages/Home';


export default class App extends React.Component {
  render() {
    return (
<<<<<<< HEAD
<<<<<<< HEAD
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Awesome</Text>
      </View>
=======
      <Login />
=======
      <Home />
>>>>>>> 7017154ef79b5592608e216492446f3c1b232766
        // <View>
        // <Text>Open up App.js to start working on your app!</Text>
        // <Text>Changes you make will automatically reload.</Text>
        // <Text>Shake your phone to open the developer menu.</Text>
        // <Text>Joseph Holder</Text> */}
        // </View>
>>>>>>> 4c413fb40739ce2e33c00157dc6e48c40a674e6f
    );
  }
}