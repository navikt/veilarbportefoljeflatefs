import {useRef, useState} from 'react';
import {BodyShort, Button} from '@navikt/ds-react';
import FargekategoriIkonBokmerke from '../ikoner/fargekategorier/Fargekategoriikon_bokmerke.svg?react';
import {FargekategoriPopover} from '../fargekategori/fargekategori-popover';
import {resetFargekategoriStateAction} from '../../ducks/fargekategori';
import {oppdaterBrukerfeil} from '../../ducks/brukerfeilmelding';
import {useAppDispatch} from '../../store';

interface FargekategoriToolbarKnappProps {
    valgteBrukereFnrs: string[];
}

export function FargekategoriToolbarKnapp({valgteBrukereFnrs}: FargekategoriToolbarKnappProps) {
    const dispatch = useAppDispatch();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [popoverOpen, setPopoverOpen] = useState(false);

    return (
        <>
            <Button
                size="small"
                variant="tertiary"
                icon={<FargekategoriIkonBokmerke />}
                title="Endre kategori for alle valgte brukere"
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
                Endre kategori
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
