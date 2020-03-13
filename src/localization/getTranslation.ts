import {EduType} from "../interfaces";

function getTranslation(lang = 'ru') {
    switch (lang) {
        case 'ua':
            return {
                partialEducation: 'Часткова Освіта',
                additionalEducation: 'Додаткова Освіта',
                mainEducation: 'Основна Освіта',
                payed: 'Оплачений',
                noPayment: 'Не оплачений',
                noStartLearningDate: 'Немає даты зарахування',
                startedLearning: 'Зарахован',
                changeTestMark: 'Змінити оцінку за тестове ДЗ на',
                changeHwMark: 'Змінити оцінку за творче ДЗ на',
                changeThemeMark: 'Змінити оцінку за тему на',
                resetTest: 'Анулювати тест',
                forStudent: 'Для учня',
                inLesson: 'В уроці',
                inTheme: 'У темі',
                sendByStudent: 'Відправлено учнем:',
                sendByTeacher: 'Відправлено вчителем:',
                commentary: 'Коментар:',
                class: 'клас',
                thematicMark: 'Тематична Оцінка',
                lessonCountTooltip: 'Кількість відкритих уроків',
                trainingTestMark: 'тренувальний тест',
                testMark: 'тестове ДЗ',
                hwMark: 'творче ДЗ',
                loading: 'Завантаження...',
                subjectMark: 'Підсумкова оцінка з предмету, яку отримав би учень, якщо семестр закінчився сьогодні',
                openedLessons: 'Відсоток відкритих уроків з предмету за поточний навчальний рік (рахуються уроки з дати зарахування до сьогодні)',
                doneTests: 'Відсоток виконаних тестових ДЗ з предмету за навчальний рік (рахуються ДЗ з дати зарахування до сьогодні)',
                doneHw: 'Відсоток виконаних творчих ДЗ з предмету за навчальний рік (рахуються ДЗ з дати зарахування до сьогодні)',
            };
        case 'ru':
        default:
            return {
                partialEducation: 'Частичное Образование',
                additionalEducation: 'Дополнительное Образование',
                mainEducation: 'Основное Образование',
                payed: 'Оплачен',
                noPayment: 'Не оплачен',
                noStartLearningDate: 'Нет даты зачисления',
                startedLearning: 'Зачислен',
                changeTestMark: 'Изменить оценку за тестовое ДЗ на',
                changeHwMark: 'Изменить оценку за творческое ДЗ на',
                changeThemeMark: 'Изменить оценку за тему на',
                resetTest: 'Обнулить тест',
                forStudent: 'Для ученика',
                inLesson: 'В уроке',
                inTheme: 'В теме',
                sendByStudent: 'Отправлено учеником:',
                sendByTeacher: 'Отправлено учителем:',
                commentary: 'Комментарий:',
                class: 'класс',
                thematicMark: 'Тематическая Оценка',
                lessonCountTooltip: 'Количество открытых уроков',
                trainingTestMark: 'тренировочный тест',
                testMark: 'тестовое ДЗ',
                hwMark: 'творческое ДЗ',
                loading: 'Загрузка...',
                subjectMark: 'Итоговая оценка по предмету, которую получил бы ученик, если бы семестр закончился сегодня',
                openedLessons: 'Процент открытых уроков по предмету за учебный год (считаются уроки с даты зачисления до сегодняшнего дня)',
                doneTests: 'Процент выполненных тестовых ДЗ по предмету за учебный год (считаются ДЗ с даты зачисления до сегодняшнего дня)',
                doneHw: 'Процент выполненных творческих ДЗ по предмету за учебный год (считаются ДЗ с даты зачисления до сегодняшнего дня)',
            };
    }
}

export default getTranslation;