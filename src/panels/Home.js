import React from "react";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import DiaryHeader from "./DiaryHeader";
import DiaryBlock from "./DiaryBlock";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
	    showndatepicker: false,
	    monday: new Date('2020-07-27'),
        };
    }

    render() {
        return (
            <Panel id={this.props.id}>
                <PanelHeader
                    left={
                        <Avatar
                            size={36}
                            src="https://krot.info/uploads/posts/2019-10/1570183451_instagram-jelizabet-debiki-73.jpg"
                        />
                    }
                    separator={false}
                >
                    Дневник
                </PanelHeader>
                <div className="diary">
                    <DiaryHeader
                        monday={this.state.monday}
                        openDatepicker={() =>
                            this.setState({
                                showndatepicker: !this.state.showndatepicker
                            })
                        }
                    />
                    <DiaryBlock showdatepicker={this.state.showndatepicker} />
                </div>
            </Panel>
        );
    }
}
export default Home;
