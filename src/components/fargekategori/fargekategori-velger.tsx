import React, {useRef, useState} from 'react';
import {ReactComponent as FargekategoriIkonBlattBokmerke} from '../ikoner/fargekategorier/blaatt-bokmerke.svg';
import {ReactComponent as FargekategoriIkonGronnTrekant} from '../ikoner/fargekategorier/groenn-trekant.svg';
import {ReactComponent as FargekategoriIkonGulSirkel} from '../ikoner/fargekategorier/gul-sirkel.svg';
import {ReactComponent as FargekategoriIkonLillaFirkant} from '../ikoner/fargekategorier/lilla-firkant.svg';
import {ReactComponent as FargekategoriIkonLimeHalvsirkel} from '../ikoner/fargekategorier/lime-halvsirkel.svg';
import {ReactComponent as FargekategoriIkonOransjeFemkant} from '../ikoner/fargekategorier/oransje-femkant.svg';
import {ReactComponent as FargekategoriIkonTomtBokmerke} from '../ikoner/fargekategorier/tomt-bokmerke.svg';
import {FargekategoriModell} from '../../model-interfaces';
import {Button, Popover} from '@navikt/ds-react';

interface FargekategoriPopoverKnappProps {
    fargekategori: FargekategoriModell | null;
}

export default function FargekategoriPopoverKnapp({fargekategori}: FargekategoriPopoverKnappProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [openState, setOpenState] = useState(false);

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

    return (
        <>
            <Button
                ref={buttonRef}
                onClick={() => setOpenState(!openState)}
                size="small"
                icon={fargekategoriIkonMapper(fargekategori)}
                variant="tertiary"
            />
            <Popover
                anchorEl={buttonRef.current}
                open={openState}
                onClose={() => setOpenState(false)}
                placement="right"
            >
                <Popover.Content>
                    <Button icon={<FargekategoriIkonBlattBokmerke />} size="small" variant="tertiary" />
                    <Button icon={<FargekategoriIkonGulSirkel />} size="small" variant="tertiary" />
                    <Button icon={<FargekategoriIkonLillaFirkant />} size="small" variant="tertiary" />
                    <Button icon={<FargekategoriIkonGronnTrekant />} size="small" variant="tertiary" />
                    <Button icon={<FargekategoriIkonLimeHalvsirkel />} size="small" variant="tertiary" />
                    <Button icon={<FargekategoriIkonOransjeFemkant />} size="small" variant="tertiary" />
                    <Button icon={<FargekategoriIkonTomtBokmerke />} size="small" variant="tertiary" />
                </Popover.Content>
            </Popover>
        </>
    );
}
