import * as React from 'react';
import DocumentTitle from 'react-document-title';
import Innholdslaster from './../innholdslaster/innholdslaster';
import { ListevisningType } from '../ducks/ui/listevisning';
import './minoversikt-side.less';
import './minoversikt.less';
import { useIdentSelector } from '../hooks/redux/use-inlogget-ident';
import { MinOversiktModalController } from '../components/modal/modal-min-oversikt-controller';
import MinoversiktTabell from './minoversikt-portefolje-tabell';
import MinoversiktTabellOverskrift from './minoversikt-portefolje-tabelloverskrift';
import { MinOversiktWrapper } from './min-oversikt-wrapper';
import TabellOverskrift from '../components/tabell-overskrift';
import { useSelectGjeldendeVeileder } from '../hooks/portefolje/use-select-gjeldende-veileder';
import Toolbar from '../components/toolbar/toolbar';
import ToppMeny from '../topp-meny/topp-meny';
import { useSetStateFromUrl } from '../hooks/portefolje/use-set-state-from-url';
import { useFetchPortefolje } from '../hooks/portefolje/use-fetch-portefolje';
import { useSetPortefoljeSortering } from '../hooks/portefolje/use-sett-sortering';
import { useFetchPortefoljeData } from '../hooks/portefolje/use-fetch-portefolje-data';
import FiltreringLabelContainer from '../filtrering/filtrering-label-container';
import { usePortefoljeSelector } from '../hooks/redux/use-portefolje-selector';
import FiltreringContainer from '../filtrering/filtrering-container';
import { sortTiltak } from '../filtrering/filtrering-status/filter-utils';
import { hentPortefoljeForVeileder } from '../ducks/portefolje';
import { useDispatch } from 'react-redux';
import { useSyncStateMedUrl } from '../hooks/portefolje/use-sync-state-med-url';
import { useSetLocalStorageOnUnmount } from '../hooks/portefolje/use-set-local-storage-on-unmount';
import '../style.less';
import {useVeilederHarPortefolje} from "../hooks/portefolje/use-dispatch-statustall-innloggetveileder";
import {useParams} from "react-router";

function MinoversiktSide() {
    const innloggetVeilederIdent = useIdentSelector();
    const {portefolje, filtervalg, listevisning, enhetId, sorteringsrekkefolge, sorteringsfelt} = usePortefoljeSelector(ListevisningType.minOversikt);
    const gjeldendeVeileder = useSelectGjeldendeVeileder();
    const {statustall, enhettiltak, veiledere} = useFetchPortefoljeData(gjeldendeVeileder);
    const settSorteringogHentPortefolje = useSetPortefoljeSortering(ListevisningType.minOversikt);
    const dispatch = useDispatch();

    const { ident } = useParams();

    useSetStateFromUrl();
    useSyncStateMedUrl();
    useSetLocalStorageOnUnmount();
    useFetchPortefolje(ListevisningType.minOversikt);

    const visesAnnenVeiledersPortefolje = gjeldendeVeileder !== innloggetVeilederIdent!.ident;
    const antallBrukere = portefolje.data.antallReturnert > portefolje.data.antallTotalt ? portefolje.data.antallTotalt : portefolje.data.antallReturnert;
    const stickyContainer = antallBrukere > 4 ? 'sticky-container' : 'sticky-container__fjernet';
    const tiltak = sortTiltak(enhettiltak.data.tiltak);
    const harPortefolje = useVeilederHarPortefolje();

    return (
        <DocumentTitle title="Min oversikt">
            <div className="side-storrelse blokk-xl">
                <Innholdslaster avhengigheter={[statustall, enhettiltak, veiledere, harPortefolje]}>
                    <ToppMeny harPortefolje={harPortefolje.data.harPortefolje || !!ident === !!innloggetVeilederIdent}/>
                    <MinOversiktWrapper>
                        <div className="status-filter-kolonne">
                            <FiltreringContainer
                                filtervalg={filtervalg}
                                filtergruppe="veileder"
                                enhettiltak={tiltak}
                            />
                        </div>
                        <div className="liste-kolonne">
                            <FiltreringLabelContainer
                                filtervalg={filtervalg}
                                filtergruppe="veileder"
                                enhettiltak={enhettiltak.data.tiltak}
                                listevisning={listevisning}
                                className={visesAnnenVeiledersPortefolje ? 'filtrering-label-container__annen-veileder' : 'filtrering-label-container'}
                            />
                            <div className={stickyContainer}>
                                <TabellOverskrift
                                    className={visesAnnenVeiledersPortefolje ? 'tabelloverskrift__annen-veileder blokk-xxs' : 'tabelloverskrift blokk-xxs'}/>
                                <div className="sticky-container__skygge">
                                    <Toolbar
                                        filtergruppe={ListevisningType.minOversikt}
                                        onPaginering={() => dispatch(hentPortefoljeForVeileder(
                                            enhetId,
                                            gjeldendeVeileder,
                                            sorteringsrekkefolge,
                                            sorteringsfelt,
                                            filtervalg
                                        ))}
                                        gjeldendeVeileder={gjeldendeVeileder}
                                        visesAnnenVeiledersPortefolje={visesAnnenVeiledersPortefolje}
                                        sokVeilederSkalVises={false}
                                        antallTotalt={portefolje.data.antallTotalt}
                                    />
                                    <MinoversiktTabellOverskrift
                                        visesAnnenVeiledersPortefolje={visesAnnenVeiledersPortefolje}
                                        innloggetVeileder={innloggetVeilederIdent!.ident}
                                        settSorteringOgHentPortefolje={settSorteringogHentPortefolje}
                                    />
                                </div>
                            </div>
                            <MinoversiktTabell
                                innloggetVeileder={innloggetVeilederIdent}
                                settSorteringOgHentPortefolje={settSorteringogHentPortefolje}
                            />
                            <MinOversiktModalController/>
                        </div>
                    </MinOversiktWrapper>
                </Innholdslaster>
            </div>
        </DocumentTitle>
    );
}

export default MinoversiktSide;
