/* =====================================================================
   FILE: components/student-card/student-card.ts
   WHAT: The logic of the student card shown on the landing page.
   WHY:  The card only displays one student. The parent page gives it
         the student through an input, so the card never loads data
         itself and can be reused anywhere. It also remembers whether
         the portrait failed to load, to show a placeholder instead.
   ===================================================================== */
import { Component, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Student } from '../../models/student.model';

@Component({
  // The tag used to place the card on a page: <app-student-card />
  selector: 'app-student-card',
  // The template uses routerLink, so RouterLink must be listed here.
  imports: [RouterLink],
  templateUrl: './student-card.html',
  styleUrl: './student-card.css',
})
export class StudentCard {
  // The parent page will give us one student through this input.
  // `.required` makes Angular refuse to compile if the parent forgets it.
  readonly student = input.required<Student>();

  // Did the portrait fail to load? A signal holds a value that updates
  // the screen automatically when it changes.
  private readonly imageFailed = signal(false);

  // The path actually shown: the placeholder if the real image failed.
  // computed recalculates only when imageFailed() or student() changes.
  protected readonly photoSrc = computed(() =>
    this.imageFailed() ? 'images/placeholder-portrait.svg' : this.student().photo,
  );

  // Called by the template when the image cannot be loaded.
  // protected lets the template use it while hiding it from other classes.
  protected onImageError(): void {
    this.imageFailed.set(true);
  }
}