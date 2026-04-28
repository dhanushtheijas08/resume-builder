interface SkillsSectionProps {
  groupedSkills: Array<{ label: string; values: string[] }>;
}

export const SkillsSection = ({ groupedSkills }: SkillsSectionProps) => {
  if (groupedSkills.length === 0) return null;

  return (
    <section className="mb-[8px]">
      <h2 className="mb-[3px] border-b border-black pb-0 font-serif text-[14pt] font-normal uppercase leading-none tracking-[0.02em]">
        Skills
      </h2>
      <div className="grid grid-cols-2 gap-x-6 gap-y-px text-[11pt] leading-[1.16] ml-3.5">
        {groupedSkills.map((skill, index) => (
          <div key={`${skill.label}-${index}`}>
            <span className="font-bold">{skill.label}:</span>{" "}
            {skill.values.join(", ")}
          </div>
        ))}
      </div>
    </section>
  );
};
