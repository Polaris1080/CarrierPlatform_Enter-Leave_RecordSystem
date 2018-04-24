function CONTROLLER(Command,Suffix) {
  let Inputexist;　//入力欄に入力が存在するかどうか

  for (let index = 0; index < Command.length; index += 2) {
    switch (Command[index]) {
      case 'C':
          switch (Command[index+1]) {
            case '1':  Inputexist=MODEL_CheckInputexist_Textbox (Suffix);  break;
            case '2':  Inputexist=MODEL_checkInputexist_Radiobox(Suffix);  break;
          }   
        break;
      case 'F':
          switch (Command[index+1]) {
            case '1':  MODEL_FlagChenge(Suffix,Inputexist);  break;
          }   
        break;
      case 'O':
          switch (Command[index+1]) {
            case '1':  MODEL_OpenLock_Textbox (Suffix);  break;
            case '2':  MODEL_OpenLock_Radiobox(Suffix);  break;
          }   
        break;
      case 'P':
          switch (Command[index+1]) {
            case '1':  MODEL_PostAjax();  break;
          }   
        break;  
      case 'S':
          switch (Command[index+1]) {
            case '1':  MODEL_ShowDescription_In (Suffix,Inputexist);  break;
            case '2':  MODEL_ShowDescription_Out(Suffix,Inputexist);  break;
          }   
        break;
      case 'U':
          switch (Command[index+1]) {
            case '1':  MODEL_UpdateColor_In   (Suffix);             break;
            case '2':  MODEL_UpdateColor_Out  (Suffix,Inputexist);  break;
            case '3':  MODEL_UpdateColor_First(Suffix,Inputexist);  break;
          }   
        break;    
    }
  }
}