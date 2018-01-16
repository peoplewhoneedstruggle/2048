$(document).ready(function(){
newgame();

}); 


//自己偷懒所以几乎没怎么注释
var score=0;  
var board=[];   
var added=[]; 
$("#score").val(score);
function newgame(){
  init();//初始化棋盘
  generateOneNumber();
  generateOneNumber(); 
} 
function init(){
//定义二维数组并初始化清零
  for (var i=0;i<4;i++){
    board[i]=[];
    for (var j=0;j<4;j++){
    board[i][j]=0;  //console.log(board[i]);
    }
  } 
    
    for(var i = 0;i<4;i++){  
        for(var j = 0;j<4;j++){  
            var gridCell = $("#grid-cell-"+i+"-"+j);  
            gridCell.css("top",getPosTop(i,j));  
            gridCell.css("left",getPosLeft(i,j));  
        }  
    } score=0;
     $("#score").val(score);
$("#gameover").css("display","none");


   updateBoardView();//通知前端对board二位数组进行设定。
  
}     
function getPosTop(i,j){
    return ($("#grid-cell-00").position().top)+i*110;
  } //已完成
function getPosLeft(i,j){
    return ($("#grid-cell-00").position().left)+j*110;
  }//已完成
function updateBoardView(){  
   $(".number").remove(); 
  for (var i=0;i<4;i++){   
   for (var j=0;j<4;j++){
     $("#back").append('<div class="number" id="number-cell-'+i+j+'"></div>')
    var theNumberCell = $('#number-cell-' + i +j); 
    if(board[i][j]==0){  
                theNumberCell.css("width","0px");  
                theNumberCell.css("height","0px");   
                theNumberCell.css("top",getPosTop(i,j));  
                theNumberCell.css("left",getPosLeft(i,j));  
            }else{  
                theNumberCell.css("width","100px");  
                theNumberCell.css("hegiht","100px");   
                theNumberCell.css("top",getPosTop(i,j));  
                theNumberCell.css("left",getPosLeft(i,j));  
                //NumberCell覆盖  
                theNumberCell.css("background-color",backgroungColor(board[i][j]));//返回背景色  ,待修改
                theNumberCell.css("color",numberColor(board[i][j]));//返回前景色  待修改
                theNumberCell.text(board[i][j]);  //待修改
            }
   } 
}}
function generateOneNumber(){
  if (nospace(board)) return false;
  
  var randx=parseInt(Math.floor(Math.random()*4));
  var randy=parseInt(Math.floor(Math.random()*4));
  while(1){
    if(board[randx][randy]==0)break;      
   randx=parseInt(Math.floor(Math.random()*4)); 
   randy=parseInt(Math.floor(Math.random()*4));
  }
  var randNumber=(Math.random()>0.5?2:4)
  board[randx][randy]=randNumber;
  showNumberWithAnimation(randx,randy,randNumber);//显性函数待添加
  return true;
 }
function showNumberWithAnimation(i,j,randNumber){
   var numberCell = $("#number-cell-"+i+j); 
   numberCell.css("background-color", backgroungColor(randNumber) );//待修改
  numberCell.css("color", numberColor(randNumber) )
   numberCell.text(randNumber); 
       numberCell.animate({  
        width : "100px",  
        height : "100px",  
        top : getPosTop(i, j),  
        left : getPosLeft(i, j)  
    }, 150);
   
 } 
