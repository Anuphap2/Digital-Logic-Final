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
      <div className="min-h-screen flex flex-col bg-[#faf9f5] dark:bg-[#181715] text-[#141413] dark:text-[#faf9f5] transition-colors selection:bg-[#cc785c]/30 selection:text-[#141413] dark:selection:text-[#faf9f5]">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
