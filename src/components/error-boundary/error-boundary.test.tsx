import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {ErrorBoundary} from './error-boundary';

const HEMMELIG_FEIL = 'hemmelig-intern-feil-123';

function Kaster(): never {
    throw new Error(HEMMELIG_FEIL);
}

describe('ErrorBoundary', () => {
    let container: HTMLDivElement;
    let root: Root;

    beforeEach(() => {
        vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
        container = document.createElement('div');
        document.body.appendChild(container);
        root = createRoot(container);
    });

    afterEach(() => {
        act(() => root.unmount());
        container.remove();
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
    });

    function dempForventetFeil() {
        const originalError = console.error;
        vi.spyOn(console, 'error').mockImplementation((...args: unknown[]) => {
            const tekst = args.map(a => (a instanceof Error ? a.message : String(a))).join(' ');
            if (!tekst.includes(HEMMELIG_FEIL)) {
                originalError(...args);
            }
        });
        const lytter = (e: ErrorEvent) => {
            if (e.message?.includes(HEMMELIG_FEIL) || e.error?.message === HEMMELIG_FEIL) {
                e.preventDefault();
            }
        };
        window.addEventListener('error', lytter);
        return () => window.removeEventListener('error', lytter);
    }

    it('rendrer barn når alt er OK', () => {
        act(() =>
            root.render(
                <ErrorBoundary>
                    <p>Innhold</p>
                </ErrorBoundary>
            )
        );
        expect(container.textContent).toBe('Innhold');
        expect(container.querySelector('main')).toBeNull();
    });

    it('viser fallback uten providere og uten feildetaljer når barn kaster', () => {
        const fjern = dempForventetFeil();
        act(() =>
            root.render(
                <ErrorBoundary>
                    <Kaster />
                </ErrorBoundary>
            )
        );
        fjern();

        expect(container.querySelector('main')).not.toBeNull();
        expect(container.querySelector('h1')).not.toBeNull();
        expect(container.textContent).toContain('Det oppsto en uventet feil. Prøv å laste siden på nytt.');
        expect(container.textContent).not.toContain(HEMMELIG_FEIL);
        expect(container.innerHTML).not.toContain(HEMMELIG_FEIL);
        expect(container.innerHTML).not.toContain('at Kaster');
    });

    it('laster siden på nytt når knappen trykkes', () => {
        const reload = vi.fn();
        vi.stubGlobal('location', {...window.location, reload});
        const fjern = dempForventetFeil();
        act(() =>
            root.render(
                <ErrorBoundary>
                    <Kaster />
                </ErrorBoundary>
            )
        );
        fjern();

        const knapp = Array.from(container.querySelectorAll('button')).find(
            b => b.textContent === 'Last siden på nytt'
        );
        expect(knapp).toBeDefined();
        act(() => knapp!.click());
        expect(reload).toHaveBeenCalledTimes(1);
    });
});
