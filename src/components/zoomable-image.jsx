import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function joinClassNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ZoomableImage({
  src = "",
  alt = "",
  className,
  onClick,
  onKeyDown,
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const openPreview = (event) => {
    onClick?.(event);
    if (!event.defaultPrevented) {
      setIsOpen(true);
    }
  };

  const handleKeyDown = (event) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen(true);
    }
  };

  const preview =
    isMounted && isOpen
      ? createPortal(
          <div
            className="image-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={alt ? `查看大图：${alt}` : "查看大图"}
            onClick={() => setIsOpen(false)}
          >
            <button
              type="button"
              className="image-lightbox__close"
              aria-label="关闭大图"
              onClick={() => setIsOpen(false)}
            >
              <span aria-hidden="true">X</span>
            </button>
            <figure className="image-lightbox__figure" onClick={(event) => event.stopPropagation()}>
              <img src={src} alt={alt} className="image-lightbox__image" />
              {alt ? <figcaption className="image-lightbox__caption">{alt}</figcaption> : null}
            </figure>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <img
        {...props}
        src={src}
        alt={alt}
        className={joinClassNames(className, "zoomable-image")}
        role="button"
        tabIndex={0}
        title={alt ? `点击查看大图：${alt}` : "点击查看大图"}
        onClick={openPreview}
        onKeyDown={handleKeyDown}
      />
      {preview}
    </>
  );
}
