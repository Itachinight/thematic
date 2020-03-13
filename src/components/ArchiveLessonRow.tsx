import React, {Component, ReactElement} from 'react';
import moment, {Moment} from 'moment';
import globalContext from './GlobalContext';
import {Lesson} from '../interfaces';
import MarksPopUp from "./MarksPopUp";

class ArchiveLessonRow extends Component<Lesson, {}> {
    private readonly lessonDate: Moment;

    constructor(props: Readonly<Lesson>) {
        super(props);
        ArchiveLessonRow.contextType = globalContext;
        this.lessonDate = moment(props.date);
    }

    render(): ReactElement {
        const {
            id,
            journalId,
            title,
            isVerbal,
            isVisited,
            isHQ,
            isControl,
            isSickLeave,
            testMark,
            hw,
        } = this.props;

        let totalMark = null;

        if (!isSickLeave && journalId !== null) {
            totalMark = Number(testMark) + Number(hw.mark);
        }

        const notEvaluated = this.lessonDate.isBefore(this.context.dateStartLearning);

        let trClassNames = [
            'timetable__row'
        ];

        if (isControl) {
            trClassNames.push('control-string-journal');
        }

        if (notEvaluated) {
            trClassNames.push('not-evaluated');
        }

        const lessonBadgeName = (
            <>
                {isHQ &&
                <span className="status__item status__item--journal">new</span>
                }
                {isControl &&
                <span className="status__item status__item--journal status__item--control">к.р.</span>
                }
                {isVerbal &&
                <span className="status__item status__item--journal status__item--verbal">у</span>
                }
                <span className="name">
                    {title}
                </span>
            </>
        );

        return (
            <tr className={trClassNames.join(' ')}>
                <td className="timetable__cell">
                    {isVisited &&
                    <span className="check-markup-icon"/>
                    }
                </td>
                <td className="timetable__cell theme-container">
                    <a
                        className="main-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`/lessons/watch.php?id=${id}`}
                    >
                        {lessonBadgeName}
                    </a>
                </td>
                <td className="timetable__cell date-container">
                    <span>
                        {this.lessonDate.locale(this.context.lang).format('D MMM YYYY')}
                    </span>
                </td>
                <td className="timetable__cell question-container">
                    <div className="wrapper">
                        {isSickLeave &&
                        <span>
                            н
                        </span>
                        }
                        {totalMark !== null &&
                        <span className="total-mark">
                            {totalMark}
                        </span>
                        }
                    </div>
                    {this.context.level === 4 && journalId !== null &&
                        <>
                            <span className="markup-icon question">?</span>
                            <MarksPopUp {...this.props} />
                        </>
                    }
                </td>
            </tr>
        )
    }
}

export default ArchiveLessonRow;