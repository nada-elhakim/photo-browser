import "react-native";
import React from "react";
import {FlatList} from "react-native";
import MyPhotos, {Loading} from "../app/screens/MyPhotos/MyPhotos";
import AppContext from "../app/context/AppContext";
import renderer from "react-test-renderer";

describe('<MyPhotos />', () => {
    let props;
    let myPhotosInst;

    const MY_PHOTOS = [
        {
            id: Date.now(),
            photo: {
                uri: '',
                width: 300,
                height: 300
            }
        }
    ];

    const DEFAULT_CONTEXT = {
        myPhotos: MY_PHOTOS,
        loadPhotos: jest.fn(),
        uploadPhoto: jest.fn(),
        deletePhoto: jest.fn()
    };

    const createTestProps = (props: Object) => ({
        navigation: {
            navigate: jest.fn(),
            setParams: jest.fn(),
        },
        ...props
    });

    beforeEach(() => {
        props = createTestProps({});
        myPhotosInst = renderer.create(
            <AppContext.Provider value={DEFAULT_CONTEXT}>
                <MyPhotos {...props}/>
            </AppContext.Provider>
        );
    });

    it('Should load myPhotos when component mount', () => {
        const context = {
            myPhotos: null,
            loadPhotos: jest.fn()
        };

        renderer.create(
            <AppContext.Provider value={context}>
                <MyPhotos {...props}/>
            </AppContext.Provider>
        );

        expect(context.loadPhotos).toHaveBeenCalled();
    });

    it('Should render loader component when context.myPhotos is null', () => {
        const context = {
            myPhotos: null,
            loadPhotos: jest.fn()
        };

        const inst = renderer.create(
            <AppContext.Provider value={context}>
                <MyPhotos {...props}/>
            </AppContext.Provider>
        );

        const loadingInst = inst.root.findAllByType(Loading);

        expect(loadingInst).toHaveLength(1);
    });

    it('Should render myPhotos in a flat list', () => {
        const listInst = myPhotosInst.root.findAllByType(FlatList);
        expect(listInst).toHaveLength(1);
    });
});


