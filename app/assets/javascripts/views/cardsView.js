T.Views.Card = Backbone.View.extend({

	className: "card",

	id: function() {
		return "" + this.model.id;
	},

  initialize: function() {
      // this.listenTo(this.model, 'change', this.render());
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
