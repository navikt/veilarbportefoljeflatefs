/*eslint-disable*/
"use strict";
const fs = require('fs');
const ConfluenceAPI = require('nav-confluence-api');
const wikiConverter = require('markdown2confluence');

const args = process.argv.slice(2);
const username = args[0];
const password = args[1];
const versjon = args[2];

const instance = new ConfluenceAPI('http://confluence.adeo.no', username, password);

const logError = (error) => {
    console.log('[ERROR] ', error);
};

function settInnVersjon(data, versjon) {
    return data.replace('{{versjon}}', `${versjon}`);
}

function hentContent() {
    const data = fs.readFileSync('./documentation/sider/distribusjonslogg.wiki', 'UTF-8');
    return settInnVersjon(data, versjon);
}

instance.updatePage({
    id: 213061646,
    title: 'Nyeste versjon',
    space: 'EAF',
    content: hentContent(),
    message: `ny versjon: veilarbportefoljeflatefs - ${versjon}`
}).catch(logError);

/*
var cont = instance.getPage('201272624', true).then(function(content) {
    console.log(content.body.storage.value);
}).catch(logError);
*/
