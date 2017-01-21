/*jslint node: true */
"use strict";
module.exports = [
	{ 
		get: {url: '/', middleware: ['AuthIsLogin', 'AuthIsAdmin'], as: 'homesite', folder: 'new', uses: 'home@index'}
	},
	{
		get: {url: '/angel-site', middleware: "AuthIsLogin", as: 'angelsite', folder: 'site', uses: 'home@test3'}
	},
	{
		get: {url: '/form', as: 'securesite', folder: 'new', uses: 'home@form'}
	},
	{
		post: {url: '/form-post', as: 'site.form.store', validation: 'LoginRequest', folder: 'new', uses: 'home@storeForm'}
	},
	{
		get: {url: "/email", middleware: [], as: 'email.test', folder: 'site', uses: 'home@email'}
	},
	{
		group: {
			options: {prefix: '/secure', middleware: [], folder: 'site'},
			methods: [
				{
					get: {url: '/gerimis', middleware: [], as: 'site.home.secure', uses: 'home@test'}
				}
			]
		}
	}
];