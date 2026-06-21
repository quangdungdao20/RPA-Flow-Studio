# Kế hoạch chi tiết phát triển Frontend MVP (5 Sprints)

Tài liệu này vạch ra lộ trình phát triển giao diện (Frontend) của hệ thống **RPA Flow Studio** dựa trên tài liệu yêu cầu chức năng [frontend.md](file:///d:/RPA/docs/frontend.md) và thứ tự triển khai [succession.md](file:///d:/RPA/docs/succession.md).

---

## Sơ đồ điều hướng (Navigation Structure)

```text
Dashboard
├─ Flows (Quản lý quy trình)
│   ├─ Flow List (Danh sách Quy trình)
│   └─ Flow Designer (Thiết kế Kéo thả - React Flow)
├─ Executions (Lịch sử thực thi)
│   ├─ Execution List (Danh sách lượt chạy)
│   └─ Execution Detail (Chi tiết luồng chạy, Logs, Context)
├─ Schedules (Lịch trình chạy tự động - Cron)
├─ Credentials (Quản lý khóa bí mật/mật khẩu)
├─ Workers (Giám sát tình trạng Worker)
├─ Users (Quản lý phân quyền & Người dùng)
└─ Settings (Cấu hình hệ thống chung)
```

---

## Kế hoạch triển khai chi tiết qua các Sprints

### Sprint 1: Core Shell, Authentication, Dashboard & Flow List
**Mục tiêu:** Thiết lập khung ứng dụng điều hướng, giao diện đăng nhập, trang chủ giám sát và quản lý danh sách Flow.

*   **Tệp tin & Thư mục liên quan:**
    *   `/frontend/src/App.tsx` (Tuyến đường điều hướng)
    *   `/frontend/src/pages/Login.tsx` (Đăng nhập)
    *   `/frontend/src/pages/Dashboard.tsx` (Trang tổng quan KPI)
    *   `/frontend/src/pages/Flows.tsx` (Danh sách quy trình)
*   **Chi tiết công việc:**
    1.  **Thiết lập Routing:** Cài đặt `react-router-dom` để điều hướng mượt mà giữa các trang.
    2.  **Khung giao diện (Sidebar Layout):** Triển khai thanh điều hướng Sidebar tối màu (`bg-nova-dark`) và Navbar trên sáng màu (`bg-white`) theo đúng **NovaSpark Design System**. Có thể thu gọn (64px) và mở rộng (240px).
    3.  **Trang Đăng nhập (Authentication):** Form đăng nhập trực quan, xử lý lưu JWT token vào LocalStorage/State.
    4.  **Trang Dashboard:**
        *   Các thẻ KPI: Tổng số Flow, Tỷ lệ thành công, Lượt chạy lỗi, Số Worker Online.
        *   Biểu đồ xu hướng (Sử dụng thư viện Recharts để vẽ biểu đồ line/bar mượt mà).
        *   Bảng 5 lượt chạy gần nhất kèm theo cột trạng thái (Success/Failed/Running).
    5.  **Trang quản lý Flow (Flow List):**
        *   Bảng hiển thị tên, mô tả, phiên bản, hình thức kích hoạt (Trigger Type), và nút bấm chạy thử (Manual Run) nhanh.
        *   Bộ lọc tìm kiếm theo trạng thái và tên flow.

---

### Sprint 2: React Flow Canvas & Node Designer
**Mục tiêu:** Xây dựng trình thiết kế kéo thả quy trình chuyên sâu bằng React Flow.

*   **Tệp tin & Thư mục liên quan:**
    *   `/frontend/src/pages/Designer.tsx` (Canvas)
    *   `/frontend/src/components/designer/` (Các Node tùy biến)
    *   `/frontend/src/store/useFlowStore.ts` (Quản lý trạng thái canvas bằng Zustand)
*   **Chi tiết công việc:**
    1.  **Tích hợp React Flow:** Nhúng thư viện React Flow vào Canvas trung tâm. Hỗ trợ zoom, dịch chuyển (pan), lưới nền (grid background) và bản đồ thu nhỏ (MiniMap).
    2.  **Thư viện Node (Left Sidebar):**
        *   Danh sách các Node được phân chia theo danh mục (Trigger, Logic, Data, Browser, Desktop, Script, AI).
        *   Hỗ trợ kéo thả Node (Drag and Drop) từ danh sách vào Canvas.
    3.  **Custom Nodes (Giao diện Node tự định nghĩa):**
        *   Thiết kế giao diện đẹp mắt cho từng loại node (Ví dụ: Playwright Node có màu sắc riêng, Python Node hiển thị biểu tượng Code).
        *   Hiển thị trạng thái của Node (Chưa cấu hình, sẵn sàng, lỗi).
    4.  **Cấu hình Node (Right Sidebar):**
        *   Khi click vào Node trên Canvas, hiển thị Form cấu hình chi tiết ở cạnh phải.
        *   Form sẽ thay đổi động tùy theo loại Node được chọn (Playwright: Điền URL, Selector, Hành động; Python: Khung soạn thảo mã code; Email: Người nhận, Tiêu đề).
    5.  **Trạng thái lưu trữ (Zustand Flow Store):** Đồng bộ hóa mảng `nodes` và `edges` mỗi khi người dùng kéo thả, kết nối các Node hoặc chỉnh sửa tham số.

---

### Sprint 3: Executions Monitor & Realtime Socket Integration
**Mục tiêu:** Quản lý lịch sử chạy quy trình và theo dõi trực quan luồng dữ liệu chạy trực tiếp qua WebSocket.

*   **Tệp tin & Thư mục liên quan:**
    *   `/frontend/src/pages/Executions.tsx` (Danh sách lượt chạy)
    *   `/frontend/src/pages/ExecutionDetail.tsx` (Chi tiết lượt chạy)
    *   `/frontend/src/hooks/useWebSocket.ts` (Kết nối WebSocket)
*   **Chi tiết công việc:**
    1.  **Danh sách Lượt chạy (Execution List):** Bảng hiển thị ID lượt chạy, tên quy trình, thời gian bắt đầu, thời gian hoàn thành, thời lượng chạy và trạng thái.
    2.  **Giao diện Chi tiết lượt chạy (Execution Detail):**
        *   **Sơ đồ chạy trực quan (Timeline DAG):** Hiển thị sơ đồ Flow ở trạng thái Read-Only. Các node đang chạy sẽ nhấp nháy màu vàng, node thành công có viền xanh lá, node lỗi có viền đỏ.
        *   **Log Viewer:** Hiển thị log thời gian thực chạy từ Worker gửi về. Log có màu sắc phân biệt theo cấp độ (INFO - xám, WARNING - vàng, ERROR - đỏ).
        *   **Context Inspector:** Hiển thị danh sách các biến và giá trị đầu ra (outputs) của từng Node.
    3.  **Tích hợp WebSocket:** Kết nối với cổng WebSocket của FastAPI backend để nhận cập nhật trạng thái của từng Node ngay khi Worker đang thực thi quy trình.

---

### Sprint 4: Schedules, Credentials & Worker Monitoring
**Mục tiêu:** Quản lý lịch trình tự động, lưu trữ bảo mật credentials và giám sát hiệu năng của cụm Worker.

*   **Tệp tin & Thư mục liên quan:**
    *   `/frontend/src/pages/Schedules.tsx` (Trang lập lịch)
    *   `/frontend/src/pages/Credentials.tsx` (Quản lý khóa bí mật)
    *   `/frontend/src/pages/Workers.tsx` (Giám sát Worker)
*   **Chi tiết công việc:**
    1.  **Quản lý lập lịch (Schedules):**
        *   Giao diện thiết lập thời gian chạy tự động bằng biểu thức Cron.
        *   Bảng theo dõi thời gian chạy tiếp theo (Next Run), thời gian chạy gần nhất (Last Run), và nút chuyển trạng thái Bật/Tắt lịch trình.
    2.  **Quản lý thông tin xác thực (Credentials):**
        *   Form thêm mới thông tin nhạy cảm: Username/Password, Token API, Connection String.
        *   Mã hóa và ẩn mật khẩu trên giao diện. Hỗ trợ kiểm tra kết nối thử nghiệm (Test Connection).
    3.  **Giám sát Worker (Worker Monitoring):**
        *   Hiển thị danh sách các Worker đang kết nối vào hệ thống thông qua NATS.io.
        *   Biểu diễn thông tin CPU, RAM sử dụng, số lượng tác vụ đang xử lý đồng thời (Current jobs) của mỗi Worker dưới dạng biểu đồ thanh (Progress bar).

---

### Sprint 5: User Management & System Settings
**Mục tiêu:** Quản lý người dùng, phân quyền chi tiết cho từng luồng quy trình và cấu hình hệ thống lõi.

*   **Tệp tin & Thư mục liên quan:**
    *   `/frontend/src/pages/Users.tsx` (Quản lý thành viên)
    *   `/frontend/src/pages/Settings.tsx` (Cài đặt hệ thống)
*   **Chi tiết công việc:**
    1.  **Quản lý thành viên & Phân quyền:**
        *   Danh sách người dùng hệ thống.
        *   Phân quyền vai trò: Admin (Toàn quyền), Developer (Thiết kế Flow), Operator (Vận hành & Giám sát), Viewer (Chỉ xem).
        *   Hỗ trợ reset mật khẩu và bật/tắt trạng thái tài khoản.
    2.  **Cài đặt hệ thống (System Settings):**
        *   Cấu hình thông số hàng đợi NATS.io (Subject Prefix).
        *   Cài đặt thời gian lưu trữ Logs (Retention days).
        *   Hiển thị phiên bản hệ thống và trạng thái kết nối tới Database lõi.
