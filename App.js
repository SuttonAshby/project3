import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Container from './src/components/Container';
import Button from './src/components/Button';
import Label from './src/components/Label';

export default class App extends Component {
  render() {
    return (
      <ScrollView style={styles.scroll}>
        <Container>
          <Label text="Username or Email" />
          <TextInput
            style={styles.textInput}
          />
        </Container>
        <Container>
          <Label text="Password" />
          <TextInput
            secureTextEntry={true}
            style={styles.textInput}
          />
        </Container>
        <Container>
          <Button
            label="Register"
            styles={{ button: styles.alignRight, label: styles.label }}
            />
            <Button
            label="Login"
            styles={{ button: styles.alignRight, label: styles.label }}
            />
        </Container>
      </ScrollView>
       );
      }
  }
  
  const styles = StyleSheet.create({
      scroll: {
          backgroundColor: '#E1D7D8',
          padding: 30,
          flexDirection: 'column'
      },
      label: {
          color: '#0d8898',
          fontSize: 20
      },
      alignRight: {
          alignSelf: 'flex-end'
      },
      textInput: {
        height: 80,
        fontSize: 30,
        backgroundColor: '#FFF'
    },
  });