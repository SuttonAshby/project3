import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Container from '../components/Container';
import Button from '../components/Button';
import Label from '../components/Label';

class Login extends Component {

    state = {
        username: "",
        password: ""
      };

    loginSubmit = event => {
        event.preventDefault();
        console.log(`Hello Eric ${this.state.username} ${this.state.password}`);
    };

    render() {
        return (

            <ScrollView style={styles.scroll}>
                <Container>
                    <Label text="Username" />
                    <TextInput
                        style={styles.textInput}
                        name="username"
                        onChangeText={(text) => this.setState({text})}
                        type="text"
                        value={this.state.username}
                    />
                </Container>
                <Container>
                    <Label text="Password" />
                    <TextInput
                        secureTextEntry={true}
                        name="password"
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.password}
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
                        onPress={this.loginSubmit}
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

export default Login;
