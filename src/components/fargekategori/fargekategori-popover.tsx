import React, {useState} from 'react';
import {FargekategoriDataModell, FargekategoriModell} from '../../model-interfaces';
import {useDispatch, useSelector} from 'react-redux';
import {Alert, Button, Popover} from '@navikt/ds-react';
import fargekategoriIkonMapper from './fargekategori-ikon-mapper';
import {oppdaterFargekategoriAction} from '../../ducks/portefolje';
import {lagreFargekategoriAction} from '../../ducks/fargekategori';
import {ThunkDispatch} from 'redux-thunk';
import {AppState} from '../../reducer';
import {AnyAction} from 'redux';

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
    const [visFeilVedOppdaterFargekategori, setVisFeilVedOppdaterFargekategori] = useState(false);
    const fargekategoriverdi = useSelector((state: AppState) => state.fargekategori);

    const doOppdaterFargekategori = (fnr, fargekategori) => {
        const data: FargekategoriDataModell = {
            fnr: fnr,
            fargekategoriVerdi: fargekategori
        };

        const res = dispatch(lagreFargekategoriAction({fnr: fnr, fargekategoriVerdi: fargekategori}));
        //eslint-disable-next-line
        console.log('FargekategoriPopover res: ', res);
        if (fargekategoriverdi.status !== 'ERROR') {
            dispatch(oppdaterFargekategoriAction(data.fargekategoriVerdi, data.fnr));
        } else {
            setVisFeilVedOppdaterFargekategori(true);
        }
    };

    const sendOppdaterFargekategori = fargekategori => {
        // TODO: Fjern valg av første element i liste når det er klart
        doOppdaterFargekategori(fnrs, fargekategori);
    };

    const fargekategoriknapper = Object.entries(FargekategoriModell).map(([key, fargekategori]) => {
        return (
            <>
                <Button
                    key={key}
                    size="small"
                    variant="tertiary"
                    icon={fargekategoriIkonMapper(fargekategori)}
                    onClick={() => {
                        sendOppdaterFargekategori(fargekategori);
                        if (fargekategoriverdi.status !== 'ERROR') {
                            setOpenState(false);
                        }
                    }}
                />
            </>
        );
    });

    return (
        <Popover
            anchorEl={buttonRef.current}
            open={openState}
            onClose={() => {
                setOpenState(false);
                setVisFeilVedOppdaterFargekategori(false);
            }}
            placement={placement}
        >
            <Popover.Content>
                {fargekategoriverdi.status === 'ERROR' && visFeilVedOppdaterFargekategori ? (
                    <Alert variant="error">Feil ved lagring av fargekategori</Alert>
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
