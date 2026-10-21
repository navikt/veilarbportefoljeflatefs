import {Component, ReactNode} from 'react';
import {BodyShort, Box, Button, Heading, VStack} from '@navikt/ds-react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    harFeil: boolean;
}

function ErrorFallback() {
    return (
        <Box as="main" padding={{xs: 'space-16', md: 'space-24'}}>
            <VStack gap="space-16" align="start">
                <Heading level="1" size="large">
                    Noe gikk galt
                </Heading>
                <BodyShort>Det oppsto en uventet feil. Prøv å laste siden på nytt.</BodyShort>
                <Button type="button" onClick={() => window.location.reload()}>
                    Last siden på nytt
                </Button>
            </VStack>
        </Box>
    );
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = {harFeil: false};

    static getDerivedStateFromError(): ErrorBoundaryState {
        return {harFeil: true};
    }

    render() {
        return this.state.harFeil ? <ErrorFallback /> : this.props.children;
    }
}
