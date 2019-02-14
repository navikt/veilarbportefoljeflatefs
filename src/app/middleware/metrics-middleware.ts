import { ENDRE_FILTER } from '../ducks/filtrering';
import { logEvent } from '../utils/frontend-logger';

interface FilterEndringData {
    filterId: string;
    filterVerdi: string | string[];
}

export const metricsMiddleWare = (store: any) => (next: any) => (action: any) => {

    switch (action.type) {
        case ENDRE_FILTER:
            loggEndreFilter(action.name, action.data);
            break;
    }
    next(action);
};

const loggEndreFilter = (sideNavn: string, data: FilterEndringData) => {
    logEvent('portefolje.metrikker.endre_filter', {
        side: sideNavn,
        filter: data.filterId,
        verdi: data.filterVerdi
    });
};
