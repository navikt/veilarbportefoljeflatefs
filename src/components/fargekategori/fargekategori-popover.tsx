import React from 'react';
import {AnyAction} from 'redux';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {AppState} from '../../reducer';
import {FARGEKATEGORI_OPPDATER_OK, oppdaterFargekategoriAction} from '../../ducks/fargekategori';
import {FargekategoriDataModell, FargekategoriModell} from '../../model-interfaces';
import fargekategoriIkonMapper from './fargekategori-ikon-mapper';
import {Button, Popover} from '@navikt/ds-react';
import {FargekategoriFeilhandtering} from './FargekategoriFeilhandtering';

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
    const apiResponse = useSelector((state: AppState) => state.fargekategori);

    const handleOppdaterFargekategori = async (fargekategori: FargekategoriModell) => {
        const data: FargekategoriDataModell = {
            fnr: fnrs,
            fargekategoriVerdi: fargekategori
        };

        const apiResponseAction = await oppdaterFargekategoriAction(data)(dispatch);

        if (apiResponseAction?.type === FARGEKATEGORI_OPPDATER_OK && !apiResponseAction.data.errors.length) {
            setOpenState(false);
        }
    };

    const fargekategoriknapper = Object.entries(FargekategoriModell).map(([key, fargekategori]) => {
        return (
            <Button
                key={key}
                size="small"
                variant="tertiary"
                icon={fargekategoriIkonMapper(fargekategori)}
                onClick={() => handleOppdaterFargekategori(fargekategori)}
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
                <FargekategoriFeilhandtering apiResponse={apiResponse}>
                    {fargekategoriknapper}
                </FargekategoriFeilhandtering>
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
