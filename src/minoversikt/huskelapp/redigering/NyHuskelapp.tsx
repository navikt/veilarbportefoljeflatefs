import {Form, Formik} from 'formik';
import {Detail, Heading} from '@navikt/ds-react';
import {HuskelappInfoAlert} from './HuskelappInfoAlert';
import FormikTekstArea from '../../../components/formik/formik-tekstarea';
import FormikDatoVelger from '../../../components/formik/formik-datovelger/formik-datovelger';
import {HuskelappModell} from '../../../model-interfaces';
import {toDatePrettyPrint, validerFristFelt} from '../../../utils/dato-utils';
import './rediger-huskelapp.css';

interface Props {
    huskelapp?: HuskelappModell;
    onSubmit: (values: any, formikHelpers: any) => Promise<any>;
    harArbeidsliste: boolean;
    setHuskelappEndret: (endret: boolean) => void;
}

export const NyHuskelapp = ({huskelapp, onSubmit, harArbeidsliste, setHuskelappEndret}: Props) => {
    return (
        <div className="ny-huskelapp huskelapp__postit">
            {harArbeidsliste && <Heading size="small">Ny huskelapp</Heading>}
            <Formik
                initialValues={{
                    frist: huskelapp?.frist ?? '',
                    kommentar: huskelapp?.kommentar ?? ''
                }}
                validateOnBlur={false}
                onSubmit={onSubmit}
            >
                {({dirty}) => {
                    return (
                        <Form
                            id="rediger-huskelapp-skjema"
                            className="ny-huskelapp-form"
                            onKeyUp={() => setHuskelappEndret(dirty)}
                            onBlur={() => setHuskelappEndret(dirty)}
                        >
                            <FormikTekstArea label="Tekst" name="kommentar" maxLengde={200} />
                            <FormikDatoVelger
                                name="frist"
                                label="Frist"
                                size="small"
                                validate={validerFristFelt}
                                ariaLabel="Frist for huskelapp"
                            />
                        </Form>
                    );
                }}
            </Formik>
            {huskelapp && (
                <Detail>
                    <i>{`Endret ${toDatePrettyPrint(huskelapp?.endretDato)} av ${huskelapp?.endretAv}`}</i>
                </Detail>
            )}
            <HuskelappInfoAlert />
        </div>
    );
};
