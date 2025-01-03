
// compare

let compareItems = [];
$(".compare-product").click(function (e) {
  e.preventDefault();
  $(".compare-modal").removeClass("hidden");
  const compareId = $(this).attr("compare-id");
  const compareInch = $(this).attr("compare-inch");
  const compareTitle = $(this).attr("compare-title");
  const compareImg = $(this).attr("compare-img");
  const price = $(this).attr("compare-price");
  const oldPrice = $(this).attr("compare-oldPrice");
  if (compareItems.filter((item) => item == compareId).length) return;
  compareItems.push(compareId);

  const compareItem = `
     <div class="rounded-[20px] bg-white shadow-7 compare-item">
            <div class="p-5 pb-9 sm:pb-16">
              <div class="flex items-center justify-between gap-2">
                <svg ompare-id="${compareId}" class="remove-compare-item group cursor-pointer" width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.728 21.2133L21.2133 12.7281" class="transition group-hover:stroke-red-500" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M21.2133 21.2133L12.728 12.7281" class="transition group-hover:stroke-red-500" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
                <div class="flex items-center gap-2.5">
                  <p class="text-lg font-semibold text-[#4A4A4A]">${compareInch}”</p>
                  <img alt="icon" src="../img/svg/image 4.svg" class="w-7 h-7">
                </div>
              </div>
              <img alt="img" src="${compareImg}"
                class="w-[168px] sm:w-[229px] h-[108px] sm:h-[147px] mx-auto mt-[14px] sm:mt-9">
            </div>
            <div class="rounded-[20px] bg-primary pt-7 ltr:pl-4 rtl:pr-4 pb-4 ltr:pr-5 rtl:pl-5">
              <div class="flex justify-between gap-5">
                <a
                  class="text-white transition line-clamp-2 rtl:text-right hover:text-[#E56F8C] sm:text-lg font-semibold h-[53px]">
                  ${compareTitle}
                  </a>
                <a
                  class="relative flex-shrink-0 -top-[50px] rtl:left-2 ltr:right-2 flex-center gradient-hover3 transition border-linear3 ltr:!rounded-br-2xl ltr:sm:!rounded-br-[22px] rtl:!rounded-bl-2xl rtl:sm:!rounded-bl-[22px] !rounded-lg sm:!rounded-2xl w-9 sm:w-[52px] h-9 sm:h-[52px] !border-2 !border-white">
                  <img alt="icon" src="../img/svg/solar_cart-plus-bold-duotone.svg" class="w-6 sm:w-auto h-6 sm:h-auto">
                </a>
              </div>
              <p class="text-[13px] text-white sm:mt-2 opacity-50 rtl:text-left ltr:text-right line-through">
                ${oldPrice} تومان</p>
              <p class="text-white mt-1 sm:mt-3 rtl:text-left ltr:text-right"><span class="font-bold">${price}</span>
                تومان</p>
            </div>
            <div class="js-tilt-glare"
              style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; overflow: hidden; pointer-events: none; border-radius: inherit;">
              <div class="js-tilt-glare-inner"
                style="position: absolute; top: 50%; left: 50%; pointer-events: none; background-image: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%); transform: rotate(180deg) translate(-50%, -50%); transform-origin: 0% 0% 0px; opacity: 0; width: 936px; height: 936px;">
              </div>
            </div>
          </div>
  `;

  $(".compare-list").append(compareItem);
  $('html, body').animate({
    scrollTop: $("#compare-product-modal").offset().top
  }, 2000);
});

$(".clear-compare").click(function () {
  compareItems = [];
  $(".compare-modal").addClass("hidden");
  $(".compare-list").html("");
});

$(".compare-list").on("click", ".remove-compare-item", function () {
  const compareId = $(this).attr("compare-id");
  compareItems = compareItems.filter((item) => item != compareId);
  $(this).parent().parent().parent().remove();
  if (!compareItems.length) $(".compare-modal").addClass("hidden");
});

$(".compare-all").click(function () {
  window.location.href = `./compare.html?ids=${compareItems.join(",")}`;
});