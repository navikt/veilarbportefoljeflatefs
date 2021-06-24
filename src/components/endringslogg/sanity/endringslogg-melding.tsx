import * as React from 'react';
import {EndringsloggData, query} from './endringslogg-groq';
import '../endringslogg.less';
import Spinner from '../../spinner/spinner';
import classNames from 'classnames/dedupe';
import {Undertekst, Undertittel} from 'nav-frontend-typografi';
import {SanityBlockContent} from '../../SanityBlockContent';
import {EndringsloggLinkMedIkon} from '../endringslogg-innhold';
import {ModalName} from '../../modal/tour-modal/tour-modal';
import {sanityDatoFormattering} from '../../../utils/dato-utils';
import SanityTourModalButton from '../../modal/sanity-tour-modal/sanity_tour-modal-button';
import {useEffect, useState} from 'react';
import {getClient} from '../../../lib/sanity';

interface EndringsloggMeldingProps {
    endringsloggmeldinger: EndringsloggData[];
}

export default function EndringsloggMelding(props: EndringsloggMeldingProps) {
    const [post, setPost] = useState<Array<any>>([]);

    useEffect(() => {
        getClient(false)
            .fetch(query)
            .then(blogpost => {
                setPost(blogpost);
            });
    }, []);

    return props.endringsloggmeldinger.length === 0 ? (
        <div className="endringsloggmeldinger_spinner">
            <Spinner />
        </div>
    ) : (
        <>
            {props.endringsloggmeldinger.map(melding => {
                return (
                    <div key={melding._id} className="endringslogg-rad endringslogg-skille">
                        <div
                            className={classNames('endringslogg-info-kolonne', 'endringslogg-info-nye-notifikasjoner ')}
                        />
                        <Undertekst>{sanityDatoFormattering(melding.dato)}</Undertekst>

                        <div className="endringslogg-innhold endringslogg-kolonne">
                            <Undertittel> {melding.tittel} </Undertittel>
                            <SanityBlockContent blocks={melding.innhold} />
                            {melding.lenke && (
                                <EndringsloggLinkMedIkon url={melding.lenke} linkTekst="Se mer informasjon på Navet" />
                            )}
                            {melding.stepper && (
                                <SanityTourModalButton
                                    modalName={ModalName.SISTE_ENDRING}
                                    knappeTekst={'Se hvordan'}
                                    stepper={post}
                                    endringsloggmelding={post}
                                />
                            )}
                        </div>
                    </div>
                );
            })}
        </>
    );
}
