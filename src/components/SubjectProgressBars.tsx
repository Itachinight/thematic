import React, {FC, useContext} from "react";
import {buildStyles, CircularProgressbarWithChildren} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import {SubjectProgressBarContainerProps} from "../interfaces";
import HwIconSvg from './icons/HwIconSvg';
import TestIconSvg from './icons/TestIconSvg';
import VideoIconSvg from "./icons/VideoIconSvg";
import MarkIconSvg from "./icons/MarkIconSvg";
import {getCounterColor, getMarkColor} from "../helpers";
import GlobalContext from './GlobalContext';

const SubjectProgressBars: FC<SubjectProgressBarContainerProps> = (props: SubjectProgressBarContainerProps) => {
    const context = useContext(GlobalContext);
    const {
        visitedPercentage,
        doneTestsPercentage,
        doneHwPercentage,
        totalMark
    } = props;

    const visitedColor = getCounterColor(visitedPercentage);
    const testsColor = getCounterColor(doneTestsPercentage);
    const hwColor = getCounterColor(doneHwPercentage);
    const markColor = getMarkColor(totalMark);

    return (
        <div className="progress">
            <div data-tooltip={context.translation.subjectMark}>
                <CircularProgressbarWithChildren
                    value={totalMark}
                    className="subject-progress"
                    minValue={0}
                    maxValue={12}
                    strokeWidth={5}
                    styles={buildStyles({
                        strokeLinecap: 'butt',
                        pathTransitionDuration: 1,
                        pathColor: markColor
                    })}
                >
                    <MarkIconSvg color={markColor}/>
                    <p className="count">{totalMark}</p>
                </CircularProgressbarWithChildren>
            </div>
            <div data-tooltip={context.translation.openedLessons}>
                <CircularProgressbarWithChildren
                    value={visitedPercentage}
                    className="subject-progress"
                    strokeWidth={5}
                    styles={buildStyles({
                        strokeLinecap: 'butt',
                        pathTransitionDuration: 1,
                        pathColor: visitedColor
                    })}
                >
                    <VideoIconSvg color={visitedColor}/>
                    <p className="count">{visitedPercentage}%</p>
                </CircularProgressbarWithChildren>
            </div>
            <div data-tooltip={context.translation.doneTests}>
                <CircularProgressbarWithChildren
                    value={doneTestsPercentage}
                    className="subject-progress"
                    strokeWidth={5}
                    styles={buildStyles({
                        strokeLinecap: 'butt',
                        pathTransitionDuration: 1,
                        pathColor: testsColor
                    })}
                >
                    <TestIconSvg color={testsColor}/>
                    <p className="count">{doneTestsPercentage}%</p>
                </CircularProgressbarWithChildren>
            </div>
            <div data-tooltip={context.translation.doneHw}>
                <CircularProgressbarWithChildren
                    value={doneHwPercentage}
                    className="subject-progress"
                    strokeWidth={5}
                    styles={buildStyles({
                        strokeLinecap: 'butt',
                        pathTransitionDuration: 1,
                        pathColor: hwColor
                    })}
                >
                    <HwIconSvg color={hwColor}/>
                    <p className="count">{doneHwPercentage}%</p>
                </CircularProgressbarWithChildren>
            </div>
        </div>
    )
};

export default SubjectProgressBars;