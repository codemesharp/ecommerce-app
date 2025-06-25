// 'use client';

// import { useState, useMemo } from 'react';
// import dynamic from 'next/dynamic';
// import SearchBar from './SearchBar';
// import rawMockData from '../data/mockGraphml.json';
// import ToggleSwitch from './ToggleSwitch';
// import PrimaryButton from './PrimaryButton';
// import {
//   HeartIcon,
//   StarIcon,
//   ArrowTrendingUpIcon,
// } from '@heroicons/react/24/outline';
// import FilterSelector from './FilterSelecter';

// interface Education {
//   school: string;
//   degree: string;
//   duration: string;
// }

// interface NodeData {
//   id: string;
//   name: string;
//   type: string;
//   image?: string;
//   location?: string;
//   bio?: string;
//   peerCount?: number;
//   followingCount?: number;
//   patientsServed?: number;
//   successRate?: string | number;
//   education?: Education[];
// }

// interface LinkData {
//   source: string;
//   target: string;
//   label: string;
// }

// interface GraphData {
//   nodes: NodeData[];
//   links: LinkData[];
// }

// const mockData = rawMockData as GraphData;

// const GraphCanvas = dynamic(() => import('./GraphCanvas'), {
//   ssr: false,
// });

// export default function Home() {
//   const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activeFilters, setActiveFilters] = useState<string[]>([]);

//   const centralNode = useMemo<NodeData | undefined>(() => {
//     return mockData.nodes.find(
//       (node) => node.name?.toLowerCase() === searchQuery.toLowerCase()
//     );
//   }, [searchQuery]);

//   const filteredData = useMemo<GraphData>(() => {
//     if (!activeFilters.length) return mockData;

//     const links = mockData.links.filter((link) =>
//       activeFilters.includes(link.label)
//     );
//     const nodeIds = new Set(links.flatMap((l) => [l.source, l.target]));
//     const nodes = mockData.nodes.filter((n) => nodeIds.has(n.id));
//     return { nodes, links };
//   }, [activeFilters]);

//   return (
//     <div className="w-full min-h-screen bg-gray-100 p-10">
//       <div className="p-10 flex flex-row px-10 gap-6 flex-wrape">
//         <div className="w-full flex flex-row justify-between bg-white gap-10 border-gray-200 rounded-3xl text-gray-700 hover:bg-gray-50 hover:shadow-sm py-4">
//           {selectedNode ? (
//             <div className="flex items-center space-x-4 ml-4">
//               <img
//                 src={selectedNode.image ?? 'https://via.placeholder.com/64'}
//                 className="rounded-full w-14 h-14"
//               />
//               <div>
//                 <h2 className="text-lg font-semibold">{selectedNode.name}</h2>
//                 <p className="text-xs text-gray-400 font-semibold">
//                   {selectedNode.type} · {selectedNode.location ?? 'Unknown'}
//                 </p>
//               </div>
//             </div>
//           ) : (
//             <div className="flex items-center space-x-4 ml-4">
//               <img
//                 src="https://via.placeholder.com/64"
//                 alt="placeholder"
//                 className="rounded-full w-14 h-14"
//               />
//               <div>
//                 <h2 className="text-lg font-semibold">No HCP selected</h2>
//                 <p className="text-xs text-gray-400 font-semibold">
//                   Please click on a node
//                 </p>
//               </div>
//             </div>
//           )}

