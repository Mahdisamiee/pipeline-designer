// graph.service.ts
import { Injectable } from '@angular/core';
import { Node, Graph, Shape, Edge } from '@antv/x6';
import { MatDialog } from '@angular/material/dialog';
import { NodesDialogComponent } from '../nodes-dialog/nodes-dialog.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GraphService {
  private graph!: Graph;
  private nodeDataSubject = new BehaviorSubject<{
    type: 'process-node' | 'source-node' | 'destination-node';
    info: string;
  }>({type: "process-node", info:"strings"})
  nodeData$ = this.nodeDataSubject.asObservable();


  constructor(private dialog: MatDialog) {}




  initializeGraph(): void {
    console.log("here started")
    this.graph = new Graph({
      container: document.getElementById('graph-container')!,
      width: 500,
      height: 700,
      grid: {
        size: 20,
        visible: true,
        type: 'dot', // 'dot' | 'fixedDot' | 'mesh'
        args: {
          color: '#a0a0a0',
          thickness: 1,
        },
      },

      panning: true,
      mousewheel: {
        enabled: true,
        modifiers: ['ctrl', 'meta'],
      },
      connecting: {
        connector: 'smooth',
        allowEdge: false,
        allowBlank: false,
        allowNode: false,
        snap: true,

        validateConnection: (args) => args.targetPort === 'input-port',
      },
    });

    // add InitNode to graph
    this.addInitialNode();

    this.graph.centerContent();

    // ********************************* Graph Listeners
    // ************ADD TOOLS to Nodes
    // add remove button */
    this.graph.on('node:mouseenter', ({ node }) => {
      node.addTools({
        name: 'button-remove',
        args: { offset: { x: 12, y: 12 } },
      });
    });
    // Delete remove Button */
    this.graph.on('node:mouseleave', ({ node }) => {
      node.removeTools();
    });

    //************ */ ADD TOOLS to Edges
    // add add button */
    this.graph.on('edge:mouseenter', ({ edge }) => {
      edge.addTools({
        name: 'button',
        args: {
          markup: [
            {
              tagName: 'circle',
              selector: 'button',
              attrs: {
                r: 10,
                stroke: '#3498db',
                strokeWidth: 2,
                fill: 'white',
                cursor: 'pointer',
              },
            },
            {
              tagName: 'text',
              textContent: '+',
              selector: 'icon',
              attrs: {
                fill: '#3498db',
                fontSize: 10,
                textAnchor: 'middle',
                pointerEvents: 'none',
                y: '0.3em',
              },
            },
          ],
          distance: '50%',
          x: '50%',
          y: '50%',
          onClick: () => this.openProcessNodeSelectionDialog(edge),
        },
      });
    });
    // Delete edge Tools */
    this.graph.on('edge:mouseleave', ({ edge }) => {
      edge.removeTools();
    });

    // **************** Node Status
    // open Dialog window to add Sources
    this.graph.on('node:click', ({ node }) => {
      if (node.data.type === 'init-src-node') {
        this.openInitNodeSelectionDialog(node);
      } else if (node.data.type === 'init-dst-node') {
        this.openDstNodeSelectionDialog(node);
      } else {
        console.log('Its it', node.data);
        // this.nodeData = node.getData();
        this.nodeDataSubject.next(node.getData());
      }
    });
    // watch if all nodes removed, Add InitNode
    this.graph.on('node:removed', () => {
      if (this.graph.getNodes().length === 0) {
        this.addInitialNode();
      }
    });
  }

  zoomIn(): void {
    this.graph.zoom(+0.09);
  }

  zoomOut(): void {
    this.graph.zoom(-0.09);
  }

    // Other graph-related methods...
    addInitialNode(): void {
      const initNode = new InitNode({
        label: 'Click To Add Source',
        data: { type: 'init-src-node' },
      });
      this.graph.addNode(initNode);
      this.graph.centerContent();
    }
    openInitNodeSelectionDialog(initNode: Node): void {
      // open dialog to show DataSources
      const dialogRef = this.dialog.open(NodesDialogComponent, {
        width: '550px',
        height: '500px',
        data: {
          items: [
            {
              name: 'Data1',
              color: 'teal',
              label: 'Data 1',
              data: { type: 'source-node', info: 'src info 1' },
            },
            {
              name: 'Data2',
              color: 'orange',
              label: 'Data 2',
              data: { type: 'source-node', info: 'src info 2' },
            },
            {
              name: 'Data3',
              color: 'blue',
              label: 'Data 3',
              data: { type: 'source-node', info: 'src info 3' },
            },
            // Add more items as needed
          ],
        },
      });
  
      // make Nodes, Edges, after Dialog Closed
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
  
          const srcNode = new SrcNode({
            position: { x: 0, y: 0 },
            label: result.label,
            // body: { fill: result.color },
            data: result.data,
          });
  
          // Add a new DstNode connected to initNode at the center
          const dstNode = new DstNode({
            position: { x: 300, y: 0 },
            label: 'Select a Destination',
            data: { type: 'init-dst-node', info: '' },
          });
  
          this.graph.addNodes([srcNode, dstNode]);
  
          this.graph.removeNode(initNode);
          // Create new Edge and Add it to graph {source : initNode, target: dstNode}
          const edge = new Shape.Edge({
            source: srcNode,
            target: dstNode,
            attrs: {
              line: {
                stroke: '#5F95FF',
                strokeWidth: 2,
                targetMarker: {
                  name: 'classic',
                  size: 7,
                },
              },
            },
          });
          this.graph.addEdge(edge);
  
        }
      });
    }
  
    openDstNodeSelectionDialog(dstNode: Node): void {
      const dialogRef = this.dialog.open(NodesDialogComponent, {
        width: '500px',
        height: '500px',
        data: {
          items: [
            {
              name: 'Data1',
              color: 'teal',
              label: 'Data 1',
              data: { type: 'destination-node', info: 'Dst info 1' },
            },
            {
              name: 'Data2',
              color: 'orange',
              label: 'Data 2',
              data: { type: 'destination-node', info: 'Dst info 2' },
            },
            {
              name: 'Data3',
              color: 'blue',
              label: 'Data 3',
              data: { type: 'destination-node', info: 'Dst info 3' },
            },
            // Add more items as needed
          ],
        },
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          dstNode.setAttrs({
            // body: { fill: result.color },
            label: { text: result.label },
          });
          dstNode.setData(result.data);
        }
      });
    }
  
    openProcessNodeSelectionDialog(edge: Edge): void {
      const dialogRef = this.dialog.open(NodesDialogComponent, {
        width: '500px',
        height: '500px',
        data: {
          items: [
            {
              name: 'Process1',
              color: 'teal',
              label: 'Strings',
              data: { type: 'process-node', info: 'strings' },
            },
            {
              name: 'Process2',
              color: 'orange',
              label: 'Numbers',
              data: { type: 'process-node', info: 'numbers' },
            },
            {
              name: 'Process3',
              color: 'blue',
              label: 'Math',
              data: { type: 'process-node', info: 'math' },
            },
            // Add items for the new dialog
          ],
        },
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          // Logic to update the edge based on dialog result
          // Step 1: Add a Process Node
          const processNode = new ProcessNode({
            position: { x: 200, y: 100 }, // Set position as needed
            label: result.label,
            data: result.data,
          });
          this.graph.addNode(processNode);
  
          // Step 2: Modify or Replace the Existing Edge
  
          // Step 3: Add New Edges
          const srcNode = edge.getSourceNode();
          const dstNode = edge.getTargetNode();
  
          const edge1 = new Shape.Edge({
            source: srcNode,
            target: processNode,
            // Set attributes as needed
            attrs: edge.getAttrs(),
          });
  
          const edge2 = new Shape.Edge({
            source: processNode,
            target: dstNode,
            // Set attributes as needed
            attrs: edge.getAttrs(),
          });
  
          this.graph.addEdge(edge1);
          this.graph.addEdge(edge2);
          // Assuming 'edge' is the edge that was clicked
          this.graph.removeEdge(edge);
        }
      });
    }

  
}

