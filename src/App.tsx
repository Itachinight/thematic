import React, {Component, ReactElement} from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import 'moment/locale/ru';
import 'moment/locale/uk';
import GlobalContext from './components/GlobalContext';
import ThemeTable from './components/ThemeTable';
import SubjectProgressBars from './components/SubjectProgressBars';
import getTranslation from './localization/getTranslation';
import ky from 'ky';
import {ActionMeta, ValueType} from 'react-select/src/types';
import {
    Archive,
    ArchiveYear,
    Class,
    HwStatus,
    Lesson,
    Subject,
    ThematicCurrentState,
    ThematicInfo,
    ThematicState,
    Theme,
    User,
} from './interfaces';
import {
    editHwMark,
    editTestMark,
    editThematicMark,
    getAvailableClasses,
    getClassList,
    getUserData,
    loadArchiveSubjects,
    loadArchiveThematicData,
    loadHwInfo,
    loadSubjects,
    loadThematicData,
    resetTest
} from './requests';
import './css/App.css';
import _cloneDeep from 'lodash/cloneDeep';
import _random from 'lodash/random';
import ArchiveThemeTable from "./components/ArchiveThemeTable";
import SelectControls from "./components/SelectControls";
import {getLang} from "./helpers";
import SelectedUserInfo from "./components/SelectedUserInfo";

class App extends Component<{}, ThematicState> {
    readonly state: ThematicState = {
        isLoaded: false,
        lang: getLang(),
        dateStartLearning: '2000-01-01',
        visitedPercentage: 0,
        doneHwPercentage: 0,
        doneTestsPercentage: 0,
        themes: [],
        subjects: [],
        selectedSubject: {
            id: 0,
            name: ''
        },
        archives: [],
        selectedArchive: {
            value: 0,
            label: ''
        },
        defaultOpened: 0,
        target: 'current',
        level: 1,
        selectedUser: {
            name: '',
            id: 0,
            eduType: 1,
            paymentEndDate: '',
            startLearningDate: '',
            isLocked: false
        },
        users: [],
        selectedClass: {
            label: '',
            value: 0
        },
        classes: [],
        modalOpened: false,
        modalData: {
            studentFiles: [],
            teacherFiles: [],
            commentary: ''
        },
        mark: 0
    };

    private today = moment();
    private translation = getTranslation(this.state.lang);

    handleArchiveChange = async (value: ValueType<Archive>, action: ActionMeta): Promise<void> => {
        if (action.action === 'select-option') {
            const selectedArchive = value as Archive;

            this.setState({
                isLoaded: false
            }, () => {
                const year = selectedArchive.value ? selectedArchive.value : undefined;
                const target = selectedArchive.value === null ? 'current' : 'archive';

                this.reloadData(target, this.state.selectedSubject, selectedArchive, year);
            });
        }
    };

    handleSubjectChange = async (value: ValueType<Subject>, action: ActionMeta): Promise<void> => {
        if (action.action === 'select-option') {
            const selectedSubject = value as Subject;

            this.setState({
                isLoaded: false
            }, () => {
                const year = 'year' in this.state ? this.state.year : undefined;

                this.reloadData(this.state.target, selectedSubject, this.state.selectedArchive, year);
            });
        }
    };

    handleUserChange = async (value: ValueType<User>, action: ActionMeta): Promise<void> => {
        if (action.action === 'select-option') {
            const selectedUser = value as User;
            const userId = selectedUser.id;

            this.setState({
                selectedUser,
                isLoaded: false
            }, async () => {
                const subjects: Subject[] = await loadSubjects(userId);
                const index = subjects.findIndex((subject: Subject) => subject.id === this.state.selectedSubject.id);
                const selectedSubject: Subject = index !== -1 ? subjects[index] : subjects[_random(subjects.length - 1)];
                const data: ThematicInfo = await loadThematicData(userId, selectedSubject.id);
                const {archives} = await ky(`/api/v2/users/${userId}/thematic/archive/years`).json();

                this.setState((prevState: ThematicState) => {
                    const {
                        lang,
                        level,
                        users,
                        selectedUser,
                        classes,
                        selectedClass,
                        modalOpened,
                        modalData
                    } = prevState as ThematicCurrentState;

                    return {
                        target: 'current',
                        modalOpened,
                        modalData,
                        lang,
                        subjects,
                        selectedSubject,
                        archives,
                        selectedArchive: archives[0],
                        ...data,
                        users,
                        selectedUser,
                        classes,
                        selectedClass,
                        level,
                        isLoaded: true
                    }
                });
            })
        }
    };

