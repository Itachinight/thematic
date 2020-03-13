import React, {useContext} from 'react';
import {HwStatus, MarksContainerProps} from '../interfaces';
import MarksPopUp from './MarksPopUp';
import IconLink from "./IconLink";
import HwDoneIconSvg from "./icons/HwDoneIconSvg";
import TestResetIconSvg from "./icons/TestResetIconSvg";
import GlobalContext from './GlobalContext';

const MarksContainer: React.FC<MarksContainerProps> = (props: MarksContainerProps) => {
    const {
        id,
        journalId,
        title,
        hw,
        isCompleted,
        isSickLeave,
        totalMark,
        testMark,
        testId,
        trainingTestMark,
        trainingTestId
    } = props;
    const {level, resetTest, translation} = useContext(GlobalContext);

    function resetTestWrapper() {
        resetTest(title, journalId).then();
    }

    const hwLink = `/lessons/watch.php?id=${id}#lesson-content-homework`;
    const testLink = `/tests/completing.php?id=${testId}`;

    return (
        <>
            <div className="wrapper">
                {totalMark !== null &&
                <span className="total-mark">
                    {isSickLeave ? 'н' : totalMark}
                </span>
                }
                {!isCompleted && testId &&
                <IconLink
                    iconClass="icon undone-test-mini-icon"
                    link={testLink}
                />
                }
                {hw.isHw && hw.status === HwStatus.NOT_DONE &&
                <IconLink
                    iconClass="icon unsend-homework-mini-icon"
                    link={hwLink}
                />
                }
                {hw.isHw && hw?.status === HwStatus.ON_REWORK &&
                <IconLink
                    iconClass="icon onrevision-homework-mini-icon"
                    link={hwLink}
                />
                }
                {hw.isHw && hw.status === HwStatus.DONE && hw.isUnread &&
                <a href={hwLink} style={{height:18}} target="_blank" rel="noopener noreferrer">
                    <HwDoneIconSvg/>
                </a>
                }
                {!hw.isHw && !testId &&
                    <span className="circle-minus-icon"/>
                }
            </div>
            {journalId !== null &&
                <>
                    <span className="markup-icon question">?</span>
                    <MarksPopUp
                        id={id}
                        journalId={journalId}
                        title={title}
                        hw={hw}
                        testMark={testMark}
                        testId={testId}
                        trainingTestMark={trainingTestMark}
                        trainingTestId={trainingTestId}
                        isCompleted={isCompleted}
                    />
                    {level === 4 && isCompleted ?
                        <button
                            onClick={resetTestWrapper}
                            className="reset-test-btn"
                            data-tooltip={translation.resetTest}
                        >
                            <TestResetIconSvg/>
                        </button> :
                        <div className="reset-test-btn-dummy"/>
                    }
                </>
            }

        </>
    );
};

export default MarksContainer;