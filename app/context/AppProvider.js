import React, {Component} from "react";
import PhotoStorageService from "../services/PhotoStorageService";
import AppContext from "./AppContext";

class AppProvider extends Component {
    state = {
        myPhotos: null
    };

    photoStorageService = new PhotoStorageService();

    async loadPhotos() {
        const photos = await this.photoStorageService.loadPhotos();
        this.setState({myPhotos: photos});
    }

    uploadPhoto(photo) {
        const photos = this.state.myPhotos;
        photos.unshift(photo);
        this.setState({myPhotos: photos});
        this.photoStorageService.savePhotos(photos);
    }

    deletePhoto(photo) {
        const filteredPhotos = this.state.myPhotos.filter(savedPhoto => savedPhoto.id !== photo.id);
        this.setState({myPhotos: filteredPhotos});
        this.photoStorageService.savePhotos(filteredPhotos);
    }

    render() {
        return (
            <AppContext.Provider
                value={{
                    myPhotos: this.state.myPhotos,
                    loadPhotos: this.loadPhotos.bind(this),
                    uploadPhoto: this.uploadPhoto.bind(this),
                    deletePhoto: this.deletePhoto.bind(this)
                }}
            >
                {this.props.children}
            </AppContext.Provider>
        )
    }
}

export default AppProvider;
