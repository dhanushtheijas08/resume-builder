import { GitHubIcon, LinkedinIcon } from "@/components/icons";
import type { Profile } from "@prisma/client";
import { Globe, Mail, MapPin, Phone } from "lucide-react";

interface HeaderSectionProps {
  profile: Profile | null;
}

export const HeaderSection = ({ profile }: HeaderSectionProps) => {
  return (
    <section className="mb-3.5">
      <h1 className="text-3xl font-bold tracking-tight">
        {profile?.name || "Your Name"}
      </h1>
      <p className="text-sm text-gray-600 mt-1">
        {profile?.designation || "Your Title"}
      </p>

      <div className="flex flex-wrap gap-4 text-sm text-gray-700 mt-3 items-center">
        {profile?.portfolio && (
          <a
            href={
              profile.portfolio.startsWith("http")
                ? profile.portfolio
                : `https://${profile.portfolio}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-gray-900 transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Portfolio</span>
          </a>
        )}
        {profile?.phoneNumber && (
          <a
            href={`tel:${profile.phoneNumber.replace(/\s+/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-gray-900 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{profile.phoneNumber}</span>
          </a>
        )}
        {profile?.email && (
          <a
            href={`mailto:${profile.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-gray-900 transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
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
            className="flex items-center gap-1.5 hover:text-gray-900 transition-colors"
          >
            <GitHubIcon className="w-3.5 h-3.5" />
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
            className="flex items-center gap-1.5 hover:text-gray-900 transition-colors"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
        )}
        {profile?.location && (
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>{profile.location}</span>
          </div>
        )}
      </div>
    </section>
  );
};
