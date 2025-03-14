// import LiveBlocksProvider from '@/components/LiveBlocksProvider';
// import React from 'react'

// const PageLayout = ({children}:{
//     children: React.ReactNode
// }) => {
//     return (
//         <LiveBlocksProvider>
//             {children}
//         </LiveBlocksProvider>
//     )
// }

// export default PageLayout;

export default function Layout({
    children,
    params,
  }: {
    children: React.ReactNode;
    params: { id: string };
  }) {
    return (
      <div>
        <h1>Document ID: {params.id}</h1>
        {children}
      </div>
    );
  }
  
