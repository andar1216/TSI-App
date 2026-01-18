import React, { useState } from "react";

export default function Classes() {
  const url = "https://www.tsitraining.com/courses/";
  const [blocked, setBlocked] = useState(false);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>


      {!blocked ? (
        <iframe
          title="TSI Courses"
          src={url}
          style={{ flex: 1, width: "100%", border: 0 }}
          onError={() => setBlocked(true)}
        />
      ) : (
        <div style={{ padding: 16 }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Embedding blocked by site security headers.</div>
          <div style={{ opacity: 0.8, marginBottom: 12 }}>
            Use “Open in new tab”, or we can build a native Courses page that pulls your course data via your API.
          </div>
          <a href={url} target="_blank" rel="noreferrer">
            Open Courses
          </a>
        </div>
      )}
    </div>
  );
}
