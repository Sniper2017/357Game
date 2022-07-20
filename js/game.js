var game = function (playerNum) {
    this.initStep();
    this.initUser(playerNum);
    this.initData();
    return this;
};

// //游戏初始化
// game.prototype.init = function (playerNum) {

// };

//初始化步骤
game.prototype.initStep = function () {
    this.step = 0;
};

//初始化用户
game.prototype.initUser = function (playerNum) {
    let userData = [];
    for (let i = 1; i <= playerNum; i++) {
        let key = 'user' + i;
        let obj = {
            name: key,
            selected: [],
        };
        userData.push(obj);
    }
    this.userData = userData;
};

//初始化数据
game.prototype.initData = function () {
    let numArr = [3, 5, 7];
    let index = 1;
    let data = [];
    let sum = 0;
    for (let i = 0; i < numArr.length; i++) {
        let num = numArr[i];
        sum += num;
        data[i] = [];
        for (let n = 0; n < num; n++) {
            let obj = {};
            //序号
            obj.index = index;
            //所在行序号
            obj.rowIndex = i;
            data[i].push(obj);
            index++;
        }
    }
    this.data = data;
    this.sum = sum;
};

//选择标签
game.prototype.select = function () {
    //剩余个数小于等于1，胜负已分
    if (this.sum <= 1) return -1;
    let data = this.data;
    let row = this.randomRow();
    if (data[row].length > 0) {
        let selectArr = this.randomColumns(data[row].length, row);
        return {
            row: row,
            selectArr,
        };
    } else {
        this.select();
    }
};

//选择行
game.prototype.randomRow = function () {
    let data = this.data;
    return Math.floor(Math.random() * data.length);
};

//选择列
game.prototype.randomColumns = function (columnLength, row) {
    //选取次数随机
    let times = Math.ceil(Math.random() * columnLength);
    let selectArr = [];
    for (let i = 0; i < times; i++) {
        let index = Math.floor(Math.random() * columnLength);
        let select = this.data[row].splice(index, 1);
        selectArr.push(select[0].index);
        columnLength--;
        this.sum--;
    }
    if (columnLength == 0) this.data.splice(row, 1);
    return selectArr;
};
