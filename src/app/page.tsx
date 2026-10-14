import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { FeaturedResearch } from "@/components/FeaturedResearch";
import { Hero } from "@/components/Hero";
import { Methods } from "@/components/Methods";
import { MetricsStrip } from "@/components/MetricsStrip";
import { Publications } from "@/components/Publications";
import { ResearchAreas } from "@/components/ResearchAreas";
import { Section } from "@/components/Section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MetricsStrip />
      <About />
      <Section
        id="research"
        eyebrow="Research"
        title="Better medicines, cleaner energy"
        intro="Computational chemistry (density functional theory, molecular docking, molecular dynamics, and free-energy and ADMET analysis) applied to drug design and to materials for solar cells."
        tone="alt"
      >
        <ResearchAreas />
        <FeaturedResearch />
      </Section>
      <Section
        id="publications"
        eyebrow="Publications"
        title="All publications"
        intro="Newest first. Filter by theme, open the paper via its DOI, or copy an APA citation."
      >
        <Publications />
      </Section>
      <Section
        id="methods"
        eyebrow="Methods & tools"
        title="The toolkit"
        intro="Techniques used in his published work, with the number of papers that use each."
        tone="alt"
      >
        <Methods />
      </Section>
      <Section id="education" eyebrow="Education" title="Academic background">
        <Education />
      </Section>
      <Section id="contact" eyebrow="Contact" title="Get in touch" intro="For collaborations, questions about the research, or anything else." tone="alt">
        <Contact />
      </Section>
    </>
  );
}
