import React, {useRef, useState} from 'react';
import {ReactComponent as ArbeidslisteikonBla} from '../ikoner/arbeidsliste/arbeidslisteikon_bla.svg';
import {ReactComponent as ArbeidslisteikonGronn} from '../ikoner/arbeidsliste/arbeidslisteikon_gronn.svg';
import {ReactComponent as ArbeidslisteikonGul} from '../ikoner/arbeidsliste/arbeidslisteikon_gul.svg';
import {ReactComponent as ArbeidslisteikonLilla} from '../ikoner/arbeidsliste/arbeidslisteikon_lilla.svg';
import {ReactComponent as ArbeidslisteikonBlaNy} from '../ikoner/fargekategorier/blaatt-bokmerke.svg';
import {ReactComponent as ArbeidslisteikonGronnNy} from '../ikoner/fargekategorier/groenn-trekant.svg';
import {ReactComponent as ArbeidslisteikonGulNy} from '../ikoner/fargekategorier/gul-sirkel.svg';
import {ReactComponent as ArbeidslisteikonLillaNy} from '../ikoner/fargekategorier/lilla-firkant.svg';
import {ReactComponent as ArbeidslisteikonLimeNy} from '../ikoner/fargekategorier/lime-halvsirkel.svg';
import {ReactComponent as ArbeidslisteikonOransjeNy} from '../ikoner/fargekategorier/oransje-femkant.svg';
import {ReactComponent as ArbeidslisteikonTomtNy} from '../ikoner/fargekategorier/tomt-bokmerke.svg';
import {Button, Popover} from '@navikt/ds-react';

export default function FargekategoriPopoverKnapp() {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [openState, setOpenState] = useState(false);

    return (
        <>
            <Button
                ref={buttonRef}
                onClick={() => setOpenState(!openState)}
                size="small"
                icon={<ArbeidslisteikonGul />}
                variant="tertiary"
            />
            <Popover
                anchorEl={buttonRef.current}
                open={openState}
                onClose={() => setOpenState(false)}
                placement="right"
            >
                <Popover.Content>
                    <ArbeidslisteikonBlaNy />
                    <ArbeidslisteikonGulNy />
                    <ArbeidslisteikonLillaNy />
                    <ArbeidslisteikonGronnNy />
                    <ArbeidslisteikonLimeNy />
                    <ArbeidslisteikonOransjeNy />
                </Popover.Content>
            </Popover>
        </>
    );
}
