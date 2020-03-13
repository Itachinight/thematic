import {ArchiveThematicInfo, ArchiveYear, ModalData, Subject, ThematicInfo, User, UserData} from "../interfaces";
import ky from "ky";

export async function getUserData(): Promise<UserData> {
    return ky('/api/v2/users/data').json();
}

export async function getAvailableClasses(userId: number): Promise<number[]> {
    const {classes} = await ky(`/api/v2/users/${userId}/classes`).json();

    return classes;
}

export async function getClassList(classNum: number): Promise<User[]> {
    return ky(`/api/v2/users/class/${classNum}`).json();
}

export async function loadThematicData(userId: number, subjectId: number): Promise<ThematicInfo> {
    return ky(`/api/v2/users/${userId}/thematic/subject/${subjectId}`).json();
}

export async function loadArchiveThematicData(userId: number, subjectId: number, year: ArchiveYear): Promise<ArchiveThematicInfo> {
    return ky(`/api/v2/users/${userId}/thematic/archive/${year}/subject/${subjectId}`).json();
}

export async function loadSubjects(userId: number): Promise<Subject[]> {
    const {subjects} = await ky(`/api/v2/users/${userId}/thematic/subjects`).json();

    return subjects;
}

export async function loadArchiveSubjects(userId: number, year: ArchiveYear): Promise<Subject[]> {
    const {subjects} = await ky(`/api/v2/users/${userId}/thematic/archive/${year}/subjects`).json();

    return subjects;
}

export async function loadHwInfo(userId: number, lessonId: number): Promise<ModalData> {
    return ky(`/api/v2/users/${userId}/lessons/${lessonId}/homework`).json();
}

export async function editTestMark(journalId: number, mark: number): Promise<number> {
    const {testMark} = await ky.put(`/api/v2/journal/${journalId}`, {
        json: {
            testMark: mark
        }
    }).json();

    return testMark;
}

export async function editHwMark(journalId: number, mark: number): Promise<number> {
    const {hwMark} = await ky.put(`/api/v2/journal/${journalId}`, {
        json: {
            hwMark: mark
        }
    }).json();

    return hwMark;
}

export async function editThematicMark(
    userId: number,
    subjectId: number,
    themeId: number,
    mark: number
): Promise<{
    isRedacted: boolean,
    themeMark: number
}> {
    return  ky.put(`/api/v2/users/${userId}/thematic/subject/${subjectId}/theme/${themeId}`, {
        json: {
            themeMark: mark
        }
    }).json();
}

export async function resetTest(journalId: number): Promise<{isCompleted: boolean, testMark: number}> {
    return ky.delete(`/api/v2/journal/${journalId}/test`).json();
}