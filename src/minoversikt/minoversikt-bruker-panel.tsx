import {MouseEvent, useEffect, useLayoutEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {Collapse} from 'react-collapse';
import classNames from 'classnames';
import {Checkbox, Tag} from '@navikt/ds-react';
import {BrukerpanelKnapp} from '../components/tabell/brukerpanel-knapp';
import Etiketter from '../components/tabell/etiketter';
import {BrukerModell, FiltervalgModell} from '../model-interfaces';
import {MinOversiktKolonner} from './minoversikt-kolonner';
import {Kolonne} from '../ducks/ui/listevisning';
import {useFeatureSelector} from '../hooks/redux/use-feature-selector';
import {HUSKELAPP, VEDTAKSTOTTE} from '../konstanter';
import {logEvent} from '../utils/frontend-logger';
import {AppState} from '../reducer';
import {hentHuskelappForBruker} from '../ducks/portefolje';
import FargekategoriTabellradKnapp from '../components/fargekategori/fargekategori-tabellrad-knapp';
import {HuskelappIkonInngang} from './huskelapp/HuskelappIkonInngang';
import {HuskelappPanelvisning} from './huskelapp/panelvisning/HuskelappPanelvisning';
import {TomtHuskelappEllerFargekategoriFelt} from './TomtHuskelappEllerFargekategoriFelt';
import {nullstillBrukerfeil} from '../ducks/brukerfeilmelding';
import './minoversikt.css';

interface MinOversiktBrukerPanelProps {
    bruker: BrukerModell;
    settMarkert: (fnr: string, markert: boolean) => void;
    enhetId: string;
    filtervalg: FiltervalgModell;
    valgteKolonner: Kolonne[];
    varForrigeBruker?: boolean;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function MinoversiktBrukerPanel({
    bruker,
    settMarkert,
    enhetId,
    filtervalg,
    valgteKolonner,
    varForrigeBruker,
    onClick
}: MinOversiktBrukerPanelProps) {
    const [apen, setApen] = useState<boolean>(false);
    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();
    const erVedtaksStotteFeatureTogglePa = useFeatureSelector()(VEDTAKSTOTTE);
    const erHuskelappFeatureTogglePa = useFeatureSelector()(HUSKELAPP);

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

    useEffect(() => {
        if (!erHuskelappFeatureTogglePa || !bruker.huskelapp) {
            setApen(false);
        }
    }, [erHuskelappFeatureTogglePa, bruker.huskelapp]);

    function handleBrukerpanelKnappClick(event) {
        event.preventDefault();
        setApen(!apen);
        logEvent('portefolje.metrikker.ekspander-arbeidsliste', {apen: !apen});
        if (onClick) {
            onClick(event);
        }

        if (!apen) {
            dispatch(hentHuskelappForBruker(bruker.fnr, enhetId));
        }
    }

    return (
        <li className={classNames({'brukerliste--forrigeBruker': varForrigeBruker}, 'brukerliste_rad')}>
            <div className="brukerliste__element">
                <Checkbox
                    className="brukerliste__checkbox"
                    checked={bruker.markert}
                    data-testid="min-oversikt_brukerliste-checkbox"
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
                    {erHuskelappFeatureTogglePa && !!bruker.huskelapp && (
                        <BrukerpanelKnapp
                            apen={apen}
                            onClick={e => {
                                handleBrukerpanelKnappClick(e);
                            }}
                        />
                    )}
                </div>
            </div>
            <Collapse isOpened={apen}>
                {erHuskelappFeatureTogglePa && bruker.huskelapp && (
                    <HuskelappPanelvisning huskelapp={bruker.huskelapp} bruker={bruker} />
                )}
            </Collapse>
        </li>
    );
}
