var PhoneBookRowView = Backbone.View.extend({
    tagName: "li",
    className: "contact-row row",
    events: {
    },
    render: function () {
        return $(this.el).html(new EJS({url: '/js/templates/bookRow.ejs'}).render());
    }
})
