import React from "react";
import HeaderContainer from "./components/Header/HeaderContainer";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";
import './App.css';

const App = () => {
    return (
        <div className="App">
            <HeaderContainer/>
            <Sidebar/>
            <Content/>
        </div>
    );
};

export default App;
