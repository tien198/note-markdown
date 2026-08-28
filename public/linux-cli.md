# Linux CLI – Tổng hợp nhanh

## Mục lục

- [1. Process Management Commands](#1-process-management-commands)
  - [`pgrep`](#pgrep)
  - [`pkill`](#pkill)
  - [`ps`](#ps)
  - [`kill`](#kill)
- [2. File System Commands](#2-file-system-commands)
  - [`ls`](#ls)
  - [`cp`](#cp)
  - [`ln`](#ln)
  - [`mv`](#mv)
  - [`rm`](#rm)
  - [`mkdir`](#mkdir)
- [3. Permission Management Commands](#3-permission-management-commands)
  - [`chmod`](#chmod)
  - [`chown`](#chown)
- [4. Service Management Commands](#4-service-management-commands)
  - [`systemctl`](#systemctl)
  - [`service`](#service)
- [5. Networking Commands](#5-networking-commands)
  - [`ip`](#ip)
  - [`ss`](#ss)
  - [`ping`](#ping)
  - [`dig`](#dig)
- [6. Multimedia Processing Commands](#6-multimedia-processing-commands)
  - [`ffmpeg`](#ffmpeg)
- [7. Running Commands in Background](#7-running-commands-in-background)
  - [`nohup`](#nohup)
- [Phân loại nhanh](#phân-loại-nhanh)

## 1. Process Management Commands

Các lệnh dùng để xem, tìm kiếm và kết thúc tiến trình đang chạy.

### `pgrep`

Tìm PID của process theo tên hoặc pattern.

```bash
pgrep nginx
pgrep -af '^/opt/pencil/pen'
```

- `-a`: hiển thị cả command line.
- `-f`: tìm trên toàn bộ command line.

---

### `pkill`

Tìm process theo tên hoặc pattern rồi gửi signal để kết thúc.

```bash
pkill nginx
pkill -f '^/opt/pencil/pen'
```

Mặc định gửi `SIGTERM`.

---

### `ps`

Hiển thị danh sách process đang chạy.

```bash
ps
ps aux
```

`ps aux` thường dùng để xem toàn bộ process cùng CPU, RAM, PID, user...

---

### `kill`

Gửi signal tới process dựa trên PID.

```bash
kill 1234
```

Gửi `SIGTERM` tới PID `1234`.

Ép process dừng:

```bash
kill -9 1234
```

`-9` tương ứng với `SIGKILL`.

---

## 2. File System Commands

Các lệnh dùng để thao tác với file và thư mục.

### `ls`

Liệt kê file và thư mục.

```bash
ls
ls -la
```

- `-l`: hiển thị thông tin chi tiết.
- `-a`: hiển thị cả file ẩn.

---

### `cp`

Sao chép file hoặc thư mục.

```bash
cp file.txt backup.txt
```

Copy thư mục:

```bash
cp -r src backup
```

---

### `ln`

Tạo liên kết (link) tới file hoặc thư mục.

Cú pháp tổng quát:

```bash
ln [options] target [link_name]
```

Mặc định, `ln` tạo hard link:

```bash
ln file.txt file-hard-link.txt
```

Dùng `-s` để tạo symbolic link (symlink):

```bash
ln -s /path/to/target link-name
```

---

### `mv`

Di chuyển hoặc đổi tên file/thư mục.

Di chuyển:

```bash
mv file.txt ./backup/
```

Đổi tên:

```bash
mv old.txt new.txt
```

---

### `rm`

Xóa file hoặc thư mục.

```bash
rm file.txt
```

Xóa thư mục:

```bash
rm -r folder
```

Ép xóa không hỏi lại:

```bash
rm -rf folder
```

> `rm -rf` cần dùng cẩn thận vì có thể xóa toàn bộ dữ liệu trong thư mục mà không hỏi xác nhận.

---

### `mkdir`

Tạo thư mục.

```bash
mkdir project
```

Tạo nhiều tầng thư mục:

```bash
mkdir -p src/components/button
```

---

## 3. Permission Management Commands

Các lệnh quản lý quyền và chủ sở hữu file.

### `chmod`

Thay đổi quyền truy cập file hoặc thư mục.

```bash
chmod +x script.sh
```

Cho phép file được thực thi.

Ví dụ dạng số:

```bash
chmod 755 script.sh
```

---

### `chown`

Thay đổi owner hoặc group của file.

```bash
chown user file.txt
```

Đổi cả user và group:

```bash
chown user:group file.txt
```

---

## 4. Service Management Commands

Các lệnh quản lý service chạy nền trên Linux.

### `systemctl`

Quản lý service thông qua `systemd`.

Kiểm tra trạng thái:

```bash
systemctl status nginx
```

Khởi động:

```bash
sudo systemctl start nginx
```

Dừng:

```bash
sudo systemctl stop nginx
```

Khởi động lại:

```bash
sudo systemctl restart nginx
```

---

### `service`

Cách truyền thống để quản lý service.

```bash
sudo service nginx status
sudo service nginx restart
```

Trên các Linux hiện đại dùng `systemd`, `systemctl` thường được ưu tiên hơn.

---

## 5. Networking Commands

Các lệnh liên quan đến mạng.

### `ip`

Xem và cấu hình interface, địa chỉ IP, route...

```bash
ip addr
ip route
```

Lệnh này hiện đại hơn `ifconfig`.

---

### `ss`

Xem socket và các kết nối mạng.

```bash
ss -tulpn
```

Có thể dùng để xem port nào đang được process nào sử dụng.

---

### `ping`

Kiểm tra khả năng kết nối tới một host.

```bash
ping google.com
```

Ví dụ gửi 4 packet:

```bash
ping -c 4 google.com
```

---

### `dig`

Tra cứu thông tin DNS của domain như địa chỉ IP, mail server hoặc nameserver.

```bash
dig example.com
dig example.com MX
dig example.com NS
```

Chỉ hiển thị kết quả ngắn gọn:

```bash
dig +short example.com
```

Trên Ubuntu/Debian, `dig` nằm trong package `dnsutils`:

```bash
sudo apt install dnsutils
```

---

## 6. Multimedia Processing Commands

Các lệnh dùng để xử lý hình ảnh, âm thanh và video.

### `ffmpeg`

Chuyển đổi, cắt ghép và xử lý file video hoặc âm thanh.

Chuyển video sang định dạng MP4:

```bash
ffmpeg -i input.mov output.mp4
```

Trích xuất âm thanh từ video:

```bash
ffmpeg -i video.mp4 audio.mp3
```

Cài đặt `ffmpeg` trên Ubuntu/Debian:

```bash
sudo apt install ffmpeg
```

---

## 7. Running Commands in Background

### `nohup`

`nohup` = **no hang up**.

Dùng để chạy một command sao cho process vẫn tiếp tục chạy ngay cả khi terminal hoặc SSH session bị đóng.

Ví dụ:

```bash
nohup node server.js &
```

Ý nghĩa:

- `nohup`: bỏ qua tín hiệu `SIGHUP` khi terminal đóng.
- `node server.js`: command cần chạy.
- `&`: đưa process chạy ở background.

Mặc định output thường được ghi vào:

```text
nohup.out
```

Có thể tự chỉ định log:

```bash
nohup node server.js > server.log 2>&1 &
```

Trong đó:

- `> server.log`: ghi standard output (`stdout`) vào `server.log`.
- `2>&1`: chuyển standard error (`stderr`) vào cùng nơi với `stdout`.
- `&`: chạy background.

Ví dụ kiểm tra process sau khi chạy:

```bash
pgrep -af 'node server.js'
```

`nohup` thường dùng cho script hoặc server chạy lâu trong môi trường shell/SSH, nhưng với service lâu dài thì `systemd` thường phù hợp hơn.

---

## Phân loại nhanh

| Nhóm                                       | Lệnh                            |
| ------------------------------------------ | ------------------------------- |
| Process management                         | `pgrep`, `pkill`, `ps`, `kill`  |
| File system                                | `ls`, `cp`, `ln`, `mv`, `rm`, `mkdir` |
| Permission management                      | `chmod`, `chown`                |
| Service management                         | `systemctl`, `service`          |
| Networking                                 | `ip`, `ss`, `ping`, `dig`       |
| Multimedia processing                      | `ffmpeg`                        |
| Background / session-independent execution | `nohup`                         |

Các lệnh trên nói chung có thể gọi là **Linux commands**, **Unix commands**, **shell commands** hoặc **command-line utilities / CLI utilities**.
