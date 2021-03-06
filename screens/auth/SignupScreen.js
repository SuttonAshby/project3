
import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';

export default class SignupScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            passwordConfirm: "",
        };
    }

    onSignupPress = () => {
        if (this.state.password !== this.state.passwordConfirm) {
            Alert.alert("Passwords do not match");
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => { }, (error) => { Alert.alert(error.message); });
    }

    onBackToLoginPress = () => {
        var navActions = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "Login" })]
        });
        this.props.navigation.dispatch(navActions);
    }

    render() {
        return (
            <View style={{ backgroundColor: "#85C1E9", paddingTop: 50, alignItems: "center" }}>

                <Text style={{ fontSize: 30, color: "white", fontWeight: "bold" }}>Signup</Text>
                <View style={{ paddingTop: 10 }}>
                    <TextInput style={styles.textInput}
                        value={this.state.email}
                        onChangeText={(text) => { this.setState({ email: text }) }}
                        placeholder="   Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    <View style={{ paddingTop: 10 }} />

                    <TextInput style={styles.textInput}
                        value={this.state.password}
                        onChangeText={(text) => { this.setState({ password: text }) }}
                        placeholder="   Password"
                        secureTextEntry={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    <View style={{ paddingTop: 10 }} />

                    <TextInput style={styles.textInput}
                        value={this.state.passwordConfirm}
                        onChangeText={(text) => { this.setState({ passwordConfirm: text }) }}
                        placeholder="   Password (confirm)"
                        secureTextEntry={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    <Button title="Signup" onPress={this.onSignupPress} />
                </View>
                <View style={{ borderTopWidth: 1, backgroundColor: "white", borderColor: "black", width: 800, marginTop: 290 }}>
                    <Button title="Back to Login" onPress={this.onBackToLoginPress} />
                </View>
            </View>
        );
    }
}

const styles = {
    textInput: {
        width: 200,
        height: 40,
        borderWidth: 1,
        borderRadius: 10
    },

};