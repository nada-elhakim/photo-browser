import React, {Component} from 'react';
import {createAppContainer} from "react-navigation";
import AppNavigator from "./app/navigation/MainNavigator";
import AppContext from "./app/context/AppContext";
import PhotoStorageService from "./app/services/PhotoStorageService";

const AppContainer = createAppContainer(AppNavigator);

class App extends Component {
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
                <AppContainer />
            </AppContext.Provider>
        )
    }
}

export default App;
