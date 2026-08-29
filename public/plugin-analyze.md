Viewed README.md:1-19
Listed directory 26.826.12353
Listed directory skills
Listed directory .codex-plugin
Viewed .app.json:1-8
Viewed plugin.json:1-57
Listed directory spreadsheets
Listed directory excel-live-control
Viewed SKILL.md:1-221
Listed directory artifact_tool_docs
Listed directory routing

Dưới đây là cái nhìn tổng quan chi tiết về Codex Plugin `Spreadsheets` tại đường dẫn bạn yêu cầu, dựa trên các tập tin cấu hình và hướng dẫn của nó:

### 1. Tổng quan

Plugin **Spreadsheets** là một file-type wrapper plugin tích hợp sẵn trong Codex primary runtime. Chức năng chính của nó là hỗ trợ các luồng công việc (workflows) liên quan đến bảng tính: tạo mới, chỉnh sửa, phân tích, trực quan hóa, và xuất các file bảng tính định dạng như `.xlsx`, `.xls`, `.csv`, `.tsv`, cũng như các workbook dành cho Google Sheets và cả khả năng tương tác trực tiếp (live control) với ứng dụng Microsoft Excel.

### 2. Cấu trúc và các thành phần cơ bản

Thư mục của plugin được tổ chức rất rõ ràng để phân chia logic, cấu hình, và các kỹ năng cụ thể:

- **`README.md`**: Mô tả chung về plugin, liệt kê các skills đi kèm, và hướng dẫn cách hệ thống nhận diện (discoverability) khi nào nên kích hoạt plugin này.
- **`.codex-plugin/`**: Chứa tập tin `plugin.json` - đây là file cốt lõi định nghĩa metadata của plugin bao gồm tên, phiên bản, các từ khóa, mô tả giao diện (hiển thị trong UI), và cấu hình capabilities (ví dụ: `Interactive`, `Write`).
- **`.app.json`**: Cấu hình các ứng dụng (app) được kết nối với plugin này, ví dụ mã kết nối `connector_openai_codex_document_control`.
- **`skills/`**: Thư mục quan trọng nhất, chứa định nghĩa các kỹ năng (skills) mà tác tử (agent) có thể thực hiện:
  - `spreadsheets/`: Kỹ năng thao tác tĩnh để tạo/sửa/phân tích dữ liệu trong các file bảng tính cục bộ.
  - `excel-live-control/`: Kỹ năng kiểm tra, chỉnh sửa và điều khiển một phiên làm việc Excel đang mở trực tiếp (thông qua ChatGPT add-in).
- **Các thành phần bên trong mỗi Skill (ví dụ `skills/spreadsheets`)**:
  - `SKILL.md`: Văn bản Prompt/Hướng dẫn chi tiết (hành vi, rule, ranh giới quyết định) dành cho AI khi sử dụng kỹ năng này.
  - `artifact_tool_docs/`: Chứa các tài liệu API (như `API_QUICK_START.md`) mô tả cách sử dụng thư viện nội bộ để viết code xử lý.
  - `domain_guidance/`: Các chỉ dẫn định dạng và logic chuyên sâu cho từng ngành cụ thể (tài chính, y tế, quảng cáo, khoa học).
  - `routing/`: Chứa quy tắc chuyển hướng (ví dụ: `google_sheets.md` hướng dẫn riêng khi file đích là Google Sheets).
  - `assets/` & `container_tools/`: Các hình ảnh UI và các công cụ thực thi đi kèm.

### 3. Gồm có những tool (công cụ) gì?

Plugin này không cung cấp các "function calling tools" truyền thống mà cung cấp một môi trường viết mã (thường là Javascript/Node.js) để agent tự thao tác:

- **`@oai/artifact-tool` (JS Library)**: Đây là bộ tool chính. Thư viện này cung cấp đầy đủ các API (được tài liệu hóa trong `API_QUICK_START.md`) để đọc (`workbook.inspect`), chỉnh sửa, tính toán lại (recalculate), render hình ảnh (để Agent xem thử bằng mắt), và xuất file (export).
- **Công cụ chọn Template (Picker)**: Gọi các hàm ảo như `list_artifact_templates()` và `choose_artifact_template()` để hiển thị danh sách các mẫu bảng tính cho user chọn.
- **`mark_artifact_operation_started.mjs`**: Tool hệ thống (chạy qua CLI) để agent báo hiệu cho giao diện người dùng rằng quá trình xử lý tạo/sửa bảng tính đã bắt đầu.
- **Môi trường Python/JS tích hợp**: Đi kèm các thư viện phân tích ngoài như `pandas`, `numpy`, `pdf-lib` dành cho việc bóc tách dữ liệu từ file đính kèm trước khi đưa vào spreadsheet.

### 4. Cách mà Skill gọi đến các tham chiếu (References)

Trong file `SKILL.md`, các tham chiếu (references) được gọi đến bằng cách **liệt kê các tập tin nội bộ (dưới dạng đường dẫn tương đối)** và quy định rõ **khi nào Agent bắt buộc phải đọc chúng**:

- **Tham chiếu bắt buộc (Required)**: Agent luôn phải đọc `style_guidelines.md` (chuẩn format) và `artifact_tool_docs/API_QUICK_START.md` (hướng dẫn API) trước khi bắt đầu code.
- **Tham chiếu theo điều kiện (Domain Requirements)**: Nếu Agent nhận thấy yêu cầu của user thuộc lĩnh vực Tài chính, nó sẽ tự động tải file `domain_guidance/financial_models.md` để áp dụng luật riêng (như không hardcode số má, phải có sheet Assumptions).
- **Tham chiếu định tuyến (Routing)**: Agent tham chiếu đến file `routing/google_sheets.md` khi phát hiện đích đến là Google Sheets để tuân thủ cách xử lý riêng.

### 5. Cách xác định công cụ/kỹ năng nào được gọi

Việc xác định (Discoverability / Tool Routing) được thực hiện qua 2 bước:

1.  **Từ khóa (Keywords Discoverability)**:
    - Dựa vào khai báo `keywords` trong `plugin.json` (sheet, excel, csv, tracker, workbook...).
    - Khi trong Prompt của user có chứa một trong các từ khóa này hoặc các từ liên quan đến thao tác dữ liệu dạng bảng, Codex runtime sẽ tải plugin Spreadsheets vào context của mô hình.
2.  **Ranh giới quyết định của Agent (Decision Boundary)**:
    - Khi plugin đã kích hoạt, Agent sẽ đọc các file `SKILL.md` để tự quyết định.
    - Nếu user yêu cầu xử lý file cục bộ hoặc tạo báo cáo tĩnh -> Agent dùng kỹ năng `spreadsheets` và code qua thư viện `@oai/artifact-tool`.
    - Nếu user yêu cầu tương tác với file "đang mở" trên phần mềm Excel hoặc qua kết nối -> Agent sẽ dùng kỹ năng `excel-live-control`.
    - Trong quá trình xử lý, nếu thiếu thông tin (vd mục đích, đối tượng xem báo cáo), nó được chỉ định gọi công cụ `request_user_input` để hỏi ý kiến người dùng trước khi tiến hành code.
