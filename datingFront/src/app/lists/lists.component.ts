import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListsComponent {

}
