import React, {Context} from 'react';
import moment from 'moment';
import {GlobalContextInterface} from '../interfaces';

const defaultContext: GlobalContextInterface = {
    course: {
        isCourse: false
    },
    dateStartLearning: moment('0000-00-00'),
    selectedUserId: 0,
    today: moment(),
    lang: 'ru',
    translation: {},
    level: 1,
    openModal: async () => {},
    editTestMark: async () => 0,
    editHwMark: async () => 0,
    editThematicMark: async () => 0,
    resetTest: async () => {}
};

const context: Context<GlobalContextInterface> = React.createContext(defaultContext);

export default context;