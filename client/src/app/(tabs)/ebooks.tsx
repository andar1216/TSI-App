import React, { useRef, useState } from "react";

export default function Ebooks() {
  const iframeWrapperRef = useRef(null);
  const [blocked, setBlocked] = useState(false);

  const enterFullscreen = () => {
    const el = iframeWrapperRef.current;
    if (!el) return;

    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if (el.msRequestFullscreen) el.msRequestFullscreen();
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {!blocked ? (
        <div
          ref={iframeWrapperRef}
          onClick={enterFullscreen}
          style={{
            flex: 1,
            width: "100%",
            cursor: "pointer",
          }}
        >
          <iframe
            title="TSI Ebooks Shelf"
            src="https://heyzine.com/shelf/tsitraining.html"
            allow="clipboard-write; fullscreen"
            allowFullScreen
            scrolling="no"
            style={{
              width: "100%",
              height: "100%",
              border: 0,
            }}
            onError={() => setBlocked(true)}
          />
        </div>
      ) : (
        <div style={{ padding: 16 }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>
            Embedding blocked by site security headers.
          </div>
          <a
            href="https://heyzine.com/shelf/tsitraining.html"
            target="_blank"
            rel="noreferrer"
          >
            Open in new tab
          </a>
        </div>
      )}
    </div>
  );
}
