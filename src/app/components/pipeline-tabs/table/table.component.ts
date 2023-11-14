import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

interface Variable {
  name: string;
  value: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  displayedColumns: string[] = ['name', 'value', 'actions'];
  dataSource: Variable[] = [
    { name: 'Variable1', value: 'Value1' },
    { name: 'Variable2', value: 'Value2' },
    // Add more variables as needed
  ];

  deleteVariable(variable: Variable): void {
    this.dataSource = this.dataSource.filter((v) => v !== variable);
  }
}
