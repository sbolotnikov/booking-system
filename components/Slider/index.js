import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/lazy';
// import Swiper core and required modules
import SwiperCore, { Lazy, Autoplay, Pagination } from 'swiper';
import Head from 'next/head';

// install Swiper modules
SwiperCore.use([Lazy, Autoplay, Pagination]);

function slider() {
  // POSTS from VK  https://dev.vk.com/widgets/post
  let posts = [
    `<div id='vk_post_-40271005_12455'></div>
    <script type="text/javascript">
       VK.Widgets.Post('vk_post_-40271005_12455', -40271005, 12455, 'AyR7Hs9YovtrAoG8SM1Gq75kmQ');
    </script>`,
    `<div id='vk_post_-40271005_12454'></div>
    <script type="text/javascript">
       VK.Widgets.Post('vk_post_-40271005_12454', -40271005, 12454, 'j415DQ-zYOGXQFm5TarTYE8r_A');
    </script>`,
    `<div id='vk_post_-40271005_12434'></div>
    <script type="text/javascript">
       VK.Widgets.Post('vk_post_-40271005_12434', -40271005, 12434, 'oC9f1xEbWCB8toa2CKoAvbDIFg');
    </script>`,
    `<div id='vk_post_-40271005_12432'></div>
    <script type="text/javascript">
       VK.Widgets.Post('vk_post_-40271005_12432', -40271005, 12432, 'ZBuQH1u_MKvOLdqWl0AYLqKKXA');
    </script>`
  ];
    return (
    <div className="max-w-[1170px]">
    <Head>
    <script
  type="text/javascript"
  src="https://vk.com/js/api/openapi.js?168"
  charset="windows-1251"
></script>
    </Head>
      <Swiper
        watchSlidesProgress={true}
        slidesPerView={1}
        lazy={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          660: {
            slidesPerView: 2,
          },
          1000: {
            slidesPerView: 3,
          },
        }}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      >
        {posts &&
          posts.map((item, i) => {
            return (
              <SwiperSlide key={'slide___'+i}>
                <div key={'post___'+i}
                  dangerouslySetInnerHTML={{ __html: item }}
                  className="swiper-lazy"
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
}

export default slider;
