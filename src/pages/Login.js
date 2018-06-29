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

    handleUsernameInput = text => {
        this.setState({
            username: text
        });
    };

    handlePasswordInput = text => {
        this.setState({
            password: text
        });
    };

    loginSubmit = event => {
        // business to send to server to login user
        console.log(`Hello ${this.state.username} ${this.state.password}`);
    };

    registerSubmit = event => {
        // redirect to register page
        console.log(`Hello ${this.state.username} ${this.state.password}`);
    };

    render() {
        return (
            <ScrollView style={styles.scroll}>
                <Container>
                    <Label text="Username" />
                    <TextInput
                        style={styles.textInput}
                        name="username"
                        onChangeText={this.handleUsernameInput}
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
                        onChangeText={this.handlePasswordInput}
                        value={this.state.password}
                    />
                </Container>
                <Container>
                    <Button
                        label="Register"
                        styles={{ button: styles.alignRight, label: styles.label }}
                        onPress={this.registerSubmit}
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
