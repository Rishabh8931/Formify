import { Container } from "@/app/components/layout/Container";

const useCases = [
  {
    number: "01",
    title: "Collect feedback",
    description:
      "Create a focused form for gathering feedback from the people you want to hear from.",
  },
  {
    number: "02",
    title: "Gather information",
    description:
      "Collect the information you need through structured form fields and responses.",
  },
  {
    number: "03",
    title: "Create your own forms",
    description:
      "Build forms around your own questions, fields, and requirements.",
  },
];

export function UseCases() {
  return (
    <section id="solutions" className="bg-background py-24 sm:py-32">
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary">
            Use cases
          </p>

          <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-foreground sm:text-5xl">
            One builder.
            <br />
            <span className="font-script font-normal text-primary">
              Many ways to use it.
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-base leading-7 text-text-secondary sm:text-lg">
            Build forms around the information you need to collect, whether you
            are asking a few questions or creating a more structured experience.
          </p>
        </div>

        <div className="mt-14 grid border-t border-border sm:grid-cols-3">
          {useCases.map((item) => (
            <div
              key={item.number}
              className="border-b border-border py-8 sm:border-b-0 sm:border-r sm:px-8 sm:first:pl-0 sm:last:border-r-0"
            >
              <span className="text-sm font-medium text-primary">
                {item.number}
              </span>

              <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                {item.title}
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-text-secondary">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
