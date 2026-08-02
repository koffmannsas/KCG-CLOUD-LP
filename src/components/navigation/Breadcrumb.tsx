import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumb() {
  const location = useLocation();
  const paths = location.pathname.split('/').filter((p) => p);

  if (paths.length === 0) return null;

  return (
    <nav className="flex items-center space-x-2 text-[10px] font-mono tracking-widest uppercase text-neutral-500 mb-8">
      <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
      {paths.map((path, index) => {
        const routeTo = `/${paths.slice(0, index + 1).join('/')}`;
        const isLast = index === paths.length - 1;
        return (
          <React.Fragment key={path}>
            <ChevronRight className="w-3 h-3" />
            {isLast ? (
              <span className="text-kcg-red">{path.replace(/-/g, ' ')}</span>
            ) : (
              <Link to={routeTo} className="hover:text-white transition-colors">
                {path.replace(/-/g, ' ')}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
