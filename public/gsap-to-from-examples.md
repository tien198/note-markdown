# GSAP `to()` và `from()`

## 1. `gsap.to()`

```js
gsap.to(".box", {
  x: 200,
  duration: 1,
});
```

```text
0px → 200px
```

`x: 200` là **điểm đến**.

---

## 2. `gsap.from()`

```js
gsap.from(".box", {
  x: 200,
  duration: 1,
});
```

```text
200px → 0px
```

`x: 200` là **điểm bắt đầu**.

---

## Tóm gọn

```text
to()   = hiện tại → giá trị khai báo
from() = giá trị khai báo → hiện tại
```
