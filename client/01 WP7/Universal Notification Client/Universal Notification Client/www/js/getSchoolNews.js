var getSchoolNews = {
    initialize:function () {
        this.bindEvents();
    },

    bindEvents:function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady:function () {
        getSchoolNews.getNews();
    },

    getNews:function () {
        console.log("ready to load the school news");
        var alertMessage = $('#alert'),
            singleNewsPos = $('#newsList'),
            unreadNewsPos = $('#unreadNewsList'),
            alertSuccessTemplate = $('#tpl-alert-success').html(),
            alertErrorTemplate = $('#tpl-alert-error').html(),
            singleNewsTpl = $('#tpl-single-news').html(),
            user = window.localStorage.getItem('user'),
            userInfo = JSON.parse(user),
            username = userInfo.username,
            localNewsList,
            i,
            singleNews,
            MAXNEWS = 10,
            currentID = 1;

        username = '1000004205';    //调试方便
//    //读取数据库中的历史信息，按顺序展示出来
        var currentID = localStorage.getItem("currentSchoolNewsID");
        if (currentID == null) {
            localStorage.setItem("currentSchoolNewsID", 1);
            currentID = 1;
        }

        showLocalSchoolNews();

        //判断是否联网
        var connectionStatus = checkConnection();
        if (connectionStatus === 'No network connection') {
            alertMessage.append(Mustache.to_html(alertErrorTemplate, {
                message:'⊙﹏⊙ 貌似没联网？ 不过您仍然可以查看历史信息'
            }));
        } else {
            alertMessage.append(Mustache.to_html(alertSuccessTemplate, {
                message:'网络正常，正在努力下载新消息，请耐心等待'
            }));

            //如果联网了就发起ajax请求，参数为用户名。
            jQuery.support.cors = true;
            $.ajax({
                type: 'get',
                url: 'http://localhost:8099/StuGetNewsServlet?username=' + username,
                dataType:'json',
                success: function (data) {
                    // 服务器返回JSON格式的消息列表
                    for (i = 0; i < data.length; i++) {
                        //写入数据库
                        addNewsToLocal(data[i].title, data[i].content);
                        //显示新消息
                        var singleNewsHTML = Mustache.render(singleNewsTpl, {
                            "isNew":true,
                            "title": data[i].title.substring(0, 25)
                        });
                        unreadNewsPos.append(singleNewsHTML);
                    }

                    alertMessage.append(Mustache.to_html(alertSuccessTemplate, {
                        message:'消息加载完毕，一共有新消息' + data.length + '条'
                    }));
                },
                error:function () {
                    console.log("Oops，貌似出错了，是不是没联网？专业的错误信息： " + arguments[1]);
                }
            });
        }

        function checkConnection() {
            var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN] = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI] = 'WiFi connection';
            states[Connection.CELL_2G] = 'Cell 2G connection';
            states[Connection.CELL_3G] = 'Cell 3G connection';
            states[Connection.CELL_4G] = 'Cell 4G connection';
            states[Connection.NONE] = 'No network connection';

            console.log('Connection type: ' + states[networkState]);
        }

        function getSchoolNewsIDArray() {
            var ids = localStorage.getItem("schoolNewsIDs"),
                idStrArray;

            if (ids != null) {
                idStrArray = ids.split(",");
            }
            return idStrArray;
        }

        function addCurrentSchoolNewsID() {
            var currentID = localStorage.getItem("currentSchoolNewsID");
            var currentIDInt = parseInt(currentID) + 1;

            localStorage.setItem("currentSchoolNewsID", currentIDInt);
        }

        function showLocalSchoolNews() {
            var IDArray = getSchoolNewsIDArray();

            if (IDArray != null) {
                for (var j = IDArray.length - 1; j > 0; j--) {
                    var theId = IDArray[j];
                    var objStr = localStorage.getItem(theId);
                    if (objStr != null) {
                        var objField = objStr.split("|");
                        var singleNewsHTML = Mustache.render(singleNewsTpl, {
                            "isNew":false,
                            "title":objField[0].substring(0, 25),
                            "url":"content.html#" + theId
                        });
                        singleNewsPos.append(singleNewsHTML);
                    }
                }
            }
        }

        function addNewsToLocal(title, content) {
            var id = localStorage.getItem("currentSchoolNewsID");
            window.localStorage.setItem(id, title + "|" + username + "|" + content);
            var ids = localStorage.getItem("schoolNewsIDs");
            if (ids != null) {
                ids += "," + id;
            } else {
                ids = id;
            }
            localStorage.setItem("schoolNewsIDs", ids);
            addCurrentSchoolNewsID();
        }
    }
};