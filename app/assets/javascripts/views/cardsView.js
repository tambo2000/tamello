T.Views.Card = Backbone.View.extend({

	className: "card",

	initialize: function() {
      // this.listenTo(this.model, 'change', this.render());
    this.oneDay = 24*60*60*1000;
		this.today = new Date();
		this.daysLeft = function() {
			return ((this.model.get("due_date") - this.today) / this.oneDay);
		}
		this.collection = new T.Collections.Comments();
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
		"click .remove-date": "removeDate",
		"mouseenter .modal-footer": "showModalFooter",
		"mouseleave .modal-footer": "hideModalFooter",
		"submit .new-comment-form": "createComment",
		"click a.comment-delete": "deleteComment"
	},

	deleteComment: function(event) {
		var that = this;

		var comment = that.collection.get(event.target.id);
		comment.destroy();
		that.$("#" + event.target.id + ".comment").remove();
		that.displayComments();
	},

	createComment: function(event) {
		event.preventDefault();
    var that = this;
    var formData = $(event.currentTarget).serializeJSON();
    var comment = new T.Models.Comment(formData.comment);

    // don't allow blank comments
    if (comment.get("body") !== "") {
      // that.collection.add(comment);
      comment.save({}, {
        success: function(resp) {
          console.log("successful comment save")
          var commentView = new T.Views.Comment({
            model: comment
          })
          that.$(".comment-list").append(commentView.render().$el);
          that.$(".card-comment").val("");
          that.$(".card-comment").focus();
          // debugger
          that.collection.add(comment);
          that.displayComments();
        },
        error: function(resp) {
          console.log(resp);
        }
      });
    } else {
      $("#" + event.target.id + ".new-comment-form").effect( "shake" );
      $("input.form-control").focus();
    }
	},

	displayComments: function() {
		var that = this;
		console.log("displaying comments");
		if (that.collection.size() === 0) {
			that.$(".card-comment-icon-front").addClass("hide");
		} else {
			that.$(".card-comment-icon-front").removeClass("hide");
			that.$("div.comment-count").text(that.collection.size());
		}
	},

	test: function(event) {
		console.log("testing");
	},

	showModalFooter: function(event) {
		var that = this;
		console.log("entering");
		that.$(".modal-footer-content").removeClass("hide");
		that.$(".modal-down-arrow").addClass("hide");
	},

	hideModalFooter: function(event) {
		var that = this;
		console.log("exiting");
		that.$(".modal-footer-content").addClass("hide");
		that.$(".modal-down-arrow").removeClass("hide");
	},

	colorDate: function() {
		var that = this;
		
  	that.$("#" + that.model.id + ".due-date-body").removeClass("red");
  	that.$("#" + that.model.id + ".due-date-body").removeClass("green");
  	that.$("#" + that.model.id + ".due-date-body").removeClass("yellow");
  	if (that.daysLeft() < 1) {
	  	that.$("#" + that.model.id + ".due-date-body").addClass("red");
  	} else if (that.daysLeft() < 3) {
  		that.$("#" + that.model.id + ".due-date-body").addClass("yellow");
  	} else {
  		that.$("#" + that.model.id + ".due-date-body").addClass("green");
  	}
	},

	removeDate: function(event) {
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
    		that.model = card;
				that.colorDate();
    	}
    });

    that.$("#" + that.model.id + ".due-date-body").text("" + stringDate);
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

    var comments = new T.Collections.Comments();
		comments.card_id = that.model.id;
	
		comments.fetch( { 
			success: function(resp) {
				that.collection = comments;
				comments.each( function(comment) {
					var commentView = new T.Views.Comment({
						model: comment
					})

					that.$(".comment-list").append(commentView.render().el);
				});
				that.displayComments();
			}
		});

    that.$( "#datepicker" + that.model.id ).datepicker({
      dateFormat: "D M d yy",
      onClose: function() {
      	that.showModalFooter();
      }
    });

    that.colorDate();

    return that;
	}
});
