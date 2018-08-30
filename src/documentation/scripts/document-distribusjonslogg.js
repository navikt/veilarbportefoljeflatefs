/*eslint-disable*/
"use strict";
const fs = require('fs');
const ConfluenceAPI = require('nav-confluence-api');

const args = process.argv.slice(2);
const username = args[0];
const password = args[1];
const versjon = args[2];
const byggdato = args[3];

const instance = new ConfluenceAPI('http://confluence.adeo.no', username, password);

const logError = (error) => {
    console.log('[ERROR] ', error);
};

const versjonsTabell =
    `<ac:structured-macro ac:macro-id="9c3e564f-ad36-471a-b288-88d1a7282081" ac:name="details" ac:schema-version="1">
        <ac:parameter ac:name="id">Distribusjonslogg</ac:parameter>
        <ac:rich-text-body>
            <table class="confluenceTable">
                <tbody>
                    <tr>
                        <th class="confluenceTd">Applikasjonverdi</th>
                        <td class="confluenceTd">${versjon}</td>
                    </tr>
                    <tr>
                        <th class="confluenceTd">Byggdato</th>
                        <td class="confluenceTd">${byggdato}</td>
                    </tr>
                </tbody>
            </table>
        </ac:rich-text-body>
    </ac:structured-macro>`;

instance.newPage({
    title: `2017-veilarbportefoljeflatefs-${versjon}`,
    space: 'EAF',
    parent: 201272624,
    content: versjonsTabell,
    representation: 'storage'
}).then(resp => {
    instance.addLabel({
        id: resp.id,
        label: 'doc_distribusjonsversjon'
    });
}).catch(logError);
