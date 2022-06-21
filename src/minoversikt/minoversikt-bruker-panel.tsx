import * as React from 'react';
import {MouseEvent, useState} from 'react';
import classNames from 'classnames';
import ArbeidslisteButton from '../components/tabell/arbeidslistebutton';
import ArbeidslistekategoriVisning from '../components/tabell/arbeidslisteikon';
import Etiketter from '../components/tabell/etiketter';
import {BrukerModell, FiltervalgModell, VeilederModell} from '../model-interfaces';
import MinOversiktKolonner from './minoversikt-kolonner';
import ArbeidslistePanel from './minoversikt-arbeidslistepanel';
import {Kolonne} from '../ducks/ui/listevisning';
import {useLayoutEffect} from 'react';
import {OrNothing} from '../utils/types/types';
import './minoversikt.less';
import {useFeatureSelector} from '../hooks/redux/use-feature-selector';
import {VEDTAKSTOTTE} from '../konstanter';
import {logEvent} from '../utils/frontend-logger';
import {Collapse} from 'react-collapse';
import {Tag} from '@navikt/ds-react';
import {Checkbox} from 'nav-frontend-skjema';

interface MinOversiktBrukerPanelProps {
    bruker: BrukerModell;
    settMarkert: (fnr: string, markert: boolean) => void;
    enhetId: string;
    filtervalg: FiltervalgModell;
    innloggetVeileder: OrNothing<VeilederModell>;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    valgteKolonner: Kolonne[];
    varForrigeBruker?: boolean;
    hentArbeidslisteForBruker: (fnr: string) => void;
}

function MinoversiktBrukerPanel(props: MinOversiktBrukerPanelProps) {
    const [apen, setOpen] = useState<boolean>(false);
    const erVedtaksStotteFeatureTogglePa = useFeatureSelector()(VEDTAKSTOTTE);
    const scrollToLastPos = () => {
        const xPos = parseInt(localStorage.getItem('xPos') || '0');
        const yPos = parseInt(localStorage.getItem('yPos') || '0');
        window.scrollTo(xPos, yPos);
    };

    useLayoutEffect(() => {
        if (props.varForrigeBruker) {
            scrollToLastPos();
        }
    }, [props.varForrigeBruker]);

    const {
        bruker,
        enhetId,
        filtervalg,
        valgteKolonner,
        innloggetVeileder,
        settMarkert,
        varForrigeBruker,
        hentArbeidslisteForBruker
    } = props;
    const arbeidslisteAktiv = bruker.arbeidsliste?.arbeidslisteAktiv;
    const testIdArbeidslisteAktiv = arbeidslisteAktiv ? `_arbeidsliste` : '';
    const testIdArbeidslisteKategori = arbeidslisteAktiv ? `-${bruker.arbeidsliste.kategori}` : '';
    const testIdDisabled = bruker.fnr === '' ? '_disabled' : '';

    function handleArbeidslisteButtonClick(event) {
        event.preventDefault();
        setOpen(!apen);
        logEvent('portefolje.metrikker.ekspander-arbeidsliste', {apen: !apen});
        if (props.onClick) {
            props.onClick(event);
        }
    }

    return (
        <li
            className={classNames(
                {
                    'brukerliste--forrigeBruker': varForrigeBruker
                },
                'brukerliste_element'
            )}
            data-testid={`brukerliste_element${testIdArbeidslisteAktiv}${testIdArbeidslisteKategori}${testIdDisabled}`}
            data-cy={`brukerliste_element${testIdArbeidslisteAktiv}`}
        >
            <div className="brukerliste__element">
                <div className="brukerliste__gutter-left brukerliste--min-width-minside">
                    <Checkbox
                        checked={bruker.markert}
                        disabled={bruker.fnr === ''}
                        onChange={() => settMarkert(bruker.fnr, !bruker.markert)}
                        label=""
                        role="checkbox"
                        className="brukerliste__checkbox"
                        data-testid={`min-oversikt_brukerliste-checkbox${testIdArbeidslisteAktiv}${testIdDisabled}`}
                    />
                    <ArbeidslistekategoriVisning
                        skalVises={arbeidslisteAktiv}
                        kategori={bruker.arbeidsliste?.kategori}
                        dataTestid={`brukerliste-arbeidslisteikon_${bruker.arbeidsliste?.kategori}`}
                    />
                </div>
                <MinOversiktKolonner
                    className="brukerliste__innhold flex flex--center"
                    bruker={bruker}
                    enhetId={enhetId}
                    filtervalg={filtervalg}
                    valgteKolonner={valgteKolonner}
                />
                <div className="brukerliste__gutter-right">
                    <div className="brukerliste__etiketter">
                        <Etiketter bruker={bruker} erVedtakStotteFeatureTogglePa={erVedtaksStotteFeatureTogglePa} />
                        {bruker.nyForVeileder && (
                            <Tag variant="info" size="small">
                                Ny bruker
                            </Tag>
                        )}
                    </div>
                    <ArbeidslisteButton
                        skalVises={arbeidslisteAktiv}
                        apen={apen}
                        onClick={e => {
                            handleArbeidslisteButtonClick(e);
                            if (!bruker.arbeidsliste.hentetKommentarOgTittel) {
                                hentArbeidslisteForBruker(bruker.fnr);
                            }
                        }}
                        dataTestid={`min-oversikt_brukerliste-chevron${testIdArbeidslisteAktiv}${testIdDisabled}`}
                    />
                </div>
            </div>
            <Collapse isOpened={apen}>
                <ArbeidslistePanel
                    skalVises={arbeidslisteAktiv}
                    bruker={bruker}
                    innloggetVeileder={innloggetVeileder && innloggetVeileder.ident}
                    settMarkert={() => settMarkert(bruker.fnr, !bruker.markert)}
                    apen={apen}
                />
            </Collapse>
        </li>
    );
}

export default MinoversiktBrukerPanel;
