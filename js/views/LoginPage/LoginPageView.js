var LoginPageView = Backbone.View.extend({
    tagName: "div",
    className: "formContainer text-center",
    events: {
        "click #submitLogin": "login"
    },
    render: function () {
        return $(this.el).html(new EJS({url: '/templates/loginForm.ejs'}).render());
    },
    login: function () {
        var self = this
            , email = $('#email').val()
            , pwd = $('#password').val()
            , errorContainer = $("#validationEmail")
            , userModel = new UsersModel();
        if(self.validation(email, pwd)){
            userModel.set({useremail:email, userpwd:pwd})
            userModel.signIn(errorContainer)
        }
    },
    validation: function(email, pwd){
        var regEmail = /^\w+@\w+\.\w{2,4}$/i.test(email);
        if(regEmail && pwd.length){
            return true;
        } else {
            if(!regEmail){
                $("#validationEmail").html(ValidateMessages.emailFormat);
            }
            if(!pwd.length){
                $("#validationPassword").html(ValidateMessages.passwordEmpty);
            }
        }
        return false;
    }
});
