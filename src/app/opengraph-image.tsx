import { ImageResponse } from "next/og";

export const alt = "Numifi — AI-Powered Financial Document Converter";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0B1120 0%, #0F172A 50%, #162032 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 88,
            height: 88,
            borderRadius: 22,
            background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
            marginBottom: 32,
          }}
        >
          <span style={{ fontSize: 52, fontWeight: 800, color: "white" }}>N</span>
        </div>
        <h1
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "#F1F5F9",
            margin: 0,
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.15,
          }}
        >
          Turn messy financial PDFs into clean, organized data
        </h1>
        <p
          style={{
            fontSize: 24,
            color: "#94A3B8",
            margin: 0,
            marginTop: 20,
            textAlign: "center",
            maxWidth: 700,
          }}
        >
          AI-powered document conversion for bank statements, invoices, receipts, and tax forms.
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 40,
            fontSize: 18,
            fontWeight: 600,
            color: "#3B82F6",
          }}
        >
          numifi.app
        </div>
      </div>
    ),
    { ...size }
  );
}
