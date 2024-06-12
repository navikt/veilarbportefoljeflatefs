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
import {BekreftEndreFargekategoriPaMangeModal} from '../fargekategori/bekreft-endre-fargekategori-pa-mange-modal';
import {FargekategoriModell} from '../../model-interfaces';

interface FargekategoriToolbarKnappProps {
    valgteBrukereFnrs: string[];
}

export default function FargekategoriToolbarKnapp({valgteBrukereFnrs}: FargekategoriToolbarKnappProps) {
    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [openState, setOpenState] = useState(false);
    const [visBekreftMangeModal, setVisBekreftMangeModal] = useState(false);

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
                        setOpenState(!openState);
                        dispatch(resetFargekategoriStateAction());
                    }
                }}
                className="toolbar_btn"
            >
                Fargekategori
            </Button>
            <FargekategoriPopover
                fnrs={valgteBrukereFnrs}
                buttonRef={buttonRef}
                openState={openState}
                setOpenState={setOpenState}
                placement="bottom-start"
            >
                <BodyShort size="small" spacing>
                    <b>Endre kategori for valgte brukere</b>
                </BodyShort>
            </FargekategoriPopover>
            {visBekreftMangeModal && (
                <BekreftEndreFargekategoriPaMangeModal
                    valgteBrukereFnrs={valgteBrukereFnrs}
                    valgtFargekategori={FargekategoriModell.FARGEKATEGORI_C} // TODO få tak i den valgte fargen
                    onBekreft={() => setVisBekreftMangeModal(false)}
                    onAvbryt={() => setVisBekreftMangeModal(false)}
                />
            )}
        </>
    );
}
