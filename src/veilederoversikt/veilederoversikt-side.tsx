import {ReactNode, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Box} from '@navikt/ds-react';
import {VeilederoversiktSidevisning} from './veilederoversikt-sidevisning';
import {Innholdslaster} from '../innholdslaster/innholdslaster';
import {FiltreringVeiledere} from '../filtrering/filtrering-veiledere';
import FiltreringLabelContainer from '../filtrering/filtrering-label/filtrering-label-container';
import {lagLablerTilVeiledereMedIdenter} from '../filtrering/filtrering-label/lagLablerTilVeiledereMedIdenter';
import {endreFiltervalg, fjern, slettEnkeltFilter} from '../ducks/filtrering';
import {ToppMeny} from '../topp-meny/topp-meny';
import {useOnMount} from '../hooks/use-on-mount';
import {getSideFromUrl, getSidestorrelseFromUrl} from '../utils/url-utils';
import {loggSkjermMetrikker, Side} from '../utils/metrikker/skjerm-metrikker';
import {AppState} from '../reducer';
import {pagineringSetup} from '../ducks/paginering';
import {useSetEnhetIUrl} from '../hooks/portefolje/use-set-enhet-i-url';
import {useSetLocalStorageOnUnmount} from '../hooks/portefolje/use-set-local-storage-on-unmount';
import {FilteringVeiledergrupper} from '../filtrering/filtrering-veileder-grupper/filtrering-veiledergrupper';
import {useFetchStatustallForVeileder} from '../hooks/portefolje/use-fetch-statustall';
import {VeiledergruppePanel} from './veiledergruppe-panel';
import {oppdaterKolonneAlternativer, OversiktType} from '../ducks/ui/listevisning';
import {LagredeFilterUIController} from '../filtrering/lagrede-filter-controller';
import {Informasjonsmeldinger} from '../components/informasjonsmeldinger/informasjonsmeldinger';
import {useSelectGjeldendeVeileder} from '../hooks/portefolje/use-select-gjeldende-veileder';
import './veilederoversikt.css';
import {Filtervalg} from '../typer/filtervalg-modell';

export function VeilederoversiktSide() {
    const gjeldendeVeileder = useSelectGjeldendeVeileder();
    const statustall = useFetchStatustallForVeileder(gjeldendeVeileder);
    const filtervalg = useSelector((state: AppState) => state.filtreringVeilederoversikt);
    const oversiktType = OversiktType.veilederOversikt;
    const dispatch = useDispatch();
    const slettVeilederFilter = ident => {
        const oppdatertFiltervalg = {
            ...filtervalg,
            veiledere: fjern(Filtervalg.veiledere, filtervalg.veiledere, ident)
        };
        oppdaterKolonneAlternativer(dispatch, oppdatertFiltervalg, oversiktType);
        return dispatch(slettEnkeltFilter(Filtervalg.veiledere, ident, oversiktType));
    };
    const veiledere = useSelector((state: AppState) => state.veiledere);
    const portefoljestorrelser = useSelector((state: AppState) => state.portefoljestorrelser);
    const id = 'veileder-oversikt';

    useEffect(() => {
        document.title = 'Veilederoversikt';
    }, []);

    useSetEnhetIUrl();

    useOnMount(() => {
        const side = getSideFromUrl();
        const sidestorrelse = getSidestorrelseFromUrl();
        dispatch(pagineringSetup({side, sidestorrelse}));
        loggSkjermMetrikker(Side.VEILEDER_OVERSIKT);
    });

    useSetLocalStorageOnUnmount();
    LagredeFilterUIController({oversiktType: oversiktType});

    const doEndreFiltervalg = (filterId: string, filterVerdi: ReactNode) => {
        dispatch(pagineringSetup({side: 1}));
        oppdaterKolonneAlternativer(dispatch, {...filtervalg, [filterId]: filterVerdi}, oversiktType);
        dispatch(endreFiltervalg(filterId, filterVerdi, oversiktType));
    };

    return (
        <div
            className="side-storrelse veilederoversikt"
            id={`side-storrelse_${id}`}
            data-testid={`side-storrelse_${id}`}
        >
            <ToppMeny oversiktType={oversiktType} />
            <Informasjonsmeldinger />
            <Innholdslaster avhengigheter={[statustall]}>
                <div className="oversikt-sideinnhold-veilederside" role="tabpanel" id={`oversikt-sideinnhold_${id}`}>
                    <div className="status-filter-kolonne">
                        <Box className="sok-veileder" role="search">
                            <FiltreringVeiledere endreFiltervalg={doEndreFiltervalg} filtervalg={filtervalg} />
                        </Box>
                        <VeiledergruppePanel tittel="Veiledergrupper">
                            <FilteringVeiledergrupper oversiktType={OversiktType.veilederOversikt} />
                        </VeiledergruppePanel>
                    </div>
                    <div className="liste-kolonne">
                        <FiltreringLabelContainer
                            filtervalg={{
                                veiledere: lagLablerTilVeiledereMedIdenter(
                                    filtervalg.veiledere,
                                    veiledere.data.veilederListe,
                                    slettVeilederFilter
                                )
                            }}
                            oversiktType={OversiktType.veilederOversikt}
                            className="filtrering-label-container"
                            role="listitem"
                        />
                        <VeilederoversiktSidevisning
                            veiledere={veiledere.data.veilederListe}
                            portefoljestorrelser={portefoljestorrelser}
                            veilederFilter={filtervalg.veiledere}
                        />
                    </div>
                </div>
            </Innholdslaster>
        </div>
    );
}
