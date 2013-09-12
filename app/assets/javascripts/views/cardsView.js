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
		"click button.close": "hideCardTitleForm",
		"click button.add-due-date-btn": "toggleDateInput",
		"submit .due-date-form": "saveDate",
		"click .remove-date": "removeDate"
	},

	colorDate: function() {
		var that = this;
  	that.$("#" + that.model.id + ".due-date-body").removeClass("red");
  	that.$("#" + that.model.id + ".due-date-body").removeClass("green");
  	that.$("#" + that.model.id + ".due-date-body").removeClass("yellow");
  	// if ()
	},

	removeDate: function(event) {
		console.log("removing date");
		// debugger
		this.$("input#datepicker" + this.model.id).val("");
	},

	saveDate: function(event) {
		event.preventDefault();

		var that = this;
    var formData = $(event.currentTarget).serializeJSON();
    var stringDate = formData.card.due_date
    formData.card.due_date = Date.parse(formData.card.due_date);

    var card = new T.Models.Card(formData.card);
    console.log(card.get("due_date"));
    if (!card.get("due_date")) { 
    	card.due_date = null; 
    	that.$("#" + that.model.id + ".due-date-body").addClass("hide");
    	that.$("#" + that.model.id + ".remove-date").addClass("hide");
    	console.log("blank");
    	console.log(that.$("#" + that.model.id + ".due-date-body"));
    } else {
    	that.$("#" + that.model.id + ".due-date-body").removeClass("hide");
    	that.$("#" + that.model.id + ".remove-date").removeClass("hide");
    	console.log("not blank");
    	console.log(that.$("#" + that.model.id + ".due-date-body"));
    }
    card.save({}, {
    	success: function(resp) {
    		console.log("good");
    		console.log(resp);
    	},
    	error: function(resp) {
    		console.log("bad");
    	}
    });

    that.$("#" + that.model.id + ".due-date-body").text("Due Date: " + stringDate);

		that.toggleDateInput(event);
	},

	toggleDateInput: function(event) {
		$("#" + event.target.id + ".add-due-date-btn").toggleClass("hide");
    $("#" + event.target.id + ".date-input").toggleClass("hide");
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

		// convert integer version of date into human readable version
		if (that.model.get("due_date")) {
			var due_date = (new Date(that.model.get("due_date"))).toDateString();
		} else {
			var due_date = "";
		}

		var renderedContent = JST["cards/card"]({
			card: that.model,
			due_date: due_date
		});

    that.$el.html(renderedContent);

    that.$( "#datepicker" + that.model.id ).datepicker({
      dateFormat: "D M d yy"
    });

    return that;
	}
});
