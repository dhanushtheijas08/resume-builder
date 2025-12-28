# Security Analysis: dangerouslySetInnerHTML vs iframe

## Current Security Posture

### ✅ What's Already Protected

1. **Server-side sanitization**: You're using `sanitizeServerHtml()` before storing data

   - Uses `sanitize-html` library
   - Allows only safe tags: `p`, `strong`, `em`, `u`, `h1-h3`, `ul`, `ol`, `li`, `a`
   - Restricts attributes and URL schemes
   - Adds `rel="noopener noreferrer nofollow"` to links

2. **Input validation**: Using Zod schemas for validation

### ⚠️ Current Security Concerns

1. **Client-side rendering** (Line 924):

   ```tsx
   dangerouslySetInnerHTML={{ __html: section.outerHTML }}
   ```

   - User content is rendered without **client-side sanitization**
   - If database is compromised or sanitization bypassed, XSS is possible
   - No defense-in-depth approach

2. **Multiple injection points**:
   - `resume.profile.bio` (line 503)
   - `experience.description` (line 631)
   - `education.description` (line 691)
   - `project.description` (line 759)
   - `certification.description` (line 818)
   - `resume.awards` (line 835)
   - `publication.summary` (line 872)
   - `section.outerHTML` (line 924) - **Most critical** (includes all above)

## Security Comparison

### Option 1: dangerouslySetInnerHTML with Client-Side Sanitization (RECOMMENDED)

**Pros:**

- ✅ Better performance (no iframe overhead)
- ✅ Easier styling and layout control
- ✅ Better for pagination (can measure heights)
- ✅ Simpler implementation
- ✅ Works well with React state management

**Cons:**

- ⚠️ Requires proper sanitization
- ⚠️ Still vulnerable if sanitization fails

**Implementation:**

```tsx
import { sanitizeClientHtml } from "@/lib/sanitize-html-input";

// For individual content fields
<div
  dangerouslySetInnerHTML={{
    __html: sanitizeClientHtml(resume.profile.bio),
  }}
/>;

// For paginated sections
{
  page.rightColumn.map((section, idx) => {
    const sanitizedHTML = sanitizeClientHtml(section.outerHTML);
    return (
      <div key={idx} dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
    );
  });
}
```

**Security Level:** ⭐⭐⭐⭐ (High, with proper sanitization)

---

### Option 2: iframe with Sandbox (More Secure, but Complex)

**Pros:**

- ✅ Complete isolation from parent page
- ✅ Prevents XSS attacks even if sanitization fails
- ✅ Can use Content Security Policy (CSP)
- ✅ Better for untrusted content

**Cons:**

- ❌ Performance overhead (separate document context)
- ❌ Complex styling (need to pass styles to iframe)
- ❌ Harder to measure heights for pagination
- ❌ Communication complexity (postMessage API)
- ❌ Printing issues (iframes don't print well)
- ❌ SEO concerns (content not directly accessible)

**Implementation:**

```tsx
// Create iframe with sandbox
<iframe
  sandbox="allow-same-origin allow-scripts"
  srcDoc={`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          /* Inline styles or link to stylesheet */
          body { font-family: sans-serif; }
        </style>
      </head>
      <body>
        ${sanitizeClientHtml(section.outerHTML)}
      </body>
    </html>
  `}
  style={{ width: "100%", border: "none", minHeight: "500px" }}
/>
```

**Security Level:** ⭐⭐⭐⭐⭐ (Highest, but overkill for this use case)

---

## Recommendation: Hybrid Approach

### Best Solution: Client-Side Sanitization + Trusted Types (if supported)

1. **Apply client-side sanitization** to all user content
2. **Use Trusted Types API** (browser security feature) if available
3. **Keep server-side sanitization** as first line of defense
4. **Add Content Security Policy** headers

### Implementation Plan

#### Step 1: Update sanitize-html-input.ts

```typescript
// Add client-side sanitization for section HTML
export const sanitizeSectionHtml = (html: string) => {
  // Sanitize the HTML string
  const sanitized = DOMPurify.sanitize(html, {
    ...CLIENT_CONFIG,
    // Allow section structure but sanitize content
    ALLOWED_TAGS: [
      ...CLIENT_CONFIG.ALLOWED_TAGS,
      "section",
      "div",
      "h2",
      "h3",
      "span",
    ],
    ALLOWED_ATTR: [
      ...CLIENT_CONFIG.ALLOWED_ATTR,
      "class",
      "id",
      "style", // Be careful with style
    ],
  });
  return sanitized;
};
```

#### Step 2: Update resume-preview.tsx

```tsx
import {
  sanitizeClientHtml,
  sanitizeSectionHtml,
} from "@/lib/sanitize-html-input";

// For paginated sections
{
  page.rightColumn.map((section, idx) => {
    const sanitizedHTML = sanitizeSectionHtml(section.outerHTML);
    return (
      <div key={idx} dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
    );
  });
}

// For individual content fields (already sanitized on server, but double-check)
<div
  className="rich-text"
  dangerouslySetInnerHTML={{
    __html: sanitizeClientHtml(resume.profile.bio),
  }}
/>;
```

#### Step 3: Add Content Security Policy (Optional but Recommended)

In `next.config.js`:

```javascript
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
  },
];
```

## Security Best Practices

### 1. Defense in Depth

- ✅ Server-side sanitization (already done)
- ✅ Client-side sanitization (needs to be added)
- ✅ Input validation (already done with Zod)
- ✅ Content Security Policy (recommended)

### 2. Sanitization Strategy

**Server-side (Input):**

- Sanitize when **storing** data
- Use strict whitelist
- Remove all scripts, event handlers

**Client-side (Output):**

- Sanitize when **rendering** data
- Additional layer of protection
- Handle edge cases server might miss

### 3. What to Sanitize

**Safe (from your code):**

- Section structure (`<section>`, `<div>`)
- CSS classes
- Layout elements

**Unsafe (from user):**

- All text content
- HTML tags in descriptions
- Links in content
- Any user-provided HTML

## Final Recommendation

**Use `dangerouslySetInnerHTML` with client-side sanitization** because:

1. ✅ You already sanitize on server (good foundation)
2. ✅ Better performance for pagination
3. ✅ Easier to implement and maintain
4. ✅ Sufficient security with proper sanitization
5. ✅ iframe is overkill for trusted user content

**Don't use iframe** because:

- ❌ Makes pagination much harder (can't measure heights easily)
- ❌ Printing issues
- ❌ Performance overhead
- ❌ Complex styling
- ❌ Your use case doesn't require that level of isolation

## Implementation Priority

1. **HIGH**: Add client-side sanitization to `section.outerHTML` (line 924)
2. **MEDIUM**: Add client-side sanitization to all content fields
3. **LOW**: Add CSP headers
4. **OPTIONAL**: Implement Trusted Types API

## Code Changes Needed

1. Update `lib/sanitize-html-input.ts` - Add section sanitization function
2. Update `components/resume/resume-preview.tsx` - Apply sanitization before rendering
3. Test with malicious input to ensure sanitization works
4. Add security tests