class InitNode extends Shape.Rect {
  constructor(metadata: Node.Metadata) {
    super({
      ...{
        width: 180,
        height: 70,
        attrs: {
          body: {
            fill: '#efe',
            stroke: '#55ffcd',
            strokeWidth: 2,
            rx: 10,
            ry: 10,
          },
        },
        // ports: {
        //   groups: {
        //     out: {
        //       position: { name: 'right' },
        //       attrs: { circle: { magnet: true, r: 8, fill: '#eee' } },
        //     },
        //   },
        //   items: [{ id: 'output-port', group: 'out' }],
        // },
      },
      ...metadata,
    });
  }
}

class SrcNode extends Shape.Rect {
  constructor(metadata: Node.Metadata) {
    super({
      ...{
        width: 180,
        height: 70,
        attrs: {
          body: {
            fill: '#efe',
            stroke: '#55ffcd',
            strokeWidth: 2,
            rx: 10,
            ry: 10,
          },
        },
        // ports: {
        //   groups: {
        //     out: {
        //       position: { name: 'right' },
        //       attrs: { circle: { magnet: true, r: 8, fill: '#eee' } },
        //     },
        //   },
        //   items: [{ id: 'output-port', group: 'out' }],
        // },
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
        // ports: {
        //   groups: {
        //     out: {
        //       position: { name: 'right' },
        //       attrs: { circle: { magnet: true, r: 8, fill: '#eee' } },
        //     },
        //     in: {
        //       position: { name: 'left' },
        //       attrs: { circle: { magnet: 'passive', r: 8, fill: '#eee' } },
        //     },
        //   },
        //   items: [
        //     { id: 'output-port', group: 'out' },
        //     { id: 'input-port', group: 'in' },
        //   ],
        // },
      },
      ...metadata,
    });
  }
}

class DstNode extends Shape.Rect {
  constructor(metadata: Node.Metadata) {
    super({
      ...{
        width: 180,
        height: 70,
        attrs: {
          body: {
            fill: '#eef',
            stroke: '#55ffcd',
            strokeWidth: 2,
            rx: 10,
            ry: 10,
          },
        },
        // ports: {
        //   groups: {
        //     in: {
        //       position: { name: 'left' },
        //       attrs: { circle: { magnet: 'passive', r: 8, fill: '#eee' } },
        //     },
        //   },
        //   items: [{ id: 'input-port', group: 'in' }],
        // },
      },
      ...metadata,
    });
  }
}
