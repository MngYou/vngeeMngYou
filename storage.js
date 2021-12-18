//该变量用于保存游戏属性(游戏进度)
var backgroundImage = "",
backgroundMusic = "",
dialogText = "",
dialogTitle = "",
character0 = "",
character1 = "",
character2 = "",
list0 = "",
list1 = "",
list2 = "",
index = 0;





function Save(){

  index = l - 1;
  //-1是因为当选项卡显示时，会阻断顺序执行。
  if(vngeeList0.style.display == "block"||vngeeList1.style.display == "block"||vngeeList2.style.display == "block"){
    index = l;
  }
  
  
  
  
  
  /*
  backgroundImage = vngeeBackground.style.backgroundImage;
  backgroundMusic = "";
  
  dialogText = vngeeDialog.innerText;
  dialogTitle = vngeeDialogTitle.innerText;
  
  character0 = vngeeCharacter0.style.backgroundImage;
  character1 = vngeeCharacter1.style.backgroundImage;
  character2 = vngeeCharacter2.style.backgroundImage;
  
  list0 = vngeeList0.innerText;
  l0 = vngeeList0.index;
  list1 = vngeeList1.innerText;
  l1 = vngeeList1.index;
  list2 = vngeeList2.innerText;
  l2 = vngeeList2.index;
  */
}

function Load(){
  
        l = index;
        running = false;
        vngeeList0.style.display = "none";
        vngeeList1.style.display = "none";
        vngeeList2.style.display = "none";
        vngeeDialog.onclick();
  
  
  
  /*
  vngeeBackground.style.backgroundImage = backgroundImage;
  vngeeDialog.innerText = dialogText;
  vngeeDialogTitle.innerText = dialogTitle;
  vngeeCharacter0.style.backgroundImage = character0;
  vngeeCharacter1.style.backgroundImage = character1;
  vngeeCharacter2.style.backgroundImage = character2;
  vngeeList0.innerText = list0;
  vngeeList0.index = l0;
  vngeeList1.innerText = list1;
  vngeeList1.index = l1;
  vngeeList2.innerText = list2;
  vngeeList2.index = l2;
  */

}



/*

对话框内的按钮

back 回退到上一条

history 查看历史记录

skip 跳过对话到选项卡停止

auto 按照一定时间自动播放到选项卡停止

save 存档

Load 读档




*/