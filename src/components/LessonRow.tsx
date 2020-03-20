import React, {Component, ReactElement} from 'react';
import moment, {Moment} from 'moment';
import GlobalContext from './GlobalContext';
import MarksContainer from './MarksContainer';
import {HwStatus, Lesson} from '../interfaces';

class LessonRow extends Component<Lesson, {}> {
    private readonly lessonDate: Moment;

    constructor(props: Readonly<Lesson>) {
        super(props);
        LessonRow.contextType = GlobalContext;
        this.lessonDate = moment(props.date);
    }

    render(): ReactElement {
        const {
            id,
            journalId,
            hw,
            isCompleted,
            isVerbal,
            isVisited,
            isHQ,
            isControl,
            isSickLeave,
            testMark,
            testId,
            trainingTestMark,
            trainingTestId,
            title
        } = this.props;

        const isActive = this.lessonDate.isBefore(this.context.today);
        const isToday = this.lessonDate.isSame(this.context.today, 'day');
        const notEvaluated = this.lessonDate.isBefore(this.context.dateStartLearning);

        let hwMark: number | null;

        if (
            hw.isHw
            && (
                [HwStatus.DONE, HwStatus.ON_REWORK].includes(hw.status)
                || (hw.status === HwStatus.ON_CHECK && hw.mark !== 0)
            )
        ) {
            hwMark = hw.mark
        } else {
            hwMark = null;
        }

        let totalMark: number | null;

        if (isCompleted && hwMark !== null) {
            totalMark = testMark + hwMark;
        } else if (isCompleted) {
            totalMark = testMark;
        } else if (hwMark !== null) {
            totalMark = hwMark;
        } else {
            totalMark = null;
        }

        let trClassNames = [];

        if (isControl) {
            trClassNames.push('control-string-journal');
        }

        if (isActive) {
            trClassNames.push('timetable__row');
        } else {
            trClassNames.push('inactive');
        }

        if (notEvaluated) {
            trClassNames.push('not-evaluated');
        }

        if (isToday) {
            trClassNames.push('today');
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
                    {isActive ?
                        <a
                            className="main-link"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`https://online-shkola.com.ua/lessons/watch.php?id=${id}`}
                        >
                            {lessonBadgeName}
                        </a> :
                        <span className="theme-name">
                            {lessonBadgeName}
                        </span>
                    }
                </td>
                {(!this.context.course.isCourse || this.context.course.isCourseDateShown) &&
                <td className="timetable__cell date-container">
                    <span>
                        {(this.context.course.isCourse && this.context.level === 1) || this.lessonDate.format('D MMM YYYY')}
                    </span>
                </td>
                }
                <td className="timetable__cell question-container">
                    {isActive &&
                    <MarksContainer
                        id={id}
                        journalId={journalId}
                        title={title}
                        hw={hw}
                        totalMark={totalMark}
                        isCompleted={isCompleted}
                        trainingTestMark={trainingTestMark}
                        testMark={testMark}
                        testId={testId}
                        trainingTestId={trainingTestId}
                        isSickLeave={isSickLeave}
                    />
                    }
                </td>
            </tr>
        )
    }
}

export default LessonRow;