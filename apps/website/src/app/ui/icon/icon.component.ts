import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-icon',
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class IconComponent {
  icon = input<string>("");
  protected cssClass = computed(() =>{
    return icons.get(this.icon()) ?? ""
  });


}


const list = {
  'globe': 'fa-solid fa-globe',
  'ellipsis-vertical': 'fa-solid fa-ellipsis-vertical',
  'rotate-right': 'fa-solid fa-rotate-right',
  'pen-to-square': 'fa-solid fa-pen-to-square',
  'calculator': 'fa-solid fa-calculator',
  'pen': 'fa-solid fa-pen',
  'xmark': 'fa-solid fa-xmark',
  'check': 'fa-solid fa-check',
  'plus': 'fa-solid fa-plus',
  'minus': 'fa-solid fa-minus',
  'trash': 'fa-solid fa-trash',
  'floppy-disk': 'fa-solid fa-floppy-disk',
}

const icons = new Map(Object.entries(list));