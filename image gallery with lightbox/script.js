$(document).ready(function () {
  const $galleryImgs = $(".gallery-img");
  const $lightbox = $("#lightbox");
  const $lightboxImg = $("#lightbox-img");
  const $caption = $("#lightbox-caption");
  let currentIndex = 0;

  const images = $galleryImgs.map(function () {
    return {
      src: this.src,
      caption: $(this).data("caption")
    };
  }).get();

  function showLightbox(index) {
    const image = images[index];
    currentIndex = index;
    $lightboxImg.attr("src", image.src);
    $caption.text(image.caption);
    $lightbox.fadeIn();
  }

  $galleryImgs.on("click", function () {
    const index = $galleryImgs.index(this);
    showLightbox(index);
  });

  $(".close").on("click", () => $lightbox.fadeOut());
  $(".next").on("click", () => showLightbox((currentIndex + 1) % images.length));
  $(".prev").on("click", () => showLightbox((currentIndex - 1 + images.length) % images.length));

  $lightbox.on("click", function (e) {
    if (e.target === this) $lightbox.fadeOut();
  });

  $(document).on("keydown", function (e) {
    if (!$lightbox.is(":visible")) return;
    if (e.key === "Escape") $lightbox.fadeOut();
    else if (e.key === "ArrowRight") $(".next").click();
    else if (e.key === "ArrowLeft") $(".prev").click();
  });

  // Optional: Swipe for mobile (touch devices)
  let startX = 0;
  $lightbox.on("touchstart", function (e) {
    startX = e.originalEvent.touches[0].clientX;
  });
  $lightbox.on("touchend", function (e) {
    const endX = e.originalEvent.changedTouches[0].clientX;
    if (startX - endX > 50) $(".next").click();
    else if (endX - startX > 50) $(".prev").click();
  });
});
