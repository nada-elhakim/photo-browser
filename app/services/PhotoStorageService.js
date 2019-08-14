import AsyncStorage from "@react-native-community/async-storage";

class PhotoStorageService {
    async savePhotos(photos) {
        try {
            AsyncStorage.setItem("myContainer", JSON.stringify(photos));
        } catch (error) {
            console.log("error", error);
        }
    }
    async loadPhotos() {
        try {
            const myContainer = await AsyncStorage.getItem("myContainer");
            return myContainer ? JSON.parse(myContainer): [];
        } catch (error) {
            console.log(error);
        }
    }
}

export default PhotoStorageService;
