import React from 'react';
import {FargekategoriDataModell, FargekategoriModell} from '../../model-interfaces';
import {useDispatch} from 'react-redux';
import {Button, Popover} from '@navikt/ds-react';
import fargekategoriIkonMapper from './fargekategori-ikon-mapper';
import {oppdaterFargekategoriAction} from '../../ducks/portefolje';
import {lagreFargekategoriAction} from '../../ducks/fargekategori';
import {ThunkDispatch} from 'redux-thunk';
import {AppState} from '../../reducer';
import {AnyAction} from 'redux';
import {visServerfeilModal} from '../../ducks/modal-serverfeil';
import {OPPDATER_FARGEKATEGORI_FEILET, visFeiletModal} from '../../ducks/modal-feilmelding-brukere';

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

    const doOppdaterFargekategori = (fnr, fargekategori) => {
        const data: FargekategoriDataModell = {
            fnr: fnr,
            fargekategoriVerdi: fargekategori
        };

        dispatch(lagreFargekategoriAction(data)).then(res =>
            visServerfeil(res, [data], dispatch).then(() =>
                dispatch(oppdaterFargekategoriAction(data.fargekategoriVerdi, data.fnr))
            )
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
            <Popover.Content>{fargekategoriknapper}</Popover.Content>
            {/* <Popover.Content>
                Vil du endre kategori for alle markerte brukere til: "valgtikon"
                <Button size="small">Endre</Button>
                <Button size="small" >Avbryt</Button>
                - Eventuelt se på fjernarbeidslistemodal
            </Popover.Content> */}
        </Popover>
    );
}

function visServerfeil(res, liste: FargekategoriDataModell[], dispatch) {
    if (!res) {
        return visServerfeilModal()(dispatch);
    }
    const brukereOK = res.data.data;
    const brukereError = res.data.error;
    // eslint-disable-next-line
    console.log('rad 100 ', res, brukereOK);
    /*
        const brukereSomSkalOppdateres = liste
            .map(brukerliste => ({
                ...brukerliste,
                fargekategori: props.fargekategori
            }))
            .filter(bruker => brukereOK.includes(bruker.fnr));
    */
    if (brukereError.length > 0) {
        visFeiletModal({
            aarsak: OPPDATER_FARGEKATEGORI_FEILET,
            brukereError
        })(dispatch);
    }
}
