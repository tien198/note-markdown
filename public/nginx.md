# Nginx

Nginx là một **web server** và **reverse proxy** rất phổ biến.

Nó thường đứng ở phía trước ứng dụng của anh:

```text
Người dùng
   ↓
Nginx
   ↓
Next.js / NestJS / PHP / API server
```

Các việc Nginx thường làm:

- Phục vụ file tĩnh: HTML, CSS, JS, ảnh.
- **Reverse proxy**: nhận request rồi chuyển tiếp đến app đang chạy ở port khác.
- **Load balancing**: chia request cho nhiều server.
- Xử lý **HTTPS/SSL**.
- Cache nội dung để giảm tải backend.
- Giới hạn request, IP, kích thước upload...
- Có thể dùng làm gateway cho nhiều domain/subdomain.

Ví dụ NestJS chạy ở:

```text
localhost:3000
```

Nginx có thể nhận request tại:

```text
https://api.example.com
```

rồi chuyển:

```text
api.example.com
      ↓
    Nginx
      ↓
localhost:3000
```

Một cấu hình đơn giản:

```nginx
server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://localhost:3000;
    }
}
```

Có thể hiểu đơn giản: **Nginx là người đứng ở cửa server, nhận request từ Internet rồi quyết định request đó phải đi đâu.**
