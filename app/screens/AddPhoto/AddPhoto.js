import React, { Fragment } from "react";
import AppContext from "../../context/AppContext";
import CameraView from "./CameraView";
import PhotoUpload from "./PhotoUpload";

class AddPhoto extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Add Photo",
            headerTintColor: "black"
        }
    };

    state = {
        showCamera: false,
        photo: null,
    };

    render() {
        const {showCamera, photo} = this.state;
        return (
            <Fragment>
                {
                    showCamera ?
                        <CameraView
                            onPictureTaken={this.onPictureTaken.bind(this)}
                            onClosePressed={this.closeCamera.bind(this)}/> :
                        <PhotoUpload
                            photo={photo}
                            onUploadPressed={this.uploadPhoto.bind(this)}
                            onOpenCameraPressed={this.openCamera.bind(this)}/>
                }
            </Fragment>
        )
    }

    openCamera() {
        this.setState({showCamera: true});
    }

    closeCamera() {
        this.setState({showCamera: false});
    }

    uploadPhoto() {
        this.context.uploadPhoto({
            id: Date.now(),
            photo: this.state.photo
        });
        this.props.navigation.goBack();
    }

    onPictureTaken(data) {
        this.setState({showCamera: false, photo: data});
    }
}

export default AddPhoto;

AddPhoto.contextType = AppContext;

