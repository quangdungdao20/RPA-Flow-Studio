# Cấu trúc dự án RPA Flow Studio

Tài liệu này mô tả cấu trúc thư mục của dự án **RPA Flow Studio & Orchestrator Platform**, được xây dựng dưới dạng monorepo để quản lý tất cả các thành phần: Frontend, Backend, Flow Engine, và Workers.

## Sơ đồ cấu trúc thư mục tổng quát

```text
d:\RPA\
├── backend/                  # FastAPI Backend application
│   ├── app/
│   │   ├── api/              # API endpoints (V1)
│   │   │   ├── auth.py       # Authentication API
│   │   │   ├── flows.py      # Flow management API
│   │   │   ├── executions.py # Flow execution & monitoring API
│   │   │   ├── credentials.py# Encrypted credentials manager API
│   │   │   └── dashboard.py  # Dashboard statistics API
│   │   ├── core/             # Configuration & DB initialization
│   │   │   ├── config.py     # Application configurations
│   │   │   ├── database.py   # SQLAlchemy session manager
│   │   │   ├── security.py   # JWT, hashing helpers
│   │   │   └── nats.py       # NATS.io connection manager
│   │   ├── models/           # SQLAlchemy DB Models
│   │   │   ├── user.py
│   │   │   ├── flow.py
│   │   │   ├── execution.py
│   │   │   └── credential.py
│   │   ├── schemas/          # Pydantic schemas for request/response
│   │   │   ├── user.py
│   │   │   ├── flow.py
│   │   │   ├── execution.py
│   │   │   └── credential.py
│   │   ├── services/         # Business logic layer
│   │   │   ├── flow_service.py
│   │   │   ├── execution_service.py
│   │   │   └── credential_service.py
│   │   └── main.py           # FastAPI entry point
│   ├── alembic/              # Database migration tool
│   ├── alembic.ini           # Alembic config
│   ├── Dockerfile            # Backend Docker builder
│   └── requirements.txt      # Backend Python dependencies
│
├── frontend/                 # React Frontend (Vite + TS)
│   ├── src/
│   │   ├── assets/           # Static assets, logos, fonts
│   │   ├── components/       # Reusable components
│   │   │   ├── ui/           # Basic elements matching NovaSpark style (Button, Input, Card, Badge)
│   │   │   ├── layout/       # Sidebar, Navbar, Container
│   │   │   └── designer/     # React Flow components (Canvas, custom node renderers)
│   │   ├── context/          # Global React Contexts
│   │   ├── hooks/            # Custom hooks (e.g. useAuth, useWebSocket)
│   │   ├── pages/            # Page components
│   │   │   ├── Login.tsx     # Authentication page
│   │   │   ├── Dashboard.tsx # Monitoring dashboard
│   │   │   ├── Designer.tsx  # Flow design canvas
│   │   │   ├── Executions.tsx# History & execution logs
│   │   │   └── Credentials.tsx# Credentials management
│   │   ├── services/         # API integrations (axios & React Query)
│   │   ├── store/            # Zustand stores for Flow state & node configs
│   │   ├── types/            # TypeScript type definitions
│   │   ├── App.tsx           # App shell and routing
│   │   └── main.tsx          # App entry point
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tailwind.config.js    # Tailwind configuration
│   ├── postcss.config.js
│   ├── Dockerfile
│   └── package.json
│
├── engine/                   # Flow Engine & Workers
│   ├── flow_engine/          # Flow core executor
│   │   ├── __init__.py
│   │   ├── context.py        # Execution context model & status tracker
│   │   ├── engine.py         # DAG resolver & execution driver
│   │   └── nodes/            # Node registry and individual node definitions
│   │       ├── __init__.py
│   │       ├── base.py       # Node interface (execute(context))
│   │       ├── triggers.py   # Trigger nodes (Manual, Cron)
│   │       ├── logics.py     # Logic flow control (If/Else, Loops, Delays)
│   │       ├── datas.py      # Data manipulations (JSON, Variables)
│   │       └── scripts.py    # Code execution nodes (PythonScriptNode)
│   ├── worker/               # Worker consuming messages from NATS.io
│   │   ├── __init__.py
│   │   ├── main.py           # Worker runner & NATS listener
│   │   └── executors/        # Specialized execution units
│   │       ├── __init__.py
│   │       ├── playwright_executor.py # Browser automation
│   │       └── desktop_executor.py    # Desktop / TagUI automation
│   ├── Dockerfile
│   └── requirements.txt      # Flow engine & Worker python dependencies
│
├── plans/                    # Folder chứa các file kế hoạch dự án
│   ├── project_structure.md  # Chi tiết cấu trúc thư mục (Tài liệu này)
│   └── phase_1_mvp.md        # Kế hoạch chi tiết cho Phase 1 - MVP
│
└── docker-compose.yml        # Development environment configuration (DB, NATS, App, Worker)
```

## Chi tiết các thành phần chính

### 1. Backend (`/backend`)
* Sử dụng **FastAPI** làm API gateway và web server để đảm bảo tốc độ cao (phản hồi API dưới 2s).
* Lưu trữ dữ liệu cấu hình Flow và trạng thái thực thi vào **PostgreSQL** thông qua **SQLAlchemy** (ORM) và quản lý phiên bản schema bằng **Alembic**.
* Sử dụng cơ chế mã hóa bất đối xứng hoặc mã hóa AES cho các thông tin bảo mật trong Credential Manager.

### 2. Frontend (`/frontend`)
* Framework: **React** với **Vite** để build nhanh và tối ưu.
* Thiết kế: Theo **NovaSpark Design System** (sử dụng font `Inter`, bảng màu Nova Blue `#2563EB`, Nova Dark `#0F172A`).
* Flow Designer: Sử dụng **React Flow** kết hợp với **Zustand** để quản lý trạng thái kéo thả node và đồng bộ hóa luồng.
* Real-time: Giao tiếp qua **WebSocket** để cập nhật trạng thái chạy của Flow (Live execution status) và Dashboard theo thời gian thực.

### 3. Flow Engine & Worker (`/engine`)
* **Flow Engine**:
  * Đọc cấu hình Flow JSON từ cơ sở dữ liệu.
  * Phân tích luồng (Directed Acyclic Graph - DAG) để xác định thứ tự chạy của các Node.
  * Điều phối việc chạy các Node, quản lý Context (truyền biến và giá trị output từ Node trước sang Node sau).
* **Worker**:
  * Là một dịch vụ chạy nền (Daemon) kết nối tới **NATS.io**.
  * Nhận các message yêu cầu thực thi Flow hoặc Node, sau đó chạy và phản hồi kết quả về backend/event bus.
  * Tận dụng thư viện Python chuyên biệt (như Playwright cho Browser, PyAutoGUI/TagUI cho Desktop).
