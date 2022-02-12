import React, { useState } from 'react';
import I18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './en.json';
import fa from './fa.json';
import mj from './mj.json';
import no from './no.json';
import ps from './ps.json';
import sh from './sh.json';
import sw from './sw.json';
import uz from './uz.json';

// the translations
// (tip: move them in a JSON file and import them)
const resources = {en, fa, mj, no, ps, sh, sw, uz};

I18n.use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        resources,
        lng: Localization.locale,
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false // react is already safe from xss
        }
    });

export default I18n;
