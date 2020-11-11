var mainScreen = document.getElementById("mainScreen");
//背景移动

var jsBg1 = document.getElementById("bg1");
var jsBg2 = document.getElementById("bg2");
var timerBg = setInterval(function(){
    jsBg1.style.top = jsBg1.offsetTop + 1 + "px";
    jsBg2.style.left = jsBg2.offsetLeft + 1 + "px";
    if(jsBg1.offsetTop>=768){
        jsBg1.style.top="-768px";
    }
    if(jsBg2.offsetHeight>=768){
        jsBg2.style.height="768px";
    }
},10);


//飞机移动

//牵引
var airplane = document.getElementById("airplane");
//
airplane.addEventListener("mousedown",function(e){
    var ev = e || window.event;
    basex = ev.pageX;
    basey = ev.pageY;
    movex=0;
    movey=0;
    console.log(basex,basey);

    //增加移动
    mainScreen.addEventListener("mousemove",function(e){
        var en = e || window.event;
        movex=en.pageX-basex;
        basex=en.pageX;
        movey=en.pageY-basey;
        basey=en.pageY;
        airplane.style.left=airplane.offsetLeft + movex + "px";
        airplane.style.top=airplane.offsetTop + movey + "px";
    },false);
},false);



//发射子弹
var timerBullent = setInterval(function(){
    //创建子弹
    var bullent = document.createElement("div");
    mainScreen.appendChild(bullent);
    bullent.className="bullent";
    bullent.style.left=airplane.offsetLeft+9+"px";
    console.log(airplane.offsetLeft);
    console.log(bullent.offsetLeft);
    
    bullent.style.top=airplane.offsetTop-10+"px";

    //让子弹飞
    var timerBullentFly = setInterval(function(){
        bullent.style.top=bullent.offsetTop-30+"px";
        if(bullent.offsetTop<=20){
            clearInterval(timerBullentFly);
            mainScreen.removeChild(bullent);
        }
    },50);
    bullent.timer = timerBullentFly;
},320);


//敌人出现(
var timer = setInterval(function(){
    //创建敌人
    var tank = document.createElement("div");
    mainScreen.appendChild(tank);
    tank.className = "tank";
    //数量
    function randomNum(min,max){
        return parseInt(Math.random()*(max-min)+min);
    }
    tank.style.left = randomNum(0,472)+"px";
    tank.style.top = "0px";

    //敌人移动
    var timerTankFly = setInterval(function(){
        
        tank.style.top=tank.offsetTop+10+"px";
        if(tank.offsetTop>=768){
            clearInterval(timerTankFly);
            mainScreen.removeChild(tank);
        }
    },50);
    tank.timer = timerTankFly;
},600);

var timerPZJC=setInterval(function(){
    var allTanks = document.getElementsByClassName("tank");
    var allBUllents = document.getElementsByClassName("bullent");
    for(var i=0;i<allBUllents.length;i++){
        for(var j=0;j<allTanks.length;j++){
            var b = allBUllents[i];
            var t = allTanks[j];

            if(pzjcFunc(b,t)){
                clearInterval(b,timer);
                clearInterval(t,timer);
                mainScreen.removeChild(b);
                mainScreen.removeChild(t);
                break;
            }
        }
    }
},50);

//碰撞检测
function pzjcFunc(obj1,obj2){
    var obj1Left=obj1.offsetLeft;
    var obj1Width=obj1Left+obj1.offsetWidth;
    var obj1Top=obj1.offsetTop;
    var obj1Height=obj1Top+obj1.offsetHeight;

    var obj2Left=obj2.offsetLeft;
    var obj2Width=obj2Left+obj2.offsetWidth;
    var obj2Top=obj2.offsetTop;
    var obj2Height=obj2Top+obj2.offsetHeight;

    if(!(obj1Left > obj2Width || obj1Width < obj2Left || obj1Top > obj2Height || obj1Height < obj2Top)){
        return true;
    }else{
        return false;
    }
}

//死亡判定
var timerDie = setInterval(function(){
    var allTanks = document.getElementsByClassName("tank");
    for(var i = 0;i<allTanks.length;i++){
        if(pzjcFunc(allTanks[i], airplane)){
            for(var j = 0;j < 100; j++){
                clearInterval(j);
            }
            break;
        }
    }
},50);




