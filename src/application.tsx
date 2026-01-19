import moment from 'moment';
import {BrowserRouter} from 'react-router-dom';
import {Routing} from './routing';
import {Provider} from 'react-redux';
import createStore from './store';
import {Decorator} from './decorator';
import {InitialDataProvider} from './providers/initial-data-provider';
import {RedirectPortefolje} from './redirect-portefolje';
import {useBrukeraktivitetTokenRefresh} from './hooks/use-brukeraktivitet-token-refresh';
import {settSesjonStatusGyldig, settSesjonStatusUtlopt} from './ducks/informasjonsmelding';

moment.locale('nb');

moment.updateLocale('nb', {
    monthsShort: ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des']
});

export const store = createStore();

function Application() {
    useBrukeraktivitetTokenRefresh(
        () => store.dispatch(settSesjonStatusUtlopt()),
        () => store.dispatch(settSesjonStatusGyldig())
    );

    return (
        <Provider store={store}>
            <BrowserRouter
                basename={import.meta.env.BASE_URL}
                future={{v7_startTransition: true, v7_relativeSplatPath: true}}
            >
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
