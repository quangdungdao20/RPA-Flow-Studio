# Kế hoạch phát triển Phase 1 - MVP

Tài liệu này chi tiết hóa kế hoạch phát triển Phase 1 (MVP) của hệ thống **RPA Flow Studio**, bao gồm đặc tả cơ sở dữ liệu, định dạng JSON của Flow, danh sách API endpoints, và các bước thực hiện.

---

## 1. Mục tiêu Phase 1 (MVP)
* Thiết kế và xây dựng cơ sở hạ tầng (Database, NATS, FastAPI, React + Vite).
* Hoàn thiện giao diện **Flow Designer** cơ bản: cho phép kéo thả, kết nối các Node, cấu hình tham số, và lưu vào database.
* Hỗ trợ các Node đầu tiên:
  1. **Manual Trigger Node** (Khởi chạy thủ công).
  2. **Python Script Node** (Chạy code Python tùy biến).
  3. **Playwright Node** (Tự động hóa trình duyệt web: Click, Fill, Navigate, Extract).
* Xây dựng **Flow Engine** lõi chạy tuần tự/DAG và truyền dữ liệu thông qua **Context**.
* Ghi log thực thi và hiển thị trạng thái chạy của Flow theo thời gian thực trên giao diện.
* Dashboard giám sát cơ bản.

---

## 2. Đặc tả Cơ sở dữ liệu (Database Schema)

Chúng ta sẽ thiết lập 4 bảng chính phục vụ MVP:

### Bảng `users`
* `id` (UUID, Primary Key)
* `username` (VARCHAR, Unique, Indexed)
* `hashed_password` (VARCHAR)
* `role` (VARCHAR) - `admin`, `developer`, `operator`, `viewer`
* `created_at` (TIMESTAMP)

### Bảng `flows`
* `id` (UUID, Primary Key)
* `name` (VARCHAR)
* `description` (TEXT, Optional)
* `status` (VARCHAR) - `draft`, `published`, `disabled`
* `nodes` (JSONB) - Lưu danh sách các nodes của React Flow
* `edges` (JSONB) - Lưu các kết nối giữa các nodes
* `created_by` (UUID, Foreign Key to `users.id`)
* `created_at` (TIMESTAMP)
* `updated_at` (TIMESTAMP)

### Bảng `executions`
* `id` (UUID, Primary Key)
* `flow_id` (UUID, Foreign Key to `flows.id`)
* `status` (VARCHAR) - `pending`, `running`, `success`, `failed`, `cancelled`
* `context` (JSONB) - Chứa các biến dùng chung và output của các node
* `error_message` (TEXT, Optional)
* `started_at` (TIMESTAMP, Optional)
* `completed_at` (TIMESTAMP, Optional)
* `triggered_by` (UUID, Foreign Key to `users.id`)

### Bảng `execution_logs`
* `id` (BIGSERIAL, Primary Key)
* `execution_id` (UUID, Foreign Key to `executions.id`)
* `node_id` (VARCHAR) - ID của node trong Flow
* `node_name` (VARCHAR)
* `log_level` (VARCHAR) - `INFO`, `WARNING`, `ERROR`
* `message` (TEXT)
* `timestamp` (TIMESTAMP)

---

## 3. Định dạng Flow JSON Schema

Mỗi Flow sẽ được lưu dưới dạng JSON chứa mảng `nodes` và `edges`:

```json
{
  "nodes": [
    {
      "id": "node_trigger_1",
      "type": "manual_trigger",
      "position": { "x": 100, "y": 200 },
      "data": {
        "label": "Manual Start"
      }
    },
    {
      "id": "node_playwright_1",
      "type": "playwright_action",
      "position": { "x": 300, "y": 200 },
      "data": {
        "label": "Cào dữ liệu tỷ giá",
        "config": {
          "actions": [
            { "type": "navigate", "url": "https://vietcombank.com.vn" },
            { "type": "wait_for_selector", "selector": ".rates-table" },
            { "type": "extract_text", "selector": "#usd-rate", "variable_name": "usd_rate" }
          ]
        }
      }
    },
    {
      "id": "node_python_1",
      "type": "python_script",
      "position": { "x": 500, "y": 200 },
      "data": {
        "label": "Tính toán chi phí",
        "config": {
          "code": "usd_rate = float(context.get('usd_rate', 0))\ncontext['final_cost'] = usd_rate * 100"
        }
      }
    }
  ],
  "edges": [
    {
      "id": "edge_1",
      "source": "node_trigger_1",
      "target": "node_playwright_1"
    },
    {
      "id": "edge_2",
      "source": "node_playwright_1",
      "target": "node_python_1"
    }
  ]
}
```

---

## 4. Thiết kế API Endpoints (FastAPI)

