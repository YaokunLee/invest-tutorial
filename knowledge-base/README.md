# Investment Knowledge Base

这个目录用于沉淀可被 AI 直接读取的投资知识。每本书、报告或文章都放在独立目录中，保留来源、摘要、主题标签、可转述观点和经过授权的短引用。

## 目录结构

```text
knowledge-base/
  books/
    psychology-of-money/
      README.md
      notes.md
      quotes.md
      pdfs/
        README.md
    a-random-walk-down-wall-street/
      README.md
      notes.md
      quotes.md
      pdfs/
        README.md
  templates/
    book-note.md
```

## 使用规则

- `pdfs/` 只放合法获得的 PDF、电子书导出或扫描文件。
- `notes.md` 放 AI 可以直接检索和引用的转述观点。
- `quotes.md` 只放短摘录，并且必须记录页码、版本和用途。
- 写文章时优先引用 `notes.md` 的转述观点；需要原文时再查 `quotes.md` 和对应 PDF 页码。

## 版权边界

《金钱心理学》和《漫步华尔街》仍受版权保护。本知识库没有下载或存放非授权 PDF，也不批量保存书中原文。你把合法获得的 PDF 放入对应 `pdfs/` 后，可以继续让 AI 基于本地文件生成页码索引、主题卡片和少量合规短引用。
