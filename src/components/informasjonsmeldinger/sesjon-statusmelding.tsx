import {Alert, Link} from '@navikt/ds-react';
import {useSesjonStatus} from '../../hooks/redux/use-informasjonsmelding';
import {isDefined} from '../../utils/types/typeguards';
import {SesjonStatus} from '../../model-interfaces';
import {loginUrl} from '../../utils/url-utils';

export const SesjonStatusmelding = () => {
    const sesjonStatus = useSesjonStatus();

    if (!isDefined(sesjonStatus) || sesjonStatus === SesjonStatus.GYLDIG) {
        return null;
    }

    return (
        <Alert variant="warning" size="medium" fullWidth>
            Økten din er utløpt. <Link href={loginUrl()}>Logg inn på nytt.</Link>
        </Alert>
    );
};
