import React, {Component} from "react";
import {Image, Text, StyleSheet, View} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import AppContext from "../../context/AppContext";
import Button from "../../theme/components/Button/Button";
import Colors from "../../theme/variables/Colors";
import Metrics from "../../theme/variables/Metrics";

class PhotoListItem extends Component {
    render() {
        const {photo: {photo}} = this.props;
        return (
            <Swipeable renderRightActions={this.renderRightActions}>
                <View style={styles.row}>
                    <Image source={{uri: photo.uri}} style={{height: photo.height}}/>
                </View>
            </Swipeable>
        );
    }

    renderRightActions = () => {
        return (
            <View style={styles.deleteAction}>
                <Button
                    buttonStyle={{
                        height: '100%'
                    }}
                    transparent
                    onPress={this._deletePhoto}>
                    <Text style={{color: Colors.light}}>Delete</Text>
                </Button>
            </View>
        );
    };

    _deletePhoto = () => {
        const {photo} = this.props;
        this.context.deletePhoto(photo);
    };

}

PhotoListItem.contextType = AppContext;

export default PhotoListItem;

const styles = StyleSheet.create({
    deleteAction: {
        width: 200,
        backgroundColor: Colors.dangerDark
    },
    row: {
        backgroundColor: Colors.white,
        paddingVertical: Metrics.defaultPadding,
        borderBottomColor: Colors.highlight,
        borderBottomWidth: 1
    }
});
