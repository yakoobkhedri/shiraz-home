// const modals = document.querySelector(".modal");
// const modalContainer = modals.querySelectorAll(".modal-container");

// modalContainer.forEach((item) => {
//   const buttonId = item?.dataset?.button;
//   const button = document?.getElementById(buttonId);
//   const closeButton = item?.querySelector(".close-button");
//   const modalContent = item?.querySelector(".modal-content");

//   const close = () => {
//     document.documentElement.style.overflow = "";
//     item.style.visibility = "hidden";
//     item.style.opacity = "0";
//   };
//   const open = () => {
//     item.style.visibility = "visible";
//     item.style.opacity = "1";
//     document.documentElement.style.overflow = "hidden";
//   };

//   button?.addEventListener("click", open);
//   item?.addEventListener("click", close);
//   closeButton?.addEventListener("click", close);
//   modalContent?.addEventListener("click", (e) => e.stopPropagation());
// });

document.querySelectorAll('.modal-container').forEach(modal => {
  // پیدا کردن کلاس مربوط به دکمه‌های این مودال
  const modalClass = modal.dataset.modalClass;
  
  // اگر کلاس مشخص نشده بود، از ادامه صرف‌نظر می‌کنیم
  if (!modalClass) return;

  const closeButton = modal.querySelector('.close-button');
  const modalContent = modal.querySelector('.modal-content');
  const modalButtons = document.querySelectorAll(`.${modalClass}`);

  const closeModal = () => {
    document.documentElement.style.overflow = "";
    modal.style.visibility = "hidden";
    modal.style.opacity = "0";
  };
  
  const openModal = () => {
    modal.style.visibility = "visible";
    modal.style.opacity = "1";
    document.documentElement.style.overflow = "hidden";
  };

  // اضافه کردن رویداد به تمام دکمه‌های مربوطه
  modalButtons.forEach(button => {
    button.addEventListener("click", openModal);
  });

  // رویدادهای بستن مودال
  modal.addEventListener("click", closeModal);
  if (closeButton) closeButton.addEventListener("click", closeModal);
  if (modalContent) modalContent.addEventListener("click", e => e.stopPropagation());
});