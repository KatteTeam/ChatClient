var Client = (function (io) {
    var config = {
        env: 'pro', //环境 dev --开发环境  pro --正式环境
        dev_connect: 'http://localhost:3000',
        pro_connect: 'http://120.24.162.247:3001'
    }

    function Client(event) {
        var connect = config.env + "_connect";
        var socket = io.connect(config[connect]);

        //默认事件
        var Event = {
            login: (event && event.login) || function () { },
            logout: (event && event.logout) || function () { },
            setUser: (event && event.setUser) || function () { },
            client_msg: (event && event.client_msg) || function () { }
        }

        //有人登陆
        socket.on("login", function (data) {
            Event.login(data);
        });

        //有人退出
        socket.on("logout", function (data) {
            Event.logout(data);
        })

        //设置个人信息
        socket.on("setUser", function (data) {
            Event.setUser(data);
        });

        //接收信息
        socket.on("client_msg", function (data) {
            Event.client_msg(data);
        });

        this.socket = socket;
    }

    Client.prototype.login = function (user) {
        this.socket.emit('login', user);
    }

    Client.prototype.send = function (message) {
        this.socket.emit('server_msg', { msg: message });
    }
    return Client;
})(io);