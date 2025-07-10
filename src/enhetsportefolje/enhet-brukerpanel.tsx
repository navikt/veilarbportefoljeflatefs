import {useLayoutEffect} from 'react';
import {useDispatch} from 'react-redux';
import classNames from 'classnames';
import {Checkbox} from '@navikt/ds-react';
import {Etiketter} from '../components/tabell/etiketter';
import {BrukerModell} from '../typer/bruker-modell';
import {FiltervalgModell} from '../typer/filtervalg-modell';
import {Kolonne} from '../ducks/ui/listevisning';
import {EnhetKolonner} from './enhet-kolonner';
import {OrNothing} from '../utils/types/types';
import {nullstillBrukerfeil} from '../ducks/brukerfeilmelding';
import './enhetsportefolje.css';
import './brukerliste.css';

interface EnhetBrukerpanelProps {
    bruker: BrukerModell;
    settMarkert: (bruker: string, markert: boolean) => void;
    enhetId: string;
    filtervalg: FiltervalgModell;
    valgteKolonner: Kolonne[];
    forrigeBruker: OrNothing<string>;
}

export function EnhetBrukerpanel({
    bruker,
    settMarkert,
    enhetId,
    filtervalg,
    valgteKolonner,
    forrigeBruker
}: EnhetBrukerpanelProps) {
    const varForrigeBruker = bruker.fnr === forrigeBruker;
    const dispatch = useDispatch();

    const scrollToLastPos = () => {
        const xPos = parseInt(localStorage.getItem('xScrollPos') ?? '0');
        const yPos = parseInt(localStorage.getItem('yScrollPos') ?? '0');
        window.scrollTo(xPos, yPos);
    };

    useLayoutEffect(() => {
        if (varForrigeBruker) {
            scrollToLastPos();
        }
    }, [varForrigeBruker]);

    const classname = classNames('brukerliste__element', 'brukerliste_rad', {
        'brukerliste--forrigeBruker': varForrigeBruker
    });

    return (
        <li className={classname}>
            <Checkbox
                checked={bruker.markert}
                className="brukerliste__checkbox"
                disabled={bruker.fnr === ''}
                hideLabel
                onChange={() => {
                    settMarkert(bruker.fnr, !bruker.markert);
                    dispatch(nullstillBrukerfeil());
                }}
                size="small"
            >
                Velg bruker {bruker.etternavn}, {bruker.fornavn}
            </Checkbox>
            <EnhetKolonner
                className="brukerliste__innhold flex flex--center"
                bruker={bruker}
                enhetId={enhetId}
                filtervalg={filtervalg}
                valgteKolonner={valgteKolonner}
            />
            <div className="brukerliste__gutter-right">
                <div className="brukerliste__etiketter">
                    <Etiketter bruker={bruker} />
                </div>
            </div>
        </li>
    );
}
