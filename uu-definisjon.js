exports.links = [
    {link: 'https://app-t6.adeo.no/veilarbportefoljeflatefs/enhet?enhet=0104&side=1',
		options: {
			auth: { type: 'isso', publicDomain: 'https://fasit.adeo.no/' },
			chain: [
				{ waitFor: '.enhet-side' },
				{ waitFor: '.filtrering-oversikt' },
				{ clickAndWait: {clickOn: '#nyeBrukere + label', thenWaitFor: '.portefolje__container' } }
			]
		}
	},
	{link: 'https://app-t6.adeo.no/veilarbportefoljeflatefs/veiledere?enhet=0104', options: { waitFor: '.veiledere-side' }},
	{link: 'https://app-t6.adeo.no/veilarbportefoljeflatefs/portefolje?enhet=0104', options: { waitFor: '.portefolje-side' }}
];
