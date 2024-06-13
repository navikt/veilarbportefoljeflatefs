import React, {useRef, useState} from 'react';
import {ReactComponent as FargekategoriIkonBokmerke} from '../ikoner/fargekategorier/Fargekategoriikon_bokmerke.svg';
import {BodyShort, Button} from '@navikt/ds-react';
import {FargekategoriPopover} from '../fargekategori/fargekategori-popover';
import {ThunkDispatch} from 'redux-thunk';
import {AppState} from '../../reducer';
import {AnyAction} from 'redux';
import {useDispatch} from 'react-redux';
import {resetFargekategoriStateAction} from '../../ducks/fargekategori';
import {oppdaterBrukerfeil} from '../../ducks/brukerfeilmelding';

interface FargekategoriToolbarKnappProps {
    valgteBrukereFnrs: string[];
}

export default function FargekategoriToolbarKnapp({valgteBrukereFnrs}: FargekategoriToolbarKnappProps) {
    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [popoverOpen, setPopoverOpen] = useState(false);

    return (
        <>
            <Button
                size="small"
                variant="tertiary"
                icon={<FargekategoriIkonBokmerke />}
                title="Sett fargekategori for alle valgte brukere"
                ref={buttonRef}
                onClick={() => {
                    if (valgteBrukereFnrs.length === 0) {
                        dispatch(oppdaterBrukerfeil());
                    } else {
                        setPopoverOpen(!popoverOpen);
                        dispatch(resetFargekategoriStateAction());
                    }
                }}
                className="toolbar_btn"
            >
                Fargekategori
            </Button>
            <FargekategoriPopover
                valgteBrukereFnrs={valgteBrukereFnrs}
                buttonRef={buttonRef}
                popoverOpen={popoverOpen}
                setPopoverOpen={setPopoverOpen}
                placement="bottom-start"
                skalBekrefteFlereEnn10={true}
            >
                <BodyShort size="small" spacing>
                    <b>Endre kategori for valgte brukere</b>
                </BodyShort>
            </FargekategoriPopover>
        </>
    );
}
