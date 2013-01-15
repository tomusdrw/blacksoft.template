var require = {
	paths : {
		'bootstrap' : 'vendor/bootstrap-2.2.2',
		'underscore' : 'vendor/underscore-1.4.3',
		'backbone' : 'vendor/backbone-0.9.9',
		'backbone.storage' : 'vendor/backbone.webStorage'
	},
	map : {
		'*' : {
			'_' : 'underscore'
		}
	},
	shim : {
		'underscore' : {
			exports : '_'
		},
		'backbone' : {
			deps : ['underscore'],
			exports : 'Backbone'
		},
		'backbone.storage' : {
			deps : ['backbone'],
			exports : 'Backbone'
		}
	}
};
