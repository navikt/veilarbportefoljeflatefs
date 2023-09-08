import * as React from 'react';
import {useState} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {tildelVeileder} from '../../../ducks/portefolje';
import {VeilederModell} from '../../../model-interfaces';
import {AppState} from '../../../reducer';
import '../../toolbar/toolbar.css';
import SokFilter from '../../sok-veiledere/sok-filter';
import classNames from 'classnames';
import {nameToStateSliceMap} from '../../../ducks/utils';
import {useSelectGjeldendeVeileder} from '../../../hooks/portefolje/use-select-gjeldende-veileder';
import {BodyShort, Button, Heading, Modal, Radio, RadioGroup} from '@navikt/ds-react';
import {useIdentSelector} from '../../../hooks/redux/use-innlogget-ident';
import {Fnr, FnrList} from '../../fnr-list';

interface TildelVeilederProps {
    oversiktType?: string;
    closeInput: () => void;
}

function TildelVeileder({oversiktType, closeInput}: TildelVeilederProps) {
    const [ident, setIdent] = useState<string | null>(null);
    const [visAdvarselOmSletting, setVisAdvarselOmSletting] = useState<boolean>(false);
    const brukere = useSelector((state: AppState) => state.portefolje.data.brukere);
    const veiledere = useSelector((state: AppState) => state.veiledere.data.veilederListe);
    const [tilordningerAlle, setTilordningerAlle] = useState<
        {fraVeilederId: string | undefined; tilVeilederId: string; brukerFnr: string}[]
    >([]);
    const [tilordningerIkkeSlettingArbeidslista, setTilordningerIkkeSlettingArbeidslista] = useState<
        {fraVeilederId: string | undefined; tilVeilederId: string; brukerFnr: string}[]
    >([]);
    const [fnrArbeidslisteBlirSlettet, setFnrArbeidslisteBlirSlettet] = useState<Fnr[]>([]);
    const dispatch = useDispatch();
    const gjeldendeVeileder = useSelectGjeldendeVeileder();
    const innloggetVeileder = useIdentSelector()?.ident;

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
        // eslint-disable-next-line
        console.log('Klikket submit');
        // eslint-disable-next-line
        console.log('Valgte brukere', valgteBrukere);
        // eslint-disable-next-line
        console.log('ident', ident);

        if (ident) {
            const alleTilordninger = valgteBrukere.map(bruker => ({
                fraVeilederId: bruker.veilederId,
                tilVeilederId: ident,
                brukerFnr: bruker.fnr
            }));

            const brukereArbeidslisteBlirIkkeSlettet = valgteBrukere.filter(
                bruker => !bruker.nyForEnhet || !bruker.arbeidsliste.arbeidslisteAktiv || bruker.veilederId === ident
            );

            const tilordningerBrukereArbeidslisteBlirIkkeSlettet = brukereArbeidslisteBlirIkkeSlettet.map(bruker => ({
                fraVeilederId: bruker.veilederId,
                tilVeilederId: ident,
                brukerFnr: bruker.fnr
            }));

            setTilordningerAlle(alleTilordninger);

            setTilordningerIkkeSlettingArbeidslista(tilordningerBrukereArbeidslisteBlirIkkeSlettet);

            const fnrBrukereArbeidslisteVilBliSlettet = valgteBrukere
                .filter(bruker => bruker.nyForEnhet && bruker.arbeidsliste.arbeidslisteAktiv)
                .filter(bruker => bruker.veilederId !== ident);

            setFnrArbeidslisteBlirSlettet(
                fnrBrukereArbeidslisteVilBliSlettet.map(bruker => ({
                    brukerFnr: bruker.fnr
                }))
            );

            const a = true;

            if (fnrBrukereArbeidslisteVilBliSlettet.length > 0 || a) {
                // eslint-disable-next-line
                console.log('Noen arbeidslister vil bli sletta', fnrBrukereArbeidslisteVilBliSlettet);
                // eslint-disable-next-line
                console.log('Alle', alleTilordninger);
                // eslint-disable-next-line
                console.log('IkkeSlettes', tilordningerBrukereArbeidslisteBlirIkkeSlettet);
                setVisAdvarselOmSletting(true);
                // eslint-disable-next-line
                console.log(visAdvarselOmSletting);
            } else {
                // eslint-disable-next-line
                console.log('Ingen arbeidslister vil bli sletta, tilordAlle', alleTilordninger);
                // eslint-disable-next-line
                console.log(
                    'Ingen arbeidslister vil bli sletta, tilordnIkkeSl',
                    tilordningerBrukereArbeidslisteBlirIkkeSlettet
                );
                doTildelTilVeileder(alleTilordninger, ident);
                closeInput();
            }
        } else {
            // eslint-disable-next-line
            console.log('closeInput()');
            closeInput();
        }
    };

    return (
        <>
            <Modal open={visAdvarselOmSletting} onClose={lukkFjernModal} className="advarsel-sletting-arbeidslista">
                <Modal.Content>
                    <div className="advarsel-modal">
                        <Heading size="large" level="2">
                            Arbeidslistenotat blir slettet
                        </Heading>
                        <BodyShort size="medium">
                            {`Arbeidslistenotat for følgende brukere ble opprettet på en annen enhet, og vil bli slettet ved tildeling av ny veileder:`}
                        </BodyShort>
                        <FnrList listeMedFnr={fnrArbeidslisteBlirSlettet} />
                        <BodyShort
                            size="medium"
                            className="sporsmal-likevel-tidele"
                        >{`Ønsker du likevel å tildele veilederen til disse brukerne?`}</BodyShort>
                    </div>
                    <div className="sletting-arbeidslista-knapp-wrapper">
                        <Button
                            variant="tertiary"
                            className="knapp-avbryt-tildeling"
                            onClick={() => {
                                // eslint-disable-next-line
                                console.log('Klikket avbryt, tilordnIkkeSl', tilordningerIkkeSlettingArbeidslista);
                                doTildelTilVeileder(tilordningerIkkeSlettingArbeidslista, ident);
                                lukkFjernModal();
                            }}
                            size="medium"
                        >
                            Avbryt tildeling for de aktuelle brukerne
                        </Button>
                        <Button
                            type={'submit'}
                            className="knapp"
                            size="medium"
                            onClick={() => {
                                // eslint-disable-next-line
                                console.log('Klikket bekreft, tilordnAlle', tilordningerAlle);
                                doTildelTilVeileder(tilordningerAlle, ident);
                                lukkFjernModal();
                            }}
                        >
                            Ja, tildel veilederen
                        </Button>
                    </div>
                </Modal.Content>
            </Modal>

            <SokFilter placeholder="Tildel veileder" data={sorterVeiledere}>
                {data => (
                    <TildelVeilederRenderer
                        ident={ident}
                        onChange={setIdent}
                        data={data}
                        btnOnClick={() => onSubmit()}
                        oversiktType={oversiktType}
                    />
                )}
            </SokFilter>
        </>
    );
}

