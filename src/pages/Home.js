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
  ScrollView
} from 'react-native';

import { Camera, FileSystem, Permissions, Constants, takeSnapshotAsync, ImagePicker } from 'expo';
import Square from "../components/square";
import anime from "../../anime.json";

// =================================================================

export default class Home extends Component {

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.front,
    cameraRollUri: null,
    image: null,
    source: null,
    anime,
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

  //this works!!!
  async press() {

    console.log('Button Pressed');

    console.log('Taking photo');
    let photo = await this.camera.takePictureAsync({ base64: true, exif: true });

    let saveResult = await CameraRoll.saveToCameraRoll(photo.uri, 'photo');
    this.setState({ cameraRollUri: saveResult });
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

          <View style={[{ flex: 1, flexDirection: 'row' }, styles.elementsContainer]}>
            <View style={{ flex: 1, backgroundColor: '#EE2C38' }} />
            <View style={{ flex: 1, backgroundColor: '#FAA030' }} />
            <View style={{ flex: 1, backgroundColor: '#32B76C' }} />
          </View>
          <View style={[{ flex: 1, flexDirection: 'row' }, styles.elementsContainer]}>
            <View style={{ flex: 1, backgroundColor: '#32B76C' }} />



            {this.state.cameraRollUri ?
              <Image
                source={{ uri: this.state.cameraRollUri }}
                style={{ flex: 1 }}
              /> : <View style={{ flex: 1, backgroundColor: '#EE2C38' }} />}




            <View style={{ flex: 1, backgroundColor: '#FAA030' }} />
          </View>
          <View style={[{ flex: 1, flexDirection: 'row' }, styles.elementsContainer]}>

            <Camera
              style={{ flex: 1 }}
              ref={(ref) => { this.camera = ref }}
            >
              <View style={{ flex: 1 }}></View>

            </Camera>

            <View style={{ flex: 1, backgroundColor: '#FAA030' }} ><Text>save To Camera Roll Async</Text></View>

            <View style={{ flex: 1, backgroundColor: '#32B76C' }} >


              <Text>ImageClicker</Text>

              <Button
                title="Click On Me"
                style={{ flex: 0, backgroundColor: 'red' }}
                onPress={this.press.bind(this)}
              />


            </View>
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
    //   flexDirection: 'row',
    flex: 0.7,
    // aspectRatio: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    alignItems: 'center'
  },
  headerStyle: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: '100',
    marginBottom: 24
  },
  elementsContainer: {
    backgroundColor: '#ecf5fd',
    //   marginLeft: 24,
    //   marginRight: 24,
    //   marginBottom: 24
  },
  squareContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
}

      // =================================================================


