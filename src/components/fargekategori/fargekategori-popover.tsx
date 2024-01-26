import React from 'react';
import {ReactComponent as FargekategoriIkonTomtBokmerke} from '../ikoner/fargekategorier/tomt-bokmerke.svg';
import {FargekategoriModell} from '../../model-interfaces';
import {Button, Popover} from '@navikt/ds-react';
import fargekategoriIkonMapper from './fargekategori-ikon-mapper';

interface FargekategoriPopoverProps {
    buttonRef: React.RefObject<HTMLButtonElement>;
    openState: boolean;
    setOpenState: (openState: boolean) => void;
    brukere: string[];
    placement?: 'right' | 'top-start';
}

export default function FargekategoriPopover({
    buttonRef,
    openState,
    setOpenState,
    brukere,
    placement = 'right'
}: FargekategoriPopoverProps) {
    const sendOppdaterFargekategori = (brukere, fargekategori) => {
        // try {
        //     console.log('Oppdater fargekategori for brukere', brukere, 'til', fargekategori);
        //     setOpenState(false);
        // } catch (error) {
        //     console.log(error);
        // }
    };

    const fargekategoriknapper = Object.entries(FargekategoriModell).map(([key, fargekategori]) => {
        return (
            <Button
                key={key}
                size="small"
                variant="tertiary"
                icon={fargekategoriIkonMapper(fargekategori)}
                onClick={() => {
                    sendOppdaterFargekategori(brukere, fargekategori);
                }}
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
                {fargekategoriknapper}
                <Button icon={<FargekategoriIkonTomtBokmerke />} size="small" variant="tertiary" />
            </Popover.Content>
        </Popover>
    );
}
