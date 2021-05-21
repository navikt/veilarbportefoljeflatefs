import stepper from './stepper';

export default {
    name: 'endringsloggmelding',
    title: 'Endringsloggmelding',
    type: 'document',
    fields: [
        {
            title: 'Tittel',
            name: 'tittel',
            type: 'string',
            validation: Rule =>
                Rule.required()
                    .min(2)
                    .max(200)
        },
        {
            title: 'Dato',
            name: 'dato',
            type: 'date',
            validation: Rule => Rule.required()
        },
        {
            title: 'Innhold',
            name: 'innhold',
            type: 'blockContent',
            validation: Rule => Rule.required()
        },
        {
            title: 'Lenke til Navet',
            name: 'lenke',
            type: 'url'
        },
        {
            title: 'Stepper',
            name: 'stepper',
            type: 'reference',
            to: {type: 'stepper'}
        }
    ]
};
