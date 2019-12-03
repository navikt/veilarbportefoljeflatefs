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
import SletteVeiledergruppeModal from './slett-gruppe-modal';
import EndringerIkkeLagretModal from './ulagrede-endringer-modal';
import hiddenIf from '../../hidden-if/hidden-if';
import { visLagreEndringerToast } from '../../../store/toast/actions';
import { useEnhetIdSelector } from '../../../hooks/redux/use-enhetid-selector';

interface VeilederGruppeModalProps {
    lagretFilter?: LagretFilter;
}

const HiddenIfFlatknapp = hiddenIf(Flatknapp);

function VeilederGruppeModalLage(props: VeilederGruppeModalProps & Omit<ModalProps, 'contentLabel' | 'children'>) {

    const [filterValg, setFilterValg] = useState<FiltervalgModell>(initialState);
    const [gruppeNavn, setGruppeNavn] = useState<string>('');

    const [visSletteVeiledergruppeModal, setSletteVeiledergruppeModal] = useState(false);
    const [visEndringerIkkeLagretModal, setEndringerIkkeLagretModal] = useState(false);

    const enhetId = useEnhetIdSelector();

    const fjernVeiledereFraListen = (prevState: FiltervalgModell, veilederTarget: string) => prevState.veiledere
        ? {...prevState, veiledere: prevState.veiledere.filter(v => v !== veilederTarget)}
        : {...prevState, veiledere: []};

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

    // const sjekkBruktGruppenavn = () => {
    //     if (props.lagretFilter) {
    //         console.log('lagretFilter:', props.lagretFilter);
    //         return gruppeNavn === props.lagretFilter.filterNavn;
    //     }
    // };
    //
    // const validerGruppenavn = () => {
    //     return (gruppeNavn === '' || sjekkBruktGruppenavn());
    // };

    const lagreModal = () => {
        if (harGjortEndringer()) {
            if (props.lagretFilter) {
                //hvis det mangler gruppenavn eller gruppenavnet som er skrevet inn finnes fra før, ikke lagre
                //hvis det mangler brukere i gruppen, ikke lagre
                const endringer: RedigerGruppe = {
                    filterNavn: gruppeNavn,
                    filterValg,
                    filterId: props.lagretFilter.filterId,
                };
                dispatch(lagreEndringer(endringer,enhetId));
            } else {
                const endringer: NyGruppe = {filterNavn: gruppeNavn, filterValg};
                dispatch(lageNyGruppe(endringer, enhetId));
            }

            dispatch(visLagreEndringerToast());
            props.lagretFilter ? setFilterValg(props.lagretFilter.filterValg) : setFilterValg(initialState);
        } else {
            //ikke lagre endringer og send feilmodal
            // validerGruppenavn();
            console.log('her skjedde det noe rart');
        }
        props.onRequestClose();
    };

    const slettModal = () => {
        setSletteVeiledergruppeModal(true);
    };

    function slettVeiledergruppeOgLukkModaler() {
        props.lagretFilter && dispatch(slettGruppe(enhetId, props.lagretFilter.filterId));
        setSletteVeiledergruppeModal(false);
        props.onRequestClose();
        props.lagretFilter ? setFilterValg(props.lagretFilter.filterValg) : setFilterValg(initialState);
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
                    <Input
                        label="Gruppenavn:"
                        value={gruppeNavn}
                        bredde="L"
                        onChange={e => setGruppeNavn(e.target.value)}
                        // feil={validerGruppenavn() ? {feilmelding: 'Feltet kan ikke være tomt'} : undefined}
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
                    <Hovedknapp className="veiledergruppe-modal__knappegruppe__lagre"
                                htmlType="submit"
                                onClick={lagreModal}
                    >
                        Lagre endringene
                    </Hovedknapp>
                    <Flatknapp className="veiledergruppe-modal__knappegruppe__avbryt"
                               onClick={lukkModal}>
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
