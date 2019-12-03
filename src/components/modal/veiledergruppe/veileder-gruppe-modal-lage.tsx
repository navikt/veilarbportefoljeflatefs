import ModalWrapper, { ModalProps } from 'nav-frontend-modal';
import { Innholdstittel } from 'nav-frontend-typografi';
import React, { useEffect, useState } from 'react';
import { FiltervalgModell } from '../../../model-interfaces';
import { Input } from 'nav-frontend-skjema';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../reducer';
import {
    lageNyGruppe,
    lagreEndringer,
    LagretFilter,
    NyGruppe,
    RedigerGruppe,
    slettGruppe
} from '../../../ducks/lagret-filter';
import { initialState } from '../../../ducks/filtrering';
import SokVeiledere from '../../sok-veiledere/sok-veiledere';
import EndringerIkkeLagretModal from './ulagrede-endringer-modal';
import SletteVeiledergruppeModal from './slett-gruppe-modal';
import SlettingFeiletModal from './sletting-feilet-modal';
import LagringFeiletModal from './lagring-feilet-modal';
import hiddenIf from '../../hidden-if/hidden-if';
import { visLagreEndringerToast, visSletteGruppeToast } from '../../../store/toast/actions';
import { useEnhetIdSelector } from '../../../hooks/redux/use-enhetid-selector';
import ValgtVeilederGruppeListe from './valgt-veiledergruppe-liste';
import Spinner from '../../spinner/spinner';

interface VeilederGruppeModalProps {
    lagretFilter?: LagretFilter;
}

const HiddenIfFlatknapp = hiddenIf(Flatknapp);
const HiddenIfSpinner = hiddenIf(Spinner);

