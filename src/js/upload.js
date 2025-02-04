let imageCounter = 1; // شمارنده برای عکس‌ها

document.getElementById('upload-button').addEventListener('change', function(event) {
    const files = event.target.files;
    const imagePreview = document.getElementById('image-preview');

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function(e) {
            // ایجاد یک container برای هر عکس و شماره آن
            const container = document.createElement('div');
            container.classList.add('image-container');

            // ایجاد عنصر img برای نمایش عکس
            const img = document.createElement('img');
            img.src = e.target.result;

            // ایجاد عنصر span برای نمایش شماره عکس
            const span = document.createElement('span');
            span.textContent = `${imageCounter}`;
            span.classList.add('image-number');

            // اگر عکس شماره ۱ باشد، لیبل "عکس اصلی" اضافه شود
            if (imageCounter === 1) {
                const mainLabel = document.createElement('span');
                mainLabel.textContent = 'عکس اصلی';
                mainLabel.classList.add('main-label');
                container.appendChild(mainLabel);
            }

            // ایجاد دکمه سطل زباله با آیکون SVG
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = `
                <svg class="delete-icon group rtl:left-3 ltr:right-3 top-[14px] !absolute transition hover:scale-95" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle class="transition group-hover:fill-red-700" cx="15" cy="15" r="15" fill="#F01212"/>
                   <path d="M22.5584 9.35842C21.2167 9.22508 19.875 9.12508 18.525 9.05008V9.04175L18.3417 7.95841C18.2167 7.19175 18.0334 6.04175 16.0834 6.04175H13.9C11.9584 6.04175 11.775 7.14175 11.6417 7.95008L11.4667 9.01675C10.6917 9.06675 9.91672 9.11675 9.14172 9.19175L7.44172 9.35842C7.09172 9.39175 6.84172 9.70008 6.87505 10.0417C6.90838 10.3834 7.20838 10.6334 7.55838 10.6001L9.25838 10.4334C13.625 10.0001 18.0251 10.1667 22.4417 10.6084C22.4667 10.6084 22.4834 10.6084 22.5084 10.6084C22.8251 10.6084 23.1 10.3667 23.1334 10.0417C23.1584 9.70008 22.9084 9.39175 22.5584 9.35842Z" fill="white"/>
                   <path d="M21.0254 11.7833C20.8254 11.5749 20.5504 11.4583 20.2671 11.4583H9.73378C9.45044 11.4583 9.16711 11.5749 8.97544 11.7833C8.78378 11.9916 8.67544 12.2749 8.69211 12.5666L9.20878 21.1166C9.30044 22.3833 9.41711 23.9666 12.3254 23.9666H17.6754C20.5838 23.9666 20.7004 22.3916 20.7921 21.1166L21.3088 12.5749C21.3254 12.2749 21.2171 11.9916 21.0254 11.7833ZM16.3838 19.7916H13.6088C13.2671 19.7916 12.9838 19.5083 12.9838 19.1666C12.9838 18.8249 13.2671 18.5416 13.6088 18.5416H16.3838C16.7254 18.5416 17.0088 18.8249 17.0088 19.1666C17.0088 19.5083 16.7254 19.7916 16.3838 19.7916ZM17.0838 16.4583H12.9171C12.5754 16.4583 12.2921 16.1749 12.2921 15.8333C12.2921 15.4916 12.5754 15.2083 12.9171 15.2083H17.0838C17.4254 15.2083 17.7088 15.4916 17.7088 15.8333C17.7088 16.1749 17.4254 16.4583 17.0838 16.4583Z" fill="white"/>
                </svg>
            `;
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', function() {
                container.remove(); // حذف container عکس از صفحه
            });

            // اضافه کردن عکس، شماره، و دکمه حذف به container
            container.appendChild(img);
            container.appendChild(span);
            container.appendChild(deleteButton);

            // اضافه کردن container به image-preview
            imagePreview.appendChild(container);

            // افزایش شمارنده
            imageCounter++;
        };

        reader.readAsDataURL(file);
    }
});