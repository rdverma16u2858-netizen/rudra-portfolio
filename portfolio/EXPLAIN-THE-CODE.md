# Understand your portfolio, step by step

Start with the website open next to your code. Change one small thing, refresh, and see what happened.

## 1. HTML: what is on the page?

`index.html` contains all the main content. HTML tells the browser what each piece means:

- `<header>` holds the sticky navigation.
- `<nav>` groups the navigation links.
- `<main>` holds the page's primary content.
- `<section>` groups a topic such as Projects or Skills.
- `<article>` represents an individual project or skill group.
- `<footer>` contains the credits and back-to-top link.
- `<dialog>` is the popup for project notes.

There is one `<h1>` for the main introduction, `<h2>` elements for sections, and `<h3>` elements inside them. This gives the page a useful heading hierarchy.

**Try it:** Find `hero-title` and change one word. Refresh the browser. No build is required for a text change.

## 2. Tailwind: small CSS classes with clear jobs

Tailwind classes are CSS utilities. A class usually does one specific job.

```html
<div class="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
```

This is the Projects layout:

| Class | Meaning |
| --- | --- |
| `grid` | Set `display: grid` |
| `grid-cols-1` | Use one column by default |
| `md:grid-cols-2` | Use two columns at the `md` breakpoint and above |
| `xl:grid-cols-4` | Use four columns at the `xl` breakpoint and above |
| `gap-x-6` | Add 1.5rem horizontal gaps with Tailwind's default spacing |
| `gap-y-10` | Add 2.5rem vertical gaps |

Tailwind's default `md` breakpoint is 48rem, normally 768px. `lg` is 64rem, normally 1024px, and `xl` is 80rem, normally 1280px. Unprefixed classes apply at every size; prefixed classes apply from their breakpoint upward.

```html
<div class="flex flex-wrap items-center gap-5">
```

- `flex`: arrange children along one main axis.
- `flex-wrap`: allow items to move to another line.
- `items-center`: align them on the cross axis.
- `gap-5`: add 1.25rem between items.

Other examples from this project: `p-7` means padding; `mt-6` means margin above; `text-sm` controls font size; `border` adds a border; `rounded-2xl` rounds corners. `text-muted` and `bg-paper` use the colors defined in `css/input.css`.

**TA question: Why both Flexbox and Grid?**

“I use Flexbox to align one-dimensional groups like navigation links and buttons. I use Grid for the project gallery and two-column sections, where I want consistent columns.”

## 3. The CSS box model

Every element has content, padding, a border, and margin.

- **Padding** creates space inside an element.
- **Border** outlines it.
- **Margin** creates space outside it.
- **Gap** creates space between children in a flex or grid layout.

For example, a skill card has padding so text does not touch the edges, a thin border to define the card, and a grid gap separating it from other cards.

## 4. Custom CSS: the visual identity

Read `css/style.css`; it has comments separating the important parts.

```css
.page-width {
  width: min(1180px, calc(100% - 80px));
  margin-inline: auto;
}
```

The content is at most 1180px wide. On smaller screens, it leaves 40px on each side. Auto inline margins center it. A mobile media query changes the side space to 20px.

```css
.hero-title {
  font-size: clamp(44px, 5.45vw, 74px);
}
```

`clamp()` chooses a fluid font size with a minimum and maximum. `vw` is relative to the browser width.

**Try it:** Change the `.hello-mark` color in `style.css`. Refresh; no Tailwind rebuild is needed for custom CSS edits.

## 5. Positioning and stacking

The header uses `position: sticky` through Tailwind's `sticky top-0`. It stays at the top while scrolling. `z-40` keeps it above ordinary page elements.

The hero illustration uses a `position: relative` parent. Its code window, star, orbits, and note are `position: absolute` children, so they can overlap relative to that parent.

**TA question: Why absolute positioning here?**

“It lets me layer the decorative illustration. The actual page layout uses normal document flow and Grid, so the content remains responsive.”

## 6. Transition versus animation

A **transition** smoothly responds to a changed property:

```css
.button-primary {
  transition: transform 180ms ease, background 180ms ease;
}
.button-primary:hover {
  transform: translateY(-2px);
}
```

An **animation** follows named keyframes:

```css
@keyframes settle-in {
  from { opacity: 0; translate: 0 15px; }
  to   { opacity: 1; translate: 0 0; }
}
```

The code window runs this animation when the page loads. The caret blinks five times and stops. The `prefers-reduced-motion` media query removes animations, transitions, and smooth scrolling when the visitor prefers less motion.

## 7. JavaScript: reacting to a visitor

`js/script.js` is loaded with `defer`, so HTML parsing finishes before it runs. It uses browser features directly.

