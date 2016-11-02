import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'st-info-card',
  template: require('./st-info-card.component.html'),
  styles: [require('./st-info-card.component.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class StInfoCardComponent {
  @Input() photo: string;
  @Input() defaultPhoto: string;
  @Input() title: string;
  @Input() description: string;

  constructor() {
  }

  onPhotoError(): boolean {
    this.photo = this.defaultPhoto;
    return true;
  }
}