    handleClassChange = async (value: ValueType<Class>, action: ActionMeta): Promise<void> => {
        if (action.action === 'select-option') {
            const selectedClass = value as Class;
            const users = await getClassList(selectedClass.value);

            this.setState({
                selectedUser: {
                    name: '',
                    id: 0,
                    eduType: 1,
                    paymentEndDate: '',
                    startLearningDate: '',
                    isLocked: false
                },
                users,
                selectedSubject: {
                    id: 0,
                    name: ''
                },
                subjects: [],
                selectedArchive: {
                    value: 0,
                    label: ''
                },
                archives: [],
                selectedClass
            })
        }
    };

    async reloadData(
        target: 'current' | 'archive',
        selectedSubject: Subject,
        selectedArchive: Archive,
        year?: ArchiveYear
    ): Promise<void> {
        let subjects: Subject[];

        if (target === 'current') {
            if (this.state.target === 'archive') {
                subjects = await loadSubjects(this.state.selectedUser.id);
                const index = subjects.findIndex((subject: Subject) => subject.id === selectedSubject.id);

                selectedSubject = index !== -1 ? subjects[index] : subjects[_random(subjects.length - 1)];
            }

            const data = await loadThematicData(this.state.selectedUser.id, selectedSubject.id);

            this.setState((prev: ThematicState) => ({
                ...prev,
                ...data,
                subjects: subjects ?? prev.subjects,
                selectedSubject,
                selectedArchive,
                target,
                isLoaded: true
            }));
        } else if (target === 'archive' && year) {
            if (this.state.target === 'current' || this.state.year !== year) {
                subjects = await loadArchiveSubjects(this.state.selectedUser.id, year);
                const index = subjects.findIndex((subject: Subject) => subject.id === selectedSubject.id);

                selectedSubject = index !== -1 ? subjects[index] : subjects[_random(subjects.length - 1)];
            }

            const data = await loadArchiveThematicData(this.state.selectedUser.id, selectedSubject.id, year);

            this.setState((prev: ThematicState) => ({
                ...prev,
                ...data,
                subjects: subjects ?? prev.subjects,
                selectedSubject,
                selectedArchive,
                target,
                year: selectedArchive.value,
                isLoaded: true
            }));
        }
    }

    async componentDidMount(): Promise<void> {
        const userData = await getUserData();
        const {id, level, name, surname, eduType, isLocked, paymentEndDate, startLearningDate} = userData;
        const classNum = userData.class;

        switch (level) {
            case 1: {
                const subjects: Subject[] = await loadSubjects(id);
                const selectedSubject: Subject = subjects[_random(subjects.length - 1)];
                const data: ThematicInfo = await loadThematicData(id, selectedSubject.id);
                const {archives} = await ky(`/api/v2/users/${id}/thematic/archive/years`).json();

                this.setState((prevState: ThematicState) => {
                    const {lang, modalData} = prevState as ThematicCurrentState;

                    return {
                        target: 'current',
                        lang,
                        subjects,
                        selectedSubject,
                        archives,
                        selectedArchive: archives[0],
                        ...data,
                        selectedUser: {
                            name: `${surname} ${name}`,
                            id,
                            isLocked,
                            eduType,
                            startLearningDate,
                            paymentEndDate
                        },
                        users: [],
                        level,
                        selectedClass: {
                            label: '',
                            value: classNum
                        },
                        classes: [],
                        modalOpened: false,
                        modalData,
                        isLoaded: true
                    }
                });
                break;
            }
            case 2:
            case 4: {
                const classes: Class[] = (await getAvailableClasses(id)).map((classNum: number) => (
                    {
                        value: classNum,
                        label: `${classNum} ${this.translation.class}`
                    }
                ));
                const selectedClass = classes[_random(classes.length - 1)];
                const users = await getClassList(selectedClass.value);

                this.setState((prevState: ThematicState) => {
                    const data = prevState as ThematicCurrentState;

                    return {
                        ...data,
                        target: 'current',
                        users,
                        classes,
                        selectedClass,
                        level,
                        isLoaded: true
                    }
                });
                break;
            }
        }
    }

