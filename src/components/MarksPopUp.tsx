import React, {ChangeEvent, KeyboardEvent, useContext, useEffect, useState} from "react";
import {HwStatus, MarksPopUpProps} from "../interfaces";
import GlobalContext from './GlobalContext';

const MarksPopUp: React.FC<MarksPopUpProps> = (props: MarksPopUpProps) => {
    const {
        translation,
        level,
        openModal,
        editTestMark,
        editHwMark
    } = useContext(GlobalContext);

    const [localTestMark, editLocalTestMark] = useState(0);
    const [localHwMark, editLocalHwMark] = useState(0);

    useEffect(() => {
        editLocalTestMark(props.testMark);
        editLocalHwMark(props.hw.isHw ? props.hw.mark : 0)
    }, [props.testMark, props.hw.isHw, props.hw.mark]);

    function handleTestMarkChange(event: ChangeEvent<HTMLInputElement>): void {
        const input = +event.target.value;
        if (!Number.isNaN(input) && input < 100) {
            editLocalTestMark(input);
        }
    }

    function handleHwMarkChange(event: ChangeEvent<HTMLInputElement>): void {
        const input = +event.target.value;
        if (!Number.isNaN(input) && input < 100) {
            editLocalHwMark(input);
        }
    }

    function resetLocalTestMark() {
        editLocalTestMark(props.testMark);
    }

    function resetLocalHwMark() {
        editLocalHwMark(props.hw.isHw ? props.hw.mark : 0);
    }

    function editTestMarkWrapper(event: KeyboardEvent<HTMLInputElement>): void {
        if (event.key !== 'Enter') {
            return;
        }

        editTestMark(props.title, props.journalId, localTestMark)
            .then(mark => editLocalTestMark(mark))
            .catch(resetLocalTestMark);
    }

    function editHwMarkWrapper(event: KeyboardEvent<HTMLInputElement>): void {
        if (event.key !== 'Enter') {
            return;
        }

        editHwMark(props.title, props.journalId, localHwMark)
            .then(mark => editLocalHwMark(mark))
            .catch(resetLocalHwMark);
    }

    function openModalWrapper() {
        openModal(props.id).then();
    }

    let hwIconClass: string = "icon ";

    if (props.hw.isHw) {
        switch (props.hw.status) {
            case HwStatus.ON_CHECK:
                hwIconClass += "oncheck-homework-mini-icon";
                break;
            case HwStatus.ON_REWORK:
                hwIconClass += "onrevision-homework-mini-icon";
                break;
            case HwStatus.NOT_DONE:
            default:
                hwIconClass += "unsend-homework-mini-icon";
                break;
        }
    } else {
        hwIconClass += "circle-minus-icon";
    }

    let testString;

    if (props.testId) {
        if (props.isCompleted) {
            if (level !== 4) {
                testString =
                    <span>
                        {props.testMark} б. -{'\u00A0'}
                        <a target='_blank' rel='noopener noreferrer'
                           href={`/tests/result.php?journal_id=${props.journalId}`}
                        >
                            {translation.testMark}
                        </a>
                    </span>;
            } else {
                testString =
                    <span>
                        <input className="admin-marks" type="text"
                               value={localTestMark}
                               onChange={handleTestMarkChange}
                               onKeyDown={editTestMarkWrapper}
                               onBlur={resetLocalTestMark}
                        />
                        <span>б. -{'\u00A0'}</span>
                        <a target='_blank' rel='noopener noreferrer'
                           href={`/tests/result.php?journal_id=${props.journalId}`}
                        >
                            {translation.testMark}
                        </a>
                    </span>;
            }
        } else {
            if (level === 4) {
                testString =
                    <span>
                        <span className="icon undone-test-mini-icon"/>
                        <input className="admin-marks" type="text"
                               value={localTestMark || ''}
                               onChange={handleTestMarkChange}
                               onKeyDown={editTestMarkWrapper}
                               onBlur={resetLocalTestMark}
                        />
                        {`б. - ${translation.testMark}`}
                    </span>;
            } else {
                testString =
                    <>
                        <span className="icon undone-test-mini-icon"/>
                        <span>- {translation.testMark}</span>
                    </>;
            }
        }
    } else {
        testString =
            <>
                <span className="icon circle-minus-icon"/>
                <span>- {translation.testMark}</span>
            </>
    }

    return (
        <div className="tooltip-marks">
            <p className="icon-centered">
                {testString}
            </p>
            <p className="icon-centered">
                {level === 1 && (props.hw.isHw && props.hw.status === HwStatus.DONE ?
                        <>
                            <span>
                                {props.hw.mark} б. -{'\u00A0'}
                                <a target='_blank' rel='noopener noreferrer'
                                   href={`/lessons/watch.php?id=${props.id}#lesson-content-homework`}
                                >
                                    {translation.hwMark}
                                </a>
                            </span>
                        </> :
                        <>
                            <span className={hwIconClass}/>
                            <span>- {translation.hwMark}</span>
                        </>
                )}
                {level === 2 && (props.hw.isHw ?
                        <>
                            {props.hw.status !== HwStatus.DONE && <span className={hwIconClass}/>}
                            <span>
                                {props.hw.mark} б. -{'\u00A0'}
                                <span className="open-modal-btn"
                                      onClick={openModalWrapper}
                                >
                                    {translation.hwMark}
                                </span>
                            </span>
                        </> :
                        <>
                            <span className={hwIconClass}/>
                            <span>- {translation.hwMark}</span>
                        </>
                )}
                {level === 4 && (props.hw.isHw ?
                        <>
                            {props.hw.status !== HwStatus.DONE && <span className={hwIconClass}/>}
                            <span>
                                <input className="admin-marks" type="text"
                                       value={localHwMark === 0 && props.hw.status < HwStatus.ON_REWORK ? '' : localHwMark}
                                       onChange={handleHwMarkChange}
                                       onKeyDown={editHwMarkWrapper}
                                       onBlur={resetLocalHwMark}
                                />
                                {`б. -\u00A0`}
                                <span className="open-modal-btn"
                                      onClick={openModalWrapper}
                                >
                                    {translation.hwMark}
                                </span>
                            </span>
                        </> :
                        <>
                            <span className={hwIconClass}/>
                            <span>- {translation.hwMark}</span>
                        </>
                )}
            </p>
            {props.trainingTestId && props.trainingTestMark !== null &&
            <>
                <div className="separator"/>
                <p className="icon-centered">
                    {props.trainingTestMark} б. -{'\u00A0'}
                    <a target='_blank' rel='noopener noreferrer'
                       href={`/tests/completing.php?id=${props.trainingTestId}`}
                    >
                        {translation.trainingTestMark}
                    </a>
                </p>
            </>
            }

        </div>
    );
};


export default MarksPopUp;