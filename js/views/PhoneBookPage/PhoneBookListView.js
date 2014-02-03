var PhoneBookListView = Backbone.View.extend({
    tagName: "ul",
    className: "contact-list",
    events: {
        dblclick : "showAddContactForm"
    },
    render: function () {
        Views.bookRow.render()
    },
    showAddContactForm : function () {

    }
});