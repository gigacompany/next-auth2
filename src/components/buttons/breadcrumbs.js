// import React from "react";

// const Breadcrumb = ({ crumbs }) => {
//   return (
//     <nav className="text-sm text-gray-500 dark:text-gray-300">
//       <ul className="flex">
//         {crumbs.map((crumb, index) => (
//           <li key={index} className="flex items-center">
//             {index > 0 && <span className="mx-2">/</span>}
//             <span>{crumb}</span>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default Breadcrumb;

// components/Breadcrumbs.js
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';

// const Breadcrumbs = () => {
//   const router = useRouter();
//   const pathSegments = router.asPath?.split('/').filter(Boolean);

//   return (
//     <nav>
//       <ul>
//         <li><Link href="/">Dashboard</Link></li>
//         {pathSegments?.map((segment, index) => (
//           <li key={index}><Link href={`/${pathSegments.slice(0, index + 1).join('/')}`}>{segment}</Link></li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default Breadcrumbs;


const home  = styled(BsFillArchiveFill)`
  color: purple;
  transform: scale(2);
  margin: 5%;
`;