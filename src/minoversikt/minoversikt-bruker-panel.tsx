import {MouseEvent, useEffect, useLayoutEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {Collapse} from 'react-collapse';
import classNames from 'classnames';
import ArbeidslisteButton from '../components/tabell/arbeidslistebutton';
import Etiketter from '../components/tabell/etiketter';
import {BrukerModell, FiltervalgModell, VeilederModell} from '../model-interfaces';
import MinOversiktKolonner from './minoversikt-kolonner';
import ArbeidslistePanel from './minoversikt-arbeidslistepanel';
import {Kolonne} from '../ducks/ui/listevisning';
import {OrNothing} from '../utils/types/types';
import {useFeatureSelector} from '../hooks/redux/use-feature-selector';
import {HUSKELAPP, SKJUL_ARBEIDSLISTEFUNKSJONALITET, VEDTAKSTOTTE} from '../konstanter';
import {logEvent} from '../utils/frontend-logger';
import {AppState} from '../reducer';
import {hentHuskelappForBruker} from '../ducks/portefolje';
import ArbeidslistekategoriVisning from '../components/tabell/arbeidslisteikon';
import FargekategoriTabellradKnapp from '../components/fargekategori/fargekategori-tabellrad-knapp';
import {HuskelappIkonInngang} from './huskelapp/HuskelappIkonInngang';
import {HuskelappPanelvisning} from './huskelapp/panelvisning/HuskelappPanelvisning';
import {TomtHuskelappEllerFargekategoriFelt} from './TomtHuskelappEllerFargekategoriFelt';
import {nullstillBrukerfeil} from '../ducks/brukerfeilmelding';
import {Checkbox, Tag} from '@navikt/ds-react';
import './minoversikt.css';

interface MinOversiktBrukerPanelProps {
    bruker: BrukerModell;
    settMarkert: (fnr: string, markert: boolean) => void;
    enhetId: string;
    filtervalg: FiltervalgModell;
    innloggetVeileder: OrNothing<VeilederModell>;
    valgteKolonner: Kolonne[];
    varForrigeBruker?: boolean;
    hentArbeidslisteForBruker: (fnr: string) => void;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

function MinoversiktBrukerPanel({
    bruker,
    settMarkert,
    enhetId,
    filtervalg,
    innloggetVeileder,
    valgteKolonner,
    varForrigeBruker,
    hentArbeidslisteForBruker,
    onClick
}: MinOversiktBrukerPanelProps) {
    const [apen, setApen] = useState<boolean>(false);
    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();
    const erVedtaksStotteFeatureTogglePa = useFeatureSelector()(VEDTAKSTOTTE);
    const erHuskelappFeatureTogglePa = useFeatureSelector()(HUSKELAPP);
    const arbeidslistefunksjonalitetSkalVises = !useFeatureSelector()(SKJUL_ARBEIDSLISTEFUNKSJONALITET);

    const scrollToLastPos = () => {
        const xPos = parseInt(localStorage.getItem('xScrollPos') ?? '0');
        const yPos = parseInt(localStorage.getItem('yScrollPos') ?? '0');
        window.scrollTo(xPos, yPos);
    };

    useLayoutEffect(() => {
        if (varForrigeBruker) {
            scrollToLastPos();
        }
    }, [varForrigeBruker]);

    const arbeidslisteAktiv = bruker.arbeidsliste?.arbeidslisteAktiv;
    const testIdArbeidslisteAktiv = arbeidslisteAktiv ? `_arbeidsliste` : '';
    const testIdArbeidslisteKategori = arbeidslisteAktiv ? `-${bruker.arbeidsliste.kategori}` : '';
    const testIdDisabled = bruker.fnr === '' ? '_disabled' : '';

    useEffect(() => {
        if (!(arbeidslisteAktiv || (erHuskelappFeatureTogglePa && !!bruker.huskelapp))) {
            setApen(false);
        }
    }, [arbeidslisteAktiv, erHuskelappFeatureTogglePa, bruker.huskelapp]);

    function handleArbeidslisteButtonClick(event) {
        event.preventDefault();
        setApen(!apen);
        logEvent('portefolje.metrikker.ekspander-arbeidsliste', {apen: !apen});
        if (onClick) {
            onClick(event);
        }
    }

    return (
        <li
            className={classNames({'brukerliste--forrigeBruker': varForrigeBruker}, 'brukerliste_rad')}
            data-testid={`brukerliste_element${testIdArbeidslisteAktiv}${testIdArbeidslisteKategori}${testIdDisabled}`}
            data-cy={`brukerliste_element${testIdArbeidslisteAktiv}`}
        >
            <div className="brukerliste__element">
                <Checkbox
                    className="brukerliste__checkbox"
                    checked={bruker.markert}
                    data-testid={`min-oversikt_brukerliste-checkbox${testIdArbeidslisteAktiv}${testIdDisabled}`}
                    disabled={bruker.fnr === ''}
                    hideLabel
                    onChange={() => {
                        settMarkert(bruker.fnr, !bruker.markert);
                        dispatch(nullstillBrukerfeil());
                    }}
                    size="small"
                >
                    Velg bruker {bruker.etternavn}, {bruker.fornavn}
                </Checkbox>
                {arbeidslistefunksjonalitetSkalVises && !erHuskelappFeatureTogglePa && (
                    <ArbeidslistekategoriVisning
                        skalVises={arbeidslisteAktiv}
                        kategori={bruker.arbeidsliste?.kategori}
                        className="brukerliste__arbeidslisteikon"
                        dataTestid={`brukerliste-arbeidslisteikon_${bruker.arbeidsliste?.kategori}`}
                    />
                )}
                {erHuskelappFeatureTogglePa && (
                    <div className="brukerliste__minoversikt-ikonknapper">
                        {
                            // TODO: Treng vi denne sjekken? I kva tilfelle manglar vi fnr for brukar (og kan dei tilfella heller løysast med loading-state)? Ingrid, 2024-10-15
                            bruker.fnr ? (
                                <>
                                    <FargekategoriTabellradKnapp bruker={bruker} />
                                    <HuskelappIkonInngang bruker={bruker} />
                                </>
                            ) : (
                                <>
                                    <TomtHuskelappEllerFargekategoriFelt />
                                    <TomtHuskelappEllerFargekategoriFelt />
                                </>
                            )
                        }
                    </div>
                )}
                <MinOversiktKolonner
                    bruker={bruker}
                    enhetId={enhetId}
                    filtervalg={filtervalg}
                    valgteKolonner={valgteKolonner}
                />
                <div className="brukerliste__gutter-right">
                    <div className="brukerliste__etiketter">
                        <Etiketter bruker={bruker} erVedtakStotteFeatureTogglePa={erVedtaksStotteFeatureTogglePa} />
                        {bruker.nyForVeileder && (
                            <Tag className="tabell-etikett" variant="info" size="small">
                                Ny bruker
                            </Tag>
                        )}
                    </div>
                    <ArbeidslisteButton
                        skalVises={
                            (arbeidslisteAktiv && arbeidslistefunksjonalitetSkalVises) ||
                            (erHuskelappFeatureTogglePa && !!bruker.huskelapp)
                        }
                        apen={apen}
                        onClick={e => {
                            handleArbeidslisteButtonClick(e);
                            if (!bruker.arbeidsliste.hentetKommentarOgTittel) {
                                hentArbeidslisteForBruker(bruker.fnr);
                            }
                            if (!apen) {
                                dispatch(hentHuskelappForBruker(bruker.fnr, enhetId));
                            }
                        }}
                        dataTestid={`min-oversikt_brukerliste-arbeidslistepanel${testIdArbeidslisteAktiv}${testIdDisabled}`}
                    />
                </div>
            </div>
            <Collapse isOpened={apen}>
                {erHuskelappFeatureTogglePa && bruker.huskelapp ? (
                    <HuskelappPanelvisning huskelapp={bruker.huskelapp} bruker={bruker} />
                ) : (
                    <ArbeidslistePanel
                        skalVises={arbeidslisteAktiv && arbeidslistefunksjonalitetSkalVises}
                        bruker={bruker}
                        innloggetVeilederIdent={innloggetVeileder?.ident}
                        settMarkert={() => {
                            settMarkert(bruker.fnr, !bruker.markert);
                        }}
                        apen={apen}
                    />
                )}
            </Collapse>
        </li>
    );
}

export default MinoversiktBrukerPanel;