//           <div className="flex flex-col px-4">
//             <div className="flex flex-row">
//               <div className="flex flex-row gap-2 px-2">
//                 <span className="text-xs text-gray-400 font-semibold">
//                   Peers
//                 </span>
//                 <span className="text-xs text-black-400 font-bold">
//                   {selectedNode?.peerCount ?? '—'}
//                 </span>
//               </div>
//               <div className="flex flex-row gap-2 px-2">
//                 <span className="text-xs text-gray-400 font-semibold">
//                   Following
//                 </span>
//                 <span className="text-xs text-black-400 font-bold">
//                   {selectedNode?.followingCount ?? '—'}
//                 </span>
//               </div>
//             </div>
//             <div className="px-2 py-1">
//               <PrimaryButton
//                 label="Create Web"
//                 onClick={() => console.log('Clicked')}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="w-94 bg-white border-gray-200 rounded-3xl text-gray-700 hover:bg-gray-50 hover:shadow-sm py-4">
//           <div className="flex w-full items-center space-x-4 ml-4">
//             <div className="flex flex-col gap-4">
//               <ToggleSwitch
//                 label="Show connections"
//                 checked={true}
//                 onChange={(value) => console.log('Toggle is now', value)}
//               />
//               <ToggleSwitch
//                 label="Show my connections on map"
//                 checked={true}
//                 onChange={(value) => console.log('Toggle is now', value)}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="px-10 w-full">
//         <div className="px-4 w-full flex flex-row justify-between bg-white gap-10 border-gray-200 rounded-3xl text-gray-700 hover:bg-gray-50 hover:shadow-sm py-4">
//           <div className="flex w-full flex-row gap-4">
//             <div className="w-full">
//               <SearchBar
//                 data={mockData.nodes}
//                 onSelect={(node) => {
//                   setSelectedNode(node);
//                   setSearchQuery(node.name);
//                 }}
//               />
//             </div>
//             <div className="w-80">
//               <FilterSelector
//                 selected={activeFilters}
//                 options={['Co-authorship', 'Workplace', 'Education']}
//                 onChange={setActiveFilters}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="px-10 my-4">
//         <span className="text-2xl text-gray-700 font-semibold">
//           Peer Spaces
//         </span>
//       </div>

//       <div className="flex flex-col gap-6 md:flex-row h-full mt-4 mx-10 shadow-md rounded-3xl p-2">
//         <aside className="w-full md:w-1/3 lg:w-1/4 overflow-y-auto h-[700px] pr-4 scrollbar-thumb-gray-100 scrollbar-thin [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-500">
//           {selectedNode ? (
//             <>
//               <div className="flex flex-col shadow-md rounded-3xl items-center space-x-4">
//                 <div className="flex flex-col bg-white items-center space-x-4 p-4 shadow-md rounded-3xl">
//                   <img
//                     src={selectedNode.image ?? 'https://via.placeholder.com/64'}
//                     className="rounded-full w-16 h-16"
//                   />
//                   <div className="flex flex-col gap-4 text-center">
//                     <h1 className="text-xl text-black font-semibold">
//                       {selectedNode.name}
//                     </h1>
//                     <div className="flex justify-center flex-wrap gap-2">
//                       <div className="bg-gray-100 rounded-lg px-2">
//                         <span className="text-xs text-gray-500">
//                           {selectedNode.type}
//                         </span>
//                       </div>
//                       {selectedNode.location && (
//                         <div className="bg-gray-100 rounded-lg px-2">
//                           <span className="text-xs text-gray-500">
//                             {selectedNode.location}
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                     <p className="text-xs text-gray-400 font-semibold">
//                       {selectedNode.bio ?? 'No bio available.'}
//                     </p>
//                   </div>

//                   <div className="w-full justify-center flex flex-row gap-5 mt-4">
//                     <div className="flex flex-col gap-2 items-center">
//                       <span className="text-xs text-gray-500 font-semibold">
//                         Peers
//                       </span>
//                       <span className="text-xs text-gray-400 font-semibold">
//                         {selectedNode.peerCount ?? 100}
//                       </span>
//                     </div>
//                     <h1 className="text-gray-400 font-semibold">|</h1>
//                     <div className="flex flex-col gap-2 items-center">
//                       <span className="text-xs text-gray-500 font-semibold">
//                         Following
//                       </span>
//                       <span className="text-xs text-gray-400 font-semibold">
//                         {selectedNode.followingCount ?? 80}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="mt-4 flex flex-row gap-2 w-full">
//                     <PrimaryButton
//                       label="View Profile"
//                       onClick={() => console.log('Clicked')}
//                     />
//                     <PrimaryButton
//                       label="Resume"
//                       onClick={() => console.log('Clicked')}
//                       bgColor="bg-white"
//                       textColor="text-gray-300"
//                       borderColor="border border-gray-300"
//                     />
//                     <button className="p-2 rounded-xl hover:bg-gray-100 border border-gray-300">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="currentColor"
//                         viewBox="0 0 24 24"
//                         className="w-5 h-5 text-gray-800 font-bold"
//                       >
//                         <path d="M12 5.25a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zm0 5.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zm0 5.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white rounded-2xl p-2 mt-4">
//                 <div className="grid grid-cols-2 gap-4 w-full">
//                   <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
//                     <div className="gap-2 flex flex-row">
//                       <HeartIcon className="w-6 h-5 text-gray-400" />
//                       <h4 className="text-xs text-gray-400 font-semibold">
//                         Patients Served
//                       </h4>
//                     </div>
//                     <p className="text-xl text-black font-bold">
//                       {selectedNode.patientsServed ?? 1000}
//                     </p>
//                     <div className="flex flex-row">
//                       <ArrowTrendingUpIcon className="w-4 h-4 text-green-400" />
//                       <span className="text-green-400 text-[10px]">+ 20</span>
//                     </div>
//                   </div>

