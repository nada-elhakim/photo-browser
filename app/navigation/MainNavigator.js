import { createStackNavigator, createAppContainer } from "react-navigation";
import MyPhotos from "../screens/MyPhotos/MyPhotos";
import AddPhoto from "../screens/AddPhoto/AddPhoto";

const MainStack = createStackNavigator({
    MyPhotos: MyPhotos
});

const AppNavigator = createStackNavigator({
    Main: {
        screen: MainStack,
        navigationOptions: {
            header: null,
            headerBackTitle: null
        }
    },
    AddPhoto: AddPhoto
}, {
    mode: "modal",
});

export default createAppContainer(AppNavigator);
