T.Views.List = Backbone.View.extend({

	tagName: "td",

  className: "listCell",

  dragged: false,

	id: function() {
		return "" + this.model.id;
	},

	initialize: function() {
    var that = this;

		//this.listenTo(this.model, 'change', this.render());
    // that.listenTo(that.collection, 'change', that.render());
    // that.listenTo($(window), 'resize', that.doResize());
	},

	events: {
    "submit form.new_card_form": "createCard",
    "click button.delete-card": "deleteCard",
    "click button.delete-list": "deleteList",
    "mouseenter .new_card_div": "showNewCardInput",
    "mouseleave .new_card_div": "hideNewCardInput",
    // "mouseleave .new_card_form": "hideNewCardInput",    
    // "click a.dropdown-toggle": "dropdownToggle",
    // "mouseleave div.listMenu": "dropdownToggle"
	},

  showNewCardInput: function(event) {   
    // $("#" + event.target.id + ".new_card_form").clearQueue();
    $("#" + event.target.id + ".new_card_link").finish();
    $("#" + event.target.id + ".new_card_form").show(400);
    $("#" + event.target.id + ".new_card_link").hide(400);
    $("#" + event.currentTarget.id + ".form-control").focus();
  },

  hideNewCardInput: function(event) {
    $("#" + event.currentTarget.id + ".new_card_form").finish();
    // $("#" + event.currentTarget.id + ".new_card_link").clearQueue();
    $("#" + event.currentTarget.id + ".new_card_form").hide(400);
    $("#" + event.currentTarget.id + ".new_card_link").show(400);
    $("#" + event.currentTarget.id + ".form-control").val("");
  },

  dropdownToggle: function(event) {
    console.log("clicked");
    var that = this;
    that.$("#" + event.currentTarget.id + ".dropdown-toggle").dropdown('toggle');
  },

  deleteList: function(event) {
    var that = this;
    that.$el.toggle( "drop", {direction: "down"} , 400, function() {
      that.model.destroy();
      that.remove();
      $('.modal-backdrop').remove();
    });
  },

  deleteCard: function(event) {
    event.preventDefault();
    var that = this;
    var card = that.collection.get(event.currentTarget.id);
    that.$("#" + event.currentTarget.id + ".card").toggle( "drop", {direction: "left"} , 400, function() {
      card.destroy();
      that.render();
      that.updatePositions();
      $('.modal-backdrop').remove();
    });
  },

	render: function() {
		var that = this;

		var renderedContent = JST["lists/list"]({
			list: that.model,
      listMinWidth: listMinWidth(),
      listMaxWidth: listMaxWidth(),
      listMaxHeight: listMaxHeight()
		});

    that.$el.html(renderedContent);

		that.collection.each(function(card) {
			var cardView = new T.Views.Card({
				model: card
			})
			that.$(".connectedListSortable").append(cardView.render().$el);
		});
		
    that.$("div.cards" + that.model.id).sortable({
      forcePlaceholderSize: true,
      placeholder: "card card_placeholder",
      connectWith: ".connectedListSortable",
      opacity: 0.6,
      revert: 200,
      start: function(event, ui) {
        ui.placeholder.css("width", ui.item.width() + 3 + "px");
        ui.placeholder.css("height", ui.item.height() + 4 + "px");
      },
      remove: function(event, ui) {
        var removedCard = new T.Models.Card();
        removedCard.set({id: parseInt(ui.item[0].attributes.id.nodeValue)});
        that.collection.remove(removedCard);
      },
      receive: function(event, ui) {
        var addedCard = new T.Models.Card();
        addedCard.set({id: parseInt(ui.item[0].attributes.id.nodeValue)});
        that.collection.add(addedCard);
      },
      update: function(event, ui) {
        that.updatePositions();
      }
    });
    that.delegateEvents();
    return that;
	},

  updatePositions: function() {
    var that = this;
    // return array of card ids in correct order
    var sortedIDsArr = that.$("div.cards" + that.model.id).sortable( "toArray" );
    sortedIDsArr = _.map(sortedIDsArr, function(ID) {
      return parseInt(ID);
    });

    // update position attribute of each card and save to server
    that.collection.each( function(card) {
      card.set("list_id", that.model.id);
      card.set("position", _.indexOf(sortedIDsArr, card.id) );
      card.save();
    });
  },

	createCard: function (event) {
    event.preventDefault();
    var that = this;
    var formData = $(event.currentTarget).serializeJSON();
    var card = new T.Models.Card(formData.card);
    var tempCard = card.clone();
    tempCard.id = "temp";
    var comments = new T.Collections.Comments();

    // display a temporary card so app feels snappy
    var tempCardView = new T.Views.Card({
      model: tempCard,
      collection: comments
    })
    that.$(".connectedListSortable").append(tempCardView.render().$el);
    that.$("#temp.card").css( "display", "none");
    that.$("#temp.card").toggle( "drop", {direction: "left"} , 400);

    // don't allow blank cards
    if (card.get("title") !== "") {
      that.collection.add(card);
      card.save({}, {
        success: function(resp) {
          console.log("successful card save");
          
          var cardView = new T.Views.Card({
            model: card,
            collection: comments
          });

          // give time for animation to finish before replacing temporary card with real card
          setTimeout(function() {
            that.$("#temp.card").replaceWith(cardView.render().$el);
          }, 800);
        },
        error: function(resp) {
          console.log("bad card save");
        }
      });

      // clear input field
      event.currentTarget.children[1].value = "";
    } else {
      console.log("blank card");
      $("#" + event.target.id + ".list").effect( "shake" );
      $("input.form-control").focus();
    }
  }
});