//                   <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
//                     <div className="gap-2 flex flex-row">
//                       <StarIcon className="w-5 h-5 text-gray-700" />
//                       <h4 className="text-gray-400 text-xs font-semibold">
//                         Success Rate
//                       </h4>
//                     </div>
//                     <p className="text-xl text-black font-bold">
//                       {selectedNode.successRate ?? '95%'}
//                     </p>
//                     <div className="flex flex-row">
//                       <ArrowTrendingUpIcon className="w-4 h-4 text-green-400" />
//                       <span className="text-green-400 text-[10px]">+ 6%</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="ml-2 p-2 w-full">
//                   <h3 className="text-md font-semibold mb-2 text-gray-700">
//                     About
//                   </h3>
//                   <p className="text-xs text-gray-400 font-semibold">
//                     {selectedNode.bio ?? 'No details provided.'}
//                   </p>
//                 </div>

//                 <div className="ml-2 p-2 w-full">
//                   <h3 className="text-md font-semibold mb-2 text-gray-700">
//                     Education
//                   </h3>
//                   {selectedNode.education?.length ? (
//                     selectedNode.education.map((edu, index) => (
//                       <div
//                         key={index}
//                         className="bg-gray-50 p-4 rounded-xl shadow-sm flex flex-row gap-2 mb-2"
//                       >
//                         <img
//                           src="https://via.placeholder.com/64"
//                           alt="school"
//                           className="rounded-lg w-12 h-12"
//                         />
//                         <div>
//                           <h3 className="text-sm font-semibold text-gray-700">
//                             {edu.school}
//                           </h3>
//                           <p className="text-xs text-gray-400 font-semibold">
//                             {edu.degree}
//                             <br />
//                             {edu.duration}
//                           </p>
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <p className="text-xs text-gray-400 font-semibold">
//                       No education info.
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </>
//           ) : (
//             <div className="p-4 text-center text-gray-400 text-sm">
//               Select a node from the graph to view HCP details.
//             </div>
//           )}
//         </aside>

