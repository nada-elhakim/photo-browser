import React, {Component} from "react";
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

const Loading = () => {
    return (
        <View style={[AppStyles.container, AppStyles.center]}>
            <ActivityIndicator color={Colors.light} />
        </View>
    )
};

class MyPhotos extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: "My Photos",
            headerRight: (
                <Button
                    transparent
                    buttonStyle={{paddingHorizontal: Metrics.defaultPadding}}
                    onPress={navigation.getParam("addPhoto")}>
                    <Image source={require("../../assets/img/plus.png")} style={{width: 24, height: 24}}/>
                </Button>
            )
        }
    };

    componentDidMount() {
        this.context.loadPhotos();
        this.props.navigation.setParams({addPhoto: this.addPhoto.bind(this)});
    }

    render() {
        const {myPhotos} = this.context;
        console.log(myPhotos);

        if (!myPhotos) {
            return <Loading/>
        }
        return (
            <View style={[AppStyles.container, {padding: 0}]}>
                <FlatList
                    data={myPhotos}
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={<NoPhotosMessage addPhoto={this.addPhoto.bind(this)}/>}
                    renderItem={({item}) => <PhotoListItem photo={item}/>}
                />
            </View>

        )
    }

    addPhoto() {
        this.props.navigation.navigate("AddPhoto");
    }
}

export default MyPhotos;

MyPhotos.contextType = AppContext;
