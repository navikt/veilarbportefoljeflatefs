import ModalWrapper, { ModalProps } from 'nav-frontend-modal';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import React, { useEffect, useState } from 'react';
import { FiltervalgModell } from '../../../model-interfaces';
import { Input } from 'nav-frontend-skjema';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../reducer';
import { ReactComponent as SlettIkon } from './remove-circle.svg';
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
import hiddenIf from '../../hidden-if/hidden-if';
import { visSletteGruppeToast } from '../../../store/toast/actions';
import { useEnhetSelector } from '../../../hooks/redux/use-enhet-selector';
import NavFrontendSpinner from 'nav-frontend-spinner';

interface VeilederGruppeModalProps {
    lagretFilter?: LagretFilter;
}

const HiddenIfFlatknapp = hiddenIf(Flatknapp);

function VeilederGruppeModalLage(props: VeilederGruppeModalProps & Omit<ModalProps, 'contentLabel' | 'children'>) {

    const [filterValg, setFilterValg] = useState<FiltervalgModell>(initialState);
    const [gruppeNavn, setGruppeNavn] = useState<string>('');

    const [visSletteVeiledergruppeModal, setSletteVeiledergruppeModal] = useState(false);
    const [visEndringerIkkeLagretModal, setEndringerIkkeLagretModal] = useState(false);
    const [visSlettingFeiletModal, setSlettingFeiletModal] = useState(false);

    const lagretFilterState = useSelector((state: AppState) => state.lagretFilter);

    const enhet = useEnhetSelector();

    const fjernVeiledereFraListen = (prevState: FiltervalgModell, veilederTarget: string) => prevState.veiledere
        ? {...prevState, veiledere: prevState.veiledere.filter(v => v !== veilederTarget)}
        : {...prevState, veiledere: []};

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

    const modalTittel = props.lagretFilter ? 'Rediger veiledergruppe' : 'Ny veiledergruppe';

    const dispatch = useDispatch();

    const harGjortEndringer = () => {
        const redigertListe = filterValg.veiledere;
        const initialstateNyListe = props.lagretFilter;
        let initialstateListe;
        // @ts-ignore
        initialstateNyListe === undefined ? initialstateListe = [] : initialstateListe = props.lagretFilter.filterValg.veiledere;
        if (props.lagretFilter) {
            // @ts-ignore
            if (redigertListe.length !== initialstateListe.length || gruppeNavn !== initialstateNyListe.filterNavn) {
                return true;
            }
            // @ts-ignore
            return initialstateListe.reduce((acc, currValue) => {
                // @ts-ignore
                return acc && redigertListe.includes(currValue);
            }, true) === false;
        }
        // @ts-ignore
        return (redigertListe.length > 0 || gruppeNavn !== '');
    };

    const lukkModal = () => {
        if (harGjortEndringer()) {
            setEndringerIkkeLagretModal(harGjortEndringer());
            return;
        }
        return props.onRequestClose();
    };

    const validerGruppenavn = () => {
        if (gruppeNavn === '') {
            return 'Gruppenavn kan ikke være tomt';
        }
        // @ts-ignore
        if (veiledergruppeListe.includes(gruppeNavn)){
            return 'Gruppenavn finnes allerede';
        }
        return '';
    };

    const valideringSkjema = () => {
        // @ts-ignore
        return (validerGruppenavn() || filterValg.veiledere.length === 0);
    };

    const lagreModal = () => {
        if (harGjortEndringer()) {
            valideringSkjema();
            if (props.lagretFilter) {
                const endringer: RedigerGruppe = {
                    filterNavn: gruppeNavn,
                    filterValg,
                    filterId: props.lagretFilter.filterId,
                };
                enhet && dispatch(lagreEndringer(endringer, enhet.enhetId));

            } else {
                const endringer: NyGruppe = {filterNavn: gruppeNavn, filterValg};
                enhet && dispatch(lageNyGruppe(endringer, enhet.enhetId));
            }
            if (lagretFilterState.status === 'PENDING') {
                //vis spinner
                return;
            } else if (lagretFilterState.status === 'OK') {
                props.lagretFilter ? setFilterValg(props.lagretFilter.filterValg) : setFilterValg(initialState);
                props.onRequestClose();
            } else if (lagretFilterState.status === 'FEILET') {
                //vis modal med lagring feilet
            }
        }
        //ikke lagre endringer og send feilmodal
        // console.log('her skjedde det noe rart');
        props.onRequestClose();
    };

    const slettModal = () => {
        setSletteVeiledergruppeModal(true);
    };

    function slettVeiledergruppeOgLukkModaler() {
        if (props.lagretFilter) {
            if (lagretFilterState.status === 'OK') {
                enhet && dispatch(slettGruppe(enhet.enhetId, props.lagretFilter.filterId));
                dispatch(visSletteGruppeToast());
                setSletteVeiledergruppeModal(false);
                props.onRequestClose();
                props.lagretFilter ? setFilterValg(props.lagretFilter.filterValg) : setFilterValg(initialState);
            } else if (lagretFilterState.status === 'FEILET') {
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
            <div className="veiledergruppe-modal__form">
                <Innholdstittel tag="h1" className="blokk-xs">
                    {modalTittel}
                </Innholdstittel>
                <div className="veiledergruppe-modal__content">

                    <NavFrontendSpinner type="XL"/>
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
        </ModalWrapper>
    );
}

interface ValgtVeilederGruppeListeProps {
    valgteVeileder: string[],
    fjernValgtVeileder: (veilederId: string) => void;
}

function ValgtVeilederGruppeListe(props: ValgtVeilederGruppeListeProps) {
    const veilederePaEnheten = useSelector((state: AppState) => state.veiledere.data.veilederListe);

    const veiledere = veilederePaEnheten
        .filter(veilederPaEnhet =>
            props.valgteVeileder.includes(veilederPaEnhet.ident))
        .sort((veileder1, veiledere2) => veileder1.etternavn.localeCompare(veiledere2.etternavn));

    const splitArrayITo = [veiledere.slice(0, Math.ceil(veiledere.length / 2)), veiledere.slice(Math.ceil(veiledere.length / 2), veiledere.length)];

    const sjekkTomListe = (veiledere) => {
        if (veiledere.length === 0) {
            return (
                <div className="veiledergruppe-modal__valgteveileder">
                    <Normaltekst className="veiledergruppe-modal__valgteveileder__tom-liste-tekst">
                        Ingen veiledere lagt til i gruppen
                    </Normaltekst>
                </div>
            );
        } else {
            return (
                <div className="veiledergruppe-modal__valgteveileder">
                    {
                        splitArrayITo.map(listeMedVeileder =>
                            <div>
                                {listeMedVeileder.map(veileder => {
                                    return (
                                        <div className="veiledergruppe-modal__valgteveileder__elem">
                                            <span>{`${veileder.etternavn}, ${veileder.fornavn}`}</span>
                                            <Flatknapp
                                                className="fjern--knapp"
                                                htmlType="button"
                                                onClick={() => props.fjernValgtVeileder(veileder.ident)}>
                                                <SlettIkon/>
                                            </Flatknapp>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                </div>
            );
        }
    };

    return (
        sjekkTomListe(veiledere));
}

export default VeilederGruppeModalLage;