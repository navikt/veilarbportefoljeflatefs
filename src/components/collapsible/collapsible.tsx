import {default as React, useState} from 'react';
import './collapsible.less';
import {ReactComponent as ExpandIcon} from '../ikoner/squared-plus.svg';
import {ReactComponent as CollapseIcon} from '../ikoner/squared-minus.svg';
import {kebabCase} from '../../utils/utils';

interface CollapsibleProps {
    apen?: boolean;
    tittel?: string;
    children: React.ReactNode;
}

export function Collapsible(props: CollapsibleProps) {
    const [apen, setApen] = useState(props.apen || false);

    function togglePanel(e) {
        e.preventDefault();
        setApen(!apen);
    }

    return (
        <div className="collapsible">
            <button
                onClick={e => togglePanel(e)}
                className="collapsible__header"
                aria-expanded={apen}
                aria-controls={kebabCase(props.tittel!)}
                id={`header-${kebabCase(props.tittel!)}`}
            >
                <>
                    {apen ? (
                        <CollapseIcon
                            aria-label={`${props.tittel}, åpen gruppe. Klikk enter eller mellomromstast for å lukke.`}
                            className="toggleIkon"
                            aria-hidden="true"
                        />
                    ) : (
                        <ExpandIcon
                            aria-label={`${props.tittel}, lukket gruppe. Klikk enter eller mellomromstast for å åpne.`}
                            className="toggleIkon"
                            aria-hidden="true"
                        />
                    )}
                    {props.tittel}
                </>
            </button>
            <section
                className="collapsible__content"
                hidden={!apen}
                id={kebabCase(props.tittel!)}
                aria-labelledby={`header-${kebabCase(props.tittel!)}`}
            >
                {props.children}
            </section>
        </div>
    );
}
