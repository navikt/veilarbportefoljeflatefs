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
import {
    harArbeidslisteSomVilBliSlettetFilter,
    harFargekategoriSomVilBliSlettetFilter,
    harHuskelappSomVilBliSlettetFilter,
    ingentingHosBrukerVilBliSlettet
} from './tildel-veileder-utils';
import {useFeatureSelector} from '../../../hooks/redux/use-feature-selector';
import {SKJUL_ARBEIDSLISTEFUNKSJONALITET} from '../../../konstanter';

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
    const [tilordningerAlleBrukere, setTilordningerAlleBrukere] = useState<Tilordning[]>([]);
    const [tilordningerBrukereUtenTingSomVilBliSlettet, setTilordningerBrukereUtenTingSomVilBliSlettet] = useState<
        Tilordning[]
    >([]);

    const dispatch = useDispatch();
    const gjeldendeVeileder = useSelectGjeldendeVeileder();
    const innloggetVeileder = useIdentSelector()?.ident;
    const enhet = useEnhetSelector();
    const brukere = useSelector((state: AppState) => state.portefolje.data.brukere);
    const veiledere = useSelector((state: AppState) => state.veiledere.data.veilederListe);

    const arbeidslistefunksjonalitetSkalVises = !useFeatureSelector()(SKJUL_ARBEIDSLISTEFUNKSJONALITET);

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
            setTilordningerAlleBrukere(alleTilordninger);

            const brukereUtenTingSomVilBliSlettet = valgteBrukere.filter(bruker =>
                ingentingHosBrukerVilBliSlettet({
                    tilVeileder: ident,
                    fraVeileder: bruker.veilederId,
                    tilEnhet: enhet,
                    arbeidslisteAktiv: bruker.arbeidsliste.arbeidslisteAktiv,
                    navkontorForArbeidsliste: bruker.arbeidsliste.navkontorForArbeidsliste,
                    huskelapp: bruker.huskelapp,
                    fargekategori: bruker.fargekategori,
                    fargekategoriEnhetId: bruker.fargekategoriEnhetId
                })
            );

            const tilordningerBrukereUtenTingSomVilBliSlettet = brukereUtenTingSomVilBliSlettet.map(bruker => ({
                fraVeilederId: bruker.veilederId,
                tilVeilederId: ident,
                brukerFnr: bruker.fnr
            }));
            setTilordningerBrukereUtenTingSomVilBliSlettet(tilordningerBrukereUtenTingSomVilBliSlettet);

            const brukereDerArbeidslisteVilBliSlettet = valgteBrukere.filter(bruker =>
                harArbeidslisteSomVilBliSlettetFilter({
                    tilVeileder: ident,
                    fraVeileder: bruker.veilederId,
                    tilEnhet: enhet,
                    arbeidslisteAktiv: bruker.arbeidsliste.arbeidslisteAktiv,
                    navkontorForArbeidsliste: bruker.arbeidsliste.navkontorForArbeidsliste
                })
            );

            const brukereDerHuskelappVilBliSlettet = valgteBrukere.filter(bruker =>
                harHuskelappSomVilBliSlettetFilter({
                    tilVeileder: ident,
                    fraVeileder: bruker.veilederId,
                    tilEnhet: enhet,
                    huskelapp: bruker.huskelapp
                })
            );

            const brukereDerFargekategoriVilBliSlettet = valgteBrukere.filter(bruker =>
                harFargekategoriSomVilBliSlettetFilter({
                    tilVeileder: ident,
                    fraVeileder: bruker.veilederId,
                    tilEnhet: enhet,
                    fargekategori: bruker.fargekategori,
                    fargekategoriEnhetId: bruker.fargekategoriEnhetId
                })
            );

            const brukereMedTingSomVilBliSlettetVedTildeling = [
                ...brukereDerHuskelappVilBliSlettet,
                ...brukereDerArbeidslisteVilBliSlettet,
                ...brukereDerFargekategoriVilBliSlettet
            ];
            setFnrIAdvarselslista(fjernduplikatOgMapTilFnrArray(brukereMedTingSomVilBliSlettetVedTildeling));

            if (brukereMedTingSomVilBliSlettetVedTildeling.length > 0) {
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

    const tildelVeiledereForBrukereDerIngentingBlirSlettet = () => {
        if (tilordningerBrukereUtenTingSomVilBliSlettet.length > 0) {
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
            doTildelTilVeileder(tilordningerBrukereUtenTingSomVilBliSlettet, ident);
        }
        lukkFjernModal();
    };

    const tildelVeilederForAlleValgteBrukere = () => {
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
        doTildelTilVeileder(tilordningerAlleBrukere, ident);
        lukkFjernModal();
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
                        {arbeidslistefunksjonalitetSkalVises ? (
                            <BodyShort size="medium">
                                Arbeidslistenotat, huskelapp og/eller kategori for følgende brukere ble opprettet på en
                                annen enhet, og vil bli slettet ved tildeling av ny veileder:
                            </BodyShort>
                        ) : (
                            <BodyShort size="medium">
                                Huskelapp og/eller kategori for følgende brukere ble opprettet på en annen enhet, og vil
                                bli slettet ved tildeling av ny veileder:
                            </BodyShort>
                        )}
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
                            onClick={tildelVeiledereForBrukereDerIngentingBlirSlettet}
                        >
                            Avbryt tildeling for nevnte bruker(e)
                        </Button>
                        <Button
                            type={'submit'}
                            className="knapp"
                            size="medium"
                            onClick={tildelVeilederForAlleValgteBrukere}
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
