/**
 * https://blog.logrocket.com/lazy-loading-using-the-intersection-observer-api/
 * https://medium.com/fasal-engineering/image-lazy-loading-using-browsers-intersection-observer-api-a-step-by-step-guide-with-examples-b1a867614e8
 *
 */
const lazyImages = [...document.querySelectorAll('.lazy-loaded-image.lazy')];

/** Then we set up a intersection observer watching over those images and whenever any of those becomes visible on the view then replace the placeholder image with actual one, remove the non-loaded class and then unobserve for that element **/
let lazyImageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      let lazyImage = entry.target;
      lazyImage.src = lazyImage.dataset.src;
      lazyImageObserver.unobserve(lazyImage);
    }
  });
});

lazyImages.forEach((img) => lazyImageObserver.observe(img));
