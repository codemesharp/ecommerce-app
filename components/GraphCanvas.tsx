'use client';

import { useRef, useEffect, useMemo, useState } from 'react';
import ForceGraph2D, {
  ForceGraphMethods,
  NodeObject,
  LinkObject,
} from 'react-force-graph-2d';

interface Education {
  school: string;
  degree: string;
  duration: string;
}

export interface NodeData extends NodeObject {
  id: string;
  name: string;
  type: string;
  image?: string;
  location?: string;
  bio?: string;
  peerCount?: number;
  followingCount?: number;
  patientsServed?: number;
  successRate?: string | number;
  education?: Education[];
  x?: number;
  y?: number;
}

export interface LinkData extends LinkObject {
  source: string | NodeData;
  target: string | NodeData;
  label: string;
}

interface GraphData {
  nodes: NodeData[];
  links: LinkData[];
}

interface GraphCanvasProps {
  data: GraphData;
  centralNode?: NodeData;
  onNodeClick: (node: NodeData) => void;
}

export default function GraphCanvas({
  data,
  centralNode,
  onNodeClick,
}: GraphCanvasProps) {
  const fgRef = useRef<ForceGraphMethods | null>(null);

  const [hoveredLink, setHoveredLink] = useState<LinkData | null>(null);
  const [selectedLink, setSelectedLink] = useState<LinkData | null>(null);

  const graphData = useMemo(() => data || { nodes: [], links: [] }, [data]);
  console.log(hoveredLink);
  useEffect(() => {
    if (fgRef.current && graphData?.nodes?.length) {
      setTimeout(() => {
        if (centralNode?.x != null && centralNode?.y != null) {
          fgRef.current?.centerAt(centralNode.x, centralNode.y, 1000);
          fgRef.current?.zoom(2.2, 1000);
        } else {
          fgRef.current?.centerAt(0, 0, 1000);
          fgRef.current?.zoom(2.2, 1000);
        }
      }, 300);
    }
  }, [graphData, centralNode]);

  return (
    <>
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        nodeId="id"
        nodeLabel={(node: NodeObject) =>
          `${(node as NodeData).name} (${(node as NodeData).type})`
        }
        nodeAutoColorBy="type"
        onNodeClick={(node) => onNodeClick(node as NodeData)}
        backgroundColor="rgba(0,0,0,0)"
        linkDirectionalArrowLength={3}
        linkDirectionalArrowRelPos={1}
        linkWidth={1}
        linkColor={() => '#3B82F6'}
        onLinkHover={(link) => setHoveredLink(link as LinkData)}
        onLinkClick={(link) => setSelectedLink(link as LinkData)}
        linkLabel={(link) =>
          (link as LinkData).label
            ? `${(link as LinkData).label} between ${
                typeof link.source === 'object' && 'name' in link.source
                  ? link.source.name
                  : link.source
              } and ${
                typeof link.target === 'object' && 'name' in link.target
                  ? link.target.name
                  : link.target
              }`
            : ''
        }
        nodeCanvasObjectMode={() => 'before'}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const n = node as NodeData;
          const img = new Image();
          img.src = n.image || 'https://via.placeholder.com/64';

          const size = 20 / globalScale;
          const radius = size;

          ctx.save();
          ctx.beginPath();
          ctx.arc(n.x ?? 0, n.y ?? 0, radius, 0, 2 * Math.PI, false);
          ctx.clip();
          ctx.drawImage(
            img,
            (n.x ?? 0) - radius,
            (n.y ?? 0) - radius,
            radius * 2,
            radius * 2
          );
          ctx.restore();

          ctx.beginPath();
          ctx.arc(n.x ?? 0, n.y ?? 0, radius, 0, 2 * Math.PI);
          ctx.strokeStyle = n.id === centralNode?.id ? '#F97316' : '#E5E7EB';
          ctx.lineWidth = 2;
          ctx.stroke();
        }}
      />

      {selectedLink && (
        <div className="mt-4 p-4 bg-white rounded-xl shadow text-sm text-gray-700">
          <h3 className="text-md font-bold mb-1">Connection Details</h3>
          <p>
            <strong>{selectedLink.label}</strong> between{' '}
            <strong>
              {typeof selectedLink.source === 'object' &&
              'name' in selectedLink.source
                ? selectedLink.source.name
                : selectedLink.source}
            </strong>{' '}
            and{' '}
            <strong>
              {typeof selectedLink.target === 'object' &&
              'name' in selectedLink.target
                ? selectedLink.target.name
                : selectedLink.target}
            </strong>
          </p>
          <p className="mt-2 text-gray-500">
            Co-authored 3 papers together (mocked)
          </p>
        </div>
      )}
    </>
  );
}
