//五子棋对象
function xuanran() { //整个棋盘的控制

    this.qipannum = 15; //棋盘行列数
    this.qipamdome = []; //这里放15*15个小方块div;
    this.role = 0; //0是白，1是黑
    this.data = new Array(15); //二维数组，存放每一个棋子的信息,信息是一个json
    this.stutus = 0; //0正在下棋，1是白棋胜，2是黑棋胜，3是平局
}

//在函数的外部为类的属性添加函数，就要用prototype
xuanran.prototype.begin = function() { //开始函数,创造15*15个 div
    var _this = this; //如果不设置这个，定义的构造函数的this级不会指向这里
    for (var i = 1; i <= 15 * this.qipannum; i++) { //创建div,这个是1是为了计算行列值方便
        var a = document.createElement("div");
        a.setAttribute("data", i);
        a.className = "qizi";
        document.getElementById('qipan').appendChild(a); //把div放进棋盘div里

        //为data二维数组数据初始化
        _this.initshuzu();


        a.addEventListener('click', function(ev) { //给容器增加事件响应函数，每一个div都有这个响应函数。点击一下就是下一步棋
            var target = ev.target; //目标对象DOM
            //下一步棋

            var y = _this.location(ev).y,
                x = _this.location(ev).x;
            if (_this.data[y][x].qizicontion == 0) {
                if (_this.role == 0) //白棋
                {
                    target.style.background = 'aliceblue'; //让这个棋子的颜色显示出来
                    _this.role = 1;
                    _this.data[y][x].qizicontion = 1; //表示白色

                } else {
                    target.style.background = 'black';
                    _this.role = 0;
                    _this.data[y][x].qizicontion = 2; //表示黑色
                }

            }

            //判断输赢
            _this.panduanshuying();

        }, false); //为棋子增加事件监听函数
    }

    _this.qipamdome = document.getElementsByClassName('qizi'); //把所有棋子div放进棋子数据结构内

}


xuanran.prototype.location = function(ev) { //给出div的dom对象，判断出这个div的x，y坐标。行列都取决于这个
    var _this = this; //这个必须要设置，在别的函数调用该函数的时候，_this还是指向的对象
    var target = ev.target;
    var data = target.getAttribute('data'); //获取到第N个div
    var y = Math.ceil(data / 15); //表示第y行
    var x = (data % 15); //表示列
    if (x == 0) x = 15;
    return { y: y - 1, x: x - 1 }; //返回一个json，包括div的x，y坐标
}

xuanran.prototype.initshuzu = function() { //初始化数组
    var _this = this;
    for (var i = 0; i < 15; i++) { //每一行y
        _this.data[i] = new Array();
        for (var ii = 0; ii < 15; ii++) { //每一列x
            _this.data[i][ii] = { qizicontion: 0 }
        } //每个元素代表一个棋子,0是没有下棋，1是白棋，2是黑棋
    }

}



xuanran.prototype.showend = function() { //显示输赢结果
        var _this = this;
        if (_this.stutus === 1) { alert("白棋胜");_this.restart(); } else if (_this.stutus === 2) { alert("黑方胜");_this.restart(); } else if (_this.stutus === 3) { alert("平局") }
    } //这样他们只能显示第一种情况，后面继续操作会不被显示



