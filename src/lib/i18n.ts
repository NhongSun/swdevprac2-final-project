export type Locale = "en" | "th";

export const translations = {
  en: {
    // Navigation
    "nav.exhibitions": "Exhibitions",
    "nav.myBookings": "My Bookings",
    "nav.allBookings": "All Bookings",
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
    "exhibition.days": "days",

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
    "bookings.id": "Booking ID",
    "bookings.exhibition": "Exhibition",
    "bookings.boothType": "Booth Type",
    "bookings.amount": "Amount",
    "bookings.owner": "Owner",
    "bookings.createdAt": "Created At",
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
    "bookingDetail.createdAt": "Created At",
    "bookingDetail.updatedAt": "Updated At",
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

    // Messages
    "message.bookingCreated": "Booking created successfully",
    "message.bookingUpdated": "Booking updated successfully",
    "message.bookingDeleted": "Booking deleted successfully",
    "message.error": "An error occurred. Please try again.",
    "message.quotaExceeded": "Quota exceeded or total per user > 6",
    "message.notFound": "Booking or Exhibition not found",
    "message.notAuthorized": "Not authorized",

    // Role
    "role.admin": "Admin",
    "role.member": "Member",
    "role.switch": "Switch Role",
  },
  th: {
    // Navigation
    "nav.exhibitions": "นิทรรศการ",
    "nav.myBookings": "การจองของฉัน",
    "nav.allBookings": "การจองทั้งหมด",
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
    "exhibition.days": "วัน",

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
    "bookings.id": "รหัสการจอง",
    "bookings.exhibition": "นิทรรศการ",
    "bookings.boothType": "ประเภทบูธ",
    "bookings.amount": "จำนวน",
    "bookings.owner": "เจ้าของ",
    "bookings.createdAt": "สร้างเมื่อ",
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
    "bookingDetail.createdAt": "สร้างเมื่อ",
    "bookingDetail.updatedAt": "อัปเดตเมื่อ",
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

    // Messages
    "message.bookingCreated": "สร้างการจองสำเร็จ",
    "message.bookingUpdated": "อัปเดตการจองสำเร็จ",
    "message.bookingDeleted": "ลบการจองสำเร็จ",
    "message.error": "เกิดข้อผิดพลาด กรุณาลองอีกครั้ง",
    "message.quotaExceeded": "เกินโควต้าหรือรวมต่อผู้ใช้ > 6",
    "message.notFound": "ไม่พบการจองหรือนิทรรศการ",
    "message.notAuthorized": "ไม่ได้รับอนุญาต",

    // Role
    "role.admin": "ผู้ดูแลระบบ",
    "role.member": "สมาชิก",
    "role.switch": "สลับบทบาท",
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
