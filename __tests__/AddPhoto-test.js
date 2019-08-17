import "react-native";
import React from "react";
import AddPhoto from "../app/screens/AddPhoto/AddPhoto";
import AppContext from "../app/context/AppContext";
import renderer from "react-test-renderer";

describe('<AddPhoto />', () => {
    let props;

    const PHOTO = {
        id: 1,
        photo: {
            uri: 'test',
            width: 300,
            height: 300
        },
    };

    const DEFAULT_CONTEXT = {
        myPhotos: [],
        uploadPhoto: jest.fn(function(photo) {
            this.myPhotos.unshift(photo);
        })
    };

    const createTestProps = (props: Object) => ({
        navigation: {
            goBack: jest.fn()
        },
        photo: PHOTO,
        ...props
    });

    beforeEach(() => {
        props = createTestProps({});
    });

    it('Should render', () => {
        renderer.create(
            <AppContext.Provider value={DEFAULT_CONTEXT}>
                <AddPhoto {...props}/>
            </AppContext.Provider>
        );
    });

    it('Should upload photo taken and navigate back', () => {
        const tree = renderer.create(
            <AppContext.Provider value={DEFAULT_CONTEXT}>
                <AddPhoto {...props}/>
            </AppContext.Provider>
        );
        const instance = tree.root.findByType(AddPhoto).instance;

        instance.state = {
            photo: PHOTO
        };
        instance.uploadPhoto();

        expect(instance.context.uploadPhoto).toHaveBeenCalledWith(PHOTO);
        expect(instance.context.myPhotos).toEqual([PHOTO]);
        expect(instance.props.navigation.goBack).toHaveBeenCalled();
    });
});


