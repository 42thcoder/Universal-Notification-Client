var getAd = {
    initialize:function () {
        this.bindEvents();
    },

    bindEvents:function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady:function () {
        $('').collapse('show')
        getAd.getAd('deviceready');
    },

    getAd:function () {
        console.log("login done");

        //判断是否联网
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

        var alertMessage = $('#alert'),
            alertSuccessTemplate = $('#tpl-alert-success').html(),
            alertErrorTemplate = $('#tpl-alert-error').html();

        alertMessage.append(Mustache.to_html(alertSuccessTemplate, {
            message:'登陆成功！'
        }));

        var connectionStatus = checkConnection();
        if (connectionStatus === 'No network connection') {
            alertMessage.append(Mustache.to_html(alertErrorTemplate, {
                message:'⊙﹏⊙ 貌似没联网？ 不过您仍然可以查看历史信息'
            }));
        } else {
            alertMessage.append(Mustache.to_html(alertErrorTemplate, {
                message:'当前的网络环境为 ' + connectionStatus
            }));
        }

        //如果联网，从服务器拉取广告
//        location.href = "schoolNews.html";
    }
};




