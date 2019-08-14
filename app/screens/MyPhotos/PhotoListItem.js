import React, {Component} from "react";
import {Text, StyleSheet, View} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import AppContext from "../../context/AppContext";
import Button from "../../theme/components/Button/Button";
import Colors from "../../theme/variables/Colors";
import Metrics from "../../theme/variables/Metrics";
import ResponsiveImage from "../../theme/components/ResponsiveImage/ResponsiveImage";

class PhotoListItem extends Component {
    render() {
        const {photo: {photo}} = this.props;
        return (
            <View style={styles.row}>
                <Swipeable renderRightActions={this.renderRightActions.bind(this)}>
                    <ResponsiveImage
                        width={Metrics.windowWidth}
                        source={{uri: photo.uri}} />
                </Swipeable>
            </View>
        );
    }

    renderRightActions() {
        return (
            <View style={styles.deleteAction}>
                <Button
                    buttonStyle={{
                        height: "100%"
                    }}
                    transparent
                    onPress={this.deletePhoto.bind(this)}>
                    <Text style={{color: Colors.light}}>Delete</Text>
                </Button>
            </View>
        );
    }

    deletePhoto() {
        const {photo} = this.props;
        this.context.deletePhoto(photo);
    }
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
