import React from 'react';
import {FargekategoriDataModell, FargekategoriModell} from '../../model-interfaces';
import {useDispatch, useSelector} from 'react-redux';
import {Alert, Button, Popover} from '@navikt/ds-react';
import fargekategoriIkonMapper from './fargekategori-ikon-mapper';
import {ThunkDispatch} from 'redux-thunk';
import {AppState} from '../../reducer';
import {AnyAction} from 'redux';
import {oppdaterFargekategoriThunk} from '../../minoversikt/oppdaterFargekategori';
import {STATUS} from '../../ducks/utils';

interface FargekategoriPopoverProps {
    buttonRef: React.RefObject<HTMLButtonElement>;
    openState: boolean;
    setOpenState: (openState: boolean) => void;
    fnrs: string[];
    toolbarknapp?: boolean;
    placement?: 'right' | 'top-start';
}

export default function FargekategoriPopover({
    buttonRef,
    openState,
    setOpenState,
    fnrs,
    placement = 'right'
}: FargekategoriPopoverProps) {
    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();
    const feilStatus = useSelector((state: AppState) => state.fargekategori.status);

    // TODO: Hvis en bytter til v1/fargekategorier, må en sende med liste av fnr
    const sendOppdaterFargekategori = async (fnr, fargekategori) => {
        const data: FargekategoriDataModell = {
            fnr: fnr,
            fargekategoriVerdi: fargekategori
        };

        await oppdaterFargekategoriThunk(dispatch, data);
    };

    const fargekategoriknapper = Object.entries(FargekategoriModell).map(([key, fargekategori]) => {
        return (
            <Button
                key={key}
                size="small"
                variant="tertiary"
                icon={fargekategoriIkonMapper(fargekategori)}
                onClick={() => {
                    sendOppdaterFargekategori(fnrs[0], fargekategori);
                    if (feilStatus === STATUS.OK) {
                        setOpenState(false);
                    }
                }}
            />
        );
    });

    return (
        <Popover
            anchorEl={buttonRef.current}
            open={openState}
            onClose={() => {
                setOpenState(false);
            }}
            placement={placement}
        >
            <Popover.Content>
                {feilStatus === STATUS.ERROR ? (
                    <>
                        <Alert variant="error" size="small">
                            Oppdatering av fargekategori feilet
                        </Alert>{' '}
                        {fargekategoriknapper}
                    </>
                ) : (
                    fargekategoriknapper
                )}
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
