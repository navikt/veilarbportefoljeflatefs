import React, {useState} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {BodyShort, Button, Heading, Modal} from '@navikt/ds-react';
import {tildelVeileder} from '../../../ducks/portefolje';
import {BrukerModell} from '../../../model-interfaces';
import {AppState} from '../../../reducer';
import SokFilter from '../../sok-veiledere/sok-filter';
import {nameToStateSliceMap} from '../../../ducks/utils';
import {useSelectGjeldendeVeileder} from '../../../hooks/portefolje/use-select-gjeldende-veileder';
import {useIdentSelector} from '../../../hooks/redux/use-innlogget-ident';
import {Fnr, FnrList} from '../../fnr-list';
import {useEnhetSelector} from '../../../hooks/redux/use-enhet-selector';
import {trackAmplitude} from '../../../amplitude/amplitude';
import {OversiktType} from '../../../ducks/ui/listevisning';
import {TildelVeilederRenderer} from './tildel-veileder-renderer';
import '../../toolbar/toolbar.css';

const fjernduplikatOgMapTilFnrArray = (brukereSomTildeles: BrukerModell[]) =>
    brukereSomTildeles.reduce((arrayUtenDuplikater: Fnr[], bruker: BrukerModell) => {
        if (arrayUtenDuplikater.some(brukerForDuplikatsjekk => brukerForDuplikatsjekk.brukerFnr === bruker.fnr)) {
            return arrayUtenDuplikater;
        }
        arrayUtenDuplikater.push({
            brukerFnr: bruker.fnr
        });
        return arrayUtenDuplikater;
    }, []);

interface Tilordning {
    fraVeilederId: string | undefined;
    tilVeilederId: string;
    brukerFnr: string;
}

interface TildelVeilederProps {
    oversiktType?: OversiktType;
    closeInput: () => void;
}

