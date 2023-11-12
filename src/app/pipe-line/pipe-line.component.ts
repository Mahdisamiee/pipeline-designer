import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { Node, Graph, Shape } from '@antv/x6';
import { Stencil } from '@antv/x6-plugin-stencil';

@Component({
  selector: 'app-pipe-line',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatButtonModule],
  templateUrl: './pipe-line.component.html',
  styleUrls: ['./pipe-line.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PipeLineComponent implements OnInit, AfterViewInit {
  private graph!: Graph;

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
      connecting: {
        allowBlank: false,
        allowNode: false,
        snap: true,

        validateConnection: (args) => args.targetPort === 'input-port',
      },
    });

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

    // Load nodes into stencil
    stencil.load(
      [
        new SrcNode({ label: 'MySQl', data: { type: 'mysql' } }),
        new SrcNode({ label: 'NoSQL', data: { type: 'nosql' } }),
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
        new DstNode({ label: 'WebSocket', data: { type: 'websokcet' } }),
        new DstNode({ label: 'MongoDB', data: { type: 'mongodb' } }),
      ],
      'destination'
    );
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
