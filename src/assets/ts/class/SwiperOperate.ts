// *****************************************************
// Swiper
// *****************************************************
import Swiper, { Navigation, Pagination, Autoplay, SwiperOptions } from 'swiper';


// *****************************************************
// Swiper操作クラス
// *****************************************************
export class SwiperOperate {
  constructor() {
    Swiper.use([Navigation, Pagination, Autoplay]);

    const swiperParams: SwiperOptions = {
      loop: false,   // 一番最後まで行ったときに最初に戻る（true）か戻らない（false）か
      // autoplay: {   // 自動再生
      //   delay: 5000,    // 間隔（ミリ秒）
      //   disableOnInteraction: true // 操作されたら自動再生をストップさせる（true）設定（規定値true）
      // },
      slidesPerView: 1,   // 1画面に表示するスライドの枚数
      spaceBetween: 50,   // スライド同士の距離（px）
      speed: 300,         // スライドが移動する時間（ミリ秒）（規定値は300ms）
      // ナビゲーションボタン（前に戻るボタン、次に進むボタン）
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    };

    const swiper = new Swiper('.swiper', swiperParams);

    // const topCaseStudies = new Swiper(".swiper", {
    //   slidesPerView: 1.07,
    //   spaceBetween: 2,
    //   centeredSlides: true,
    //   initialSlide: 0,
    //   loop: true,
    //   autoplay: {
    //     // 自動再生
    //     delay: 2000, // 間隔（ミリ秒）
    //     disableOnInteraction: false, // 操作されたら自動再生をストップさせる（true）設定（規定値true）
    //   },
    //   allowTouchMove: true,
    //   navigation: {
    //     nextEl: ".swiperNav-next",
    //     prevEl: ".swiperNav-prev",
    //   },
    //   pagination: {
    //     el: ".swiper-pagination",
    //   },
    // });
  }
}
