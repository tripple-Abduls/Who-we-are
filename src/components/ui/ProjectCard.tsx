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
}

interface ProjectCardProps {
  project: Project;
  shape: CardShape;
}

/**
 * Art-directed placeholder (not a skeleton): an outlined folio numeral over a
 * tonal surface, framed by category and status, titled below. When a real
 * `href` is provided the whole card becomes a link with a VIEW cursor and a
 * revealing arrow; otherwise it stays an honest, non-clickable slot.
 */
export function ProjectCard({ project, shape }: ProjectCardProps) {
  const linked = Boolean(project.href);

  const media = (
    <div
      className={cn(
        "@container relative overflow-hidden border border-line transition-colors duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-gold/55",
        shape.aspect,
        shape.surface,
      )}
    >
      {/* Outlined folio numeral — placement and scale art-directed per card */}
      {project.image ? (
        <img
          data-work-media
          src={project.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
        />
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
            {project.category}
          </span>
          {linked ? (
            <ArrowUpRight
              className="size-5 -translate-x-1 text-gold opacity-0 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:opacity-100"
              strokeWidth={1.75}
            />
          ) : (
            <span
              aria-hidden="true"
              className="mt-1 size-1.5 shrink-0 rounded-full bg-gold"
            />
          )}
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
            {!linked && (
              <span className="eyebrow text-gold">In preparation</span>
            )}
            <span className="num text-[0.72rem] text-faint">
              {project.year}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  if (linked) {
    return (
      <a
        data-work-card
        href={project.href}
        data-cursor="view"
        aria-label={`${project.title} — ${project.category}`}
        className={cn("group block", shape.col, shape.extra)}
      >
        {media}
      </a>
    );
  }

  return (
    <article
      data-work-card
      className={cn("group block", shape.col, shape.extra)}
    >
      {media}
    </article>
  );
}
