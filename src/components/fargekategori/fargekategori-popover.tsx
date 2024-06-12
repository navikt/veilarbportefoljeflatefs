import React, {useState} from 'react';
import {AnyAction} from 'redux';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {AppState} from '../../reducer';
import {FARGEKATEGORI_OPPDATER_OK, oppdaterFargekategoriAction} from '../../ducks/fargekategori';
import {FargekategoriDataModell, FargekategoriModell, Fargekategorinavn} from '../../model-interfaces';
import fargekategoriIkonMapper from './fargekategori-ikon-mapper';
import {Button, Popover} from '@navikt/ds-react';
import {FargekategoriFeilhandtering} from './FargekategoriFeilhandtering';
import {hentStatustallForVeileder, leggTilStatustall} from '../../ducks/statustall-veileder';
import {fargekategoriUnderfilterKonfigurasjoner} from '../../filtrering/filtrering-status/fargekategori';
import {useEnhetSelector} from '../../hooks/redux/use-enhet-selector';
import {useSelectGjeldendeVeileder} from '../../hooks/portefolje/use-select-gjeldende-veileder';
import {BekreftEndreFargekategoriPaMangeModal} from './bekreft-endre-fargekategori-pa-mange-modal';

interface FargekategoriPopoverProps {
    buttonRef: React.RefObject<HTMLButtonElement>;
    openState: boolean;
    setOpenState: (openState: boolean) => void;
    fnrs: string[];
    fargekategori?: FargekategoriModell | null;
    placement?: 'right' | 'bottom-start';
    bekreftHandling?: boolean; // TODO gje betre namn
    children?: React.ReactNode;
}

export const FargekategoriPopover = ({
    buttonRef,
    openState,
    setOpenState,
    fnrs,
    fargekategori: gammelFargekategori,
    placement = 'right',
    bekreftHandling = false,
    children
}: FargekategoriPopoverProps) => {
    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();
    const apiResponse = useSelector((state: AppState) => state.fargekategori);
    const enhet = useEnhetSelector();
    const veilederIdent = useSelectGjeldendeVeileder();
    const antallFnrSomSkalGiBekreftelsesmelding = 2; // TODO Skal eigentleg vere 10, er 2 no for raskare testing

    const [visBekreftMangeModal, setVisBekreftMangeModal] = useState(false);
    const [valgtFargekategori, setValgtFargekategori] = useState<FargekategoriModell>();

    const visBekreftModalEllerHandleOppdaterFargekategori = fargekategori => {
        if (fnrs.length >= antallFnrSomSkalGiBekreftelsesmelding) {
            setValgtFargekategori(fargekategori);
            setVisBekreftMangeModal(true);
        } else handleOppdaterFargekategori(fargekategori);
    };

    const onPopoverClose = () => {
        /* Unngå å lukke popover ved trykk på fargekategori når vi skal vise bekreft-mange-modal */
        if (!visBekreftMangeModal) {
            setOpenState(false);
        }
    };

    const onBekreftHandling = (fargekategori: FargekategoriModell) => {
        /* Lukk bekreftmodal etter at kategori er oppdatert.
         * Om feil skal feilmelding vises i popover. */
        handleOppdaterFargekategori(fargekategori).then(() => setVisBekreftMangeModal(false));
    };

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const handleOppdaterFargekategori = async (fargekategori: FargekategoriModell) => {
        const data: FargekategoriDataModell = {
            fnr: fnrs,
            fargekategoriVerdi: fargekategori
        };

        const apiResponseAction = await oppdaterFargekategoriAction(data)(dispatch);

        if (apiResponseAction?.type === FARGEKATEGORI_OPPDATER_OK && !apiResponseAction.data.errors.length) {
            if (gammelFargekategori) {
                const gammelStatustallId = fargekategoriUnderfilterKonfigurasjoner.find(
                    konfigurasjon => konfigurasjon.filterId === gammelFargekategori
                )?.statustallId;
                const nyStatustallId = fargekategoriUnderfilterKonfigurasjoner.find(
                    konfigurasjon => konfigurasjon.filterId === fargekategori
                )?.statustallId;
                await dispatch(leggTilStatustall(gammelStatustallId, -1));
                await dispatch(leggTilStatustall(nyStatustallId, 1));
            } else {
                //Venter fordi det returneres FARGEKATEGORI_OPPDATER_OK før statustall er oppdatert i Opensearch
                await delay(500);
                dispatch(hentStatustallForVeileder(enhet, veilederIdent));
            }
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
                title={Fargekategorinavn[fargekategori]}
                onClick={() => visBekreftModalEllerHandleOppdaterFargekategori(fargekategori)}
            />
        );
    });

    return (
        <>
            <Popover anchorEl={buttonRef.current} open={openState} onClose={onPopoverClose} placement={placement}>
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
            {bekreftHandling && visBekreftMangeModal && valgtFargekategori && (
                <BekreftEndreFargekategoriPaMangeModal
                    valgteBrukereFnrs={fnrs}
                    valgtFargekategori={valgtFargekategori}
                    onBekreft={() => onBekreftHandling(valgtFargekategori)}
                    onAvbryt={() => setVisBekreftMangeModal(false)}
                />
            )}
        </>
    );
};
