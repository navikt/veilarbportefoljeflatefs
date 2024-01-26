import React, {useRef, useState} from 'react';
import {BookmarkIcon} from '@navikt/aksel-icons';
import {Button} from '@navikt/ds-react';
import FargekategoriPopover from '../fargekategori/fargekategori-popover';
import {BrukerModell} from '../../model-interfaces';

interface FargekategoriToolbarKnappProps {
    valgteBrukere: BrukerModell[];
}

export default function FargekategoriToolbarKnapp({valgteBrukere}: FargekategoriToolbarKnappProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [openState, setOpenState] = useState(false);

    const valgteBrukereFnr = valgteBrukere.map(bruker => bruker.fnr);

    return (
        <>
            <Button
                size="small"
                variant="tertiary-neutral"
                icon={<BookmarkIcon />}
                title="Sett fargekategori for alle valgte brukere"
                ref={buttonRef}
                onClick={() => setOpenState(!openState)}
            >
                Fargekategori
            </Button>
            <FargekategoriPopover
                buttonRef={buttonRef}
                openState={openState}
                setOpenState={setOpenState}
                placement="top-start"
                brukere={valgteBrukereFnr}
            />
        </>
    );
}
