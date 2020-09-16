import React from "react";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Icon20CalendarOutline from "@vkontakte/icons/dist/20/calendar_outline";

class DiaryHeader extends React.Component {
    constructor(props) {
        super(props);
        this.getRuMonth = this.getRuMonth.bind(this);
    }

    getRuMonth(monday) {
        var n = 1 + monday.getMonth();
        var month = "";
        switch (n) {
            case 1:
                month = "Январь";
                break;
            case 2:
                month = "Февраль";
                break;
            case 3:
                month = "Март";
                break;
            case 4:
                month = "Апрель";
                break;
            case 5:
                month = "Май";
                break;
            case 6:
                month = "Июнь";
                break;
            case 7:
                month = "Июль";
                break;
            case 8:
                month = "Август";
                break;
            case 9:
                month = "Сентбярь";
                break;
            case 10:
                month = "Октябрь";
                break;
            case 11:
                month = "Ноябрь";
                break;
            case 12:
                month = "Декабрь";
                break;
        }
        return month;
    }

    render() {
        return (
            <div className="diary__header d-flex">
                <div className="diary__header-month">
                    {this.getRuMonth(this.props.monday)}
                </div>
                <div className="diary__header-year">2020</div>
                <Button
                    className="ml-auto diary__header-btn"
                    onClick={this.props.openDatepicker}
                >
                    <Icon20CalendarOutline />
                </Button>
            </div>
        );
    }
}
export default DiaryHeader;
