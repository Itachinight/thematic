import moment from 'moment';
import {getLang} from "./index";
import 'moment/locale/ru';
import 'moment/locale/uk';

const cookieLang = getLang();

if (cookieLang === 'ua') {
    moment.updateLocale('uk', {
        monthsShort : 'січ._лют._бер._квіт._трав._черв._лип._серп._вер._жовт._лист._груд.'.split('_'),
    });

    moment.locale('uk');
} else {
    moment.locale(cookieLang);
}