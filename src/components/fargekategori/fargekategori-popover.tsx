import React, {useRef, useState} from 'react';
import {ReactComponent as FargekategoriIkonBlattBokmerke} from '../ikoner/fargekategorier/blaatt-bokmerke.svg';
import {ReactComponent as FargekategoriIkonGronnTrekant} from '../ikoner/fargekategorier/groenn-trekant.svg';
import {ReactComponent as FargekategoriIkonGulSirkel} from '../ikoner/fargekategorier/gul-sirkel.svg';
import {ReactComponent as FargekategoriIkonLillaFirkant} from '../ikoner/fargekategorier/lilla-firkant.svg';
import {ReactComponent as FargekategoriIkonLimeHalvsirkel} from '../ikoner/fargekategorier/lime-halvsirkel.svg';
import {ReactComponent as FargekategoriIkonOransjeFemkant} from '../ikoner/fargekategorier/oransje-femkant.svg';
import {ReactComponent as FargekategoriIkonTomtBokmerke} from '../ikoner/fargekategorier/tomt-bokmerke.svg';
import {FargekategoriModell} from '../../model-interfaces';
import {BodyShort, Button, Heading, Popover} from '@navikt/ds-react';

interface FargekategoriPopoverProps {
    buttonRef: React.RefObject<HTMLButtonElement>;
    openState: boolean;
    setOpenState: (openState: boolean) => void;
    handleButtonClick: () => void;
    toolbarknapp?: boolean;
    placement?: 'right' | 'top-start';
}

export default function FargekategoriPopover({
    buttonRef,
    openState,
    setOpenState,
    handleButtonClick,
    toolbarknapp,
    placement = 'right'
}: FargekategoriPopoverProps) {
    const fargekategoriIkonMapper = fargekategori => {
        switch (fargekategori) {
            case FargekategoriModell.FARGEKATEGORI_A:
                return <FargekategoriIkonBlattBokmerke />;
            case FargekategoriModell.FARGEKATEGORI_B:
                return <FargekategoriIkonGronnTrekant />;
            case FargekategoriModell.FARGEKATEGORI_C:
                return <FargekategoriIkonGulSirkel />;
            case FargekategoriModell.FARGEKATEGORI_D:
                return <FargekategoriIkonLillaFirkant />;
            case FargekategoriModell.FARGEKATEGORI_E:
                return <FargekategoriIkonLimeHalvsirkel />;
            case FargekategoriModell.FARGEKATEGORI_F:
                return <FargekategoriIkonOransjeFemkant />;
            case null:
                return <FargekategoriIkonTomtBokmerke />;
            default:
                return undefined;
        }
    };

    const fargekategoriknapper = Object.entries(FargekategoriModell).map(([key, fargekategori]) => {
        return (
            <Button
                key={key}
                size="small"
                variant="tertiary"
                icon={fargekategoriIkonMapper(fargekategori)}
                onClick={handleButtonClick}
            />
        );
    });

    return (
        <Popover
            anchorEl={buttonRef.current}
            open={openState}
            onClose={() => setOpenState(false)}
            placement={placement}
        >
            <Popover.Content>
                {/* {toolbarknapp && <div>Sett fargekategori for alle valgte brukere</div>} */}
                {fargekategoriknapper}
                <Button icon={<FargekategoriIkonTomtBokmerke />} size="small" variant="tertiary" />
            </Popover.Content>
        </Popover>
    );
}
