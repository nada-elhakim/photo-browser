import React, {Component} from "react";
import {RNCamera} from "react-native-camera";
import {Image, StyleSheet, Text, View} from "react-native";
import Button from "../../theme/components/Button/Button";
import Metrics from "../../theme/variables/Metrics";
import Colors from "../../theme/variables/Colors";
import PropTypes from "prop-types";

const NoCameraPermission = () => {
    return (
        <View style={{flex: 1, marginTop: 60}}>
            <Text style={styles.noPermissionText}>No camera permission</Text>
        </View>
    )
};

class CameraView extends Component {
    render() {
        const {onClosePressed} = this.props;
        return (
            <View style={styles.cameraContainer}>
                <RNCamera
                    notAuthorizedView={<NoCameraPermission />}
                    captureAudio={false}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    androidCameraPermissionOptions={{
                        title: "Permission to use camera",
                        message: "We need your permission to use your camera",
                        buttonPositive: "Ok",
                        buttonNegative: "Cancel",
                    }}>
                    {
                        ({camera, status}) => {
                            this.camera = camera;
                            this.cameraStatus = status;
                        }
                    }
                </RNCamera>
                <View style={styles.cameraButtons}>
                    <Button buttonStyle={styles.captureButton} onPress={this.takePicture.bind(this)}>
                        <Image style={styles.captureImg} source={require("../../assets/img/camera.png")}/>
                    </Button>
                    <Button buttonStyle={styles.closeButton} onPress={onClosePressed}>
                        <Image style={styles.closeImg} source={require("../../assets/img/close.png")}/>
                    </Button>
                </View>
            </View>
        )
    }

    async takePicture() {
        const {onPictureTaken} = this.props;
        if (this.camera && this.cameraStatus === RNCamera.Constants.CameraStatus.READY) {
            const options = {
                quality: 0.7,
            };
            const data = await this.camera.takePictureAsync(options);
            onPictureTaken(data);
        }
    }
}

export default CameraView;

CameraView.propTypes = {
    onPictureTaken: PropTypes.func,
    onClosePressed: PropTypes.func
};


const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "black",
    },
    preview: {
        flex: 1,
        alignItems: "center",
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
        flexDirection: "row",
        paddingVertical: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black"
    },
    noPermissionText: {
        color: Colors.white,
        textAlign: "center"
    }
});
