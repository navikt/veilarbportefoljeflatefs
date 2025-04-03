import {useEffect, useRef, useState} from 'react';
import throttle from 'lodash.throttle';
import classNames from 'classnames';
import {Button} from '@navikt/ds-react';
import {ArrowUpIcon} from '@navikt/aksel-icons';
import {logEvent} from '../../utils/frontend-logger';
import {finnSideNavn} from '../../middleware/metrics-middleware';
import './til-toppen-knapp.css';

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
            className={classNames('til-toppen-knapp', 'knapp', !knappSkalVises && 'til-toppen-knapp--skjul')}
            variant="secondary"
            ref={knappRef}
            hidden={!knappSkalVises}
            onClick={onClick}
            icon={<ArrowUpIcon title="Til toppen av sida" />}
            data-testid="til-toppen_knapp"
        />
    );
};
