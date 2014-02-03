var LoginPageView = Backbone.View.extend({
    tagName: "div",
    className: "formContainer text-center",
    events: {
        "click #submitLogin": "login"
    },
    render: function () {
        return $(this.el).html(new EJS({url: '/js/templates/loginForm.ejs'}).render());
    },
    login: function (params) {
        var self = this
            , email = $('#email').val()
            , pwd = $('#password').val()
            , errorContainer = $("#dangerMessage")
            , userModel = new UsersModel();
        if(self.validation(email, pwd)){
            userModel.set({useremail:email, userpwd:pwd})
            userModel.signIn(errorContainer)
        }
    },
    validation: function(email, pwd){
        var regEmail = /^\w+@\w+\.\w{2,4}$/i;
        if(regEmail.test(email) && pwd.length){
            return true;
        } else {
            $("#dangerMessage").removeClass('hide');
        }
        return false;
    }
});
