/*
  クラス
        */
class C_SuperBox{  //C_TextBox・C_RadioBoxの基底クラス。
  constructor(input,description){
    this.exist=false;                                                                                            　//入力欄が、空で無いならTrue・空で有るならFalse。
    this.inputcolor={ enter:'#ffc', ok:'rgba(0,255,0,0.75)', ng:'rgba(255,0,0,0.5)', first:'rgba(0,255,0,0.5)' };  //入力欄背景色変更時のパラメーター。
    this.input=input;              //入力欄をidで指定、this:自分自身・next:１つ下。
    this.description=description;  //フッター（説明文）更新用のテキスト。
  }
  //入力欄のロック(disabled)を解除する。
    releaseDisabled_TB()    { if(this.exist==true)  $(this.input.next).prop('disabled',false); }                           //TB : TextBox
    releaseDisabled_RB()    { for(let index=0; index<3; index++)  {$(this.input.next[index]).prop('disabled',false);} }  //RB : RadioBox
  //フッター（説明文）を更新する。
    updateDescription_In () { $('#description').text(this.description.enter); }                              //In  : .focusin
    updateDescription_Out() { $('#description').text(this.exist?this.description.ok:this.description.ng); }  //Out : .focusout
}
class C_TextBox       extends C_SuperBox{  //FormBox_Text(TB_Nam,TB_Aff)に適用するクラス。
  //入力欄を確認する。
    checkInputexist()       { this.exist =($(this.input.this).val()=='')?false:true; }
  //入力欄の背景色を変更する。
    updateInputcolor_In()   { $(this.input.this).css('background-color',this.inputcolor.enter);}
    updateInputcolor_Out()  { $(this.input.this).css('background-color',this.exist?this.inputcolor.ok:this.inputcolor.ng); }
}
class C_TextBox_First extends C_TextBox {  //C_TextBoxを継承、TB_Num専用。入力欄が空で有っても構わない。
  updateInputcolor_Out()    { $(this.input.this).css('background-color',this.exist?this.inputcolor.ok:this.inputcolor.first); }
  releaseDisabled_TB()      { $(this.input.next).prop('disabled',false); }
}
class C_RadioBox      extends C_SuperBox{  //FormBox_Button(RB_SEX,RB_SH,RB_IO)に適用するクラス。
  checkInputexist()         { this.exist =($(this.input.this)==undefined)?false:true ; }
}

class C_PostAjax{  //ajax通信に使用するクラス。
  constructor(){
    this.lock=true;　//二重に送信されないようにするためのロック、Falseでロック。
  }
  checkexistAll(Nam,Aff,SEX,SH,IO){if(Nam||Aff||SEX||SH||IO == true){$('#description').text('本来ならば、ここでサーバーにデータの送信を開始します。');}else{$('#description').text('入力欄はすべて埋まってますか？');}}
  MODEL_PostAjax() {
    $.ajax({
      type:'POST',  url:'./run.php',
      data:{ Number:$('#input_Number').val(),               Name:$('#input_Name').val(),                Affiliation:$('#input_Affiliation').val(),
             SEX:   $(':radio[name="SEX"]:checked').val(),  SH:  $(':radio[name="SH"]:checked').val(),  IO:         $(':radio[name="IO"]:checked').val() },
      beforesend:function(){this.lock=false; if($('#input_Number').val()=='')$('#input_Number').val('000000');}, //入館証を作っていない人（入館証Noが空欄）に対して、入館証Noを000000に設定。
      success:function(echo){
        $('#description').text(echo);                          //サーバーからの応答をフッターに表示。
        setTimeout(function(){location.reload(false);},5000);  //５秒待機してからページを更新。
      },
      error:function(){$('#description').text('エラー発生!');}  //接続失敗時にエラーを通知する。
    });
    return false;                                              //ページを移動しないようにする。
  }
}
/*
  宣言
      */
  var TB_Num = new C_TextBox_First({ this:'#input_Number',      next:'#input_Name'                   },{ enter:'まだ入館証を作っていない人は空欄に。', ok:'『お名前』を入力しましょう。',              ng:'はじめまして! Hello World!' });
  var TB_Nam = new C_TextBox      ({ this:'#input_Name',        next:'#input_Affiliation'            },{ enter:'スペースは不要です。',                ok:'『学校（企業）名』を入力しましょう。',      ng:'『お名前』が入力されていません!' });
  var TB_Aff = new C_TextBox      ({ this:'#input_Affiliation', next:['#bar1-1','#bar1-2','#bar1-3'] },{ enter:'大学名か企業名を入力してください。',   ok:'『性別』を選択しましょう。',                ng:'『学校（企業）名』が入力されていません!' });
  var RB_SEX = new C_RadioBox     ({                            next:['#bar2-1','#bar2-2','#bar2-3'] },{                                            ok:'『文理』を選択しましょう。',                ng:'『性別』が選択されていません!' });
  var RB_SH  = new C_RadioBox     ({                            next:['#bar3-1','#bar3-2','#bar3-3'] },{                                            ok:'『入退室』を入力しましょう。',              ng:'『文理』が入力されていません!' });
  var RB_IO  = new C_RadioBox     ({                                                                 },{                                            ok:'ここをクリックすると、データを送信します。', ng:'『入退室』が入力されていません!' });
  var PostAjax = new C_PostAjax();
/*
  本文
      */
$(function(){
  $('#wrapper_Number')
    .focusin (function(){ TB_Num.updateDescription_In();  TB_Num.updateInputcolor_In(); })
    .focusout(function(){ TB_Num.checkInputexist();       TB_Num.releaseDisabled_TB();  TB_Num.updateDescription_Out();  TB_Num.updateInputcolor_Out(); });
  $('#wrapper_Name')
    .focusin (function(){ TB_Nam.updateDescription_In();  TB_Nam.updateInputcolor_In(); })
    .focusout(function(){ TB_Nam.checkInputexist();       TB_Nam.releaseDisabled_TB();  TB_Nam.updateDescription_Out();  TB_Nam.updateInputcolor_Out(); });
  $('#wrapper_Affiliation')
    .focusin (function(){ TB_Aff.updateDescription_In();  TB_Aff.updateInputcolor_In(); })
    .focusout(function(){ TB_Aff.checkInputexist();       TB_Aff.releaseDisabled_RB();  TB_Aff.updateDescription_Out();  TB_Aff.updateInputcolor_Out(); });

  $('#wrapper_SEX').click(function(){ RB_SEX.checkInputexist();  RB_SEX.releaseDisabled_RB();  RB_SEX.updateDescription_Out(); });
  $('#wrapper_SH') .click(function(){ RB_SH.checkInputexist();   RB_SH.releaseDisabled_RB();   RB_SH.updateDescription_Out();  });
  $('#wrapper_IO') .click(function(){ RB_IO.checkInputexist();                                 RB_IO.updateDescription_Out();  });

  $('#description').click(function(){ PostAjax.checkexistAll(TB_Nam.exist,TB_Aff.exist,RB_SEX.exist,RB_SH.exist,RB_IO.exist); });
});