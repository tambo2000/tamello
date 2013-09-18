T.Views.Comment = Backbone.View.extend({

	tagName: "li",

	className: "comment",

	id: function() {
		return this.model.id
	},

	initialize: function() {

	},

	events: {
		"mouseenter": "showDeleteButton",
		"mouseleave": "hideDeleteButton",
	},

	showDeleteButton: function(event) {
		var that = this;
		console.log("showing delete");
		that.$(".comment-delete").addClass("visible", 200);
	},

	hideDeleteButton: function(event) {
		var that = this;
		console.log("hiding delete");
		that.$(".comment-delete").removeClass("visible", 200);
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