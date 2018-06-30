import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView
} from 'react-native';

export default class Home extends Component {
    render() {
      return (
        // Try setting `flexDirection` to `column`.
        <View style={styles.container}>
          <View style={[{flex: 1, flexDirection: 'row' }, styles.elementsContainer]}>
            <View style={{flex: 1, backgroundColor: '#EE2C38'}} />
            <View style={{flex: 1, backgroundColor: '#FAA030'}} />
            <View style={{flex: 1, backgroundColor: '#32B76C'}} />
          </View>
          <View style={[{flex: 1,  flexDirection: 'row'}, styles.elementsContainer]}>
            <View style={{flex: 1, backgroundColor: '#32B76C'}} />
            <View style={{flex: 1, backgroundColor: '#EE2C38'}} />
            <View style={{flex: 1, backgroundColor: '#FAA030'}} />
          </View>
          <View style={[{flex: 1, flexDirection: 'row'}, styles.elementsContainer]}>
            <View style={{flex: 1, backgroundColor: '#EE2C38'}} />
            <View style={{flex: 1, backgroundColor: '#FAA030'}} />
            <View style={{flex: 1, backgroundColor: '#32B76C'}} />
          </View>
        </View>
      );
    }
  }

const styles = {
    container: {
      marginTop: 48,
    //   width: 200,
    //   height: 200,
    //   flexDirection: 'row',
      flex: .5,
      aspectRatio: 1,
    },
    headerStyle: {
      fontSize: 36,
      textAlign: 'center',
      fontWeight: '100',
      marginBottom: 24
    },
    elementsContainer: {
      backgroundColor: '#ecf5fd',
    //   marginLeft: 24,
    //   marginRight: 24,
    //   marginBottom: 24
    }
  }

