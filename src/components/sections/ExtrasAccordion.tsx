import React, { useState } from 'react';
import Hackathons from './Hackathons';
import Coding from './Coding';
import Ambassador from './Ambassdor';
import CorriculumActivities from './CorriculumActivities';

const ExtrasAccordion = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  return (
    <div className="flex flex-col gap-12 w-full overflow-hidden pb-10">
      {<Hackathons isOpen={expandedId === 'hackathons'} onToggle={() => toggleSection('hackathons')} />}
      {/* {<Coding isOpen={expandedId === 'coding'} onToggle={() => toggleSection('coding')} />} */}
      <Ambassador isOpen={expandedId === 'Ambassador'} onToggle={() => toggleSection('Ambassador')} />
      <CorriculumActivities isOpen={expandedId === 'Corriculum-Activities'} onToggle={() => toggleSection('Corriculum-Activities')} />
    </div>
  );
};

export default ExtrasAccordion;
