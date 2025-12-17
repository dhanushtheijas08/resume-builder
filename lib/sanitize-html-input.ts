import DOMPurify, { Config } from "dompurify";
import sanitizeHtml from "sanitize-html";

const ALLOWED_TAGS = [
  "p",
  "strong",
  "em",
  "u",
  "h1",
  "h2",
  "h3",
  "ul",
  "ol",
  "li",
  "a",
];
const ALLOWED_ATTR = ["href", "target", "rel", "class"];
const ALLOWED_URI_REGEXP = /^(https:\/\/|mailto:|tel:)/i;
const ALLOWED_SCHEMES = ["https", "mailto", "tel"];
const CLIENT_CONFIG: Config = {
  ALLOWED_TAGS,
  ALLOWED_ATTR,
  ALLOW_DATA_ATTR: false,
  ALLOWED_URI_REGEXP,
  KEEP_CONTENT: true,
  RETURN_DOM: false,
  RETURN_DOM_FRAGMENT: false,
  RETURN_TRUSTED_TYPE: false,

  ADD_ATTR: ["target", "rel"],
};

const SERVER_CONFIG: sanitizeHtml.IOptions = {
  allowedTags: ALLOWED_TAGS,
  allowedAttributes: {
    a: ALLOWED_ATTR.slice(0, 3),
    ul: ["class"],
    ol: ["class"],
    li: ["class"],
  },
  allowedSchemes: ALLOWED_SCHEMES,
  allowedSchemesByTag: {
    a: ALLOWED_SCHEMES,
  },
  transformTags: {
    a: (_, attribs) => {
      return {
        tagName: "a",
        attribs: {
          ...attribs,
          rel: "noopener noreferrer nofollow",
          target: "_blank",
        },
      };
    },
  },
};
export const sanitizeClientHtml = (html: string) => {
  const sanitized = DOMPurify.sanitize(html, CLIENT_CONFIG);
  return sanitized;
};

export const sanitizeServerHtml = (html: string) => {
  const sanitized = sanitizeHtml(html, SERVER_CONFIG);
  return sanitized;
};
