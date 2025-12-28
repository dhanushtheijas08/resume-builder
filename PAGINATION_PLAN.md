# Pagination Refactoring Plan

## Current Issues

1. **Section-level splitting only**: Currently splits by entire `<section>` elements, not individual items
2. **Two-column assumption**: Assumes sidebar always exists on first page
3. **No element-level pagination**: Cannot split work experiences, educations, projects, etc. across pages

## Goals

1. ✅ Support **one-column layouts** (no sidebar)
2. ✅ Split by **individual elements** (work exp items, education items, etc.) instead of entire sections
3. ✅ Handle **section headers** properly when items span multiple pages
4. ✅ Maintain proper **spacing and structure** across pages

## Implementation Plan

### Step 1: Detect Layout Type

- **Check if sidebar exists**: Query `containerRef` for left column element
- **Determine layout**:
  - Two-column: Sidebar has content (profile or skills)
  - One-column: No sidebar or sidebar is empty
- **Store layout state**: Use a boolean `hasLeftColumn` or `isTwoColumnLayout`

### Step 2: Extract Individual Elements

- **Current structure**:

  ```
  <section>
    <h2>Section Title</h2>
    <div class="space-y-5">
      <div class="test">Item 1</div>
      <div class="test">Item 2</div>
      ...
    </div>
  </section>
  ```

- **New approach**: Extract all elements with class `"test"` from each section
- **For each section**:
  1. Get section header (`<h2>`)
  2. Get all item elements (`.test` or direct children that are items)
  3. Store section metadata (header, items array)

### Step 3: Create Element-Level Pagination Logic

**Data Structure**:

```typescript
interface SectionData {
  header: HTMLElement | null;
  items: HTMLElement[];
  sectionElement: HTMLElement; // Original section for reference
}

interface PageElement {
  type: "section-header" | "item";
  element: HTMLElement;
  sectionIndex?: number; // Track which section this belongs to
}
```

**Pagination Algorithm**:

1. **Extract all sections** and their items
2. **Flatten into a list** of pageable elements (headers + items)
3. **Track current section** to know when to add headers
4. **For each element**:
   - Check if adding it exceeds page height
   - If yes, start new page
   - If starting new section on new page, add section header
   - Add element to current page
5. **Handle edge cases**:
   - Section header alone exceeds page height (very rare, but handle it)
   - First item of section on new page needs header
   - Last page has remaining items

### Step 4: Reconstruct Sections for Rendering

**For each page**:

- Group elements by section
- Reconstruct `<section>` elements with:
  - Section header (if first item of section on this page)
  - Items belonging to this section on this page
  - Proper spacing (`space-y-5` for items, `space-y-8` for sections)

**Example**:

```typescript
// Page 1: Work Exp items 1-2, Education item 1
<section>
  <h2>Work Experience</h2>
  <div class="space-y-5">
    <div class="test">Item 1</div>
    <div class="test">Item 2</div>
  </div>
</section>
<section>
  <h2>Education</h2>
  <div class="space-y-5">
    <div class="test">Item 1</div>
  </div>
</section>

// Page 2: Work Exp item 3, Education items 2-3
<section>
  <h2>Work Experience</h2>
  <div class="space-y-5">
    <div class="test">Item 3</div>
  </div>
</section>
<section>
  <h2>Education</h2>
  <div class="space-y-5">
    <div class="test">Item 2</div>
    <div class="test">Item 3</div>
  </div>
</section>
```

### Step 5: Update PageContent Interface

**Current**:

```typescript
interface PageContent {
  leftColumn?: React.ReactNode;
  rightColumn: React.ReactNode[];
}
```

**Updated** (or keep same but change how we populate it):

- `leftColumn`: Only set if `hasLeftColumn && isFirstPage`
- `rightColumn`: Array of reconstructed section elements

### Step 6: Handle Special Cases

1. **Awards section**: No items, just content - treat as single element
2. **Projects without wrapper div**: Some sections might have items directly (check structure)
3. **Empty sections**: Skip them
4. **Very tall items**: If single item exceeds page height, still add it (better than breaking)

### Step 7: Update Rendering Logic

**Current rendering** (line ~920):

```tsx
{
  page.rightColumn.map((section, idx) => (
    <div key={idx} dangerouslySetInnerHTML={{ __html: section.outerHTML }} />
  ));
}
```

**Keep same** - reconstructed sections will have proper HTML structure

## Code Structure

### New Helper Functions

1. `detectLayout()`: Returns `{ hasLeftColumn: boolean }`
2. `extractSectionData(section: HTMLElement)`: Returns `SectionData`
3. `reconstructSection(header, items)`: Creates section HTML element
4. `paginateElements(sections, availableHeight)`: Main pagination logic

### Modified Functions

1. `paginateContent()`: Complete rewrite using element-level logic
2. `renderRightColumn()`: No changes needed (used for measurement)
3. Page rendering: No changes needed (already handles array of sections)

## Testing Considerations

1. **Test with 2-column layout**: Sidebar + content
2. **Test with 1-column layout**: No sidebar
3. **Test with many items**: 10+ work experiences
4. **Test with tall items**: Long descriptions
5. **Test with mixed sections**: Some with many items, some with few
6. **Test edge cases**: Single item per section, empty sections

## Implementation Order

1. ✅ Create helper functions for layout detection
2. ✅ Create helper function to extract section data
3. ✅ Rewrite `paginateContent()` with element-level logic
4. ✅ Test with existing two-column layout
5. ✅ Test with one-column layout (modify templateMeta or add prop)
6. ✅ Handle edge cases and special sections
7. ✅ Clean up and optimize

## Key Challenges

1. **Measuring heights**: Need accurate measurements before pagination
2. **Section reconstruction**: Properly wrap items back into sections
3. **Header placement**: When to show section headers on new pages
4. **Spacing**: Maintain `space-y-5` for items, `space-y-8` for sections