interface TildelVeilederRendererProps {
    data: VeilederModell[];
    ident: string | null;
    onChange: (ident: string) => void;
    btnOnClick: () => void;
    oversiktType: string | undefined;
}

function TildelVeilederRenderer({data, ident, onChange, btnOnClick}: TildelVeilederRendererProps) {
    return (
        <form className="skjema radio-filterform" data-testid="tildel-veileder_dropdown">
            <RadioGroup hideLegend legend="" className="radio-filterform__valg" onChange={onChange}>
                {data.map((veileder, index) => (
                    <Radio
                        data-testid={`tildel-veileder_valg_${index}`}
                        type={'button'}
                        key={veileder.ident}
                        name="veileder"
                        size="small"
                        value={veileder.ident}
                        className={'navds-radio'}
                    >{`${veileder.etternavn}, ${veileder.fornavn}`}</Radio>
                ))}
            </RadioGroup>
            <div className="filterform__under-valg">
                <Button
                    size="small"
                    onClick={btnOnClick}
                    className={classNames('knapp', 'knapp--mini', {
                        'knapp--hoved': ident
                    })}
                    type={'button'}
                    data-testid={ident ? 'tildel-veileder_velg-knapp' : 'tildel-veileder_lukk-knapp'}
                >
                    {ident ? 'Velg' : 'Lukk'}
                </Button>
            </div>
        </form>
    );
}

const mapStateToProps = (state, ownProps) => {
    const stateSlice = nameToStateSliceMap[ownProps.oversiktType];
    return {
        filtervalg: state[stateSlice]
    };
};

export default connect(mapStateToProps)(TildelVeileder);
