# Codebase Task Proposals

## 1) Typo fix task
**Issue found:** The repository title at the end of `README.md` contains corrupted null-byte characters (`#\0 \0f\0g...`) instead of plain UTF-8 text.

**Proposed task:**
- Clean up the malformed trailing line in `README.md` and replace it with a properly encoded heading (or remove it if redundant).
- Add a quick encoding check in CI (for example, reject files containing null bytes) to prevent recurrence.

**Why this matters:** Corrupted text makes documentation look broken and can cause rendering or tooling issues.

## 2) Bug fix task
**Issue found:** `app/(tabs)/home.jsx` renders the “For your life phase” card block twice with identical content, which appears to be an accidental duplicate UI section.

**Proposed task:**
- Remove the duplicated card block.
- Extract the card into a small component to reduce copy/paste risk.
- Add a UI assertion test (or snapshot) that verifies only one phase card is rendered.

**Why this matters:** Duplicate content is confusing for users and increases maintenance burden.

## 3) Comment / documentation discrepancy task
**Issue found:** `components/LifePhaseWheel.jsx` file naming suggests a “Wheel” component, but the default export is `LifePhaseLine`, and the implementation is a horizontal line of pills rather than a wheel.

**Proposed task:**
- Align naming across file name, exported component, and any comments/docs.
- Either rename the file to `LifePhaseLine.jsx` or rename the component to `LifePhaseWheel` and implement/describe wheel behavior explicitly.
- Update import call sites to match the chosen naming.

**Why this matters:** Naming mismatch slows onboarding and causes wrong expectations during reuse.

## 4) Test improvement task
**Issue found:** The project has linting but no focused tests around navigation/content rendering for key screens.

**Proposed task:**
- Add a React Native Testing Library test suite for `app/(tabs)/home.jsx` that validates:
  - featured article cards render when Sanity data exists,
  - phase navigation link points to `/life-phase/${lifePhase}`,
  - “More on this topic” section gracefully handles empty data.
- Mock `client.fetch` to cover success and failure states.

**Why this matters:** These tests guard against regressions in the app’s highest-traffic screen.
