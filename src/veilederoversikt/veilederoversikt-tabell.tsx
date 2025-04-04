import classNames from 'classnames';
import {Button} from '@navikt/ds-react';
import {ArrowDownIcon, ArrowUpIcon} from '@navikt/aksel-icons';
import {VeilederoversiktTabellrad} from './veilederoversikt-tabellrad';
import './veilederoversikt.css';

interface VeiledereTabellProps {
    veiledere: any;
    currentSortering: {
        property: string;
        direction: string;
    };

    sorterPaaEtternavn: () => void;
    sorterPaaPortefoljestorrelse: () => void;
}

export function VeilederoversiktTabell({
    veiledere,
    currentSortering,
    sorterPaaEtternavn,
    sorterPaaPortefoljestorrelse
}: VeiledereTabellProps) {
    const sorterEtternavn = currentSortering.property === 'etternavn';
    const sorterPaaPortefoljeStr = currentSortering.property === 'portefoljestorrelse';

    const sorteringspil = sorterPaa => {
        const className = 'tabellheader__pil';
        if (sorterPaa) {
            if (currentSortering.direction === 'stigende') {
                return (
                    <ArrowUpIcon title="Sortert stigende" className={className} data-testid="sorteringspil_stigende" />
                );
            } else if (currentSortering.direction === 'synkende') {
                return (
                    <ArrowDownIcon
                        title="Sortert synkende"
                        className={className}
                        data-testid="sorteringspil_synkende"
                    />
                );
            }
        }
        return null;
    };

    return (
        <div className="veilederoversikt__toolbar-container">
            <span className="veilederoversikt__sticky-skygge">
                <table className="veileder-tabell">
                    <thead>
                        <tr>
                            <th scope="col" className="tabellheader">
                                <div className="tabellheader__lenke tabellheader__tekst">
                                    <Button
                                        size="xsmall"
                                        variant="tertiary"
                                        onClick={sorterPaaEtternavn}
                                        className={classNames('lenke lenke--frittstaende', {
                                            'valgt-sortering': sorterEtternavn
                                        })}
                                        aria-pressed={sorterEtternavn}
                                        aria-label={
                                            sorterEtternavn
                                                ? `Etternavn, ${currentSortering.direction} rekkefølge`
                                                : 'Etternavn, ingen sortering'
                                        }
                                    >
                                        Etternavn
                                    </Button>
                                    , Fornavn
                                    {sorteringspil(sorterEtternavn)}
                                </div>
                            </th>
                            <th scope="col" className="tabellheader__tekst">
                                Nav-ident
                            </th>
                            <th className="tabellheader tabell-element-center" scope="col">
                                <div
                                    className="tabellheader__lenke"
                                    data-testid="veilederoversikt_sortering_antall-brukere"
                                >
                                    <Button
                                        size="xsmall"
                                        variant="tertiary"
                                        onClick={sorterPaaPortefoljestorrelse}
                                        className={classNames('lenke lenke--frittstaende tabellheader__tekst', {
                                            'valgt-sortering': sorterPaaPortefoljeStr
                                        })}
                                        aria-pressed={sorterPaaPortefoljeStr}
                                        aria-label={
                                            sorterPaaPortefoljeStr
                                                ? `Antall brukere, ${currentSortering.direction} rekkefølge`
                                                : 'Antall brukere, ingen sortering'
                                        }
                                    >
                                        Antall brukere
                                    </Button>
                                    {sorteringspil(sorterPaaPortefoljeStr)}
                                </div>
                            </th>
                            <th />
                        </tr>
                    </thead>
                    <tbody data-testid="veilederoversikt_veilederliste_tbody">
                        {veiledere.map((veileder: any) => (
                            <VeilederoversiktTabellrad veileder={veileder} key={veileder.ident} />
                        ))}
                    </tbody>
                </table>
            </span>
        </div>
    );
}
