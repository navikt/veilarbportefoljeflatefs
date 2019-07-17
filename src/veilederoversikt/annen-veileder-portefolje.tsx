import React from 'react';
import Innholdslaster from '../innholdslaster/innholdslaster';
import { FormattedMessage } from 'react-intl';
import LenkerMinoversikt from '../lenker/lenker-minoversikt';
import FiltreringContainer from '../filtrering/filtrering-container';
import FiltreringLabelContainer from '../filtrering/filtrering-label-container';
import ListevisningInfoPanel from '../components/toolbar/listevisning/listevisning-infopanel';
import { ListevisningType } from '../ducks/ui/listevisning';
import VeilederPortefoljeVisning from '../minoversikt/minoversikt-portefolje-visning';
import { Normaltekst } from 'nav-frontend-typografi';
import statustall from '../mocks/statustall';
import listevisning from '../components/toolbar/listevisning/listevisning';
import VeilederoversiktLenke from './veilederoversiktlenke';

function VisAnnenVeilederPortefolje() {
    return (
        <DocumentTitle title="Min oversikt">
            <Innholdslaster avhengigheter={[statustall, enhettiltak]}>
                <div className="minoversikt-side blokk-xl">
                    <VeilederoversiktLenke/>
                    <section className={'annen-veileder'}>
                        <Normaltekst tag="h1" className="blokk-s annen-veileder-varsel">
                            {`Du er inne på ${gjeldendeVeileder.fornavn} ${gjeldendeVeileder.etternavn } sin oversikt`}
                        </Normaltekst>
                        <div className="portefolje-side">
                            <LenkerMinoversikt veilederident={veilederFraUrl}/>
                            <div id="oversikt-sideinnhold" role="tabpanel">
                                <p className="typo-infotekst begrensetbredde blokk-l">
                                    <FormattedMessage id="ingresstekst.minoversikt" />
                                </p>
                                <div className="row">
                                    <div className="col-lg-3 col-lg-offset-0 col-md-offset-1 col-md-10 col-sm-12">
                                        <FiltreringContainer
                                            filtervalg={filtervalg}
                                            filtergruppe="veileder"
                                            veileder={gjeldendeVeileder}
                                            enhettiltak={enhettiltak.data.tiltak}
                                        />
                                    </div>
                                    <div className="col-lg-9 col-md-12 col-sm-12">
                                        <FiltreringLabelContainer
                                            filtervalg={filtervalg}
                                            filtergruppe="veileder"
                                            veileder={gjeldendeVeileder}
                                            enhettiltak={enhettiltak.data.tiltak}
                                            listevisning={listevisning}
                                        />
                                        <ListevisningInfoPanel name={ListevisningType.minOversikt} />
                                        <VeilederPortefoljeVisning
                                            gjeldendeVeileder={gjeldendeVeileder}
                                            visesAnnenVeiledersPortefolje={visesAnnenVeiledersPortefolje}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Innholdslaster>
        </DocumentTitle>
    );
}
