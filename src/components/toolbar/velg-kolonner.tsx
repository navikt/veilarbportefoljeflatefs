import React, {useEffect, useRef, useState} from 'react';
import {Button} from '@navikt/ds-react';
import {Table} from '@navikt/ds-icons';
import {useFocus} from '../../hooks/use-focus';
import './toolbar.css';

interface VelgKolonnerProps {
    render: (lukkDropdown: () => void) => React.ReactChild;
}

function VelgKolonner({render}: VelgKolonnerProps) {
    const [apen, setApen] = useState(false);
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
        setApen(prevState => !prevState);
    }

    function lukkVelgKolonner() {
        setApen(false);
    }

    return (
        <div className="sok-veileder-wrapper" ref={divRef}>
            <Button
                size="small"
                variant="tertiary"
                type="button"
                className="toolbar_btn"
                icon={<Table className="toolbar-knapp__ikon" id="velg-kolonner-ikon" />}
                onClick={toggleVelgKolonner}
                title="Velg synlige kolonner i tabellen"
                data-testid="dropdown-knapp_velg-kolonner"
                ref={btnRef}
            >
                Velg kolonner
            </Button>

            {apen && (
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
            )}
        </div>
    );
}

export default VelgKolonner;
