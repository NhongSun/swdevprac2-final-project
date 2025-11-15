export type Locale = "en" | "th" | "ru" | "zh";

export const translations = {
  en: {
    // Navigation
    "nav.exhibitions": "Exhibitions",
    "nav.myBookings": "My Bookings",
    "nav.allBookings": "All Bookings",
    "nav.createExhibition": "Create Exhibition",
    "nav.profile": "Profile",
    "nav.login": "Login",
    "nav.logout": "Logout",

    // Exhibition List
    "exhibitions.title": "Exhibitions",
    "exhibitions.empty": "No exhibitions available",
    "exhibitions.bookBooth": "Book Booth",
    "exhibitions.viewDetails": "View Details",
    "exhibitions.upcoming": "Upcoming",
    "exhibitions.active": "Active",
    "exhibitions.past": "Past",

    // Exhibition Detail
    "exhibition.details": "Exhibition Details",
    "exhibition.venue": "Venue",
    "exhibition.dates": "Dates",
    "exhibition.duration": "Duration",
    "exhibition.description": "Description",
    "exhibition.day": "day",
    "exhibition.days": "days",
    "exhibition.statusPast":
      "This exhibition has already passed. Booking is no longer available.",
    "exhibition.statusActive":
      "This exhibition has already started. Booking is no longer available.",
    "exhibition.statusNoQuota":
      "No booths are available for this exhibition. All booth quotas have been filled.",
    "exhibition.smallBoothQuota": "Small Booth Quota",
    "exhibition.bigBoothQuota": "Big Booth Quota",

    // Create Exhibition
    "exhibition.create.title": "Create Exhibition",
    "exhibition.create.description": "Add a new exhibition to this platform",
    "exhibition.create.form.submit": "Create Exhibition",
    "exhibition.create.form.submiting": "Creating...",
    "exhibition.create.form.cancel": "Cancel",

    "exhibition.form.name": "Exhibition Name",
    "exhibition.form.description": "Description",
    "exhibition.form.venue": "Venue",
    "exhibition.form.startDate": "Start Date",
    "exhibition.form.duration": "Duration (Days)",
    "exhibition.form.smallBoothQuota": "Small Booth Quota",
    "exhibition.form.bigBoothQuota": "Big Booth Quota",
    "exhibition.form.image": "Poster Image URL",
    "exhibition.form.requiredFields": "Please fill in all required fields",
    "exhibition.form.startDateFuture": "Start date must be in the future",
    "exhibition.form.nameRequired": "Exhibition name is required",
    "exhibition.form.descriptionRequired": "Description is required",
    "exhibition.form.venueRequired": "Venue is required",
    "exhibition.form.startDateRequired": "Start date is required",
    "exhibition.form.durationMinimum": "Duration must be at least 1 day",
    "exhibition.form.smallBoothQuotaMinimum":
      "Small booth quota cannot be negative",
    "exhibition.form.bigBoothQuotaMinimum":
      "Big booth quota cannot be negative",
    "exhibition.form.posterRequired": "Poster picture URL is required",

    // Edit Exhibition
    "exhibition.edit.title": "Edit Exhibition",
    "exhibition.edit.description": "Update exhibition information",
    "exhibition.edit.form.submit": "Update Exhibition",
    "exhibition.edit.form.submiting": "Updating...",
    "exhibition.edit.form.cancel": "Cancel",

    // Delete Exhibition
    "exhibition.deleteConfirm":
      "Are you sure you want to delete this exhibition?",
    "exhibition.deleteWarning": "This action cannot be undone.",

    // Booking Form
    "booking.create": "Create Booking",
    "booking.edit": "Edit Booking",
    "booking.exhibition": "Exhibition",
    "booking.boothType": "Booth Type",
    "booking.boothType.small": "Small",
    "booking.boothType.big": "Big",
    "booking.amount": "Amount",
    "booking.notes": "Notes",
    "booking.contactTel": "Contact Tel",
    "booking.submit": "Submit",
    "booking.cancel": "Cancel",
    "booking.maxReached":
      "You have reached the maximum of 6 booths for this exhibition.",
    "booking.remaining":
      "You have booked {count} of 6 booths for this exhibition.",
    "booking.selectType": "Select a booth type",
    "booking.amountRequired": "Amount must be between 1 and {max}",

    // Booking List
    "bookings.title": "My Bookings",
    "bookings.allTitle": "All Bookings",
    "bookings.empty": "No bookings yet",
    "bookings.createFirst": "Create your first booking",
    "bookings.loginMessage": "Please log in to view your bookings",
    "bookings.id": "Booking ID",
    "bookings.exhibition": "Exhibition",
    "bookings.boothType": "Booth Type",
    "bookings.amount": "Amount",
    "bookings.owner": "Owner",
    "bookings.createdAt": "Booked At",
    "bookings.actions": "Actions",
    "bookings.view": "View",
    "bookings.edit": "Edit",
    "bookings.delete": "Delete",
    "bookings.filter": "Filter",
    "bookings.search": "Search by ID or exhibition name",

    // Booking Detail
    "bookingDetail.title": "Booking Details",
    "bookingDetail.id": "Booking ID",
    "bookingDetail.exhibition": "Exhibition",
    "bookingDetail.boothType": "Booth Type",
    "bookingDetail.amount": "Amount",
    "bookingDetail.owner": "Owner",
    "bookingDetail.createdAt": "Booked At",
    "bookingDetail.updatedAt": "Last edit",
    "bookingDetail.deleteConfirm":
      "Are you sure you want to delete this booking?",
    "bookingDetail.deleteWarning": "This action cannot be undone.",

    // Register
    "register.title": "Register",
    "register.name": "Name",
    "register.email": "Email",
    "register.tel": "Telephone",
    "register.password": "Password",
    "register.submit": "Register",
    "register.submiting": "Registering...",
    "register.adminDesc": "Register as an admin account",
    "register.role": "Role",
    "register.role.member": "Member",
    "register.role.admin": "Admin",

    // Login
    "login.title": "Login",
    "login.email": "Email",
    "login.password": "Password",
    "login.submit": "Login",
    "login.submiting": "Logging in...",
    "login.noAccount": "Don't have an account?",
    "login.registerHere": "Register here",

    // Common
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
    "common.confirm": "Confirm",
    "common.back": "Back",
    "common.save": "Save",
    "common.loginRequired": "Login Required",

    // Messages
    "message.bookingCreated": "Booking created successfully",
    "message.bookingUpdated": "Booking updated successfully",
    "message.bookingDeleted": "Booking deleted successfully",
    "message.exhibitionCreated": "Exhibition created successfully",
    "message.exhibitionUpdated": "Exhibition updated successfully",
    "message.exhibitionDeleted": "Exhibition deleted successfully",
    "message.error": "An error occurred. Please try again.",
    "message.quotaExceeded": "Quota exceeded or total per user > 6",
    "message.notFound": "Booking or Exhibition not found",
    "message.notAuthorized": "Not authorized",
    "message.loginSuccess": "Login successful",
    "message.loginError": "Invalid email or password",
    "message.registerSuccess": "Registration successful",
    "message.registerError": "Something went wrong. Please try again.",

    // Role
    "role.admin": "Admin",
    "role.member": "Member",
    "role.switch": "Switch Role",

    // Months - Full
    "month.jan.full": "January",
    "month.feb.full": "February",
    "month.mar.full": "March",
    "month.apr.full": "April",
    "month.may.full": "May",
    "month.jun.full": "June",
    "month.jul.full": "July",
    "month.aug.full": "August",
    "month.sep.full": "September",
    "month.oct.full": "October",
    "month.nov.full": "November",
    "month.dec.full": "December",

    // Months - Short
    "month.jan.short": "Jan",
    "month.feb.short": "Feb",
    "month.mar.short": "Mar",
    "month.apr.short": "Apr",
    "month.may.short": "May",
    "month.jun.short": "Jun",
    "month.jul.short": "Jul",
    "month.aug.short": "Aug",
    "month.sep.short": "Sep",
    "month.oct.short": "Oct",
    "month.nov.short": "Nov",
    "month.dec.short": "Dec",
  },
  th: {
    // Navigation
    "nav.exhibitions": "นิทรรศการ",
    "nav.myBookings": "การจองของฉัน",
    "nav.allBookings": "การจองทั้งหมด",
    "nav.createExhibition": "สร้างนิทรรศการ",
    "nav.profile": "โปรไฟล์",
    "nav.login": "เข้าสู่ระบบ",
    "nav.logout": "ออกจากระบบ",

    // Exhibition List
    "exhibitions.title": "นิทรรศการ",
    "exhibitions.empty": "ไม่มีนิทรรศการ",
    "exhibitions.bookBooth": "จองบูธ",
    "exhibitions.viewDetails": "ดูรายละเอียด",
    "exhibitions.upcoming": "กำลังจะมาถึง",
    "exhibitions.active": "กำลังดำเนินการ",
    "exhibitions.past": "ผ่านไปแล้ว",

    // Exhibition Detail
    "exhibition.details": "รายละเอียดนิทรรศการ",
    "exhibition.venue": "สถานที่",
    "exhibition.dates": "วันที่",
    "exhibition.duration": "ระยะเวลา",
    "exhibition.description": "รายละเอียด",
    "exhibition.day": "วัน",
    "exhibition.days": "วัน",
    "exhibition.statusPast": "นิทรรศการนี้ผ่านไปแล้ว ไม่สามารถจองได้อีกต่อไป",
    "exhibition.statusActive": "นิทรรศการนี้เริ่มแล้ว ไม่สามารถจองได้อีกต่อไป",
    "exhibition.statusNoQuota":
      "ไม่มีบูธว่างสำหรับนิทรรศการนี้ โควต้าทั้งหมดถูกจองครบแล้ว",
    "exhibition.smallBoothQuota": "โควต้าบูธขนาดเล็ก",
    "exhibition.bigBoothQuota": "โควต้าบูธขนาดใหญ่",

    // Create Exhibition
    "exhibition.create.title": "สร้างนิทรรศการ",
    "exhibition.create.description": "เพิ่มนิทรรศการใหม่ในแพลตฟอร์มนี้",
    "exhibition.create.form.submit": "สร้างนิทรรศการ",
    "exhibition.create.form.submiting": "กำลังสร้าง...",
    "exhibition.create.form.cancel": "ยกเลิก",

    "exhibition.form.name": "ชื่อนิทรรศการ",
    "exhibition.form.description": "รายละเอียด",
    "exhibition.form.venue": "สถานที่",
    "exhibition.form.startDate": "วันเริ่มงาน",
    "exhibition.form.duration": "ระยะเวลา (วัน)",
    "exhibition.form.smallBoothQuota": "โควต้าบูธขนาดเล็ก",
    "exhibition.form.bigBoothQuota": "โควต้าบูธขนาดใหญ่",
    "exhibition.form.image": "URL โปสเตอร์",
    "exhibition.form.requiredFields": "กรุณากรอกข้อมูลที่จำเป็นให้ครบ",
    "exhibition.form.startDateFuture": "กรุณาเลือกวันเริ่มงานที่ยังไม่ถึง",
    "exhibition.form.nameRequired": "กรุณากรอกชื่อนิทรรศการ",
    "exhibition.form.descriptionRequired": "กรุณากรอกรายละเอียด",
    "exhibition.form.venueRequired": "กรุณากรอกสถานที่",
    "exhibition.form.startDateRequired": "กรุณาเลือกวันเริ่มงาน",
    "exhibition.form.durationMinimum": "ระยะเวลาต้องมีอย่างน้อย 1 วัน",
    "exhibition.form.smallBoothQuotaMinimum": "โควต้าบูธขนาดเล็กต้องไม่ติดลบ",
    "exhibition.form.bigBoothQuotaMinimum": "โควต้าบูธขนาดใหญ่ต้องไม่ติดลบ",
    "exhibition.form.posterRequired": "กรุณากรอก URL โปสเตอร์",

    // Edit Exhibition
    "exhibition.edit.title": "แก้ไขนิทรรศการ",
    "exhibition.edit.description": "อัปเดตข้อมูลนิทรรศการ",
    "exhibition.edit.form.submit": "อัปเดตนิทรรศการ",
    "exhibition.edit.form.submiting": "กำลังอัปเดต...",
    "exhibition.edit.form.cancel": "ยกเลิก",

    // Delete Exhibition
    "exhibition.deleteConfirm": "คุณแน่ใจหรือไม่ว่าต้องการลบนิทรรศการนี้",
    "exhibition.deleteWarning": "การดำเนินการนี้ไม่สามารถยกเลิกได้",

    // Booking Form
    "booking.create": "สร้างการจอง",
    "booking.edit": "แก้ไขการจอง",
    "booking.exhibition": "นิทรรศการ",
    "booking.boothType": "ประเภทบูธ",
    "booking.boothType.small": "เล็ก",
    "booking.boothType.big": "ใหญ่",
    "booking.amount": "จำนวน",
    "booking.notes": "บันทึกเพิ่มเติม",
    "booking.contactTel": "เบอร์ติดต่อ",
    "booking.submit": "ส่ง",
    "booking.cancel": "ยกเลิก",
    "booking.maxReached": "คุณจองครบ 6 บูธสำหรับงานนี้แล้ว",
    "booking.remaining": "คุณจอง {count} จาก 6 บูธสำหรับงานนี้",
    "booking.selectType": "เลือกประเภทบูธ",
    "booking.amountRequired": "จำนวนต้องอยู่ระหว่าง 1 ถึง {max}",

    // Booking List
    "bookings.title": "การจองของฉัน",
    "bookings.allTitle": "การจองทั้งหมด",
    "bookings.empty": "ยังไม่มีการจอง",
    "bookings.createFirst": "สร้างการจองแรกของคุณ",
    "bookings.loginMessage": "กรุณาเข้าสู่ระบบเพื่อดูการจองของคุณ",
    "bookings.id": "รหัสการจอง",
    "bookings.exhibition": "นิทรรศการ",
    "bookings.boothType": "ประเภทบูธ",
    "bookings.amount": "จำนวน",
    "bookings.owner": "ผู้จอง",
    "bookings.createdAt": "จองวันที่",
    "bookings.actions": "การดำเนินการ",
    "bookings.view": "ดู",
    "bookings.edit": "แก้ไข",
    "bookings.delete": "ลบ",
    "bookings.filter": "กรอง",
    "bookings.search": "ค้นหาด้วยรหัสหรือชื่อนิทรรศการ",

    // Booking Detail
    "bookingDetail.title": "รายละเอียดการจอง",
    "bookingDetail.id": "รหัสการจอง",
    "bookingDetail.exhibition": "นิทรรศการ",
    "bookingDetail.boothType": "ประเภทบูธ",
    "bookingDetail.amount": "จำนวน",
    "bookingDetail.owner": "เจ้าของ",
    "bookingDetail.createdAt": "จองวันที่",
    "bookingDetail.updatedAt": "แก้ไขล่าสุด",
    "bookingDetail.deleteConfirm": "คุณแน่ใจหรือไม่ว่าต้องการลบการจองนี้?",
    "bookingDetail.deleteWarning": "การดำเนินการนี้ไม่สามารถยกเลิกได้",

    // Register
    "register.title": "สมัครบัญชี",
    "register.name": "ชื่อ",
    "register.email": "อีเมล",
    "register.tel": "เบอร์โทรศัพท์",
    "register.password": "รหัสผ่าน",
    "register.submit": "สมัคร",
    "register.submiting": "กำลังสมัคร...",
    "register.adminDesc": "สมัครเป็นบัญชี admin",
    "register.role": "บทบาท",
    "register.role.member": "สมาชิก",
    "register.role.admin": "ผู้ดูแลระบบ",

    // Login
    "login.title": "เข้าสู่ระบบ",
    "login.email": "อีเมล",
    "login.password": "รหัสผ่าน",
    "login.submit": "เข้าสู่ระบบ",
    "login.submiting": "กำลังเข้าสู่ระบบ...",
    "login.noAccount": "ยังไม่มีบัญชี?",
    "login.registerHere": "สมัครที่นี่",

    // Common
    "common.loading": "กำลังโหลด...",
    "common.error": "ข้อผิดพลาด",
    "common.success": "สำเร็จ",
    "common.confirm": "ยืนยัน",
    "common.back": "กลับ",
    "common.save": "บันทึก",
    "common.loginRequired": "โปรดเข้าสู่ระบบ",

    // Messages
    "message.bookingCreated": "สร้างการจองสำเร็จ",
    "message.bookingUpdated": "อัปเดตการจองสำเร็จ",
    "message.bookingDeleted": "ลบการจองสำเร็จ",
    "message.exhibitionCreated": "สร้างนิทรรศการสำเร็จ",
    "message.exhibitionUpdated": "อัปเดตนิทรรศการสำเร็จ",
    "message.exhibitionDeleted": "ลบนิทรรศการสำเร็จ",
    "message.error": "เกิดข้อผิดพลาด กรุณาลองอีกครั้ง",
    "message.quotaExceeded": "เกินโควต้าหรือรวมต่อผู้ใช้ > 6",
    "message.notFound": "ไม่พบการจองหรือนิทรรศการ",
    "message.notAuthorized": "ไม่ได้รับอนุญาต",
    "message.loginSuccess": "เข้าสู่ระบบสำเร็จ",
    "message.loginError": "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
    "message.registerSuccess": "สมัครบัญชีสำเร็จ",
    "message.registerError": "เกิดข้อผิดพลาด กรุณาลองอีกครั้ง",

    // Role
    "role.admin": "ผู้ดูแลระบบ",
    "role.member": "สมาชิก",
    "role.switch": "สลับบทบาท",

    // Months - Full
    "month.jan.full": "มกราคม",
    "month.feb.full": "กุมภาพันธ์",
    "month.mar.full": "มีนาคม",
    "month.apr.full": "เมษายน",
    "month.may.full": "พฤษภาคม",
    "month.jun.full": "มิถุนายน",
    "month.jul.full": "กรกฎาคม",
    "month.aug.full": "สิงหาคม",
    "month.sep.full": "กันยายน",
    "month.oct.full": "ตุลาคม",
    "month.nov.full": "พฤศจิกายน",
    "month.dec.full": "ธันวาคม",

    // Months - Short
    "month.jan.short": "ม.ค.",
    "month.feb.short": "ก.พ.",
    "month.mar.short": "มี.ค.",
    "month.apr.short": "เม.ย.",
    "month.may.short": "พ.ค.",
    "month.jun.short": "มิ.ย.",
    "month.jul.short": "ก.ค.",
    "month.aug.short": "ส.ค.",
    "month.sep.short": "ก.ย.",
    "month.oct.short": "ต.ค.",
    "month.nov.short": "พ.ย.",
    "month.dec.short": "ธ.ค.",
  },
  ru: {
    // Navigation
    "nav.exhibitions": "Выставки",
    "nav.myBookings": "Мои бронирования",
    "nav.allBookings": "Все бронирования",
    "nav.createExhibition": "Создать выставку",
    "nav.profile": "Профиль",
    "nav.login": "Войти",
    "nav.logout": "Выйти",

    // Exhibition List
    "exhibitions.title": "Выставки",
    "exhibitions.empty": "Нет доступных выставок",
    "exhibitions.bookBooth": "Забронировать стенд",
    "exhibitions.viewDetails": "Подробнее",
    "exhibitions.upcoming": "Предстоящие",
    "exhibitions.active": "Активные",
    "exhibitions.past": "Прошедшие",

    // Exhibition Detail
    "exhibition.details": "Детали выставки",
    "exhibition.venue": "Место проведения",
    "exhibition.dates": "Даты",
    "exhibition.duration": "Продолжительность",
    "exhibition.description": "Описание",
    "exhibition.day": "день",
    "exhibition.days": "дней",
    "exhibition.statusPast":
      "Эта выставка уже прошла. Бронирование больше недоступно.",
    "exhibition.statusActive":
      "Эта выставка уже началась. Бронирование больше недоступно.",
    "exhibition.statusNoQuota":
      "Нет доступных стендов для этой выставки. Все квоты заполнены.",
    "exhibition.smallBoothQuota": "Квота малых стендов",
    "exhibition.bigBoothQuota": "Квота больших стендов",

    // Create Exhibition
    "exhibition.create.title": "Создать выставку",
    "exhibition.create.description": "Добавить новую выставку на платформу",
    "exhibition.create.form.submit": "Создать выставку",
    "exhibition.create.form.submiting": "Создание...",
    "exhibition.create.form.cancel": "Отмена",

    "exhibition.form.name": "Название выставки",
    "exhibition.form.description": "Описание",
    "exhibition.form.venue": "Место проведения",
    "exhibition.form.startDate": "Дата начала",
    "exhibition.form.duration": "Продолжительность (дней)",
    "exhibition.form.smallBoothQuota": "Квота малых стендов",
    "exhibition.form.bigBoothQuota": "Квота больших стендов",
    "exhibition.form.image": "URL постера",
    "exhibition.form.requiredFields":
      "Пожалуйста, заполните все обязательные поля",
    "exhibition.form.startDateFuture": "Дата начала должна быть в будущем",
    "exhibition.form.nameRequired": "Название выставки обязательно",
    "exhibition.form.descriptionRequired": "Описание обязательно",
    "exhibition.form.venueRequired": "Место проведения обязательно",
    "exhibition.form.startDateRequired": "Дата начала обязательна",
    "exhibition.form.durationMinimum":
      "Продолжительность должна быть не менее 1 дня",
    "exhibition.form.smallBoothQuotaMinimum":
      "Квота малых стендов не может быть отрицательной",
    "exhibition.form.bigBoothQuotaMinimum":
      "Квота больших стендов не может быть отрицательной",
    "exhibition.form.posterRequired": "URL постера обязателен",

    // Edit Exhibition
    "exhibition.edit.title": "Редактировать выставку",
    "exhibition.edit.description": "Обновить информацию о выставке",
    "exhibition.edit.form.submit": "Обновить выставку",
    "exhibition.edit.form.submiting": "Обновление...",
    "exhibition.edit.form.cancel": "Отмена",

    // Delete Exhibition
    "exhibition.deleteConfirm": "Вы уверены, что хотите удалить эту выставку?",
    "exhibition.deleteWarning": "Это действие нельзя отменить.",

    // Booking Form
    "booking.create": "Создать бронирование",
    "booking.edit": "Редактировать бронирование",
    "booking.exhibition": "Выставка",
    "booking.boothType": "Тип стенда",
    "booking.boothType.small": "Малый",
    "booking.boothType.big": "Большой",
    "booking.amount": "Количество",
    "booking.notes": "Примечания",
    "booking.contactTel": "Контактный телефон",
    "booking.submit": "Отправить",
    "booking.cancel": "Отмена",
    "booking.maxReached":
      "Вы достигли максимума в 6 стендов для этой выставки.",
    "booking.remaining":
      "Вы забронировали {count} из 6 стендов для этой выставки.",
    "booking.selectType": "Выберите тип стенда",
    "booking.amountRequired": "Количество должно быть от 1 до {max}",

    // Booking List
    "bookings.title": "Мои бронирования",
    "bookings.allTitle": "Все бронирования",
    "bookings.empty": "Пока нет бронирований",
    "bookings.createFirst": "Создайте ваше первое бронирование",
    "bookings.loginMessage":
      "Пожалуйста, войдите, чтобы просмотреть ваши бронирования",
    "bookings.id": "ID бронирования",
    "bookings.exhibition": "Выставка",
    "bookings.boothType": "Тип стенда",
    "bookings.amount": "Количество",
    "bookings.owner": "Владелец",
    "bookings.createdAt": "Забронировано",
    "bookings.actions": "Действия",
    "bookings.view": "Просмотр",
    "bookings.edit": "Редактировать",
    "bookings.delete": "Удалить",
    "bookings.filter": "Фильтр",
    "bookings.search": "Поиск по ID или названию выставки",

    // Booking Detail
    "bookingDetail.title": "Детали бронирования",
    "bookingDetail.id": "ID бронирования",
    "bookingDetail.exhibition": "Выставка",
    "bookingDetail.boothType": "Тип стенда",
    "bookingDetail.amount": "Количество",
    "bookingDetail.owner": "Владелец",
    "bookingDetail.createdAt": "Забронировано",
    "bookingDetail.updatedAt": "Последнее редактирование",
    "bookingDetail.deleteConfirm":
      "Вы уверены, что хотите удалить это бронирование?",
    "bookingDetail.deleteWarning": "Это действие нельзя отменить.",

    // Register
    "register.title": "Регистрация",
    "register.name": "Имя",
    "register.email": "Email",
    "register.tel": "Телефон",
    "register.password": "Пароль",
    "register.submit": "Зарегистрироваться",
    "register.submiting": "Регистрация...",
    "register.adminDesc": "Зарегистрироваться как администратор",
    "register.role": "Роль",
    "register.role.member": "Участник",
    "register.role.admin": "Администратор",

    // Login
    "login.title": "Вход",
    "login.email": "Email",
    "login.password": "Пароль",
    "login.submit": "Войти",
    "login.submiting": "Вход...",
    "login.noAccount": "Нет аккаунта?",
    "login.registerHere": "Зарегистрируйтесь здесь",

    // Common
    "common.loading": "Загрузка...",
    "common.error": "Ошибка",
    "common.success": "Успешно",
    "common.confirm": "Подтвердить",
    "common.back": "Назад",
    "common.save": "Сохранить",
    "common.loginRequired": "Требуется вход",

    // Messages
    "message.bookingCreated": "Бронирование успешно создано",
    "message.bookingUpdated": "Бронирование успешно обновлено",
    "message.bookingDeleted": "Бронирование успешно удалено",
    "message.exhibitionCreated": "Выставка успешно создана",
    "message.exhibitionUpdated": "Выставка успешно обновлена",
    "message.exhibitionDeleted": "Выставка успешно удалена",
    "message.error": "Произошла ошибка. Пожалуйста, попробуйте снова.",
    "message.quotaExceeded":
      "Квота превышена или общее количество на пользователя > 6",
    "message.notFound": "Бронирование или выставка не найдены",
    "message.notAuthorized": "Не авторизован",
    "message.loginSuccess": "Вход выполнен успешно",
    "message.loginError": "Неверный email или пароль",
    "message.registerSuccess": "Регистрация прошла успешно",
    "message.registerError":
      "Что-то пошло не так. Пожалуйста, попробуйте снова.",

    // Role
    "role.admin": "Администратор",
    "role.member": "Участник",
    "role.switch": "Переключить роль",

    // Months - Full
    "month.jan.full": "Январь",
    "month.feb.full": "Февраль",
    "month.mar.full": "Март",
    "month.apr.full": "Апрель",
    "month.may.full": "Май",
    "month.jun.full": "Июнь",
    "month.jul.full": "Июль",
    "month.aug.full": "Август",
    "month.sep.full": "Сентябрь",
    "month.oct.full": "Октябрь",
    "month.nov.full": "Ноябрь",
    "month.dec.full": "Декабрь",

    // Months - Short
    "month.jan.short": "Янв",
    "month.feb.short": "Фев",
    "month.mar.short": "Мар",
    "month.apr.short": "Апр",
    "month.may.short": "Май",
    "month.jun.short": "Июн",
    "month.jul.short": "Июл",
    "month.aug.short": "Авг",
    "month.sep.short": "Сен",
    "month.oct.short": "Окт",
    "month.nov.short": "Ноя",
    "month.dec.short": "Дек",
  },
  zh: {
    // Navigation
    "nav.exhibitions": "展览",
    "nav.myBookings": "我的预订",
    "nav.allBookings": "所有预订",
    "nav.createExhibition": "创建展览",
    "nav.profile": "个人资料",
    "nav.login": "登录",
    "nav.logout": "退出",

    // Exhibition List
    "exhibitions.title": "展览",
    "exhibitions.empty": "暂无展览",
    "exhibitions.bookBooth": "预订展位",
    "exhibitions.viewDetails": "查看详情",
    "exhibitions.upcoming": "即将开始",
    "exhibitions.active": "进行中",
    "exhibitions.past": "已结束",

    // Exhibition Detail
    "exhibition.details": "展览详情",
    "exhibition.venue": "地点",
    "exhibition.dates": "日期",
    "exhibition.duration": "持续时间",
    "exhibition.description": "描述",
    "exhibition.day": "天",
    "exhibition.days": "天",
    "exhibition.statusPast": "此展览已结束。预订不再可用。",
    "exhibition.statusActive": "此展览已开始。预订不再可用。",
    "exhibition.statusNoQuota": "此展览没有可用的展位。所有配额已满。",
    "exhibition.smallBoothQuota": "小展位配额",
    "exhibition.bigBoothQuota": "大展位配额",

    // Create Exhibition
    "exhibition.create.title": "创建展览",
    "exhibition.create.description": "在此平台上添加新展览",
    "exhibition.create.form.submit": "创建展览",
    "exhibition.create.form.submiting": "创建中...",
    "exhibition.create.form.cancel": "取消",

    "exhibition.form.name": "展览名称",
    "exhibition.form.description": "描述",
    "exhibition.form.venue": "地点",
    "exhibition.form.startDate": "开始日期",
    "exhibition.form.duration": "持续时间（天）",
    "exhibition.form.smallBoothQuota": "小展位配额",
    "exhibition.form.bigBoothQuota": "大展位配额",
    "exhibition.form.image": "海报图片URL",
    "exhibition.form.requiredFields": "请填写所有必填字段",
    "exhibition.form.startDateFuture": "开始日期必须在未来",
    "exhibition.form.nameRequired": "展览名称必填",
    "exhibition.form.descriptionRequired": "描述必填",
    "exhibition.form.venueRequired": "地点必填",
    "exhibition.form.startDateRequired": "开始日期必填",
    "exhibition.form.durationMinimum": "持续时间至少为1天",
    "exhibition.form.smallBoothQuotaMinimum": "小展位配额不能为负数",
    "exhibition.form.bigBoothQuotaMinimum": "大展位配额不能为负数",
    "exhibition.form.posterRequired": "海报图片URL必填",

    // Edit Exhibition
    "exhibition.edit.title": "编辑展览",
    "exhibition.edit.description": "更新展览信息",
    "exhibition.edit.form.submit": "更新展览",
    "exhibition.edit.form.submiting": "更新中...",
    "exhibition.edit.form.cancel": "取消",

    // Delete Exhibition
    "exhibition.deleteConfirm": "您确定要删除此展览吗？",
    "exhibition.deleteWarning": "此操作无法撤销。",

    // Booking Form
    "booking.create": "创建预订",
    "booking.edit": "编辑预订",
    "booking.exhibition": "展览",
    "booking.boothType": "展位类型",
    "booking.boothType.small": "小",
    "booking.boothType.big": "大",
    "booking.amount": "数量",
    "booking.notes": "备注",
    "booking.contactTel": "联系电话",
    "booking.submit": "提交",
    "booking.cancel": "取消",
    "booking.maxReached": "您已达到此展览最多6个展位的限制。",
    "booking.remaining": "您已为此展览预订了 {count} 个展位，共6个。",
    "booking.selectType": "选择展位类型",
    "booking.amountRequired": "数量必须在1到{max}之间",

    // Booking List
    "bookings.title": "我的预订",
    "bookings.allTitle": "所有预订",
    "bookings.empty": "暂无预订",
    "bookings.createFirst": "创建您的第一个预订",
    "bookings.loginMessage": "请登录以查看您的预订",
    "bookings.id": "预订ID",
    "bookings.exhibition": "展览",
    "bookings.boothType": "展位类型",
    "bookings.amount": "数量",
    "bookings.owner": "所有者",
    "bookings.createdAt": "预订时间",
    "bookings.actions": "操作",
    "bookings.view": "查看",
    "bookings.edit": "编辑",
    "bookings.delete": "删除",
    "bookings.filter": "筛选",
    "bookings.search": "按ID或展览名称搜索",

    // Booking Detail
    "bookingDetail.title": "预订详情",
    "bookingDetail.id": "预订ID",
    "bookingDetail.exhibition": "展览",
    "bookingDetail.boothType": "展位类型",
    "bookingDetail.amount": "数量",
    "bookingDetail.owner": "所有者",
    "bookingDetail.createdAt": "预订时间",
    "bookingDetail.updatedAt": "最后编辑",
    "bookingDetail.deleteConfirm": "您确定要删除此预订吗？",
    "bookingDetail.deleteWarning": "此操作无法撤销。",

    // Register
    "register.title": "注册",
    "register.name": "姓名",
    "register.email": "邮箱",
    "register.tel": "电话",
    "register.password": "密码",
    "register.submit": "注册",
    "register.submiting": "注册中...",
    "register.adminDesc": "注册为管理员账户",
    "register.role": "角色",
    "register.role.member": "会员",
    "register.role.admin": "管理员",

    // Login
    "login.title": "登录",
    "login.email": "邮箱",
    "login.password": "密码",
    "login.submit": "登录",
    "login.submiting": "登录中...",
    "login.noAccount": "没有账户？",
    "login.registerHere": "在此注册",

    // Common
    "common.loading": "加载中...",
    "common.error": "错误",
    "common.success": "成功",
    "common.confirm": "确认",
    "common.back": "返回",
    "common.save": "保存",
    "common.loginRequired": "需要登录",

    // Messages
    "message.bookingCreated": "预订创建成功",
    "message.bookingUpdated": "预订更新成功",
    "message.bookingDeleted": "预订删除成功",
    "message.exhibitionCreated": "展览创建成功",
    "message.exhibitionUpdated": "展览更新成功",
    "message.exhibitionDeleted": "展览删除成功",
    "message.error": "发生错误。请重试。",
    "message.quotaExceeded": "配额已超出或每用户总数 > 6",
    "message.notFound": "未找到预订或展览",
    "message.notAuthorized": "未授权",
    "message.loginSuccess": "登录成功",
    "message.loginError": "邮箱或密码错误",
    "message.registerSuccess": "注册成功",
    "message.registerError": "出现问题。请重试。",

    // Role
    "role.admin": "管理员",
    "role.member": "会员",
    "role.switch": "切换角色",

    // Months - Full
    "month.jan.full": "一月",
    "month.feb.full": "二月",
    "month.mar.full": "三月",
    "month.apr.full": "四月",
    "month.may.full": "五月",
    "month.jun.full": "六月",
    "month.jul.full": "七月",
    "month.aug.full": "八月",
    "month.sep.full": "九月",
    "month.oct.full": "十月",
    "month.nov.full": "十一月",
    "month.dec.full": "十二月",

    // Months - Short
    "month.jan.short": "1月",
    "month.feb.short": "2月",
    "month.mar.short": "3月",
    "month.apr.short": "4月",
    "month.may.short": "5月",
    "month.jun.short": "6月",
    "month.jul.short": "7月",
    "month.aug.short": "8月",
    "month.sep.short": "9月",
    "month.oct.short": "10月",
    "month.nov.short": "11月",
    "month.dec.short": "12月",
  },
};

export function t(
  key: string,
  locale: Locale = "en",
  params?: Record<string, string | number>,
): string {
  let text = translations[locale][key as keyof typeof translations.en] || key;

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      text = text.replace(`{${key}}`, String(value));
    });
  }

  return text;
}

export function getLocaleFromCookies(cookieHeader: string | null): Locale {
  if (!cookieHeader) return "en";

  const cookies = cookieHeader.split(";").reduce(
    (acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      acc[key] = value;
      return acc;
    },
    {} as Record<string, string>,
  );

  const locale = cookies["NEXT_LOCALE"];
  if (locale === "th") return "th";
  if (locale === "ru") return "ru";
  if (locale === "zh") return "zh";
  return "en";
}
