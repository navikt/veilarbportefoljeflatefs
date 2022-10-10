import {Alert, Link} from '@navikt/ds-react';
import * as React from 'react';
import {useSesjonStatus} from '../../hooks/redux/use-informasjonsmelding';
import {isDefined} from '../../utils/types/typeguards';
import {SesjonStatus} from '../../model-interfaces';
import {loginUrl} from '../../utils/url-utils';

export const SesjonStatusmelding = () => {
    const sesjonStatus = useSesjonStatus();

    if (!isDefined(sesjonStatus) || sesjonStatus === SesjonStatus.GYLDIG) {
        return null;
    }

    const LoginLenke = () => <Link href={loginUrl()}>Logg inn på nytt.</Link>;

    return (
        <Alert variant="error" size="medium" fullWidth>
            Økten din er utløpt. <LoginLenke />
        </Alert>
    );
};
