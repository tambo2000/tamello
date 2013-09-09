T.Views.Card = Backbone.View.extend({

	className: "card",

	initialize: function() {
      // this.listenTo(this.model, 'change', this.render());
  },

	id: function() {
		return "" + this.model.id;
	},

	events: {
	},

	render: function() {
		var that = this;

		var renderedContent = JST["cards/card"]({
			card: that.model
		});

    that.$el.html(renderedContent);
    return that;
	}
});
