// انتخاب تمام دکمه‌های افزایش و کاهش
const increaseButtons = document.querySelectorAll('.increase-btn');
const decreaseButtons = document.querySelectorAll('.decrease-btn');

// افزودن ایونت لیسنر به دکمه‌های افزایش
increaseButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault(); // جلوگیری از رفرش صفحه
        const input = button.previousElementSibling;
        let value = parseInt(input.value);
        value++;
        input.value = value;
    });
});

// افزودن ایونت لیسنر به دکمه‌های کاهش
decreaseButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault(); // جلوگیری از رفرش صفحه
        const input = button.nextElementSibling;
        let value = parseInt(input.value);
        if (value > 0) {
            value--;
        }
        input.value = value;
    });
});

// آرایه برای ذخیره‌سازی داده‌ها
let dataArray = [];

// گرفتن فرم و افزودن ایونت لیسنر برای submit
const form = document.getElementById('hall-form');
form.addEventListener('submit', function(event) {
    event.preventDefault(); // جلوگیری از رفرش صفحه
    saveData(); // ذخیره‌سازی داده‌ها
});

// تابع ذخیره‌سازی داده‌ها
function saveData() {
    // دریافت مقادیر از فیلدها
    const number1 = document.getElementById('number1').value;
    const number2 = document.getElementById('number2').value;
    const number3 = document.getElementById('number3').value;
    const select1 = document.getElementById('select1').value;
    const select2 = document.getElementById('select2').value;

    // بررسی پر بودن تمام فیلدها
    if (number1 && number2 && number3 && select1 && select2) {
        // ایجاد یک شیء برای ذخیره‌سازی داده‌ها
        const data = {
            number1,
            number2,
            number3,
            select1,
            select2
        };

        // افزودن شیء به آرایه
        dataArray.push(data);

        // نمایش داده‌ها در کارت
        displayData();

        // پاک کردن فیلدها
        clearFields();
    } else {
        alert("لطفاً تمام فیلدها را پر کنید.");
    }
}

// تابع نمایش داده‌ها در کارت
function displayData() {
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = ''; // پاک کردن محتوای قبلی

    dataArray.forEach((data, index) => {
        // ایجاد کارت
        const card = document.createElement('div');
        card.className = 'card';

        // محتوای کارت
        card.innerHTML = `
            <div class="mt-5 rounded-[10px] border-dashed-2-primary p-3 bg-[#FFF6EA] flex items-start gap-4">
                   <div class="text-dark font-bold flex-grow">
                    <p>هال و پذیرایی <span class="font-faNumBold">${index+1}</span></p>
                    <div class="flex items-center gap-3 flex-wrap text-sm font-medium mt-3">
                      <p><span class="font-faNumBold text-green-600">${data.number1} عدد</span> تخت یک نفره</p>
                      <p><span class="font-faNumBold text-green-600">${data.number2} عدد</span> تخت دو نفره</p>
                       <p><span class="font-faNumBold text-green-600">${data.number3} عدد</span> تخت دو طبقه</p>
                       <p>سیستم گرمایشی <span class="text-green-600">${data.select1}</span></p>
                        <p>سیستم سرمایشی <span class="text-green-600">${data.select2}</span></p>
                    </div>
                   </div>
                   <div class="flex items-center gap-4 flex-shrink-0">
                    <svg onclick="deleteCard(${index})" class="group cursor-pointer transition hover:scale-95" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle class="transition group-hover:fill-red-700" cx="15" cy="15" r="15" fill="#F01212"/>
                       <path d="M22.5584 9.35842C21.2167 9.22508 19.875 9.12508 18.525 9.05008V9.04175L18.3417 7.95841C18.2167 7.19175 18.0334 6.04175 16.0834 6.04175H13.9C11.9584 6.04175 11.775 7.14175 11.6417 7.95008L11.4667 9.01675C10.6917 9.06675 9.91672 9.11675 9.14172 9.19175L7.44172 9.35842C7.09172 9.39175 6.84172 9.70008 6.87505 10.0417C6.90838 10.3834 7.20838 10.6334 7.55838 10.6001L9.25838 10.4334C13.625 10.0001 18.0251 10.1667 22.4417 10.6084C22.4667 10.6084 22.4834 10.6084 22.5084 10.6084C22.8251 10.6084 23.1 10.3667 23.1334 10.0417C23.1584 9.70008 22.9084 9.39175 22.5584 9.35842Z" fill="white"/>
                       <path d="M21.0254 11.7833C20.8254 11.5749 20.5504 11.4583 20.2671 11.4583H9.73378C9.45044 11.4583 9.16711 11.5749 8.97544 11.7833C8.78378 11.9916 8.67544 12.2749 8.69211 12.5666L9.20878 21.1166C9.30044 22.3833 9.41711 23.9666 12.3254 23.9666H17.6754C20.5838 23.9666 20.7004 22.3916 20.7921 21.1166L21.3088 12.5749C21.3254 12.2749 21.2171 11.9916 21.0254 11.7833ZM16.3838 19.7916H13.6088C13.2671 19.7916 12.9838 19.5083 12.9838 19.1666C12.9838 18.8249 13.2671 18.5416 13.6088 18.5416H16.3838C16.7254 18.5416 17.0088 18.8249 17.0088 19.1666C17.0088 19.5083 16.7254 19.7916 16.3838 19.7916ZM17.0838 16.4583H12.9171C12.5754 16.4583 12.2921 16.1749 12.2921 15.8333C12.2921 15.4916 12.5754 15.2083 12.9171 15.2083H17.0838C17.4254 15.2083 17.7088 15.4916 17.7088 15.8333C17.7088 16.1749 17.4254 16.4583 17.0838 16.4583Z" fill="white"/>
                    </svg>
                   </div>
            </div>
        `;

        // افزودن کارت به صفحه
        cardsContainer.appendChild(card);
    });
}

// تابع حذف کارت
function deleteCard(index) {
    dataArray.splice(index, 1); // حذف داده از آرایه
    displayData(); // به‌روزرسانی نمایش کارت‌ها
}

// تابع پاک کردن فیلدها
function clearFields() {
    document.getElementById('number1').value = '';
    document.getElementById('number2').value = '';
    document.getElementById('number3').value = '';
    document.getElementById('select1').value = '';
    document.getElementById('select2').value = '';
}