import React, {Component} from "react";
import {createAppContainer} from "react-navigation";
import AppNavigator from "./app/navigation/MainNavigator";
import AppProvider from "./app/context/AppProvider";

const AppContainer = createAppContainer(AppNavigator);

class App extends Component {
    render() {
        return (
            <AppProvider>
                <AppContainer />
            </AppProvider>
        )
    }
}

export default App;
