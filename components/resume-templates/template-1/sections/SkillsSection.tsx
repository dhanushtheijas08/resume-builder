interface SkillsSectionProps {
  groupedSkills: Array<{ label: string; values: string[] }>;
}

export const SkillsSection = ({ groupedSkills }: SkillsSectionProps) => {
  if (groupedSkills.length === 0) return null;

  return (
    <section className="mb-[8px]">
      <h2 className="mb-[3px] font-normal border-b border-bottom border-black pb-[1.5px] font-serif text-[14pt] uppercase leading-none tracking-[0.02em]">
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
