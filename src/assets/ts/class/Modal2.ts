// *****************************************************
// モーダル
//    マイクロモーダルのライブラリを使用
//      npm i micromodal
//      npm i @types/micromodal
// *****************************************************
import MicroModal from 'micromodal';
import { Utils } from '../utils/Utils';

// *****************************************************
// モーダルクラス
// *****************************************************
export class Modal {
  private _triggerElem: HTMLElement | null;   // モーダル内トリガー要素
  private _contentElem: HTMLElement | null;   // モーダル内コンテンツ要素

  // ----------------------------------------------------
  // 機能：コンストラクタ
  // 引数：なし
  // 返値：なし
  //----------------------------------------------------
  constructor() {
    // 必要要素の取得
    this._triggerElem = document.getElementById('modal_trigger');
    this._contentElem = document.getElementById('modal_content');

    // トリガー押下時にコンテンツをモーダルにセット
    const triggers = document.querySelectorAll('.modalTrigger');
    if (triggers) {
      triggers.forEach((trg) => {
        trg.addEventListener('click', () => {
          const content = trg.querySelector('.modalContent');
          if (content) {
            if (this._triggerElem && this._contentElem) {
              this._contentElem.innerHTML = content.innerHTML;
              this._triggerElem.click();
            }
          }
        });
      });
    }

    // マイクロモーダルの初期化
    MicroModal.init({
      onShow: this._onShow,
      onClose: this._onClose,
      disableScroll: true,      // true:メイン画面のスクロール禁止（正常に動作しないので、独自処理を追加している）
      // disableFocus: true,       // true:自動フォーカスを禁止
      awaitOpenAnimation: true,
      awaitCloseAnimation: true
    });
  }
  //----------------------------------------------------
  // 機能：モーダルを開く際に呼び出す処理
  // 引数：なし
  // 戻値：なし
  //----------------------------------------------------
  private _onShow = (modal: any) => {
    // 背景のスクロールを不可とする
    Utils.scrollLock();
  }
  //----------------------------------------------------
  // 機能：モーダルを閉じる際に呼び出す処理
  // 引数：なし
  // 戻値：なし
  //----------------------------------------------------
  private _onClose = () => {
    // モーダル内のコンテンツクリア
    if (this._contentElem) {
      this._contentElem.innerHTML = "";
    }
    // 背景のスクロールを可能とする
    Utils.scrollUnlock();
  }
}
