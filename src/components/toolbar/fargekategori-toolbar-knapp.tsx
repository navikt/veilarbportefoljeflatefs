import React, {useRef, useState} from 'react';
import {BookmarkIcon} from '@navikt/aksel-icons';
import {Button} from '@navikt/ds-react';
import FargekategoriPopover from '../fargekategori/fargekategori-popover';

export default function FargekategoriToolbarKnapp() {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [openState, setOpenState] = useState(false);

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
            />
        </>
    );
}
