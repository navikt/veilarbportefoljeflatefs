import * as React from 'react';
import DocumentTitle from 'react-document-title';
import Innholdslaster from './../innholdslaster/innholdslaster';
import {ListevisningType} from '../ducks/ui/listevisning';
import './minoversikt-side.less';
import {useIdentSelector} from "../hooks/redux/use-inlogget-ident";
import {MinOversiktModalController} from "../components/modal/modal-min-oversikt-controller";
import MinoversiktTabell from "./minoversikt-portefolje-tabell";
import MinoversiktTabellOverskrift from "./minoversikt-portefolje-tabelloverskrift";
import {MinOversiktWrapper} from "./min-oversikt-wrapper";
import TabellOverskrift from "../components/tabell-overskrift";
import {useSelectGjeldendeVeileder} from "../hooks/portefolje/use-select-gjeldende-veileder";
import Toolbar from "../components/toolbar/toolbar";
import ToppMeny from "../topp-meny/topp-meny";
import {useSetStateFromUrl} from "../hooks/portefolje/use-set-state-from-url";
import {useFetchPortefolje} from "../hooks/portefolje/use-fetch-portefolje";
import {useSetPortefoljeSortering} from "../hooks/portefolje/use-sett-sortering";
import {useFetchStatustallTilltakData} from "../hooks/portefolje/use-fetch-statustall-tilltak-data";
import FiltreringLabelContainer from "../filtrering/filtrering-label-container";
import {usePortefoljeSelector} from "../hooks/redux/use-portefolje-selector";
import FiltreringContainer from "../filtrering/filtrering-container";
import {sortTiltak} from "../filtrering/filtrering-status/filter-utils";

function MinoversiktSide () {
    const innloggetVeilederIdent = useIdentSelector();

    const {portefolje, filtervalg, listevisning} = usePortefoljeSelector(ListevisningType.minOversikt);
    const gjeldendeVeileder = useSelectGjeldendeVeileder();
    const{ statustall, enhettiltak } = useFetchStatustallTilltakData(gjeldendeVeileder);
    const settSorteringogHentPortefolje = useSetPortefoljeSortering(ListevisningType.minOversikt);

    useSetStateFromUrl();
    useFetchPortefolje(ListevisningType.minOversikt);

    const visesAnnenVeiledersPortefolje = gjeldendeVeileder !== innloggetVeilederIdent!.ident;
    const antallBrukere = portefolje.data.antallReturnert > portefolje.data.antallTotalt ? portefolje.data.antallTotalt : portefolje.data.antallReturnert;
    const stickyWrapper = antallBrukere > 4 ? 'col-lg-9 col-md-12 col-sm-12' : 'sticky-div col-lg-9 col-md-12 col-sm-12';
    const stickyContainer = antallBrukere > 4 ? 'sticky-container' : 'sticky-container__fjernet';
    const tiltak = sortTiltak(enhettiltak.data.tiltak);


    return (
        <DocumentTitle title="Min oversikt">
            <div className="minoversikt-side blokk-xl">
                <ToppMeny>
                    <Innholdslaster avhengigheter={[statustall, enhettiltak]}>
                        <MinOversiktWrapper>
                            <div className="col-lg-3 col-lg-offset-0 col-md-offset-1 col-md-10 col-sm-12">
                                <FiltreringContainer
                                    filtervalg={filtervalg}
                                    filtergruppe="veileder"
                                    enhettiltak={tiltak}
                                />
                            </div>
                            <div className={stickyWrapper}>
                                <div className={stickyContainer}>
                                    <FiltreringLabelContainer
                                        filtervalg={filtervalg}
                                        filtergruppe="veileder"
                                        enhettiltak={enhettiltak}
                                        listevisning={listevisning}
                                        className={visesAnnenVeiledersPortefolje ? 'filtrering-label-container__annen-veileder' : 'filtrering-label-container'}
                                    />
                                    <TabellOverskrift className={visesAnnenVeiledersPortefolje ? 'tabelloverskrift__annen-veileder blokk-xxs' : 'tabelloverskrift blokk-xxs'}/>
                                    <div className="sticky-container__skygge">
                                        <Toolbar
                                            filtergruppe={ListevisningType.minOversikt}
                                            onPaginering={settSorteringogHentPortefolje}
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
                </ToppMeny>
            </div>
        </DocumentTitle>
    );
}

export default MinoversiktSide;
