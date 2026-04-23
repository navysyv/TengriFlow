import { useState, type ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SmartImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  /** Aspect or sizing classes for the wrapper, e.g. "aspect-[4/3]" or "h-full w-full" */
  wrapperClassName?: string;
  /** Optional fallback message shown if image fails to load */
  fallbackLabel?: string;
}

/**
 * STRICT KYRGYZSTAN-ONLY image rule:
 * Every src must reference a Kyrgyzstan location. We additionally validate at runtime —
 * if the image fails to load, we show a neutral gradient placeholder instead of a random fallback.
 */
export function SmartImage({
  src,
  alt,
  className,
  wrapperClassName,
  loading = "lazy",
  decoding = "async",
  fallbackLabel = "Image coming soon",
  ...rest
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-muted", wrapperClassName)}>
      {!loaded && !errored && (
        <div className="absolute inset-0 animate-shimmer bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.55)_50%,transparent_70%)] bg-[length:200%_100%]" />
      )}
      {errored && (
        <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,oklch(0.92_0.04_85)_0%,oklch(0.88_0.06_45)_50%,oklch(0.85_0.08_25)_100%)]">
          <div className="text-center px-4">
            <div className="text-xs font-semibold tracking-wider text-foreground/70 uppercase">Kyrgyzstan</div>
            <div className="text-sm text-foreground/60 mt-1">{fallbackLabel}</div>
          </div>
        </div>
      )}
      {!errored && (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding={decoding}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={cn(
            "transition-opacity duration-500 ease-out",
            loaded ? "opacity-100" : "opacity-0",
            className,
          )}
          {...rest}
        />
      )}
    </div>
  );
}
