import React, {useEffect, useRef, useState} from 'react';
import classNames from 'classnames';
import {useFocus} from '../../hooks/use-focus';
import {BodyShort, Button} from '@navikt/ds-react';
import {Table} from '@navikt/ds-icons';

const btnCls = (props: VelgKolonnerProps, apen: boolean) =>
    classNames('dropdown', props.className, {
        'dropdown--apen': apen
    });

interface VelgKolonnerProps {
    apen?: boolean;
    render: (lukkDropdown: () => void) => React.ReactChild;
    className?: string;
    onLukk?: () => void;
    hidden?: boolean;
}

function VelgKolonner(props: VelgKolonnerProps) {
    const {render, hidden} = props;
    const [apen, setApen] = useState(props.apen || false);
    const btnRef = useRef<HTMLButtonElement>(null);
    const divRef = useRef<HTMLDivElement>(null);
    const {focusRef} = useFocus();

    function handler(e) {
        if (apen && !divRef.current?.contains(e.target)) {
            lukkVelgKolonner();
        }
    }

    useEffect(() => {
        document.body.addEventListener('click', handler);
        return () => document.body.removeEventListener('click', handler);
    });

    function toggleVelgKolonner() {
        const {onLukk = () => void 0} = props;
        if (apen) {
            onLukk();
        }
        setApen(!apen);
    }

    function lukkVelgKolonner() {
        const {onLukk = () => void 0} = props;
        setApen(false);

        onLukk();
    }

    if (hidden) {
        return null;
    }

    const innhold = !apen ? null : (
        <div className="dropdown__innhold" id="velg-kolonner" ref={inputRef => (focusRef.current = inputRef)}>
            {render(lukkVelgKolonner)}
        </div>
    );

    return (
        <div className={btnCls(props, apen)} ref={divRef}>
            <Button
                variant="tertiary"
                type="button"
                className="toolbar_btn"
                icon={<Table className="toolbar-knapp__ikon" id="velg-kolonner-ikon" />}
                onClick={toggleVelgKolonner}
                data-testid="velg-kolonner-knapp"
                ref={btnRef}
            >
                <BodyShort size="small" className="toolbar-knapp__tekst">
                    Velg kolonner
                </BodyShort>
            </Button>

            {innhold}
        </div>
    );
}

export default VelgKolonner;
