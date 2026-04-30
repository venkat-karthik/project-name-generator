# Velfound Redesign - Visual Reference Guide

## Color Palette

### Primary Colors
```
Blue:     #3b82f6  RGB(59, 130, 246)
Green:    #7cff67  RGB(124, 255, 103)
Purple:   #B497CF  RGB(180, 151, 207)
```

### Neutral Colors
```
Dark:     #0a0a0a  RGB(10, 10, 10)     - Background
Surface:  #111     RGB(17, 17, 17)     - Cards
Border:   #1a1a1a  RGB(26, 26, 26)     - Subtle borders
Text:     #f0f0f0  RGB(240, 240, 240)  - Primary text
Muted:    #888     RGB(136, 136, 136)  - Secondary text
Gray:     #555     RGB(85, 85, 85)     - Tertiary text
```

### Semantic Colors
```
Success:  #4ade80  RGB(74, 222, 128)
Warning:  #f59e0b  RGB(245, 158, 11)
Error:    #ef4444  RGB(239, 68, 68)
Info:     #3b82f6  RGB(59, 130, 246)
```

---

## Typography Scale

### Headings
```
H1: 80px  (clamp(32px, 7vw, 80px))   - Hero title
H2: 44px  (clamp(24px, 5vw, 44px))   - Section title
H3: 18px  (clamp(14px, 3vw, 18px))   - Card title
H4: 16px  (clamp(14px, 3vw, 16px))   - Subheading
```

### Body Text
```
Large:    18px  (clamp(14px, 3vw, 18px))
Regular:  14px  (clamp(12px, 2vw, 14px))
Small:    12px  (clamp(10px, 2vw, 12px))
Tiny:     11px  (clamp(9px, 2vw, 11px))
```

### Font Weights
```
Regular:  400
Medium:   500
Semibold: 600
Bold:     700
```

### Line Heights
```
Tight:    1.05  (headings)
Normal:   1.3   (subheadings)
Relaxed:  1.6   (body text)
Loose:    1.7   (quotes)
```

---

## Spacing System

### Base Unit: 4px

```
xs:  4px   (1 unit)
sm:  8px   (2 units)
md:  12px  (3 units)
lg:  16px  (4 units)
xl:  24px  (6 units)
2xl: 32px  (8 units)
3xl: 40px  (10 units)
4xl: 48px  (12 units)
```

### Responsive Padding
```
Horizontal: clamp(16px, 4vw, 32px)
Vertical:   clamp(60px, 10vw, 80px)
Card:       clamp(20px, 4vw, 28px)
```

---

## Border Radius

```
sm:  8px   - Buttons, inputs
md:  12px  - Cards, modals
lg:  16px  - Large cards, sections
xl:  20px  - Hero sections
full: 999px - Pills, badges
```

---

## Shadow System

### Subtle
```css
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
```

### Medium
```css
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
```

### Strong
```css
box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5);
```

### Glow (Blue)
```css
box-shadow: 0 0 30px rgba(59, 130, 246, 0.4);
```

---

## Glass Morphism Specifications

### Strong Glass (Navbar, Modals)
```css
background: rgba(255, 255, 255, 0.08);
backdrop-filter: blur(16px);
border: 1px solid rgba(255, 255, 255, 0.15);
border-radius: 16px;
```

### Medium Glass (Cards)
```css
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 16px;
```

### Subtle Glass (Inputs)
```css
background: rgba(255, 255, 255, 0.02);
backdrop-filter: blur(8px);
border: 1px solid rgba(255, 255, 255, 0.05);
border-radius: 12px;
```

### Color Overlay (Blue)
```css
background: rgba(59, 130, 246, 0.05);
border-color: rgba(59, 130, 246, 0.2);
```

---

## Component Specifications

### Navbar
```
Height:           64px (min)
Padding:          clamp(12px, 3vw, 24px)
Gap:              8px
Link Padding:     8px 16px
Link Border:      1px solid transparent
Link Hover BG:    rgba(59, 130, 246, 0.1)
Link Active BG:   rgba(59, 130, 246, 0.15)
CTA Button:       linear-gradient(135deg, #3b82f6, #60a5fa)
CTA Hover Shadow: 0 0 30px rgba(59, 130, 246, 0.4)
```

