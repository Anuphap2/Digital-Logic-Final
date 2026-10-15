import React from 'react';
import { AnalogVsDigitalVisualizer } from './AnalogVsDigitalVisualizer';
import { LogicGatePinoutVisualizer } from './LogicGatePinoutVisualizer';
import { ChopperUniversalVisualizer } from './ChopperUniversalVisualizer';
import { AdderDacVisualizer } from './AdderDacVisualizer';
import { DeMorganVisualizer } from './DeMorganVisualizer';
import { CanonicalFormsVisualizer } from './CanonicalFormsVisualizer';
import { StaticHazardVisualizer } from './StaticHazardVisualizer';
import { SRLatchVisualizer } from './SRLatchVisualizer';
import { FlipFlopTimingVisualizer } from './FlipFlopTimingVisualizer';
import { ShiftRegisterVisualizer } from './ShiftRegisterVisualizer';
import { RippleCounterVisualizer } from './RippleCounterVisualizer';
import { NE555AstableVisualizer } from './NE555AstableVisualizer';
import { PeopleCounterVisualizer } from './PeopleCounterVisualizer';
import { LogicFamiliesVisualizer } from './LogicFamiliesVisualizer';

interface LessonVisualizerSelectorProps {
  lessonId: string;
}

export const LessonVisualizerSelector: React.FC<LessonVisualizerSelectorProps> = ({ lessonId }) => {
  const renderVisualizer = () => {
    switch (lessonId) {
      case 'ch3-1':
        return <AnalogVsDigitalVisualizer />;
      case 'ch3-2':
        return <LogicGatePinoutVisualizer />;
      case 'ch3-3':
        return <ChopperUniversalVisualizer />;
      case 'ch3-4':
        return <AdderDacVisualizer />;
      case 'ch3-5':
        return <LogicFamiliesVisualizer />;
      case 'ch4-1':
        return <DeMorganVisualizer />;
      case 'ch4-2':
        return <CanonicalFormsVisualizer />;
      case 'ch4-4':
        return <StaticHazardVisualizer />;
      case 'ch5-1':
        return <SRLatchVisualizer />;
      case 'ch5-2':
        return <FlipFlopTimingVisualizer />;
      case 'ch5-3':
        return <ShiftRegisterVisualizer />;
      case 'ch5-4':
        return <RippleCounterVisualizer />;
      case 'ch5-5':
        return <NE555AstableVisualizer />;
      case 'ch5-6':
        return <PeopleCounterVisualizer />;
      default:
        return null;
    }
  };

  const comp = renderVisualizer();
  if (!comp) return null;
  return <div data-visualizer={lessonId}>{comp}</div>;
};
