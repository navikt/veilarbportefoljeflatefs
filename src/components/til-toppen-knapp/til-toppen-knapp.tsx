import React, {useEffect, useRef, useState} from 'react';
import throttle from 'lodash.throttle';
import classNames from 'classnames';
import './til-toppen-knapp.less';
import {logEvent} from '../../utils/frontend-logger';
import {finnSideNavn} from '../../middleware/metrics-middleware';
import {Up} from '@navikt/ds-icons';
import {Button} from '@navikt/ds-react';

export const TilToppenKnapp = () => {
    const [scrollPosition, setScrollPosition] = useState<number | undefined>();
    const knappRef = useRef<HTMLButtonElement>(null);

    const onScroll = throttle(() => {
        setScrollPosition(window.scrollY);
    }, 1000);

    const onClick = e => {
        if (knappSkalVises) {
            window.scrollTo({top: 0, behavior: 'smooth'});
        }
        if (knappRef?.current) {
            knappRef.current.blur();
        }
        logEvent('portefolje.metrikker.tiltoppenknapp', {
            sideNavn: finnSideNavn()
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [onScroll]);

    const knappSkalVises = scrollPosition && scrollPosition > window.innerHeight;

    return (
        <Button
            variant="secondary"
            ref={knappRef}
            className={classNames('til-toppen-knapp', 'knapp', !knappSkalVises && 'til-toppen-knapp--skjul')}
            hidden={!knappSkalVises}
            onClick={onClick}
            data-testid="til-toppen_knapp"
        >
            <Up />
        </Button>
    );
};
