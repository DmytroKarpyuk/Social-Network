import React from "react";
import HeaderContainer from "./components/Header/HeaderContainer";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";
import './App.css';
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/reducers/app-reducer";
import {compose} from "redux";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/store/redux-store";
import {BrowserRouter} from "react-router-dom";

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className="App">
                <HeaderContainer/>
                <Sidebar/>
                <Content/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

let AppContainer = compose(
    connect(mapStateToProps, {initializeApp})
)(App);

const SocialNetworkApp = () => {
    // basename={process.env.PUBLIC_URL} | HashRouter
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
};

export default SocialNetworkApp;
