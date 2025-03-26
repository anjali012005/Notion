// import Document from '@/components/Document';
// import React from 'react'

// const DocumentPage = (
//     {
//         params:{id}
//     }:{
//     params: {
//         id:string,
//     };
// }) => {
//     return (
//         <div className='flex flex-col flex-1 min-h-screen'>
//             <Document id={id} />
//         </div>
//     )
// }

// export default DocumentPage;

import Document from "@/components/Document";
import React from "react";

// Props ka type define karo
interface DocumentPageProps {
  params: { id: string };
}

const DocumentPage = ({ params }: DocumentPageProps) => {
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Document id={params.id} />
    </div>
  );
};

export default DocumentPage;