import React, { useState } from "react";
// import bridge from "@vkontakte/vk-bridge";
import View from "@vkontakte/vkui/dist/components/View/View";
// import ScreenSpinner from "@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner";
import "@vkontakte/vkui/dist/vkui.css";

import Home from "./panels/Home";
import "./styles.css";

const App = () => {
    const [activePanel, setActivePanel] = useState("home");

    const go = e => {
        setActivePanel(e.currentTarget.dataset.to);
    };

    return (
        <View activePanel={activePanel}>
            <Home id="home" go={go} />
        </View>
    );
};

export default App;
