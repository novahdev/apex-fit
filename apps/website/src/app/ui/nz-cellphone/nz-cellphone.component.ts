import { FocusMonitor } from '@angular/cdk/a11y';
import { Platform } from '@angular/cdk/platform';
import { Component, ElementRef, EventEmitter, inject, input, Input, Optional, output, Output, Self } from '@angular/core';
import { AbstractControlDirective, FormsModule, NgControl } from '@angular/forms';
import { IMaskModule } from 'angular-imask';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Subject } from 'rxjs';

@Component({
   // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'nz-cellphone',
  imports: [
      IMaskModule,
      FormsModule,
      NzInputModule
  ],
  templateUrl: './nz-cellphone.component.html',
  styleUrl: './nz-cellphone.component.scss',
  host: {
    "class": "ant-input",
    '[class.ant-input-disabled]': 'disable',
    '[class.ant-input-number-focused]': 'isFocused'
  }
})
export class NzCellphoneComponent {
private readonly _platform = inject(Platform);
  public mask: any = undefined;
  private _value = "";
  isFocused = false;
  public disable = false;
  public stateChanges = new Subject<void>();
  public ngControl: NgControl | AbstractControlDirective | null = null;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onChange = (_: any) => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouched = () => {};
  public empty = true;
  public readonly readOnly = input<boolean>(false);
  public readonly placeholder = input<string>('');

  @Output() valueChange = new EventEmitter<number>();

  // 

  constructor(
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Self() ngControl: NgControl
  ){
    if (ngControl){
      ngControl.valueAccessor = this;
      this.ngControl = ngControl;
    }

    if (this._platform.isBrowser){
      this.mask = { 
        mask: "(000) 000-0000",  // enable number mask
        lazy: true,
      };
    }

  }
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  

  private _inputValue = '';
  public set inputValue(value: string){
    // const temp: string = value;
    this._inputValue = value;
    this.value = value;
  }
  public get inputValue(){
    return this._inputValue;
  }

  @Input()
  get value(){
    return this._value;
  }

  set value(value: string){   
    const numbersOnly = value.replace(/\D/g, ''); // Extraer solo los números
    const formattedValue = numbersOnly.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3'); // Formatear con espacios
    this._value = '+57 ' +  formattedValue.trim();
    this.onChange(this._value);

  }
  
  public writeValue(obj: any): void {
    if (typeof obj === "string" && /^\+\d+ \d{3} \d{3} \d{4}$/.test(obj)){
      this.value = obj.substring(3);
      this._inputValue = obj.substring(3);
      return;
    }
    
    this.value = "";
    this._inputValue = "";
    return;
  }
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disable = isDisabled;
  }


  onFocus(): void {
    this.isFocused = true;
    this.focus.emit();
  }

  onBlur(): void {
    this.isFocused = false;
    this._elementRef.nativeElement.blur();
  }

  // eslint-disable-next-line @angular-eslint/no-output-native
  public focus = output<void>();
}
