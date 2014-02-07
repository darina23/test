var PhoneBookListView = Backbone.View.extend({
    tagName: "div",
    className: "contact-list",
    events: {
        "dblclick .contact-create-row" : "showAddContactForm",
        "dblclick .contact-update-row .contact-name" : "showUpdateContactForm",
        "dblclick .contact-update-row .contact-number" : "showUpdateContactForm",
        "click .contact-update-row" : "selectRow",
        "click .contact-update-row .contact-remove" : "deleteContactRow"
    },
    render: function () {
        var self = this;
        $(self.el).html('');
        if (Contacts.length) {
                Contacts.forEach(function(value){
                $(self.el).append(new EJS({url: '/templates/bookRow.ejs'}).render({data: value}));
            });
        }
        $(self.el).append(new EJS({url: '/templates/bookRow.ejs'}).render({data: false}));
        return self.el;
    },
    showAddContactForm : function () {
        document.controller.navigate('book/create', {trigger: true});
    },
    showUpdateContactForm : function (event) {
        var self = this,
            targetElement = $(event.currentTarget).parent(),
            rowId = targetElement.data('id');
        targetElement.removeClass('selected-contact');
        document.controller.navigate('book/update/' + rowId, {trigger: true});
    },
    deleteContactRow: function (event){
        var self = this,
            rowId = $(event.currentTarget).parent().data('id');
            Contacts.get(rowId).removeContact();
    },
    selectRow: function (event) {
        var self = this,
            previousElement = $(self.el).find('.selected-contact'),
            currentElement = $(event.currentTarget);
        previousElement.find('.contact-remove').addClass('hide');
        previousElement.removeClass('selected-contact');
        if(!currentElement.find('input').length){
            currentElement.find('.contact-remove').removeClass('hide');
            currentElement.addClass('selected-contact');
        }
    }
});