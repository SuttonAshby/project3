import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    }

    onLoginPress = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => { }, (error) => { Alert.alert(error.message); });
    }

    onCreateAccountPress = () => {
        var navActions = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "Signup" })]
        });
        this.props.navigation.dispatch(navActions);
    }

    onForgotPasswordPress = () => {
        var navActions = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "ForgotPassword" })]
        });
        this.props.navigation.dispatch(navActions);
    }

    render() {
        return (
            <View style={{backgroundColor: "#85C1E9"}}>
                <View style={styles.logoBox}>
                    <Text style={{fontSize: 45, color: "white", fontWeight: "bold"}}>SnapCosPlay</Text>
                </View>
                <View style={styles.loginBox}>

                    <View style={{ paddingTop: 10 }} />

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

                    <Button title="Login" onPress={this.onLoginPress} />
                </View>
                <View style={styles.line}/>
                <View style={{ backgroundColor: "yellow" }}>
                    <Button title="Sign Up" onPress={this.onCreateAccountPress} />
                </View>
                <View style={styles.line}/>
                <View style={{ backgroundColor: "white" }}>
                    <Button title="Forgot Password" onPress={this.onForgotPasswordPress} />
                </View>
            </View>
        );
    }
}

const styles = {
    logoBox: {
        paddingTop: 50,
        alignItems: "center",
        paddingBottom: 75,
    },
    loginBox: {
        paddingTop: 5,
        alignItems: "center",
        paddingBottom: 200
    },
    textInput: {
        width: 200,
        height: 40,
        borderWidth: 1,
        borderRadius: 10
    },
    line: {
        paddingTop: 1, 
        backgroundColor: "black" 
    }
};