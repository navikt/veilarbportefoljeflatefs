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
    btnOnClick: () => void;
}

function TildelVeileder({oversiktType, btnOnClick}: TildelVeilederProps) {
    const [ident, setIdent] = useState<string | null>(null);
    const [visAdvarselOmSletting, setVisAdvarselOmSletting] = useState<boolean>(false);
    const brukere = useSelector((state: AppState) => state.portefolje.data.brukere);
    const veiledere = useSelector((state: AppState) => state.veiledere.data.veilederListe);
    const [tilordninger2, setTilordninger] = useState<
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
        btnOnClick();
    };

    const valgteBrukere = brukere.filter(bruker => bruker.markert === true);

    const onSubmit = () => {
        if (ident) {
            const tilordninger = valgteBrukere.map(bruker => ({
                fraVeilederId: bruker.veilederId,
                tilVeilederId: ident,
                brukerFnr: bruker.fnr
            }));
            setTilordninger(
                valgteBrukere.map(bruker => ({
                    fraVeilederId: bruker.veilederId,
                    tilVeilederId: ident,
                    brukerFnr: bruker.fnr
                }))
            );

            const brukereFraNyEnhet = valgteBrukere.filter(bruker => bruker.nyForEnhet);

            setFnrArbeidslisteBlirSlettet(
                brukereFraNyEnhet.map(bruker => ({
                    brukerFnr: bruker.fnr
                }))
            );

            if (brukereFraNyEnhet.length > 0) {
                setVisAdvarselOmSletting(true);
            } else {
                doTildelTilVeileder(tilordninger, ident);
                btnOnClick();
            }
        } else {
            btnOnClick();
        }
    };

    return (
        <>
            <Modal open={visAdvarselOmSletting} onClose={lukkFjernModal}>
                <Modal.Content>
                    <div className="modal-innhold">
                        <div className="advarsel-modal">
                            <Heading size="medium" level="1">
                                Arbeidslistenotat blir slettet
                            </Heading>
                            <BodyShort size="small">
                                {`Arbeidslistenotat for følgende brukere ble opprettet på en annen enhet, og vil bli slettet ved tildeling av ny veileder:`}
                            </BodyShort>
                            <FnrList listeMedFnr={fnrArbeidslisteBlirSlettet} />
                            <BodyShort size="small">{`Ønsker du likevel å tildele veilederen?`}</BodyShort>
                        </div>
                        <div className="knapper">
                            <Button variant="secondary" className="knapp" onClick={lukkFjernModal} size="small">
                                Avbryt tildeling
                            </Button>
                            <Button
                                type={'submit'}
                                className="knapp knapp--hoved"
                                size="small"
                                onClick={() => {
                                    doTildelTilVeileder(tilordninger2, ident);
                                    lukkFjernModal();
                                }}
                            >
                                Ja, tildel veilederen
                            </Button>
                        </div>
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
