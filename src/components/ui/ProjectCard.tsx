import { ArrowUpRight } from "lucide-react";
import type { Project } from "../../data/projects";
import { cn } from "../../lib/cn";

export interface CardShape {
  /** Column span at md+. */
  col: string;
  /** Vertical offset for editorial rhythm. */
  extra: string;
  /** Responsive aspect ratio. */
  aspect: string;
  /** Tonal surface, alternated for depth. */
  surface: string;
  /** Flex placement of the folio numeral (art-direction per card). */
  numPlace: string;
  /** Fluid size of the folio numeral (container-query units). */
  numSize: string;
  /** Full-width feature composition. */
  feature?: boolean;
}

interface ProjectCardProps {
  project: Project;
  shape: CardShape;
}

/**
 * Art-directed placeholder (never a skeleton). Standard cards carry an outlined
 * folio numeral placed differently per card; the feature card carries a large
 * outlined TRIPPLE wordmark and a gold rule. Category and status frame it, the
 * title sits below. Hover scales the art, lights the border gold and reveals an
 * arrow; a VIEW cursor previews the eventual case-study interaction.
 */
export function ProjectCard({ project, shape }: ProjectCardProps) {
  const media = (
    <div
      className={cn(
        "@container relative overflow-hidden border border-line transition-colors duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-gold/55",
        shape.aspect,
        shape.surface,
      )}
    >
      {/* Art layer */}
      {project.image ? (
        <img
          data-work-media
          src={project.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
        />
      ) : shape.feature ? (
        <>
          <div className="absolute inset-0 grid place-items-center">
            <span
              data-work-media
              aria-hidden="true"
              className="select-none font-display uppercase leading-none text-transparent [-webkit-text-stroke:1.25px_rgba(244,242,237,0.1)] text-[clamp(3rem,20cqi,15rem)] tracking-[0.02em] transition-[transform,-webkit-text-stroke-color] duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] group-hover:[-webkit-text-stroke-color:rgba(198,161,91,0.4)]"
            >
              Tripple
            </span>
          </div>
          <span
            aria-hidden="true"
            className="absolute left-7 right-7 top-1/2 h-px origin-left scale-x-100 bg-gold/25 md:left-9 md:right-9"
          />
        </>
      ) : (
        <div className={cn("absolute inset-0 flex p-7 md:p-9", shape.numPlace)}>
          <span
            data-work-media
            aria-hidden="true"
            className={cn(
              "select-none font-display leading-[0.8] text-transparent [-webkit-text-stroke:1.25px_rgba(244,242,237,0.13)] transition-[transform,-webkit-text-stroke-color] duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] group-hover:[-webkit-text-stroke-color:rgba(198,161,91,0.5)]",
              shape.numSize,
            )}
          >
            {project.index}
          </span>
        </div>
      )}

      {/* Overlay meta */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-7">
        <div className="flex items-start justify-between gap-4">
          <span className="eyebrow whitespace-nowrap text-mute">
            {shape.feature ? `Featured — ${project.category}` : project.category}
          </span>
          <ArrowUpRight
            className="size-5 -translate-x-1 text-gold opacity-0 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:opacity-100"
            strokeWidth={1.75}
          />
        </div>

        <div>
          <div className="inline-block">
            <h3 className="t-h3 text-bone transition-transform duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
              {project.title}
            </h3>
            <span className="mt-2 block h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
          </div>
          <p className="mt-3 max-w-sm t-body text-mute">
            {project.description}
          </p>
          <div className="mt-4 flex items-center gap-3">
            <span className="eyebrow text-gold">In preparation</span>
            <span className="num text-[0.72rem] text-faint">{project.year}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <article
      data-work-card
      data-cursor="view"
      aria-label={`${project.title} — ${project.category} (in preparation)`}
      className={cn("group block", shape.col, shape.extra)}
    >
      {media}
    </article>
  );
}
