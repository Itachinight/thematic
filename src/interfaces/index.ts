import {Moment} from 'moment';
import {ColorProperty} from 'csstype';
import {ActionMeta, ValueType} from "react-select/src/types";

export type Lang = 'ru' | 'ua'

export type UserLevel = 1 | 2 | 4;

export interface UserData {
    id: number
    level : UserLevel
    name: string
    surname: string
    class: number
    eduType: EduType
    isLocked: boolean
    paymentEndDate: string
    startLearningDate: string
}

export interface Subject {
    id: number
    name: string
}

export interface User {
    id: number
    name: string
    isLocked: boolean
    eduType: EduType
    startLearningDate: string
    paymentEndDate: string
}

export interface Class {
    label: string
    value: number
}

export type ArchiveYear = 'current' | number;

export interface Archive {
    label: string
    value: null | ArchiveYear
}

interface CommonThematicState {
    isLoaded: boolean
    lang: Lang
    subjects: Subject[]
    selectedSubject: Subject
    archives: Archive[]
    selectedArchive: Archive
    users: User[]
    selectedUser: User
    classes: Class[]
    selectedClass: Class
    level: UserLevel
    modalOpened: boolean
    modalData: ModalData
}

export interface ModalData {
    studentFiles: string[]
    teacherFiles: string[]
    commentary: string
}

interface CommonThematicInfo {
    dateStartLearning: string
    defaultOpened: number
    themes: Theme[]
    mark: number
}

export interface ThematicInfo extends CommonThematicInfo {
    visitedPercentage: number
    doneHwPercentage: number
    doneTestsPercentage: number
}

export type ArchiveThematicInfo = CommonThematicInfo;

export interface ThematicCurrentState extends ThematicInfo, CommonThematicState {
    target: 'current'
}

export interface ThematicArchiveState extends ArchiveThematicInfo, CommonThematicState {
    target: 'archive'
    year: ArchiveYear
}

export type ThematicState = ThematicArchiveState | ThematicCurrentState

export interface ThemeTableState {
    opened: boolean
}

export type ArchiveThemeTableState = ThemeTableState;

export interface Theme {
    id: number
    title: string
    isDefaultOpened: boolean
    visitPercentage: number | null
    mark: number | null
    isRedacted: boolean
    lessons: Lesson[]
}

export enum HwStatus {
    NOT_DONE = 1,
    ON_CHECK,
    ON_REWORK,
    DONE
}

export interface Lesson {
    id: number
    journalId: number
    date: string
    title: string
    isControl: boolean
    isHQ: boolean
    isVerbal: boolean
    isCompleted: boolean
    isVisited: boolean
    isSickLeave: boolean
    trainingTestMark: number | null
    testMark: number
    testId?: number
    trainingTestId?: number
    hw: Homework
}

export type Homework = {
    isHw: false
    mark: number | null
} | {
    isHw: true
    status: HwStatus
    isUnread: boolean
    mark: number
}

type EditMarkFunc = (lessonTheme: string, journalId: number, mark: number) => Promise<number>

export interface GlobalContextInterface {
    dateStartLearning: Moment
    today: Moment
    selectedUserId: number
    lang: Lang,
    level: UserLevel,
    openModal: (userId: number) => Promise<void>
    editTestMark: EditMarkFunc
    editHwMark: EditMarkFunc
    editThematicMark: (themeId: number, themeName: string, mark: number) => Promise<number>
    resetTest: (lessonTheme: string, journalId: number) => Promise<void>
    translation: {
        [key: string]: string;
    }
}


export interface MarksContainerProps {
    id: number
    journalId: number
    title: string
    hw: Homework
    isCompleted: boolean
    isSickLeave: boolean
    totalMark: number | null
    testMark: number
    testId?: number
    trainingTestMark: number | null
    trainingTestId?: number
}

export interface MarksPopUpProps {
    id: number
    journalId: number
    title: string
    hw: Homework
    isCompleted: boolean
    testMark: number
    testId?: number
    trainingTestId?: number
    trainingTestMark: number | null
}

export interface SvgIconsProps {
    color: ColorProperty
}

export interface ThemeOpenSvgProps extends SvgIconsProps {
    opened: boolean
}

export interface IconLinkProps {
    link: string
    iconClass: string
}

export type SubjectProgressBarContainerProps = {
    visitedPercentage: number
    doneHwPercentage: number
    doneTestsPercentage: number
    totalMark: number
};

type SelectChangeCallback = (value: ValueType<any>, action: ActionMeta) => void

export interface SelectControlsProps {
    subjects: Subject[]
    selectedSubject: Subject
    archives: Archive[]
    selectedArchive: Archive
    users: User[]
    selectedUser: User
    classes: Class[]
    selectedClass: Class
    level: UserLevel
    handleClassChange: SelectChangeCallback
    handleUserChange: SelectChangeCallback
    handleSubjectChange: SelectChangeCallback
    handleArchiveChange: SelectChangeCallback
    isLoaded: boolean
}

export interface SelectedUserInfoProps {
    userId: number
    userName: string
    startLearningDate: Moment
    paymentEndDate: Moment
    eduType: EduType
}

export type EduType =  1 | 2 | 3;


export interface ThemeMarkEditorProps {
    id: number
    title: string
    mark: number
    isRedacted: boolean
}