# GSAP Animation Patterns / Compositions

Trong GSAP có thể hiểu **animation pattern / composition** là các cách ghép nhiều tween, timeline và ScrollTrigger thành một chuyển động hoàn chỉnh.

## Common Animation Patterns

| Pattern / Composition | Mô tả ngắn |
|---|---|
| **Fade Reveal** | Phần tử từ mờ → rõ |
| **Fade-up / Fade-down Reveal** | Vừa fade vừa trượt lên/xuống |
| **Slide Reveal** | Trượt từ trái/phải/trên/dưới vào |
| **Scale Reveal** | Phóng to hoặc thu nhỏ khi xuất hiện |
| **Zoom-out Reveal** | Bắt đầu hơi phóng lớn rồi trở về `scale: 1` |
| **Staggered Reveal** | Nhiều phần tử xuất hiện lần lượt |
| **Sequential Reveal** | Các animation chạy tuần tự có chủ đích |
| **Masked / Clip Reveal** | Nội dung được hé lộ bằng `clip-path`, mask hoặc overflow |
| **Text Reveal** | Chữ xuất hiện theo dòng, từ hoặc ký tự |
| **Scrubbed Animation** | Progress animation bám theo progress scroll |
| **Scroll-triggered Reveal** | Animation bắt đầu khi phần tử đi vào viewport |
| **Pinned Section** | Section được giữ cố định trong một khoảng scroll |
| **Pinned Sequential Reveal** | Section pin lại, các phần tử lần lượt xuất hiện |
| **Pinned Storytelling** | Một vùng cố định trong khi nội dung/cảnh thay đổi theo scroll |
| **Scroll-scrubbed Zoom** | Scroll điều khiển trực tiếp mức zoom |
| **Parallax** | Các layer di chuyển với tốc độ khác nhau |
| **Horizontal Scroll** | Scroll dọc điều khiển nội dung chạy ngang |
| **Carousel / Slider Motion** | Các panel/card chuyển tuần tự ngang hoặc dọc |
| **Stacked Cards** | Card chồng lên nhau rồi lần lượt di chuyển/reveal |
| **Card Pinning / Card Stacking** | Các card lần lượt pin/chồng khi scroll |
| **Accordion Motion** | Expand/collapse có animation |
| **Morphing** | Chuyển đổi hình dạng SVG/path |
| **FLIP Transition** | Animate giữa hai layout/state khác nhau |
| **Page Transition** | Chuyển động khi đổi page/view |
| **Hero Entrance Sequence** | Logo → heading → description → CTA xuất hiện theo timeline |
| **Loop / Marquee** | Animation lặp vô hạn |
| **Infinite Horizontal Loop** | Danh sách chạy ngang liên tục |
| **Cursor-follow Motion** | Element đi theo chuột |
| **Magnetic Effect** | Button/element bị hút về phía con trỏ |
| **Mouse Parallax** | Vị trí element thay đổi theo chuột |
| **Hover Microinteraction** | Scale, rotate, underline, icon motion khi hover |
| **Progress-driven Animation** | Animation dựa trên một giá trị progress |
| **Timeline Choreography** | Phối hợp nhiều tween bằng một `gsap.timeline()` |

## Composition Examples

### Scroll-triggered Staggered Reveal

```text
Scroll-triggered Staggered Reveal
├── Heading → Fade-up Reveal
├── Cards → Staggered Fade-up + Scale
├── Images → Zoom-out Reveal
└── Featured Image → Scroll-scrubbed Zoom
```

### Pinned Sequential Reveal

```text
Pinned Sequential Reveal
├── ScrollTrigger
├── Pinning
├── Scrubbing
├── Timeline
└── Sequential card reveals
```

## Classification

Các dạng như:

- **Pinned Sequential Reveal**
- **Scroll-triggered Staggered Reveal**
- **Pinned Storytelling**

có thể gọi chung là **animation patterns / compositions**.

Còn các chuyển động cơ bản như:

- `fade`
- `scale`
- `translate`
- `rotate`

thường được xem là **animation primitives / effects**.
