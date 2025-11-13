export type Locale = "en" | "th";

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
    "exhibition.form.smallBoothQuotaMinimum": "Small booth quota cannot be negative",
    "exhibition.form.bigBoothQuotaMinimum": "Big booth quota cannot be negative",
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
    "bookings.search": "Search by ID or email",

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
    "bookings.search": "ค้นหาด้วยรหัสหรืออีเมล",

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
  return locale === "th" ? "th" : "en";
}
