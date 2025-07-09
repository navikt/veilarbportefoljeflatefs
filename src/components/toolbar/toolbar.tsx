import {useSelector} from 'react-redux';
import classNames from 'classnames';
import {Alert, Heading} from '@navikt/ds-react';
import {MagnifyingGlassIcon, PersonPlusIcon} from '@navikt/aksel-icons';
import {Paginering} from './paginering/paginering';
import {OversiktType} from '../../ducks/ui/listevisning';
import {AppState} from '../../reducer';
import {ToolbarKnapp} from './toolbar-knapp';
import {useWindowWidth} from '../../hooks/use-window-width';
import {FargekategoriToolbarKnapp} from './fargekategori-toolbar-knapp';
import {VelgKolonner} from './velg-kolonner';
import '../../style.css';
import './toolbar.css';

interface ToolbarProps {
    id?: string;
    oversiktType: OversiktType;
    antallTotalt: number;
    onPaginering?: () => void;
    sokVeilederSkalVises?: boolean;
    antallValgteVeiledere?: number;
    scrolling?: boolean;
    isSidebarHidden?: boolean;
}

export function Toolbar({
    id,
    oversiktType,
    antallTotalt,
    onPaginering,
    sokVeilederSkalVises,
    antallValgteVeiledere,
    scrolling = false,
    isSidebarHidden = false
}: ToolbarProps) {
    const brukere = useSelector((state: AppState) => state.portefolje.data.brukere);
    const valgteBrukere = brukere.filter(bruker => bruker.markert === true);
    const aktiv = valgteBrukere.length > 0;
    const brukerfeilMelding = useSelector((state: AppState) => state.brukerfeilStatus);
    const feilmelding = brukerfeilMelding.message;
    const valgteBrukereFnrs = valgteBrukere.map(bruker => bruker.fnr);

    const oversikt = side => {
        switch (side) {
            case OversiktType.minOversikt:
                return <FargekategoriToolbarKnapp valgteBrukereFnrs={valgteBrukereFnrs} />;
            case OversiktType.enhetensOversikt:
                return (
                    <div className="sok-veileder-wrapper">
                        <ToolbarKnapp
                            tittel="Søk veileder"
                            skalVises={sokVeilederSkalVises}
                            aktiv
                            tildelveileder={false}
                            testid="sok-veileder_knapp"
                            ikon={<MagnifyingGlassIcon aria-hidden={true} fontSize="1.5rem" />}
                            oversiktType={oversiktType}
                        />
                    </div>
                );
            case OversiktType.veilederOversikt:
                return null;
        }
    };

    const windowWidth = useWindowWidth() < 1200;
    const shouldHaveToolbarHiddenClassName: boolean =
        (scrolling && isSidebarHidden && !windowWidth) ||
        (scrolling && windowWidth && !isSidebarHidden) ||
        (!isSidebarHidden && windowWidth);
    return (
        <>
            <div className={classNames('toolbar', shouldHaveToolbarHiddenClassName && 'toolbar__hidden')} id={id}>
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
                                tildelveileder={true}
                                testid="tildel-veileder_knapp"
                                ikon={<PersonPlusIcon aria-hidden={true} fontSize="1.5rem" />}
                                oversiktType={oversiktType}
                            />
                        </div>
                    )}
                    {oversikt(oversiktType)}
                </div>
                <div className="toolbar__element">
                    {oversiktType !== OversiktType.veilederOversikt && <VelgKolonner oversiktType={oversiktType} />}
                    <Paginering onPaginering={onPaginering} antallTotalt={antallTotalt} />
                </div>
            </div>
            {brukerfeilMelding.status && (
                <Alert
                    variant="error"
                    size="small"
                    inline={true}
                    className="brukerfeilmelding"
                    data-testid={'brukerfeilmelding'}
                    role="alert"
                >
                    {feilmelding}
                </Alert>
            )}
        </>
    );
}
