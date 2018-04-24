//入力欄が入力されているか確認する
function MODEL_CheckInputexist_Textbox (Suffix) {var TempBool=($(G_Input[Suffix]).val()=='')?false:true;  return TempBool;}
function MODEL_checkInputexist_Radiobox(Suffix) {var TempBool=(G_Input[Suffix]==undefined)  ?false:true;  return TempBool;}
//フラグを更新する
function MODEL_FlagChenge(Suffix,Inputexist) {G_Flag[Suffix]=Inputexist;}
//入力欄ロック'disabled'を解除する
function MODEL_OpenLock_Textbox (Suffix) {VIEW_OpenLock(Suffix>0?G_Input[Suffix+1]:'#input_Name');}
function MODEL_OpenLock_Radiobox(Suffix) { 
  const SOURCE={2:['#bar1-1','#bar1-2','#bar1-3'],3:['#bar2-1','#bar2-2','#bar2-3'],4:['#bar3-1','#bar3-2','#bar3-3']};
  for(var index=0; index<3; index++)  VIEW_OpenLock(SOURCE[(Suffix)][index]);
}
//サーバーに送信する
function MODEL_PostAjax() {
  $.ajax({                                                    
    type:'POST',  url:'./run.php',
    data:{  Number:$(G_Input[0]).val(),  Name:$(G_Input[1]).val(),  Affiliation:$(G_Input[2]).val(),
            SEX:   $(G_Input[3]).val(),  SH:  $(G_Input[4]).val(),  IO:         $(G_Input[5]).val()  },
    beforesend:function(){
      VIEW_ShowDescription('other',1);  G_Flag[0] =true;           //二重に送信されないようにする。
      if($('#input_Number').val()=='')$('#input_Number').val('000000'); //入館証を作っていない人（入館証Noが空欄）に対して、入館証Noを000000に設定。
    },
    success:function(echo){
      $('#description').text(echo);                         //サーバーからの応答をフッターに表示
      setTimeout(function(){location.reload(false);},5000); //５秒待機してからページを更新
    },
    error:function(){VIEW_ShowDescription('other',3);}      //接続失敗時にエラーを通知
  });
  return false;                                             //ページを移動しない        
}
//フッターの文章を更新する
function MODEL_ShowDescription_In (Suffix)            {VIEW_ShowDescription('enter',Suffix);}
function MODEL_ShowDescription_Out(Suffix,Inputexist) {VIEW_ShowDescription(Inputexist?'ok':'ng',Suffix);}
//入力欄の'background-color'を変更する
function MODEL_UpdateColor_In   (Suffix)            {VIEW_UpdateColor(G_Input[Suffix],'enter');} 
function MODEL_UpdateColor_Out  (Suffix,Inputexist) {VIEW_UpdateColor(G_Input[Suffix],(Inputexist? 'ok':'ng'));} 
function MODEL_UpdateColor_First(Suffix,Inputexist) {VIEW_UpdateColor(G_Input[Suffix],(Inputexist? 'ok':'first'));} 