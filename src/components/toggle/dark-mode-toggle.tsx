import {useEffect, useState} from 'react';
import {Switch} from '@navikt/ds-react';

const THEME_STORAGE_KEY = 'veilarbportefoljeflatefs.theme';

function getInitialDarkmodeState() {
    const lagretTema = localStorage.getItem(THEME_STORAGE_KEY);

    if (lagretTema === 'dark') {
        return true;
    }

    if (lagretTema === 'light') {
        return false;
    }

    return document.documentElement.classList.contains('dark');
}

export function DarkModeToggle() {
    const [darkmode, setDarkmode] = useState(getInitialDarkmodeState);

    useEffect(() => {
        const theme = darkmode ? 'dark' : 'light';
        document.documentElement.classList.remove('dark', 'light');
        document.documentElement.classList.add(theme);
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    }, [darkmode]);

    return (
        <Switch size="medium" onChange={() => setDarkmode(!darkmode)} checked={darkmode}>
            Slå {darkmode ? ' av ' : ' på '} mørk modus
        </Switch>
    );
}
