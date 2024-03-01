import React, {useState} from 'react';
import {FargekategoriModell} from '../../model-interfaces';
import {useDispatch} from 'react-redux';
import {Alert, Button, Popover} from '@navikt/ds-react';
import fargekategoriIkonMapper from './fargekategori-ikon-mapper';
import {oppdaterFargekategoriAction} from '../../ducks/portefolje';
import {ThunkDispatch} from 'redux-thunk';
import {AppState} from '../../reducer';
import {AnyAction} from 'redux';
import * as Api from '../../middleware/api';
import {lagreFargekategoriAction} from '../../ducks/fargekategori';

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
    const [harFeil, setHarFeil] = useState(false);

    const doOppdaterFargekategori = (fnr, fargekategori) => {
        setHarFeil(false);
        const fargekategoridata = {
            fargekategoriVerdi: fargekategori,
            fnr
        };

        lagreFargekategoriAction(fargekategoridata)(dispatch);

        //
        // Api.oppdaterFargekategori(fargekategoridata)
        //     .then(res => {
        //         oppdaterFargekategoriAction(fargekategoridata.fargekategoriVerdi, fargekategoridata.fnr)(dispatch);
        //         setOpenState(false);
        //     })
        //     .catch(() => setHarFeil(true));
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
                setHarFeil(false);
            }}
            placement={placement}
        >
            <Popover.Content>
                {fargekategoriknapper}
                {harFeil && <Alert variant="error">HJÆLP!</Alert>}
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
