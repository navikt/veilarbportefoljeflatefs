import React from 'react';
import useDarkMode from 'use-dark-mode';
import 'react-toggle/style.css';
import Toggle from './toggle';
import './dark-mode-toggle.less';

function DarkModeToggle() {
    const darkMode = useDarkMode(false);

    if (darkMode.value) {
        document.body.style.backgroundColor = 'rgb(26, 26, 26)';
        document.body.style.filter = 'invert(90%)';
    } else {
        document.body.style.backgroundColor = '';
        document.body.style.filter = '';
    }

    return (
        <div className="dark-mode-toggle">
            <button type="button" onClick={darkMode.disable}>
                ☀
            </button>
            <Toggle checked={darkMode.value} onChange={darkMode.toggle} />
            <button type="button" onClick={darkMode.enable}>
                ☾
            </button>
        </div>
    );
}

export default DarkModeToggle;
