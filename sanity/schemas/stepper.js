export default {
    name: 'stepper',
    title: 'Stepper',
    type: 'document',
    fields: [
        {
            title: 'Tittel',
            name: 'tittel',
            type: 'string',
            description: 'Må ha et unikt navn, og skrives på denne måten: "SISTE_ENDRING"',
            validation: Rule => Rule.required()
        },
        {
            title: 'Knappetekst',
            name: 'knappetekst',
            type: 'string',
            description: 'Hvis denne står tom, blir knappeteksten "Se hvordan"'
        },
        {
            title: 'Steg 1',
            name: 'steg1',
            type: 'object',
            fields: [
                {
                    title: 'Tittel',
                    name: 'steg1Tittel',
                    type: 'string'
                },
                {
                    title: 'Innhold',
                    name: 'steg1Innhold',
                    type: 'blockContent'
                },
                {title: 'Bilde', name: 'steg1Bilde', type: 'image'},
                {title: 'Alt. tekst', name: 'steg1AltTekst', type: 'string'}
            ],
            validation: Rule => Rule.required()
        },
        {
            title: 'Steg 2',
            name: 'steg2',
            type: 'object',
            fields: [
                {
                    title: 'Tittel',
                    name: 'steg2Tittel',
                    type: 'string'
                },
                {
                    title: 'Innhold',
                    name: 'steg2Innhold',
                    type: 'blockContent'
                },
                {title: 'Bilde', name: 'steg2Bilde', type: 'image'},
                {title: 'Alt. tekst', name: 'steg2AltTekst', type: 'string'}
            ]
        },
        {
            title: 'Steg 3',
            name: 'steg3',
            type: 'object',
            fields: [
                {
                    title: 'Tittel',
                    name: 'steg3Tittel',
                    type: 'string'
                },
                {
                    title: 'Innhold',
                    name: 'steg3Innhold',
                    type: 'blockContent'
                },
                {title: 'Bilde', name: 'steg3Bilde', type: 'image'},
                {title: 'Alt. tekst', name: 'steg1AltTekst', type: 'string'}
            ]
        }
    ]
};