function TildelVeileder({oversiktType, closeInput}: TildelVeilederProps) {
    const [ident, setIdent] = useState<string | null>(null);
    const [visAdvarselOmSletting, setVisAdvarselOmSletting] = useState<boolean>(false);
    const [fnrIAdvarselslista, setFnrIAdvarselslista] = useState<Fnr[]>([]);
    const [tilordningerAlle, setTilordningerAlle] = useState<Tilordning[]>([]);
    const [tilordningerBrukereBlirIkkeSlettet, setTilordningerBrukereBlirIkkeSlettet] = useState<Tilordning[]>([]);

    const dispatch = useDispatch();
    const gjeldendeVeileder = useSelectGjeldendeVeileder();
    const innloggetVeileder = useIdentSelector()?.ident;
    const enhet = useEnhetSelector();
    const brukere = useSelector((state: AppState) => state.portefolje.data.brukere);
    const veiledere = useSelector((state: AppState) => state.veiledere.data.veilederListe);

    const sorterVeiledere = veiledere.sort((a, b) => {
        if (a.ident === b.ident) return 0;
        if (a.ident === innloggetVeileder) return -1;
        if (b.ident === innloggetVeileder) return 1;
        return a.etternavn.localeCompare(b.etternavn);
    });

    const doTildelTilVeileder = (tilordninger, tilVeileder) => {
        return dispatch(tildelVeileder(tilordninger, tilVeileder, oversiktType, gjeldendeVeileder));
    };

    const lukkFjernModal = () => {
        setVisAdvarselOmSletting(false);
        closeInput();
    };

    const valgteBrukere = brukere.filter(bruker => bruker.markert === true);

    const onSubmit = () => {
        if (ident) {
            const alleTilordninger = valgteBrukere.map(bruker => ({
                fraVeilederId: bruker.veilederId,
                tilVeilederId: ident,
                brukerFnr: bruker.fnr
            }));

            const brukereVilIkkeBliSlettet = valgteBrukere.filter(
                bruker =>
                    bruker.veilederId === ident ||
                    ((!bruker.arbeidsliste.arbeidslisteAktiv ||
                        bruker.arbeidsliste.navkontorForArbeidsliste === enhet) &&
                        (!bruker.huskelapp || bruker.huskelapp?.enhetId === enhet) &&
                        (!bruker.fargekategori || bruker.fargekategoriEnhetId === enhet))
            );

            const tilordningerBrukereBlirIkkeSlettet = brukereVilIkkeBliSlettet.map(bruker => ({
                fraVeilederId: bruker.veilederId,
                tilVeilederId: ident,
                brukerFnr: bruker.fnr
            }));

            setTilordningerAlle(alleTilordninger);

            setTilordningerBrukereBlirIkkeSlettet(tilordningerBrukereBlirIkkeSlettet);

            const fnrBrukereArbeidslisteVilBliSlettet = valgteBrukere.filter(
                bruker =>
                    // har arbeidsliste å slette
                    bruker.arbeidsliste.arbeidslisteAktiv &&
                    // endring av veileder eller ingen veileder frå før
                    (bruker.veilederId !== ident || bruker.veilederId === null) &&
                    // har kontor for arbeidslista
                    bruker.arbeidsliste.navkontorForArbeidsliste !== null &&
                    // endring i kontor frå det i arbeidslista
                    bruker.arbeidsliste.navkontorForArbeidsliste !== enhet
            );

            const fnrBrukereHuskelappVilBliSlettet = valgteBrukere.filter(
                bruker =>
                    !!bruker.huskelapp &&
                    (bruker.veilederId !== ident || bruker.veilederId === null) &&
                    bruker.huskelapp.enhetId !== null &&
                    bruker.huskelapp.enhetId !== enhet
            );

            const fnrBrukereKategoriVilBliSlettet = valgteBrukere.filter(
                bruker =>
                    bruker.fargekategori &&
                    (bruker.veilederId !== ident || bruker.veilederId === null) &&
                    bruker.fargekategoriEnhetId !== null &&
                    bruker.fargekategoriEnhetId !== enhet
            );

            const fnrBrukereArbeidslisteHuskelappEllerFargekategoriVilBliSlettet = [
                ...fnrBrukereHuskelappVilBliSlettet,
                ...fnrBrukereArbeidslisteVilBliSlettet,
                ...fnrBrukereKategoriVilBliSlettet
            ];

            setFnrIAdvarselslista(
                fjernduplikatOgMapTilFnrArray(fnrBrukereArbeidslisteHuskelappEllerFargekategoriVilBliSlettet)
            );

            if (fnrBrukereArbeidslisteHuskelappEllerFargekategoriVilBliSlettet.length > 0) {
                trackAmplitude(
                    {name: 'modal åpnet', data: {tekst: 'Fikk advarsel om sletting av arbeidsliste'}},
                    {modalId: 'veilarbportefoljeflatefs-advarselOmSlettingAvArbeidsliste'}
                );
                setVisAdvarselOmSletting(true);
            } else {
                doTildelTilVeileder(alleTilordninger, ident);
                closeInput();
            }
        } else {
            closeInput();
        }
    };

    return (
        <>
            <Modal
                open={visAdvarselOmSletting}
                onClose={lukkFjernModal}
                closeOnBackdropClick={true}
                className="advarsel-sletting-arbeidslista"
            >
                <Modal.Header>
                    <Heading size="medium" level="2">
                        Arbeidslistenotat, huskelapp og/eller kategori blir slettet
                    </Heading>
                </Modal.Header>
                <Modal.Body>
                    <div className="advarsel-modal">
                        <BodyShort size="medium">
                            Arbeidslistenotat, huskelapp og/eller kategori for følgende brukere ble opprettet på en
                            annen enhet, og vil bli slettet ved tildeling av ny veileder:
                        </BodyShort>
                        <FnrList listeMedFnr={fnrIAdvarselslista} />
                        <BodyShort size="medium" className="sporsmal-likevel-tidele">
                            Ønsker du likevel å tildele veilederen?
                        </BodyShort>
                    </div>
                    <div className="sletting-arbeidslista-knapp-wrapper">
                        <Button
                            variant="tertiary"
                            className="knapp-avbryt-tildeling"
                            size="medium"
                            onClick={() => {
                                if (tilordningerBrukereBlirIkkeSlettet.length > 0) {
                                    trackAmplitude(
                                        {
                                            name: 'knapp klikket',
                                            data: {
                                                knapptekst: 'Avbryt tildeling for de aktuelle brukerne',
                                                effekt: 'Avbryter tildeling'
                                            }
                                        },
                                        {modalId: 'veilarbportefoljeflatefs-advarselOmSlettingAvArbeidsliste'}
                                    );
                                    doTildelTilVeileder(tilordningerBrukereBlirIkkeSlettet, ident);
                                }
                                lukkFjernModal();
                            }}
                        >
                            Avbryt tildeling for nevnte bruker(e)
                        </Button>
                        <Button
                            type={'submit'}
                            className="knapp"
                            size="medium"
                            onClick={() => {
                                trackAmplitude(
                                    {
                                        name: 'knapp klikket',
                                        data: {
                                            knapptekst: 'Ja, tildel veilederen',
                                            effekt: 'Fortsetter tildeling'
                                        }
                                    },
                                    {modalId: 'veilarbportefoljeflatefs-advarselOmSlettingAvArbeidsliste'}
                                );
                                doTildelTilVeileder(tilordningerAlle, ident);
                                lukkFjernModal();
                            }}
                        >
                            Ja, tildel veilederen
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            <SokFilter placeholder="Tildel veileder" data={sorterVeiledere}>
                {data => (
                    <TildelVeilederRenderer
                        ident={ident}
                        onChange={setIdent}
                        data={data}
                        btnOnClick={() => onSubmit()}
                    />
                )}
            </SokFilter>
        </>
    );
}

const mapStateToProps = (state, ownProps) => {
    const stateSlice = nameToStateSliceMap[ownProps.oversiktType];
    return {
        filtervalg: state[stateSlice]
    };
};

export default connect(mapStateToProps)(TildelVeileder);
