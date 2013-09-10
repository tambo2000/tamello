T.Views.Card = Backbone.View.extend({

	className: "card",

	initialize: function() {
      // this.listenTo(this.model, 'change', this.render());
  },

	id: function() {
		return "" + this.model.id;
	},

	events: {
		"click .cardTitle": "toggleCardTitleForm",
		"submit .edit_card_title_form": "editCard",
		"click .exit_edit_card_input": "toggleCardTitleForm",
		"click button.close": "hideCardTitleForm"
	},

	hideCardTitleForm: function(event) {
		$("#" + event.target.id + ".cardTitle").removeClass("hide");
    $("#" + event.target.id + ".edit_card_title_form").addClass("hide");
	},

	editCard: function(event) {
		event.preventDefault();
		var that = this;
    var formData = $(event.currentTarget).serializeJSON();
    var card = new T.Models.Card(formData.card);

    // don't allow blank cards
    if (card.get("title") !== "") {
      card.save({}, {
        success: function(resp) {
          console.log("successful card save");
          $("#" + event.target.id + ".cardTitle").text(card.get("title"));
          $("#" + event.target.id + ".show-card-link").text(card.get("title"));
          $("#" + event.target.id + ".form-control").val(card.get("title"));
          that.toggleCardTitleForm(event);
        },
        error: function(resp) {
          console.log(resp);
        }
      });

      // clear input field
      event.currentTarget.children[1].value = "";
    } else {
      $("input.form-control").focus();
    }
	},

	toggleCardTitleForm: function(event) {
		event.preventDefault();

		$("#" + event.target.id + ".cardTitle").toggleClass("hide");
    $("#" + event.target.id + ".edit_card_title_form").toggleClass("hide");
    $("input.form-control").focus();
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
