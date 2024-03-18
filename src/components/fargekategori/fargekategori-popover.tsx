import React from 'react';
import {AnyAction} from 'redux';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {AppState} from '../../reducer';
import {oppdaterFargekategoriAction, resetFargekategoriStateAction} from '../../ducks/fargekategori';
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

export const FargekategoriPopover = ({
    buttonRef,
    openState,
    setOpenState,
    fnrs,
    placement = 'right',
    children
}: FargekategoriPopoverProps) => {
    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();
    //const {data: fargekategoriResponse} = useSelector((state: AppState) => state.fargekategori); //For å kunne hente ut feil og se hvilke fnr det feilet på

    const handleOppdaterFargekategori = (fargekategori: FargekategoriModell) => {
        const data: FargekategoriDataModell = {
            fnr: fnrs,
            fargekategoriVerdi: fargekategori
        };

        oppdaterFargekategoriAction(data)(dispatch);
    };

    const fargekategoriknapper = Object.entries(FargekategoriModell).map(([key, fargekategori]) => {
        return (
            <Button
                key={key}
                size="small"
                variant="tertiary"
                icon={fargekategoriIkonMapper(fargekategori)}
                onClick={() => {
                    handleOppdaterFargekategori(fargekategori);
                    dispatch(resetFargekategoriStateAction());
                    setOpenState(false);
                }}
            />
        );
    });

    return (
        <Popover
            anchorEl={buttonRef.current}
            open={openState}
            onClose={() => {
                dispatch(resetFargekategoriStateAction());
                setOpenState(false);
            }}
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
};
