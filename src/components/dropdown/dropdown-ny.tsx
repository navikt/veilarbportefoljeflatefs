import React from 'react';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

const btnCls = (props: DropdownProps, apen: boolean, hover: boolean) => classNames('dropdown', props.className, {
    'dropdown--apen': apen,
    'dropdown--hover': !props.disabled && hover
});

const btnWrapperCls = (disabled?: boolean) => classNames('dropdown__btnwrapper', {'dropdown__btnwrapper--disabled': disabled});

interface DropdownProps {
    hoyre?: boolean;
    apen?: boolean;
    disabled?: boolean;
    name: string;
    render: (lukkDropdown: () => void) => React.ReactChild;
    className?: string;
    onLukk?: () => void;
}


function DropdownNy (props: DropdownProps) {
    const [apen, setApen] = useState(props.apen || false);
    const [hover, setHover] = useState( false);
    const btnRef = useRef<HTMLButtonElement>(null);
    const divRef = useRef<HTMLDivElement>(null);

    function handler(e) {
        if (apen && divRef.current &&!divRef.current.contains(e.target)) {
            lukkDropdown();
        }
    }

    useEffect(()=> {
        document.body.addEventListener('click', handler);
        return () => document.body.removeEventListener('click', handler);
    });


    function settFokus(element) { // eslint-disable-line class-methods-use-this
        if (element !== null) {
            const elementer = element.querySelector('button, a, input, select');
            elementer.focus();
        }
    }

   function toggleDropdown() {
        const {onLukk = () => void(0)} = props;
        if (apen) {
            onLukk();
        }
        setApen(!apen);
    }

    function lukkDropdown() {
        const { onLukk = () => void(0)} = props;
        setApen(false);

        if (btnRef.current != null) {
            btnRef.current.focus();
        }
        onLukk();
    }

    function isHover(hoverState) {
        return () => {
            setHover(hoverState);
        };
    }

        const { name, disabled, render, hoyre } = props;

        const innhold = !apen ? null : (
            <div
                className={`dropdown__innhold ${hoyre ? 'hoyre' : null}`}
                id={`${name}-dropdown__innhold`}
                ref={settFokus}
            >
                {render(lukkDropdown)}
            </div>
        );

        return (
            <div
                className={btnCls(props, apen, hover)}
                ref={divRef}
                onMouseEnter={isHover(true)}
                onMouseLeave={isHover(false)}
            >
                <div className={btnWrapperCls(disabled)}>
                    <button
                        ref={btnRef}
                        type="button"
                        className="dropdown__btn"
                        onClick={toggleDropdown}
                        aria-expanded={apen}
                        aria-controls={`${name}-dropdown__innhold`}
                        disabled={disabled}
                    >
                        <span className="dropdown__btntext">{name}</span>
                    </button>
                </div>
                {innhold}
            </div>
        );
}

export default DropdownNy;
