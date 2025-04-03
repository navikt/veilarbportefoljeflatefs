import {ReactNode, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, useEventListener} from '@navikt/ds-react';
import TildelVeileder from '../modal/tildel-veileder/tildel-veileder';
import SokVeileder from './sok-veileder';
import {OversiktType} from '../../ducks/ui/listevisning';
import {nullstillBrukerfeil, oppdaterBrukerfeil} from '../../ducks/brukerfeilmelding';
import {AppState} from '../../reducer';

interface ToolbarKnappProps {
    skalVises?: boolean;
    aktiv: boolean;
    tildelveileder: boolean;
    ikon: ReactNode;
    tittel: string;
    testid: string;
    oversiktType: OversiktType;
}

export function ToolbarKnapp({
    skalVises,
    aktiv,
    tildelveileder,
    ikon,
    tittel,
    testid,
    oversiktType
}: ToolbarKnappProps) {
    const [inputIsOpen, setInputIsOpen] = useState(false);
    const [buttonIsClicked, setButtonIsClicked] = useState(false);
    const loggNode = useRef<HTMLDivElement>(null); // Referanse til omsluttende div rundt loggen
    const dispatch = useDispatch();
    const requestSetOpenStatus = (setOpenTo: boolean) => {
        setInputIsOpen(setOpenTo);
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
        if (!e.target.parentNode.classList.contains('brukerliste__checkbox')) {
            fjernBrukerfeilmelding();
        }
        if (inputIsOpen) {
            requestSetOpenStatus(false);
        }
    };
    const escHandler = event => {
        if (event.keyCode === 27) {
            fjernBrukerfeilmelding();
        }
        if (event.keyCode === 27 && inputIsOpen) {
            requestSetOpenStatus(false);
        }
    };

    const klikk = () => {
        if (!aktiv) {
            dispatch(oppdaterBrukerfeil());
        } else {
            setInputIsOpen(true);
        }
    };

    useEventListener('mousedown', handleClickOutside);
    useEventListener('keydown', escHandler);

    if (!skalVises) {
        return null;
    }

    if (buttonIsClicked) {
        setButtonIsClicked(false);
        setInputIsOpen(false);
    }

    if (inputIsOpen) {
        return (
            <div className="toolbarknapp-input" ref={loggNode} onClick={klikk}>
                {tildelveileder ? (
                    <TildelVeileder
                        closeInput={() => setButtonIsClicked(true)}
                        skalVises={skalVises}
                        oversiktType={oversiktType}
                    />
                ) : (
                    <SokVeileder veileder={{}} onClick={() => setButtonIsClicked(true)} skalVises={skalVises} />
                )}
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
