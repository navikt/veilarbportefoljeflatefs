import React, {useState} from 'react';
import 'react-toggle/style.css';
import Toggle from './toggle';
import './dark-mode-toggle.less';

function DarkModeToggle() {
    const [darkmode, setDarkmode] = useState(false);

    localStorage.setItem(String(document.body.classList.toggle('darkmode', darkmode)), 'true');

    return (
        <div className="dark-mode-toggle">
            <button type="button">☀</button>
            <Toggle checked={darkmode} onChange={() => setDarkmode(!darkmode)} />
            <button type="button">☾</button>
        </div>
    );
}

export default DarkModeToggle;
