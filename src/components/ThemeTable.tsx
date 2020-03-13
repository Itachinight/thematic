import React, {Component, ReactElement} from 'react';
import {ThemeTableState, Theme, Lesson} from '../interfaces';
import LessonRow from "./LessonRow";
import AnimateHeight from 'react-animate-height';
import delay from 'lodash/delay';

import GlobalContext from "./GlobalContext";
import ThemeOpenSvg from "./icons/ThemeOpenSvg";
import ThemeMarkEditor from "./ThemeMarkEditor";

class ThemeTable extends Component<Theme, ThemeTableState> {
    static contextType = GlobalContext;

    state = {
        opened: false
    };

    handleClick = () => {
        this.setState(({opened: prevOpened}) => {
            return {opened: !prevOpened}
        })
    };

    componentDidMount(): void {
        if (this.props.isDefaultOpened) {
            delay(() => this.setState({opened: true}), 500);
        }
    }

    render(): ReactElement {
        const {
            visitPercentage,
            mark,
            isRedacted,
            title,
            lessons
        } = this.props;
        const {
            level,
            translation
        } = this.context;

        const progressBackgroundStyle = visitPercentage !== null ?
            `linear-gradient(to right, #e4f2ff ${visitPercentage}%, #fdfdff ${visitPercentage}.5%)` :
            '#f3f3f3';

        return (
            <div className="timetable-tab-container">
                <table>
                    <thead
                        onClick={this.handleClick}
                        style={{
                            background: progressBackgroundStyle,
                            outlineColor: mark !== null ? '#006dce' : '#787878'
                        }}
                        className={mark === null ? 'theme-not-evaluated' : ''}
                    >
                    <tr>
                        <th className="timetable__cell">
                            <ThemeOpenSvg
                                color={mark === null ? '#757575' : '#006dce'}
                                opened={this.state.opened}
                            />
                        </th>
                        <th
                            className={`timetable__cell${mark === null ? ' theme-not-evaluated' : ''}`}
                            colSpan={2}
                        >
                            <span>
                                {title}
                            </span>
                        </th>
                        <th className="timetable__cell mark">
                            {mark !== null &&
                            <div
                                className="mark-container"
                                data-tooltip={translation.thematicMark}
                                style={{visibility: this.state.opened ? 'hidden' : 'visible'}}
                            >
                                {mark}
                            </div>
                            }
                        </th>
                    </tr>
                    </thead>
                    <AnimateHeight
                        animateOpacity={true}
                        duration={500}
                        height={this.state.opened ? 'auto' : 0}
                    >
                        <tbody className="lessons-container">
                        {lessons.map((lesson: Lesson) => (
                            <LessonRow key={lesson.id} {...lesson}/>
                        ))}
                        {mark !== null &&
                        <tr className="timetable__row third-journal-thematic">
                            <td className="timetable__cell" colSpan={3}>
                                {translation.thematicMark}:
                            </td>
                            <td className="timetable__cell">
                                {level !== 4 &&
                                    <span className="thematic-mark">
                                        {isRedacted && level === 2 ? `${mark} (р.)` : mark}
                                    </span>
                                }
                                {level === 4 &&
                                    <ThemeMarkEditor
                                        id={this.props.id}
                                        title={this.props.title}
                                        mark={this.props.mark || 0}
                                        isRedacted={this.props.isRedacted}
                                        key={Number(this.props.mark) + Number(this.props.visitPercentage) << Number(this.props.isRedacted)}
                                    />
                                }
                            </td>
                        </tr>
                        }
                        </tbody>
                    </AnimateHeight>
                </table>
            </div>
        )
    }
}

export default ThemeTable;