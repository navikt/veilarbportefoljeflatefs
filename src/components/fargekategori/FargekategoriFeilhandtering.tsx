import React from 'react';
import {Alert, BodyShort, List, useId} from '@navikt/ds-react';
import {Status} from '../../model-interfaces';

interface Props {
    children: React.ReactNode;
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
        <List as="ul" size="small" title="Kunne ikke oppdatere kategori på følgende personer:">
            {errorFnrs?.map(fnr => <List.Item key={useId()}>{fnr}</List.Item>)}
        </List>
    );
};

export const FargekategoriFeilhandtering = ({children, apiResponse}: Props) => {
    const responseJson =
        apiResponse.status === Status.ERROR && isString(apiResponse.data.data)
            ? JSON.parse(apiResponse.data.data)
            : apiResponse.data;

    const {data: okFnrs, errors: errorFnrs} = !!responseJson ? responseJson : {data: [], errors: []};

    return (
        <>
            {apiResponse.status === Status.ERROR || !!errorFnrs?.length ? (
                <Alert size="small" variant="error">
                    {mapErrorToText(okFnrs, errorFnrs, apiResponse.data.response?.status)}
                </Alert>
            ) : (
                children
            )}
        </>
    );
};
