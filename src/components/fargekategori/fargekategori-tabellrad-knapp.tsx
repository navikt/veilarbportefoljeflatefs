import React, {useRef, useState} from 'react';
import {BrukerModell, FargekategoriModell} from '../../model-interfaces';
import {Button} from '@navikt/ds-react';
import FargekategoriPopover from './fargekategori-popover';
import fargekategoriIkonMapper from './fargekategori-ikon-mapper';

interface FargekategoriPopoverKnappProps {
    bruker: BrukerModell;
}

export default function FargekategoriPopoverKnapp({bruker}: FargekategoriPopoverKnappProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [openState, setOpenState] = useState(false);

    return (
        <>
            <Button
                ref={buttonRef}
                onClick={() => setOpenState(!openState)}
                size="small"
                icon={fargekategoriIkonMapper(bruker.fargekategori)}
                variant="tertiary"
            />
            <FargekategoriPopover
                bruker={bruker}
                buttonRef={buttonRef}
                openState={openState}
                setOpenState={setOpenState}
            />
        </>
    );
}
