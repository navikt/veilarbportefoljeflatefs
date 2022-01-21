import React from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import './veiledere.less';
import {Down, Up} from '@navikt/ds-icons';
import {BodyShort, Button} from '@navikt/ds-react';

interface VeiledereTabellProps {
    veiledere: any;
    currentSortering: {
        property: string;
        direction: string;
    };

    sorterPaaEtternavn: () => void;
    sorterPaaPortefoljestorrelse: () => void;
}

function VeilederTabell(props: VeiledereTabellProps) {
    const {veiledere, currentSortering} = props;
    const sorterEtternavn = currentSortering.property === 'etternavn';
    const sorterPaaPortefoljeStr = currentSortering.property === 'portefoljestorrelse';

    const veilederElementer = veiledere.map(veileder => (
        <tr key={veileder.ident}>
            <td>
                <Link
                    to={`/portefolje/${veileder.ident}`}
                    className="lenke lenke--frittstaende"
                    data-testid="veilederoversikt_navn_lenke"
                >
                    {`${veileder.navn}`}
                </Link>
            </td>
            <td>{`${veileder.ident}`}</td>
            <td className="tabell-element-center">{veileder.portefoljestorrelse}</td>
            <td />
        </tr>
    ));

    const sorteringspil = sorterPaa => {
        const className = 'tabellheader__pil';
        if (sorterPaa) {
            if (currentSortering.direction === 'stigende') {
                return <Up className={className} data-testid="sorteringspil_stigende" />;
            } else if (currentSortering.direction === 'synkende') {
                return <Down className={className} data-testid="sorteringspil_synkende" />;
            }
        }
        return null;
    };

    return (
        <div className="veilederoversikt__toolbar-container">
            <span className="veilederoversikt__sticky-skygge">
                <table className="tabell veileder-tabell portefolje-tabell ">
                    <thead>
                        <tr>
                            <th scope="col" className="tabellheader">
                                <div className="tabellheader__lenke">
                                    <Button
                                        variant="tertiary"
                                        onClick={props.sorterPaaEtternavn}
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
                                        <BodyShort>Etternavn</BodyShort>
                                    </Button>
                                    <BodyShort>, Fornavn</BodyShort>
                                    {sorteringspil(sorterEtternavn)}
                                </div>
                            </th>
                            <th scope="col" className="tabellheader">
                                <BodyShort>NAV-ident</BodyShort>
                            </th>
                            <th className="tabellheader tabell-element-center" scope="col">
                                <div
                                    className="tabellheader__lenke"
                                    data-testid="veilederoversikt_sortering_antall-brukere"
                                >
                                    <Button
                                        variant="tertiary"
                                        onClick={props.sorterPaaPortefoljestorrelse}
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
                                        <BodyShort>Antall brukere</BodyShort>
                                    </Button>
                                    {sorteringspil(sorterPaaPortefoljeStr)}
                                </div>
                            </th>
                            <th />
                        </tr>
                    </thead>
                    <tbody data-testid="veilederoversikt_veilederliste_tbody">{veilederElementer}</tbody>
                </table>
            </span>
        </div>
    );
}

export default VeilederTabell;
