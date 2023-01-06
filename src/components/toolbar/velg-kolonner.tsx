import React, {useEffect, useRef, useState} from 'react';
import './toolbar.css';
import {useFocus} from '../../hooks/use-focus';
import {BodyShort, Button} from '@navikt/ds-react';
import {Table} from '@navikt/ds-icons';

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
        <div className="toolbar_btn__dropdown">
            <div
                className="checkbox-filterform__valg"
                id="velg-kolonner"
                ref={inputRef => (focusRef.current = inputRef)}
            >
                {render(lukkVelgKolonner)}
            </div>
            <Button
                size="small"
                className="velg-kolonner__lukk-knapp"
                onClick={lukkVelgKolonner}
                data-testid={'lukk-velg-kolonner-knapp'}
            >
                Lukk
            </Button>
        </div>
    );

    return (
        <div className="sok-veileder-wrapper" ref={divRef}>
            <Button
                size="small"
                variant="tertiary"
                type="button"
                className="toolbar_btn"
                icon={<Table className="toolbar-knapp__ikon" id="velg-kolonner-ikon" />}
                onClick={toggleVelgKolonner}
                data-testid="dropdown-knapp_velg-kolonner"
                ref={btnRef}
            >
                Velg kolonner
            </Button>

            {innhold}
        </div>
    );
}

export default VelgKolonner;
