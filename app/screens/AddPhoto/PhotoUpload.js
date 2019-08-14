import React, {Fragment} from "react";
import {ScrollView, Text} from "react-native";
import Button from "../../theme/components/Button/Button";
import Metrics from "../../theme/variables/Metrics";
import AppStyles from "../../theme/styles/AppStyles";
import ResponsiveImage from "../../theme/components/ResponsiveImage/ResponsiveImage";
import PropTypes from "prop-types";

const PhotoUpload = ({photo, onUploadPressed, onOpenCameraPressed}) => {
    return (
        <ScrollView contentContainerStyle={[AppStyles.container, {paddingBottom: 30}]}>
            <Button onPress={onOpenCameraPressed}>
                <Text>Take photo</Text>
            </Button>

            {
                photo &&
                    <Fragment>
                        <ResponsiveImage
                            style={{marginVertical: Metrics.defaultMargin}}
                            source={{uri: photo.uri}}
                            width={Metrics.windowWidth - Metrics.defaultMargin * 2}/>
                        <Button onPress={onUploadPressed}>
                            <Text>Upload photo</Text>
                        </Button>
                    </Fragment>
            }
        </ScrollView>
    );
};

export default PhotoUpload;

PhotoUpload.propTypes = {
    photo: PropTypes.shape({
        uri: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number
    }),
    onUploadPressed: PropTypes.func,
    onOpenCameraPressed: PropTypes.func
};

