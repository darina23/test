var PhoneBookMainView = Backbone.View.extend({
    tagName: "div",
    events: {
    },
    render: function () {
        Views.bookList.render()
    }
});