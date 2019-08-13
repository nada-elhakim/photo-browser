import React, { Fragment } from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Button from "../../theme/components/Button/Button";
import {RNCamera} from 'react-native-camera';
import AppContext from "../../context/AppContext";
import AppStyles from "../../theme/styles/AppStyles";
import Metrics from "../../theme/variables/Metrics";
import Colors from "../../theme/variables/Colors";

class AddPhoto extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Add Photo',
            headerTintColor: 'black'
        }
    };

    state = {
        showCamera: false,
        photoUri: null,
        cameraStatus: true
    };

    componentDidMount() {

    }

    render() {
        return (
            <Fragment>
                {
                    this.state.showCamera ?
                        this.renderCameraView() :
                        this.renderUploadPhotoView()
                }
            </Fragment>
        )
    }

    renderUploadPhotoView() {
        return (
            <View style={[AppStyles.container]}>
                <Button onPress={this._openCamera}>
                    <Text>Take photo</Text>
                </Button>

                {this.state.photoUri && <Fragment>
                    <Image resizeMode={'contain'} source={{uri: this.state.photoUri}} style={styles.capturedImage}/>
                    <Button onPress={this._uploadPhoto}>
                        <Text>Upload photo</Text>
                    </Button>
                </Fragment>}
            </View>
        );
    }

    renderCameraView() {
            return (
                <View style={styles.cameraContainer}>
                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        notAuthorizedView={(
                            <View style={{flex: 1, marginTop: 60}}>
                                <Text style={styles.noPermissionText}>No camera permission</Text>
                            </View>
                        )}
                        captureAudio={false}
                        onCameraReady={this._onCameraReady}
                        onStatusChange={this._cameraStatusChanged}
                        style={styles.preview}
                        type={RNCamera.Constants.Type.back}

                        androidCameraPermissionOptions={{
                            title: 'Permission to use camera',
                            message: 'We need your permission to use your camera',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }} />
                    <View style={styles.cameraButtons}>
                        <Button buttonStyle={styles.captureButton} onPress={this._takePicture}>
                            <Image style={styles.captureImg} source={require('../../assets/img/camera.png')}/>
                        </Button>
                        <Button buttonStyle={styles.closeButton} onPress={this._closeCamera}>
                            <Image style={styles.closeImg} source={require('../../assets/img/close.png')}/>
                        </Button>
                    </View>
                </View>
            );

    }

    _cameraStatusChanged = (status) => {
        console.log(status);
        this.setState({cameraStatus: status});
    };

    _onCameraReady = () => {
        console.log('ready');
        this.setState({cameraStatus: 'READY'});
    };

    _openCamera = () => {
        this.setState({showCamera: true});
    };

    _closeCamera = () => {
        this.setState({showCamera: false});
    };

    _takePicture = async() => {
        if (this.camera) {
            const options = { quality: 0.5 };
            const data = await this.camera.takePictureAsync(options);
            this.setState({showCamera: false, photoUri: data.uri});
        }
    };

    _uploadPhoto = () => {
        this.context.uploadPhoto({
            id: Date.now(),
            uri: this.state.photoUri
        });
        this.props.navigation.goBack();
    };
}

export default AddPhoto;

AddPhoto.contextType = AppContext;

const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: Metrics.defaultPadding,
    },
    captureButton: {
        height: 60,
        width: 60,
        borderRadius: 30,
        marginEnd: Metrics.defaultMargin,
        marginLeft: 40 + Metrics.defaultMargin
    },
    captureImg: {
        width: 30,
        height: 30
    },
    closeButton: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    closeImg: {
        width: 20,
        height: 20
    },
    capturedImage: {
        marginVertical: Metrics.defaultMargin,
        flex: 1,
        height: undefined
    },
    cameraButtons: {
        flexDirection: 'row',
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    noPermissionText: {
        color: Colors.white,
        textAlign: 'center'
    }
});
