import React, {Component, ReactElement} from 'react';
import {ArchiveThemeTableState, Theme, Lesson} from '../interfaces';
import ArchiveLessonRow from "./ArchiveLessonRow";
import AnimateHeight from 'react-animate-height';
import delay from 'lodash/delay';

import GlobalContext from "./GlobalContext";
import ThemeOpenSvg from "./icons/ThemeOpenSvg";

class ArchiveThemeTable extends Component<Theme, ArchiveThemeTableState> {
    static contextType = GlobalContext;

    state = {
        opened: false,
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
            isRedacted
        } = this.props;

        const progressBackground = visitPercentage !== null ?
            `linear-gradient(to right, #e4f2ff ${visitPercentage}%, #fdfdff ${visitPercentage}.5%)` :
            '#f3f3f3';

        return (
            <div className="timetable-tab-container">
                <table>
                    <thead onClick={this.handleClick}
                           style={{
                               background: progressBackground,
                               outlineColor: '#006dce'
                           }}
                    >
                    <tr>
                        <th className="timetable__cell">
                            <ThemeOpenSvg
                                color={'#006dce'}
                                opened={this.state.opened}
                            />
                        </th>
                        <th
                            className="timetable__cell"
                            colSpan={2}
                        >
                            <span>
                                {this.props.title}
                            </span>
                        </th>
                        <th className="timetable__cell mark">
                            {mark !== null && this.context.level > 1 &&
                            <div
                                className="mark-container"
                                data-tooltip={this.context.translation.thematicMark}
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
                        {this.props.lessons.map((lesson: Lesson) => (
                            <ArchiveLessonRow key={lesson.id} {...lesson}/>
                        ))}
                        {mark !== null && this.context.level > 1 &&
                        <tr className="timetable__row third-journal-thematic">
                            <td className="timetable__cell" colSpan={3}>
                                {this.context.translation.thematicMark}:
                            </td>
                            <td className="timetable__cell">
                                <span className="thematic-mark">
                                    {isRedacted ? `${mark} (р.)` : mark}
                                </span>
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

export default ArchiveThemeTable;