**Mobile menu:** `querySelector()` finds elements. `addEventListener('click', ...)` reacts to a click. `classList.toggle('is-open')` changes the CSS state. `aria-expanded` communicates the same state to assistive technology. Selecting a link, clicking outside, or pressing Escape closes the menu.

**Project filters:** every card has `data-category="web"` or `data-category="ai"`. Buttons select a category, and the code updates the cards' `hidden` property. The `aria-pressed` state indicates the selected filter. A live status announces the count.

**Project notes:** a small object stores each project's description. A click fills the dialog using `textContent` and opens it with `showModal()`. Native `<dialog>` provides modal keyboard behavior and Escape support. The close button uses `<form method="dialog">`.

**Copy profile link:** `navigator.clipboard.writeText()` requests a clipboard copy. The `try/catch` handles failure and displays the URL for manual copying. The code never claims success when copying fails.

The main content and project links still work without JavaScript. JavaScript-only filter and project-note controls are shown only when their behavior is ready.

## 8. How this matches the assignment

| Requirement | Where it appears |
| --- | --- |
| Navigation and hero | Header and `#home` |
| About | `#about` |
| Skills | `#skills` |
| Four projects | `#projects`: PixelForge, Fit24, JARVAS, and KHANAK (SST Hustle) |
| Education / experience | `#journey` |
| Achievements | `#achievements`: academic results, award, chess rating, and PixelForge milestones |
| First-year goal timeline | `#goals`: four planning windows, checkboxes, and progress counts |
| Contact | `#contact` with a real GitHub link |
| Footer | Bottom of `index.html` |
| Responsive design | Tailwind breakpoints and custom media queries |
| Flexbox and Grid | Navigation, button groups, project and skill galleries |
| Transition | Button and project hover effects |
| Animation | Code window entrance and finite caret blink |
| Meaningful Tailwind usage | Layout, spacing, typography, borders, responsive rules |

## 9. A short presentation you can adapt

“I built my personal portfolio with HTML, CSS, JavaScript, and Tailwind CSS. I chose a light layout with muted green accents. It introduces me, presents my projects, and shows my learning journey at SST.

I used Flexbox for the navigation and buttons, and Grid for project cards and section layouts. Tailwind's responsive prefixes change the number of columns on larger screens. Custom CSS creates the illustrations and small hover animations. JavaScript handles the mobile menu, project filters, and project notes.

JARVAS is marked as in development, and the project visuals are labelled as illustrations. The next improvements would be adding my email, LinkedIn, and actual project screenshots.”

Be honest about AI assistance. Before presenting, practise pointing to each feature in your actual files and explaining one small change you made yourself.

## 10. Explain the first-year goal tracker

**A simple presentation answer:**

“I organised my first-year goals into four time windows. Each goal is an HTML checkbox. JavaScript listens for a change, counts the completed goals, and updates the progress bar. It saves the checkbox states using the browser's built-in localStorage, so they can be restored after a refresh.”

### HTML gives every goal a stable ID

```html
<label class="goal-row">
  <input type="checkbox" data-goal="java-fundamentals" disabled>
  <span>Master Java fundamentals</span>
</label>
```

The label makes the text clickable. `data-goal` is a custom HTML attribute; JavaScript reads it through `checkbox.dataset.goal`. The checkbox starts disabled until JavaScript has loaded its saved state and attached the change handler. The goals themselves remain readable without JavaScript.

### A change updates the page and saves progress

```js
checkbox.addEventListener('change', () => {
  updateGoalProgress();
  saveGoalProgress();
});
```

The `checked` property is `true` or `false`. Checking **or unchecking** triggers the same handler. The code counts checked inputs and updates the native HTML `<progress>` element and the text beside it. It also updates each phase's count.

### localStorage stores text

An example saved object looks like this:

```js
{
  "java-fundamentals": true,
  "git-github": false
}
```

`JSON.stringify()` turns the object into text before `localStorage.setItem()` saves it. On the next page load, `localStorage.getItem()` retrieves it, and `JSON.parse()` turns it back into an object. The code restores a checkbox only if the saved value is exactly `true`.

`try/catch` handles blocked storage and invalid saved data. The interface reports the problem instead of falsely claiming progress was saved.

**TA question: Is localStorage a backend database?**

“No. It is browser storage on that device. It does not share my progress with other visitors or sync across devices. The website still uses only HTML, CSS, JavaScript, and Tailwind CSS.”

**TA question: How does a completed goal look different?**

```css
.goal-row:has(input:checked) .goal-name {
  text-decoration: line-through;
}
```

“CSS selects a goal row that contains a checked input. It changes the background and adds a line through the title. The native checkbox also visibly shows that it is checked.”

**Try it:** Mark one goal, see the count change, refresh, and check whether it stayed marked. Untick it to undo. Then explain what happened at each step.
