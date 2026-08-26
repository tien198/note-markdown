# Tự lo SSL cho VPS

Không khó — có vài cách phổ biến, từ dễ đến tự làm hết.

## Cách 1: Reverse proxy tự động lấy SSL (dễ nhất, phổ biến nhất)

Dùng reverse proxy tích hợp sẵn **Let's Encrypt** (SSL miễn phí), tự động cấp và gia hạn.

**Caddy** — dễ nhất, chỉ 1 dòng config:

```
yourdomain.com {
    reverse_proxy localhost:3000
}
```

Caddy tự lấy SSL từ Let's Encrypt, tự gia hạn, không cần làm gì thêm.

**Nginx + Certbot** — phổ biến hơn, cần setup thêm nhưng linh hoạt:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

Certbot tự cấu hình Nginx và set cron job gia hạn (chứng chỉ Let's Encrypt hết hạn sau 90 ngày, certbot tự renew trước đó).

## Cách 2: Dùng Cloudflare (dễ nhất, không cần cấu hình server)

- Trỏ domain qua Cloudflare (miễn phí)
- Bật **"Full" hoặc "Flexible" SSL mode** trong dashboard Cloudflare
- Clo