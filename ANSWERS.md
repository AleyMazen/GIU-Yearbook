# GIU Yearbook · Lab 1 · Answers

## Step 1

**Question 1: Why does the selector start with `app-`?**

The `app-` prefix is the project's custom prefix. Angular puts it in front of every component selector so our own tags cannot clash with standard HTML elements or with tags from other libraries. `app-header` and `app-top-strip` follow the same pattern, and our card is `app-student-card`.

## Step 2: Notes on the data

1. **Fields displayed on the card:** `photo`, `name`, `faculty`, `classYear` and `quote`.
2. **Field used to build the link to the student's story:** `id`. The link becomes `/students/1`, `/students/2`, and so on.
3. **Field that decides the order for "Featured first":** `featured`. The card does not show it.

## Step 5

**Question 2: What would happen if the parent changed which student it passes? Would the card update by itself?**

Yes. `student` is a signal-based input, and the template reads it by calling `student()`. When the parent passes a different student, the signal changes and Angular updates every place in the template that reads it, so the card redraws by itself without any extra code.

## Step 11

**Question 3: The arrow icon has no color in its SVG code, yet it is red. Why?**

The SVG uses `stroke="currentColor"`, which means its lines take the current text color of the element. In the CSS, `.card__arrow` sets `color: var(--color-red)`, so the icon's stroke becomes red. The color comes from CSS, not from the SVG itself.

## Step 13

**Question 4: Why do we use `computed` for `photoSrc` instead of just assigning a value in the constructor?**

A value assigned in the constructor is calculated once and never changes. `photoSrc` depends on two signals, `imageFailed()` and `student()`, so it has to be recalculated whenever either one changes (for example when the image fails to load, or when the parent passes a different student). `computed` does this automatically and only recalculates when something it reads has changed. The input also may not have its value yet while the constructor runs.

## Reflection questions

**1. Why does the card receive the student through an input instead of loading it from `StudentService` itself?**

The students page already loads the data once, so the card only needs to display one student. If each card called the service itself, the app would make eight separate loads, and each card would depend on the data source. With an input, the card is a simple, reusable component that works with any student it is given, and it is easier to test and to change later (for example when the real API replaces the JSON file).

**2. What is the advantage of having a separate card component instead of writing the card markup inside the students page?**

The card can be reused anywhere a student needs to be shown, and its HTML, CSS and logic live in one place. The students page stays short and easy to read, the card's styles are scoped to it, and a design change only has to be made in one file.

**3. If the backend adds a new field, `graduationDate`, which files would you change to show it on the card?**

- `student.model.ts`: add `graduationDate` to the `Student` interface.
- `students.json` (the mock data): add the field to each student, so it matches what the backend returns.
- `student-card.html`: display the new field, for example with `{{ student().graduationDate }}`.
- `student-card.css`: only if the new line needs its own style.

**4. Which step was hardest for you, and what did you do to get unstuck?**

(Write this one in your own words when you finish the lab. For example: which step took longest, which error you got, and how you fixed it. At Step 1 the terminal said `ng` was not recognized, and I fixed it by running the command with `npx ng ...` instead.)