'use strict';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
<<<<<<< HEAD
        <Text>Shake your phone to open the developer menu.</Text>
        <Text>Joseph Holder</Text>

=======
        <Text>Cool</Text>
>>>>>>> f37b6071bd51a0534e493896e8ab9a04492a915b
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
