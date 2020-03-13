import {ColorProperty} from "csstype";
import {Lang} from "../interfaces";
import Cookie from "js-cookie";

export function getCounterColor(percentage: number): ColorProperty {
    if (percentage >= 90) {
        return 'mediumseagreen';
    } else if (percentage >= 30) {
        return 'orange';
    }

    return '#e53a24';
}

export function getMarkColor(mark: number): ColorProperty {
    if (mark >= 10) {
        return 'mediumseagreen';
    } else if (mark >= 5) {
        return 'orange';
    }

    return '#e53a24';
}

export function getLang(): Lang {
    const lang = Cookie.get('lang');

    if (lang && (lang === 'ua' || lang === 'ru')) {
        return lang;
    }

    return 'ru';
}