//         <div className="flex-1 bg-white border border-gray-200 rounded-2xl text-gray-700 hover:bg-gray-50 hover:shadow-sm p-4 overflow-hidden">
//           <div className="h-[600px] w-full">
//             <GraphCanvas
//               data={filteredData}
//               centralNode={centralNode}
//               onNodeClick={(node: NodeData) => setSelectedNode(node)}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import SearchBar from './SearchBar';
import rawMockData from '../data/mockGraphml.json';
import ToggleSwitch from './ToggleSwitch';
import PrimaryButton from './PrimaryButton';
import {
  HeartIcon,
  StarIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';
import FilterSelector from './FilterSelecter';

interface Education {
  school: string;
  degree: string;
  duration: string;
}

interface NodeData {
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
}

interface LinkData {
  source: string;
  target: string;
  label: string;
}

interface GraphData {
  nodes: NodeData[];
  links: LinkData[];
}

const mockData = rawMockData as GraphData;

const GraphCanvas = dynamic(() => import('./GraphCanvas'), {
  ssr: false,
});

export default function Home() {
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const centralNode = useMemo<NodeData | undefined>(() => {
    return mockData.nodes.find(
      (node) => node.name?.toLowerCase() === searchQuery.toLowerCase()
    );
  }, [searchQuery]);

  const filteredData = useMemo<GraphData>(() => {
    if (!activeFilters.length) return mockData;

    const links = mockData.links.filter((link) =>
      activeFilters.includes(link.label)
    );
    const nodeIds = new Set(links.flatMap((l) => [l.source, l.target]));
    const nodes = mockData.nodes.filter((n) => nodeIds.has(n.id));
    return { nodes, links };
  }, [activeFilters]);

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4 md:p-10">
      <div className="p-4 md:p-10 flex flex-col md:flex-row flex-wrap gap-6">
        <div className="w-full flex flex-col md:flex-row justify-between gap-4 md:gap-10">
          <div className="w-full flex flex-col md:flex-row justify-between bg-white gap-4 md:gap-10 border-gray-200 rounded-3xl text-gray-700 hover:bg-gray-50 hover:shadow-sm py-4">
            {selectedNode ? (
              <div className="flex items-center space-x-4 ml-4">
                <img src={'/avatar.jpeg'} className="rounded-full w-14 h-14" />
                <div>
                  <h2 className="text-lg font-semibold">{selectedNode.name}</h2>
                  <p className="text-xs text-gray-400 font-semibold">
                    {selectedNode.type} · {selectedNode.location ?? 'Unknown'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4 ml-4">
                <img
                  src={'/avtrSelect.png'}
                  className="rounded-full w-14 h-14"
                />
                <div>
                  <h2 className="text-lg font-semibold">No HCP selected</h2>
                  <p className="text-xs text-gray-400 font-semibold">
                    Please click on a node
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col px-4">
              <div className="flex flex-row">
                <div className="flex flex-row gap-2 px-2">
                  <span className="text-xs text-gray-400 font-semibold">
                    Peers
                  </span>
                  <span className="text-xs text-black-400 font-bold">
                    {selectedNode?.peerCount ?? '—'}
                  </span>
                </div>
                <div className="flex flex-row gap-2 px-2">
                  <span className="text-xs text-gray-400 font-semibold">
                    Following
                  </span>
                  <span className="text-xs text-black-400 font-bold">
                    {selectedNode?.followingCount ?? '—'}
                  </span>
                </div>
              </div>
              <div className="px-2 py-1">
                <PrimaryButton
                  label="Create Web"
                  onClick={() => console.log('Clicked')}
                />
              </div>
            </div>
          </div>

          <div className="w-full md:w-[24rem] bg-white border-gray-200 rounded-3xl text-gray-700 hover:bg-gray-50 hover:shadow-sm py-4">
            <div className="flex w-full items-center space-x-4 ml-4">
              <div className="flex flex-col gap-4">
                <ToggleSwitch
                  label="Show connections"
                  checked={true}
                  onChange={(value) => console.log('Toggle is now', value)}
                />
                <ToggleSwitch
                  label="Show my connections on map"
                  checked={true}
                  onChange={(value) => console.log('Toggle is now', value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-10 w-full">
        <div className="px-4 w-full flex flex-col md:flex-row justify-between bg-white gap-4 md:gap-10 border-gray-200 rounded-3xl text-gray-700 hover:bg-gray-50 hover:shadow-sm py-4">
          <div className="flex w-full flex-col md:flex-row gap-4">
            <div className="w-full">
              <SearchBar
                data={mockData.nodes}
                onSelect={(node) => {
                  setSelectedNode(node);
                  setSearchQuery(node.name);
                }}
              />
            </div>
            <div className="w-full md:w-80">
              <FilterSelector
                selected={activeFilters}
                options={['Co-authorship', 'Workplace', 'Education']}
                onChange={setActiveFilters}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-10 my-4">
        <span className="text-2xl text-gray-700 font-semibold">
          Peer Spaces
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-6 h-full mt-4 mx-4 md:mx-10 shadow-md rounded-3xl p-2">
        <aside className="w-full md:w-1/3 lg:w-1/4 overflow-y-auto h-[700px] pr-4 scrollbar-thumb-gray-100 scrollbar-thin [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-500">
          {selectedNode ? (
            <>
              <div className="flex flex-col shadow-md rounded-3xl items-center space-x-4">
                <div className="flex flex-col bg-white w-full items-center space-x-4 p-4 shadow-md rounded-3xl">
                  <img
                    src={'/avatar.jpeg'}
                    className="rounded-full w-14 h-14"
                  />
                  <div className="flex flex-col gap-4 text-center">
                    <h1 className="text-xl text-black font-semibold">
                      {selectedNode.name}
                    </h1>
                    <div className="flex justify-center flex-wrap gap-2">
                      <div className="bg-gray-100 rounded-lg px-2">
                        <span className="text-xs text-gray-500">
                          {selectedNode.type}
                        </span>
                      </div>
                      {selectedNode.location && (
                        <div className="bg-gray-100 rounded-lg px-2">
                          <span className="text-xs text-gray-500">
                            {selectedNode.location}
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 font-semibold">
                      {selectedNode.bio ?? 'No bio available.'}
                    </p>
                  </div>

                  <div className="w-full justify-center flex flex-row gap-5 mt-4">
                    <div className="flex flex-col gap-2 items-center">
                      <span className="text-xs text-gray-500 font-semibold">
                        Peers
                      </span>
                      <span className="text-xs text-gray-400 font-semibold">
                        {selectedNode.peerCount ?? 100}
                      </span>
                    </div>
                    <h1 className="text-gray-400 font-semibold">|</h1>
                    <div className="flex flex-col gap-2 items-center">
                      <span className="text-xs text-gray-500 font-semibold">
                        Following
                      </span>
                      <span className="text-xs text-gray-400 font-semibold">
                        {selectedNode.followingCount ?? 80}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-row gap-2 w-full">
                    <PrimaryButton
                      label="View Profile"
                      onClick={() => console.log('Clicked')}
                    />
                    <PrimaryButton
                      label="Resume"
                      onClick={() => console.log('Clicked')}
                      bgColor="bg-white"
                      textColor="text-gray-300"
                      borderColor="border border-gray-300"
                    />
                    <button className="p-2 rounded-xl hover:bg-gray-100 border border-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 text-gray-800 font-bold"
                      >
                        <path d="M12 5.25a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zm0 5.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zm0 5.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-2 mt-4">
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                    <div className="gap-2 flex flex-row">
                      <HeartIcon className="w-6 h-5 text-gray-400" />
                      <h4 className="text-xs text-gray-400 font-semibold">
                        Patients Served
                      </h4>
                    </div>
                    <p className="text-xl text-black font-bold">
                      {selectedNode.patientsServed ?? 1000}
                    </p>
                    <div className="flex flex-row">
                      <ArrowTrendingUpIcon className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 text-[10px]">+ 20</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                    <div className="gap-2 flex flex-row">
                      <StarIcon className="w-5 h-5 text-gray-700" />
                      <h4 className="text-gray-400 text-xs font-semibold">
                        Success Rate
                      </h4>
                    </div>
                    <p className="text-xl text-black font-bold">
                      {selectedNode.successRate ?? '95%'}
                    </p>
                    <div className="flex flex-row">
                      <ArrowTrendingUpIcon className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 text-[10px]">+ 6%</span>
                    </div>
                  </div>
                </div>

                <div className="ml-2 p-2 w-full">
                  <h3 className="text-md font-semibold mb-2 text-gray-700">
                    About
                  </h3>
                  <p className="text-xs text-gray-400 font-semibold">
                    {selectedNode.bio ?? 'No details provided.'}
                  </p>
                </div>

                <div className="ml-2 p-2 w-full">
                  <h3 className="text-md font-semibold mb-2 text-gray-700">
                    Education
                  </h3>
                  {selectedNode.education?.length ? (
                    selectedNode.education.map((edu, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-4 rounded-xl shadow-sm flex flex-row gap-2 mb-2"
                      >
                        <img
                          src={'/eduAvtar.webp'}
                          className="rounded-lg w-12 h-12"
                        />
                        <div>
                          <h3 className="text-sm font-semibold text-gray-700">
                            {edu.school}
                          </h3>
                          <p className="text-xs text-gray-400 font-semibold">
                            {edu.degree}
                            <br />
                            {edu.duration}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 font-semibold">
                      No education info.
                    </p>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="p-4 text-center text-gray-400 text-sm">
              Select a node from the graph to view HCP details.
            </div>
          )}
        </aside>

        <div className="flex-1 bg-white border border-gray-200 rounded-2xl text-gray-700 hover:bg-gray-50 hover:shadow-sm p-4 overflow-hidden">
          <div className="h-[300px] md:h-[600px] w-full">
            <GraphCanvas
              data={filteredData}
              centralNode={centralNode}
              onNodeClick={(node: NodeData) => setSelectedNode(node)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
