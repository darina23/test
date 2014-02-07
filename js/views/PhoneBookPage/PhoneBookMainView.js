var PhoneBookMainView = Backbone.View.extend({
    tagName: "div",
    className: "container-fluid",
    events: {
    },
    render: function () {
        return $(this.el).html(Views.bookList.render())
    }
});