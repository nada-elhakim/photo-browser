import 'react-native';
import React from 'react';
import PhotoListItem from '../app/screens/MyPhotos/PhotoListItem';
import AppContext from '../app/context/AppContext';
import renderer from 'react-test-renderer';

describe('<PhotoListItem />', () => {
    let testProps;

    const PHOTO = {
        id: 1,
        photo: {
            uri: 'test',
            width: 300,
            height: 300,
        },
    };

    const PHOTO2 = {
        id: 2,
        photo: {
            uri: 'test',
            width: 300,
            height: 300,
        },
    };

    const DEFAULT_CONTEXT = {
        myPhotos: [
            PHOTO,
            PHOTO2,
        ],
        deletePhoto: jest.fn(function(selectedPhoto) {
            this.myPhotos = this.myPhotos.filter(photo => photo.id !== selectedPhoto.id);
        }),
    };

    const createTestProps = (props: Object) => ({
        navigation: {
            navigate: jest.fn(),
            setParams: jest.fn(),
        },
        photo: PHOTO,
        ...props,
    });

    beforeEach(() => {
        testProps = createTestProps({});
    });

    it('Should render', () => {
        renderer.create(
            <AppContext.Provider value={DEFAULT_CONTEXT}>
                <PhotoListItem {...testProps}/>
            </AppContext.Provider>
        );
    });


    it('Should delete selected photo from context', () => {
        const tree = renderer.create(
            <AppContext.Provider value={DEFAULT_CONTEXT}>
                <PhotoListItem {...testProps}/>
            </AppContext.Provider>
        );
        const instance = tree.root.findByType(PhotoListItem).instance;

        instance.deletePhoto();

        expect(instance.context.deletePhoto).toHaveBeenCalledWith(PHOTO);

        expect(instance.context.myPhotos).toEqual([
            PHOTO2,
        ]);
    });
});


