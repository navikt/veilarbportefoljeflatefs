import React, {useRef, useState} from 'react';
import {ReactComponent as FargekategoriIkonBokmerke} from '../ikoner/fargekategorier/Fargekategoriikon_bokmerke.svg';
import {Button} from '@navikt/ds-react';
// import FargekategoriPopover from '../fargekategori/fargekategori-popover';

interface FargekategoriToolbarKnappProps {
    valgteBrukereFnrs: string[];
}

export default function FargekategoriToolbarKnapp({valgteBrukereFnrs}: FargekategoriToolbarKnappProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [openState, setOpenState] = useState(false);

    return (
        <>
            <Button
                size="small"
                variant="tertiary-neutral"
                icon={<FargekategoriIkonBokmerke />}
                title="Sett fargekategori for alle valgte brukere"
                ref={buttonRef}
                onClick={() => setOpenState(!openState)}
            >
                Fargekategori
            </Button>
            {/* <FargekategoriPopover
                fnrs={valgteBrukereFnrs}
                buttonRef={buttonRef}
                openState={openState}
                setOpenState={setOpenState}
                placement="top-start"
            /> */}
        </>
    );
}
