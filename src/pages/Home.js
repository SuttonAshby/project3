import React, { Component } from 'react';
import {
    Modal,
    TouchableHighlight,
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView
} from 'react-native';
import { Camera, Permissions } from 'expo'


export default class Home extends Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        modalVisible: false,
        photo: null
    };

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
        return (
            // Try setting `flexDirection` to `column`.
            <View style={styles.container}>
                <View style={styles.board}>
                    <View style={style = styles.row}>
                        <View style={{ flex: 1, backgroundColor: '#EE2C38' }} />
                        <View style={{ flex: 1, backgroundColor: '#FAA030' }} />
                        {/* <Camera style={{ flex: 1 }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}/></Camera> */}
                        <View style={{ flex: 1, backgroundColor: '#32B76C' }} />
                    </View>
                    <View style={style = styles.row}>
                        <View style={{ flex: 1, backgroundColor: '#32B76C' }} />
                        <View style={{ flex: 1, backgroundColor: '#EE2C38' }} />
                        <View style={{ flex: 1, backgroundColor: '#FAA030' }} />
                        {/* <Camera style={{ flex: 1 }} type={this.state.type}>
                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: 'transparent',
                                    flexDirection: 'row',
                                }} /></Camera> */}
                    </View>
                    <View style={style = styles.row}>
                        <View style={{ flex: 1, backgroundColor: '#EE2C38' }} />


                        <View style={{ flex: 1, backgroundColor: '#FAA030' }} />
                        {/* <View style={{ flex: 1, backgroundColor: '#32B76C' }} /> */}
                        <TouchableHighlight style={{ flex: 1, backgroundColor: '#32B76C' }}
                            onPress={() => {
                                this.setModalVisible(true);
                            }}>
                            <Text></Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <View style={styles.container}>
                        <View style={styles.board}>
                            <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => {
                                this.camera = ref;
                            }}>
                                <View
                                    style={{
                                        flex: 1,
                                        backgroundColor: 'transparent',
                                        flexDirection: 'row',
                                    }} />
                                <TouchableHighlight
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}>
                                    <Text>Hide Modal</Text>
                                </TouchableHighlight>
                                {/* <TouchableHighlight
                                    onPress={() => () => {
                                        console.log("taking a picture")
                                        // if (this.camera) {
                                        //     let photo = this.camera.takePictureAsync({base64: true}).then( data => {
                                        //         app.setState({photo: data});
                                        //         console.log(this.state.photo)
                                        //     });;
                                        // }
                                    }}>
                                    <Text>Snap</Text>
                                </TouchableHighlight> */}
                            </Camera>

                        </View>
                    </View>
                </Modal >
            </View >

        );
    }
}

const styles = {
    container: {
        marginTop: 48,
        //   width: 200,
        //   height: 200,
        flexDirection: 'row',
        flex: 1,
        // aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    board: {
        flexDirection: 'row',
        flex: 1,
        aspectRatio: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    row: {
        flexDirection: 'column',
        flex: 1,
        //   marginLeft: 24,
        //   marginRight: 24,
        //   marginBottom: 24
    }
}

