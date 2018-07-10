import React, { Component } from 'react';

import {
    Button,
    StyleSheet,
    CameraRoll,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Modal,
    TouchableHighlight
} from 'react-native';
import { TestComponent, PhoneButton } from './../components/AppComponents';
import * as firebase from 'firebase';
import { Camera, FileSystem, Permissions, Constants, takeSnapshotAsync, ImagePicker } from 'expo';
import anime from "../anime.json";
// import Square from "../components/square";


export default class TestScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        currentPassword: "",
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        cameraRollUri: null,
        // image: null,
        currentSource: null,
        anime,
        modalVisible: false,
        board: [{ name: 'One', source: null },
        { name: 'Two', source: null },
        { name: 'Three', source: null },
        { name: 'Four', source: null },
        { name: 'Five', source: null },
        { name: 'Six', source: null },
        { name: 'Seven', source: null },
        { name: 'Eight', source: null },
        { name: 'Nine', source: null }],
        currentSquare: null,
        activeBoard: false,
    }

    _askPermissionsAsync = async () => { // this was needed to get image picker working and this has to be called in the method as well
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

    componentDidMount() {
        // if (!this.state.activeBoard) {
        //     this.generateBoard()
        // }
        let newBoard = null;
        const active = true;
        const challenges = []
        console.log("Starting")
        while (challenges.length < 9) {
            let newChallenge = anime[Math.floor(Math.random() * anime.length)].anime
            if (!challenges.includes(newChallenge)) {
                challenges.push(newChallenge)
            }
        }
        newBoard = this.state.board
        for (let i = 0; i < challenges.length; i++) {
            newBoard[i].name = challenges[i]
        }
        this.setState({ board: newBoard })
        this.setState({ activeBoard: active })
    }

    // generateBoard() {
    //     let newBoard = null;
    //     const active = true;
    //     const challenges = []
    //     console.log("Starting")
    //     while (challenges.length < 9) {
    //         let newChallenge = anime[Math.floor(Math.random() * anime.length)].anime
    //         if (!challenges.includes(newChallenge)) {
    //             challenges.push(newChallenge)
    //         }
    //     }
    //     newBoard = this.state.board
    //     for (let i = 0; i < challenges.length; i++) {
    //         newBoard[i].name = challenges[i]
    //     }
    //     this.setState({ board: newBoard })
    //     this.setState({ activeBoard: active })
    // }


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

    // setModalVisible(visible) {
    //     this.setState({ modalVisible: visible });
    // }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    async press() {

        console.log('Button Pressed');
        //Toggle Modal
        // this.setModalVisible(!this.state.modalVisible)


        console.log('Taking photo');
        let photo = await this.camera.takePictureAsync({ base64: true, exif: true });

        let saveResult = await CameraRoll.saveToCameraRoll(photo.uri, 'photo');

        this.setState({ currentSource: saveResult })

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

    // Occurs when signout is pressed...
    onSignoutPress = () => {
        firebase.auth().signOut();
    }

    // Reauthenticates the current user and returns a promise...
    reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }


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
                                <ImageBackground source={{ uri: this.state.board[0].source }}
                                    style={{ flex: 1 }} ><Text>{this.state.board[0].name}</Text></ImageBackground>
                            </TouchableHighlight>
                                : <TouchableHighlight style={{ flex: 1, backgroundColor: '#EE2C38' }}
                                    onPress={() => {
                                        this.setModalVisible(true);
                                        this.setState({ currentSquare: 1 })
                                    }}><Text>{this.state.board[0].name}</Text></TouchableHighlight>}
                            {/* THIS IS SQUARE TWO ================================================================================== */}
                            {this.state.board[1].source ? <TouchableHighlight style={[styles.square, { backgroundColor: '#FAA030' }]}
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
                                    }}><Text>{this.state.board[1].name}</Text></TouchableHighlight>}
                            {/* THIS IS SQUARE THREE ================================================================================== */}
                            {this.state.board[2].source ? <TouchableHighlight style={[styles.square, { backgroundColor: '#32B76C' }]}
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
                                    }}><Text>{this.state.board[2].name}</Text></TouchableHighlight>}
                        </View>
                        <View style={styles.column}>
                            {/* THIS IS COLUMN ONE ================================================================================== */}
                            {/* THIS IS SQUARE FOUR ================================================================================== */}
                            {this.state.board[3].source ? <TouchableHighlight style={[styles.square, { backgroundColor: '#FAA030' }]}
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
                                    }}><Text>{this.state.board[3].name}</Text></TouchableHighlight>}
                            {/* THIS IS SQUARE FIVE ================================================================================== */}
                            {this.state.board[4].source ? <TouchableHighlight style={[styles.square, { backgroundColor: '#32B76C' }]}
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
                                    }}><Text>{this.state.board[4].name}</Text></TouchableHighlight>}
                            {/* THIS IS SQUARE SIX ================================================================================== */}
                            {this.state.board[5].source ? <TouchableHighlight style={[styles.square, { backgroundColor: '#EE2C38' }]}
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
                                    }}><Text>{this.state.board[5].name}</Text></TouchableHighlight>}
                        </View>
                        <View style={styles.column}>
                            {/* THIS IS COLUMN ONE ================================================================================== */}
                            {/* THIS IS SQUARE SEVEN ================================================================================== */}
                            {this.state.board[6].source ? <TouchableHighlight style={[styles.square, { backgroundColor: '#EE2C38' }]}
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
                                    }}><Text>{this.state.board[6].name}</Text></TouchableHighlight>}
                            {/* THIS IS SQUARE EIGHT ================================================================================== */}
                            {this.state.board[7].source ? <TouchableHighlight style={[styles.square, { backgroundColor: '#FAA030' }]}
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
                                    }}><Text>{this.state.board[7].name}</Text></TouchableHighlight>}
                            {/* THIS IS SQUARE NINE ================================================================================== */}
                            {this.state.board[8].source ? <TouchableHighlight style={[styles.square, { backgroundColor: '#32B76C' }]}
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
                                    }}><Text>{this.state.board[8].name}</Text></TouchableHighlight>}
                        </View>
                    </View>
                    {/* <View style={{ flex: 1, flexDirection: "column", paddingVertical: 50, paddingHorizontal: 10, }}>
                        <Button title="Sign out" onPress={this.onSignoutPress} />
                    </View> */}
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
                                    {this.state.currentSource ? 
                                    // <ImageBackground source={{ uri: this.state.currentSource }}
                                    //     style={styles.imageCheck} > 
                                    //     <Button
                                    //     title="Retake"
                                    //     style={{ flex: 0, backgroundColor: 'red' }}
                                    //     onPress={() => {
                                    //         this.setState({currentSource: null});
                                    //     }}/> 
                                    // <Button
                                    // title="Keep"
                                    // style={{ flex: 0, backgroundColor: 'red' }}
                                    // onPress={() => {
                                    //     this.setModalVisible(!this.state.modalVisible);
                                    //     this.setState({currentSource: null})
                                    // }} /></ImageBackground>
                                    //Testing absolute fill view =========================================================
                                    //Working sample of creating own imagebackground
                                    <View style={ {flex: 1}}>
                                     <Image source={{ uri: this.state.currentSource }}
                                    style={[ styles.imageCheck, StyleSheet.absoluteFill]} />
                                     <Button
                                        title="Retake"
                                        style={{ flex: 0, backgroundColor: 'red' }}
                                        onPress={() => {
                                            this.setState({currentSource: null});
                                        }}/> 
                                    <Button
                                    title="Keep"
                                    style={{ flex: 0, backgroundColor: 'red' }}
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                        this.setState({currentSource: null})
                                    }} />
                                    </View>
                                 : 
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
                                        </Camera>}
                                </View>
                            </View>
                        </View>
                    </Modal>
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
    },
    imageCheck:{
        flex: 1,
        transform: [{ rotate: '90deg' }]
    }
}
//     return (
//       <ScrollView style={{ flex: 1, flexDirection: "column", paddingVertical: 50, paddingHorizontal: 10, }}>
//         <Button title="Sign out" onPress={this.onSignoutPress} />
//       </ScrollView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   text: { color: "white", fontWeight: "bold", textAlign: "center", fontSize: 20, },
//   textInput: { borderWidth: 1, borderColor: "gray", marginVertical: 20, padding: 10, height: 40, alignSelf: "stretch", fontSize: 18, },
// });
