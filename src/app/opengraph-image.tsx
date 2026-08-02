import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const runtime = "nodejs";
export const alt = `${siteConfig.name} — Licensed Electrician in Lynn, MA`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0F1E52",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(59,130,246,0.45), transparent 40%), radial-gradient(circle at 85% 90%, rgba(234,88,12,0.35), transparent 40%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 88,
              height: 88,
              borderRadius: 20,
              background: "linear-gradient(135deg, #3B82F6, #152B7A)",
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path d="M13 2 6 14h5l-1 8 9-13h-6l1-7Z" fill="#FACC15" stroke="#152B7A" strokeWidth="0.5" />
            </svg>
          </div>
          <span style={{ fontSize: 40, fontWeight: 700, color: "#FFFFFF" }}>BH Electrics</span>
        </div>

        <div style={{ display: "flex", marginTop: 48, fontSize: 56, fontWeight: 700, color: "#FFFFFF", maxWidth: 900, lineHeight: 1.15 }}>
          Licensed Electrician Serving Lynn &amp; the North Shore
        </div>

        <div style={{ display: "flex", marginTop: 32, fontSize: 28, color: "rgba(255,255,255,0.75)" }}>
          {siteConfig.phone} &nbsp;&middot;&nbsp; Residential &amp; Commercial &amp; 24/7 Emergency
        </div>
      </div>
    ),
    { ...size }
  );
}
