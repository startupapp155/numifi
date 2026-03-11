import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 38,
          background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
        }}
      >
        <span
          style={{
            fontSize: 120,
            fontWeight: 800,
            color: "white",
            lineHeight: 1,
            marginTop: -4,
          }}
        >
          N
        </span>
      </div>
    ),
    { ...size }
  );
}
