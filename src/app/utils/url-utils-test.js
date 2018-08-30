import { expect } from 'chai';
import 'babel-polyfill';
import { utledMiljoFraHost } from './url-utils';

describe('URL utils', () => {
    describe('utledMiljoFraHost', () => {
        it('skal returnere tom streng når miljø er produksjon', () => {
            const host = 'app.adeo.no';
            expect(utledMiljoFraHost(host)).to.equal('');
        });
        it('skal returnere tom streng når miljø er localhost', () => {
            const host = 'localhost:8080';
            expect(utledMiljoFraHost(host)).to.equal('');
        });
        it('skal returnere tom streng når miljø er 127.0.0.1', () => {
            const host = '127.0.0.1:8080';
            expect(utledMiljoFraHost(host)).to.equal('');
        });
        it('skal returnere \'-t4\' når miljø er t4', () => {
            const host = 'veilederflatehendelser-t4.adeo.no';
            expect(utledMiljoFraHost(host)).to.equal('-t4');
        });
        it('skal returnere \'-q4\' når miljø er q4', () => {
            const host = 'app-q4.adeo.no';
            expect(utledMiljoFraHost(host)).to.equal('-q4');
        });
    });
});
