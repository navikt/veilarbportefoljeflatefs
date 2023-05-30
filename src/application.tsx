import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Routes from './routes';
import {Provider} from 'react-redux';
import createStore from './store';
import * as moment from 'moment';
import {Decorator} from './decorator';
import InitialDataProvider from './providers/initial-data-provider';
import {RedirectPortefolje} from './redirect-portefolje';
import {Modal} from '@navikt/ds-react';
import {erMock} from './utils/url-utils';
import {useBrukeraktivitetTokenRefresh} from './hooks/use-brukeraktivitet-token-refresh';
import {settSesjonStatusGyldig, settSesjonStatusUtlopt} from './ducks/informasjonsmelding';

if (process.env.NODE_ENV !== 'test') {
    Modal.setAppElement && Modal.setAppElement('#applikasjon');
}
moment.locale('nb');

export const store = createStore();

function Application() {
    useBrukeraktivitetTokenRefresh(
        () => store.dispatch(settSesjonStatusUtlopt()),
        () => store.dispatch(settSesjonStatusGyldig())
    );

    return (
        <Provider store={store}>
            <BrowserRouter basename={erMock() ? '/veilarbportefoljeflatefs' : '/'}>
                <InitialDataProvider>
                    <RedirectPortefolje>
                        <Decorator />
                        <Routes />
                    </RedirectPortefolje>
                </InitialDataProvider>
            </BrowserRouter>
        </Provider>
    );
}

export default Application;
