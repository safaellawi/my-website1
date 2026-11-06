document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. زر العودة للأعلى (Scroll to top) ---
    const backToTopBtn = document.getElementById('btn-back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 2. تبديل الوضع الليلي (Dark Mode) والحفظ في localStorage ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        }
        darkModeToggle.addEventListener('change', () => {
            if (darkModeToggle.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // --- 3. نظام الفلترة عبر الأزرار (في صفحة events.html) ---
    const filterButtons = document.querySelectorAll("#categoryButtons .filter-btn");
    const eventItems = document.querySelectorAll(".event-item");

    function applyFilter(filterValue) {
        // تحديث حالة الأزرار البصرية
        filterButtons.forEach(btn => {
            if (btn.getAttribute("data-filter") === filterValue) {
                btn.classList.add("active", "btn-primary");
                btn.classList.remove("btn-outline-primary");
            } else {
                btn.classList.remove("active", "btn-primary");
                btn.classList.add("btn-outline-primary");
            }
        });

        // إظهار أو إخفاء الفعاليات حسب التصنيف
        eventItems.forEach(item => {
            if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    }

    if (filterButtons.length > 0 && eventItems.length > 0) {
        
        // أ) التحقق مما إذا كان هناك تصنيف قادم عبر الرابط (مثل ?cat=tech من الصفحة الرئيسية)
        const urlParams = new URLSearchParams(window.location.search);
        const catParam = urlParams.get('cat');
        
        if (catParam) {
            applyFilter(catParam);
        }

        // ب) الاستماع للنقر اليدوي على الأزرار داخل صفحة الفعاليات
        filterButtons.forEach(button => {
            button.addEventListener("click", function () {
                const filterValue = this.getAttribute("data-filter");
                applyFilter(filterValue);
            });
        });
    }

   // --- 4. التحقق من نموذج الاتصال ---
const contactForm = document.getElementById('contactForm');
const alertBox = document.getElementById('formAlert');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameField = document.getElementById('nameInput');
        const emailField = document.getElementById('emailInput');
        const messageField = document.getElementById('messageInput');

        // التأكد من أن حقول الإدخال موجودة لتجنب الأخطاء
        if (!nameField || !emailField || !messageField) return;

        const name = nameField.value.trim();
        const email = emailField.value.trim();
        const message = messageField.value.trim();

        if (name === '' || email === '' || message === '') {
            showAlert('يرجى ملء جميع الحقول المطلوبة.', 'danger');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showAlert('يرجى إدخال بريد إلكتروني صحيح.', 'warning');
            return;
        }

        // في حال كانت الحقول سليمة تماماً:

        
        showAlert('تم إرسال رسالتك بنجاح! سنقوم بالرد عليك قريباً.', 'success');
        contactForm.reset();
    });
}

function showAlert(message, type) {
    if (!alertBox) return;
    // استخدام كلاسات Bootstrap للتنبيه وجعله مرئياً
    alertBox.className = `alert alert-${type} mt-3 d-block`;
    alertBox.style.display = 'block'; // ضمان إظهار العنصر في حال كان مخفياً
    alertBox.textContent = message;
}
    // --- 5. تفاعل النقر على شرائح السلايدر (لتنتقل لصفحة التفاصيل) ---
    document.querySelectorAll('.slider-link').forEach(item => {
        item.addEventListener('click', function() {
            const url = this.getAttribute('data-url');
            if (url) {
                window.location.href = url;
            }
        });
    });

});