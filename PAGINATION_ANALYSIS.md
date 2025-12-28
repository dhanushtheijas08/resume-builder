# Pagination Logic Analysis

## Current Code Structure

```typescript
const pageSplit = () => {
  // ... constants ...
  const sections = Array.from(
    (resumeRef.current as HTMLElement).querySelectorAll("section")
  );

  for (const section of sections) {
    const sectionHeight = getFullHeight(section);

    // Try to fit entire section
    if (usedHeight + sectionHeight <= USABLE_HEIGHT) {
      currentPage.push(section);
      usedHeight += sectionHeight;
      continue;
    }

    // Split by children
    for (const child of Array.from(section.children) as HTMLElement[]) {
      const h = getFullHeight(child);
      if (usedHeight + h > USABLE_HEIGHT) {
        pages.push([...currentPage]);
        currentPage = [];
        usedHeight = 0;
      }
      currentPage.push(child);
      usedHeight += h;
    }
  }
};
```

## Issues Found

### ❌ Issue 1: Section Structure Broken

**Problem**: When splitting, you push `section.children` directly, which breaks the `<section>` wrapper.

**Example**:
```html
<!-- Original -->
<section>
  <h2>Experience</h2>
  <div>Item 1</div>
  <div>Item 2</div>
</section>

<!-- After split (WRONG) -->
<h2>Experience</h2>  <!-- Lost section wrapper -->
<div>Item 1</div>
```

**Impact**: Lost semantic structure, styling issues, accessibility problems.

---

### ❌ Issue 2: Section Header Handling

**Problem**: The `<h2>` header is treated as just another child. When splitting:
- Header might appear alone on a page
- Header might be separated from its content
- No header repetition when section continues on new page

**Example**:
```html
<!-- Page 1 -->
<h2>Experience</h2>
<div>Item 1</div>

<!-- Page 2 -->
<div>Item 2</div>  <!-- Missing header! -->
```

**Impact**: Poor UX, unclear section boundaries.

---

### ❌ Issue 3: Incorrect Child Selection

**Problem**: `section.children` includes ALL direct children:
- `<h2>` header
- Wrapper `<div>` (if any)
- Individual items

**Your structure** (from code):
```html
<section>
  <h2>Experience</h2>           <!-- Child 1: Header -->
  <div className="mb-4">        <!-- Child 2: Item wrapper -->
    <h3>Role</h3>
    <ul>...</ul>
  </div>
  <div className="mb-4">        <!-- Child 3: Item wrapper -->
    ...
  </div>
</section>
```

**Current logic**: Treats header and items equally, which is wrong.

---

### ❌ Issue 4: Missing Item-Level Splitting

**Problem**: You're splitting by `section.children`, but you need to split by **individual items** (work experiences, projects, etc.).

**What you need**:
- Extract header separately
- Extract individual items (the `<div className="mb-4">` elements)
- Split items across pages
- Reconstruct sections with header + items

---

### ❌ Issue 5: Height Measurement Timing

**Problem**: `useEffect` might run before DOM is fully rendered and measured.

**Current**:
```typescript
useEffect(() => {
  if (resumeRef.current) {
    pageSplit();
  }
}, [resumeRef, resumeData]);
```

**Issue**: `offsetHeight` might be 0 if elements aren't fully rendered yet.

**Solution**: Use `setTimeout` or `requestAnimationFrame` to ensure DOM is ready.

---

### ❌ Issue 6: No Layout Detection

**Problem**: Code assumes one-column layout. Doesn't account for:
- Sidebar on first page (if exists)
- Different available heights per page

---

### ❌ Issue 7: Missing Spacing Between Elements

**Problem**: When reconstructing pages, you lose the spacing (`mb-6`, `space-y-5`) that was in the original structure.

---

## What Should Happen

### Correct Flow:

1. **Extract section data**:
   ```typescript
   {
     header: HTMLElement,  // <h2>
     items: HTMLElement[]   // Array of item divs
   }
   ```

2. **Split items across pages**:
   - Try to fit header + first item
   - If doesn't fit, start new page
   - Add header on new page if section continues
   - Add items one by one

