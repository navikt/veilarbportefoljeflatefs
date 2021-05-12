export default {
    name: 'post',
    title: 'Endringsloggmelding',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Tittel',
            type: 'string',
            validation: Rule =>
                Rule.required()
                    .min(2)
                    .max(50)
        },
        {
            name: 'date',
            title: 'Dato',
            type: 'date',
            validation: Rule => Rule.required()
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            // hidden: true,
            initialValue: 'date',
            options: {
                source: 'date',
                maxLength: 10
            }
        },
        {
            name: 'linkToggle',
            title: 'Lenke til Navet?',
            type: 'boolean'
        },
        {
            name: 'link',
            title: 'Lenke til Navet',
            type: 'url',
            hidden: {name: 'linkToggle' === false}
        },
        {
            name: 'body',
            title: 'Innhold',
            type: 'blockContent',
            validation: Rule => Rule.required()
        }
    ],

    preview: {
        select: {
            title: 'title',
            date: 'date',
            link: 'link',
            body: 'body'
        },
        prepare(selection) {
            const {title, date, link, body} = selection;
            return {title, date, link, body};
        }
    }
};
