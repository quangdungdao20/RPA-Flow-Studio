# TÀI LIỆU MÔ TẢ DỰ ÁN

# RPA Flow Studio & Orchestrator Platform

## 1. Tổng quan dự án

### Tên dự án

RPA Flow Studio

### Mục tiêu

Xây dựng nền tảng RPA nội bộ dạng Low-Code cho phép người dùng thiết kế, quản lý, giám sát và vận hành các quy trình tự động hóa thông qua giao diện kéo thả trực quan tương tự Node-RED nhưng mở rộng hơn.

Hệ thống hỗ trợ tích hợp nhiều thư viện và công nghệ RPA khác nhau trong cùng một Flow, đồng thời cung cấp khả năng quản trị tập trung, theo dõi thời gian thực và mở rộng linh hoạt thông qua kiến trúc Plugin.

---

## 2. Mục tiêu nghiệp vụ

* Chuẩn hóa việc phát triển và vận hành Bot tự động hóa.
* Giảm phụ thuộc vào các script Python riêng lẻ.
* Tăng khả năng tái sử dụng quy trình.
* Theo dõi và quản lý tập trung toàn bộ Flow.
* Cho phép nhiều người cùng phát triển và vận hành.
* Hỗ trợ mở rộng thêm Node mới mà không ảnh hưởng hệ thống lõi.
* Tạo nền tảng RPA doanh nghiệp nội bộ có khả năng phát triển lâu dài.

---

## 3. Kiến trúc hệ thống

Frontend (React + Vite)
↓
FastAPI Backend
↓
PostgreSQL
↓
NATS.io
↓
Flow Engine
↓
Execution Worker
↓
Playwright / TagUI / UIAutomation / Python Script / AI

---

## 4. Công nghệ sử dụng

### Frontend

* React
* Vite
* JavaScript
* React Flow
* Zustand
* TailwindCSS
* React Query

### Backend

* FastAPI
* SQLAlchemy
* Pydantic
* Alembic
* PostgreSQL
* WebSocket

### Message Queue

* NATS.io

Sử dụng cho:

* Phân phối Execution
* Event Bus
* Realtime Event
* Trigger giữa các thành phần

### Flow Engine

Phát triển riêng bằng Python.

Chịu trách nhiệm:

* Phân tích Flow JSON
* Xác định thứ tự thực thi
* Điều phối Node
* Quản lý Context
* Quản lý trạng thái
* Retry
* Error Handling
* Resume Execution

### Worker Engine

Worker Python độc lập thực hiện Node.

Có thể mở rộng nhiều Worker khác nhau.

Ví dụ:

* Browser Worker
* Desktop Worker
* Script Worker
* AI Worker

---

## 5. Chức năng chính

### 5.1 Quản lý Flow

* Tạo Flow mới
* Chỉnh sửa Flow
* Xóa Flow
* Sao chép Flow
* Import Flow
* Export Flow
* Publish Flow
* Draft Flow
* Versioning
* Kích hoạt / Vô hiệu hóa

---

### 5.2 Flow Designer

Giao diện kéo thả trực quan.

Hỗ trợ:

* Canvas
* Zoom
* Pan
* MiniMap
* Kết nối Node
* Cấu hình Node
* Undo / Redo
* Validate Flow
* Chạy thử Flow
* Debug từng Node

---

### 5.3 Trigger Node

Cho phép khởi động Flow từ nhiều nguồn.

Bao gồm:

* Manual Trigger
* Cron Schedule
* Webhook
* API Trigger
* MQTT Trigger
* File Trigger
* Queue Trigger

---

### 5.4 Logic Node

Xử lý điều kiện và luồng thực thi.

Bao gồm:

* If / Else
* Switch
* Loop
* Delay
* Retry
* Parallel
* Merge
* Break
* Continue

---

### 5.5 Data Node

Xử lý dữ liệu.

Bao gồm:

* Variables
* JSON
* CSV
* Excel
* PDF
* XML
* Base64
* Regex
* Template

---

### 5.6 Integration Node

Tích hợp hệ thống bên ngoài.

Bao gồm:

* REST API
* SOAP
* Email
* FTP/SFTP
* MQTT
* Database
* Teams
* Slack

---

### 5.7 RPA Node

Tự động hóa Web và Desktop.

Bao gồm:

#### Browser Automation

* Playwright
* Selenium

#### Desktop Automation

* UIAutomation
* PyAutoGUI
* TagUI

#### OCR

* Tesseract
* Vision OCR

---

### 5.8 Script Node

