import {Brukerfeilmelding} from './brukerfeilmelding';

describe('<Brukerfeilmelding>', () => {
    it('mounts', () => {
        // @ts-ignore
        cy.mount(<Brukerfeilmelding variant="error" size="small" inline={true} text="Du må velge minst én bruker" />);
    });
});
