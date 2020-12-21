import {default as React, useState} from 'react';
import './collapsible.less';
import {ReactComponent as ExpandIcon} from '../ikoner/squared-plus.svg';
import {ReactComponent as CollapseIcon} from '../ikoner/squared-minus.svg';
import {kebabCase, keyCodes} from '../../utils/utils';
import {useFocus} from '../../hooks/use-focus';

interface CollapsibleProps {
    apen?: boolean;
    tittel?: string;
    children: React.ReactNode;
}

export function Collapsible(props: CollapsibleProps) {
    const [apen, setApen] = useState(props.apen || false);

    const keyCode = e => e.which || e.keyCode;
    const {focusRef} = useFocus();

    function togglePanel(e) {
        setApen(!apen);
    }

    function handleChange(e) {
        e.preventDefault();
        if (keyCode(e) === keyCodes.space || keyCode(e) === keyCodes.enter) {
            togglePanel(e);
        }
    }

    return (
        <div className="collapsible">
            <div
                onClick={e => togglePanel(e)}
                onKeyPress={e => handleChange(e)}
                className="collapsible__header"
                ref={inputRef => (focusRef.current = inputRef)}
                aria-expanded={apen}
                aria-controls={kebabCase(props.tittel!)}
                tabIndex={0}
            >
                <>
                    {apen ? (
                        <CollapseIcon
                            aria-label={`${props.tittel}, åpen gruppe. Klikk enter eller mellomromstast for å lukke.`}
                            className="toggleIkon"
                            id={`collapse_${kebabCase(props.tittel!)}`}
                        />
                    ) : (
                        <ExpandIcon
                            aria-label={`${props.tittel}, lukket gruppe. Klikk enter eller mellomromstast for å åpne.`}
                            className="toggleIkon"
                            id={`expand_${kebabCase(props.tittel!)}`}
                        />
                    )}
                    {props.tittel}
                </>
            </div>
            <div className="collapsible__content" hidden={!apen} id={kebabCase(props.tittel!)} role="region">
                {props.children}
            </div>
        </div>
    );
}
