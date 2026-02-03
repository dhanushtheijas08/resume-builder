interface SkillsSectionProps {
  groupedSkills: Array<{ label: string; values: string[] }>;
}

export const SkillsSection = ({ groupedSkills }: SkillsSectionProps) => {
  if (groupedSkills.length === 0) return null;

  return (
    <section className="mb-3.5">
      <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">
        Skills
      </h2>
      <div className="text-sm grid grid-cols-2 gap-y-2">
        {groupedSkills.map((skill, index) => (
          <div key={`${skill.label}-${index}`}>
            <span className="font-medium">{skill.label}:</span>{" "}
            {skill.values.join(", ")}
          </div>
        ))}
      </div>
    </section>
  );
};
