const formData = [];
let currentStep = 1;

// مدیریت پیشرفت مراحل
function updateProgress() {
    document.querySelectorAll('.progress-step').forEach(step => {
        const stepNumber = parseInt(step.dataset.step);
        step.classList.remove('active', 'completed');
        
        if (stepNumber < currentStep) {
            step.classList.add('completed');
        } else if (stepNumber === currentStep) {
            step.classList.add('active');
        }
    });
}

// تغییر مراحل
function navigateToStep(newStep) {
    // حذف کلاس اکتیو از همه مراحل
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    
    // انتخاب دقیق المنت مرحله جدید
    const nextStepElement = document.querySelector(`.step[data-step="${newStep}"]`);
    
    // بررسی وجود المنت
    if(nextStepElement) {
        nextStepElement.classList.add('active');
        currentStep = newStep; // به روزرسانی شماره مرحله فعلی
        updateProgress();
    } else {
        console.error('مرحله مورد نظر وجود ندارد:', newStep);
    }
}

// اعتبارسنجی مراحل
function validateStep(stepElement) {
    if (currentStep === 3) {
        const cardsContainer = document.getElementById('cards-container');
        if (cardsContainer.children.length === 0) {
            alert('لطفا حداقل یک کارت هال و پذیرایی اضافه کنید');
            return false;
        }
    }

    const inputs = stepElement.querySelectorAll('input, select, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (input.type === 'checkbox' && !input.checked) {
            isValid = false;
            input.parentElement.style.color = 'red';
        } else if (!input.checkValidity()) {
            isValid = false;
            input.style.borderColor = 'red';
        } else {
            input.style.borderColor = '#bdc3c7';
            if (input.type === 'checkbox') {
                input.parentElement.style.color = 'inherit';
            }
        }
    });

    if (!isValid) {
        alert('لطفا تمام فیلدهای ضروری را به درستی پر کنید');
    }
    return isValid;
}

// ذخیره داده‌ها
function saveStepData(stepElement) {
    const data = {
        step: currentStep,
        fields: {}
    };

    stepElement.querySelectorAll('input, select, textarea').forEach(input => {
        const key = input.tagName.toLowerCase() + '-' + input.type;
        data.fields[key] = input.type === 'checkbox' ? input.checked : 
                         input.type === 'file' ? [...input.files].map(f => f.name) :
                         input.value;
    });

    formData[currentStep - 1] = data;
}

// مدیریت کلیک دکمه‌ها
document.addEventListener('click', function(e) {
    const stepElement = e.target.closest('.step');
    
    if (e.target.classList.contains('next-btn')) {
        if (!validateStep(stepElement)) return;
        saveStepData(stepElement);
        currentStep++;
        navigateToStep(currentStep);
    }
    
    if (e.target.classList.contains('prev-btn')) {
        currentStep--;
        navigateToStep(currentStep);
    }
    
    if (e.target.classList.contains('submit-btn')) {
        if (!validateStep(stepElement)) return;
        saveStepData(stepElement);
        // showResults();
        resetForm();
    }
});


// نمایش نتایج
function showResults() {
    const output = document.getElementById('output');
    output.innerHTML = JSON.stringify(formData, null, 4);
}

// ریست فرم
function resetForm() {
    document.querySelectorAll('input, select, textarea').forEach(input => {
        if (input.type !== 'button') input.value = '';
        if (input.type === 'checkbox') input.checked = false;
        if (input.type === 'file') input.value = '';
    });
    currentStep = 1;
    formData.length = 0;
    navigateToStep(1);
}