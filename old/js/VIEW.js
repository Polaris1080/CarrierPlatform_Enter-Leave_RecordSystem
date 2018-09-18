//入力欄ロック'disabled'を解除する
function VIEW_OpenLock(Target) {$(Target).prop('disabled',false);}
//フッターの文章を更新する
function VIEW_ShowDescription(State,Suffix) {
  const SOURCE={
    'enter':['まだ入館証を作っていない人は空欄に。','スペースは不要です。','大学名か企業名を入力してください。'],
    'ok'   :['『お名前』を入力しましょう。','『学校（企業）名』を入力しましょう。','『性別』を選択しましょう。',
             '『文理』を選択しましょう。'  ,'『入退室』を入力しましょう。'       ,'ここをクリックすると、データを送信します。'],
    'ng'   :['はじめまして! Hello World!' ,'『お名前』が入力されていません!','『学校（企業）名』が入力されていません!',
             '『性別』が選択されていません!','『文理』が入力されていません!' ,'『入退室』が入力されていません!'],
    'other':['ここに説明が表示されます。','データ送信開始!','入力欄はすべて埋まってますか？','エラー発生!']};
  $('#description').text(SOURCE[State][Suffix]);  
}
//入力欄の'background-color'を変更する
function VIEW_UpdateColor(Target,State) {
  const SOURCE={enter:'#ffc',ok:'rgba(0,0,255,0.5)',ng:'rgba(255,0,0,0.5)',first:'rgba(0,255,0,0.5)'};
  $(Target).css('background-color',SOURCE[State]);      
}