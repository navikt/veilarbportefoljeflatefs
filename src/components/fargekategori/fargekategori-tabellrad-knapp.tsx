import React, {useRef, useState} from 'react';
import {BrukerModell, Fargekategorinavn} from '../../model-interfaces';
import {Button} from '@navikt/ds-react';
import {FargekategoriPopover} from './fargekategori-popover';
import fargekategoriIkonMapper from './fargekategori-ikon-mapper';
import {resetFargekategoriStateAction} from '../../ducks/fargekategori';
import {ThunkDispatch} from 'redux-thunk';
import {AppState} from '../../reducer';
import {AnyAction} from 'redux';
import {useDispatch} from 'react-redux';

interface FargekategoriPopoverKnappProps {
    bruker: BrukerModell;
}

export default function FargekategoriTabellradKnapp({bruker}: FargekategoriPopoverKnappProps) {
    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [popoverOpen, setPopoverOpen] = useState(false);

    return (
        <>
            <Button
                size="small"
                variant="tertiary"
                icon={fargekategoriIkonMapper(bruker.fargekategori)}
                ref={buttonRef}
                title={(bruker.fargekategori ? Fargekategorinavn[bruker.fargekategori] : 'Ingen kategori') + ': endre'}
                onClick={() => {
                    setPopoverOpen(!popoverOpen);
                    dispatch(resetFargekategoriStateAction());
                }}
                className="fargekategori-tabellrad-knapp"
            />
            <FargekategoriPopover
                buttonRef={buttonRef}
                popoverOpen={popoverOpen}
                setPopoverOpen={setPopoverOpen}
                valgteBrukereFnrs={[bruker.fnr]}
                fargekategori={bruker.fargekategori}
            />
        </>
    );
}
