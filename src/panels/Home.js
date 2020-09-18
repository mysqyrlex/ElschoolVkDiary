import React from "react";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Icon20CalendarOutline from "@vkontakte/icons/dist/20/calendar_outline";
import Icon24BrowserBack from "@vkontakte/icons/dist/24/browser_back";
import Icon24BrowserForward from "@vkontakte/icons/dist/24/browser_forward";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showndatepicker: false,
            chosenDay: new Date("2021-05-29"),
            chosenWeek: 5,
            month: this.getMonth(new Date("2021-05-29"))
        };
        this.getMonthString = this.getMonthString.bind(this);
    }

    getWeek(day) {
        var monday = day.setDate(day.getDate() - day.getDay() + 1);
        var week = [];
        for (var i = 0; i < 7; i++) {
            week.push(
                new Date(
                    new Date(monday).setDate(new Date(monday).getDate() + i)
                )
            );
        }
        return week;
    }

    getMonth(day) {
        var first = day.setDate(1);
        var last = new Date(day.setMonth(day.getMonth() + 1));
        last.setDate(last.getDate() - 1);
        var month = [];
        for (var i = 1; i <= last.getDate(); i++) {
            month.push(new Date(new Date(first).setDate(i)));
        }
        return month;
    }

    getMonthString(monday) {
        var n = 1 + monday.getMonth();
        var month = this.getRuMonth(n);
        var sundayMonth =
            new Date(
                new Date(monday).setDate(monday.getDate() + 6)
            ).getMonth() + 1;
        if (sundayMonth != n) {
            month += " - " + this.getRuMonth(sundayMonth);
        }
        return month;
    }

    getRuMonth = monthNumber => {
        switch (monthNumber) {
            case 1:
                return "Январь";
            case 2:
                return "Февраль";
            case 3:
                return "Март";
            case 4:
                return "Апрель";
            case 5:
                return "Май";
            case 6:
                return "Июнь";
            case 7:
                return "Июль";
            case 8:
                return "Август";
            case 9:
                return "Сентябрь";
            case 10:
                return "Октябрь";
            case 11:
                return "Ноябрь";
            case 12:
                return "Декабрь";
        }
    };

    render() {
        const emptyWeekdays = [];
        for (var i = 1; i < this.state.month[0].getDay(); i++) {
            emptyWeekdays.push(
                <div key={i} className="col-1-of-7 diary__month-day"></div>
            );
        }

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
                    <div className="diary__header d-flex">
                        <div className="diary__header-month">Июль</div>
                        <div className="diary__header-year">2020</div>
                        <Button
                            className="ml-auto diary__header-btn"
                            onClick={() => {
                                this.setState({
                                    showndatepicker: !this.state.showndatepicker
                                });
                            }}
                        >
                            <Icon20CalendarOutline />
                        </Button>
                    </div>
                    <div className="diary__block-wrapper">
                        <div className="diary__block">
                            <div className="diary__month-wrapper">
                                <div
                                    className={
                                        "diary__month" +
                                        (this.state.showndatepicker
                                            ? ""
                                            : " diary__month_collapsed")
                                    }
                                >
                                    <div className="d-flex diary__weekdays">
                                        {[
                                            { id: 1, name: "ПН" },
                                            { id: 2, name: "ВТ" },
                                            { id: 3, name: "СР" },
                                            { id: 4, name: "ЧТ" },
                                            { id: 5, name: "ПТ" },
                                            { id: 6, name: "СБ" },
                                            { id: 7, name: "ВС" }
                                        ].map((day, key) => (
                                            <div
                                                key={key}
                                                className={
                                                    "diary__weekday text-center col-1-of-7" +
                                                    (this.state.chosenDay.getDay() ==
                                                    day.id
                                                        ? " diary__weekday_active"
                                                        : "")
                                                }
                                            >
                                                {day.name}
                                            </div>
                                        ))}
                                    </div>
                                    <Button
                                        className="diary__change-week-btn"
                                        style={{ left: 0 }}
                                    >
                                        <Icon24BrowserBack />
                                    </Button>
                                    <Button
                                        className="diary__change-week-btn"
                                        style={{ right: 0 }}
                                    >
                                        <Icon24BrowserForward />
                                    </Button>
                                    <div className="diary__datepicker datepicker d-flex flex-wrap" style={{ '--chosen-week' : `calc(${this.state.chosenWeek - 1})`}}>
                                        {emptyWeekdays}
                                        {this.state.month.map((day, key) => (
                                            <div
                                                key={key}
                                                className="col-1-of-7 text-center datepicker__day-wrapper"
                                            >
                                                <div
                                                    className={
                                                        "datepicker__day" +
                                                        (day.getTime() ==
                                                        this.state.chosenDay.getTime()
                                                            ? " datepicker__day_active"
                                                            : "")
                                                    }
                                                >
                                                    {day.getDate()}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className={"diary__lessons lessons" + (this.state.showndatepicker ? " diary__lessons_showndatepicker" : "")}>
                                <div className="diary__lessons-title">
                                    Уроки
                                </div>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                                    (lesson, key) => (
                                        <div
                                            className="lesson d-flex"
                                            key={key}
                                        >
                                            <div className="lesson__timeline"></div>
                                            <div className="lesson__times d-flex flex-column">
                                                <div className="lesson__start">
                                                    08:00
                                                </div>
                                                <div className="lesson__number">
                                                    {lesson}
                                                </div>
                                                <div className="lesson__end">
                                                    08:40
                                                </div>
                                            </div>
                                            <div className="lesson__card flex-grow-1">
                                                Математика
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Panel>
        );
    }
}
export default Home;

class DiaryDayBtn extends React.Component {
    constructor(props) {
        super(props);
    }

    getRuWeekday = dayNumber => {
        switch (dayNumber) {
            case 0:
                return "ВС";
            case 1:
                return "ПН";
            case 2:
                return "ВТ";
            case 3:
                return "СР";
            case 4:
                return "ЧТ";
            case 5:
                return "ПТ";
            case 6:
                return "СБ";
        }
    };

    render() {
        return (
            <Button
                disabled={this.props.active}
                className={
                    "diary__week-btn diary-day-btn" +
                    (this.props.active ? " diary-day-btn_active" : "")
                }
                onClick={this.props.onClick}
            >
                <div className="diary-day-btn__weekday">
                    {this.getRuWeekday(this.props.date.getDay())}
                </div>
                <div className="diary-day-btn__date">
                    {this.props.date.getDate()}
                </div>
            </Button>
        );
    }
}
