import React from "react";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import Spinner from "@vkontakte/vkui/dist/components/Spinner/Spinner";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Icon20CalendarOutline from "@vkontakte/icons/dist/20/calendar_outline";
import Icon24BrowserBack from "@vkontakte/icons/dist/24/browser_back";
import Icon24BrowserForward from "@vkontakte/icons/dist/24/browser_forward";
import Icon16Cancel from "@vkontakte/icons/dist/16/cancel";
import Icon24Videocam from "@vkontakte/icons/dist/24/videocam";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showndatepicker: false,
            chosenDay: new Date("2021-06-28"),
            chosenWeek: 5,
            month: this.getMonth(new Date("2021-06-28")),
            lessons: [],
            lessonsLoading: true
        };
        this.getMonthString = this.getMonthString.bind(this);
        this.getYearString = this.getYearString.bind(this);
    }

    componentDidMount() {
        this.loadLessons(this.state.chosenDay);
    }

    loadLessons = day => {
        var self = this;
        setTimeout(function() {
            self.setState({
                lessonsLoading: false,
                lessons: [
                    {
                        id: 1,
                        title: "Математика",
                        start: "08:00",
                        end: "08:40",
                        number: 1,
                        room: "204",
                        kind: "ДО-онлайн",
                        videoconfTime: "08:15",
                        stages: "1. Выполнить задание в онлайн-учебнике: ссылка\n2.Выполнить задание в онлайн-решебнике: ссылка",
                        homework: "Выполнить задание 123\r 456",
                        yaklass: true,
                        mark: null
                    },
                    {
                        id: 2,
                        title: "Всероссийский государственный всёобъемлющий урок",
                        start: "08:45",
                        end: "09:25",
                        number: 2,
                        room: "204",
                        kind: "ДО-электронный кейс",
                        videoconfTime: "08:15",
                        stages: null,
                        homework: "123",
                        yaklass: false,
                        mark: "4/5"
                    },
                    { id: 3, title: "Физкультура", start: "09:35", end: "10:15", number: 3, room: "физ. зал", kind: "Очный", videoconfTime: null, stages: null, homework: null, yaklass: false, mark: null },
                    { id: 4, title: "Физкультура", start: "10:20", end: "11:00", number: 4, room: "физ. зал", kind: "Очный", videoconfTime: null, stages: null, homework: null, yaklass: false, mark: "2" },
                    { id: 5, title: "Физика", start: "11:05", end: "11:45", number: 5, room: "3", kind: "Очный", videoconfTime: null, stages: null, homework: null, yaklass: false, mark: null }
                ]
            });
        }, 0);
        // }, 2000);
    };

    getWeek(_day) {
        var day = _day;
        var monday = day.setDate(day.getDate() - day.getDay() + 1);
        var week = [];
        for (var i = 0; i < 7; i++) {
            week.push(new Date(new Date(monday).setDate(new Date(monday).getDate() + i)));
        }
        return week;
    }

    getMonth(_day) {
        var day = new Date(_day.getTime());
        var first = day.setDate(1);
        var last = new Date(day.setMonth(day.getMonth() + 1));
        last.setDate(last.getDate() - 1);
        var month = [];
        for (var i = 1; i <= last.getDate(); i++) {
            month.push(new Date(new Date(first).setDate(i)));
        }
        return month;
    }

    getMonthString(_day) {
        var day = new Date(_day.getTime());
        var month = "";
        var monday = new Date(day.setDate(day.getDate() - (day.getDay() == 0 ? 7 : day.getDay()) + 1));
        month += this.getRuMonth(monday.getMonth() + 1);
        var sunday = new Date(day.setDate(day.getDate() + 6));
        if (monday.getMonth() != sunday.getMonth()) {
            month += " - " + this.getRuMonth(sunday.getMonth() + 1);
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

    getYearString(_day) {
        var day = new Date(_day.getTime());
        var year = "";
        var monday = new Date(day.setDate(day.getDate() - (day.getDay() == 0 ? 7 : day.getDay()) + 1));
        year += monday.getFullYear();
        var sunday = new Date(day.setDate(day.getDate() + 6));
        if (monday.getFullYear() != sunday.getFullYear()) {
            year += " - " + sunday.getFullYear();
        }
        return year;
    }

    chooseDay = day => {
        this.setState({
            showndatepicker: false,
            chosenDay: day,
            chosenWeek: this.getWeekNumber(day),
            month: this.getMonth(day),
            lessonsLoading: true
        });
        this.loadLessons(day);
    };

    getWeekNumber = _day => {
        var day = new Date(_day.getTime());
        var dayN = day.getDate();
        var first = new Date(day.setDate(1));
        var summ = (first.getDay() == 0 ? 7 : first.getDay()) + dayN - 2;
        return (summ - (summ % 7)) / 7 + 1;
    };

    render() {
        const emptyStartWeekdays = [],
            emptyEndWeekdays = [];
        for (var i = 1; i < this.state.month[0].getDay(); i++) {
            emptyStartWeekdays.unshift(
                <div key={i} className="col-1-of-7 text-center datepicker__day-wrapper">
                    <div className="datepicker__day datepicker__day_previous-month">{new Date(new Date(this.state.month[0].getTime()).setDate(1 - i)).getDate()}</div>
                </div>
            );
        }
        if (this.state.month[this.state.month.length - 1].getDay()) {
            for (var i = 1; i < 8 - this.state.month[this.state.month.length - 1].getDay(); i++) {
                emptyEndWeekdays.push(
                    <div key={i} className="col-1-of-7 text-center datepicker__day-wrapper">
                        <div className="datepicker__day datepicker__day_next-month">{i}</div>
                    </div>
                );
            }
        }

        return (
            <Panel id={this.props.id}>
                <PanelHeader left={<Avatar size={36} src="https://krot.info/uploads/posts/2019-10/1570183451_instagram-jelizabet-debiki-73.jpg" />} separator={false}>
                    Дневник
                </PanelHeader>
                <div className="diary">
                    <div className="diary__header d-flex">
                        <div className="diary__header-month">{this.getMonthString(this.state.chosenDay)}</div>
                        <div className="diary__header-year">{this.getYearString(this.state.chosenDay)}</div>
                        <Button
                            className="ml-auto diary__header-btn"
                            onClick={() => {
                                if (this.state.showndatepicker) {
                                    this.setState({
                                        showndatepicker: !this.state.showndatepicker,
                                        month: this.getMonth(this.state.chosenDay)
                                    });
                                } else {
                                    this.setState({
                                        showndatepicker: !this.state.showndatepicker
                                    });
                                }
                            }}
                        >
                            {this.state.showndatepicker ? <Icon16Cancel /> : <Icon20CalendarOutline />}
                        </Button>
                    </div>
                    <div className="diary__block-wrapper">
                        <div className="diary__block">
                            <div className="diary__month-wrapper">
                                <div className={"diary__month" + (this.state.showndatepicker ? "" : " diary__month_collapsed")}>
                                    <div className="d-flex diary__weekdays">
                                        {[{ id: 1, name: "ПН" }, { id: 2, name: "ВТ" }, { id: 3, name: "СР" }, { id: 4, name: "ЧТ" }, { id: 5, name: "ПТ" }, { id: 6, name: "СБ" }, { id: 0, name: "ВС" }].map((day, key) => (
                                            <div
                                                key={key}
                                                className={"diary__weekday text-center col-1-of-7" + (this.state.chosenDay.getDay() == day.id ? " diary__weekday_active" : "")}
                                                onClick={
                                                    this.state.showndatepicker
                                                        ? null
                                                        : () => {
                                                              var _day = new Date(this.state.chosenDay);
                                                              if (_day.getDay() != day.id) {
                                                                  this.chooseDay(new Date(_day.setDate(_day.getDate() + (day.id == 0 ? 7 : day.id) - (_day.getDay() == 0 ? 7 : _day.getDay()))));
                                                              }
                                                          }
                                                }
                                            >
                                                {day.name}
                                            </div>
                                        ))}
                                    </div>
                                    {/*     КНОПКА НАЛЕВО    */}
                                    <Button
                                        className="diary__change-week-btn"
                                        style={{ left: 0 }}
                                        onClick={() => {
                                            if (this.state.showndatepicker) {
                                                var _day = new Date(this.state.month[0]);
                                                _day.setMonth(_day.getMonth() - 1);
                                                this.setState({ month: this.getMonth(_day) });
                                            } else {
                                                var _day = new Date(this.state.chosenDay);
                                                _day.setDate(_day.getDate() - (_day.getDay() == 0 ? 7 : _day.getDay()));
                                                this.chooseDay(_day);
                                            }
                                        }}
                                    >
                                        <Icon24BrowserBack />
                                    </Button>
                                    {/*     КНОПКА НАПРАВО    */}
                                    <Button
                                        className="diary__change-week-btn"
                                        style={{ right: 0 }}
                                        onClick={() => {
                                            if (this.state.showndatepicker) {
                                                var _day = new Date(this.state.month[0]);
                                                _day.setMonth(_day.getMonth() + 1);
                                                this.setState({ month: this.getMonth(_day) });
                                            } else {
                                                var _day = new Date(this.state.chosenDay);
                                                _day.setDate(_day.getDate() + (_day.getDay() == 0 ? 7 : 8 - _day.getDay()));
                                                this.chooseDay(_day, true);
                                            }
                                        }}
                                    >
                                        <Icon24BrowserForward />
                                    </Button>

                                    <div
                                        className="diary__datepicker datepicker d-flex flex-wrap"
                                        style={{
                                            "--chosen-week": `calc(${this.state.chosenWeek - 1})`
                                        }}
                                    >
                                        {emptyStartWeekdays}
                                        {this.state.month.map((day, key) => (
                                            <div key={key} className="col-1-of-7 text-center datepicker__day-wrapper">
                                                <div
                                                    className={"datepicker__day" + (day.getTime() == this.state.chosenDay.getTime() ? " datepicker__day_active" : "")}
                                                    onClick={() => {
                                                        this.chooseDay(day);
                                                    }}
                                                >
                                                    {day.getDate()}
                                                </div>
                                            </div>
                                        ))}
                                        {emptyEndWeekdays}
                                    </div>
                                    <div className="diary__datepicker-month">{this.getRuMonth(this.state.month[0].getMonth() + 1)}</div>
                                    <div className="diary__datepicker-year">{this.state.month[0].getFullYear()}</div>
                                </div>
                            </div>
                            {/*                                                                     */}
                            {/*                                                                     */}
                            {/*                               УРОКИ                                 */}
                            {/*                                                                     */}
                            {/*                                                                     */}
                            <div className={"diary__lessons lessons" + (this.state.showndatepicker ? " diary__lessons_showndatepicker" : "")}>
                                {!this.state.lessonsLoading && this.state.lessons.length > 0 && <div className="diary__lessons-title">Уроки</div>}
                                {!this.state.lessonsLoading && this.state.lessons.map(lesson => <DiaryLesson key={lesson.id} lesson={lesson} />)}
                                {!this.state.lessonsLoading && this.state.lessons.length == 0 && (
                                    <div class="text-center" style={{ marginTop: "50vh" }}>
                                        Уроков нет!
                                    </div>
                                )}
                                {this.state.lessonsLoading && <Spinner size="large" style={{ marginTop: "50%" }} />}
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
            <Button disabled={this.props.active} className={"diary__week-btn diary-day-btn" + (this.props.active ? " diary-day-btn_active" : "")} onClick={this.props.onClick}>
                <div className="diary-day-btn__weekday">{this.getRuWeekday(this.props.date.getDay())}</div>
                <div className="diary-day-btn__date">{this.props.date.getDate()}</div>
            </Button>
        );
    }
}

class DiaryLesson extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const lesson = this.props.lesson;
        return (
            <div className="lesson d-flex">
                <div className="lesson__timeline"></div>
                <div className="lesson__times d-flex flex-column">
                    <div className="lesson__start">{lesson.start}</div>
                    <div className="lesson__number">{lesson.number}</div>
                    <div className="lesson__end">{lesson.end}</div>
                </div>
                <div className="lesson__card flex-grow-1">
                    <div className="d-flex">
                        <div className="lesson__title flex-grow-1">{lesson.title}</div>
                        {lesson.mark != null && (
                            <div className="lesson__mark-wrapper">
                                <div className="lesson__mark">{lesson.mark}</div>
                                <div style={{ fontSize: 14, marginTop: 2 }}>Оценка</div>
                            </div>
                        )}
                    </div>
                    <div className="d-flex">
                        <div className="lesson__number-room flex-grow-1">
                            {lesson.number} урок, каб. {lesson.room}
                        </div>
                        <div className="lesson__kind">{lesson.kind}</div>
                    </div>
                    {lesson.videoconfTime != null && (
                        <div className="lesson__videoconf d-flex">
                            <Icon24Videocam />
                            <div style={{ margin: "4px 0 0 5px" }}>Видеоурок в {lesson.videoconfTime}</div>
                        </div>
                    )}
                    <div className="lesson__stages">{lesson.stages}</div>
                    <div className="lesson__homework">{lesson.homework}</div>
                    {lesson.yaklass != null ? <div className="lesson__yaklass">Нужно пройти тест ЯКласс</div> : null}
                </div>
            </div>
        );
    }
}