function VeilederGruppeModalLage(props: VeilederGruppeModalProps & Omit<ModalProps, 'contentLabel' | 'children'>) {

    const [filterValg, setFilterValg] = useState<FiltervalgModell>(initialState);
    const [gruppeNavn, setGruppeNavn] = useState<string>('');

    const [visSletteVeiledergruppeModal, setSletteVeiledergruppeModal] = useState(false);
    const [visEndringerIkkeLagretModal, setEndringerIkkeLagretModal] = useState(false);
    const [visSlettingFeiletModal, setSlettingFeiletModal] = useState(false);
    const [visLagringFeiletModal, setLagringFeiletModal] = useState(false);
    const [visSpinner, setSpinner] = useState(false);

    const lagretFilterState = useSelector((state: AppState) => state.lagretFilter);
    const enhetId = useEnhetIdSelector();

    const fjernVeiledereFraListen = (prevState: FiltervalgModell, veilederTarget: string) => prevState.veiledere
        ? {...prevState, veiledere: prevState.veiledere.filter(v => v !== veilederTarget)}
        : {...prevState, veiledere: []};
    const modalTittel = props.lagretFilter ? 'Rediger veiledergruppe' : 'Ny veiledergruppe';

    const dispatch = useDispatch();

    let veiledergruppeListe = [];

    const hanterChange = (erValgt: boolean, veilederTarget: string) => erValgt
        ? setFilterValg(prevState => {
            if (prevState.veiledere) {
                return ({...prevState, veiledere: [...prevState.veiledere, veilederTarget]});
            } else {
                return ({...prevState, veiledere: [veilederTarget]});
            }
        })
        : setFilterValg(prevState => fjernVeiledereFraListen(prevState, veilederTarget));

    useEffect(() => {
        setFilterValg(props.lagretFilter ? props.lagretFilter.filterValg : initialState);
        setGruppeNavn(props.lagretFilter ? props.lagretFilter.filterNavn : '');
    }, [props.lagretFilter]);

    useEffect(() => {
        for (let i = 0; i < lagretFilterState.data.length; i++) {
            // @ts-ignore
            veiledergruppeListe.push(lagretFilterState.data[i].filterNavn);
        }
    },);

    const harGjortEndringer = () => {
        let initialstateListe;
        props.lagretFilter === undefined ? initialstateListe = [] : initialstateListe = props.lagretFilter.filterValg.veiledere;
        if (props.lagretFilter) {
            // @ts-ignore
            if (filterValg.veiledere.length !== initialstateListe.length || gruppeNavn !== props.lagretFilter.filterNavn) {
                return true;
            }
            return initialstateListe.reduce((acc, currValue) => {
                // @ts-ignore
                return acc && filterValg.veiledere.includes(currValue);
            }, true) === false;
        }
        // @ts-ignore
        return (filterValg.veiledere.length > 0 || gruppeNavn !== '');
    };

    const lukkModal = () => {
        if (harGjortEndringer()) {
            setEndringerIkkeLagretModal(harGjortEndringer());
            return;
        }
        return props.onRequestClose();
    };

    // const validerGruppenavn = () => {
    //     if (gruppeNavn === '') {
    //         return 'Gruppenavn kan ikke være tomt';
    //     }
    //     // @ts-ignore
    //     if (veiledergruppeListe.includes(gruppeNavn)) {
    //         return 'Gruppenavn finnes allerede';
    //     }
    //     return '';
    // };
    //
    // const validerSkjema = () => {
    //     // @ts-ignore
    //     return (validerGruppenavn() || filterValg.veiledere.length === 0);
    // };

    function sjekkStatus() {
        if (lagretFilterState.status === 'PENDING') {
            setSpinner(true);
        }
        if (lagretFilterState.status === 'FEILET') { //skal være ok, kjører denne for å teste modalen for lagring feilet
            setSpinner(false);
            dispatch(visLagreEndringerToast());
            props.lagretFilter ? setFilterValg(props.lagretFilter.filterValg) : setFilterValg(initialState);
            props.lagretFilter ? setGruppeNavn(props.lagretFilter.filterNavn) : setGruppeNavn('');
            props.onRequestClose();
        } else if (lagretFilterState.status === 'OK') {
            console.log('heihiehiehei');
            // setSletteVeiledergruppeModal(false);
            setLagringFeiletModal(true);
        }
    }

    const lagreModal = () => {
        if (harGjortEndringer()) {
            if (props.lagretFilter) {
                sjekkStatus();
                const endringer: RedigerGruppe = {
                    filterNavn: gruppeNavn,
                    filterValg,
                    filterId: props.lagretFilter.filterId,
                };
                dispatch(lagreEndringer(endringer, enhetId));
            } else {
                sjekkStatus();
                const endringer: NyGruppe = {filterNavn: gruppeNavn, filterValg};
                dispatch(lageNyGruppe(endringer, enhetId));
            }
        }
        props.onRequestClose();
    };

    const slettModal = () => {
        setSletteVeiledergruppeModal(true);
    };

    function slettVeiledergruppeOgLukkModaler() {
        if (props.lagretFilter) {
            if (lagretFilterState.status === 'FEILET') { //skal hete OK, byttet kun for testing
                dispatch(slettGruppe(enhetId, props.lagretFilter.filterId));
                dispatch(visSletteGruppeToast());
                setSletteVeiledergruppeModal(false);
                props.onRequestClose();
                // props.lagretFilter ? setFilterValg(props.lagretFilter.filterValg) : setFilterValg(initialState);
            } else if (lagretFilterState.status === 'OK') {
                setSletteVeiledergruppeModal(false);
                setSlettingFeiletModal(true);
            }
        }
    }

    function endringerIkkeLagretOgLukkModaler() {
        setEndringerIkkeLagretModal(false);
        props.onRequestClose();
        if (props.lagretFilter) {
            setFilterValg(props.lagretFilter.filterValg);
            setGruppeNavn(props.lagretFilter.filterNavn);
        } else {
            setFilterValg(initialState);
            setGruppeNavn('');
        }
    }

    return (
        <ModalWrapper
            isOpen={props.isOpen}
            contentLabel="Ny veiledergruppe"
            onRequestClose={lukkModal}
            portalClassName="veiledergruppe-modal"
        >
            <HiddenIfSpinner hidden={!visSpinner}/>
            <div className="veiledergruppe-modal__form">
                <Innholdstittel tag="h1" className="blokk-xs">
                    {modalTittel}
                </Innholdstittel>
                <div className="veiledergruppe-modal__content">
                    <Input
                        label="Gruppenavn:"
                        value={gruppeNavn}
                        bredde="L"
                        onChange={e => setGruppeNavn(e.target.value)}
                        maxLength={35}
                    />
                    <div className="veiledergruppe-modal__sokefilter">
                        <SokVeiledere
                            erValgt={(ident) => filterValg.veiledere ? filterValg.veiledere.includes(ident) : false}
                            hanterVeilederValgt={hanterChange}
                        />
                    </div>
                    <p id="veiledergruppe-modal__valgteveileder__label">
                        Valgte veiledere:
                    </p>
                    <ValgtVeilederGruppeListe
                        valgteVeileder={filterValg.veiledere || []}
                        fjernValgtVeileder={(veilederTarget) =>
                            setFilterValg(prevState => fjernVeiledereFraListen(prevState, veilederTarget))
                        }
                    />
                </div>
                <div className="veiledergruppe-modal__knappegruppe">
                    <Hovedknapp
                        className="veiledergruppe-modal__knappegruppe__lagre"
                        htmlType="submit"
                        onClick={lagreModal}
                    >
                        Lagre endringene
                    </Hovedknapp>
                    <Flatknapp
                        className="veiledergruppe-modal__knappegruppe__avbryt"
                        onClick={lukkModal}
                    >
                        Avbryt
                    </Flatknapp>
                    <HiddenIfFlatknapp
                        className="veiledergruppe-modal__knappegruppe__slett"
                        onClick={slettModal}
                        hidden={!props.lagretFilter}
                    >
                        Slett gruppe
                    </HiddenIfFlatknapp>
                </div>
            </div>
            <SletteVeiledergruppeModal
                isOpen={visSletteVeiledergruppeModal}
                onRequestClose={() => setSletteVeiledergruppeModal(false)}
                onSubmit={slettVeiledergruppeOgLukkModaler}
            />
            <EndringerIkkeLagretModal
                isOpen={visEndringerIkkeLagretModal}
                onRequestClose={() => setEndringerIkkeLagretModal(false)}
                onSubmit={endringerIkkeLagretOgLukkModaler}
            />
            <SlettingFeiletModal
                isOpen={visSlettingFeiletModal}
                onRequestClose={() => setSlettingFeiletModal(false)}
            />
            <LagringFeiletModal
                isOpen={visLagringFeiletModal}
                onRequestClose={() => setLagringFeiletModal(false)}
            />
        </ModalWrapper>
    );
}

export default VeilederGruppeModalLage;