### Hero Section
```
Min Height:       500px
Padding:          clamp(60px, 10vw, 100px) clamp(16px, 5vw, 24px)
Title Font Size:  clamp(32px, 7vw, 80px)
Subtitle Font:    clamp(14px, 3vw, 18px)
Button Gap:       12px
Stats Grid:       repeat(auto-fit, minmax(160px, 1fr))
```

### Card (Project)
```
Min Width:        240px
Max Width:        320px
Image Height:     180px
Padding:          clamp(16px, 3vw, 24px)
Border Radius:    16px
Hover Transform:  translateY(-4px)
Hover Shadow:     0 12px 40px rgba(0, 0, 0, 0.4)
```

### Button (Primary)
```
Background:       linear-gradient(135deg, #3b82f6, #60a5fa)
Color:            #fff
Padding:          10px 24px
Border Radius:    999px
Font Weight:      600
Font Size:        13px
Hover Transform:  translateY(-2px)
Hover Shadow:     0 12px 32px rgba(59, 130, 246, 0.35)
```

### Button (Outline)
```
Background:       transparent
Color:            #f0f0f0
Border:           1px solid #2a2a2a
Padding:          10px 24px
Border Radius:    999px
Font Weight:      600
Font Size:        13px
Hover Border:     #3b82f6
Hover Color:      #3b82f6
Hover Shadow:     0 0 20px rgba(59, 130, 246, 0.2)
```

### Input
```
Background:       rgba(255, 255, 255, 0.05)
Border:           1px solid rgba(255, 255, 255, 0.1)
Color:            #f0f0f0
Padding:          10px 14px
Border Radius:    8px
Font Size:        14px
Focus Border:     rgba(59, 130, 246, 0.4)
Focus Shadow:     0 0 20px rgba(59, 130, 246, 0.2)
```

### Badge
```
Display:          inline-flex
Padding:          6px 12px
Border Radius:    999px
Font Size:        11px
Font Weight:      600
Background:       rgba(255, 255, 255, 0.05)
Border:           1px solid rgba(255, 255, 255, 0.1)
```

---

## Animation Specifications

### Fade Up
```css
animation: fadeUp 0.6s ease-out;
```

### Scale In
```css
animation: scaleIn 0.5s ease-out;
```

### Slide In Left
```css
animation: slideInLeft 0.6s ease-out;
```

### Slide Down
```css
animation: slideDown 0.3s ease-out;
```

### Hover Lift
```css
transform: translateY(-4px);
transition: all 0.3s ease;
```

### Glow Pulse
```css
animation: glow 3s ease-in-out infinite;
```

---

## Responsive Breakpoints

```
Mobile:     320px - 480px
Tablet:     481px - 1024px
Desktop:    1025px - 1440px
Large:      1441px+
```

### Mobile-First Approach
```
Base:       Mobile (320px)
@media (min-width: 481px):   Tablet Small
@media (min-width: 577px):   Tablet Medium
@media (min-width: 769px):   Tablet Large
@media (min-width: 1025px):  Desktop
@media (min-width: 1441px):  Desktop Large
```

---

## Layout Grid

### Container
```
Max Width:  1200px
Padding:    clamp(16px, 5vw, 24px)
Margin:     0 auto
```

### Section Spacing
```
Vertical:   clamp(60px, 10vw, 80px)
Horizontal: clamp(16px, 5vw, 24px)
```

### Grid Columns
```
Auto-fit:   repeat(auto-fit, minmax(240px, 1fr))
2 Column:   repeat(2, 1fr)
3 Column:   repeat(3, 1fr)
4 Column:   repeat(4, 1fr)
```

---

## Hover States

### Link
```
Color:      #888 → #3b82f6
Background: transparent → rgba(59, 130, 246, 0.1)
Border:     transparent → rgba(59, 130, 246, 0.2)
```

### Card
```
Background: rgba(255, 255, 255, 0.05) → rgba(255, 255, 255, 0.08)
Border:     rgba(255, 255, 255, 0.1) → rgba(255, 255, 255, 0.15)
Transform:  translateY(0) → translateY(-4px)
Shadow:     none → 0 12px 40px rgba(0, 0, 0, 0.4)
```

