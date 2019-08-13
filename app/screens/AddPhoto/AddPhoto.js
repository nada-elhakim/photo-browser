import React, { Fragment } from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import Button from "../../theme/components/Button/Button";
import {RNCamera} from 'react-native-camera';
import AppContext from "../../context/AppContext";
import AppStyles from "../../theme/styles/AppStyles";
import Metrics from "../../theme/variables/Metrics";
import Colors from "../../theme/variables/Colors";
import ResponsiveImage from "../../theme/components/ResponsiveImage/ResponsiveImage";

class AddPhoto extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Add Photo',
            headerTintColor: 'black'
        }
    };

    state = {
        showCamera: false,
        photo: null,
    };

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
            <ScrollView contentContainerStyle={[AppStyles.container, {paddingBottom: 30}]}>
                <Button onPress={this._openCamera}>
                    <Text>Take photo</Text>
                </Button>

                {this.state.photo && <Fragment>
                    <ResponsiveImage
                        style={styles.capturedImage}
                        source={{uri: this.state.photo.uri}}
                        width={Metrics.windowWidth - Metrics.defaultMargin * 2}/>
                    <Button onPress={this._uploadPhoto}>
                        <Text>Upload photo</Text>
                    </Button>
                </Fragment>}
            </ScrollView>
        );
    }

    renderCameraView() {
            return (
                <View style={styles.cameraContainer}>
                    <RNCamera
                        notAuthorizedView={this.renderNoCameraPermission()}
                        captureAudio={false}
                        style={styles.preview}
                        type={RNCamera.Constants.Type.back}
                        androidCameraPermissionOptions={{
                            title: 'Permission to use camera',
                            message: 'We need your permission to use your camera',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}>
                        {
                            ({camera, status}) => {
                                this.camera = camera;
                                this.cameraStatus = status;
                            }
                        }
                    </RNCamera>
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

    renderNoCameraPermission() {
        return (
            <View style={{flex: 1, marginTop: 60}}>
                <Text style={styles.noPermissionText}>No camera permission</Text>
            </View>
        )
    }

    _openCamera = () => {
        this.setState({showCamera: true});
    };

    _closeCamera = () => {
        this.setState({showCamera: false});
    };

    _takePicture = async() => {
        if (this.camera && this.cameraStatus === RNCamera.Constants.CameraStatus.READY) {
            const options = {
                quality: 0.7,
            };
            const data = await this.camera.takePictureAsync(options);
            this.setState({showCamera: false, photo: data});
        }
    };

    _uploadPhoto = () => {
        this.context.uploadPhoto({
            id: Date.now(),
            photo: this.state.photo
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
        marginVertical: Metrics.defaultMargin
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
