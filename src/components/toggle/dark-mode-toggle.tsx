import {useEffect, useState} from 'react';
import {Switch} from '@navikt/ds-react';
import './dark-mode-toggle.css';

export function DarkModeToggle() {
    const [darkmode, setDarkmode] = useState(localStorage.getItem('darkmode') === 'true');

    useEffect(() => {
        document.documentElement.classList.toggle('darkmode', darkmode);
        localStorage.setItem('darkmode', darkmode + '');
    }, [darkmode]);

    return (
        <div className="dark-mode-toggle">
            <Switch size="medium" onChange={() => setDarkmode(!darkmode)} checked={darkmode}>
                Slå {darkmode ? ' av ' : ' på '} darkmode
            </Switch>
        </div>
    );
}
