import { Component, OnInit, Input } from '@angular/core';
import { DataSet } from '../interace';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent implements OnInit {
  @Input() data: DataSet[];

  constructor() { }

  ngOnInit(): void {
  }

}
