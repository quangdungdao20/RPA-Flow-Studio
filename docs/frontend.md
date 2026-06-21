# YÊU CẦU CHỨC NĂNG FRONTEND

# RPA FLOW STUDIO

## 1. Dashboard

### Mục đích

Cung cấp cái nhìn tổng quan về tình trạng vận hành hệ thống.

### Thành phần giao diện

#### Header

* Tiêu đề Dashboard
* Bộ lọc thời gian:

  * Hôm nay
  * 7 ngày
  * 30 ngày
  * Tùy chỉnh

#### KPI Cards

Hiển thị:

* Tổng số Flow
* Flow đang hoạt động
* Tổng Execution
* Execution thành công
* Execution thất bại
* Execution đang chạy
* Worker Online
* Queue Pending

#### Biểu đồ

##### Execution Trend

Biểu đồ số lần chạy theo thời gian.

##### Success vs Failure

Biểu đồ tỷ lệ thành công/thất bại.

##### Top Flows

Flow được sử dụng nhiều nhất.

##### Worker Utilization

Tải của từng Worker.

#### Danh sách Recent Executions

Hiển thị:

* Execution ID
* Flow Name
* Trigger Type
* Start Time
* Duration
* Status

Click để xem chi tiết.

---

## 2. Flow Management

### Mục đích

Quản lý danh sách Flow.

### Giao diện

#### Thanh công cụ

* Create Flow
* Import
* Export
* Filter
* Search
* Refresh

#### Bộ lọc

* Status
* Trigger Type
* Created By
* Updated Date
* Tags

#### Bảng dữ liệu

Cột:

* Flow Name
* Description
* Version
* Status
* Trigger
* Last Run
* Created By
* Updated At

#### Hành động

* Open
* Run
* Clone
* Publish
* Export
* Delete

#### Chế độ hiển thị

* Table View
* Card View

---

## 3. Flow Designer

### Mục đích

Thiết kế Flow bằng kéo thả.

### Layout

Header
Left Sidebar
Canvas
Right Sidebar
Bottom Panel

---

### Header

Hiển thị:

* Flow Name
* Version
* Save
* Publish
* Run
* Debug
* Validate
* Import JSON
* Export JSON
* Undo
* Redo

---

### Left Sidebar (Node Library)

Tìm kiếm Node.

Danh mục:

#### Trigger

* Manual
* Schedule
* Webhook
* MQTT

#### Logic

* If
* Loop
* Switch
* Parallel

#### Data

* Variable
* Excel
* JSON
* PDF

#### Integration

* REST
* Email
* FTP
* Database

#### Browser

* Playwright
* Selenium

#### Desktop

* TagUI
* UIAutomation
* PyAutoGUI

#### Script

* Python
* JavaScript
* Shell

#### AI

* OCR
* Chat
* Agent

Kéo thả Node vào Canvas.

---

### Canvas

Chức năng:

* Zoom
* Pan
* Multi Select
* Drag
* Connect Node
* Delete Connection
* Copy/Paste Node
* Group Node
* Align Node
* MiniMap

Node hiển thị:

* Icon
* Name
* Status
* Error Indicator

---

### Right Sidebar (Node Configuration)

Hiển thị khi chọn Node.

Bao gồm:

#### General

* Node Name
* Description
* Timeout
* Retry

#### Configuration

Form động theo Node.

Ví dụ:

Playwright:

* URL
* Browser
* Selector
* Action

Python:

* Code Editor

Email:

* Recipient
* Subject

---

### Bottom Panel

Tabs:

#### Logs

Log Debug.

#### Variables

Biến hiện tại.

#### Output

Kết quả Node.

#### Validation

Danh sách lỗi.

---

## 4. Execution Management

### Mục đích

Theo dõi các lần chạy.

### Bảng Execution

Cột:

* Execution ID
* Flow
* Status
* Trigger
* Start Time
* End Time
* Duration
* Worker

### Bộ lọc

* Running
* Success
* Failed
* Cancelled

### Hành động

* View Detail
* Retry
* Stop
* Resume

---

## 5. Execution Detail

### Layout

#### Summary

* Execution ID
* Flow
* Trigger
* Status
* Start Time
* End Time
* Duration

#### Timeline

Hiển thị từng Node:

* Waiting
* Running
* Success
* Failed
* Skipped

#### Log Viewer

* Timestamp
* Level
* Message

#### Variables

Biến Runtime.

#### Output

Input/Output từng Node.

#### Error Stack

Thông tin lỗi chi tiết.

---

## 6. Scheduler Management

### Mục đích

Quản lý Trigger theo lịch.

### Danh sách Schedule

Cột:

* Flow
* Cron Expression
* Next Run
* Last Run
* Status

### Chức năng

* Create
* Edit
* Enable
* Disable
* Delete

### Form

* Flow
* Cron
* Timezone
* Description

---

## 7. Credential Management

### Mục đích

Quản lý thông tin nhạy cảm.

### Danh sách

* Credential Name
* Type
* Created By
* Updated At

### Loại

* Username/Password
* API Key
* Token
* Database
* Custom

### Chức năng

* Create
* Edit
* Delete
* Test Connection

Giá trị Secret bị ẩn.

---

## 8. Worker Monitoring

### Mục đích

Theo dõi Worker.

### Bảng Worker

* Worker Name
* Hostname
* IP
* Type
* Status
* CPU
* Memory
* Current Jobs

### Hành động

* Enable
* Disable
* Restart
* Drain

### Chi tiết

* Queue
* Running Tasks
* Capability

---

## 9. User & Permission

### Quản lý người dùng

Danh sách:

* Username
* Email
* Role
* Status

### Chức năng

* Create
* Edit
* Reset Password
* Disable

### Role

* Administrator
* Developer
* Operator
* Viewer

### Permission Matrix

Phân quyền theo:

* Module
* Flow
* Action

---

## 10. System Settings

### General

* Company Name
* Logo
* Timezone

### Queue

* NATS Connection
* Subject Prefix

### Database

* Connection Status

### Logging

* Retention Days
* Log Level

### Security

* Session Timeout
* Password Policy

### About

* Version
* Build Information
* License
