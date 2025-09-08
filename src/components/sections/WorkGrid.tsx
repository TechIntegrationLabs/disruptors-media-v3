import React from 'react';
import { Link } from 'react-router-dom';

interface WorkItem {
  id: number;
  title: string;
  category: string;
  image: string;
  slug: string;
}

interface WorkGridProps {
  portfolio: WorkItem[];
}

const WorkGrid: React.FC<WorkGridProps> = ({ portfolio }) => {
  return (
    <section className="w-full">
      <div className="container-custom">
        {/* 2-Column Grid - PRD Specification */}
        <div className="work-grid grid grid-cols-1 md:grid-cols-2">
          {portfolio.map((item, index) => (
            <div 
              key={item.id}
              className={`col-item ${index % 2 === 0 ? 'pr-0' : 'border-l border-pure-black pl-0'}`}
              style={{ 
                minHeight: '914px'
              }}
            >
              <Link to={`/work/${item.slug}`} className="block">
                {/* Featured Image */}
                <div className="w-full">
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Project Details Container - PRD Specification */}
                <div 
                  className="project-details"
                  style={{ padding: '20px 30px 110px 30px' }}
                >
                  {/* Project Title - PRD H3 Specification */}
                  <h3 
                    className="text-brand-charcoal"
                    style={{
                      fontFamily: 'var(--font-secondary)',
                      fontSize: '39px',
                      fontWeight: 600,
                      textTransform: 'uppercase'
                    }}
                  >
                    {item.title}
                  </h3>

                  {/* Project Category - PRD Specification */}
                  <p 
                    className="text-brand-charcoal"
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontSize: '16px',
                      fontWeight: 400,
                      lineHeight: '30px',
                      textTransform: 'uppercase',
                      marginBottom: '0px'
                    }}
                  >
                    {item.category}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkGrid;