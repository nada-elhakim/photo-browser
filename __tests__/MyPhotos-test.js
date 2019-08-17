import 'react-native';
import React from 'react';
import {FlatList, Text} from 'react-native';
import MyPhotos, {Loading} from '../app/screens/MyPhotos/MyPhotos';
import {shallow, mount} from "enzyme"
import AppContext from "../app/context/AppContext";
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import AppProvider from "../app/context/AppProvider";

describe('<MyPhotos />', () => {
    let wrapper;
    let props;
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

    const defaultContext = {
        myPhotos: null,
        loadPhotos: jest.fn()
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

    it('Should render myPhotos in a flat list', () => {
        const context = {
            myPhotos: MY_PHOTOS,
            loadPhotos: jest.fn(),
            uploadPhoto: jest.fn(),
            deletePhoto: jest.fn()
        };
        const inst = renderer.create(
            <AppContext.Provider value={context}>
                <MyPhotos {...props}/>
            </AppContext.Provider>
        );

        const listInst = inst.root.findAllByType(FlatList);

        expect(listInst).toHaveLength(1);
    });
});


