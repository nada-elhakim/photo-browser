import React from "react";
import {View, Image, Text, FlatList, ActivityIndicator} from "react-native";
import Button from "../../theme/components/Button/Button";
import AppContext from "../../context/AppContext";
import PhotoListItem from "./PhotoListItem";
import AppStyles from "../../theme/styles/AppStyles";
import Metrics from "../../theme/variables/Metrics";
import Colors from "../../theme/variables/Colors";

const NoPhotosMessage = ({addPhoto}) => {
    return (
        <View style={[AppStyles.center, {paddingVertical: Metrics.defaultPadding}]}>
            <Text style={{marginBottom: Metrics.defaultMargin}}>You haven't added any photos yet.</Text>
            <Button onPress={addPhoto} containerStyle={{width: 120}}>
                <Text>Add photo</Text>
            </Button>
        </View>
    )
};

class MyPhotos extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'My Photos',
            headerRight: (
                <Button transparent={true} buttonStyle={{paddingHorizontal: 16}} onPress={navigation.getParam('addPhoto')}>
                    <Image source={require('../../assets/img/plus.png')} style={{width: 24, height: 24}}/>
                </Button>
            )
        }
    };

    componentDidMount() {
        this.context.loadPhotos();
        this.props.navigation.setParams({ addPhoto: this._addPhoto });
    }

    render() {
        const {myPhotos} = this.context;
        if (!myPhotos) {
            return (
                <View style={[AppStyles.container, AppStyles.center]}>
                    <ActivityIndicator color={Colors.light} />
                </View>
            );
        }
        return (
            <View style={[AppStyles.container, {padding: 0}]}>
                <FlatList
                    data={myPhotos}
                    keyExtractor={this._keyExtractor}
                    ListEmptyComponent={<NoPhotosMessage addPhoto={this._addPhoto}/>}
                    renderItem={({item}) => <PhotoListItem photo={item}/>}
                />
            </View>

        )
    }

    _addPhoto = () => {
        this.props.navigation.navigate('AddPhoto');
    };

    _keyExtractor = (item) => item.id.toString();
}

export default MyPhotos;

MyPhotos.contextType = AppContext;
