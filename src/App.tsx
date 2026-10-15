import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { ClassroomView } from './components/ClassroomView';
import { SimulatorsView } from './components/SimulatorsView';
import { CheatSheetView } from './components/CheatSheetView';
import { ExamSimulatorView } from './components/ExamSimulatorView';
import { Footer } from './components/Footer';

const MainContent: React.FC = () => {
  const { currentTab } = useApp();

  return (
    <main className="flex-1">
      {currentTab === 'dashboard' && <DashboardView />}
      {currentTab === 'classroom' && <ClassroomView />}
      {currentTab === 'simulators' && <SimulatorsView />}
      {currentTab === 'cheatsheet' && <CheatSheetView />}
      {currentTab === 'exam' && <ExamSimulatorView />}
    </main>
  );
};

export function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-[#f8f9fe] dark:bg-[#0b0f19] text-[#0f172a] dark:text-[#f8fafc] transition-colors selection:bg-[#0066cc]/20 selection:text-[#0066cc]">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
