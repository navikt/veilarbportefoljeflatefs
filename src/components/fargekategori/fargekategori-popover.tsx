import React from 'react';
import {ReactComponent as FargekategoriIkonTomtBokmerke} from '../ikoner/fargekategorier/tomt-bokmerke.svg';
import {BrukerModell, FargekategoriDataModell, FargekategoriModell} from '../../model-interfaces';
import {useDispatch} from 'react-redux';
import {Button, Popover} from '@navikt/ds-react';
import fargekategoriIkonMapper from './fargekategori-ikon-mapper';
import {oppdaterFargekategorien} from '../../ducks/portefolje';
import {visServerfeilModal} from '../../ducks/modal-serverfeil';
import {oppdaterFargekategoriAction} from '../../ducks/portefolje';

interface FargekategoriPopoverProps {
    buttonRef: React.RefObject<HTMLButtonElement>;
    openState: boolean;
    setOpenState: (openState: boolean) => void;
    bruker: BrukerModell;
    toolbarknapp?: boolean;
    placement?: 'right' | 'top-start';
}

export default function FargekategoriPopover({
    buttonRef,
    openState,
    setOpenState,
    bruker,
    placement = 'right'
}: FargekategoriPopoverProps) {
    const dispatch = useDispatch();

    const doOppdaterFargekategori = (fnr, fargekategori) => {
        const data: FargekategoriDataModell = {
            fnr: fnr,
            fargekategoriVerdi: fargekategori
        };
        // eslint-disable-next-line
        console.log('I fargekategori-popover', data.fargekategoriVerdi, data.fnr);
        return dispatch(oppdaterFargekategoriAction(data.fargekategoriVerdi, data.fnr));
    };

    const sendOppdaterFargekategori = fargekategori => {
        // eslint-disable-next-line
        console.log('knappen er trykka');
        doOppdaterFargekategori(bruker.fnr, fargekategori);
    };

    const fargekategoriknapper = Object.entries(FargekategoriModell).map(([key, fargekategori]) => {
        return (
            <Button
                key={key}
                size="small"
                variant="tertiary"
                icon={fargekategoriIkonMapper(fargekategori)}
                onClick={() => {
                    sendOppdaterFargekategori(fargekategori);
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

export function oppdaterFargekategoriState(res, fargekategori, fnr, dispatch) {
    if (!res) {
        return visServerfeilModal()(dispatch);
    }
    // eslint-disable-next-line
    console.log(
        'I oppdaterFargekategoriState i fargekategori-popover.tsx, res, fargekategori, fnr, dispatch',
        res,
        fargekategori,
        fnr,
        dispatch
    );

    const fargekategoriToDispatch = {
        fargekategori,
        fnr
    };
    // eslint-disable-next-line
    console.log(
        'I oppdaterFargekategoriState i fargekategori-popover.tsx, fargekategoriToDispatch',
        fargekategoriToDispatch
    );
    return oppdaterFargekategorien(fargekategoriToDispatch)(dispatch);
}
