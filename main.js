let btn = document.querySelector(".inb-box button");
let day = document.querySelector(".day");
let month = document.querySelector(".month");
let year = document.querySelector(".year");

btn.onclick = function() {
    let inputYear = parseInt(year.value);
    let inputDay = parseInt(day.value);
    let inputMonth = parseInt(month.value) - 1; // تنقص 1 من الشهر لأن جافا سكريبت تبدأ من الشهر 0

    // التحقق من صحة اليوم
    if (isNaN(inputDay) || inputDay < 1 || inputDay > 31) {
        day.style.borderColor = "var(--Lightred)";
        day.nextElementSibling.textContent = "Must be a valid day";
    } else {
        day.style.borderColor = "var(--Smokeygrey)";
        day.nextElementSibling.textContent = "";
    }

    // التحقق من صحة الشهر
    if (isNaN(inputMonth) || inputMonth < 0 || inputMonth > 11) {
        month.style.borderColor = "var(--Lightred)";
        month.nextElementSibling.textContent = "Must be a valid month";
    } else {
        month.style.borderColor = "var(--Smokeygrey)";
        month.nextElementSibling.textContent = "";
    }

    // التحقق من صحة السنة
    if (isNaN(inputYear) || inputYear < 1) {
        year.style.borderColor = "var(--Lightred)";
        year.nextElementSibling.textContent = "Must be a valid year";
    } else {
        year.style.borderColor = "var(--Smokeygrey)";
        year.nextElementSibling.textContent = "";
    }

    // التحقق من صلاحية التاريخ بالكامل إذا كانت الحقول صالحة
    if (!isNaN(inputDay) && inputDay >= 1 && inputDay <= 31 &&
        !isNaN(inputMonth) && inputMonth >= 0 && inputMonth <= 11 &&
        !isNaN(inputYear) && inputYear >= 1) {

        let isValidDate = true;
        let ourDate = new Date(inputYear, inputMonth, inputDay);

        if (ourDate.getFullYear() !== inputYear || ourDate.getMonth() !== inputMonth || ourDate.getDate() !== inputDay) {
            isValidDate = false;
        }

        if (!isValidDate) {
            day.style.borderColor = "var(--Lightred)";
            month.style.borderColor = "var(--Lightred)";
            year.style.borderColor = "var(--Lightred)";
            day.nextElementSibling.textContent = "Must be a valid date";
        } else {
            let DateNow = new Date();
            let timeDifference = DateNow - ourDate;

            // تحويل الفرق إلى أيام
            let daysDifference = timeDifference / (1000 * 3600 * 24);

            // حساب السنوات (من خلال القسمة على 365.25 لأخذ السنة الكبيسة في الحسبان)
            let years = Math.floor(daysDifference / 365.25);

            // حساب الأشهر المتبقية بعد حساب السنوات
            let remainingDaysAfterYears = daysDifference % 365.25;
            let months = Math.floor(remainingDaysAfterYears / 30); // متوسط الأشهر = 30 يوم
            let days = Math.floor(remainingDaysAfterYears % 30); // الأيام المتبقية بعد الأشهر

            // عرض النتائج في الصفحة
            document.querySelector(".result-year span").textContent = years;
            document.querySelector(".result-months span").textContent = months;
            document.querySelector(".result-days span").textContent = days;
        }
    }
}