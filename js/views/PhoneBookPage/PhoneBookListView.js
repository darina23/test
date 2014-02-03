var PhoneBookListView = Backbone.View.extend({
    tagName: "ul",
    className: "contact-list",
    events: {
        "click .contact-row" : "showAddContactForm"
    },
    render: function () {
        return $(this.el).html(Views.bookRow.render())
    },
    showAddContactForm : function () {
        document.controller.navigate('book/create', {trigger: true});
    }
});