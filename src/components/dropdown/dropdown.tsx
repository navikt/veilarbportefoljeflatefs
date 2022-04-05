import React, {useEffect, useRef, useState} from 'react';
import classNames from 'classnames';
import {useFocus} from '../../hooks/use-focus';
import './dropdown.less';
import {BodyShort} from '@navikt/ds-react';

const btnCls = (props: DropdownProps, apen: boolean) =>
    classNames('dropdown', props.className, {
        'dropdown--apen': apen
    });

const btnWrapperCls = (disabled?: boolean) =>
    classNames('dropdown__btnwrapper', {'dropdown__btnwrapper--disabled': disabled});

interface DropdownProps {
    hoyre?: boolean;
    apen?: boolean;
    disabled?: boolean;
    name: React.ReactNode;
    id: string;
    render: (lukkDropdown: () => void) => React.ReactChild;
    className?: string;
    onLukk?: () => void;
    hidden?: boolean;
}

function Dropdown(props: DropdownProps) {
    const {name, disabled, render, hoyre, hidden, id} = props;
    const [apen, setApen] = useState(props.apen || false);
    const btnRef = useRef<HTMLButtonElement>(null);
    const divRef = useRef<HTMLDivElement>(null);
    const {focusRef} = useFocus();

    function handler(e) {
        if (
            e.target.getAttribute('data-testid') === 'aktiviteter_forenklet-filter_knapp' ||
            e.target.getAttribute('data-testid') === 'aktiviteter_avansert-filter_knapp'
        ) {
            return;
        } else if (apen && !divRef.current?.contains(e.target)) {
            lukkDropdown();
        }
    }

    useEffect(() => {
        document.body.addEventListener('click', handler);
        return () => document.body.removeEventListener('click', handler);
    });

    function toggleDropdown() {
        const {onLukk = () => void 0} = props;
        if (apen) {
            onLukk();
        }
        setApen(!apen);
    }

    function lukkDropdown() {
        const {onLukk = () => void 0} = props;
        setApen(false);

        onLukk();
    }

    if (hidden) {
        return null;
    }

    const innhold = !apen ? null : (
        <div
            className={`dropdown__innhold ${hoyre ? 'hoyre' : null}`}
            id={`${name}-dropdown__innhold`}
            ref={inputRef => (focusRef.current = inputRef)}
        >
            {render(lukkDropdown)}
        </div>
    );

    const ariaLabel = () => {
        return typeof name === 'object' ? 'Velg kolonner' : `Ekspanderbart panel for "${name}"`;
    };

    return (
        <div className={btnCls(props, apen)} ref={divRef}>
            <div className={btnWrapperCls(disabled)}>
                <button
                    ref={btnRef}
                    type="button"
                    className="dropdown__btn"
                    onClick={toggleDropdown}
                    aria-expanded={apen}
                    aria-controls={`${id}-dropdown__innhold`}
                    id={`${id}-dropdown__innhold`}
                    disabled={disabled}
                    data-testid={`dropdown-knapp_${id}`}
                    aria-label={ariaLabel()}
                >
                    <BodyShort size="small" className="dropdown__btntext">
                        {name}
                    </BodyShort>
                </button>
            </div>
            {innhold}
        </div>
    );
}

export default Dropdown;
