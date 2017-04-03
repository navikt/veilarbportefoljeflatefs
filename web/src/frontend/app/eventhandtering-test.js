import { expect } from 'chai';
import { erstattMiljoPlaceholder } from './eventhandtering';

const modiaTemplateUrl = 'https://modapp{{miljoStreng}}.adeo.no/modiabrukerdialog';

describe('erstattMiljoPlaceholder', () => {
    it('skal gi riktig lenke i t4', () => {
        global.window = {
            location: {
                host: 'app-t4.adeo.no'
            }
        };

        const lenke = erstattMiljoPlaceholder(modiaTemplateUrl);
        expect(lenke).to.equal('https://modapp-t4.adeo.no/modiabrukerdialog');
    });

    it('skal gi riktig lenke i prod', () => {
        global.window = {
            location: {
                host: 'app.adeo.no'
            }
        };

        const lenke = erstattMiljoPlaceholder(modiaTemplateUrl);
        expect(lenke).to.equal('https://modapp.adeo.no/modiabrukerdialog');
    });
});
