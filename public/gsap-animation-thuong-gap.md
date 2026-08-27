# GSAP – Các Animation Thường Gặp

Trong GSAP, có một số kiểu animation xuất hiện rất thường xuyên trong website. Phần lớn đều xây dựng từ:

- `gsap.to()`
- `gsap.from()`
- `gsap.fromTo()`
- `gsap.timeline()`
- `ScrollTrigger`

Giả sử HTML:

```html
<div class="box">BOX</div>
```

```css
.box {
  width: 100px;
  height: 100px;
  background: orange;
}
```

---

## 1. Fade — Mờ dần / hiện dần

Rất thường dùng khi section xuất hiện.

```js
gsap.from(".box", {
  opacity: 0,
  duration: 1,
});
```

Kết quả:

```text
opacity: 0
    ↓
opacity: 1
```

---

## 2. Fade Up — Hiện lên từ dưới

Một trong những animation phổ biến nhất của landing page.

```js
gsap.from(".box", {
  y: 50,
  opacity: 0,
  duration: 1,
});
```

```text
     vị trí cuối
        ┌─────┐
        │ BOX │
        └─────┘
           ↑
           │ 50px
           │
       opacity 0
```

Thường dùng cho:

- Heading
- Paragraph
- Card
- Section

---

## 3. Slide — Trượt

Ví dụ trượt từ trái vào:

```js
gsap.from(".box", {
  x: -200,
  duration: 1,
});
```

```text
BOX ───────────────→ vị trí ban đầu
      200px
```

Ngược lại:

```js
gsap.from(".box", {
  x: 200,
});
```

sẽ đi từ bên phải vào.

---

## 4. Scale — Phóng to / thu nhỏ

```js
gsap.from(".box", {
  scale: 0,
  duration: 1,
});
```

```text
nhỏ
 □
 ↓
┌────────┐
│  BOX   │
└────────┘
```

Một kiểu nhẹ hơn thường dùng cho card:

```js
gsap.from(".box", {
  scale: 0.9,
  opacity: 0,
  duration: 0.6,
});
```

---

## 5. Zoom-out Image — Ảnh từ lớn thu về

Rất phổ biến với ảnh hero.

```js
gsap.from(".image", {
  scale: 1.2,
  duration: 1.5,
});
```

```text
scale 1.2
    ↓
scale 1
```

Thường kết hợp:

```css
.image-wrapper {
  overflow: hidden;
}
```

để phần ảnh phóng lớn không tràn ra ngoài.

---

## 6. Rotate — Xoay

```js
gsap.to(".box", {
  rotation: 360,
  duration: 2,
});
```

GSAP về cơ bản sẽ tạo transform tương đương:

```css
transform: rotate(360deg);
```

---

## 7. Stagger — Xuất hiện lần lượt

Cực kỳ phổ biến với danh sách card.

```html
<div class="card">1</div>
<div class="card">2</div>
<div class="card">3</div>
<div class="card">4</div>
```

```js
gsap.from(".card", {
  y: 40,
  opacity: 0,
  duration: 0.6,
  stagger: 0.15,
});
```

Kết quả:

```text
Card 1  ↑
        0.15s
Card 2  ↑
        0.15s
Card 3  ↑
        0.15s
Card 4  ↑
```

`stagger` không phải một loại chuyển động riêng. Nó có nghĩa là chạy cùng animation trên nhiều phần tử nhưng lệch thời gian.

---

## 8. Timeline — Nhiều animation nối tiếp nhau

```js
const tl = gsap.timeline();

tl.from(".title", {
  y: 50,
  opacity: 0,
})
.from(".description", {
  y: 30,
  opacity: 0,
})
.from(".button", {
  scale: 0,
});
```

Luồng:

```text
Title
  ↓
Description
  ↓
Button
```

Có thể cho chúng chồng thời gian:

```js
tl.from(".title", {
  opacity: 0,
})
.from(".description", {
  opacity: 0,
}, "-=0.3");
```

`-=0.3` nghĩa là animation sau bắt đầu sớm hơn `0.3s`.

---

# Các Animation Liên Quan Đến Scroll

Cần:

```js
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
```

---

## 9. Scroll-triggered Reveal

Chỉ chạy khi scroll đến phần tử.

```js
gsap.from(".box", {
  y: 50,
  opacity: 0,

  scrollTrigger: {
    trigger: ".box",
    start: "top 80%",
  },
});
```

Luồng:

```text
scroll
   ↓
.box chạm 80% viewport
   ↓
animation bắt đầu
```

Đây chính là kiểu **scroll-triggered fade-up reveal**.

---

## 10. Scroll-scrubbed Animation

Animation chạy theo vị trí scroll.

```js
gsap.to(".box", {
  x: 500,

  scrollTrigger: {
    trigger: ".box",
    scrub: true,
  },
});
```

Khác animation bình thường:

```text
Animation thường:

trigger
   ↓
0% ─────────→ 100%
      thời gian
```

Scrub:

```text
scroll 0%   → animation 0%
scroll 25%  → animation 25%
scroll 50%  → animation 50%
scroll 100% → animation 100%
```

Kéo scroll ngược lên thì animation cũng chạy ngược.

---

## 11. Pinned Section — Ghim section khi scroll

