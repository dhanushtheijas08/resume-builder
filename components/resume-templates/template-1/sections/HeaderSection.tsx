import { GitHubIcon, LinkedinIcon } from "@/components/icons";
import type { Profile } from "@prisma/client";
import { Globe, Mail, MapPin, Phone } from "lucide-react";

interface HeaderSectionProps {
  profile: Profile | null;
}

export const HeaderSection = ({ profile }: HeaderSectionProps) => {
  return (
    <section className="mb-[10px] text-center font-serif">
      <h1 className="font-serif text-[26pt] font-semibold leading-none tracking-normal">
        {profile?.name || "Your Name"}
      </h1>
      <p className="mt-[2px] font-serif text-[10.5pt] italic leading-tight text-black">
        {profile?.designation || "Your Title"}
      </p>

      <div className="mt-[4px] flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-[10.5pt] leading-tight text-black">
        {profile?.portfolio && (
          <a
            href={
              profile.portfolio.startsWith("http")
                ? profile.portfolio
                : `https://${profile.portfolio}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-gray-900 transition-colors"
          >
            <Globe className="h-3 w-3" />
            <span>Portfolio</span>
          </a>
        )}
        {profile?.phoneNumber && (
          <a
            href={`tel:${profile.phoneNumber.replace(/\s+/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-gray-900 transition-colors"
          >
            <Phone className="h-3 w-3" />
            <span>{profile.phoneNumber}</span>
          </a>
        )}
        {profile?.email && (
          <a
            href={`mailto:${profile.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-gray-900 transition-colors"
          >
            <Mail className="h-3 w-3" />
            <span>{profile.email}</span>
          </a>
        )}
        {profile?.github && (
          <a
            href={
              profile.github.startsWith("http")
                ? profile.github
                : `https://${profile.github}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-gray-900 transition-colors"
          >
            <GitHubIcon className="h-3 w-3" />
            <span>GitHub</span>
          </a>
        )}
        {profile?.linkedin && (
          <a
            href={
              profile.linkedin.startsWith("http")
                ? profile.linkedin
                : `https://${profile.linkedin}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-gray-900 transition-colors"
          >
            <LinkedinIcon className="h-3 w-3" />
            <span>LinkedIn</span>
          </a>
        )}
        {profile?.location && (
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{profile.location}</span>
          </div>
        )}
      </div>
    </section>
  );
};
