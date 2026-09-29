"use client";
import maplibregl, { type StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import type { Location } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * خريطة بأسلوب «الملصق الفني» (مستوحاة من خرائط الملصقات مثل Terraink):
 * شوارع بغداد ونهر دجلة فقط بدون أي كتابات، بألوان الهوية، مع عنوان كبير وإحداثيات.
 * البيانات: OpenStreetMap عبر OpenFreeMap (مجانية وبدون مفتاح).
 */

export type PosterTheme = {
  id: string;
  label: string;
  bg: string;
  water: string;
  park: string;
  building: string;
  minor: string;
  mid: string;
  major: string;
  text: string;
  fade: string;
};

export const THEMES: PosterTheme[] = [
  { id: "wine", label: "عنابي", bg: "#1c0b13", water: "#0f1a36", park: "#26121c", building: "#26111b",
    minor: "rgba(234,220,217,.16)", mid: "rgba(234,220,217,.34)", major: "#c08552", text: "#f3e7e4", fade: "#1c0b13" },
  { id: "midnight", label: "منتصف الليل", bg: "#0b0918", water: "#1b2a52", park: "#11122a", building: "#15122b",
    minor: "rgba(234,220,217,.13)", mid: "rgba(234,220,217,.3)", major: "#e0ad83", text: "#eadcd9", fade: "#0b0918" },
  { id: "paper", label: "ورقي", bg: "#eadcd9", water: "#6e1b2e", park: "#dfcdc8", building: "#e0d0cc",
    minor: "rgba(46,13,22,.22)", mid: "rgba(46,13,22,.45)", major: "#2e0d16", text: "#2e0d16", fade: "#eadcd9" },
];

const width = (z0: number, w0: number, z1: number, w1: number) =>
  ["interpolate", ["exponential", 1.5], ["zoom"], z0, w0, z1, w1] as unknown as number;

function buildStyle(t: PosterTheme): StyleSpecification {
  const road = (id: string, classes: string[], color: string, w: number, minzoom = 0) => ({
    id,
    type: "line" as const,
    source: "omt",
    "source-layer": "transportation",
    minzoom,
    filter: ["all", ["==", ["geometry-type"], "LineString"], ["match", ["get", "class"], classes, true, false]],
    layout: { "line-cap": "round" as const, "line-join": "round" as const },
    paint: { "line-color": color, "line-width": width(9, w * 0.25, 17, w * 4) },
  });
  return {
    version: 8,
    sources: {
      omt: { type: "vector", url: "https://tiles.openfreemap.org/planet", attribution: '<a href="https://openfreemap.org" target="_blank">OpenFreeMap</a> © <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>' },
    },
    layers: [
      { id: "bg", type: "background", paint: { "background-color": t.bg } },
      { id: "landcover", type: "fill", source: "omt", "source-layer": "landcover", filter: ["match", ["get", "class"], ["grass", "wood", "farmland"], true, false], paint: { "fill-color": t.park, "fill-opacity": 0.6 } },
      { id: "park", type: "fill", source: "omt", "source-layer": "park", paint: { "fill-color": t.park } },
      { id: "water", type: "fill", source: "omt", "source-layer": "water", paint: { "fill-color": t.water } },
      { id: "waterway", type: "line", source: "omt", "source-layer": "waterway", paint: { "line-color": t.water, "line-width": width(9, 0.5, 17, 6) } },
      { id: "building", type: "fill", source: "omt", "source-layer": "building", minzoom: 13, paint: { "fill-color": t.building, "fill-opacity": 0.9 } },
      road("roads-minor", ["minor", "service", "track"], t.minor, 0.9, 11),
      road("roads-mid", ["tertiary", "secondary"], t.mid, 1.6),
      road("roads-major", ["primary", "trunk", "motorway"], t.major, 2.2),
      {
        id: "rail", type: "line", source: "omt", "source-layer": "transportation",
        filter: ["==", ["get", "class"], "rail"],
        paint: { "line-color": t.mid, "line-width": 1, "line-dasharray": [2, 2] },
      },
    ],
  } as StyleSpecification;
}

const BAGHDAD = { lat: 33.3152, lng: 44.3661 };
const fmt = (v: number, pos: string, neg: string) => `${Math.abs(v).toFixed(4)}° ${v >= 0 ? pos : neg}`;

export default function PosterMap({ locations, selectedId, onSelect }: {
  locations: Location[]; selectedId: string | null; onSelect: (id: string) => void;
}) {
  const box = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markers = useRef(new Map<string, HTMLDivElement>());
  const [theme, setTheme] = useState(THEMES[0]);
  const [failed, setFailed] = useState(false);
  const pts = locations.filter((l) => l.lat != null && l.lng != null);

  // إنشاء الخريطة والعلامات مرة واحدة
  useEffect(() => {
    if (!box.current || map.current) return;
    let m: maplibregl.Map;
    try {
      m = new maplibregl.Map({
        container: box.current,
        style: buildStyle(THEMES[0]),
        center: [BAGHDAD.lng, BAGHDAD.lat],
        zoom: 11.2,
        ...(pts.length > 1
          ? {
              bounds: pts.reduce((b, l) => b.extend([l.lng!, l.lat!]), new maplibregl.LngLatBounds()),
              fitBoundsOptions: { padding: { top: 80, bottom: 170, left: 50, right: 50 }, maxZoom: 13 },
            }
          : {}),
        attributionControl: { compact: true },
        scrollZoom: false,
        dragRotate: false,
        pitchWithRotate: false,
        cooperativeGestures: false,
      });
    } catch {
      setFailed(true); // المتصفح لا يدعم WebGL
      return;
    }
    map.current = m;
    m.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-left");
    m.touchZoomRotate.disableRotation();

    pts.forEach((l, i) => {
      const root = document.createElement("div");
      const pin = document.createElement("div");
      pin.className = "poster-pin";
      pin.style.animationDelay = `${300 + i * 180}ms`;
      pin.innerHTML = `<span class="poster-pin__dot">${i + 1}</span><span class="poster-pin__label"></span>`;
      (pin.querySelector(".poster-pin__label") as HTMLElement).textContent = l.name;
      pin.setAttribute("role", "button");
      pin.setAttribute("tabindex", "0");
      pin.setAttribute("aria-label", `${l.name} — ${l.area}`);
      pin.addEventListener("click", () => onSelect(l.id));
      pin.addEventListener("keydown", (e) => e.key === "Enter" && onSelect(l.id));
      root.appendChild(pin);
      markers.current.set(l.id, pin);
      new maplibregl.Marker({ element: root, anchor: "top" }).setLngLat([l.lng!, l.lat!]).addTo(m);
    });

    return () => { m.remove(); map.current = null; markers.current.clear(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // تمييز المعهد المختار والتحرك إليه (ليس عند العرض الأول)
  const first = useRef(true);
  useEffect(() => {
    markers.current.forEach((el, id) => el.classList.toggle("is-active", id === selectedId));
    if (first.current) { first.current = false; return; }
    const l = pts.find((p) => p.id === selectedId);
    if (l && map.current) map.current.flyTo({ center: [l.lng!, l.lat!], zoom: 14, speed: 0.9, padding: { bottom: 120 } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  const changeTheme = (t: PosterTheme) => {
    setTheme(t);
    map.current?.setStyle(buildStyle(t));
  };

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: theme.bg }}>
      <div ref={box} className="!absolute inset-0 h-full w-full" dir="ltr" aria-label="خريطة أماكن التدريس في بغداد" role="region" />

      {failed && (
        <p className="absolute inset-0 grid place-items-center p-6 text-center text-sm text-rose/60">
          تعذّر عرض الخريطة على هذا الجهاز — استخدم قائمة المعاهد والأزرار للوصول إلى Google Maps.
        </p>
      )}

      {/* اختيار نمط الملصق */}
      <div className="absolute right-3 top-3 z-10 flex gap-1 rounded-full border border-white/10 bg-black/40 p-1 backdrop-blur-md">
        {THEMES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => changeTheme(t)}
            aria-pressed={t.id === theme.id}
            className={cn("flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] transition",
              t.id === theme.id ? "bg-white/15 text-white" : "text-white/60 hover:text-white")}
          >
            <span className="h-3 w-3 rounded-full ring-1 ring-white/30" style={{ background: `linear-gradient(135deg, ${t.bg} 50%, ${t.major} 50%)` }} />
            {t.label}
          </button>
        ))}
      </div>

      {/* طباعة الملصق: اسم المدينة والإحداثيات */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] px-6 pb-7 pt-24 text-center"
        style={{ background: `linear-gradient(to top, ${theme.fade} 30%, transparent)`, color: theme.text }}
      >
        <p className="font-display text-5xl font-bold leading-none md:text-7xl">بغداد</p>
        <div className="mx-auto my-3 h-px w-16 opacity-50" style={{ background: theme.text }} />
        <p className="text-[11px] font-medium uppercase tracking-[.5em] opacity-80 md:text-xs" dir="ltr">Baghdad · Iraq</p>
        <p className="mt-1 text-[10px] tracking-[.25em] opacity-55" dir="ltr">
          {fmt(BAGHDAD.lat, "N", "S")} / {fmt(BAGHDAD.lng, "E", "W")}
        </p>
      </div>
    </div>
  );
}
