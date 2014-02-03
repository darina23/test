var PhoneBookMainView = Backbone.View.extend({
    tagName: "div",
    events: {
    },
    render: function () {
        return $(this.el).html(Views.bookList.render())
    }
});