xuanran.prototype.panduanshuying = function() { //判断输赢
    var _this = this;

    var bai = 1,
        hei = 1; //初始临时变量



    //先竖直判断

    for (var i = 0; i < _this.qipannum; i++) { //列
        for (var q = 0; q < _this.qipannum - 4; q++) { //行遍历量，放第二级,减4最后留出五个做判断
            if (_this.data[q][i].qizicontion == 1 && _this.data[q + 1][i].qizicontion == 1 &&
                _this.data[q + 2][i].qizicontion == 1 && _this.data[q + 3][i].qizicontion == 1 && _this.data[q + 4][i].qizicontion == 1) { //直接判断有没有连续的五个在一起

                bai = 5;

            }
            if (_this.data[q][i].qizicontion == 2 && _this.data[q + 1][i].qizicontion == 2 && _this.data[q + 2][i].qizicontion == 2 &&
                _this.data[q + 3][i].qizicontion == 2 && _this.data[q + 4][i].qizicontion == 2) {
                hei = 5;
            }
        }
    }

    //判断竖直
    for (var i = 0; i < _this.qipannum; i++) { //行遍历量
        for (var q = 0; q < _this.qipannum - 4; q++) { //列
            if (_this.data[i][q].qizicontion == 1 && _this.data[i][q + 1].qizicontion == 1 &&
                _this.data[i][q + 2].qizicontion == 1 && _this.data[i][q + 3].qizicontion == 1 && _this.data[i][q + 4].qizicontion == 1) { //直接判断有没有连续的五个在一起

                bai = 5;

            }
            if (_this.data[i][q].qizicontion == 2 && _this.data[i][q + 1].qizicontion == 2 && _this.data[i][q + 2].qizicontion == 2 &&
                _this.data[i][q + 3].qizicontion == 2 && _this.data[i][q + 4].qizicontion == 2) {
                hei = 5;
            }
        }
    }
    //右上斜
    for (var i = 4; i < _this.qipannum; i++) { //起始的行，从上往下,从第4行开始这个斜行才有五个棋子,
        //行是先最大，后小。列是先最小，再最大
        for (var hang = i, lie = 0; hang >= 0 + 4, lie < i - 3; hang--, lie++) {
            if (_this.data[hang][lie].qizicontion == 1 && _this.data[hang - 1][lie + 1].qizicontion == 1 && _this.data[hang - 2][lie + 2].qizicontion == 1 &&
                _this.data[hang - 3][lie + 3].qizicontion == 1 && _this.data[hang - 4][lie + 4].qizicontion == 1)
                bai = 5;
            if (_this.data[hang][lie].qizicontion == 2 && _this.data[hang - 1][lie + 1].qizicontion == 2 && _this.data[hang - 2][lie + 2].qizicontion == 2 &&
                _this.data[hang - 3][lie + 3].qizicontion == 2 && _this.data[hang - 4][lie + 4].qizicontion == 2)
                hei = 5;
        };
        //上面是上部分，下面是下部分
        for (var hang = i - 4, lie = _this.qipannum - 1; hang < _this.qipannum - 4; hang++, lie--) {
            if (_this.data[hang][lie].qizicontion == 1 && _this.data[hang + 1][lie - 1].qizicontion == 1 && _this.data[hang + 2][lie - 2].qizicontion == 1 &&
                _this.data[hang + 3][lie - 3].qizicontion == 1 && _this.data[hang + 4][lie - 4].qizicontion == 1)
                bai = 5;
            if (_this.data[hang][lie].qizicontion == 2 && _this.data[hang + 1][lie - 1].qizicontion == 2 && _this.data[hang + 2][lie - 2].qizicontion == 2 &&
                _this.data[hang + 3][lie - 3].qizicontion == 2 && _this.data[hang + 4][lie - 4].qizicontion == 2)
                hei = 5;

        }
    }
    //右下斜
    for (var i = 0; i < _this.qipannum - 4; i++) //起始的行
    {
        for (var hang = i, lie = 0; hang < _this.qipannum - 4, lie < 14 - i - 3; hang++, lie++) {
            if (_this.data[hang][lie].qizicontion == 1 && _this.data[hang + 1][lie + 1].qizicontion == 1 && _this.data[hang + 2][lie + 2].qizicontion == 1 &&
                _this.data[hang + 3][lie + 3].qizicontion == 1 && _this.data[hang + 4][lie + 4].qizicontion == 1)
                bai = 5;
            if (_this.data[hang][lie].qizicontion == 2 && _this.data[hang + 1][lie + 1].qizicontion == 2 && _this.data[hang + 2][lie + 2].qizicontion == 2 &&
                _this.data[hang + 3][lie + 3].qizicontion == 2 && _this.data[hang + 4][lie + 4].qizicontion == 2)
                bai = 5;
        }
        for (var hang = i + 4, lie = _this.qipannum - 1; hang > 3; hang--, lie--) {
            if (_this.data[hang][lie].qizicontion == 1 && _this.data[hang - 1][lie - 1].qizicontion == 1 && _this.data[hang - 2][lie - 2].qizicontion == 1 &&
                _this.data[hang - 3][lie - 3].qizicontion == 1 && _this.data[hang - 4][lie - 4].qizicontion == 1)
                bai = 5;
            if (_this.data[hang][lie].qizicontion == 2 && _this.data[hang - 1][lie - 1].qizicontion == 2 && _this.data[hang - 2][lie - 2].qizicontion == 2 &&
                _this.data[hang - 3][lie - 3].qizicontion == 2 && _this.data[hang - 4][lie - 4].qizicontion == 2)
                hei = 5;
        }
    }



    // if (_this.data[0][0].qizicontion != 0 && _this.data[1][0].qizicontion != 0) bai = 5;

    //后判断
    if (bai == 5) {
        _this.stutus = 1;
        _this.showend();
    }
    if (hei == 5) {
        _this.stutus = 2;
        _this.showend();
    }

}

xuanran.prototype.restart=function () {
    //刷新棋盘
    var _this = this;

    for (var w=0;w<_this.qipamdome.length;w++) {
        var a = _this.qipamdome[w];
        a.style.background='none';
    }

    for(var hang=0;hang<15;hang++)//数据消失
        for(var lie=0;lie<15;lie++)
            _this.data[hang][lie].qizicontion=0;

}