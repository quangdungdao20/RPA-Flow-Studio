import uvicorn

if __name__ == "__main__":
    # Chạy FastAPI backend trên port 8000 với tính năng tự động reload khi thay đổi code
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)