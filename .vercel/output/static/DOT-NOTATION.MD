● WebSearch(UI component library carousel dot indicators pagination built-in React) (ctrl+o to expand)

Yes! Several UI libraries include carousel dot indicators built-in:

### Full UI Libraries

| Library           | Dots                 | Notes                                    |
| ----------------- | -------------------- | ---------------------------------------- |
| CoreUI            | ✅ Built-in          | CCarousel with indicators prop           |
| KendoReact        | ✅ Built-in          | Enterprise-grade, dot pagination overlay |
| MUI (Material UI) | ✅ Via MobileStepper | Dots variant for step/slide indicators   |

### Dedicated Carousel Libraries

| Library              | Dots        | Notes                                                                                          |
| -------------------- | ----------- | ---------------------------------------------------------------------------------------------- |
| React Slick          | ✅ Built-in | Most popular, dots: true prop                                                                  |
| React Alice Carousel | ✅ Built-in | Zero-config dot pagination                                                                     |
| Swiper               | ✅ Built-in | pagination={{ clickable: true }}                                                               |
| Embla Carousel       | ⚠️ Custom   | Headless — provides the logic, you style the dots (this is what shadcn/ui uses under the hood) |

### Recommendation

Since your project already uses shadcn/ui (which is built on Embla), the most natural path is to keep Embla and add a small custom dot component using its API — it's only ~10 lines of
code. Alternatively, Swiper or React Slick give you dots completely out of the box with no extra work.

Would you like me to annotate the design with a note specifying which library to use for implementation?