```js
ScrollTrigger.create({
  trigger: ".section",
  start: "top top",
  end: "+=1000",
  pin: true,
});
```

Luồng:

```text
Trang scroll
     ↓

┌─────────────────┐
│     SECTION     │ ← đứng yên
│                 │
└─────────────────┘

scroll tiếp 1000px

     ↓

section được thả
```

Thường dùng cho:

- Storytelling
- Product showcase
- Presentation
- Sequential reveal

---

## 12. Pinned Sequential Reveal

Đây là kiểu kết hợp:

- `pin`
- `scrub`
- `timeline`
- Sequential reveal

```js
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".section",
    pin: true,
    scrub: true,
    end: "+=2000",
  },
});

tl.from(".card-1", {
  opacity: 0,
  y: 50,
});

tl.from(".card-2", {
  opacity: 0,
  y: 50,
});

tl.from(".card-3", {
  opacity: 0,
  y: 50,
});
```

Luồng:

```text
SECTION PIN
    │
    ├── scroll → card 1
    │
    ├── scroll → card 2
    │
    ├── scroll → card 3
    │
    └── hết timeline
             ↓
          UNPIN
```

Tên khá chính xác trong thuật ngữ GSAP:

**Pinned, scrubbed ScrollTrigger timeline with sequential reveals**

---

## 13. Parallax-like Movement

Ảnh di chuyển chậm trong khi scroll:

```js
gsap.to(".image", {
  y: -100,

  scrollTrigger: {
    trigger: ".section",
    scrub: true,
  },
});
```

```text
Scroll trang:    500px ↑
Ảnh:             100px ↑
```

Tạo cảm giác các lớp chuyển động với tốc độ khác nhau.

---

## 14. Scroll Zoom

Ảnh phóng to hoặc thu nhỏ theo scroll:

```js
gsap.fromTo(
  ".image",
  {
    scale: 1.2,
  },
  {
    scale: 1,

    scrollTrigger: {
      trigger: ".image",
      scrub: true,
    },
  }
);
```

Rất hay gặp ở:

- Hero
- Banner
- Ảnh fullscreen
- Portfolio

---

## 15. Horizontal Scroll

Scroll dọc nhưng nội dung chạy ngang:

```js
gsap.to(".items", {
  xPercent: -75,

  scrollTrigger: {
    trigger: ".section",
    pin: true,
    scrub: true,
    end: "+=3000",
  },
});
```

Cảm giác:

```text
scroll ↓

┌─────────────────────────┐
│  1 │ 2 │ 3 │ 4 │ 5     │
└─────────────────────────┘
             ← ← ←
```

---

## 16. Infinite Loop / Marquee

Ví dụ chạy liên tục:

```js
gsap.to(".logo", {
  x: -500,
  duration: 10,
  repeat: -1,
  ease: "none",
});
```

`repeat: -1`:

```text
────→────→────→────→ ∞
```

Thường dùng cho:

- Logo carousel
- Ticker
- Marquee
- Background decoration

---

## 17. Hover Animation

GSAP không bắt buộc phải dùng ScrollTrigger.

```js
const box = document.querySelector(".box");

box.addEventListener("mouseenter", () => {
  gsap.to(box, {
    scale: 1.1,
    duration: 0.3,
  });
});

box.addEventListener("mouseleave", () => {
  gsap.to(box, {
    scale: 1,
    duration: 0.3,
  });
});
```

---

## 18. Text Reveal

Có thể dùng container `overflow: hidden`.

```html
<div class="text-wrapper">
  <h1 class="title">Hello GSAP</h1>
</div>
```

```css
.text-wrapper {
  overflow: hidden;
}
```

```js
gsap.from(".title", {
  yPercent: 100,
  duration: 1,
});
```

Cảm giác:

```text
┌──────────────────────┐
│                      │
│       Hello GSAP ↑   │
└──────────────────────┘
```

Chữ giống như được đẩy từ dưới lên và lộ ra khỏi mask.

---

# Những Kiểu Nên Nhớ Trước

| Animation | GSAP chính |
|---|---|
| Fade | `opacity` |
| Fade Up | `y + opacity` |
| Slide | `x / y` |
| Scale / Zoom | `scale` |
| Rotate | `rotation` |
| Stagger cards | `stagger` |
| Chuỗi animation | `timeline()` |
| Scroll reveal | `ScrollTrigger` |
| Animation theo scroll | `scrub` |
| Ghim section | `pin` |
| Reveal tuần tự | `timeline + scrub + pin` |
| Parallax | `y + scrub` |
| Image zoom | `scale + scrub` |
| Horizontal scroll | `x + pin + scrub` |

---

# Tổng Quan

```text
GSAP
│
├── Property animation
│   ├── fade
│   ├── translate
│   ├── scale
│   └── rotate
│
├── Timing
│   ├── delay
│   ├── stagger
│   ├── repeat
│   └── timeline
│
└── ScrollTrigger
    ├── trigger
    ├── scrub
    ├── pin
    └── timeline
```

Nắm được khoảng 6 khái niệm sau là đã có thể dựng phần lớn animation thường thấy trên landing page hiện đại:

1. `gsap.to()` / `gsap.from()`
2. CSS transform
3. `timeline()`
4. `stagger`
5. `ScrollTrigger`
6. `scrub` và `pin`
