import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import Home from './Home';
import Register from './Register';

import firebase from 'react-native-firebase'
export default class Loading extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Home' : 'Register')
    })
  }
};

// export default class Loading extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Loading</Text>
//         <ActivityIndicator size="large" />
//       </View>
//     )
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   }
