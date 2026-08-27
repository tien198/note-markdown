# Agent Skills (`SKILL.md`) — Kiến thức đã kiểm chứng

> Cập nhật: **27/08/2026**
>
> Tài liệu này tổng hợp từ Agent Skills specification và tài liệu chính thức hiện tại của Anthropic Claude Code, OpenAI Codex và Google Antigravity.

## Mục lục

1. [Kết luận ngắn](#1-kết-luận-ngắn)
2. [Agent Skills là gì?](#2-agent-skills-là-gì)
3. [Cấu trúc chuẩn của một Skill](#3-cấu-trúc-chuẩn-của-một-skill)
4. [`SKILL.md`](#4-skillmd)
5. [Progressive Disclosure](#5-progressive-disclosure)
6. [Antigravity, Claude Code và Codex có dùng chung chuẩn này không?](#6-antigravity-claude-code-và-codex-có-dùng-chung-chuẩn-này-không)
7. [Google Antigravity](#7-google-antigravity)
8. [Anthropic Claude Code](#8-anthropic-claude-code)
9. [OpenAI Codex](#9-openai-codex)
10. [`SKILL.md` khác gì `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`?](#10-skillmd-khác-gì-agentsmd-claudemd-geminimd)
11. [Khả năng portable giữa các agent](#11-khả-năng-portable-giữa-các-agent)
12. [Cấu trúc repo dùng chung nên áp dụng](#12-cấu-trúc-repo-dùng-chung-nên-áp-dụng)
13. [Những nhận định cũ hiện không còn đúng](#13-những-nhận-định-cũ-hiện-không-còn-đúng)
14. [Nguồn chính thức](#14-nguồn-chính-thức)

---

## 1. Kết luận ngắn

**`SKILL.md` / Agent Skills hiện là một open standard, không phải cơ chế riêng của Antigravity.**

Các sản phẩm sau hiện đều hỗ trợ Agent Skills:

| Tool | Hỗ trợ Agent Skills / `SKILL.md` | Auto activation | Progressive disclosure |
|---|---:|---:|---:|
| Google Antigravity | ✅ | ✅ | ✅ |
| Anthropic Claude Code | ✅ | ✅ | ✅ |
| OpenAI Codex | ✅ | ✅ | ✅ |

Tuy nhiên:

> **Cùng chuẩn không có nghĩa implementation giống nhau.**

Các agent có thể khác nhau về:

- vị trí tìm skill;
- cách cài đặt;
- cách gọi skill thủ công;
- frontmatter mở rộng;
- permission/tool model;
- plugin system;
- runtime;
- cách phân phối skill.

Có thể hình dung:

```text
                     Agent Skills
                    open standard
                         │
                         │
                  SKILL.md format
                         │
          ┌──────────────┼──────────────┐
          ↓              ↓              ↓
     Antigravity     Claude Code       Codex
          │              │              │
      integration     integration    integration
        riêng            riêng           riêng
```

---

## 2. Agent Skills là gì?

Agent Skills là format dùng để đóng gói một **capability/workflow có thể tái sử dụng** cho AI agent.

Một Skill có thể chứa:

- hướng dẫn;
- quy trình nhiều bước;
- best practices;
- examples;
- reference documentation;
- scripts;
- templates/assets;
- các yêu cầu về môi trường.

Mục tiêu là thay vì liên tục prompt lại:

```text
"Lần nào làm code review cũng phải làm A, B, C, D..."
```

ta định nghĩa workflow một lần:

```text
code-review/
└── SKILL.md
```

Agent có thể nhận biết khi nào workflow đó phù hợp và tải nó vào context khi cần.

---

## 3. Cấu trúc chuẩn của một Skill

Theo Agent Skills specification:

```text
skill-name/
├── SKILL.md          # Required
├── scripts/          # Optional
├── references/       # Optional
├── assets/           # Optional
└── ...               # Có thể thêm file/thư mục khác
```

### Ý nghĩa

#### `SKILL.md`

Entry point chính của skill:

- metadata;
- description;
- instructions.

#### `scripts/`

Code mà agent có thể chạy:

```text
scripts/
├── validate.sh
├── extract.py
└── generate.ts
```

Phù hợp khi cần:

- deterministic behavior;
- automation;
- validation;
- transformation;
- gọi CLI/tool.

#### `references/`

Tài liệu chi tiết chỉ cần đọc trong một số trường hợp:

```text
references/
├── architecture.md
├── api.md
└── conventions.md
```

#### `assets/`

Tài nguyên tĩnh:

```text
assets/
├── template.json
├── schema.json
├── example.png
└── report-template.md
```

---

## 4. `SKILL.md`

`SKILL.md` là file Markdown có **YAML frontmatter** ở đầu.

Ví dụ tối thiểu theo specification:

```md
---
name: code-review
description: Reviews code for bugs, maintainability, performance, and project conventions. Use when reviewing code or pull requests.
---

# Code Review

1. Inspect the changed files.
2. Check correctness.
3. Check edge cases.
4. Check project conventions.
5. Report issues by severity.
```

### Các field chuẩn

| Field | Bắt buộc | Ý nghĩa |
|---|---:|---|
| `name` | ✅ | Tên duy nhất của skill |
| `description` | ✅ | Skill làm gì và khi nào nên dùng |
| `license` | ❌ | License |
| `compatibility` | ❌ | Yêu cầu môi trường/runtime |
| `metadata` | ❌ | Metadata mở rộng |
| `allowed-tools` | ❌ | Tool được pre-approve; experimental |

### `name`

Theo Agent Skills specification:

- tối đa 64 ký tự;
- lowercase;
- số và dấu `-`;
- không bắt đầu/kết thúc bằng `-`;
- không dùng `--`;
- phải khớp tên thư mục cha.

Ví dụ:

```yaml
name: frontend-design
```

### `description`

Đây là field rất quan trọng vì agent dùng nó để quyết định skill có liên quan đến task hiện tại hay không.

Không nên:

```yaml
description: Helps with frontend.
```

Nên:

```yaml
description: Builds production-quality responsive frontend interfaces. Use when implementing, refactoring, or reviewing page UI, layout, responsive behavior, hierarchy, overflow, and interaction design.
```

Nó phải trả lời được hai câu:

```text
Skill làm gì?
+
Khi nào nên dùng?
```

---

## 5. Progressive Disclosure

Đây là một trong các nguyên lý quan trọng nhất của Agent Skills.

Agent không cần load toàn bộ tất cả skill vào context ngay từ đầu.

Luồng chung:

```text
Conversation starts
        │
        ↓
Load skill metadata
name + description
        │
        ↓
Agent thấy skill phù hợp
        │
        ↓
Load full SKILL.md
        │
        ↓
Cần thêm thông tin?
        │
        ├── references/
        ├── scripts/
        └── assets/
```

Theo Agent Skills specification:

### Level 1 — Metadata

Thông thường agent biết:

```text
name
description
```

của các skill khả dụng.

### Level 2 — Instructions

Khi skill được activate:

```text
SKILL.md
```

mới được load đầy đủ.

### Level 3 — Resources

Các resource khác chỉ được truy cập khi cần:

```text
scripts/
references/
assets/
```

### Lợi ích

- giảm token/context usage;
- có thể giữ nhiều skill;
- skill có thể chứa knowledge base lớn;
- không cần nhét mọi hướng dẫn vào một file luôn-on;
- dễ modularize workflow.

---

## 6. Antigravity, Claude Code và Codex có dùng chung chuẩn này không?

**Có.**

Nhưng nên diễn đạt chính xác là:

> Antigravity, Claude Code và Codex đều hỗ trợ **Agent Skills / `SKILL.md`**, dựa trên cùng open standard, nhưng mỗi sản phẩm có integration và extension riêng.

### Không nên hiểu là

```text
Một directory path duy nhất
+
một runtime duy nhất
+
một bộ frontmatter duy nhất
+
một invocation syntax duy nhất
```

cho tất cả agent.

### Nên hiểu là

```text
Shared format:
SKILL.md
YAML metadata
instructions
resources
progressive disclosure
        │
        ↓
Different host implementations
```

---

## 7. Google Antigravity

Google mô tả trực tiếp:

> Skills are an open standard for extending agent capabilities.

Một Antigravity skill điển hình:

```text
.agents/
└── skills/
    └── frontend-design/
        ├── SKILL.md
        ├── scripts/
        ├── examples/
        └── resources/
```

### Workspace skill

```text
<workspace-root>/.agents/skills/<skill-folder>/
```

### Global skill

```text
~/.gemini/config/skills/<skill-folder>/
```

Antigravity hiện mặc định dùng:

```text
.agents/skills/
```

và vẫn giữ backward support cho:

```text
.agent/skills/
```

### Activation

Antigravity mô tả quá trình:

```text
Discovery
   ↓
agent thấy name + description

Activation
   ↓
đọc SKILL.md

Execution
   ↓
làm theo instructions
```

Agent có thể tự chọn skill phù hợp; người dùng cũng có thể nhắc trực tiếp tên skill.

### Resource

Ngoài `SKILL.md`, Antigravity hỗ trợ các resource như:

```text
scripts/
examples/
resources/
```

Tài liệu Antigravity cục bộ đã cung cấp cũng mô tả cấu trúc tương tự và cơ chế load các tài nguyên bổ sung on-demand.

---

## 8. Anthropic Claude Code

Claude Code **có Agent Skills**.

Nhận định:

```text
Claude Code chỉ có CLAUDE.md
Claude Code không có skill system
```

hiện đã lỗi thời.

Anthropic ghi rõ:

> Claude Code skills follow the Agent Skills open standard.

Claude Code đồng thời **mở rộng chuẩn** bằng các khả năng riêng, ví dụ:

- invocation control;
- subagent execution;
- dynamic context injection.

### Project skills

```text
.claude/skills/
```

Ví dụ:

```text
project/
└── .claude/
    └── skills/
        └── deploy/
            ├── SKILL.md
            ├── template.md
            ├── examples/
            └── scripts/
```

### User skills

```text
~/.claude/skills/
```

### Discovery

Claude Code có thể tìm skill:

- trong `.claude/skills/` của project;
- ở parent directories tới repository root;
- trong các nested `.claude/skills/` khi làm việc với subdirectory;
- trong `~/.claude/skills/`;
- từ plugins.

Điều này giúp hỗ trợ monorepo.

Ví dụ:

```text
repo/
├── .claude/
│   └── skills/
│       └── shared-workflow/
│           └── SKILL.md
│
└── packages/
    └── frontend/
        └── .claude/
            └── skills/
                └── frontend-only/
                    └── SKILL.md
```

### Auto activation

Claude có thể tự invoke skill khi task phù hợp.

Skill cũng có thể được gọi trực tiếp bằng command tương ứng nếu host/config cho phép.

### `CLAUDE.md` vẫn tồn tại

Agent Skills **không thay thế hoàn toàn `CLAUDE.md`**.

`CLAUDE.md` phù hợp cho:

- project context;
- persistent instructions;
- conventions;
- facts cần biết thường xuyên.

Skill phù hợp cho:

- workflow;
- procedure;
- capability;
- instructions chỉ cần khi task phù hợp.

---

## 9. OpenAI Codex

Codex hiện **hỗ trợ Agent Skills chính thức**.

OpenAI ghi rõ:

> Skills build on the open Agent Skills standard.

Skill dùng cho cả ChatGPT và Codex có cấu trúc:

```text
my-skill/
├── SKILL.md
├── scripts/
├── references/
├── assets/
└── agents/
    └── openai.yaml
```

Trong đó:

```text
agents/openai.yaml
```

là phần **OpenAI-specific**, không phải lõi bắt buộc của Agent Skills standard.

Nó có thể cấu hình:

- appearance;
- invocation policy;
- tool dependencies.

### Progressive disclosure trong Codex

OpenAI mô tả:

```text
name + description
        ↓
skill phù hợp
        ↓
full SKILL.md
```

Codex có thể:

1. được yêu cầu sử dụng skill trực tiếp;
2. tự chọn skill khi `description` match với task.

### Local discovery của Codex

Theo tài liệu OpenAI hiện tại, Codex scan `.agents/skills` từ current working directory lên repository root.

Ví dụ:

```text
repo/
├── .agents/
│   └── skills/
│       └── shared-skill/
│           └── SKILL.md
│
└── packages/
    └── frontend/
        └── .agents/
            └── skills/
                └── frontend-skill/
                    └── SKILL.md
```

Các scope được tài liệu liệt kê gồm:

```text
REPO:
$CWD/.agents/skills
$CWD/../.agents/skills
...
$REPO_ROOT/.agents/skills

USER:
$HOME/.agents/skills

ADMIN:
/etc/codex/skills

SYSTEM:
skills bundled with Codex
```

### Manual invocation

Trong Codex CLI / IDE extension có thể:

```text
/skills
```

hoặc mention skill bằng:

```text
$skill-name
```

Ví dụ creator built-in:

```text
$skill-creator
```

### Skill configuration

Codex có thể disable local skill trong:

```text
~/.codex/config.toml
```

Ví dụ:

```toml
[[skills.config]]
path = "/path/to/skill/SKILL.md"
enabled = false
```

### Distribution

OpenAI phân biệt:

```text
local/repo skill
        │
        ↓
direct skill folder

reusable distribution
        │
        ↓
plugin
```

Plugin có thể bundle:

- một hoặc nhiều skills;
- connectors / MCP integration;
- metadata;
- các dependency liên quan.

---

## 10. `SKILL.md` khác gì `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`?

Đây là hai lớp abstraction khác nhau.

### Persistent project instructions

Ví dụ:

```text
AGENTS.md
CLAUDE.md
GEMINI.md
```

Thường chứa các rule/context kiểu:

```md
Use pnpm.
Use TypeScript strict mode.
Do not modify generated files.
Use kebab-case for section folders.
Run tests before completing.
```

Đây là:

```text
"Trong project này phải làm việc như thế nào?"
```

### Skill

Ví dụ:

```text
skills/
└── frontend-design/
    └── SKILL.md
```

Skill trả lời:

```text
"Khi cần làm loại công việc X thì workflow cụ thể là gì?"
```

Ví dụ:

```md
---
name: frontend-design
description: Implements production-quality responsive frontend designs...
---

1. Inspect the design system.
2. Inspect existing page structure.
3. Implement desktop layout.
4. Implement responsive states.
5. Check wrapping and overflow.
6. Check visual hierarchy.
7. Validate interaction states.
```

### Sơ đồ

```text
                Agent configuration
                       │
          ┌────────────┴────────────┐
          │                         │
 Persistent instructions       Agent Skills
          │                         │
     AGENTS.md                   SKILL.md
     CLAUDE.md                       │
     GEMINI.md                  task-specific
          │
  general/project context
```

Hai cơ chế có thể tồn tại **đồng thời**.

---

## 11. Khả năng portable giữa các agent

Agent Skills được thiết kế để portable, nhưng portability có nhiều mức.

### Mức 1 — Format portable

Phần này portable tốt:

```text
SKILL.md
name
description
Markdown instructions
scripts/
references/
assets/
```

Ví dụ skill:

```text
seo-audit/
├── SKILL.md
├── scripts/
└── references/
```

có thể được tái sử dụng giữa nhiều Agent Skills-compatible host.

### Mức 2 — Workflow portable

Nếu instructions chỉ dựa vào các capability phổ biến:

```text
read file
edit file
run shell
inspect repository
```

thì portability khá cao.

### Mức 3 — Runtime portability

Không được đảm bảo.

Ví dụ skill yêu cầu:

```text
specific MCP server
specific Codex tool
Claude-only frontmatter
Antigravity-specific command
browser runtime
Python package riêng
```

thì cần adaptation.

### Ví dụ không portable hoàn toàn

```yaml
compatibility: Requires a Claude Code-specific subagent feature.
```

hoặc OpenAI-specific:

```text
agents/openai.yaml
```

### Quy tắc thực tế

Muốn một repo skill dùng chung:

```text
Giữ core workflow agent-neutral
        +
tách host-specific integration ra riêng
```

---

## 12. Cấu trúc repo dùng chung nên áp dụng

Một repo dùng để chia sẻ skills giữa nhiều agent có thể tổ chức:

```text
texcra-skills/
├── skills/
│   ├── frontend-design/
│   │   ├── SKILL.md
│   │   ├── references/
│   │   ├── scripts/
│   │   └── assets/
│   │
│   ├── seo-content/
│   │   ├── SKILL.md
│   │   └── references/
│   │
│   └── code-review/
│       └── SKILL.md
│
└── README.md
```

Sau đó từng host có thể:

- symlink;
- copy;
- install;
- import;
- package thành plugin;

vào discovery path riêng.

### Nguyên tắc để giữ portable

Nên:

```text
SKILL.md
references/
scripts/
assets/
```

và dùng language trung lập:

```md
Inspect the repository.
Run the project's existing tests.
Use the available shell tool when necessary.
```

Hạn chế viết:

```md
Call Claude-only tool X.
Use Codex-specific command Y.
Use Antigravity-only MCP Z.
```

trừ khi skill thực sự dành riêng cho host đó.

### Nếu cần host-specific config

Có thể tách:

```text
my-skill/
├── SKILL.md
├── references/
├── scripts/
├── assets/
└── agents/
    └── openai.yaml
```

và ghi rõ compatibility.

---

## 13. Những nhận định cũ hiện không còn đúng

### Sai / lỗi thời

```text
SKILL.md là Antigravity-specific.
```

Không đúng với hệ sinh thái hiện tại.

---

### Sai / lỗi thời

```text
Claude Code không có Skills.
```

Claude Code hiện hỗ trợ Agent Skills chính thức.

---

### Sai / lỗi thời

```text
Codex chỉ dùng AGENTS.md và không có Skills.
```

Codex hiện hỗ trợ Agent Skills chính thức và OpenAI có tài liệu riêng cho việc build, discover, invoke và distribute skills.

---

### Chưa chính xác

```text
AGENTS.md / CLAUDE.md / GEMINI.md và SKILL.md là cùng một loại customization.
```

Không đúng.

Chúng giải quyết hai vấn đề khác nhau:

```text
persistent context/rules
vs
task-specific reusable workflow
```

---

### Cũng chưa chính xác

```text
Vì cùng dùng Agent Skills nên copy nguyên mọi thứ sang agent khác chắc chắn chạy.
```

Không đúng.

Open standard cung cấp **format chung**, không đảm bảo mọi:

- tool;
- permission;
- extension;
- dependency;
- discovery path;
- invocation syntax;

đều giống nhau.

---

## 14. Nguồn chính thức

### Agent Skills specification

- [Agent Skills — Specification](https://agentskills.io/specification)
- [Agent Skills — Home](https://agentskills.io/)

Đây là nguồn chính để kiểm tra:

- directory structure;
- `SKILL.md`;
- frontmatter;
- `scripts/`;
- `references/`;
- `assets/`;
- progressive disclosure;
- portability.

---

### Anthropic

- [Anthropic — Equipping agents for the real world with Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)
- [Claude Code — Extend Claude with skills](https://code.claude.com/docs/en/skills)
- [Claude Code — Agent Skills in the SDK](https://code.claude.com/docs/en/agent-sdk/skills)

Anthropic xác nhận:

- Agent Skills được publish thành open standard;
- Claude Code hỗ trợ Skills;
- Claude Code skills follow Agent Skills open standard;
- Claude Code có các extension riêng.

---

### OpenAI

- [OpenAI — Build skills](https://learn.chatgpt.com/codex/build-skills)
- [OpenAI — Introducing the Codex app](https://openai.com/index/introducing-the-codex-app/)
- [OpenAI Academy — Using skills](https://openai.com/academy/skills/)
- [OpenAI Help — Skills in ChatGPT](https://help.openai.com/en/articles/20001066)

OpenAI xác nhận:

- ChatGPT và Codex dùng Agent Skills;
- Skills build on the open Agent Skills standard;
- Codex dùng progressive disclosure;
- Codex có repo/user/admin/system skill locations;
- skills có thể được dùng xuyên các OpenAI surfaces và export/import giữa các tool hỗ trợ Agent Skills format.

---

### Google Antigravity

- [Google Antigravity — Agent Skills](https://antigravity.google/docs/skills/)
- [Google Antigravity — Plugins](https://antigravity.google/docs/plugins)

Google xác nhận:

- Skills là open standard;
- skill là folder chứa `SKILL.md`;
- hỗ trợ progressive disclosure;
- workspace skill mặc định nằm trong `.agents/skills/`;
- global skill nằm trong `~/.gemini/config/skills/`.

---

## Tóm tắt cuối cùng

```text
Agent Skills
    │
    ├── open standard
    │
    ├── SKILL.md
    ├── YAML frontmatter
    ├── name + description
    ├── scripts/
    ├── references/
    ├── assets/
    └── progressive disclosure
          │
          ├── Google Antigravity
          ├── Anthropic Claude Code
          └── OpenAI Codex
```

Điểm cần nhớ nhất:

> **Agent Skills là chuẩn chung; cách mỗi agent tích hợp chuẩn đó là riêng.**

Vì vậy, một repository skill được thiết kế theo Agent Skills specification và hạn chế dependency đặc thù của từng host có thể được dùng làm **nguồn skill dùng chung cho Antigravity, Claude Code, Codex và các agent khác hỗ trợ chuẩn này**.
