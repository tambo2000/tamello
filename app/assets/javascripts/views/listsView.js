T.Views.List = Backbone.View.extend({

	tagName: "td",

	id: function() {
		return "" + this.model.id;
	},

	initialize: function() {
    var that = this;
		//this.listenTo(this.model, 'change', this.render());
    //that.listenTo(that.collection, 'change', that.render());
    // that.listenTo($(window), 'resize', that.doResize());
	},

	events: {
		"submit form#new_card_form": "createCard"
	},

  // doResize: function() {
  //   var that = this;

  //   debugger

  //   that.$(".connectedListSortable").css("max-height", ($(window).height()-220) + "px");
  // },

	render: function() {
		var that = this;

		var renderedContent = JST["lists/list"]({
			list: that.model
		});

    that.$el.html(renderedContent);

		that.collection.each(function(card) {
			var cardView = new T.Views.Card({
				model: card
			})
			that.$(".connectedListSortable").append(cardView.render().$el);
		});
		
    that.$("div.cards" + that.model.id).sortable({
      placeholder: "card card_placeholder",
      connectWith: ".connectedListSortable",
      opacity: 0.6,
      revert: 200,
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
      }
    });

    return that;
	},

	createCard: function (event) {
    event.preventDefault();

    var that = this;

    $('#myModal' + that.model.id).modal('hide');
    $('.modal-backdrop').remove();

    var formData = $(event.currentTarget).serializeJSON();
    
    var card = new T.Models.Card(formData.card);

    that.collection.add(card);
    
    card.save();

    that.render();
  }
});


