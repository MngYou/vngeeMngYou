
var vngeeMngYou = VisualNovelGameEngine = (function(){
    
    
  //创建数据
  window.vngee = [
    {
      "text":"",
      "selects":",",
      "index":0,
      "next":"",
      "name":"",
      "backgroundImage":"",
      "backgroundMusic":"",
      "characterImage":""
    }
    
  ];
  //创建游戏通用属性
  window.n = 0,window.l = 0,window.running = false,window.bgSrc = [];
  historyText = ""; window.auto = false;    
  return {
    //跳过
    Skip:function (){
      var s= vngee[l].selects.split(",");
        if(s.length<2){
          l++;
        }else{
          vngeeDialog.onclick();
        }
      return this.Skip();   
    },
    //预加载音频资源
    preLoadAudio:function (urls){
      var a  = [];
      for(var i=0;i<urls.length;i++){
        
        a[i] = new Audio();
        a[i].src = urls[i];
        a[i].load();
        
      }
    
    
    },
    //预加载图像资源
    preLoadImg:function (path,imgSrcUrls, callback){
        //先对imgSrcUrls进行判断，是否是数组，若不是需要先将其转化为数组
        var imgSrcUrls = (imgSrcUrls instanceof Array)? imgSrcUrls: [imgSrcUrls];
        var newImgUrls = [];  //多个变量声明建议这种写法
        var loadCount = 0;
        imgArrLength = imgSrcUrls.length;
     	//	function getLoadCount() {}
        for(var i=0; i<imgArrLength;i++) {
          newImgUrls[i] = new Image();
     	  newImgUrls[i].src = path + imgSrcUrls[i];
	      newImgUrls[i].onload =function() {
	    	loadCount++;
    	    console.log(loadCount);
	        if(loadCount===imgArrLength){  
              window.loadCount = loadCount; 
              //此时图片已经加载完成。可以处理回调函数
    		  callback();
	        }
    	  }
    	  newImgUrls[i].onerror = function() {
            //处理无法加载成功时的处理，如用一张加载失败的图片代替显示不了的图片
            newImgUrls[i].src='assets/images/logoError.png';//注意图片的路径，使用小尺寸图片
    	    newImgUrls[i].onerror = null;  //控制不要一直跳动
    	  }
         }
    
    },
    //打字机特效
    typed:function(str,typer){
      running = true;
      var n = str.length;
      var  i = 0;
      var id = setInterval(
      function(){
        i++;
        var newStr = str.substr(0,i);
        typer.innerText = newStr;
        if(i==n){
          running = false;
          clearInterval(id);
          historyText += "\n" + str;
          historyScene.innerText = historyText;
          if(auto){
            vngeeDialog.onclick();
          }
        }     
      }, 
      120
    );         
  },

    //创建数据
    Vngee:function(t){
      vngee[n] = {};
      vngee[n].text = t.text;
      vngee[n].selects = t.selects;
      vngee[n].index = n;
      vngee[n].next = t.next;
      vngee[n].name = t.name || "";
      vngee[n].backgroundImage = t.backgroundImage || "";
      vngee[n].backgroundMusic = t.backgroundMusic || "";
      vngee[n].characterImage = t.characterImage || "";
      n++;
    },
    init:function(){
      //容器 
      var game = document.createElement("div");
      document.body.appendChild(game);
      //背景
      var bg = document.createElement("div");
      bg.style = `
                    width:800px;
                    height:365px;
                    background-color:#000;
                 `;
      game.appendChild(bg);
      bg.id = "vngeeBackground";
      //角色立绘
      var character = [];
      for(var i=0;i<3;i++){
        character[i] = document.createElement("div");
        character[i].style = "width:160px;height:245px;" +
                        "/*border:1px solid green;*/" +
                        "left:" + (250 * i + 64) + "px;" +
                        "top:120px;" +
                        "opacity:0;";
        game.appendChild(character[i]);
        character[i].id = "vngeeCharacter" + i;
      }
      //选项集
      var selects = document.createElement("div");
      selects.style = "width:400px;height:245px;" +
                      "left:200px;" +
                      "text-align:center;" +
                      "/*border:1px solid dimgray;*/";
      game.appendChild(selects);
      //子选项
      var vngeeList = [];
      for(var i=0;i<3;i++){
        vngeeList[i] = document.createElement("div");
        vngeeList[i].style = "width:400px;height:50px;" +
                        "/*border:1px solid pink;*/" +
                        "top:" + 50 * i * 2 + "px;" +
                        "line-height:50px;";
        //vngeeList[i].innerText = i;
        vngeeList[i].style.display = "none";
        selects.appendChild(vngeeList[i]);
        vngeeList[i].id = "vngeeList" + i;
      }
      //对话框
      var dialog = document.createElement("div");
      dialog.style =`
                      width:800px;
                      height:120px;
                      /*background-color:blue*/;
                      top:245px;
                      border:1px solid gray;
                    `;
      game.appendChild(dialog);
      dialog.id = "vngeeDialog";
      //对话框标题
      var dialogTitle = document.createElement("div");
      dialogTitle.style = `
                             width:80px;
                             height:40px;
                             border:1px solid grey;
                             top:200px;
                             left:5px;
                             line-height:40px;
                             text-align:center;
                          `;
      game.appendChild(dialogTitle);
      dialogTitle.id = "vngeeDialogTitle";
      
      
      //创建对话框内部的按钮 back history skip auto Save Load sertting
      var historyScene;
      
      
      var menu = document.createElement("div");
      menu.style.width = "100px";
      menu.style.height = "50px";
      menu.style.position = "relative";
      menu.style.left = "0px";
      menu.style.top = "0px";
      menu.style.background = "lightgray";
      menu.style.border = "1px solid gray";
      menu.innerText = "菜单 +";
      menu.style.display = "none";//隐藏，当点击启动页面进入游戏才显示菜单
      menu.style.opacity = "0.2";
      menu.style.lineHeight = "50px";
      menu.style.textAlign = "center";
      //menu.style.transform = "rotate(134deg) scale(-1,-1)";
      game.appendChild(menu);
      menu.i = 0;
      var btnBack,btnSave,btnLoad;
          
      menu.onclick =function (){
        
        this.i++;
          
        if(this.i%2==1){
          if(historyScene.style.display == "block"){
            return false;//当历史界面显示的时候，菜单点击无效化。
          }
          menu.innerText = "菜单 -";
          menu.style.opacity = "0.5";
          menu.style.top = "-50px";
          
          btnBack = document.createElement("div");
          btnBack.style.width = "100px";
          btnBack.style.height = "50px";
          btnBack.style.background = "lightgray";
          btnBack.style.border = "1px solid gray";
          btnBack.style.position = "relative";
          btnBack.style.left = "-1px";
          btnBack.style.top = "-1px";
          //btnBack.style.left = "50px";
          btnBack.innerText = "退回";
          menu.appendChild(btnBack);
          
          btnHistory = document.createElement("div");
          btnHistory.style.width = "100px";
          btnHistory.style.height = "50px";
          btnHistory.style.background = "lightgray";
          btnHistory.style.border = "1px solid gray";
          btnHistory.style.position = "relative";
          btnHistory.style.left = "-1px";
          btnHistory.style.top = "-1px";
          //btnHistory.style.left = "50px";
          btnHistory.innerText = "历史";
          menu.appendChild(btnHistory);
          
          btnSkip = document.createElement("div");
          btnSkip.style.width = "100px";
          btnSkip.style.height = "50px";
          btnSkip.style.background = "lightgray";
          btnSkip.style.border = "1px solid gray";
          btnSkip.style.position = "relative";
          btnSkip.style.left = "-1px";
          btnSkip.style.top = "-1px";
          //btnSkip.style.left = "50px";
          btnSkip.innerText = "跳过";
          menu.appendChild(btnSkip);
          
          btnAuto = document.createElement("div");
          btnAuto.style.width = "100px";
          btnAuto.style.height = "50px";
          btnAuto.style.background = "lightgray";
          btnAuto.style.border = "1px solid gray";
          btnAuto.style.position = "relative";
          btnAuto.style.left = "-1px";
          btnAuto.style.top = "-1px";
          //btnAuto.style.left = "50px";
          btnAuto.innerText = "自动";
          menu.appendChild(btnAuto);
          
          btnSave = document.createElement("div");
          btnSave.style.width = "100px";
          btnSave.style.height = "50px";
          btnSave.style.background = "lightgray";
          btnSave.style.border = "1px solid gray";
          btnSave.style.position = "relative";
          btnSave.style.left = "-1px";
          btnSave.style.top = "-1px";
          //btnSave.style.left = "50px";
          btnSave.innerText = "存档";
          menu.appendChild(btnSave);
          
          btnLoad = document.createElement("div");
          btnLoad.style.width = "100px";
          btnLoad.style.height = "50px";
          btnLoad.style.background = "lightgray";
          btnLoad.style.border = "1px solid gray";
          btnLoad.style.position = "relative";
          btnLoad.style.left = "-1px";
          btnLoad.style.top = "-1px";
          //btnLoad.style.left = "50px";
          btnLoad.innerText = "读档";
          menu.appendChild(btnLoad);     
          
          btnSetting = document.createElement("div");
          btnSetting.style.width = "100px";
          btnSetting.style.height = "50px";
          btnSetting.style.background = "lightgray";
          btnSetting.style.border = "1px solid gray";
          btnSetting.style.position = "relative";
          btnSetting.style.left = "-1px";
          btnSetting.style.top = "-1px";
          //btnSetting.style.left = "50px";
          btnSetting.innerText = "设置";
          menu.appendChild(btnSetting);
          
          btnBack.onclick = function (){
            if(l==1){
              menu.style.top = "0px";
              return false;//第一条还想退？
            }
            //因为当有选项时，阻断了计数器，所以只需要-1，而无阻断状态下需要-2
            if(vngeeList0.style.display=="block"||vngeeList1.style.display=="block"||vngeeList2.style.display=="block"){
              l--;
            }
            if(vngeeList0.style.display=="none"&&vngeeList1.style.display=="none"&&vngeeList2.style.display=="none"){
              l-=2;
            }
            //这样并非完美的解决方案，只适用于顺序执行，遇到分支时会跳回上一个索引，需要保存上一个对话框属性previous   对应 next
            
          
            menu.style.top = "0px";
            //alert("Back:"+l);
            vngeeList0.style.display="none";
            vngeeList1.style.display="none";
            vngeeList2.style.display="none";
            running = false;
            
            vngeeDialog.onclick();
            
          }
          btnHistory.onclick = function (){
            menu.style.top = "0px";
            //alert("History:"+l);
            historyScene.style.display = "block";
            
          }
          btnSkip.onclick = function (){
            menu.style.top = "0px";
            //alert("Skip:"+l);
            vngeeMngYou.Skip();
            
          }
          btnAuto.onclick = function (){
            menu.style.top = "0px";
            //alert("Auto:"+l);
            auto = true;
            vngeeDialog.onclick();
          }
          btnSave.onclick = function (){
            menu.style.top = "0px";
            /*
            alert(
                   "Save:"+l+
                   "\nbackgroundImage:"+vngeeBackground.style.backgroundImage+
                   "\ncharacter0:"+vngeeCharacter0.style.backgroundImage+
                   "\ndialog:"+vngeeDialog.innerText+
                   "\ndialogTitle:"+vngeeDialogTitle.innerText+
                   "\nvngeeList0:"+vngeeList0.innerText
                 );
            */
            Save();
          }
          btnLoad.onclick = function (){
            menu.style.top = "0px";
            //alert("Load:"+l);
            Load();
          }
          btnSetting.onclick = function (){
            menu.style.top = "0px";
            //alert("Setting:"+l);
            
          }
        
        }
        if(this.i%2==0){
          menu.innerText = "菜单 +";
          menu.style.opacity = "0.2";
          menu.removeChild(btnSave);
          menu.removeChild(btnLoad);
        }
      }
      
      
      historyScene = document.createElement("div");
      historyScene.style.width = "800px";
      historyScene.style.height = "315px";
      historyScene.style.background = "white";
      historyScene.style.border = "1px  solid lightgray";
      historyScene.style.display = "none";
      game.appendChild(historyScene);
      historyScene.id = "historyScene";
      historyScene.onclick = function (){
        this.style.display = "none";
      }
      
      
      
      var startPage = document.createElement("div");
      startPage.innerText = "点击进入游戏";
      startPage.style.color = "red";
      startPage.style.fontSize = "54px";
      startPage.style.lineHeight = "365px";
      startPage.style.textAlign = "center";
      startPage.style.width = "800px";
      startPage.style.height = "365px";
      startPage.style.background = "#000";
      game.appendChild(startPage);
      startPage.onclick = function(){
        this.style.display = "none";
        menu.style.display = "block";
        this.parentNode.removeChild(this);
        vngeeDialog.onclick();
      }
    
    },
  }
 
  
})();


