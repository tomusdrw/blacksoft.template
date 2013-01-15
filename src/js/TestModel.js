define(['backbone', '_'], function(Backbone, _) {
	window.console.log(_.range(0, 10));
	var TestModel = Backbone.Model.extend({
		square : function(x) {
			return x * x;
		},
		greet : function() {
			window.alert("Hello world!");
		}
	});

    return TestModel;
});
