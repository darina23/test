var PhoneBookCreateView = Backbone.View.extend({
    tagName: "div",
    events: {
        'click #submitContact': "addContact"
    },
    render: function () {
        return $(this.el).html(new EJS({url: '/js/templates/bookForm.ejs'}).render());
    },
    addContact: function () {
        var self = this
            , name = $('#userName').val()
            , number = $('#phone').val()
            , errorContainer = $("#dangerMessage")
            , bookModel = new BookModel();
        if(self.validation(name, number)){
            bookModel.set({name:number, number:number});
            bookModel.addNumber();
        }
    },
    validation: function(name, number){
        return true;
//        var regEmail = /^\w+@\w+\.\w{2,4}$/i;
//        if(regEmail.test(number) && name.length){
//            return true;
//        } else {
//            $("#dangerMessage").removeClass('hide');
//        }
//        return false;
    }
});
