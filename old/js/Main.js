/*
    変数  value
                 */
//フラグ　[0]は二重送信防止用
var G_Flag =[false,false,false,false,false,false];
//入力箇所をまとめたもの
const G_Input =['#input_Number','#input_Name','#input_Affiliation',':radio[name="SEX"]:checked',':radio[name="SH"]:checked',':radio[name="IO"]:checked'];
/*
    本体  main
                */
$(function()
  { 
    $('#wrapper_Number')
      .focusin (function(){CONTROLLER('S1U1',0);})
      .focusout(function(){CONTROLLER('C1O1S2U3',0);});
    $('#wrapper_Name')
      .focusin (function(){CONTROLLER('S1F1U1',1);})
      .focusout(function(){CONTROLLER('C1O1S2F1U2',1);});
    $('#wrapper_Affiliation')
      .focusin (function(){CONTROLLER('S1F1U1',2);})
      .focusout(function(){CONTROLLER('C1O2S2F1U2',2);});
    $('#wrapper_SEX').click(function(){CONTROLLER('C2O2S2F1',3);});
    $('#wrapper_SH') .click(function(){CONTROLLER('C2O2S2F1',4);});
    $('#wrapper_IO') .click(function(){CONTROLLER('C2S2F1',5);});
    $('#description').click(function(){if(G_Flag[0]==false & G_Flag[1]==true & G_Flag[2]==true & G_Flag[3]==true & G_Flag[4]==true & G_Flag[5]==true){CONTROLLER('P1');}else{VIEW_ShowDescription('other',2);}}); 
  }
);