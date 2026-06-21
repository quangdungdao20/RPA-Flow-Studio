# NovaSpark RPA Flow Studio

Nền tảng RPA nội bộ dạng Low-Code cho phép người dùng thiết kế, quản lý, giám sát và vận hành các quy trình tự động hóa thông qua giao diện kéo thả trực quan.

## Kiến trúc dự án

* **Frontend**: React + Vite + TypeScript (Sử dụng React Flow và Zustand)
* **Backend**: FastAPI + SQLAlchemy + PostgreSQL
* **Message Queue**: NATS.io làm Event Bus để giao tiếp giữa Backend và Worker
* **Flow Engine & Worker**: Python thực thi tuần tự (DAG), hỗ trợ Playwright (Web) và TagUI (Desktop)

---

## Hướng dẫn cài đặt và khởi chạy nhanh

### Sử dụng Docker Compose (Khuyên dùng)

Cách nhanh nhất để chạy toàn bộ hệ thống (PostgreSQL, NATS.io, Backend, Frontend, Worker) là sử dụng Docker Compose:

```bash
docker-compose up --build
```

Sau khi hoàn tất:
* **Frontend**: http://localhost:3000
* **Backend API**: http://localhost:8000
* **NATS Server**: localhost:4222

---

## Cấu trúc thư mục

Xem thông tin chi tiết về sơ đồ thư mục và phân chia các thành phần tại [project_structure.md](plans/project_structure.md).

## Kế hoạch phát triển Phase 1 - MVP

Xem kế hoạch chi tiết, thiết kế database và đặc tả API của Phase 1 tại [phase_1_mvp.md](plans/phase_1_mvp.md).
