import classNames from 'classnames/dedupe';
import BlockContent from '@sanity/block-content-to-react';
import {Heading, Label} from '@navikt/ds-react';
import {EndringsloggEntryWithSeenStatus} from './utils/endringslogg-custom';
import {TourModalButton} from './tour-modal/tour-modal-button';
import {trackLinkClick} from './utils/utils';
import {EndringsloggLink} from './endringslogg-link';
import './endringslogg.css';

interface EndringsloggContentProps {
    innleggsListe: EndringsloggEntryWithSeenStatus[];
}

export const EndringsloggContent = ({innleggsListe}: EndringsloggContentProps) => {
    return (
        <>
            {innleggsListe.map(endring => (
                <EndringsloggEntry
                    key={endring._id}
                    _id={endring._id}
                    date={endring.date}
                    description={endring.description}
                    title={endring.title}
                    seen={endring.seen}
                    linkText={endring.linkText}
                    link={endring.link}
                    modal={endring.modal}
                    forced={
                        endring.forced
                    } /* Ikkje brukt i EndringsloggEntry, men obligatorisk for typen. 2024-03-14, Ingrid */
                    seenForced={
                        endring.seenForced /* Denne er ikkje i bruk i EndringsloggEntry, men er obligatorisk for typen så den får sendast med litt til. 2024-03-13, Ingrid */
                    }
                />
            ))}
        </>
    );
};

const isoTimeStringToDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.getDate() + '. ' + date.toLocaleString('no-NO', {year: 'numeric', month: 'long'}).toLowerCase();
};

const EndringsloggEntry = ({
    _id,
    date,
    description,
    title,
    seen,
    linkText,
    link,
    modal
}: EndringsloggEntryWithSeenStatus) => {
    return (
        <div className={classNames('endringslogg-rad', 'endringslogg-skille')}>
            <div className={'endringslogg-datolinje'}>
                <div
                    role={seen ? 'alert' : ''}
                    aria-label={seen ? 'Nye endringer i Arbeidsrettet oppfølging' : ''}
                    className={classNames('endringslogg-info-kolonne', {
                        'endringslogg-info-nye-notifikasjoner': !seen
                    })}
                />
                <Label size={'small'}>{isoTimeStringToDate(date!)}</Label>
            </div>
            <div className={classNames('endringslogg-innhold', 'endringslogg-kolonne')}>
                <Heading size="small" level="2">
                    {title}
                </Heading>
                {description && <BlockContent className={'endringslogg-block-content'} blocks={description} />}
                <div className="endringslogg-block-footer">
                    {modal && <TourModalButton id={_id} modal={modal} buttonText="Se hvordan" />}
                    {link && linkText && (
                        <EndringsloggLink linkText={linkText} link={link} onClick={() => trackLinkClick(_id)} />
                    )}
                </div>
            </div>
        </div>
    );
};
