import React from "react";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Icon24BrowserBack from "@vkontakte/icons/dist/24/browser_back";
import Icon24BrowserForward from "@vkontakte/icons/dist/24/browser_forward";

class DiaryBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="diary__block-wrapper">
                <div className="diary__block">
                    <div className="diary__week-wrapper">
                        <div className="diary__week d-flex">
                            <Button className="diary__week-btn">
                                <Icon24BrowserBack />
                            </Button>
                            {[1, 2, 3, 4, 5, 6, 7].map((day, key) => (
                                <DiaryDayBtn key={key} active={day == 3} />
                            ))}
                            <Button className="diary__week-btn">
                                <Icon24BrowserForward />
                            </Button>
                        </div>
                    </div>
                    <div
                        className={
                            "diary__datepicker " +
                            (this.props.showdatepicker
                                ? "diary__datepicker_shown"
                                : "")
                        }
                    ></div>
                    <div className="diary__lessons lessons">
                        <div className="diary__lessons-title">Уроки</div>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((lesson, key) => (
                            <div className="lesson d-flex" key={key}>
                                <div className="lesson__timeline"></div>
                                <div className="lesson__times d-flex flex-column">
                                    <div className="lesson__start">08:00</div>
                                    <div className="lesson__number">
                                        {lesson}
                                    </div>
                                    <div className="lesson__end">08:40</div>
                                </div>
                                <div className="lesson__card flex-grow-1">
                                    Математика
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
export default DiaryBlock;

class DiaryDayBtn extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Button
                className={
                    "diary__week-btn diary-day-btn" +
                    (this.props.active ? " diary-day-btn_active" : "")
                }
            >
                <div className="diary-day-btn__weekday">ПН</div>
                <div className="diary-day-btn__date">27</div>
            </Button>
        );
    }
}
