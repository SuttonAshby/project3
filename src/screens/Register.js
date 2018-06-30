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
import { addUser } from '../services/addUserService';

class Register extends Component {

    state = {
        username: "",
        password: "",
        password2: ""
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

    handlePassword2Input = text => {
        this.setState({
            password2: text
        });
    };

    registerSubmit = event => {
        username = this.state.username;
        password = this.state.password;
        password2 = this.state.password2;

        if (password != password2) {
            Alert.alert(
                'Passwords must match',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            )
        } else {
            var user = {
                username: username,
                password: password,
            };
            addUser(user);

            console.log("transition to game page next")
            //transition to game page
            console.log("transition to game page next")
        };
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
                    <Label text="Re-enter your password" />
                    <TextInput
                        secureTextEntry={true}
                        name="password"
                        style={styles.textInput}
                        onChangeText={this.handlePassword2Input}
                        value={this.state.password2}
                    />
                </Container>
                <Container>
                    {/* should log you in and create your account */}
                    <Button
                        label="Submit"
                        styles={{ button: styles.alignRight, label: styles.label }}
                        onPress={this.registerSubmit}
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

export default Register;
