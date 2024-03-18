import React from 'react';
import {AnyAction} from 'redux';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {AppState} from '../../reducer';
import {oppdaterFargekategoriAction} from '../../ducks/portefolje';
import {lagreFargekategoriAction} from '../../ducks/fargekategori';
import {FargekategoriDataModell, FargekategoriModell} from '../../model-interfaces';
import fargekategoriIkonMapper from './fargekategori-ikon-mapper';
import {Button, Popover} from '@navikt/ds-react';

interface FargekategoriPopoverProps {
    buttonRef: React.RefObject<HTMLButtonElement>;
    openState: boolean;
    setOpenState: (openState: boolean) => void;
    fnrs: string[];
    placement?: 'right' | 'bottom-start';
    children?: React.ReactNode;
}

export default function FargekategoriPopover({
    buttonRef,
    openState,
    setOpenState,
    fnrs,
    placement = 'right',
    children
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
        // TODO: Fjern valg av første element i liste når det er klart
        doOppdaterFargekategori(fnrs[0], fargekategori);
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
                    setOpenState(false);
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
                {children}
                {fargekategoriknapper}
            </Popover.Content>
            {/* <Popover.Content>
                Vil du endre kategori for alle markerte brukere til: "valgtikon"
                <Button size="small">Endre</Button>
                <Button size="small" >Avbryt</Button>
                - Eventuelt se på fjernarbeidslistemodal
            </Popover.Content> */}
        </Popover>
    );
}
