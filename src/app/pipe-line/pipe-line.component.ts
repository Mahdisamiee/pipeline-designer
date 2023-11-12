import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Node, Graph, Shape } from '@antv/x6';
import { Stencil } from '@antv/x6-plugin-stencil';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

// components
import {
  DialogData,
  NodesDialogComponent,
} from './nodes-dialog/nodes-dialog.component';

@Component({
  selector: 'app-pipe-line',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatButtonModule],
  templateUrl: './pipe-line.component.html',
  styleUrls: ['./pipe-line.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PipeLineComponent implements OnInit, AfterViewInit {
  constructor(private dialog: MatDialog) {}
  private graph!: Graph;

  private openNodeSelectionDialog(initNode: Node): void {
    const dialogRef = this.dialog.open(NodesDialogComponent, {
      width: '250px',
      data: {
        items: [
          { name: 'Data1', color: 'blue', label: 'Data1' },
          // Add more items as needed
        ],
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Change initNode attributes based on selection
        // initNode.attr('body/fill', result.color);
        initNode.setAttrs({
          body: { fill: result.color },
          label: { text: result.label },
        });


        // Add a new DstNode connected to initNode
        const dstNode = new DstNode({
          label: 'New Destination',
          data: { type: 'destination-node' },
        });
        this.graph.addNode(dstNode);
        // this.graph.addEdge({ source: initNode, target: dstNode });
      }
    });
  }
  // none graph functionality

  zoomIn(): void {
    const currentZoom = this.graph.zoom(+0.09);
    // this.graph.zoom(currentZoom + 0.05);
    console.log(currentZoom);
  }

  zoomOut(): void {
    const currentZoom = this.graph.zoom(-0.09);
    // this.graph.zoom(currentZoom - 0.05);
    console.log(currentZoom);
  }

  // Graph Functionality

  ngOnInit(): void {
    // Initialization logic if needed
  }

  ngAfterViewInit(): void {
    this.initializeGraph();
    this.createStencil();
  }

  private initializeGraph(): void {
    this.graph = new Graph({
      container: document.getElementById('graph-container')!,
      width: 500,
      height: 700,
      grid: {
        size: 20,
        visible: true,
        type: 'dot', // 'dot' | 'fixedDot' | 'mesh'
        args: {
          color: '#a0a0a0', // 网格线/点颜色
          thickness: 1, // 网格线宽度/网格点大小
        },
      },
      panning: true,
      mousewheel: {
        enabled: true,
        modifiers: ['ctrl', 'meta'],
      },
      connecting: {
        allowBlank: false,
        allowNode: false,
        snap: true,

        validateConnection: (args) => args.targetPort === 'input-port',
      },
    });

    this.graph.addNode(
      new InitNode({
        label: 'Click To Add Source',
        data: { type: 'init-node' },
      })
    );

    // ADD TOOLS to Nodes
    this.graph.on('node:mouseenter', ({ node }) => {
      node.addTools({
        name: 'button-remove',
        args: { offset: { x: 12, y: 12 } },
      });
    });
    this.graph.on('node:mouseleave', ({ node }) => {
      node.removeTools();
    });

    // ADD TOOLS to Edges
    this.graph.on('edge:mouseenter', ({ edge }) => {
      edge.addTools({
        name: 'button-remove',
      });
    });
    this.graph.on('edge:mouseleave', ({ edge }) => {
      edge.removeTools();
    });

    //
    this.graph.on('node:click', ({ node }) => {
      console.log(node.data);
      if (node.data.type === 'init-node') {
        // DO Changes here
        this.openNodeSelectionDialog(node);
      }
    });
  }

  private createStencil(): void {
    const stencil = new Stencil({
      title: 'Tools',
      target: this.graph,
      stencilGraphHeight: 120,
      stencilGraphWidth: 300,
      collapsable: true,
      // used in stencil
      groups: [
        { name: 'source', title: 'Source' },
        { name: 'process', title: 'Process' },
        { name: 'destination', title: 'Destination' },
      ],
    });

    document.getElementById('stencil')!.appendChild(stencil.container);

    // Load nodes into stencil
    stencil.load(
      [
        new SrcNode({ label: 'MySQl', data: { type: 'source-node' } }),
        new SrcNode({ label: 'NoSQL', data: { type: 'source-node' } }),
      ],
      'source'
    );
    stencil.load(
      [
        new ProcessNode({ label: 'Process 1', data: { type: 'filter' } }),
        new ProcessNode({ label: 'Process 2', data: { type: 'map' } }),
      ],
      'process'
    );
    stencil.load(
      [
        new DstNode({ label: 'WebSocket', data: { type: 'destination-node' } }),
        new DstNode({ label: 'MongoDB', data: { type: 'destination-node' } }),
      ],
      'destination'
    );
  }
}

/**
 * ## Node Classes
 * ### InitNode
 */

class InitNode extends Shape.Rect {
  constructor(metadata: Node.Metadata) {
    super({
      ...{
        width: 100,
        height: 40,
        attrs: {
          body: {
            fill: 'green',
            stroke: '#55ffcd',
            strokeWidth: 2,
            rx: 10,
            ry: 10,
          },
        },
        ports: {
          groups: {
            out: {
              position: { name: 'right' },
              attrs: { circle: { magnet: true, r: 8, fill: '#eee' } },
            },
          },
          items: [{ id: 'output-port', group: 'out' }],
        },
      },
      ...metadata,
    });
  }
}

class SrcNode extends Shape.Rect {
  constructor(metadata: Node.Metadata) {
    super({
      ...{
        width: 100,
        height: 40,
        attrs: {
          body: {
            fill: '#55abcd',
            stroke: '#55ffcd',
            strokeWidth: 2,
            rx: 10,
            ry: 10,
          },
        },
        ports: {
          groups: {
            out: {
              position: { name: 'right' },
              attrs: { circle: { magnet: true, r: 8, fill: '#eee' } },
            },
          },
          items: [{ id: 'output-port', group: 'out' }],
        },
      },
      ...metadata,
    });
  }
}

class ProcessNode extends Shape.Rect {
  constructor(metadata: Node.Metadata) {
    super({
      ...{
        width: 100,
        height: 40,
        attrs: {
          body: {
            fill: '#ab55cd',
            stroke: '#ff55cd',
            strokeWidth: 2,
            rx: 20,
            ry: 20,
          },
        },
        ports: {
          groups: {
            out: {
              position: { name: 'right' },
              attrs: { circle: { magnet: true, r: 8, fill: '#eee' } },
            },
            in: {
              position: { name: 'left' },
              attrs: { circle: { magnet: 'passive', r: 8, fill: '#eee' } },
            },
          },
          items: [
            { id: 'output-port', group: 'out' },
            { id: 'input-port', group: 'in' },
          ],
        },
      },
      ...metadata,
    });
  }
}

class DstNode extends Shape.Rect {
  constructor(metadata: Node.Metadata) {
    super({
      ...{
        width: 100,
        height: 40,
        attrs: {
          body: {
            fill: '#55abcd',
            stroke: '#55ffcd',
            strokeWidth: 2,
            rx: 10,
            ry: 10,
          },
        },
        ports: {
          groups: {
            in: {
              position: { name: 'left' },
              attrs: { circle: { magnet: 'passive', r: 8, fill: '#eee' } },
            },
          },
          items: [{ id: 'input-port', group: 'in' }],
        },
      },
      ...metadata,
    });
  }
}

// *************Idea to make NodeGroup
// const imageNodes = imageShapes.map((item) =>
//       graph.createNode({
//         shape: "custom-image",
//         label: item.label,
//         attrs: {
//           image: {
//             "xlink:href": item.image
//           }
//         }
//       })
//     );
//     stencil.load(imageNodes, "group2");
