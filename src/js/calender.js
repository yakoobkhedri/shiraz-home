const Jmoment = moment().locale('fa');
    $('#daterangepicker').daterangepicker({
        autoApply: true,
        alwaysShowCalendars: true,
        minDate: new Date(),
        persian: {
            enable: true,
            persianDigits: true,
        },
        locale: {
            direction: 'rtl',
            firstDay: 0,
            format: 'jYYYY-jMM-jDD',
            applyLabel: 'اعمال',
            cancelLabel: 'لغو',
            monthNames: [
                "فروردین",
                "اردیبهشت",
                "خرداد",
                "تیر",
                "مرداد",
                "شهریور",
                "مهر",
                "آبان",
                "آذر",
                "دی",
                "بهمن",
                "اسفند"
            ],
            daysOfWeek: [
                'ش',
                'ی',
                'د',
                'س',
                'چ',
                'پ',
                'ج',
            ],
        }
    });