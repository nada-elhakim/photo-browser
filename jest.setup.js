import MockAsyncStorage from 'mock-async-storage';
const mockImpl = new MockAsyncStorage();

jest.mock('@react-native-community/async-storage', () => mockImpl);

jest.mock('react-native-gesture-handler/Swipeable', () => 'Swipeable');

jest.mock('react-native-camera', () => {});

// jest.doMock('./app/context/AppContext', () => {
//     return {
//         LocalizeContext: {
//             Consumer: (props) => props.children(context)
//         }
//     }
// });
