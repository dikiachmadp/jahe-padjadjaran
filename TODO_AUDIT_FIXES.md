# Task 1: UX Audit and Fixes - Plan

## Issues Identified and Fixes Required

### 1. Page Refresh Position
**Problem**: No code to reset scroll to top on page refresh
**Fix**: Add `window.scrollTo(0, 0)` in App.jsx useEffect

### 2. No Horizontal Scrolling
**Problems**:
- Mobile menu width `w-80` (320px) could overflow on small screens
- Some fixed widths might cause overflow
- Missing `overflow-x-hidden` on root elements
**Fixes**:
- Add `overflow-x-hidden` to main wrapper
- Change mobile menu width to responsive (max-w-[85vw] is good, but needs better handling)
- Audit all fixed pixel widths

### 3. Scroll & Animation Smoothness
**Problems**:
- Continuous animations (pulsing dots) could cause layout thrashing
- Missing `will-change` hints for GPU acceleration
- Some animations without proper transform3d for GPU
**Fixes**:
- Replace `animate` on continuous properties with CSS keyframes
- Add `will-change` to animated elements
- Add `transform-gpu` for GPU-accelerated transforms

### 4. Mobile Card Size & Spacing
**Problems**:
- Mobile menu needs better responsive sizing
- Some cards need better padding for small screens
- Need consistent spacing at mobile breakpoints
**Fixes**:
- Adjust mobile menu max-width
- Add responsive padding
- Ensure consistent spacing between components

### 5. Text Overflow
**Problems**:
- Long text content in cards might not wrap properly
- Need proper letter-spacing consistency
**Fixes**:
- Add `break-words` and `break-all` where needed
- Ensure consistent letter-spacing

## Files to Modify

1. **src/App.jsx**
   - Add scroll to top on mount
   - Add overflow-x-hidden wrapper

2. **src/index.css**
   - Add CSS animations for continuous animations (GPU optimized)
   - Add text overflow utilities

3. **src/components/Header.jsx**
   - Add will-change to animated elements
   - Fix mobile menu width handling
   - Optimize scroll listener

4. **src/components/Hero.jsx**
   - Add GPU acceleration hints
   - Replace Framer Motion continuous animation with CSS

5. **src/components/Product.jsx**
   - Optimize card animations
   - Add responsive spacing

6. **src/components/Pricing.jsx**
   - Add responsive card sizing
   - Optimize animations

7. **src/components/Partners.jsx**
   - Add responsive spacing
   - Optimize animations

8. **src/components/Contact.jsx**
   - Add responsive sizing
   - Fix sticky positioning issues

## Implementation Order

1. Fix App.jsx (scroll to top + overflow-x-hidden)
2. Fix index.css (add GPU-optimized CSS animations)
3. Fix Header.jsx (mobile menu, will-change)
4. Fix Hero.jsx (continuous animations)
5. Fix Product.jsx (spacing)
6. Fix Pricing.jsx (spacing)
7. Fix Partners.jsx (spacing)
8. Fix Contact.jsx (responsive sizing)
9. Test all fixes

## Success Criteria

- [ ] Page always scrolls to top on refresh
- [ ] No horizontal scrollbar visible
- [ ] All cards fit within mobile viewport
- [ ] Animations run at 60fps
- [ ] Consistent spacing at all breakpoints
- [ ] No text overflow issues

