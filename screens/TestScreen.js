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
import { Square } from './../components/AppComponents';


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
        //Generate board if there isn't an active board.
        if (!this.state.activeBoard) {
            this.generateBoard()
        }
        //Lock screen orientation
        Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP);
        // let newBoard = null;
        // const active = true;
        // const challenges = []
        // console.log("Starting")
        // while (challenges.length < 9) {
        //     let newChallenge = anime[Math.floor(Math.random() * anime.length)].anime
        //     if (!challenges.includes(newChallenge)) {
        //         challenges.push(newChallenge)
        //     }
        // }
        // newBoard = this.state.board
        // for (let i = 0; i < challenges.length; i++) {
        //     newBoard[i].name = challenges[i]
        // }
        // this.setState({ board: newBoard })
        // this.setState({ activeBoard: active })
    }

    generateBoard() {

        let newBoard = [{ name: 'One', source: null },
        { name: 'Two', source: null },
        { name: 'Three', source: null },
        { name: 'Four', source: null },
        { name: 'Five', source: null },
        { name: 'Six', source: null },
        { name: 'Seven', source: null },
        { name: 'Eight', source: null },
        { name: 'Nine', source: null }]

        this.setState({board: newBoard})

    
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
        let photo = await this.camera.takePictureAsync({ base64: false, exif: false });

        let saveResult = await CameraRoll.saveToCameraRoll(photo.uri, 'photo');

        this.setState({ currentSource: photo.uri })

        let newBoard = null;
        switch (this.state.currentSquare) {
            case 0:
                newBoard = this.state.board
                newBoard[0].source = photo.uri
                this.setState({ board: newBoard })
                break;
            case 1:
                newBoard = this.state.board
                newBoard[1].source = photo.uri
                this.setState({ board: newBoard })
                break;
            case 2:
                newBoard = this.state.board
                newBoard[2].source = photo.uri
                this.setState({ board: newBoard })
                break;
            case 3:
                newBoard = this.state.board
                newBoard[3].source = photo.uri
                this.setState({ board: newBoard })
                break;
            case 4:
                newBoard = this.state.board
                newBoard[4].source = photo.uri
                this.setState({ board: newBoard })
                break;
            case 5:
                newBoard = this.state.board
                newBoard[5].source = photo.uri
                this.setState({ board: newBoard })
                break;
            case 6:
                newBoard = this.state.board
                newBoard[6].source = photo.uri
                this.setState({ board: newBoard })
                break;
            case 7:
                newBoard = this.state.board
                newBoard[7].source = photo.uri
                this.setState({ board: newBoard })
                break;
            case 8:
                newBoard = this.state.board
                newBoard[8].source = photo.uri
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

    pullUpCamera = (id) => {
        this.setModalVisible(true);
        this.setState({ currentSquare: id })
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
                <View style={{flex: 1, alignContent: 'flex-start'}}>
                <View style={styles.container}
                    collapsable={false}
                    ref={view => {
                        this._container = view;
                    }} >
                    <View style={styles.board}>
                        <View style={styles.column}>
                            <Square onPress={() => { this.pullUpCamera(0) }} //SQUARE ONE
                                source={this.state.board[0].source}
                                name={this.state.board[0].name}
                                color={"#EE2C38"} />
                            <Square onPress={() => { this.pullUpCamera(1) }} //SQUARE TWO
                                source={this.state.board[1].source}
                                name={this.state.board[1].name}
                                color={"#FAA030"} />
                            <Square onPress={() => { this.pullUpCamera(2) }} //SQUARE THREE
                                source={this.state.board[2].source}
                                name={this.state.board[2].name}
                                color={"#32B76C"} />
                        </View>
                        <View style={styles.column}>
                            {/* THIS IS COLUMN TWO ================================================================================== */}
                            <Square onPress={() => { this.pullUpCamera(3) }} //SQUARE FOUR
                                source={this.state.board[3].source}
                                name={this.state.board[3].name}
                                color={"#FAA030"} />
                            <Square onPress={() => { this.pullUpCamera(4) }} //SQUARE FIVE
                                source={this.state.board[4].source}
                                name={this.state.board[4].name}
                                color={"#32B76C"} />
                            <Square onPress={() => { this.pullUpCamera(5) }} //SQUARE SIX
                                source={this.state.board[5].source}
                                name={this.state.board[5].name}
                                color={"#EE2C38"} />
                        </View>
                        <View style={styles.column}>
                            {/* THIS IS COLUMN THREE ================================================================================== */}
                            <Square onPress={() => { this.pullUpCamera(6) }} //SQUARE SEVEN
                                source={this.state.board[6].source}
                                name={this.state.board[6].name}
                                color={"#EE2C38"} />
                            <Square onPress={() => { this.pullUpCamera(7) }} //SQUARE EIGHT
                                source={this.state.board[7].source}
                                name={this.state.board[7].name}
                                color={"#FAA030"} />
                            <Square onPress={() => { this.pullUpCamera(8) }} //SQUARE NINE
                                source={this.state.board[8].source}
                                name={this.state.board[8].name}
                                color={"#32B76C"} />
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
                                        <ImageBackground source={{ uri: this.state.currentSource }}
                                            style={styles.imageCheck}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Button
                                                    title="Retake"
                                                    style={{}}
                                                    onPress={() => {
                                                        this.setState({ currentSource: null });
                                                    }} />
                                                <Button
                                                    title="Keep"
                                                    style={{}}
                                                    onPress={() => {
                                                        this.setModalVisible(!this.state.modalVisible);
                                                        this.setState({ currentSource: null })
                                                    }} /></View></ImageBackground>
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
                                                    justifyContent: 'space-between'
                                                }} >
                                                <Button
                                                    title="Back"
                                                    // style={{ position: "absolute", top: 0, left: 0 }}
                                                    onPress={() => {
                                                        this.setModalVisible(!this.state.modalVisible);
                                                    }}
                                                />
                                                <Button
                                                    title="Flip"
                                                    // style={{ position: "absolute", top: 0, right: 0 }}
                                                    onPress={() => {
                                                        this.setState({
                                                            type: this.state.type === Camera.Constants.Type.back
                                                                ? Camera.Constants.Type.front
                                                                : Camera.Constants.Type.back,
                                                        })
                                                    }}
                                                />
                                            </View>
                                            {/* <TouchableOpacity
                                             title="Snap"
                                             onPress={this.press.bind(this)}

                                                style={{
                                                    borderWidth:1,
                                                    borderColor:'rgba(255,255,255,0.2)',
                                                    // alignItems:'center',
                                                    // justifyContent:'center',
                                                    width:100,
                                                    height:100,
                                                    backgroundColor:'#fff',
                                                    borderRadius:100,
                                                    }}
                                                >
                                                </TouchableOpacity> */}
                                            <Button
                                                title="Snap"
                                                style={{ backgroundColor: 'red' }}
                                                onPress={this.press.bind(this)}
                                            />
                                        </Camera>}
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
                <View style={{flex: 0, 
                    // borderColor: 'red', borderWidth: 20
                    }}>
                    <Button
                        title="Generate New Board"
                        style={{}}
                        onPress={()=>{this.generateBoard()}}
                    />
                </View>
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
        // flex: 1,
        backgroundColor: 'black',
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
        // transform: [{ rotate: '90deg' }],
    },
    camera: {
        flex: 1,
        borderWidth: 1,
        backgroundColor: 'red',
        // alignItems: 'center',
    },
    imageCheck: {
        flex: 1,
        justifyContent: "flex-end",
        flexDirection: 'column'
        // transform: [{ rotate: '90deg' }]
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
