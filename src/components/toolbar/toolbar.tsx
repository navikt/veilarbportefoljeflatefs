import * as React from 'react';
import Paginering from './paginering/paginering';
import Listevisning from './listevisning/listevisning';
import {OversiktType} from '../../ducks/ui/listevisning';
import './toolbar.css';
import '../../style.css';
import {useSelector} from 'react-redux';
import ArbeidslisteKnapp from './legg-til-arbeidsliste-knapp';
import {AppState} from '../../reducer';
import ToolbarKnapp from './toolbar-knapp';
import classNames from 'classnames';
import {useWindowWidth} from '../../hooks/use-window-width';
import {AddPerson, Search} from '@navikt/ds-icons';
import {Alert, Heading} from '@navikt/ds-react';
import FargekategoriToolbarKnapp from './fargekategori-toolbar-knapp';
import {useFeatureSelector} from '../../hooks/redux/use-feature-selector';
import {HUSKELAPP} from '../../konstanter';

interface ToolbarProps {
    oversiktType: OversiktType;
    onPaginering?: () => void;
    sokVeilederSkalVises?: boolean;
    children?: React.ReactNode;
    gjeldendeVeileder?: string;
    antallTotalt: number;
    id?: string;
    antallValgteVeiledere?: number;
    scrolling?: boolean;
    isSidebarHidden?: boolean;
}

function Toolbar({
    id,
    oversiktType,
    antallTotalt,
    onPaginering,
    scrolling = false,
    isSidebarHidden = false,
    antallValgteVeiledere,
    sokVeilederSkalVises
}: ToolbarProps) {
    const brukere = useSelector((state: AppState) => state.portefolje.data.brukere);
    const erFargekategoriFeatureTogglePa = useFeatureSelector()(HUSKELAPP);
    const valgteBrukere = brukere.filter(bruker => bruker.markert === true);
    const aktiv = valgteBrukere.length > 0;
    const brukerfeilMelding = useSelector((state: AppState) => state.brukerfeilStatus);
    const feilmelding = brukerfeilMelding.message;
    const valgteBrukereFnrs = valgteBrukere.map(bruker => bruker.fnr);

    const oversikt = side => {
        switch (side) {
            case OversiktType.minOversikt:
                return (
                    <>
                        {!erFargekategoriFeatureTogglePa && <ArbeidslisteKnapp />}
                        {erFargekategoriFeatureTogglePa && (
                            <FargekategoriToolbarKnapp valgteBrukereFnrs={valgteBrukereFnrs} />
                        )}
                    </>
                );
            case OversiktType.enhetensOversikt:
                return (
                    <div className="sok-veileder-wrapper">
                        <ToolbarKnapp
                            tittel="Søk veileder"
                            skalVises={sokVeilederSkalVises}
                            aktiv
                            tildelveileder={false}
                            testid="sok-veileder_knapp"
                            ikon={<Search className="toolbar-knapp__ikon" id="sok-veileder-ikon" />}
                            oversiktType={oversiktType}
                        />
                    </div>
                );
            case OversiktType.veilederOversikt:
                return <></>;
        }
    };

    const windowWidth = useWindowWidth() < 1200;
    return (
        <>
            <div
                className={classNames(
                    'toolbar',
                    ((scrolling && isSidebarHidden && !windowWidth) ||
                        (scrolling && windowWidth && !isSidebarHidden) ||
                        (!isSidebarHidden && windowWidth)) &&
                        'toolbar__hidden'
                )}
                id={id}
            >
                <div className="toolbar__element">
                    {oversiktType === OversiktType.veilederOversikt && (
                        <Heading size="small" level="2">
                            {antallTotalt === 0
                                ? `Ingen veiledere`
                                : `Viser ${antallValgteVeiledere} av totalt ${antallTotalt} veiledere.`}
                        </Heading>
                    )}
                    {oversiktType !== OversiktType.veilederOversikt && (
                        <div className="tildel-veileder-wrapper">
                            <ToolbarKnapp
                                tittel="Tildel veileder"
                                skalVises={oversiktType in OversiktType}
                                aktiv={aktiv}
                                tildelveileder
                                testid="tildel-veileder_knapp"
                                ikon={<AddPerson className="toolbar-knapp__ikon" id="tildel-veileder-ikon" />}
                                oversiktType={oversiktType}
                            />
                        </div>
                    )}
                    {oversikt(oversiktType)}
                </div>
                <div className="toolbar__element">
                    <Listevisning oversiktType={oversiktType} />
                    <Paginering onPaginering={onPaginering} antallTotalt={antallTotalt} />
                </div>
            </div>
            {brukerfeilMelding.status && (
                <Alert
                    variant="error"
                    size="small"
                    inline={true}
                    className="brukerfeilmelding"
                    aria-labelledby={feilmelding}
                    data-testid={'brukerfeilmelding'}
                >
                    {feilmelding}
                </Alert>
            )}
        </>
    );
}

export default Toolbar;
