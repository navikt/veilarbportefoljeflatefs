import React from 'react';
import {ReactComponent as FargekategoriIkonTomtBokmerke} from '../ikoner/fargekategorier/tomt-bokmerke.svg';
import {BrukerModell, FargekategoriDataModell, FargekategoriModell} from '../../model-interfaces';
import {useDispatch} from 'react-redux';
import {Button, Popover} from '@navikt/ds-react';
import fargekategoriIkonMapper from './fargekategori-ikon-mapper';
import {lagreFargekategoriAction, oppdaterFargekategoriAction} from '../../ducks/portefolje';
import {ThunkDispatch} from 'redux-thunk';
import {AppState} from '../../reducer';
import {AnyAction} from 'redux';

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
    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();

    const doOppdaterFargekategori = (fnr, fargekategori) => {
        const data: FargekategoriDataModell = {
            fnr: fnr,
            fargekategoriVerdi: fargekategori
        };

        dispatch(lagreFargekategoriAction(data)).then(
            dispatch(oppdaterFargekategoriAction(data.fargekategoriVerdi, data.fnr))
        );
    };

    const sendOppdaterFargekategori = fargekategori => {
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
