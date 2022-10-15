import { h, Component } from 'preact';
import Swiper, { Thumbs, Navigation } from 'swiper';

export default class ImageGallery extends Component {
  componentWillUnmount() {
    this.swiper.destroy(true, true);
    this.thumbsSwiper.destroy(true, true);
    this.swiper = null;
    this.thumbsSwiper = null;
  }

  componentDidMount() {
    if (typeof window !== undefined) {
      this.thumbsSwiper = new Swiper(this.thumbsSwiperRef, {
        spaceBetween: 10,
        slidesPerView: 4.5,
        freeMode: true,
        watchSlidesProgress: true,
      });
      this.swiper = new Swiper(this.mainSwiperRef, {
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        modules: [Navigation, Thumbs],
        thumbs: {
          swiper: this.thumbsSwiper,
          autoScrollOffset: 1
        },
      });
    }
  }

  render({ items }) {
    return (
      <>
        <div className="swiper mySwiper2" ref={(r) => (this.mainSwiperRef = r)}>
          <div className="swiper-wrapper">
            {items.map((item, index) => (
              <div className="swiper-slide" key={`swiper-slide-${index}`}>
                <img src={item.src} alt={item.alt} title={item.title} />
                { item.title && <div className="slide-text">{item.title}</div> }
              </div>
            ))}
          </div>
          <div class="swiper-pagination"></div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
        <div thumbsSlider="" class="swiper mySwiper" ref={(r) => (this.thumbsSwiperRef = r)}>
          <div class="swiper-wrapper">
            {items.map((item, index) => (
              <div className="swiper-slide" key={`swiper-slide-${index}`}>
                <img src={item.src} alt={item.alt} title={item.title} />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}
