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
      {/* Outlined folio numeral */}
      <div className="absolute inset-0 grid place-items-center">
        {project.image ? (
          <img
            data-work-media
            src={project.image}
            alt=""
            className="h-full w-full object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
          />
        ) : (
          <span
            data-work-media
            aria-hidden="true"
            className="select-none font-display leading-none text-transparent [-webkit-text-stroke:1.25px_rgba(244,242,237,0.14)] text-[clamp(3.5rem,26cqi,12rem)] transition-[transform,-webkit-text-stroke-color] duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] group-hover:[-webkit-text-stroke-color:rgba(198,161,91,0.55)]"
          >
            {project.index}
          </span>
        )}
      </div>

      {/* Overlay meta */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-7">
        <div className="flex items-center justify-between gap-4">
          <span className="eyebrow text-mute">{project.category}</span>
          {linked ? (
            <ArrowUpRight
              className="size-5 -translate-x-1 text-gold opacity-0 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:opacity-100"
              strokeWidth={1.75}
            />
          ) : (
            <span className="flex items-center gap-2 eyebrow text-gold">
              <span className="size-1.5 rounded-full bg-gold" />
              In preparation
            </span>
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
          <p className="num mt-1 text-[0.75rem] text-faint">
            {project.year}
          </p>
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
