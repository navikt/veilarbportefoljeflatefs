import React, {useEffect, useState} from 'react';
import 'react-toggle/style.css';
import Toggle from './toggle';
import './dark-mode-toggle.less';
import {Button} from '@navikt/ds-react';

function DarkModeToggle() {
    const [darkmode, setDarkmode] = useState(localStorage.getItem('darkmode') === 'true');

    useEffect(() => {
        document.documentElement.classList.toggle('darkmode', darkmode);
        localStorage.setItem('darkmode', darkmode + '');
    }, [darkmode]);

    return (
        <div className="dark-mode-toggle">
            <Button variant="tertiary" type="button">
                ☀
            </Button>
            <Toggle checked={darkmode} onChange={() => setDarkmode(!darkmode)} />
            <Button variant="tertiary" type="button">
                ☾
            </Button>
        </div>
    );
}

export default DarkModeToggle;
