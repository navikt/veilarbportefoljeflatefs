import {useRef, useState} from 'react';
import {Button} from '@navikt/ds-react';
import {BrukerModell} from '../../typer/bruker-modell';
import {Fargekategorinavn} from '../../model-interfaces';
import {FargekategoriPopover} from './fargekategori-popover';
import {fargekategoriIkonMapper} from './fargekategori-ikon-mapper';
import {resetFargekategoriStateAction} from '../../ducks/fargekategori';

import {useAppDispatch} from '../../hooks/redux/use-app-dispatch';

interface FargekategoriPopoverKnappProps {
    bruker: BrukerModell;
    readOnly?: boolean;
}

export function FargekategoriTabellradKnapp({bruker, readOnly = false}: FargekategoriPopoverKnappProps) {
    const dispatch = useAppDispatch();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [popoverOpen, setPopoverOpen] = useState(false);

    if (readOnly) {
        return (
            <span
                aria-label={bruker.fargekategori ? Fargekategorinavn[bruker.fargekategori] : 'Ingen kategori'}
                className="fargekategori-tabellrad-knapp"
                title={bruker.fargekategori ? Fargekategorinavn[bruker.fargekategori] : 'Ingen kategori'}
            >
                {fargekategoriIkonMapper(bruker.fargekategori)}
            </span>
        );
    }

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
