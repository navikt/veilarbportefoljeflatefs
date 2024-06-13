import {default as React, useRef, useState} from 'react';
import {useEventListener} from '../../hooks/use-event-listener';
import TildelVeileder from '../modal/tildel-veileder/tildel-veileder';
import SokVeileder from './sok-veileder';
import {OversiktType} from '../../ducks/ui/listevisning';
import {Button} from '@navikt/ds-react';
import {nullstillBrukerfeil, oppdaterBrukerfeil} from '../../ducks/brukerfeilmelding';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../reducer';

interface ToolbarKnappProps {
    skalVises?: boolean;
    aktiv: boolean;
    tildelveileder: boolean;
    ikon: React.ReactNode;
    tittel: string;
    testid: string;
    oversiktType: OversiktType;
}

export default function ToolbarKnapp({
    skalVises,
    aktiv,
    tildelveileder,
    ikon,
    tittel,
    testid,
    oversiktType
}: ToolbarKnappProps) {
    const [isInputOpen, setInputOpen] = useState(false);
    const [isBtnClicked, setBtnClicked] = useState(false);
    const loggNode = useRef<HTMLDivElement>(null); // Referanse til omsluttende div rundt loggen
    const dispatch = useDispatch();
    const requestSetOpenStatus = (setOpenTo: boolean) => {
        setInputOpen(setOpenTo);
    };
    const brukerfeilMelding = useSelector((state: AppState) => state.brukerfeilStatus);
    const fjernBrukerfeilmelding = () => {
        if (brukerfeilMelding.status) {
            dispatch(nullstillBrukerfeil());
        }
    };

    const handleClickOutside = e => {
        if (loggNode.current?.contains(e.target)) {
            // Klikket er inne i komponenten
            return;
        }
        // Klikket er utenfor, oppdater staten
        fjernBrukerfeilmelding();
        if (isInputOpen) {
            requestSetOpenStatus(false);
        }
    };

    const escHandler = event => {
        if (event.keyCode === 27) {
            fjernBrukerfeilmelding();
        }
        if (event.keyCode === 27 && isInputOpen) {
            requestSetOpenStatus(false);
        }
    };

    const klikk = () => {
        if (!aktiv) {
            dispatch(oppdaterBrukerfeil());
        } else {
            setInputOpen(true);
        }
    };

    const visChildren = () => {
        if (tildelveileder) {
            return (
                <TildelVeileder
                    closeInput={() => setBtnClicked(true)}
                    skalVises={skalVises}
                    oversiktType={oversiktType}
                />
            );
        } else {
            return <SokVeileder veileder={{}} onClick={() => setBtnClicked(true)} skalVises={skalVises} />;
        }
    };

    useEventListener('mousedown', handleClickOutside);
    useEventListener('keydown', escHandler);

    if (!skalVises) {
        return null;
    }

    if (isBtnClicked) {
        setBtnClicked(false);
        setInputOpen(false);
    }
    if (isInputOpen) {
        return (
            <div className="toolbarknapp-input" ref={loggNode} onClick={klikk}>
                {visChildren()}
            </div>
        );
    }

    return (
        <Button
            size="small"
            variant="tertiary"
            type="button"
            className="toolbar_btn"
            icon={ikon}
            onClick={klikk}
            data-testid={testid}
            title={tittel}
        >
            {tittel}
        </Button>
    );
}
