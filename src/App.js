import React from "react";
import HeaderContainer from "./components/Header/HeaderContainer";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";
import './App.css';
import { connect } from "react-redux";
import { initializeApp } from "./redux/reducers/app-reducer";
import { compose } from "redux";
import Preloader from "./components/common/Preloader/Preloader";

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }

        return (
            <div className="App">
                <HeaderContainer />
                <Sidebar />
                <Content />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default compose(
    connect(mapStateToProps, { initializeApp })
)(App);
