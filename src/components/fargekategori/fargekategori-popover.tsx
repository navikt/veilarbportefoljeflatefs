import {ReactNode, RefObject, useState} from 'react';
import {AnyAction} from 'redux';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {Button, Popover} from '@navikt/ds-react';
import {AppState} from '../../reducer';
import {FARGEKATEGORI_OPPDATER_OK, oppdaterFargekategoriAction} from '../../ducks/fargekategori';
import {FargekategoriDataModell, Fargekategorinavn} from '../../model-interfaces';
import {FargekategoriModell} from '../../typer/bruker-modell';
import {fargekategoriIkonMapper} from './fargekategori-ikon-mapper';
import {FargekategoriFeilhandtering} from './FargekategoriFeilhandtering';
import {hentStatustallForVeileder, leggTilStatustall} from '../../ducks/statustall/statustall-veileder';
import {fargekategoriUnderfilterKonfigurasjoner} from '../../filtrering/filtrering-status/fargekategori';
import {useEnhetSelector} from '../../hooks/redux/use-enhet-selector';
import {useSelectGjeldendeVeileder} from '../../hooks/portefolje/use-select-gjeldende-veileder';
import {BekreftEndreFargekategoriPaMangeModal} from './bekreft-endre-fargekategori-pa-mange-modal';

interface FargekategoriPopoverProps {
    buttonRef: RefObject<HTMLButtonElement>;
    popoverOpen: boolean;
    setPopoverOpen: (openState: boolean) => void;
    valgteBrukereFnrs: string[];
    fargekategori?: FargekategoriModell | null;
    placement?: 'right' | 'bottom-start';
    skalBekrefteFlereEnn10?: boolean;
    children?: ReactNode;
}

export const FargekategoriPopover = ({
    buttonRef,
    popoverOpen,
    setPopoverOpen,
    valgteBrukereFnrs,
    fargekategori: gammelFargekategori,
    placement = 'right',
    skalBekrefteFlereEnn10 = false,
    children
}: FargekategoriPopoverProps) => {
    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();
    const apiResponse = useSelector((state: AppState) => state.fargekategori);
    const enhet = useEnhetSelector();
    const veilederIdent = useSelectGjeldendeVeileder();

    const [visBekreftMangeModal, setVisBekreftMangeModal] = useState(false);
    const [valgtFargekategori, setValgtFargekategori] = useState<FargekategoriModell>();

    const visBekreftMangeModalEllerHandleOppdaterFargekategori = fargekategori => {
        if (valgteBrukereFnrs.length >= 10) {
            setValgtFargekategori(fargekategori);
            setVisBekreftMangeModal(true);
        } else handleOppdaterFargekategori(fargekategori);
    };

    const onPopoverClose = () => {
        /* Unngå å lukke popover ved trykk på fargekategori når vi skal vise bekreft-mange-modal */
        if (!visBekreftMangeModal) {
            setPopoverOpen(false);
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
            fnr: valgteBrukereFnrs,
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
            setPopoverOpen(false);
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
                onClick={() => visBekreftMangeModalEllerHandleOppdaterFargekategori(fargekategori)}
            />
        );
    });

    return (
        <>
            <Popover anchorEl={buttonRef.current} open={popoverOpen} onClose={onPopoverClose} placement={placement}>
                <Popover.Content>
                    {children}
                    <FargekategoriFeilhandtering apiResponse={apiResponse}>
                        {fargekategoriknapper}
                    </FargekategoriFeilhandtering>
                </Popover.Content>
            </Popover>
            {skalBekrefteFlereEnn10 && visBekreftMangeModal && valgtFargekategori && (
                <BekreftEndreFargekategoriPaMangeModal
                    valgteBrukereFnrs={valgteBrukereFnrs}
                    valgtFargekategori={valgtFargekategori}
                    onBekreft={() => onBekreftHandling(valgtFargekategori)}
                    onAvbryt={() => setVisBekreftMangeModal(false)}
                />
            )}
        </>
    );
};
