var app = {
    initialize:function () {
        this.bindEvents();
    },

    bindEvents:function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady:function () {
        app.login('deviceready');
    },

    login:function () {
        console.log("ready to login");
        var alertMessage = $('#alert'),
            alertTemplate = $('#tpl-alert').html(),
            username,
            password,
            checkUser = function (username, password) {
                //用户名和密码合法，则向服务器发起验证请求
                console.log('ready to verify ' + username + '||' + password);

                //jQuery允许跨域访问
                jQuery.support.cors = true;
                $.ajax({
                    "type":"get",
                    "dataType":'json',
					url: 'http://localhost:8099/StuClientLoginServlet?username=' + username + '&password=' + password,
                    data: 'username=' + username + '&password=' + password,
                    "success": function (data) {
                        var result = data.result;
                        console.log("reply from server is " + result);
                        if (data.result == 'success') {
                            //认证成功，将密码和用户名存储到本地数据库
                            var newUser = new Object();
                            newUser.username = username;
                            newUser.password = password;
                            window.localStorage.setItem('user', JSON.stringify(newUser));

                            location.href = "ad.html";
                        } else {
                            alertMessage.append(Mustache.to_html(alertTemplate, {
                                message:result
                            }));
                        }
                    },
                    "error":function (jqXHR, textStatus, errorThrown) {
						console.log("login error " + textStatus + "||" + errorThrown);
//                        window.location.href = "schoolNews.html";
                        alertMessage.append(Mustache.to_html(alertTemplate, {
                            message: "Something is wrong! Maybe it is the connection : " + arguments[1]
                        }));
                    }
                });
            };



        //判断数据库中是否存储了用户名和密码
        var user = window.localStorage.getItem('user');
        if (user != null) {
            var userInfo = JSON.parse(user);
            username = userInfo.username;
            password = userInfo.password;
            console.log("user in local storage is " + username);

            checkUser(username, password);
        } else {
            $('#login').click(function (event) {
                event.preventDefault();

                var username = $('#username').val(),
                    password = $('#password').val();
                if (username === '') {
                    console.log("username is null");

                    alertMessage.append(Mustache.to_html(alertTemplate, {
                        message:'请输入用户名'
                    }));

                } else if (password === '') {
                    console.log("password is null");

                    alertMessage.append(Mustache.to_html(alertTemplate, {
                        message:'请输入密码'
                    }));

                } else {
                    checkUser(username, password);
                }
            });
        }
    }
};