    findThemeAndLessonIndex(journalId: number): [number,  number] {
        let lessonIndex: number = -1;
        let themeIndex: number = -1;

        for (let {lessons} of this.state.themes) {
            if (lessonIndex !== -1) {
                break;
            }

            themeIndex++;
            lessonIndex = lessons.findIndex((lesson: Lesson) => lesson.journalId === journalId);
        }

        return [themeIndex, lessonIndex];
    }

    editTestMark = async (lessonTheme: string, journalId: number, mark: number): Promise<number> => {
        if (!window.confirm(
            this.translation.changeTestMark + ` ${mark}\r\n` +
            this.translation.forStudent + ` ${this.state.selectedUser.name}\r\n` +
            this.translation.inLesson + ` «${lessonTheme}»`
        )) {
            throw new Error();
        }

        const testMark = await editTestMark(journalId, mark);
        const [themeIndex, lessonIndex] = this.findThemeAndLessonIndex(journalId);

        const themes: Theme[] = _cloneDeep(this.state.themes);
        const lesson = themes[themeIndex].lessons[lessonIndex];

        lesson.testMark = testMark;
        lesson.isCompleted = true;

        this.setState({
            themes
        });

        return testMark;
    };

    editHwMark = async (lessonTheme: string, journalId: number, mark: number): Promise<number> => {
        if (!window.confirm(
            this.translation.changeHwMark + ` ${mark}\r\n` +
            this.translation.forStudent + ` ${this.state.selectedUser.name}\r\n` +
            this.translation.inLesson + ` «${lessonTheme}»`
        )) {
            throw new Error();
        }

        const hwMark = await editHwMark(journalId, mark);
        const [themeIndex, lessonIndex] = this.findThemeAndLessonIndex(journalId);

        const themes: Theme[] = _cloneDeep(this.state.themes);
        const lesson = themes[themeIndex].lessons[lessonIndex];

        if (lesson.hw.isHw) {
            lesson.hw.mark = hwMark;
            lesson.hw.status = HwStatus.DONE;
        }

        this.setState({
            themes
        });

        return hwMark;
    };

    editThematicMark = async (themeId: number, themeName: string, mark: number): Promise<number> => {
        if (!window.confirm(
            this.translation.changeThemeMark + ` ${mark}\r\n` +
            this.translation.forStudent + ` ${this.state.selectedUser.name}\r\n` +
            this.translation.inTheme + ` «${themeName}»`
        )) {
            throw new Error();
        }

        const {
            isRedacted,
            themeMark
        } = await editThematicMark(this.state.selectedUser.id, this.state.selectedSubject.id, themeId, mark);

        const index = this.state.themes.findIndex((theme) => theme.id === themeId);
        const themes = _cloneDeep(this.state.themes);
        const theme = themes[index];

        theme.mark = themeMark;
        theme.isRedacted = isRedacted;

        this.setState({
            themes
        });

        return themeMark;
    };

    resetTest = async (lessonTheme: string, journalId: number) => {
        if (window.confirm(
            this.translation.resetTest + '\r\n' +
            this.translation.forStudent + ` ${this.state.selectedUser.name} \r\n` +
            this.translation.inLesson + ` «${lessonTheme}»`
        )) {
            const {testMark, isCompleted} = await resetTest(journalId);
            const [themeIndex, lessonIndex] = this.findThemeAndLessonIndex(journalId);

            const themes: Theme[] = _cloneDeep(this.state.themes);
            const lesson = themes[themeIndex].lessons[lessonIndex];

            lesson.testMark = testMark;
            lesson.isCompleted = isCompleted;

            this.setState({
                themes
            });
        }
    };

