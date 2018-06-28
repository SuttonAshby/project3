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
      <div>
        <Login />

        <Home />
        { // <View>
          // <Text>Open up App.js to start working on your app!</Text>
          // <Text>Changes you make will automatically reload.</Text>
          // <Text>Shake your phone to open the developer menu.</Text>
          // <Text>Joseph Holder</Text> */}
          // </View>
        }
      </div>
    );
  }
}