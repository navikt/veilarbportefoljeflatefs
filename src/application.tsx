import {BrowserRouter} from 'react-router-dom';
import {Routing} from './routing';
import {Provider} from 'react-redux';
import {Decorator} from './decorator';
import {InitialDataProvider} from './providers/initial-data-provider';
import {RedirectPortefolje} from './redirect-portefolje';
import {useBrukeraktivitetTokenRefresh} from './hooks/use-brukeraktivitet-token-refresh';
import {settSesjonStatusGyldig, settSesjonStatusUtlopt} from './ducks/informasjonsmelding';
import {store} from './store';

function Application() {
    useBrukeraktivitetTokenRefresh(
        () => store.dispatch(settSesjonStatusUtlopt()),
        () => store.dispatch(settSesjonStatusGyldig())
    );

    return (
        <Provider store={store}>
            <BrowserRouter basename={import.meta.env.BASE_URL}>
                <InitialDataProvider>
                    <RedirectPortefolje>
                        <Decorator />
                        <Routing />
                    </RedirectPortefolje>
                </InitialDataProvider>
            </BrowserRouter>
        </Provider>
    );
}

export default Application;