function numberColor(i){
  if (i<=4) return "#776e65";
  else return "white";
}
function backgroungColor(i){
  switch(i){
      case 2:  
        return "#eee4da";  
        break;  
    case 4:  
        return "#edeoc8";  
        break;  
    case 8:  
        return "#f26179";  
        break;  
    case 16:  
        return "#f59563";  
        break;  
    case 32:  
        return "#f67c5f";  
        break;  
    case 64:  
        return "#f65e36";  
        break;  
    case 128:  
        return "#edcf72";  
        break;  
    case 256:  
        return "#edcc61";  
        break;  
    case 512:  
        return "#9c0";  
        break;  
    case 1024:  
        return "#3365a5";  
        break;  
    case 2048:  
        return "#09c";  
        break;  
    case 4096:  
        return "#a6bc";  
        break;  
    case 8192:  
        return "#93c";  
        break;
      }
}
function isaddedArray(){//将判断能否合并的数组值置为0  
    for(var i = 0;i<4;i++){ 
      added[i]=[];
        for(var j = 0;j<4;j++){   
            added[i][j] = 0;  
        }  
   }  
}  
function canMoveLeft(board){
  for (var i=0;i<4;i++)
    for (var j=0;j<4;j++){
      if ((board[i][j]!=0)&&(j!=0)){
        if((board[i][j-1]==0)||(board[i][j-1]==board[i][j]))return true;
       
      }
    } return false;
}
function canMoveRight(board){
    for (var i=0;i<4;i++)
    for (var j=0;j<4;j++){
      if ((board[i][j]!=0)&&(j!=3)){
        if((board[i][j+1]==0)||(board[i][j+1]==board[i][j]))return true;
        
      }
    }return false;
}
function canMoveUp(board){
    for (var i=0;i<4;i++)
    for (var j=0;j<4;j++){
      if ((board[i][j]!=0)&&(i!=0)){
        if((board[i-1][j]==0)||(board[i-1][j]==board[i][j]))return true;
      
      }
    }  return false; 
}
function canMoveDown(board){
    for (var i=0;i<4;i++)
    for (var j=0;j<4;j++){
      if ((board[i][j]!=0)&&(i!=3)){
        if((board[i+1][j]==0)||(board[i+1][j]==board[i][j]))return true;
        
      }
    }return false;
} 
function moveLeft(){
  if (!canMoveLeft(board)) return false;  
isaddedArray(); 
  for (var i=0;i<4;i++)
    for (var j=1;j<4;j++){
      if (board[i][j]!==0){
        
       for (var k=0;k<j;k++){
         if ((board[i][k]==0)&&(noBlockHorizontal(i,k,j,board)))     
            { showMoveAnimation(i,j,i,k); 
           
             board[i][k]=board[i][j];
            board[i][j]=0;
             break;      
           }
         else if((board[i][k]==board[i][j])&&(noBlockHorizontal(i,k,j,board)))
           { showMoveAnimation(i,j,i,k+1);
             if(added[i][k]!==0){  
               board[i][k+1]=board[i][j];
               board[i][j]=0;}
             else{ 
             board[i][k]+=board[i][j];
             board[i][j]=0;
             added[i][k] = 1;
             showMoveAnimation(i,j,i,k);
             score+=board[i][k];}break; 
            }  
       }  
      }           
    }
setTimeout("updateBoardView()",200); 
return true;

}//已完成
function moveRight(){
  if (!canMoveRight(board)) return false;
  isaddedArray(); 
  for (var i=0;i<4;i++)
    for (var j=2;j>=0;j--){
      if (board[i][j]!=0){    
         for (var k=3;k>j;k--){
         if ((board[i][k]==0)&&(noBlockHorizontal(i,j,k,board)))                
           { showMoveAnimation(i,j,i,k); 
             board[i][k]=board[i][j];
            board[i][j]=0;
            break;      
           } 
         else if((board[i][k]==board[i][j])&&(noBlockHorizontal(i,j,k,board)))
           { 
             
             if(added[i][k]!==0){
               showMoveAnimation(i,j,i,k-1);
               board[i][k-1]=board[i][j];
               board[i][j]=0; }
             else{  
             board[i][k]+=board[i][j];
             board[i][j]=0;
             added[i][k] = 1;
             showMoveAnimation(i,j,i,k);
             score+=board[i][k];}
             break;   }
       }  
      }           
    }
setTimeout("updateBoardView()",200); 
return true;

}//已完成
function moveUp(){
  if (!canMoveUp(board)) return false;
  isaddedArray();
  for (var i=1;i<4;i++)      
    for (var j=0;j<4;j++){   
      if (board[i][j]!==0){ 
        for (var k=0;k<i;k++){   
          if ((board[k][j]==0)&&(noBlockVertical(k,i,j,board))){
            showMoveAnimation(i,j,k,j); 
            board[k][j]=board[i][j];  
            board[i][j]=0;
            break;
          }   
        else if((board[k][j]==board[i][j])&&(noBlockVertical(k,i,j,board))){
          if (added[k][j]!=0){
            board[k+1][j]=board[i][j];
            board[i][j]=0;
            showMoveAnimation(i,j,k+1,j); 
          }
          else {
            showMoveAnimation(i,j,k,j);  
            board[k][j]+=board[i][j];
            board[i][j]=0;
            added[k][j]=1;
            score+=board[k][j];
          }break;
        }
        }
      }
    }
setTimeout("updateBoardView()",200); 
return true;}//已完成
function moveDown(){
  if (!canMoveDown(board)) return false;
  isaddedArray();
  for (var i=2;i>=0;i--)
    for (var j=0;j<4;j++){
      if(board[i][j]!=0){
        for(var k=3;k>i;k--){
          if ((board[k][j]==0)&&(noBlockVertical(i,k,j,board))){
            board[k][j]=board[i][j];
            board[i][j]=0;
            showMoveAnimation(i,j,k,j);
            break;
          }
          else if((board[k][j]==board[i][j])&&(noBlockVertical(i,k,j,board))){
            if(added[k][j]!=0){
              board[k+1][j]=board[i][j];
              board[i][j]=0;
              showMoveAnimation(i,j,k+1,j);
            }
            else {
              board[k][j]+=board[i][j];
              board[i][j]=0;
              added[k][j]=1;
              showMoveAnimation(i,j,k,j);
              score+=board[k][j];
            }break;
          }
        }
     }
    }
setTimeout("updateBoardView()",200); 
return true;}
function noBlockHorizontal(row,col,col2,board){
  for(var i=col+1;i<col2;i++){
    if (board[row][i]!==0)return false;
  } 
  return true;
}
function noBlockVertical(row1,row2,col,board){
  for(var i=row1+1;i<row2;i++){
    if (board[i][col]!== 0) return false;
  }return true;   
}
function showMoveAnimation(fromx, fromy, tox, toy){  
      
    var numberCell = $("#number-cell-"+fromx +fromy);  
    numberCell.animate({top:getPosTop(tox,toy),  
    left:getPosLeft(tox,toy)},200);   
}//已完成  
function nospace(){
  for (var i=0;i<4;i++)
    for (var j=0;j<4;j++){
      if (board[i][j]==0) return false;
    }return true;
}//已完成
function canmove(){
  if(canMoveLeft(board)||canMoveRight(board)||canMoveUp(board)||canMoveDown(board))
    return true;
 else  return false;
}
function isgameover(){
  if((nospace())&&(!canmove()))
    $("#gameover").css("display","block");
} 
function getscore(){
  $("#score").val(score);
}
$(document).keydown(function(event){
  switch(event.keyCode){
    case 37:if(moveLeft()) {
       
      getscore();
      generateOneNumber();
     setTimeout("isgameover()",1000);
      }return false;
    case 38:if(moveUp()){
     
      getscore();
      generateOneNumber();
      setTimeout("isgameover()",1000);
    }return false;
    case 39:if(moveRight()){
      
      getscore();
      generateOneNumber();
      setTimeout("isgameover()",1000);
    }return false;
    case 40:if(moveDown()){
       
      getscore();
      generateOneNumber();
      setTimeout("isgameover()",1000);
    }return false;
   }
});