3. **Reconstruct sections**:
   ```html
   <!-- Page 1 -->
   <section>
     <h2>Experience</h2>
     <div>Item 1</div>
     <div>Item 2</div>
   </section>

   <!-- Page 2 -->
   <section>
     <h2>Experience</h2>  <!-- Repeat header -->
     <div>Item 3</div>
     <div>Item 4</div>
   </section>
   ```

---

## Corrected Implementation Plan

### Step 1: Extract Section Data

```typescript
interface SectionData {
  header: HTMLElement | null;
  items: HTMLElement[];
  originalSection: HTMLElement;
}

const extractSectionData = (section: HTMLElement): SectionData => {
  const header = section.querySelector('h2') as HTMLElement | null;
  
  // Get all item divs (skip header)
  const items = Array.from(section.children).filter(
    child => child.tagName !== 'H2'
  ) as HTMLElement[];
  
  return { header, items, originalSection: section };
};
```

### Step 2: Paginate Items

```typescript
const pages: SectionData[][] = [];
let currentPageItems: Array<{ header: HTMLElement | null, item: HTMLElement }> = [];
let usedHeight = 0;
let currentSectionHeader: HTMLElement | null = null;

for (const section of sections) {
  const { header, items } = extractSectionData(section);
  
  // Try to add header + first item
  const headerHeight = header ? getFullHeight(header) : 0;
  const firstItemHeight = items[0] ? getFullHeight(items[0]) : 0;
  
  // If section doesn't fit, start new page
  if (usedHeight + headerHeight + firstItemHeight > USABLE_HEIGHT && currentPageItems.length > 0) {
    pages.push([...currentPageItems]);
    currentPageItems = [];
    usedHeight = 0;
    currentSectionHeader = null;
  }
  
  // Add header if starting new section
  if (!currentSectionHeader && header) {
    currentPageItems.push({ header, item: null });
    usedHeight += headerHeight;
    currentSectionHeader = header;
  }
  
  // Add items
  for (const item of items) {
    const itemHeight = getFullHeight(item);
    
    if (usedHeight + itemHeight > USABLE_HEIGHT) {
      pages.push([...currentPageItems]);
      currentPageItems = [];
      usedHeight = 0;
      
      // Repeat header on new page
      if (header) {
        currentPageItems.push({ header: header.cloneNode(true), item: null });
        usedHeight += headerHeight;
      }
    }
    
    currentPageItems.push({ header: null, item });
    usedHeight += itemHeight;
  }
}
```

### Step 3: Reconstruct Sections

```typescript
const reconstructSection = (pageItems: Array<{header: HTMLElement | null, item: HTMLElement | null}>): HTMLElement => {
  const section = document.createElement('section');
  section.className = 'mb-6';
  
  let currentHeader: HTMLElement | null = null;
  const items: HTMLElement[] = [];
  
  for (const { header, item } of pageItems) {
    if (header && !currentHeader) {
      currentHeader = header.cloneNode(true) as HTMLElement;
    }
    if (item) {
      items.push(item.cloneNode(true) as HTMLElement);
    }
  }
  
  if (currentHeader) section.appendChild(currentHeader);
  items.forEach(item => section.appendChild(item));
  
  return section;
};
```

---

## Summary

### Current Code Issues:
1. ❌ Breaks section structure
2. ❌ Doesn't handle headers properly
3. ❌ Splits by wrong elements (children vs items)
4. ❌ No item-level splitting
5. ❌ Timing issues with measurements
6. ❌ No layout detection
7. ❌ Loses spacing

### What Needs to Change:
1. ✅ Extract headers separately
2. ✅ Extract individual items (not all children)
3. ✅ Split items across pages
4. ✅ Reconstruct sections with proper structure
5. ✅ Handle header repetition
6. ✅ Ensure DOM is ready before measuring
7. ✅ Account for layout (one/two column)

---

## Recommendation

**The current logic will NOT work correctly.** You need to:

1. **Refactor to extract section data properly**
2. **Split by individual items, not section children**
3. **Reconstruct sections with headers and items**
4. **Handle header repetition when sections span pages**

Would you like me to implement the corrected version?



