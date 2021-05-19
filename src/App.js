import React from "react";
import HeaderContainer from "./components/Header/HeaderContainer";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";
import './App.css';
import {connect} from "react-redux";
import {getAuthUserData} from "./redux/auth-reducer";

class App extends React.Component {
    componentDidMount() {
        this.props.getAuthUserData();
    }

    render() {
        return (
            <div className="App">
                <HeaderContainer/>
                <Sidebar/>
                <Content/>
            </div>
        );
    }
}

export default connect(null, {getAuthUserData})(App);