### Button
```
Primary:    brightness(1) → brightness(1.1) + translateY(-2px)
Outline:    border #2a2a2a → #3b82f6
```

---

## Focus States

### Keyboard Navigation
```
Outline:    2px solid #3b82f6
Offset:     2px
Border Radius: inherit
```

### Focus Visible
```css
:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
```

---

## Accessibility Colors

### Contrast Ratios
```
Text on Background:     4.5:1 (WCAG AA)
Large Text:             3:1 (WCAG AA)
UI Components:          3:1 (WCAG AA)
```

### Color Combinations
```
#f0f0f0 on #0a0a0a:     21:1 ✓
#3b82f6 on #0a0a0a:     5.2:1 ✓
#7cff67 on #0a0a0a:     8.1:1 ✓
#888 on #0a0a0a:        4.5:1 ✓
```

---

## Icon Specifications

### Sizes
```
xs:  12px
sm:  14px
md:  16px
lg:  18px
xl:  20px
2xl: 24px
3xl: 32px
```

### Colors
```
Primary:   #3b82f6
Accent:    #7cff67
Muted:     #888
Error:     #ef4444
Success:   #4ade80
```

### Stroke Width
```
Default:   2px
Bold:      2.5px
```

---

## Gradient Specifications

### Primary Gradient
```css
background: linear-gradient(135deg, #3b82f6, #60a5fa);
```

### Accent Gradient
```css
background: linear-gradient(135deg, #7cff67, #B497CF, #5227FF);
```

### Text Gradient
```css
background: linear-gradient(135deg, #7cff67 0%, #B497CF 50%, #5227FF 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

---

## Z-Index Scale

```
Navbar:     40
Dropdown:   30
Modal:      50
Tooltip:    60
Notification: 70
```

---

## Performance Targets

### Lighthouse
```
Performance:      > 90
Accessibility:    > 95
Best Practices:   > 95
SEO:              > 95
```

### Core Web Vitals
```
LCP (Largest Contentful Paint):  < 2.5s
FID (First Input Delay):         < 100ms
CLS (Cumulative Layout Shift):   < 0.1
```

### Page Load
```
First Byte:       < 600ms
First Paint:      < 1s
First Contentful: < 1.5s
Fully Interactive: < 3s
```

---

## Browser Support

### Modern Browsers
```
Chrome:   Latest 2 versions
Firefox:  Latest 2 versions
Safari:   Latest 2 versions
Edge:     Latest 2 versions
```

### Mobile
```
iOS Safari:       Latest 2 versions
Chrome Mobile:    Latest 2 versions
Samsung Internet: Latest version
```

### Fallbacks
```
backdrop-filter:  Solid background color
CSS Grid:         Flexbox fallback
CSS Variables:    Hardcoded values
```

---

## Design Tokens Summary

| Token | Value | Usage |
|-------|-------|-------|
| Primary Color | #3b82f6 | Links, buttons, accents |
| Accent Color | #7cff67 | Highlights, success |
| Background | #0a0a0a | Page background |
| Surface | #111 | Cards, containers |
| Text Primary | #f0f0f0 | Main text |
| Text Secondary | #888 | Secondary text |
| Border | #1a1a1a | Subtle borders |
| Radius | 16px | Cards, sections |
| Shadow | 0 8px 32px rgba(0,0,0,0.3) | Depth |
| Blur | 10px | Glass effect |

---

## Quick Reference

### Most Used Classes
```css
.glass-effect          /* Medium glass */
.glass-effect-strong   /* Strong glass (navbar) */
.glass-effect-subtle   /* Subtle glass (inputs) */
.glass-card            /* Card with glass */
.btn-gold              /* Primary button */
.btn-outline           /* Secondary button */
.section-tag           /* Section label */
.fade-up               /* Fade up animation */
.scale-in              /* Scale in animation */
```

### Most Used Colors
```
Primary:   #3b82f6
Accent:    #7cff67
Text:      #f0f0f0
Muted:     #888
Background: #0a0a0a
```

### Most Used Spacing
```
Padding:   clamp(16px, 4vw, 32px)
Gap:       12px - 16px
Section:   clamp(60px, 10vw, 80px)
```

---

This visual reference guide ensures consistency across the redesign. Use these specifications when creating or modifying components.
