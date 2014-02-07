var PhoneBookListView = Backbone.View.extend({
    tagName: "ul",
    className: "contact-list",
    events: {
        "dblclick .contact-create-row" : "showAddContactForm",
        "dblclick .contact-update-row .contact-name" : "showUpdateContactForm",
        "dblclick .contact-update-row .contact-number" : "showUpdateContactForm",
        "click .contact-update-row .contact-remove" : "deleteContactRow"
    },
    render: function () {
        var self = this;
        $(self.el).html('');
        if (Contacts.length) {
                Contacts.forEach(function(value){
                $(self.el).append(new EJS({url: '/js/templates/bookRow.ejs'}).render({data: value}));
            });
        }
        $(self.el).append(new EJS({url: '/js/templates/bookRow.ejs'}).render({data: false}));
        return self.el;
    },
    showAddContactForm : function () {
        document.controller.navigate('book/create', {trigger: true});
    },
    showUpdateContactForm : function (event) {
        var self = this,
            rowId = $(event.currentTarget).parent().data('id');
        document.controller.navigate('book/update/' + rowId, {trigger: true});
    },
    deleteContactRow: function (event){
        var self = this,
            rowId = $(event.currentTarget).parent().data('id');
            Contacts.get(rowId).removeContact();
    }
});