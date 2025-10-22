import {BodyShort} from '@navikt/ds-react';
import {DataCellTypeProps} from './DataCellTypeProps';
import moment from 'moment/moment';

interface Props extends DataCellTypeProps {
    dato: string | undefined;
}

export function DagerSidenDataCellType({dato, skalVises, className}: Props) {
    if (!skalVises || dato === undefined || dato === '') {
        return null;
    }

    const finnDagerSidenDato = (dato: string): number => {
        const hentDato = moment(dato, 'YYYY-MM-DD');
        return moment().diff(hentDato, 'days');
    };
    const dagerSiden = finnDagerSidenDato(dato);

    const dagerSidenTekst = () => {
        if (dagerSiden === 0) {
            return 'I dag';
        } else if (dagerSiden === 1) {
            return '1 dag siden';
        } else {
            return `${dagerSiden} dager siden`;
        }
    };

    return (
        <BodyShort size="small" className={className}>
            {dagerSidenTekst()}
        </BodyShort>
    );
}
