import {Action, combineReducers} from 'redux';
import {persistentReducer, LocalStorageScope} from './utils/persistentReducer';
import {valgtEnhetReducer, ValgtEnhetState} from './ducks/valgt-enhet';
import {portefoljeReducer, PortefoljeState} from './ducks/portefolje';
import {pagineringReducer} from './ducks/paginering';
import {sorteringReducer} from './ducks/sortering';
import {veiledereReducer, VeiledereState} from './ducks/veiledere';
import {PortefoljeStorrelser, portefoljestorrelserReducer} from './ducks/portefoljestorrelser';
import {filtreringReducer, initialState} from './ducks/filtrering';
import {statustallVeilederReducer, StatustallVeilederState} from './ducks/statustall/statustall-veileder';
import {systemmeldingerReducer, SystemmeldingState} from './ducks/systemmeldinger';
import {modalReducer} from './ducks/modal';
import {serverfeilModalReducer} from './ducks/modal-serverfeil';
import {feilmedlingModalReducer} from './ducks/modal-feilmelding-brukere';
import {veiledergrupperLagretFilterReducer} from './ducks/veiledergrupper_filter';
import {enhetTiltakReducer, EnhettiltakState} from './ducks/enhettiltak';
import {
    initialStateEnhetensOversikt,
    initialStateMinOversikt,
    listevisningReducer,
    ListevisningState,
    OversiktType
} from './ducks/ui/listevisning';
import {featuresReducer, FeaturesState} from './ducks/features';
import {toastReducer, ToastState} from './store/toast/reducer';
import {FiltervalgModell} from './typer/filtervalg-modell';
import {innloggetVeilederReducer, InnloggetVeilederState} from './ducks/innlogget-veileder';
import {initialStateSidebar, sidebarReducer, SidebarStateType} from './ducks/sidebar-tab';
import {mineFilterReducer} from './ducks/mine-filter';
import {LagretFilterUIState, lagretFilterUIStateReducer} from './ducks/lagret-filter-ui-state';
import {LagretFilterState} from './ducks/lagret-filter';
import {geografiskbostedListReducer, GeografiskBostedListState} from './ducks/geografiskBosted';
import {foedelandListReducer, FoedelandListState} from './ducks/foedeland';
import {tolkebehovListReducer, TolkebehovSpraakListState} from './ducks/tolkebehov';
import {informasjonsmeldingReducer, SesjonStatusState} from './ducks/informasjonsmelding';
import {brukerfeilReducer, BrukerfeilState} from './ducks/brukerfeilmelding';
import {statustallEnhetReducer, StatustallEnhetState} from './ducks/statustall/statustall-enhet';
import {brukerIKontekstReducer, BrukerIKontekstState} from './ducks/bruker-i-kontekst';
import {huskelappReducer} from './ducks/huskelapp';
import {fargekategoriReducer} from './ducks/fargekategori';

/**
 * Hjelpefunksjon for å conditionally kjøre reducere på en action
 *
 * Eksempel: `mineFilterMinOversikt: named(OversiktType.minOversikt, lagretFilterUIStateReducer)`. Her har man en
 * state-slice `mineFilterMinOversikt` og en tilhørende reducer `lagretFilterUIStateReducer`. I dette tilfellet er
 * `lagretFilterUIStateReducer` en generell reducer som brukes for flere state-slices. Derfor ønsker man ikke at
 * `mineFilterMinOversikt` skal oppdateres dersom valgt oversikttype er `OversiktType.enhetensOversikt`.
 *
 * @param name Navnet på en oversikttype
 * @param reducer Reduceren som denne funksjonen brukes i kombinasjon med
 */
function named(name: OversiktType, reducer: (state: any, action: Action) => any) {
    return (state: any, action: Action & {name: OversiktType}) => {
        if (state === undefined) {
            // For å få satt initialState
            return reducer(state, action);
        }

        if (action.name !== name) {
            return state;
        }
        return reducer(state, action);
    };
}

