import React, {useRef, useState} from 'react';
import {BrukerModell} from '../../model-interfaces';
import {Button} from '@navikt/ds-react';
import {FargekategoriPopover} from './fargekategori-popover';
import fargekategoriIkonMapper from './fargekategori-ikon-mapper';

interface FargekategoriPopoverKnappProps {
    bruker: BrukerModell;
}

export default function FargekategoriTabellradKnapp({bruker}: FargekategoriPopoverKnappProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [openState, setOpenState] = useState(false);

    return (
        <>
            <Button
                size="small"
                variant="tertiary"
                icon={fargekategoriIkonMapper(bruker.fargekategori)}
                ref={buttonRef}
                onClick={() => setOpenState(!openState)}
                className="fargekategori-tabellrad-knapp"
            />
            <FargekategoriPopover
                buttonRef={buttonRef}
                openState={openState}
                setOpenState={setOpenState}
                fnrs={[bruker.fnr]}
            />
        </>
    );
}
