import React, { Component } from 'react';
import {
    Text,
    ImageBackground,
    TouchableHighlight
} from 'react-native';

export default class Square extends Component {

    render() {
        return <TouchableHighlight onPress={this.props.onPress} style={[styles.emptySquare, { backgroundColor: this.props.color }]}>
            {this.props.source ? <ImageBackground source={{ uri: this.props.source }}style={{ flex: 1 }} >
            <Text>{this.props.name}</Text>
            </ImageBackground> : <Text>{this.props.name}</Text>}
        </TouchableHighlight>
    }
}

// return  this.props.source ? 
// <TouchableHighlight style={styles.emptySquare}>
//     <ImageBackground source={{ uri: this.props.source }}
//     style={{ flex: 1 }} ><Text>{this.props.name}</Text></ImageBackground>
// </TouchableHighlight> : 
// <TouchableHighlight style={styles.photoSquare}>
//     <Text>{this.props.name}</Text>
// </TouchableHighlight>}


// source
// name
// ID
// functions
//color

const styles = {
    emptySquare: {
        flex: 1,
    },
    photoSquare: {
        flex: 1
    }
}