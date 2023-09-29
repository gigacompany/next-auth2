"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter} from 'next/navigation';
import { AiFillHome } from 'react-icons/ai';
const Breadcrumbs = () => {
  const router = useRouter();
  // const { pathname } = router;
  const pathname = usePathname()
  const generateBreadcrumbs = () => {
    const pathSegments = pathname?.split('/').filter((segment) => segment !== '');
    const breadcrumbs = [];
    
    <div>
       breadcrumbs.push(
      <Link key="home" style={{ color: '#006BB4' }} href="/"><AiFillHome size={25} /></Link>
    );
    </div>
   
    let path = '';
    for (let i = 0; i < pathSegments?.length; i++) {
      path += `/${pathSegments[i]}`;
      const linkText = pathSegments[i].charAt(0).toUpperCase() + pathSegments[i].slice(1);
      if (i === pathSegments.length - 1) {
        breadcrumbs.push(
          <span key={path}>
            {' / '}
            {linkText}
          </span>
        );
      } else {
        breadcrumbs.push(
          <span key={path}>
            {' / '}
            <Link style={{ color: '#006BB4' }} href={path}>{linkText}</Link>
          </span>
        );
      }
    }
    return breadcrumbs;
  };
  return <div>{generateBreadcrumbs()}</div>;
};
export default Breadcrumbs;