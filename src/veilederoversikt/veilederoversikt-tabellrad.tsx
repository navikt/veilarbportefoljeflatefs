import {Link} from 'react-router-dom';
import {BodyShort} from '@navikt/ds-react';

interface Props {
    veileder: any;
}

export const VeilederoversiktTabellrad = ({veileder}: Props) => {
    return (
        <tr key={veileder.ident}>
            <td>
                <Link
                    to={`/portefolje/${veileder.ident}`}
                    className="lenke lenke--frittstaende"
                    data-testid="veilederoversikt_navn_lenke"
                >
                    <BodyShort size="small">{`${veileder.navn}`}</BodyShort>
                </Link>
            </td>
            <td>
                <BodyShort size="small">{`${veileder.ident}`}</BodyShort>
            </td>
            <td className="tabell-element-center">
                <BodyShort size="small">{veileder.portefoljestorrelse}</BodyShort>
            </td>
            <td />
        </tr>
    );
};
