import AsyncStorage from '@react-native-community/async-storage';

class PhotoStorageService {
    async savePhotos(photos) {
        try {
            AsyncStorage.setItem('myContainer', JSON.stringify(photos));
        } catch (error) {
            console.log('error', error);
        }
    }
    async loadPhotos() {
        try {
            const myContainer = await AsyncStorage.getItem('myContainer');
            return myContainer ? JSON.parse(myContainer): [
                {
                    id: 1,
                    photo: {
                        uri: 'https://sugarfreelondoner.com/wp-content/uploads/2019/05/sugar-free-milk-chocolate.jpg',
                        width: 496,
                        height: 662
                    }}
            ];
        } catch (error) {
            console.log(error);
        }
    }
}

export default PhotoStorageService;
