import React, { Component } from 'react';

import {
    Button,
    StyleSheet,
    CameraRoll,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Modal,
    TouchableHighlight
} from 'react-native';

import { Camera, FileSystem, Permissions, Constants, takeSnapshotAsync, ImagePicker } from 'expo';
import Square from "../components/square";
import anime from "../../anime.json";

// =================================================================

export default class Home extends Component {

    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        cameraRollUri: null,
        // image: null,
        // source: null,
        anime,
        modalVisible: false,
        board: [{ name: null, source: null },
        { name: null, source: null },
        { name: null, source: null },
        { name: null, source: null },
        { name: null, source: null },
        { name: null, source: null },
        { name: null, source: null },
        { name: null, source: null },
        { name: null, source: null }],
        currentSquare: null

    };

    askPermissionsAsync = async () => { // this was needed to get image picker working and this has to be called in the method as well
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        // you would probably do something to verify that permissions
        // are actually granted, but I'm skipping that for brevity
    };


    // =================================================================
    componentWillMount = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }
    // =================================================================


    _saveToCameraRollAsync = async () => {
        await this.askPermissionsAsync();
        console.log("savetoCameraRoll");
        let result = await takeSnapshotAsync(this._container, {
            format: 'png',
            result: 'file',
        });

        let saveResult = await CameraRoll.saveToCameraRoll(result, 'photo');
        this.setState({ cameraRollUri: saveResult });
    };
    // =================================================================
    // the method will allow the camera to take a picture
    // snap = async () => {
    //   console.log("snapped");
    //   console.log(this.camera);
    //   if (this.camera) {
    //     console.log('Taking photo');
    //     let photo = await this.camera.takePictureAsync();
    //     console.log(photo);
    // }
    // };
    // =================================================================
    // _pickImage = async () => {
    //   await this.askPermissionsAsync(); //need this permission to get the imagepicker working
    //   console.log("ImagePicker");
    //   let result = await ImagePicker.launchImageLibraryAsync({
    //     allowsEditing: true,
    //     aspect: [4, 3],
    //   });

    //   console.log(result);

    //   if (!result.cancelled) {
    //     this.setState({ image: result.uri });
    //   }
    // };
    // =================================================================

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    //this works!!!
    async press() {

        console.log('Button Pressed');
        //Toggle Modal
        this.setModalVisible(!this.state.modalVisible)

        console.log('Taking photo');
        let photo = await this.camera.takePictureAsync({ base64: true, exif: true });

        let saveResult = await CameraRoll.saveToCameraRoll(photo.uri, 'photo');

        let newBoard = null;
        switch (this.state.currentSquare) {
            case 1:
                newBoard = this.state.board
                newBoard[0].source = saveResult
                this.setState({ board: newBoard })
                break;
            case 2:
                newBoard = this.state.board
                newBoard[1].source = saveResult
                this.setState({ board: newBoard })
                break;
            case 3:
                newBoard = this.state.board
                newBoard[2].source = saveResult
                this.setState({ board: newBoard })
                break;
            case 4:
                newBoard = this.state.board
                newBoard[3].source = saveResult
                this.setState({ board: newBoard })
                break;
            case 5:
                newBoard = this.state.board
                newBoard[4].source = saveResult
                this.setState({ board: newBoard })
                break;
            case 6:
                newBoard = this.state.board
                newBoard[5].source = saveResult
                this.setState({ board: newBoard })
                break;
            case 7:
                newBoard = this.state.board
                newBoard[6].source = saveResult
                this.setState({ board: newBoard })
                break;
            case 8:
                newBoard = this.state.board
                newBoard[7].source = saveResult
                this.setState({ board: newBoard })
                break;
            case 9:
                newBoard = this.state.board
                newBoard[8].source = saveResult
                this.setState({ board: newBoard })
                break;
        }

        // if(this.state.currentSquare === 1){
        //     const newBoard = this.state.board
        //     newBoard[0].source = saveResult
        //     this.setState({ board: newBoard });
        // } else {
        // this.setState({ cameraRollUri: saveResult });
        // }
        // this.setState({currentSquare: saveResult});
        console.log("pressed");
    }
    // =================================================================


    render() {


        let { hasCameraPermission, image } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Hello</Text>;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {

            return (
                // Try setting `flexDirection` to `column`.
                <View style={styles.container}
                    collapsable={false}
                    ref={view => {
                        this._container = view;
                    }} >
                    <View style={styles.board}>
                        <View style={styles.column}>
                            {/* THIS IS COLUMN ONE ================================================================================== */}
                            {/* THIS IS SQUARE ONE ================================================================================== */}
                            {this.state.board[0].source ? <TouchableHighlight style={[styles.square, { backgroundColor: '#EE2C38' }]}
                                onPress={() => {
                                    this.setState({ currentSquare: 1 })
                                    this.setModalVisible(true);
                                }}>
                                <Image source={{ uri: this.state.board[0].source }}
                                    style={{ flex: 1 }} />
                            </TouchableHighlight>
                                : <TouchableHighlight style={{ flex: 1, backgroundColor: '#EE2C38' }}
                                    onPress={() => {
                                        this.setModalVisible(true);
                                        this.setState({ currentSquare: 1 })
                                    }}><Text>One</Text></TouchableHighlight>}
                            {/* THIS IS SQUARE TWO ================================================================================== */}
                            {this.state.board[1].source ? <TouchableHighlight style={{ flex: 1, backgroundColor: '#FAA030' }}
                                onPress={() => {
                                    this.setModalVisible(true);
                                    this.setState({ currentSquare: 2 })
                                }}>
                                <Image source={{ uri: this.state.board[1].source }}
                                    style={{ flex: 1 }} />
                            </TouchableHighlight>
                                : <TouchableHighlight style={{ flex: 1, backgroundColor: '#FAA030' }}
                                    onPress={() => {
                                        this.setModalVisible(true);
                                        this.setState({ currentSquare: 2 })
                                    }}><Text>Two</Text></TouchableHighlight>}
                            {/* THIS IS SQUARE THREE ================================================================================== */}
                            {this.state.board[2].source ? <TouchableHighlight style={{ flex: 1, backgroundColor: '#32B76C' }}
                                onPress={() => {
                                    this.setModalVisible(true);
                                    this.setState({ currentSquare: 3 })
                                }}>
                                <Image source={{ uri: this.state.board[2].source }}
                                    style={{ flex: 1 }} />
                            </TouchableHighlight>
                                : <TouchableHighlight style={{ flex: 1, backgroundColor: '#32B76C' }}
                                    onPress={() => {
                                        this.setModalVisible(true);
                                        this.setState({ currentSquare: 3 })
                                    }}><Text>Three</Text></TouchableHighlight>}
                        </View>
                        <View style={styles.column}>
                            {/* THIS IS COLUMN ONE ================================================================================== */}
                            {/* THIS IS SQUARE FOUR ================================================================================== */}
                            {this.state.board[3].source ? <TouchableHighlight style={{ flex: 1, backgroundColor: '#FAA030' }}
                                onPress={() => {
                                    this.setState({ currentSquare: 4 })
                                    this.setModalVisible(true);
                                }}>
                                <Image source={{ uri: this.state.board[3].source }}
                                    style={{ flex: 1 }} />
                            </TouchableHighlight>
                                : <TouchableHighlight style={{ flex: 1, backgroundColor: '#FAA030' }}
                                    onPress={() => {
                                        this.setModalVisible(true);
                                        this.setState({ currentSquare: 4 })
                                    }}><Text>Four</Text></TouchableHighlight>}
                            {/* THIS IS SQUARE FIVE ================================================================================== */}
                            {this.state.board[4].source ? <TouchableHighlight style={{ flex: 1, backgroundColor: '#32B76C' }}
                                onPress={() => {
                                    this.setState({ currentSquare: 5 })
                                    this.setModalVisible(true);
                                }}>
                                <Image source={{ uri: this.state.board[4].source }}
                                    style={{ flex: 1 }} />
                            </TouchableHighlight>
                                : <TouchableHighlight style={{ flex: 1, backgroundColor: '#32B76C' }}
                                    onPress={() => {
                                        this.setModalVisible(true);
                                        this.setState({ currentSquare: 5 })
                                    }}><Text>Five</Text></TouchableHighlight>}
                            {/* THIS IS SQUARE SIX ================================================================================== */}
                            {this.state.board[5].source ? <TouchableHighlight style={{ flex: 1, backgroundColor: '#EE2C38' }}
                                onPress={() => {
                                    this.setState({ currentSquare: 6 })
                                    this.setModalVisible(true);
                                }}>
                                <Image source={{ uri: this.state.board[5].source }}
                                    style={{ flex: 1 }} />
                            </TouchableHighlight>
                                : <TouchableHighlight style={{ flex: 1, backgroundColor: '#EE2C38' }}
                                    onPress={() => {
                                        this.setModalVisible(true);
                                        this.setState({ currentSquare: 6 })
                                    }}><Text>Six</Text></TouchableHighlight>}
                        </View>
                        <View style={styles.column}>
                            {/* THIS IS COLUMN ONE ================================================================================== */}
                            {/* THIS IS SQUARE SEVEN ================================================================================== */}
                            {this.state.board[6].source ? <TouchableHighlight style={{ flex: 1, backgroundColor: '#EE2C38' }}
                                onPress={() => {
                                    this.setState({ currentSquare: 7 })
                                    this.setModalVisible(true);
                                }}>
                                <Image source={{ uri: this.state.board[6].source }}
                                    style={{ flex: 1 }} />
                            </TouchableHighlight>
                                : <TouchableHighlight style={{ flex: 1, backgroundColor: '#EE2C38' }}
                                    onPress={() => {
                                        this.setModalVisible(true);
                                        this.setState({ currentSquare: 7 })
                                    }}><Text>One</Text></TouchableHighlight>}
                            {/* THIS IS SQUARE EIGHT ================================================================================== */}
                            {this.state.board[7].source ? <TouchableHighlight style={{ flex: 1, backgroundColor: '#FAA030' }}
                                onPress={() => {
                                    this.setState({ currentSquare: 8 })
                                    this.setModalVisible(true);
                                }}>
                                <Image source={{ uri: this.state.board[7].source }}
                                    style={{ flex: 1 }} />
                            </TouchableHighlight>
                                : <TouchableHighlight style={{ flex: 1, backgroundColor: '#FAA030' }}
                                    onPress={() => {
                                        this.setModalVisible(true);
                                        this.setState({ currentSquare: 8 })
                                    }}><Text>Eight</Text></TouchableHighlight>}
                            {/* THIS IS SQUARE ONE ================================================================================== */}
                            {this.state.board[8].source ? <TouchableHighlight style={{ flex: 1, backgroundColor: '#32B76C' }}
                                onPress={() => {
                                    this.setState({ currentSquare: 9 })
                                    this.setModalVisible(true);
                                }}>
                                <Image source={{ uri: this.state.board[8].source }}
                                    style={{ flex: 1 }} />
                            </TouchableHighlight>
                                : <TouchableHighlight style={{ flex: 1, backgroundColor: '#32B76C' }}
                                    onPress={() => {
                                        this.setModalVisible(true);
                                        this.setState({ currentSquare: 9 })
                                    }}><Text>Nine</Text></TouchableHighlight>}
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
                                <View style={styles.column}>
                                    <Camera style={styles.camera}
                                        type={this.state.type}
                                        ref={ref => {
                                            this.camera = ref;
                                        }}>
                                        <View
                                            style={{
                                                flex: 1,
                                                backgroundColor: 'transparent',
                                                flexDirection: 'row',
                                            }} />
                                        {/* <TouchableHighlight
                                            onPress={() => {
                                                this.setModalVisible(!this.state.modalVisible);
                                            }}>
                                            <Text>Hide Modal</Text>
                                        </TouchableHighlight> */}
                                        <Button
                                            title="Snap"
                                            style={{ flex: 0, backgroundColor: 'red' }}
                                            onPress={this.press.bind(this)}
                                        />
                                        <Button
                                            title="Back"
                                            style={{ flex: 0, backgroundColor: 'red' }}
                                            onPress={() => {
                                                this.setModalVisible(!this.state.modalVisible);
                                            }}
                                        />
                                    </Camera>
                                </View>
                            </View>
                        </View>
                    </Modal >
                </View>

            );

        }
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
        // justifyContent: 'center',
        // alignItems: 'center',

    },
    board: {
        flexDirection: 'row',
        flex: 1,
        aspectRatio: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    column: {
        flexDirection: 'column',
        flex: 1,
        //   marginLeft: 24,
        //   marginRight: 24,
        //   marginBottom: 24
    },
    square: {
        flex: 1,
        transform: [{ rotate: '90deg' }]
        //TODO: fix camera orientation
    },
    camera: {
        flex: 1,
    }
}