    openModal = async (lessonId: number) => {
        this.setState({
            modalData: await loadHwInfo(this.state.selectedUser.id, lessonId),
            modalOpened: true
        })
    };

    closeModal = () => {
        this.setState({
            modalOpened: false
        })
    };

    render(): ReactElement {
        let themesList;

        if (this.state.target === 'current') {
            themesList = this.state.themes.map((theme: Theme) => (
                <ThemeTable key={theme.id} {...theme} isDefaultOpened={this.state.defaultOpened === theme.id}/>
            ));
        } else if (this.state.target === 'archive') {
            themesList = this.state.themes.map((theme: Theme) => (
                <ArchiveThemeTable key={theme.id} {...theme} isDefaultOpened={this.state.defaultOpened === theme.id}/>
            ))
        }


        return (
            <div className="theme-wrapper">
                <GlobalContext.Provider value={{
                    dateStartLearning: moment(this.state.dateStartLearning).locale(this.state.lang),
                    today: this.today,
                    selectedUserId: this.state.selectedUser.id,
                    lang: this.state.lang,
                    level: this.state.level,
                    translation: this.translation,
                    openModal: this.openModal,
                    editTestMark: this.editTestMark,
                    editHwMark: this.editHwMark,
                    editThematicMark: this.editThematicMark,
                    resetTest: this.resetTest
                }}>
                    {this.state.level === 4 && this.state.selectedUser.id > 0 &&
                        <SelectedUserInfo
                            userId={this.state.selectedUser.id}
                            userName={this.state.selectedUser.name}
                            paymentEndDate={moment(this.state.selectedUser.paymentEndDate)}
                            startLearningDate={moment(this.state.selectedUser.startLearningDate)}
                            eduType={this.state.selectedUser.eduType}
                        />
                    }
                    <div className="info-container">
                        <SelectControls
                            archives={this.state.archives}
                            selectedArchive={this.state.selectedArchive}
                            classes={this.state.classes}
                            selectedClass={this.state.selectedClass}
                            users={this.state.users}
                            selectedUser={this.state.selectedUser}
                            subjects={this.state.subjects}
                            selectedSubject={this.state.selectedSubject}
                            level={this.state.level}
                            handleClassChange={this.handleClassChange}
                            handleArchiveChange={this.handleArchiveChange}
                            handleSubjectChange={this.handleSubjectChange}
                            handleUserChange={this.handleUserChange}
                            isLoaded={this.state.isLoaded}
                        />
                        {this.state.target === 'current' &&
                        <SubjectProgressBars
                            visitedPercentage={this.state.visitedPercentage}
                            doneHwPercentage={this.state.doneHwPercentage}
                            doneTestsPercentage={this.state.doneTestsPercentage}
                            totalMark={this.state.mark}
                        />
                        }
                    </div>
                    <div id="main-part">
                        {themesList}
                    </div>
                </GlobalContext.Provider>
                <Modal
                    isOpen={this.state.modalOpened}
                    onRequestClose={this.closeModal}
                    className="react-modal"
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            zIndex: 9999
                        }
                    }}
                >
                    <div className="upload-container">
                        <p className="modal-label">
                            {this.translation.sendByStudent}
                        </p>
                        <div className="file-grid">
                            {this.state.modalData.studentFiles.map((filepath: string) => (
                                <a href={filepath} target="_blank" rel="noopener noreferrer">
                                    <img src={filepath} alt="Homework"/>
                                </a>
                            ))}
                        </div>
                        <p className="modal-label top-separator">
                            {this.translation.sendByTeacher}
                        </p>
                        <div className="file-grid">
                            {this.state.modalData.teacherFiles.map((filepath: string) => (
                                <a href={filepath} target="_blank" rel="noopener noreferrer">
                                    <img src={filepath} alt="Homework"/>
                                </a>
                            ))}
                        </div>
                        <p className="modal-label top-separator">
                            {this.translation.commentary}
                        </p>
                        <p className="commentary">
                            {this.state.modalData.commentary}
                        </p>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default App;