# GSAP Cơ Bản

## Mục lục

- [1. GSAP là gì](#1-gsap-là-gì)
- [2. Tween là gì](#2-tween-là-gì)
- [3. gsap.to()](#3-gsapto)
- [4. gsap.from()](#4-gsapfrom)
- [5. gsap.fromTo()](#5-gsapfromto)
- [6. Các thuộc tính thường animate](#6-các-thuộc-tính-thường-animate)
- [7. duration](#7-duration)
- [8. ease](#8-ease)
- [9. delay](#9-delay)
- [10. stagger](#10-stagger)
- [11. Timeline](#11-timeline)
- [12. Position trong Timeline](#12-position-trong-timeline)
- [13. ScrollTrigger](#13-scrolltrigger)
- [14. start và end](#14-start-và-end)
- [15. scrub](#15-scrub)
- [16. pin](#16-pin)
- [17. Kết hợp Timeline + ScrollTrigger](#17-kết-hợp-timeline--scrolltrigger)
- [18. Ba khái niệm quan trọng nhất](#18-ba-khái-niệm-quan-trọng-nhất)

---

## 1. GSAP là gì

GSAP (GreenSock Animation Platform) là thư viện JavaScript dùng để tạo animation trên web.

```text
Trạng thái ban đầu
      ↓
GSAP thay đổi thuộc tính theo thời gian
      ↓
Trạng thái kết thúc
```

Ví dụ:

```js
gsap.to(".box", {
  x: 200,
  duration: 1,
});
```

Nghĩa là `.box` dịch sang phải `200px` trong `1 giây`.

---

## 2. Tween là gì

**Tween** là một animation đơn lẻ trong GSAP.

Nó mô tả việc một hoặc nhiều thuộc tính của một đối tượng thay đổi từ trạng thái này sang trạng thái khác.

Ví dụ:

```js
gsap.to(".box", {
  x: 200,
  duration: 1,
});
```

Toàn bộ đoạn trên tạo ra **một Tween**.

Có thể hình dung:

```text
Tween
├── target: ".box"
├── thuộc tính: x
├── từ: giá trị hiện tại
├── đến: 200
└── thời gian: 1 giây
```

Ba API phổ biến sau đều tạo ra Tween:

```text
gsap.to()
gsap.from()
gsap.fromTo()
```

Quan hệ cơ bản:

```text
Tween
  ↓
một animation đơn lẻ

Timeline
  ↓
sắp xếp và điều khiển nhiều Tween
```

---

## 3. gsap .to()

Animate từ trạng thái hiện tại đến trạng thái chỉ định.

```js
gsap.to(".box", {
  x: 200,
  opacity: 0,
  duration: 1,
});
```

```text
x:       0 → 200
opacity: 1 → 0
```

---

## 4. gsap.from()

Animate từ trạng thái chỉ định về trạng thái hiện tại.

```js
gsap.from(".box", {
  y: 100,
  opacity: 0,
  duration: 1,
});
```

```text
y:       100 → 0
opacity: 0   → 1
```

Thường dùng cho hiệu ứng element xuất hiện.

---

## 5. gsap.fromTo()

Chỉ định cả điểm đầu và điểm cuối.

```js
gsap.fromTo(
  ".box",
  {
    x: 0,
    opacity: 0,
  },
  {
    x: 200,
    opacity: 1,
    duration: 1,
  },
);
```

```text
x:       0 → 200
opacity: 0 → 1
```

---

## 6. Các thuộc tính thường animate

```js
gsap.to(".box", {
  x: 100,
  y: 50,
  scale: 1.2,
  rotation: 90,
  opacity: 0.5,
  width: 300,
  height: 200,
  duration: 1,
});
```

Tương ứng:

```text
x        → translateX
y        → translateY
scale    → scale()
rotation → rotate()
```

GSAP thường dùng CSS `transform` phía dưới nên có hiệu năng tốt.

---

## 7. duration

Quy định thời gian animation.

```js
gsap.to(".box", {
  x: 200,
  duration: 2,
});
```

`duration: 2` nghĩa là animation chạy trong `2 giây`.

---

## 8. ease

Quy định cách tốc độ animation thay đổi theo thời gian.

```js
gsap.to(".box", {
  x: 200,
  duration: 1,
  ease: "power2.out",
});
```

Một số ease phổ biến:

```js
ease: "none";
ease: "power1.out";
ease: "power2.out";
ease: "power3.out";
ease: "back.out";
ease: "elastic.out";
```

`none` chạy đều.  
`power2.out` chạy nhanh lúc đầu và chậm dần ở cuối.

---

## 9. delay

Chờ trước khi animation bắt đầu.

```js
gsap.to(".box", {
  x: 200,
  delay: 1,
  duration: 1,
});
```

```text
1 giây chờ
     ↓
[------][animation]
```

---

## 10. stagger

Animate nhiều element lần lượt.

```js
gsap.from(".card", {
  y: 50,
  opacity: 0,
  duration: 0.5,
  stagger: 0.2,
});
```

Nếu có 4 card:

```text
Card 1 ───────
    Card 2 ───────
        Card 3 ───────
            Card 4 ───────
```

Mỗi card bắt đầu cách nhau `0.2 giây`.

---

## 11. Timeline

Timeline dùng để quản lý nhiều animation theo một chuỗi.

```js
const tl = gsap.timeline();

tl.to(".a", {
  x: 100,
  duration: 1,
});

tl.to(".b", {
  y: 100,
  duration: 1,
});

tl.to(".c", {
  opacity: 0,
  duration: 1,
});
```

Mỗi `.to()` ở trên tạo ra một Tween và được thêm vào Timeline.

Mặc định:

```text
Tween A
────────

        Tween B
        ────────

                Tween C
                ────────
```

Có thể điều khiển timeline:

```js
tl.play();
tl.pause();
tl.reverse();
tl.restart();
```

---

## 12. Position trong Timeline

Có thể điều khiển thời điểm Tween bắt đầu trong Timeline.

```js
tl.to(".a", {
  x: 100,
  duration: 1,
});

tl.to(
  ".b",
  {
    y: 100,
    duration: 1,
  },
  "<",
);
```

`"<"` nghĩa là Tween này bắt đầu cùng thời điểm với Tween trước.

```text
Tween A ─────────
Tween B ─────────
```

---

## 13. ScrollTrigger

`ScrollTrigger` là plugin GSAP dùng để kết nối animation với hành vi scroll.

```js
gsap.to(".box", {
  x: 300,

  scrollTrigger: {
    trigger: ".box",
  },
});
```

Animation chạy khi `.box` đi vào vùng trigger.

ScrollTrigger có thể điều khiển:

```text
Tween
hoặc
Timeline
```

---

## 14. start và end

Xác định vùng scroll mà ScrollTrigger hoạt động.

```js
scrollTrigger: {
  trigger: ".section",
  start: "top 80%",
  end: "bottom 20%",
}
```

`start: "top 80%"` nghĩa là bắt đầu khi `top` của element chạm vị trí `80%` chiều cao viewport.

```text
---------------- viewport top

|
|
| 80%
|
----------------
     ↑
top element chạm đây
```

---

## 15. scrub

`scrub` đồng bộ progress của animation với progress scroll.

```js
scrollTrigger: {
  trigger: ".section",
  start: "top top",
  end: "+=1000",
  scrub: true,
}
```

```text
scroll 0%   → animation 0%
scroll 25%  → animation 25%
scroll 50%  → animation 50%
scroll 100% → animation 100%
```

Đây gọi là **scrubbed animation**.

---

## 16. pin

`pin` giữ element hoặc section đứng yên tạm thời trong khi người dùng tiếp tục scroll.

```js
scrollTrigger: {
  trigger: ".section",
  pin: true,
}
```

```text
scroll ↓

┌──────────────────┐
│                  │
│     SECTION      │ ← giữ nguyên
│                  │
└──────────────────┘
```

Khi ScrollTrigger kết thúc, section được `unpin` và trang tiếp tục scroll bình thường.

---

## 17. Kết hợp Timeline + ScrollTrigger

Ví dụ **pinned sequential reveal**:

```js
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".cards",
    start: "top 18%",
    end: "+=1500",
    pin: true,
    scrub: true,
  },
});

tl.from(".card-1", { opacity: 0, y: 50 })
  .from(".card-2", { opacity: 0, y: 50 })
  .from(".card-3", { opacity: 0, y: 50 })
  .from(".card-4", { opacity: 0, y: 50 });
```

Mỗi `.from()` là một Tween.

Timeline chứa bốn Tween và ScrollTrigger điều khiển progress của toàn bộ Timeline bằng scroll.

Cơ chế:

```text
User scroll
    ↓
ScrollTrigger
    ↓
pin section
    ↓
điều khiển progress Timeline
    ↓
Tween Card 1
    ↓
Tween Card 2
    ↓
Tween Card 3
    ↓
Tween Card 4
    ↓
unpin
    ↓
scroll trang bình thường
```

Trong thuật ngữ GSAP, đây là:

> **Pinned, scrubbed ScrollTrigger timeline with sequential reveals**

---

## 18. Ba khái niệm quan trọng nhất

```text
Tween
  ↓
một animation đơn lẻ
  ↓
gsap.to / gsap.from / gsap.fromTo

Timeline
  ↓
sắp xếp và điều khiển nhiều Tween

ScrollTrigger
  ↓
kích hoạt hoặc điều khiển Tween / Timeline bằng scroll
```

Quan hệ tổng thể:

```text
Tween
   ↓
Timeline
   ↓
ScrollTrigger
```

Nắm chắc ba phần này là đủ để hiểu phần lớn cách GSAP được dùng trong giao diện web hiện đại.
