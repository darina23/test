var PhoneBookListView = Backbone.View.extend({
    tagName: "ul",
    className: "contact-list",
    events: {
        "click .contact-row" : "showAddContactForm"
    },
    render: function () {
        var self = this;
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
    }
});