export interface AppState {
    ui: {
        listevisningMinOversikt: ListevisningState;
        listevisningEnhetensOversikt: ListevisningState;
        sidebarMinOversikt: SidebarStateType;
        sidebarEnhetensOversikt: SidebarStateType;
    };
    valgtEnhet: ValgtEnhetState;
    portefolje: PortefoljeState;
    paginering: any;
    sortering: any;
    veiledere: VeiledereState;
    portefoljestorrelser: PortefoljeStorrelser;
    statustallVeileder: StatustallVeilederState;
    statustallEnhet: StatustallEnhetState;
    filtreringEnhetensOversikt: FiltervalgModell;
    filtreringMinoversikt: FiltervalgModell;
    filtreringVeilederoversikt: FiltervalgModell;
    modal: any;
    serverfeilModal: any;
    feilmeldingModal: any;
    huskelapp: any;
    fargekategori: any;
    enhettiltak: EnhettiltakState;
    features: FeaturesState;
    veiledergrupper: LagretFilterState;
    mineFilter: LagretFilterState;
    mineFilterMinOversikt: LagretFilterUIState;
    mineFilterEnhetensOversikt: LagretFilterUIState;
    mineFilterVeilederOversikt: LagretFilterUIState;
    toastReducer: ToastState;
    innloggetVeileder: InnloggetVeilederState;
    systemmeldinger: SystemmeldingState;
    foedelandList: FoedelandListState;
    tolkbehovSpraakList: TolkebehovSpraakListState;
    sesjonStatus: SesjonStatusState;
    brukerfeilStatus: BrukerfeilState;
    geografiskBosted: GeografiskBostedListState;
    brukerIKontekst: BrukerIKontekstState;
}

export default combineReducers<AppState>({
    ui: combineReducers({
        listevisningMinOversikt: persistentReducer(
            LocalStorageScope.MIN_OVERSIKT_LISTEVISNING_STATE,
            window.location,
            named(OversiktType.minOversikt, listevisningReducer),
            initialStateMinOversikt
        ),
        listevisningEnhetensOversikt: persistentReducer(
            LocalStorageScope.ENHETENS_OVERSIKT_LISTEVISNING_STATE,
            window.location,
            named(OversiktType.enhetensOversikt, listevisningReducer),
            initialStateEnhetensOversikt
        ),
        sidebarMinOversikt: persistentReducer(
            LocalStorageScope.MIN_OVERSIKT_SIDEBAR,
            window.location,
            named(OversiktType.minOversikt, sidebarReducer),
            initialStateSidebar
        ),
        sidebarEnhetensOversikt: persistentReducer(
            LocalStorageScope.ENHETENS_OVERSIKT_SIDEBAR,
            window.location,
            named(OversiktType.enhetensOversikt, sidebarReducer),
            initialStateSidebar
        )
    }),
    valgtEnhet: valgtEnhetReducer,
    portefolje: portefoljeReducer,
    paginering: pagineringReducer,
    sortering: sorteringReducer,
    veiledere: veiledereReducer,
    portefoljestorrelser: portefoljestorrelserReducer,
    statustallVeileder: statustallVeilederReducer,
    statustallEnhet: statustallEnhetReducer,
    filtreringEnhetensOversikt: persistentReducer(
        LocalStorageScope.ENHETS_STATE,
        window.location,
        named(OversiktType.enhetensOversikt, filtreringReducer),
        initialState
    ),
    filtreringMinoversikt: persistentReducer(
        LocalStorageScope.VEILEDER_STATE,
        window.location,
        named(OversiktType.minOversikt, filtreringReducer),
        initialState
    ),
    filtreringVeilederoversikt: named(OversiktType.veilederOversikt, filtreringReducer),
    modal: modalReducer,
    serverfeilModal: serverfeilModalReducer,
    feilmeldingModal: feilmedlingModalReducer,
    huskelapp: huskelappReducer,
    fargekategori: fargekategoriReducer,
    enhettiltak: enhetTiltakReducer,
    features: featuresReducer,
    veiledergrupper: veiledergrupperLagretFilterReducer,
    mineFilter: mineFilterReducer,
    mineFilterMinOversikt: named(OversiktType.minOversikt, lagretFilterUIStateReducer),
    mineFilterEnhetensOversikt: named(OversiktType.enhetensOversikt, lagretFilterUIStateReducer),
    mineFilterVeilederOversikt: named(OversiktType.veilederOversikt, lagretFilterUIStateReducer),
    toastReducer: toastReducer,
    innloggetVeileder: innloggetVeilederReducer,
    systemmeldinger: systemmeldingerReducer,
    geografiskBosted: geografiskbostedListReducer,
    foedelandList: foedelandListReducer,
    tolkbehovSpraakList: tolkebehovListReducer,
    sesjonStatus: informasjonsmeldingReducer,
    brukerfeilStatus: brukerfeilReducer,
    brukerIKontekst: brukerIKontekstReducer
});
