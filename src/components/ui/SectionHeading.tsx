import { Reveal } from "./Reveal";

export function SectionHeading({ eyebrow, title, description, center = false }: {
  eyebrow?: string; title: string; description?: string | null; center?: boolean;
}) {
  return (
    <Reveal className={center ? "mx-auto mb-12 max-w-2xl text-center" : "mb-12 max-w-2xl"}>
      {eyebrow && <p className={`eyebrow ${center ? "justify-center" : ""}`}>{eyebrow}</p>}
      <h2 className="mt-3 text-3xl font-bold leading-tight text-white md:text-5xl">{title}</h2>
      {description && <p className="mt-4 leading-8 text-rose/70 md:text-lg">{description}</p>}
    </Reveal>
  );
}
