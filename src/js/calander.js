// Persian (Jalali) calendar functions

// داده‌های قیمت ثابت برای روزهای خاص
const priceData = {
    '1404-3-16': { price: 2500000, discount: 3000000 },
    '1404-3-17': { price: 2800000, discount: 3500000 },
    '1404-3-18': { price: 2200000, discount: 2700000 },
    '1404-3-19': { price: 3200000, discount: 4000000 },
    '1404-4-1': { price: 3500000, discount: 4200000 },
    // سایر روزها با قیمت مشخص
};

// داده‌های روزهای رزرو شده
const reservedDays = {
    '1404-3-16': true,
    '1404-3-17': true,
    '1404-4-5': true,
    '1404-4-10': true,
    // سایر روزهای رزرو شده
};

function gregorianToJalali(gy, gm, gd) {
    gy = parseInt(gy);
    gm = parseInt(gm);
    gd = parseInt(gd);
    
    // سال و ماه و روز را به عدد تبدیل می‌کنیم
    let g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    let jy = (gy <= 1600) ? 0 : 979;
    gy -= (gy <= 1600) ? 621 : 1600;
    let gy2 = (gm > 2) ? (gy + 1) : gy;
    let days = (365 * gy) + parseInt((gy2 + 3) / 4) - parseInt((gy2 + 99) / 100) + parseInt((gy2 + 399) / 400) - 80 + gd + g_d_m[gm - 1];
    jy += 33 * parseInt(days / 12053); 
    days %= 12053;
    jy += 4 * parseInt(days / 1461);
    days %= 1461;
    jy += parseInt((days - 1) / 365);
    if (days > 365) days = (days - 1) % 365;
    let jm = (days < 186) ? 1 + parseInt(days / 31) : 7 + parseInt((days - 186) / 30);
    let jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));
    return [jy, jm, jd];
}
// تنظیم منطقه زمانی به تهران
const options = { timeZone: 'Asia/Tehran' };
const now = new Date();
const tehranDate = new Date(now.toLocaleString('en-US', options));
function jalaliToGregorian(jy, jm, jd) {
    jy += 1595;
    let days = -355668 + (365 * jy) + (parseInt(jy / 33) * 8) + parseInt(((jy % 33) + 3) / 4) + jd + ((jm < 7) ? (jm - 1) * 31 : ((jm - 7) * 30) + 186);
    let gy = 400 * parseInt(days / 146097);
    days %= 146097;
    if (days > 36524) {
        gy += 100 * parseInt(--days / 36524);
        days %= 36524;
        if (days >= 365) days++;
    }
    gy += 4 * parseInt(days / 1461);
    days %= 1461;
    if (days > 365) {
        gy += parseInt((days - 1) / 365);
        days = (days - 1) % 365;
    }
    let gd = days + 1;
    const sal_a = [0, 31, ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let gm = 0;
    while (gm < 13 && gd > sal_a[gm]) {
        gd -= sal_a[gm];
        gm++;
    }
    return [gy, gm, gd];
}

function getJalaliMonthLength(jy, jm) {
    if (jm <= 6) return 31;
    if (jm <= 11) return 30;
    if (isLeapJalaliYear(jy)) return 30;
    return 29;
}

function isLeapJalaliYear(jy) {
    const a = jy - 979;
    return ((((a % 33) + 1) % 4) === 0);
}

function getJalaliWeekDay(jy, jm, jd) {
    const [gy, gm, gd] = jalaliToGregorian(jy, jm, jd);
    const date = new Date(gy, gm - 1, gd);
    let day = date.getDay() + 1;
    return day > 7 ? 1 : day;
}

// Calendar class
class PersianCalendar {
    constructor() {
        this.currentDate = new Date();
        this.selectedStart = null;
        this.selectedEnd = null;
        this.hoveredDate = null;
        this.init();
    }

    init() {
        this.renderMonths();
        this.setupEventListeners();
    }

    getCurrentJalali() {
        const gy = this.currentDate.getFullYear();
        const gm = this.currentDate.getMonth() + 1;
        const gd = this.currentDate.getDate();
        return gregorianToJalali(gy, gm, gd);
    }

    renderMonths() {
        const [jy, jm, jd] = this.getCurrentJalali();
        
        this.renderMonth(jy, jm, 'month1');
        
        let nextJy = jy;
        let nextJm = jm + 1;
        if (nextJm > 12) {
            nextJm = 1;
            nextJy++;
        }
        this.renderMonth(nextJy, nextJm, 'month2');
        
        this.updateSelectedRange();
    }

    renderMonth(jy, jm, containerId) {
        const container = document.getElementById(containerId);
        const monthTitle = container.querySelector('.month-title');
        const daysContainer = container.querySelector('.days');
        
        const monthNames = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
        monthTitle.textContent = `${monthNames[jm - 1]} ${jy}`;
        
        daysContainer.innerHTML = '';
        
        const monthLength = getJalaliMonthLength(jy, jm);
        const firstDay = getJalaliWeekDay(jy, jm, 1);
        
        let prevJy = jy;
        let prevJm = jm - 1;
        if (prevJm < 1) {
            prevJm = 12;
            prevJy--;
        }
        const prevMonthLength = getJalaliMonthLength(prevJy, prevJm);
        const daysFromPrevMonth = (firstDay - 1) % 7;
        
        // روزهای ماه قبل
        for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
            const day = prevMonthLength - i;
            const dayElement = this.createDayElement(prevJy, prevJm, day, true);
            daysContainer.appendChild(dayElement);
        }
        
        // روزهای ماه جاری
        for (let day = 1; day <= monthLength; day++) {
            const dayElement = this.createDayElement(jy, jm, day, false);
            daysContainer.appendChild(dayElement);
        }
        
        const totalCells = Math.ceil((daysFromPrevMonth + monthLength) / 7) * 7;
        const daysFromNextMonth = totalCells - (daysFromPrevMonth + monthLength);
        
        let nextJy = jy;
        let nextJm = jm + 1;
        if (nextJm > 12) {
            nextJm = 1;
            nextJy++;
        }
        
        // روزهای ماه بعد
        for (let day = 1; day <= daysFromNextMonth; day++) {
            const dayElement = this.createDayElement(nextJy, nextJm, day, true);
            daysContainer.appendChild(dayElement);
        }
        
        // اعمال استایل‌ها پس از رندر
        this.updateDayElements();
    }

    createDayElement(jy, jm, jd, isOtherMonth) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day' + (isOtherMonth ? ' other-month' : '');
        dayElement.dataset.year = jy;
        dayElement.dataset.month = jm;
        dayElement.dataset.day = jd;
        
        const dateKey = `${jy}-${jm}-${jd}`;
        const dayData = priceData[dateKey];
        const isReserved = reservedDays[dateKey];
        
        let priceHtml = '';
        if (dayData) {
            priceHtml = `
                <div class="day-price">${dayData.price.toLocaleString()}</div>
                <div class="day-discount">${dayData.discount.toLocaleString()}</div>
            `;
        } else {
            priceHtml = '<div class="day-no-price"></div>';
        }
        
        dayElement.innerHTML = `
            <div class="day-number">${jd}</div>
            ${priceHtml}
        `;
        
        if (isReserved) {
            dayElement.classList.add('reserved');
            dayElement.innerHTML += '<div class="reserved-badge">رزرو شده</div>';
        } else {
            dayElement.addEventListener('click', () => this.handleDayClick(jy, jm, jd));
        }
        
        dayElement.addEventListener('mouseenter', () => {
            if (!isReserved) this.handleDayHover(jy, jm, jd);
        });
        dayElement.addEventListener('mouseleave', () => this.clearHoverEffect());
        
        return dayElement;
    }

    handleDayClick(jy, jm, jd) {
        const dateKey = `${jy}-${jm}-${jd}`;
        if (reservedDays[dateKey]) return;
        
        if (!this.selectedStart || (this.selectedStart && this.selectedEnd)) {
            this.selectedStart = [jy, jm, jd];
            this.selectedEnd = null;
            this.clearHoverEffect();
        } else {
            this.selectedEnd = [jy, jm, jd];
            
            const [gy1, gm1, gd1] = jalaliToGregorian(this.selectedStart[0], this.selectedStart[1], this.selectedStart[2]);
            const startDate = new Date(gy1, gm1 - 1, gd1);
            
            const [gy2, gm2, gd2] = jalaliToGregorian(this.selectedEnd[0], this.selectedEnd[1], this.selectedEnd[2]);
            const endDate = new Date(gy2, gm2 - 1, gd2);
            
            if (startDate > endDate) {
                [this.selectedStart, this.selectedEnd] = [this.selectedEnd, this.selectedStart];
            }
        }
        
        this.updateDayElements();
        this.updateSelectedRange();
    }

    handleDayHover(jy, jm, jd) {
    const dateKey = `${jy}-${jm}-${jd}`;
    if (reservedDays[dateKey]) return;
    
    if (!this.selectedStart || this.selectedEnd) return;
    
    this.hoveredDate = [jy, jm, jd];
    
    const [gy, gm, gd] = jalaliToGregorian(jy, jm, jd);
    const hoverDate = new Date(gy, gm - 1, gd);
    
    const [sgy, sgm, sgd] = jalaliToGregorian(this.selectedStart[0], this.selectedStart[1], this.selectedStart[2]);
    const startDate = new Date(sgy, sgm - 1, sgd);
    
    if (hoverDate <= startDate) return;
    
    this.clearHoverEffect();
    
    // اعمال border-radius برای تاریخ شروع در حالت هاور
    const startDay = document.querySelector(`.day[data-year="${this.selectedStart[0]}"][data-month="${this.selectedStart[1]}"][data-day="${this.selectedStart[2]}"]`);
    if (startDay) {
        startDay.classList.add('start-date');
    }
    
    let currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + 1);
    
    while (currentDate < hoverDate) {
        const [cy, cm, cd] = gregorianToJalali(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
        const dayElement = document.querySelector(`.day[data-year="${cy}"][data-month="${cm}"][data-day="${cd}"]`);
        
        if (dayElement && !dayElement.classList.contains('reserved')) {
            dayElement.classList.add('hover-range');
        }
        
        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // همچنین روز فعلی که هاور شده است را هم علامت بزن
    const hoverDay = document.querySelector(`.day[data-year="${jy}"][data-month="${jm}"][data-day="${jd}"]`);
    if (hoverDay) {
        hoverDay.classList.add('hover-range');
        hoverDay.classList.add('end-date');
    }
}

    clearHoverEffect() {
        document.querySelectorAll('.day.hover-range').forEach(day => {
            day.classList.remove('hover-range');
        });
        this.hoveredDate = null;
    }

    updateDayElements() {
    // حذف کلاس‌های قبلی
    document.querySelectorAll('.day').forEach(day => {
        day.classList.remove('selected', 'in-range', 'hover-range', 'start-date', 'end-date', 'single-date');
    });
    
    if (this.selectedStart) {
        const startDateKey = `${this.selectedStart[0]}-${this.selectedStart[1]}-${this.selectedStart[2]}`;
        if (reservedDays[startDateKey]) {
            this.selectedStart = null;
            return;
        }
        
        // اعمال استایل برای تاریخ شروع
        const startDay = document.querySelector(`.day[data-year="${this.selectedStart[0]}"][data-month="${this.selectedStart[1]}"][data-day="${this.selectedStart[2]}"]`);
        if (startDay) {
            startDay.classList.add('selected');
            
            if (this.selectedEnd) {
                startDay.classList.add('start-date');
            } else {
                startDay.classList.add('single-date');
            }
        }
        
        // اگر تاریخ پایان هم انتخاب شده، استایل‌های محدوده را اعمال کن
        if (this.selectedEnd) {
            const endDateKey = `${this.selectedEnd[0]}-${this.selectedEnd[1]}-${this.selectedEnd[2]}`;
            if (reservedDays[endDateKey]) {
                this.selectedEnd = null;
                return;
            }
            
            const [gy1, gm1, gd1] = jalaliToGregorian(this.selectedStart[0], this.selectedStart[1], this.selectedStart[2]);
            const startDate = new Date(gy1, gm1 - 1, gd1);
            
            const [gy2, gm2, gd2] = jalaliToGregorian(this.selectedEnd[0], this.selectedEnd[1], this.selectedEnd[2]);
            const endDate = new Date(gy2, gm2 - 1, gd2);
            
            // اعمال استایل برای تاریخ پایان
            const endDay = document.querySelector(`.day[data-year="${this.selectedEnd[0]}"][data-month="${this.selectedEnd[1]}"][data-day="${this.selectedEnd[2]}"]`);
            if (endDay) {
                endDay.classList.add('selected', 'end-date');
            }
            
            // اعمال استایل برای روزهای بین تاریخ شروع و پایان (حتی other-month)
            let currentDate = new Date(startDate);
            currentDate.setDate(currentDate.getDate() + 1);
            
            while (currentDate < endDate) {
                const [jy, jm, jd] = gregorianToJalali(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
                const dayElement = document.querySelector(`.day[data-year="${jy}"][data-month="${jm}"][data-day="${jd}"]`);
                
                if (dayElement && !dayElement.classList.contains('reserved')) {
                    dayElement.classList.add('in-range');
                }
                
                currentDate.setDate(currentDate.getDate() + 1);
            }
        }
    }
    
    // اگر هاور فعال است، دوباره اعمال کن
    if (this.hoveredDate && !this.selectedEnd) {
        this.handleDayHover(...this.hoveredDate);
    }
}
    updateSelectedRange() {
        const inputDateElement = document.getElementById('inputdate');
        const outputDateElement = document.getElementById('outputdate');
        
        const monthNames = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
        
        if (this.selectedStart && this.selectedEnd) {
            const startStr = `${this.selectedStart[2]} ${monthNames[this.selectedStart[1] - 1]} ${this.selectedStart[0]}`;
            const endStr = `${this.selectedEnd[2]} ${monthNames[this.selectedEnd[1] - 1]} ${this.selectedEnd[0]}`;
            
            if (inputDateElement) inputDateElement.value = startStr;
            if (outputDateElement) outputDateElement.value = endStr;
        } else if (this.selectedStart) {
            const startStr = `${this.selectedStart[2]} ${monthNames[this.selectedStart[1] - 1]} ${this.selectedStart[0]}`;
            if (inputDateElement) inputDateElement.value = startStr;
            if (outputDateElement) outputDateElement.value = '';
        } else {
            if (inputDateElement) inputDateElement.value = '';
            if (outputDateElement) outputDateElement.value = '';
        }
    }

    navigateMonths(offset) {
        const [jy, jm, jd] = this.getCurrentJalali();
        let newJm = jm + offset;
        let newJy = jy;
        
        if (newJm < 1) {
            newJm = 12;
            newJy--;
        } else if (newJm > 12) {
            newJm = 1;
            newJy++;
        }
        
        const [gy, gm, gd] = jalaliToGregorian(newJy, newJm, 1);
        this.currentDate = new Date(gy, gm - 1, gd);
        this.renderMonths();
    }

    setupEventListeners() {
        document.querySelector('.prev-month-btn').addEventListener('click', () => this.navigateMonths(-1));
        document.querySelector('.next-month-btn').addEventListener('click', () => this.navigateMonths(1));
    }
}

// Initialize calendar
document.addEventListener('DOMContentLoaded', () => {
    new PersianCalendar();
});