Cho phép thực thi mã nguồn.

Bao gồm:

* Python Script
* JavaScript Script
* Shell Command

---

### 5.9 AI Node

Hỗ trợ AI Agent.

Bao gồm:

* Prompt Template
* Chat Model
* OCR AI
* Vision AI
* Agent
* Classification
* Summarization

---

## 6. Flow Engine

Flow được lưu dưới dạng JSON.

Ví dụ:

Trigger
↓
Get Data
↓
Condition
↓
Playwright
↓
Python Script
↓
Send Email

Mỗi Node bao gồm:

* node_id
* node_type
* input
* output
* configuration
* validation
* version

Flow Engine chỉ giao tiếp thông qua giao diện chuẩn:

execute(context)

Mọi Node đều phải triển khai giao diện này.

Ví dụ:

PlaywrightNode.execute(context)

TagUINode.execute(context)

PythonNode.execute(context)

Nhờ đó có thể mở rộng Node mới mà không sửa Engine lõi.

---

## 7. Context Execution

Mỗi lần chạy Flow sẽ sinh Execution Context.

Lưu trữ:

* Execution ID
* Variables
* Node Output
* Status
* Error
* Metadata
* Start Time
* End Time

Context được truyền xuyên suốt toàn bộ Flow.

---

## 8. Quản lý thực thi

Hỗ trợ:

* Chạy thủ công
* Chạy theo lịch
* Chạy qua API
* Chạy qua Trigger
* Dừng Execution
* Tạm dừng
* Tiếp tục
* Retry
* Resume từ Node lỗi

---

## 9. Dashboard giám sát

Hiển thị:

* Tổng số Flow
* Flow đang hoạt động
* Tổng số Execution
* Success Rate
* Failure Rate
* Running Execution
* Worker Status

Biểu đồ:

* Execution theo ngày
* Top Flow sử dụng nhiều nhất
* Tỷ lệ lỗi
* Thời gian xử lý trung bình

---

## 10. Logging & Audit

Lưu trữ:

* Log từng Node
* Input / Output
* Error Stack
* Execution Timeline
* User Action
* Audit Log

Cho phép truy vết đầy đủ lịch sử vận hành.

---

## 11. Quản lý tài nguyên

Hỗ trợ quản lý tập trung:

* Credentials
* API Keys
* Database Connections
* Environment Variables
* Secret Values
* Uploaded Files

Secret được mã hóa trước khi lưu trữ.

---

## 12. Quản lý người dùng

Vai trò:

### Administrator

* Quản trị toàn hệ thống.

### Developer

* Thiết kế và chỉnh sửa Flow.

### Operator

* Thực thi và giám sát.

### Viewer

* Chỉ xem Dashboard và Log.

Phân quyền theo Flow.

---

## 13. Khả năng mở rộng

Hệ thống hỗ trợ kiến trúc Plugin.

Plugin có thể bổ sung:

* Node mới
* Trigger mới
* Integration mới
* Worker mới

Không yêu cầu sửa đổi Flow Engine lõi.

---

## 14. Yêu cầu phi chức năng

* Responsive UI.
* Hỗ trợ tối thiểu 100 Flow.
* Hỗ trợ tối thiểu 100 Execution đồng thời.
* Thời gian phản hồi API dưới 2 giây.
* Có cơ chế Backup và Restore.
* Hỗ trợ Docker Deployment.
* Hỗ trợ mở rộng theo chiều ngang bằng Worker.

---

## 15. Giai đoạn phát triển

### Phase 1 – MVP

* Authentication
* Flow Designer
* Manual Trigger
* Python Script Node
* Playwright Node
* Execution Engine
* Dashboard cơ bản
* Logging

### Phase 2

* Scheduler
* Webhook
* Queue Trigger
* Versioning
* Credential Manager
* User Management
* Audit Log

### Phase 3

* Desktop Automation
* TagUI
* UIAutomation
* OCR
* AI Node
* Worker Scaling

### Phase 4

* Plugin Marketplace
* Agent Workflow
* Multi-Tenant
* Public SDK
* Marketplace chia sẻ Node nội bộ

---

## 16. Kết quả mong đợi

Xây dựng thành công nền tảng RPA nội bộ thống nhất cho phép người dùng thiết kế, vận hành và giám sát các quy trình tự động hóa bằng giao diện kéo thả trực quan; hỗ trợ đa công nghệ RPA, khả năng mở rộng cao và quản trị tập trung, hướng tới một nền tảng RPA doanh nghiệp hiện đại.
