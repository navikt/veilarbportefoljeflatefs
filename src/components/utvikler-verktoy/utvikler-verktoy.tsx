import React, {useEffect, useRef, useState} from 'react';
import {Button, Popover, Switch} from '@navikt/ds-react';
import './utvikler-verktoy.css';
import {CogIcon} from '@navikt/aksel-icons';

export const UtviklerVerktoy = () => {
    const [openState, setOpenState] = useState(false);
    const [clearLocalStorage, setClearLocalStorage] = useState(false);
    const buttonRef = useRef(null);

    useEffect(() => {
        // eslint-disable-next-line no-console
        console.debug('Clear local storage?', clearLocalStorage ? 'Yes' : 'No');

        const handleBeforeUnload = () => {
            window.localStorage.clear();
        };

        if (!clearLocalStorage) {
            // eslint-disable-next-line no-console
            console.debug('Removing "beforeunload" event-listener');
            window.removeEventListener('beforeunload', handleBeforeUnload);
        } else {
            // eslint-disable-next-line no-console
            console.debug('Adding "beforeunload" event-listener');
            window.addEventListener('beforeunload', handleBeforeUnload);
        }

        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [clearLocalStorage]);

    return (
        <div className="utvikler-verktøy">
            <Button
                icon={<CogIcon />}
                ref={buttonRef}
                onClick={() => setOpenState(!openState)}
                aria-expanded={openState}
            >
                Utviklerverktøy
            </Button>
            <Popover
                strategy="fixed"
                placement="left"
                open={openState}
                onClose={() => setOpenState(false)}
                anchorEl={buttonRef.current}
            >
                <Popover.Content>
                    <Switch
                        position="right"
                        checked={clearLocalStorage}
                        onChange={() => setClearLocalStorage(!clearLocalStorage)}
                    >
                        Slett localStorage ved refresh?
                    </Switch>
                </Popover.Content>
            </Popover>
        </div>
    );
};
