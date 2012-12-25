var getNewsContent = {
    initialize:function () {
        this.bindEvents();
    },

    bindEvents:function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady:function () {
        getNewsContent.getContent();
    },

    getContent:function () {
        var contentPos = $('#content'),
            contentTemplate = $('#tpl-content').html(),
            fromLink = window.location.href,
            newsID = fromLink.split('#')[1];
//            newsID = linkParam.split('=')[1];


        console.log("The ID of news is : " + newsID);
        getNewsContent();

        function getNewsContent() {
            var news = localStorage.getItem(newsID);
            if (news != null) {
                var newsInfo = news.split("|");
                var contentHTML = Mustache.render(contentTemplate, {
                    "title": newsInfo[0],
                    "content": newsInfo[1]
                });
                contentPos.append(contentHTML);
            }
        }
    }
};