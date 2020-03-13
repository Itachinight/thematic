import React, {FC, useContext} from "react";
import GlobalContext from './GlobalContext';
import {SelectedUserInfoProps} from '../interfaces';

const SelectedUserInfo: FC<SelectedUserInfoProps> = (props: SelectedUserInfoProps) => {
    const {translation, lang, today} = useContext(GlobalContext);
    const {userId, userName, paymentEndDate, startLearningDate, eduType} = props;

    let eduTypeName: string;

    switch (eduType) {
        case 3:
            eduTypeName = translation.partialEducation;
            break;
        case 2:
            eduTypeName = translation.additionalEducation;
            break;
        case 1:
        default:
            eduTypeName = translation.mainEducation;
    }

    return (
        <div className="selected-user-info">
            <a
                href={`/cabinet/preview.php?id=${userId}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                {userName}
            </a>
            <span className="selected-user-separator">|</span>
            <span>
                {eduTypeName}
            </span>
            <span className="selected-user-separator">|</span>
            <span>
                {
                    startLearningDate.isValid() ?
                        `${translation.startedLearning} ${startLearningDate.locale(lang).format('DD MMMM YYYY')}` :
                        translation.noStartLearningDate
                }
            </span>
            <span className="selected-user-separator">|</span>
            <span>
                {paymentEndDate.isAfter(today) ?
                    translation.payed :
                    translation.noPayment
                }
            </span>
        </div>
    )
};

export default SelectedUserInfo;