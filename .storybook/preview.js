import 'nav-frontend-chevron-style/dist/main.css';
import 'nav-frontend-ekspanderbartpanel-style/dist/main.css';
import 'nav-frontend-grid-style/dist/main.css';
import 'nav-frontend-lenker-style/dist/main.css';
import 'nav-frontend-lukknapp-style/dist/main.css';
import 'nav-frontend-paneler-style/dist/main.css';
import 'nav-frontend-skjema-style/dist/main.css';
import 'nav-frontend-typografi-style/dist/main.css';
import '@navikt/ds-css';
import '../src/style.css';
import '../src/mocks';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
