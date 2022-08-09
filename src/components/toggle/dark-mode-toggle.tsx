import React, {useEffect, useState} from 'react';
import './dark-mode-toggle.css';
import {Switch} from '@navikt/ds-react';

function DarkModeToggle() {
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

export default DarkModeToggle;
