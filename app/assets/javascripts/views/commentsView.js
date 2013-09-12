T.Views.Comment = Backbone.View.extend({

	tagName: "li",

	className: "comment",

	initialize: function() {
	},

	events: {
	},

	render: function() {
		var that = this;

		var renderedContent = JST["comments/comment"]({
			comment: that.model
		});

		that.$el.html(renderedContent);

		return that;
	}

});