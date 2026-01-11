# Single-Page Sections Feature - Use Cases

## Use Case 1: Navigate to Section via Dock Button

**Actor**: User  
**Precondition**: User is on the home page  
**Main Flow**:
1. User clicks a dock button (e.g., "Portfolio")
2. Page smoothly scrolls to the Portfolio section
3. Portfolio section aligns to the top of the viewport
4. User can see the Portfolio section content

**Postcondition**: Portfolio section is visible at the top of the viewport

---

## Use Case 2: Scroll Through Short Section

**Actor**: User  
**Precondition**: User navigates to a section with minimal content (< 100vh)  
**Main Flow**:
1. Section displays with minimum height of 100vh
2. Content is centered or appropriately positioned within the section
3. User can scroll down to see the next section

**Postcondition**: Section maintains 100vh height, next section is accessible

---

## Use Case 3: Scroll Through Long Section

**Actor**: User  
**Precondition**: User navigates to a section with content > 100vh (e.g., Blog with many posts)  
**Main Flow**:
1. Section displays, aligned to top of viewport
2. User scrolls down within the section
3. Section content scrolls while section remains at top
4. User reaches the end of section content
5. User continues scrolling
6. Page smoothly transitions to the next section

**Postcondition**: Next section is now at the top of the viewport

---

## Use Case 4: Manual Scroll Between Sections

**Actor**: User  
**Precondition**: User is viewing a section  
**Main Flow**:
1. User manually scrolls down (mouse wheel, trackpad, touch)
2. System detects scroll position
3. If scrolling within section, content scrolls normally
4. If scroll reaches section end, automatically snap to next section
5. Next section aligns to top of viewport

**Postcondition**: User is viewing the next section

---

## Use Case 5: Navigate Back to Previous Section

**Actor**: User  
**Precondition**: User is viewing a section (e.g., Contact)  
**Main Flow**:
1. User clicks a dock button for a previous section (e.g., "About")
2. Page smoothly scrolls up to the About section
3. About section aligns to the top of the viewport

**Postcondition**: About section is visible at the top of the viewport

---

## Use Case 6: Mobile Touch Scrolling

**Actor**: Mobile User  
**Precondition**: User is on mobile device viewing a section  
**Main Flow**:
1. User swipes up/down on touchscreen
2. Section scrolls smoothly
3. If section is long, user scrolls within section
4. When reaching section end, next section appears
5. Sections snap appropriately on touch release

**Postcondition**: User can navigate sections via touch gestures

---

## Use Case 7: Keyboard Navigation

**Actor**: User  
**Precondition**: User is viewing a section  
**Main Flow**:
1. User presses arrow keys or Page Down
2. Page scrolls to next section
3. Section aligns to top of viewport
4. User can navigate all sections via keyboard

**Postcondition**: User navigates sections using keyboard

---

## Use Case 8: Browser Back Button

**Actor**: User  
**Precondition**: User has navigated through multiple sections  
**Main Flow**:
1. User clicks browser back button
2. Page scrolls to previous section
3. Previous section aligns to top of viewport
4. Browser history reflects section navigation

**Postcondition**: User is viewing the previous section

---

## Use Case 9: Direct Section Link (Hash URL)

**Actor**: User  
**Precondition**: User has a direct link to a section (e.g., `/#portfolio`)  
**Main Flow**:
1. User opens link or refreshes page
2. Page loads and scrolls to the specified section
3. Section aligns to top of viewport

**Postcondition**: Target section is visible at the top of the viewport

---

## Use Case 10: Resize Viewport

**Actor**: User  
**Precondition**: User is viewing a section  
**Main Flow**:
1. User resizes browser window
2. System recalculates section positions
3. Current section remains aligned to top
4. Section heights adjust appropriately

**Postcondition**: Layout adapts to new viewport size, current section remains visible