vngeeMngYou.preLoadAudio([
"assets/audio/00002.mp3",
"assets/audio/00004.mp3"
]);

vngeeMngYou.init(); 


        
      //单击对话框
      vngeeDialog.onclick = function (){
          
       
        if(vngeeList0.style.display=="block"||vngeeList1.style.display=="block"||vngeeList2.style.display=="block"){
          running = true;
        }
        //判断程序当前是否在打印文本
        if(running){
          return false;
        }else{
          vngeeDialog.innerText = "";
        }
        
        //更新游戏内容
        
        //对话框内容更新
        t = vngee[l].text;
        //vngeeDialog.innerHTML = t;
        
        VisualNovelGameEngine.typed(t,vngeeDialog);
        
        //更新对话框说话人
        if(vngee[l].name!==""){
          vngeeDialogTitle.innerText = vngee[l].name;
        }
        
        
        
        //更新游戏背景图片
        if(vngee[l].backgroundImage==""){
          vngee[l].backgroundImage = vngee[l-1].backgroundImage;
        }
        var bgSrc = vngee[l].backgroundImage.split(",");
        
        if(bgSrc.length == 1&&bgSrc[0]!==""){
          vngeeBackground.style.backgroundImage = "url(assets/images/background/"+ vngee[l].backgroundImage +")";
        
        }
        
        //更新角色立绘
        
        vngeeCharacter0.style.backgroundImage = "";
        vngeeCharacter1.style.backgroundImage = "";
        vngeeCharacter2.style.backgroundImage = "";
        
        var c = vngee[l].characterImage.split(",");
        
        if(c.length==1){
          vngeeCharacter1.style.backgroundImage = "url(" + vngee[l].characterImage + ")";
        }
        if(c.length==2){
          vngeeCharacter0.style.backgroundImage = "url(" + c[0] + ")";
          vngeeCharacter2.style.backgroundImage = "url(" + c[1] + ")";
        }
        if(c.length==3){
          vngeeCharacter0.style.backgroundImage = "url(" + c[0].characterImage + ")";
          vngeeCharacter1.style.backgroundImage = "url(" + c[1].characterImage + ")";
          vngeeCharacter2.style.backgroundImage = "url(" + c[2] + ")";
        }
        if(vngeeCharacter0.style.backgroundImage==""){
          vngeeCharacter0.style.opacity = 0;
        }else{
          vngeeCharacter0.style.opacity = 1;
        }
        if(vngeeCharacter1.style.backgroundImage==""){
          vngeeCharacter1.style.opacity = 0;
        }else{
          vngeeCharacter1.style.opacity = 1;
        }
        if(vngeeCharacter2.style.backgroundImage==""){
          vngeeCharacter2.style.opacity = 0;
        }else{
          vngeeCharacter2.style.opacity = 1;
        }
  
      
      
        //更新背景音乐
        //同样要有对应选项卡的音乐集合 "Music1,Music2,Music3"
       
        if(vngee[l].backgroundMusic !== ""){
          var bgm = new Audio();
          bgm.src = vngee[l].backgroundMusic;
          bgm.volume = 0.2;
          bgm.play();
        }
        
        
        
        
        //跳转到下一条数据 更新游戏选项卡
        var d = vngee[l].next.split(",");
        
        //解析文本为数组，选项集分离，一般只有两个选项或三个选项，单个选项可不做
        var s = vngee[l].selects.split(",");
        if(s.length==3){
          vngeeList0.innerText = s[0];
          vngeeList0.index = d[0];
          vngeeList0.bgSrc = bgSrc[0];
          vngeeList1.innerText = s[1];
          vngeeList1.index = d[1];
          vngeeList1.bgSrc = bgSrc[1]
          vngeeList2.innerText = s[2];
          vngeeList2.index = d[2];
          vngeeList2.bgSrc = bgSrc[2]
        }
        if(s.length==2){   
          vngeeList0.innerText = s[0];
          vngeeList0.index = d[0];
          vngeeList0.bgSrc = bgSrc[0]
          vngeeList1.innerText = s[1];
          vngeeList1.index = d[1];
          vngeeList1.bgSrc = bgSrc[1]
          //vngeeList2.innerText = s[2];
        }
        if(s.length==1){//包含空内容的情况
          if(s==""){
            //alert(s);
          }
          vngeeList0.innerText = s[0];
          vngeeList0.index = d[0];
          vngeeList0.bgSrc = bgSrc[0]
          vngeeList0.innerText = "";
          vngeeList1.innerText = "";
          vngeeList2.innerText = "";
          l = vngeeList0.index;
        }
      
        if(vngeeList0.innerText==""){
          vngeeList0.style.display = "none";
        }else{
          vngeeList0.style.display = "block";
        }
        if(vngeeList1.innerText==""){
          vngeeList1.style.display = "none";
        }else{
          vngeeList1.style.display = "block";
        }
        if(vngeeList2.innerText==""){
          vngeeList2.style.display = "none";
        }else{
          vngeeList2.style.display = "block";
        }
      
        if(auto&&d.length<2){
          auto = true;
        }else{
          auto = false;
        }
      }
   

      //单击选项卡
      vngeeList0.onclick = function (){
        l = this.index;
        running = false;
        vngeeList0.style.display = "none";
        vngeeList1.style.display = "none";
        vngeeList2.style.display = "none";
        vngeeBackground.style.backgroundImage = "url(assets/images/background/"+ vngeeList0.bgSrc +")";
        vngeeDialog.onclick();
      }
      vngeeList1.onclick = function (){
        l = this.index;
        running = false;
        vngeeList0.style.display = "none";
        vngeeList1.style.display = "none";
        vngeeList2.style.display = "none";
        vngeeBackground.style.backgroundImage = "url(assets/images/background/"+ vngeeList1.bgSrc +")";
        vngeeDialog.onclick();
      }
      vngeeList2.onclick = function (){
        l = this.index;
        running = false;
        vngeeList0.style.display = "none";
        vngeeList1.style.display = "none";
        vngeeList2.style.display = "none";
        vngeeBackground.style.backgroundImage = "url(assets/images/background/"+ vngeeList2.bgSrc +")";
        vngeeDialog.onclick();
      }





/*

JS audio播放一个的时候，其他正在播放的关闭
audio在使用中，如果有多个，在播放的时候，如果一个声音没有播放完继续下一个的话，原来正在播放的并不会关闭（在Android和PC上测试是这样，苹果产品不清楚）

现在需要做的是，当播放其中一个的时候，其他正在播放的全部关闭

实现思路：先获取当前HTML中所有的audio作为数组储存，当你指定要播放的audio，根据你所指向的audio的下标，移除该目标 ，数组剩余对象全部用关闭

具体代码如下

*/

//获取Class对象下的所有audio对象
/*
let audios = document.getElementsByClassName('voice')[0].getElementsByTagName('audio');
*/
/**
*@parma audio //audio列表
*@Parma a //当前audio下标
**/
/*
function pauseAll(audioList,a) {
  for(let i = 0; i < audioList.length; i++){
    if(i !== a-1){
      audioList[i].pause();
    }
  }
}





*/