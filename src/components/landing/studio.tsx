"use client";
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type CSSProperties,
} from "react";
import { AnimatePresence } from "framer-motion";
import {
  ArrowDownToLine,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Eye,
  EyeOff,
  Film,
  Flame,
  FolderOpen,
  GripVertical,
  Layers3,
  LockKeyhole,
  Maximize,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Settings2,
  SkipBack,
  Sparkles,
  Upload,
  WandSparkles,
  X,
} from "lucide-react";
import { EffectArt, effects, type Effect } from "./effects";
import { Modal } from "./ui";

type Layer = {
  id: string;
  name: string;
  type: string;
  color: string;
  visible: boolean;
  opacity: number;
  start: number;
  peak: number;
  end: number;
  dissipation: number;
  blend: "normal" | "screen" | "lighten";
};
function newLayer(effect: Effect, id: string): Layer {
  return {
    id,
    name: effect.name,
    type: effect.type,
    color: effect.color,
    visible: true,
    opacity: 85,
    start: 24,
    peak: 72,
    end: 216,
    dissipation: 64,
    blend: "screen",
  };
}
const defaults: Layer[] = [
  {
    ...newLayer(effects[0], "portal"),
    name: "Inferno portal",
    opacity: 100,
    blend: "normal",
  },
  {
    ...newLayer(effects[8], "embers"),
    name: "Ember drift",
    opacity: 60,
    start: 0,
  },
  {
    ...newLayer(effects[1], "haze"),
    name: "Atmosphere",
    opacity: 35,
    start: 0,
    peak: 24,
    end: 240,
    dissipation: 32,
  },
];
export function envelope(layer: Layer, frame: number) {
  if (frame < layer.start || frame >= layer.end) return 0;
  const rise = Math.min(
    1,
    (frame - layer.start) / Math.max(1, layer.peak - layer.start),
  );
  const fall = Math.min(
    1,
    (layer.end - frame) / Math.max(1, layer.dissipation),
  );
  return (Math.max(0, Math.min(rise, fall)) * layer.opacity) / 100;
}
function download(name: string, content: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function Studio({ initialEffect }: { initialEffect?: Effect }) {
  const [layers, setLayers] = useState<Layer[]>(() =>
    initialEffect ? [...defaults, newLayer(initialEffect, "added")] : defaults,
  );
  const [selected, setSelected] = useState(initialEffect ? "added" : "portal");
  const [frame, setFrame] = useState(96),
    [playing, setPlaying] = useState(false),
    [compare, setCompare] = useState(false),
    [split, setSplit] = useState(48);
  const [mode, setMode] = useState("Close"),
    [tab, setTab] = useState("Layers");
  const [exportOpen, setExportOpen] = useState(false),
    [uploadOpen, setUploadOpen] = useState(false),
    [helpOpen, setHelpOpen] = useState(false);
  const [format, setFormat] = useState("project"),
    [exported, setExported] = useState(false),
    [notice, setNotice] = useState("");
  const [video, setVideo] = useState<{ url: string; name: string } | null>(
      null,
    ),
    [fileError, setFileError] = useState("");
  const nextLayerId = useRef(0);
  const videoRef = useRef<HTMLVideoElement>(null),
    fileRef = useRef<HTMLInputElement>(null),
    studioRef = useRef<HTMLDivElement>(null);
  const layer = layers.find((l) => l.id === selected) || layers[0];
  const closeExport = useCallback(() => setExportOpen(false), []),
    closeUpload = useCallback(() => setUploadOpen(false), []),
    closeHelp = useCallback(() => setHelpOpen(false), []);
  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => setFrame((f) => (f + 1) % 240), 1000 / 24);
    return () => clearInterval(timer);
  }, [playing]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 4000);
    return () => clearTimeout(timer);
  }, [notice]);
  useEffect(() => {
    if (!video) return;
    return () => URL.revokeObjectURL(video.url);
  }, [video]);
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (playing) void el.play().catch(() => setPlaying(false));
    else el.pause();
  }, [playing, video]);
  function update(patch: Partial<Layer>) {
    setLayers((all) =>
      all.map((l) => (l.id === selected ? { ...l, ...patch } : l)),
    );
  }
  function toggle(id: string) {
    setLayers((all) =>
      all.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l)),
    );
  }
  function addEffect(effect: Effect) {
    const id = `fx-${++nextLayerId.current}`;
    setLayers((all) => [...all, newLayer(effect, id)]);
    setSelected(id);
    setTab("Layers");
    setNotice(`${effect.name} added as an independent layer`);
  }
  function scrub(value: number) {
    setFrame(value);
    setPlaying(false);
    if (videoRef.current && Number.isFinite(videoRef.current.duration))
      videoRef.current.currentTime = Math.min(
        value / 24,
        videoRef.current.duration,
      );
  }
  function upload(file?: File) {
    if (!file) return;
    if (!file.type.startsWith("video/")) {
      setFileError("Choose a video file such as MP4, WebM, or MOV.");
      return;
    }
    if (file.size > 100 * 1024 * 1024) {
      setFileError(
        "Please choose a clip smaller than 100 MB for this preview.",
      );
      return;
    }
    setVideo({ url: URL.createObjectURL(file), name: file.name });
    setFileError("");
    setFrame(96);
    setPlaying(false);
    setUploadOpen(false);
    setNotice("Local preview loaded. Your file stays in this browser.");
  }
  function exportProject() {
    if (format === "project")
      download(
        "emberframe-project.json",
        JSON.stringify(
          {
            name: "Beyond the ordinary",
            prototype: true,
            source: {
              name: video?.name || "The crossing — sample plate",
              preserved: true,
            },
            fps: 24,
            frameCount: 240,
            referenceMode: mode.toLowerCase(),
            layers,
          },
          null,
          2,
        ),
        "application/json",
      );
    else
      download(
        "emberframe-effect-preview.svg",
        `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080"><defs><filter id="g"><feGaussianBlur stdDeviation="14"/></filter></defs><g fill="none" stroke="${layer.color}" opacity="${layer.opacity / 100}"><ellipse cx="960" cy="540" rx="280" ry="320" stroke-width="24" filter="url(#g)"/><ellipse cx="960" cy="540" rx="280" ry="320" stroke-width="3"/><ellipse cx="960" cy="540" rx="265" ry="306" stroke-width="1"/></g></svg>`,
        "image/svg+xml",
      );
    setExported(true);
  }
  return (
    <div className="studio" ref={studioRef}>
      <div className="studio-top">
        <div className="studio-brand">
          <Flame size={16} />
          <span>emberframe</span>
          <span className="studio-divider" />
          <span className="project-name">
            The crossing <ChevronDown size={12} />
          </span>
        </div>
        <div className="studio-top-right">
          <span className="prototype-tag">
            <span /> Interactive prototype
          </span>
          <button
            className="studio-export"
            onClick={() => {
              setExported(false);
              setExportOpen(true);
            }}
          >
            <ArrowDownToLine size={13} /> Export <ChevronDown size={11} />
          </button>
        </div>
      </div>
      <div className="studio-workspace">
        <aside className="studio-sidebar">
          <div className="studio-tabs">
            {["Layers", "Library"].map((t) => (
              <button
                key={t}
                className={tab === t ? "active" : ""}
                onClick={() => setTab(t)}
              >
                {t === "Layers" ? (
                  <Layers3 size={13} />
                ) : (
                  <FolderOpen size={13} />
                )}
                {t}
              </button>
            ))}
          </div>
          {tab === "Layers" ? (
            <>
              <div className="panel-title">
                <span>COMPOSITION</span>
                <button
                  className="icon-button"
                  aria-label="Add effect layer"
                  onClick={() => setTab("Library")}
                >
                  <Plus size={14} />
                </button>
              </div>
              <div className="layer-stack">
                {layers.map((l) => (
                  <div
                    className={`layer-item ${selected === l.id ? "selected" : ""}`}
                    key={l.id}
                  >
                    <button
                      className="layer-select"
                      onClick={() => setSelected(l.id)}
                    >
                      <GripVertical size={11} className="muted" />
                      <span className="layer-icon" style={{ color: l.color }}>
                        <Sparkles size={13} />
                      </span>
                      <span>
                        {l.name}
                        <small>FX LAYER</small>
                      </span>
                    </button>
                    <button
                      aria-label={`${l.visible ? "Hide" : "Show"} ${l.name}`}
                      aria-pressed={l.visible}
                      className="eye-button"
                      onClick={() => toggle(l.id)}
                    >
                      {l.visible ? <Eye size={12} /> : <EyeOff size={12} />}
                    </button>
                  </div>
                ))}
                <div className="source-layer">
                  <Film size={14} />
                  <span>
                    Original footage<small>SOURCE · PROTECTED</small>
                  </span>
                  <LockKeyhole size={11} />
                </div>
              </div>
              <button className="add-layer" onClick={() => setTab("Library")}>
                <Plus size={13} /> Add effect layer
              </button>
              <div className="source-promise">
                <LockKeyhole size={15} />
                <p>
                  Your shot stays yours.
                  <span>Every effect is a separate layer.</span>
                </p>
              </div>
            </>
          ) : (
            <div className="studio-library">
              {effects.slice(0, 6).map((effect) => (
                <button key={effect.name} onClick={() => addEffect(effect)}>
                  <EffectArt type={effect.type} animate={false} />
                  <span>
                    {effect.name}
                    <Plus size={12} />
                  </span>
                </button>
              ))}
            </div>
          )}
          <button className="import-button" onClick={() => setUploadOpen(true)}>
            <Upload size={13} /> Import your footage
          </button>
        </aside>
        <div className="studio-center">
          <div className="viewer-toolbar">
            <span>
              <span className="green-dot" />{" "}
              {video ? video.name : "The crossing / shot_004"}
            </span>
            <div>
              <span className="resolution">1920 × 1080</span>
              <button
                className="icon-button"
                aria-label="Expand editor"
                onClick={() => {
                  if (document.fullscreenElement)
                    void document.exitFullscreen();
                  else
                    void studioRef.current
                      ?.requestFullscreen()
                      .catch(() =>
                        setNotice("Fullscreen is unavailable in this browser."),
                      );
                }}
              >
                <Maximize size={12} />
              </button>
            </div>
          </div>
          <div className="viewer-scene">
            {video ? (
              <video
                ref={videoRef}
                src={video.url}
                muted
                loop
                playsInline
                className="scene-plate"
                onError={() =>
                  setFileError(
                    "This browser cannot decode this clip. Try an MP4 or WebM file.",
                  )
                }
              />
            ) : (
              <div
                className="scene-plate"
                style={{ backgroundImage: "url('/media/plate.webp')" }}
              />
            )}
            <div
              className="composite-stack"
              style={{
                clipPath: compare ? `inset(0 0 0 ${split}%)` : undefined,
              }}
            >
              {layers.map(
                (l) =>
                  l.visible && (
                    <div
                      key={l.id}
                      className={`composite-layer layer-${l.id}`}
                      style={{
                        opacity: envelope(l, frame),
                        mixBlendMode: l.blend,
                      }}
                    >
                      {l.id === "portal" && !video ? (
                        <div
                          className="scene-plate"
                          style={{ backgroundImage: "url('/media/hero.webp')" }}
                        />
                      ) : l.id === "embers" ? (
                        <div className="ember-overlay">
                          {Array.from({ length: 15 }, (_, i) => (
                            <i key={i} style={{ "--i": i } as CSSProperties} />
                          ))}
                        </div>
                      ) : l.id === "haze" ? (
                        <div className="haze-overlay" />
                      ) : (
                        <EffectArt
                          type={l.type}
                          color={l.color}
                          className="composited-effect"
                        />
                      )}
                    </div>
                  ),
              )}
            </div>
            <div className="viewer-corner top-left" />
            <div className="viewer-corner bottom-right" />
            <span className="scene-label">
              {compare ? "ORIGINAL" : "COMPOSITE PREVIEW"}
            </span>
            <span className="scene-label right">
              {compare ? "WITH EMBERFRAME" : "SAMPLE SCENE"}
            </span>
            {compare && (
              <>
                <div className="comparison-line" style={{ left: `${split}%` }}>
                  <span>↔</span>
                </div>
                <input
                  className="comparison-input"
                  aria-label="Before and after comparison position"
                  type="range"
                  min="3"
                  max="97"
                  value={split}
                  onChange={(e) => setSplit(Number(e.target.value))}
                />
              </>
            )}
            {fileError && (
              <div className="viewer-error">
                {fileError}
                <button
                  onClick={() => {
                    setVideo(null);
                    setFileError("");
                  }}
                >
                  Restore sample
                </button>
              </div>
            )}
          </div>
          <div className="viewer-bottom">
            <button
              className={`compare-button ${compare ? "active" : ""}`}
              onClick={() => setCompare(!compare)}
              aria-pressed={compare}
            >
              <span className="compare-icon" /> Before / after
            </button>
            <div className="playback">
              <button aria-label="Reset playhead" onClick={() => scrub(0)}>
                <SkipBack size={13} />
              </button>
              <button
                aria-label={playing ? "Pause preview" : "Play preview"}
                onClick={() => setPlaying(!playing)}
              >
                {playing ? (
                  <Pause size={15} fill="currentColor" />
                ) : (
                  <Play size={15} fill="currentColor" />
                )}
              </button>
              <span>
                {String(Math.floor(frame / 24)).padStart(2, "0")}:
                {String(frame % 24).padStart(2, "0")}
                <i> / 00:10</i>
              </span>
            </div>
            <span className="viewer-fps">24 FPS</span>
          </div>
          <div className="timeline">
            <div className="timeline-head">
              <span>
                <Layers3 size={12} /> Timeline
              </span>
              <span>
                FRAME <strong>{String(frame).padStart(3, "0")}</strong>
                <button
                  className="icon-button"
                  aria-label="Reset all sample settings"
                  onClick={() => {
                    setLayers(defaults);
                    setSelected("portal");
                    scrub(96);
                    setMode("Close");
                    setNotice("Sample settings restored");
                  }}
                >
                  <RotateCcw size={12} />
                </button>
              </span>
            </div>
            <div className="timeline-ruler">
              {[0, 24, 48, 72, 96, 120, 144, 168, 192, 216].map((f) => (
                <span key={f}>{String(f).padStart(3, "0")}</span>
              ))}
            </div>
            <div className="timeline-tracks">
              {layers.map((l) => (
                <button
                  aria-label={`Select ${l.name} timeline track`}
                  key={l.id}
                  className={`timeline-track ${l.visible ? "" : "disabled"}`}
                  onClick={() => setSelected(l.id)}
                >
                  <span
                    style={
                      {
                        left: `${(l.start / 240) * 100}%`,
                        width: `${((l.end - l.start) / 240) * 100}%`,
                        "--track-color": l.color,
                      } as CSSProperties
                    }
                  >
                    <Sparkles size={10} />
                    {l.name}
                    <i
                      style={{
                        width: `${(l.dissipation / (l.end - l.start)) * 100}%`,
                      }}
                    />
                  </span>
                </button>
              ))}
              <div className="original-track">
                {Array.from({ length: 12 }, (_, i) => (
                  <div key={i} />
                ))}
                <span>
                  Original footage <LockKeyhole size={9} />
                </span>
              </div>
              <div
                className="playhead"
                style={{ left: `${(frame / 239) * 100}%` }}
              >
                <i />
              </div>
            </div>
            <input
              aria-label="Timeline frame"
              className="timeline-scrubber"
              type="range"
              min="0"
              max="239"
              value={frame}
              onChange={(e) => scrub(Number(e.target.value))}
            />
          </div>
        </div>
        <aside className="studio-controls">
          <div className="controls-title">
            <Settings2 size={13} /> Effect controls{" "}
            <button
              className="icon-button"
              aria-label="About the interactive preview"
              onClick={() => setHelpOpen(true)}
            >
              <CircleHelp size={12} />
            </button>
          </div>
          <div className="control-content">
            <div className="selected-effect">
              <span className="layer-icon" style={{ color: layer.color }}>
                <Sparkles size={15} />
              </span>
              <div>
                {layer.name}
                <small>Independent effect layer</small>
              </div>
            </div>
            <label className="control-label">REFERENCE GUIDANCE</label>
            <div className="reference-thumb">
              <EffectArt type={layer.type} animate={false} />
              <span>
                Studio reference<small>Included sample asset</small>
              </span>
              <Check size={12} />
            </div>
            <div className="mode-tabs">
              {["Exact", "Close", "Original"].map((m) => (
                <button
                  className={mode === m ? "active" : ""}
                  key={m}
                  onClick={() => {
                    setMode(m);
                    setNotice(
                      `${m} guidance selected for the next simulated generation`,
                    );
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
            <p className="mode-hint">
              {mode === "Exact"
                ? "Aim for the reference’s structure and motion."
                : mode === "Close"
                  ? "Keep its character. Adapt it to your shot."
                  : "Explore a fresh interpretation of your idea."}
            </p>
            <div className="control-separator" />
            <label className="control-label">FRAME PRECISION</label>
            <div className="timing-fields">
              <label>
                Start
                <input
                  aria-label="Effect start frame"
                  type="number"
                  min="0"
                  max={layer.peak - 1}
                  value={layer.start}
                  onChange={(e) =>
                    update({
                      start: Math.max(
                        0,
                        Math.min(
                          layer.peak - 1,
                          Math.round(Number(e.target.value)),
                        ),
                      ),
                    })
                  }
                />
              </label>
              <label>
                Peak
                <input
                  aria-label="Effect peak frame"
                  type="number"
                  min={layer.start + 1}
                  max={layer.end - layer.dissipation}
                  value={layer.peak}
                  onChange={(e) =>
                    update({
                      peak: Math.max(
                        layer.start + 1,
                        Math.min(
                          layer.end - layer.dissipation,
                          Math.round(Number(e.target.value)),
                        ),
                      ),
                    })
                  }
                />
              </label>
              <label>
                End
                <input
                  aria-label="Effect end frame"
                  type="number"
                  min={layer.peak + layer.dissipation}
                  max="240"
                  value={layer.end}
                  onChange={(e) =>
                    update({
                      end: Math.max(
                        layer.peak + layer.dissipation,
                        Math.min(240, Math.round(Number(e.target.value))),
                      ),
                    })
                  }
                />
              </label>
            </div>
            <div className="curve">
              <svg viewBox="0 0 200 50" aria-label="Effect intensity envelope">
                <defs>
                  <linearGradient id="curveFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#a58bfa" stopOpacity=".22" />
                    <stop offset="1" stopColor="#a58bfa" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d={`M 0 45 L ${(layer.start / 240) * 200} 45 L ${(layer.peak / 240) * 200} 7 L ${((layer.end - layer.dissipation) / 240) * 200} 7 L ${(layer.end / 240) * 200} 45 L 200 45`}
                  fill="url(#curveFill)"
                  stroke="#a58bfa"
                  strokeWidth="1.5"
                />
                <line
                  x1={(frame / 240) * 200}
                  y1="0"
                  x2={(frame / 240) * 200}
                  y2="50"
                  stroke="#ddd"
                  strokeWidth=".8"
                  strokeDasharray="2 3"
                />
              </svg>
            </div>
            <label className="range-label">
              Dissipation<span>{layer.dissipation} frames</span>
              <input
                aria-label="Dissipation frames"
                type="range"
                min="1"
                max={layer.end - layer.peak}
                value={layer.dissipation}
                onChange={(e) =>
                  update({ dissipation: Number(e.target.value) })
                }
              />
            </label>
            <div className="control-separator" />
            <label className="range-label">
              Opacity<span>{layer.opacity}%</span>
              <input
                aria-label="Layer opacity"
                type="range"
                min="0"
                max="100"
                value={layer.opacity}
                onChange={(e) => update({ opacity: Number(e.target.value) })}
              />
            </label>
            <label className="blend-label">
              Blending
              <select
                aria-label="Layer blending"
                value={layer.blend}
                onChange={(e) =>
                  update({ blend: e.target.value as Layer["blend"] })
                }
              >
                <option value="normal">Normal</option>
                <option value="screen">Screen</option>
                <option value="lighten">Lighten</option>
              </select>
            </label>
            <button
              className="refine-button"
              onClick={() => {
                update({
                  opacity: mode === "Exact" ? 100 : mode === "Close" ? 85 : 65,
                });
                scrub(layer.peak + 6);
                setNotice(
                  `Preview variation applied · ${mode.toLowerCase()} guidance · simulated result`,
                );
              }}
            >
              <WandSparkles size={13} /> Preview variation{" "}
              <ChevronRight size={12} />
            </button>
            <p className="simulated-note">
              Simulated controls · no AI generation
            </p>
          </div>
        </aside>
      </div>
      <div className="studio-status">
        <span>
          <span className="green-dot" /> Original footage protected
        </span>
        <span>
          {layers.length} effect layers <i>·</i> Editable composition <i>·</i>{" "}
          24 fps
        </span>
        <span>All changes stay in this session</span>
      </div>
      <AnimatePresence>
        {notice && (
          <div className="studio-notice" role="status">
            <Check size={14} />
            {notice}
            <button
              aria-label="Dismiss notification"
              onClick={() => setNotice("")}
            >
              <X size={12} />
            </button>
          </div>
        )}
        {exportOpen && (
          <Modal title="Take your vision further" onClose={closeExport}>
            <div className="export-content">
              <div className="modal-symbol">
                <ArrowDownToLine size={28} />
              </div>
              <h3>Make it yours.</h3>
              <p>
                Download the editable demo settings or a transparent SVG effect
                sample.
              </p>
              <label
                className={`export-choice ${format === "project" ? "active" : ""}`}
              >
                <input
                  type="radio"
                  checked={format === "project"}
                  onChange={() => {
                    setFormat("project");
                    setExported(false);
                  }}
                />{" "}
                <span>
                  Project settings
                  <small>JSON · timing, layers, and reference mode</small>
                </span>
              </label>
              <label
                className={`export-choice ${format === "svg" ? "active" : ""}`}
              >
                <input
                  type="radio"
                  checked={format === "svg"}
                  onChange={() => {
                    setFormat("svg");
                    setExported(false);
                  }}
                />
                <span>
                  Transparent effect sample
                  <small>SVG · illustrative ring with selected color</small>
                </span>
              </label>
              <button
                className="button primary full-width"
                onClick={exportProject}
              >
                {exported ? <Check size={16} /> : <ArrowDownToLine size={16} />}
                {exported ? "Downloaded · download again" : "Download preview"}
              </button>
              <p className="modal-footnote">
                Video rendering, EXR, and ProRes export are planned for the full
                product.
              </p>
            </div>
          </Modal>
        )}
        {uploadOpen && (
          <Modal title="Your scene. A new possibility." onClose={closeUpload}>
            <div className="upload-content">
              <button
                className="dropzone"
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  upload(e.dataTransfer.files[0]);
                }}
              >
                <Upload size={32} />
                <strong>Drop your footage here</strong>
                <span>or click to browse your files</span>
                <small>MP4, WebM, MOV · Up to 100 MB</small>
              </button>
              <input
                ref={fileRef}
                hidden
                type="file"
                accept="video/*"
                onChange={(e) => upload(e.target.files?.[0])}
              />
              {fileError && (
                <p role="alert" className="error-message">
                  {fileError}
                </p>
              )}
              <p className="modal-footnote">
                Local visual preview only. Your video stays in your browser.
                Sample overlays demonstrate the workflow; they are not generated
                from your clip.
              </p>
              <button
                className="text-button"
                onClick={() => {
                  setVideo(null);
                  setFileError("");
                  setUploadOpen(false);
                }}
              >
                Use the included sample scene <ChevronRight size={14} />
              </button>
            </div>
          </Modal>
        )}
        {helpOpen && (
          <Modal title="Inside the concept studio" onClose={closeHelp}>
            <div className="help-content">
              <h3>Go ahead. Play with it.</h3>
              <p>
                Select a layer, scrub the timeline, and adjust its timing,
                opacity, or blend mode. Switch on before / after to compare the
                clean plate with the composite.
              </p>
              <p>
                This is an interactive front-end concept. The sample scene uses
                illustrative artwork. AI generation, tracking, and production
                video export are not connected yet.
              </p>
              <button className="button primary" onClick={closeHelp}>
                Back to creating <Sparkles size={15} />
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
