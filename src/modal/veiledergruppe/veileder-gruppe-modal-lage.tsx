import ModalWrapper, { ModalProps } from 'nav-frontend-modal';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import React, { useEffect, useState } from 'react';
import { FiltervalgModell } from '../../model-interfaces';
import { Input } from 'nav-frontend-skjema';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../reducer';
import { ReactComponent as FjernIkon } from './fjern-sirkel-ikon.svg';
import { LagretFilter } from '../../ducks/lagret-filter';
import { initialState } from '../../ducks/filtrering';
import SokVeiledere from '../../components/sok-veiledere/sok-veiledere';
import SletteVeiledergruppeModal from '../../modal/veiledergruppe/slett-gruppe-modal';
import EndringerIkkeLagretModal from './ulagrede-endringer-modal';
import hiddenIf from '../../components/hidden-if/hidden-if';
import { visLagreEndringerToast } from '../../store/toast/actions';

interface VeilederGruppeModalProps {
    lagretFilter?: LagretFilter;
}

const HiddenIfFlatknapp = hiddenIf(Flatknapp);

function VeilederGruppeModalLage(props: VeilederGruppeModalProps & Omit<ModalProps, 'contentLabel' | 'children'>) {

    const [filterValg, setFilterValg] = useState<FiltervalgModell>(initialState);
    const [gruppeNavn, setGruppeNavn] = useState<string>('');

    const [visSletteVeiledergruppeModal, setSletteVeiledergruppeModal] = useState(false);
    const [visEndringerIkkeLagretModal, setEndringerIkkeLagretModal] = useState(false);

    const fjernVeiledereFraListen = (prevState: FiltervalgModell, veilederTarget: string) => prevState.veiledere
        ? {...prevState, veiledere: prevState.veiledere.filter(v => v !== veilederTarget)}
        : {...prevState, veiledere: []};

    const hanterChange = (event) => {
        const veilederTarget = event.target.value;
        event.target.checked
            ? setFilterValg(prevState => {
                if (prevState.veiledere) {
                    return ({...prevState, veiledere: [...prevState.veiledere, veilederTarget]});
                } else {
                    return ({...prevState, veiledere: [veilederTarget]});
                }
            })
            : setFilterValg(prevState => fjernVeiledereFraListen(prevState, veilederTarget));
    };

    useEffect(() => {
        setFilterValg(props.lagretFilter ? props.lagretFilter.filterValg : initialState);
        setGruppeNavn(props.lagretFilter ? props.lagretFilter.filterNavn : '');
    }, [props.lagretFilter]);

    const modalTittel = props.lagretFilter ? 'Rediger veiledergruppe' : 'Ny veiledergruppe';

    const harGjortEndringer = () => {
        const redigertListe = filterValg.veiledere;
        const initialstateNyListe = props.lagretFilter;
        let initialstateListe;
        // @ts-ignore
        initialstateNyListe === undefined ? initialstateListe = [] : initialstateListe = props.lagretFilter.filterValg.veiledere;

        //rediger gruppe
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

        //ny gruppe
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

    const dispatch = useDispatch();

    const lagreModal = () => {
        if (harGjortEndringer()) {
            //lagre endringer og send toast hvis det gikk bra
            dispatch(visLagreEndringerToast());
            props.lagretFilter ? setFilterValg(props.lagretFilter.filterValg) : setFilterValg(initialState);
        } else {
            //ikke lagre endringer og send feilmodal
            console.log('her skjedde det noe rart');
        }
        props.onRequestClose();
    };

    function slettVeiledergruppeOgLukkModaler() {
        //hva som skjer når man trykker på bekreft på ekstramodalen etter slett gruppe
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

    const slettModal = () => {
        setSletteVeiledergruppeModal(true);
    };

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
                    />
                    <div className="veiledergruppe-modal__sokefilter">
                        <SokVeiledere
                            erValgt={(ident) => filterValg.veiledere ? filterValg.veiledere.includes(ident) : false}
                            hanterChange={event => hanterChange(event)}
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
                                                <FjernIkon/>
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
