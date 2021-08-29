import React from 'react';
import HeaderContainer from './components/Header/HeaderContainer';
import Sidebar from './components/Sidebar/Sidebar';
import Content from './components/Content/Content';
import './App.css';
import {connect, Provider} from 'react-redux';
import {initializeApp} from './redux/reducers/app-reducer';
import {compose} from 'redux';
import Preloader from './components/common/Preloader/Preloader';
import store, {AppStateType} from './redux/store/redux-store';
import {BrowserRouter, withRouter} from 'react-router-dom';

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

class App extends React.Component<MapPropsType & DispatchPropsType> {
    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert('promiseRejectionEvent');
        console.error(e);
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>;
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

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
});

const AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp})
)(App);

const SocialNetworkApp: React.FC = () => {
    // basename={process.env.PUBLIC_URL} | HashRouter
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    );
};

export default SocialNetworkApp;
