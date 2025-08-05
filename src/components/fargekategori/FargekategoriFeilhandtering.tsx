import {ReactNode} from 'react';
import {Alert, BodyShort, Heading, List} from '@navikt/ds-react';
import {STATUS} from '../../ducks/utils';

interface Props {
    children: ReactNode;
    apiResponse: {status: string; data: {response?: Response; data: string | {data: string[]; errors: string[]}}};
}

function isString(data: string | {data: string[]; errors: string[]}): data is string {
    return typeof data === 'string';
}

const mapErrorToText = (okFnrs: string[], errorFnrs: string[], status: number | undefined) => {
    const ingenGikkBra = !okFnrs?.length;
    const bareEnFeilet = errorFnrs?.length === 1;

    if (ingenGikkBra) {
        if (status === 400) return `Kunne ikke oppdatere kategori. Fødselsnummer er ugyldig.`;
        if (status === 403) return `Du har ikke tilgang til å oppdatere kategori.`;
        if (status === 500) return `Noe gikk galt, prøv igjen senere.`;
    } else if (bareEnFeilet) {
        return <BodyShort>Kunne ikke oppdatere kategori for person med fødselsnummer '{errorFnrs[0]}'</BodyShort>;
    }

    return (
        <>
            <Heading size="xsmall" level="3">
                Kunne ikke oppdatere kategori på følgende personer:
            </Heading>
            <List as="ul" size="small">
                {errorFnrs?.map(fnr => <List.Item key={fnr}>{fnr}</List.Item>)}
            </List>
        </>
    );
};

export const FargekategoriFeilhandtering = ({children, apiResponse}: Props) => {
    const responseJson =
        apiResponse.status === STATUS.ERROR && isString(apiResponse.data.data)
            ? JSON.parse(apiResponse.data.data)
            : apiResponse.data;

    const {data: okFnrs, errors: errorFnrs} = responseJson || {data: [], errors: []};

    return (
        <>
            {apiResponse.status === STATUS.ERROR || !!errorFnrs?.length ? (
                <Alert size="small" variant="error">
                    {mapErrorToText(okFnrs, errorFnrs, apiResponse.data.response?.status)}
                </Alert>
            ) : (
                children
            )}
        </>
    );
};
