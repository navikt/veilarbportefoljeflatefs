import React, {useRef, useState} from 'react';
import {FargekategoriModell} from '../../model-interfaces';
import {Button} from '@navikt/ds-react';
import FargekategoriPopover from './fargekategori-popover';
import fargekategoriIkonMapper from './fargekategori-ikon-mapper';

interface FargekategoriPopoverKnappProps {
    fargekategori: FargekategoriModell | null;
}

export default function FargekategoriPopoverKnapp({fargekategori}: FargekategoriPopoverKnappProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [openState, setOpenState] = useState(false);

    return (
        <>
            <Button
                ref={buttonRef}
                onClick={() => setOpenState(!openState)}
                size="small"
                icon={fargekategoriIkonMapper(fargekategori)}
                variant="tertiary"
            />
            <FargekategoriPopover buttonRef={buttonRef} openState={openState} setOpenState={setOpenState} />
        </>
    );
}
