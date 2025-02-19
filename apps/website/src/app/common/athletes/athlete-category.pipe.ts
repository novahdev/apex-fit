import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'athleteCategory',
})
export class AthleteCategoryPipe implements PipeTransform {
  transform(value: unknown): string {
    if (typeof value !== "string") {
      return "No definido";
    }
    if (value === "BEGINNER") {
      return "Principiante"
    }
    if (value === "INTERMEDIATE") {
      return "Intermedio"
    }
    if (value === "ADVANCED") {
      return "Avanzado"
    }
    if (value === "RX"){
      return "RX"
    }

    if (value === "ELITE"){
      return "Elite"
    }

    return value;
  }
}
