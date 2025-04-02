import {ReactChild, ReactNode, useEffect, useRef, useState} from 'react';
import classNames from 'classnames';
import {BodyShort} from '@navikt/ds-react';
import {useFocus} from '../../hooks/use-focus';
import './dropdown.css';

const btnCls = (apen: boolean, className?: string) =>
    classNames('dropdown', className, {
        'dropdown--apen': apen
    });

const btnWrapperCls = (disabled?: boolean) =>
    classNames('dropdown__btnwrapper', {'dropdown__btnwrapper--disabled': disabled});

interface DropdownProps {
    name: ReactNode;
    id: string;
    render: (lukkDropdown: () => void) => ReactChild;
    open?: boolean;
    onClose?: () => void;
    hoyre?: boolean;
    disabled?: boolean;
    hidden?: boolean;
    className?: string;
}

export function Dropdown({
    name,
    id,
    render,
    open,
    onClose = () => {},
    hoyre,
    disabled,
    hidden,
    className
}: DropdownProps) {
    const [apen, setApen] = useState(open || false);
    const btnRef = useRef<HTMLButtonElement>(null);
    const divRef = useRef<HTMLDivElement>(null);
    const {focusRef} = useFocus();

    function handler(e) {
        if (apen && !divRef.current?.contains(e.target)) {
            lukkDropdown();
        }
    }

    useEffect(() => {
        document.body.addEventListener('click', handler);
        return () => document.body.removeEventListener('click', handler);
    });

    function toggleDropdown() {
        if (apen) {
            onClose();
        }
        setApen(!apen);
    }

    function lukkDropdown() {
        setApen(false);

        onClose();
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
        <div className={btnCls(apen, className)} ref={divRef}>
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
                    <BodyShort size="small">{name}</BodyShort>
                </button>
            </div>
            {innhold}
        </div>
    );
}