### Authentication
* `POST /api/v1/auth/login` -> Trả về JWT Token.
* `POST /api/v1/auth/register` -> Đăng ký tài khoản mới (cho Dev/Admin).

### Flow Management
* `GET /api/v1/flows` -> Lấy danh sách flows.
* `POST /api/v1/flows` -> Tạo mới flow.
* `GET /api/v1/flows/{id}` -> Lấy chi tiết flow (bao gồm JSON nodes & edges).
* `PUT /api/v1/flows/{id}` -> Cập nhật cấu hình flow.
* `DELETE /api/v1/flows/{id}` -> Xóa flow.

### Execution Control
* `POST /api/v1/flows/{id}/trigger` -> Khởi chạy thủ công một flow (Đưa vào queue NATS).
* `GET /api/v1/executions` -> Danh sách lịch sử thực thi.
* `GET /api/v1/executions/{id}` -> Trạng thái chi tiết của một lần thực thi.
* `GET /api/v1/executions/{id}/logs` -> Xem log chi tiết từng bước (Node) của execution.
* `POST /api/v1/executions/{id}/cancel` -> Hủy thực thi.

---

## 5. Kịch bản thực thi của Flow Engine (Execution Flow)

1. **User** ấn nút **Run** trên giao diện Flow Designer.
2. Frontend gọi API `POST /api/v1/flows/{id}/trigger`.
3. Backend tạo bản ghi `execution` mới với trạng thái `pending`.
4. Backend gửi sự kiện chạy flow lên queue NATS.io: `flow.trigger.{execution_id}`.
5. **Worker Daemon** lắng nghe hàng đợi NATS.io nhận được event:
   * Chuyển trạng thái execution thành `running` qua API / DB.
   * Khởi tạo **Execution Context** chứa các biến môi trường và một map chứa kết quả output của các node.
   * Sử dụng thuật toán sắp xếp Topo (Topological Sort) từ Node `manual_trigger` để duyệt qua các Node tiếp theo dựa trên các `edges`.
6. Thực thi từng Node:
   * Với mỗi Node, gọi hàm `execute(context)` tương ứng.
   * **Playwright Node**: Sử dụng thư viện Playwright chạy ẩn danh (headless) để thực hiện các thao tác duyệt web, lưu dữ liệu cào được vào `context`.
   * **Python Script Node**: Thực thi mã Python động (bằng `exec` trong môi trường sandbox cô lập an toàn), cập nhật biến vào `context`.
   * Ghi log trạng thái sau mỗi Node chạy thành công/thất bại và đẩy về Database/WebSocket.
7. Khi đi hết luồng hoặc gặp lỗi không thể xử lý:
   * Worker cập nhật trạng thái execution thành `success` hoặc `failed`.
   * Gửi sự kiện qua WebSocket để Frontend cập nhật tức thời UI cho người dùng.

---

## 6. Kế hoạch triển khai từng bước (Sprint Plan)

### Sprint 1: Khởi tạo Cơ sở hạ tầng & Database (Thời gian: 3 ngày)
* Khởi tạo thư mục và môi trường dự án (Docker-compose cho PostgreSQL, NATS).
* Cấu hình FastAPI, SQLAlchemy và tạo migrations đầu tiên với Alembic.
* Viết APIs quản lý user (Auth) và API CRUD cho Flow.

### Sprint 2: Xây dựng Frontend Flow Designer (Thời gian: 4 ngày)
* Thiết lập dự án React + Vite + TypeScript + TailwindCSS.
* Xây dựng layout Sidebar navigation và Canvas sử dụng **React Flow**.
* Thiết kế và hiển thị các Custom Node: Trigger, Python Script, Playwright.
* Code chức năng lưu/tải sơ đồ Flow JSON với Backend API.

### Sprint 3: Phát triển Flow Engine & Workers (Thời gian: 4 ngày)
* Tạo dịch vụ Worker Python kết nối NATS.io.
* Thiết lập lớp cơ sở `BaseNode` và cơ chế `ExecutionContext`.
* Triển khai chi tiết `PythonScriptNode` và `PlaywrightNode` (sử dụng thư viện playwright-python).
* Code cơ chế điều phối DAG tuần tự trong Flow Engine.

### Sprint 4: Realtime Logging & Dashboard Giám sát (Thời gian: 3 ngày)
* Tích hợp WebSocket trong FastAPI để bắn log thời gian thực từ Worker lên Frontend.
* Thiết kế giao diện hiển thị log trực quan tại từng Node trên Canvas.
* Xây dựng Dashboard thống kê số lượng Flow, tỷ lệ thành công/thất bại của các Execution.
* Kiểm thử hệ thống end-to-end.
