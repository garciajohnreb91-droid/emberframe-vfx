/** Creative targets, never guarantees of pixel-identical AI reproduction. */
export type ReferenceMode = "exact" | "close" | "original";
export interface SourceFootage {
  readonly id: string;
  readonly storageKey: string;
  readonly sha256: string;
  readonly frameCount: number;
  readonly fps: { numerator: number; denominator: number };
}
export interface EffectLayer {
  id: string;
  sourceId: SourceFootage["id"];
  version: number;
  mode: ReferenceMode;
  referenceAssetIds: string[];
  prompt: string;
  /** Zero-based; start inclusive, end exclusive. Dissipation occupies the tail. */
  timing: { startFrame: number; endFrameExclusive: number; dissipationFrames: number };
  enabled: boolean;
  opacity: number;
  order: number;
}
