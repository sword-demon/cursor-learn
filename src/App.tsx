import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { ProgressProvider } from './contexts/ProgressContext';
import { TutorialProvider } from './contexts/TutorialContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { ScrollToTop } from './components/common/ScrollToTop';
import { MobileWarning } from './components/common/MobileWarning';

// 路由级代码分割
const HomePage = lazy(() =>
  import('./pages/Home/HomePage').then(m => ({ default: m.HomePage }))
);
const InstallationPage = lazy(() =>
  import('./pages/Installation/InstallationPage').then(m => ({ default: m.InstallationPage }))
);
const CommandsPage = lazy(() =>
  import('./pages/Commands/CommandsPage').then(m => ({ default: m.CommandsPage }))
);
const CommandTutorial = lazy(() =>
  import('./components/tutorial/CommandTutorial').then(m => ({ default: m.CommandTutorial }))
);
const RulesBuilderPage = lazy(() =>
  import('./pages/RulesBuilder/RulesBuilderPage').then(m => ({ default: m.RulesBuilderPage }))
);
const ProjectTutorialPage = lazy(() =>
  import('./pages/ProjectTutorial/ProjectTutorialPage').then(m => ({ default: m.ProjectTutorialPage }))
);
const ConfigPage = lazy(() =>
  import('./pages/Config/ConfigPage').then(m => ({ default: m.ConfigPage }))
);
const IgnoreFilesPage = lazy(() =>
  import('./pages/Config/IgnoreFilesPage').then(m => ({ default: m.IgnoreFilesPage }))
);
const ShortcutsPage = lazy(() =>
  import('./pages/Config/ShortcutsPage').then(m => ({ default: m.ShortcutsPage }))
);
const ExtensionsPage = lazy(() =>
  import('./pages/Config/ExtensionsPage').then(m => ({ default: m.ExtensionsPage }))
);
const ThemesPage = lazy(() =>
  import('./pages/Config/ThemesPage').then(m => ({ default: m.ThemesPage }))
);
const ShellPage = lazy(() =>
  import('./pages/Config/ShellPage').then(m => ({ default: m.ShellPage }))
);
const WorktreesPage = lazy(() =>
  import('./pages/Config/WorktreesPage').then(m => ({ default: m.WorktreesPage }))
);
const AgentsPage = lazy(() =>
  import('./pages/Agents/AgentsPage').then(m => ({ default: m.AgentsPage }))
);
const WorkingWithAgentsPage = lazy(() =>
  import('./pages/Agents/WorkingWithAgentsPage').then(m => ({ default: m.WorkingWithAgentsPage }))
);
const UnderstandCodebasePage = lazy(() =>
  import('./pages/Agents/UnderstandCodebasePage').then(m => ({ default: m.UnderstandCodebasePage }))
);
const CreatingFeaturesPage = lazy(() =>
  import('./pages/Agents/CreatingFeaturesPage').then(m => ({ default: m.CreatingFeaturesPage }))
);
const FindingBugsPage = lazy(() =>
  import('./pages/Agents/FindingBugsPage').then(m => ({ default: m.FindingBugsPage }))
);
const ReviewingTestingPage = lazy(() =>
  import('./pages/Agents/ReviewingTestingPage').then(m => ({ default: m.ReviewingTestingPage }))
);
const CustomizingAgentsPage = lazy(() =>
  import('./pages/Agents/CustomizingAgentsPage').then(m => ({ default: m.CustomizingAgentsPage }))
);
const PuttingTogetherPage = lazy(() =>
  import('./pages/Agents/PuttingTogetherPage').then(m => ({ default: m.PuttingTogetherPage }))
);
const SpecKitPage = lazy(() =>
  import('./pages/SpecKit/SpecKitPage').then(m => ({ default: m.SpecKitPage }))
);
const SpecKitInstallPage = lazy(() =>
  import('./pages/SpecKit/SpecKitInstallPage').then(m => ({ default: m.SpecKitInstallPage }))
);
const SpecKitWorkflowPage = lazy(() =>
  import('./pages/SpecKit/SpecKitWorkflowPage').then(m => ({ default: m.SpecKitWorkflowPage }))
);
const SpecKitCasePage = lazy(() =>
  import('./pages/SpecKit/SpecKitCasePage').then(m => ({ default: m.SpecKitCasePage }))
);
const SpecKitAdvancedPage = lazy(() =>
  import('./pages/SpecKit/SpecKitAdvancedPage').then(m => ({ default: m.SpecKitAdvancedPage }))
);

// 页面加载 fallback
function PageLoading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-3 border-[#C41E3A] border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-gray-500">加载中...</span>
      </div>
    </div>
  );
}

// Layout wrapper with sidebar
function TutorialLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="flex pt-[76px]">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <Suspense fallback={<PageLoading />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

// Simple layout without sidebar for home
function SimpleLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main>
        <Suspense fallback={<PageLoading />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ProgressProvider>
        <TutorialProvider>
          <ScrollToTop />
          <MobileWarning />
          <Routes>
            {/* Routes with full layout */}
            <Route element={<TutorialLayout />}>
              <Route path="/installation" element={<InstallationPage />} />
              <Route path="/commands" element={<CommandsPage />} />
              <Route path="/commands/:commandId" element={<CommandTutorial />} />
              <Route path="/rules" element={<RulesBuilderPage />} />
              <Route path="/project" element={<ProjectTutorialPage />} />
              <Route path="/config" element={<ConfigPage />} />
              <Route path="/config/ignore" element={<IgnoreFilesPage />} />
              <Route path="/config/shortcuts" element={<ShortcutsPage />} />
              <Route path="/config/extensions" element={<ExtensionsPage />} />
              <Route path="/config/themes" element={<ThemesPage />} />
              <Route path="/config/shell" element={<ShellPage />} />
              <Route path="/config/worktrees" element={<WorktreesPage />} />
              <Route path="/agents" element={<AgentsPage />} />
              <Route path="/agents/working" element={<WorkingWithAgentsPage />} />
              <Route path="/agents/codebase" element={<UnderstandCodebasePage />} />
              <Route path="/agents/features" element={<CreatingFeaturesPage />} />
              <Route path="/agents/bugs" element={<FindingBugsPage />} />
              <Route path="/agents/review" element={<ReviewingTestingPage />} />
              <Route path="/agents/customize" element={<CustomizingAgentsPage />} />
              <Route path="/agents/together" element={<PuttingTogetherPage />} />
              <Route path="/spec-kit" element={<SpecKitPage />} />
              <Route path="/spec-kit/install" element={<SpecKitInstallPage />} />
              <Route path="/spec-kit/workflow" element={<SpecKitWorkflowPage />} />
              <Route path="/spec-kit/case" element={<SpecKitCasePage />} />
              <Route path="/spec-kit/advanced" element={<SpecKitAdvancedPage />} />
            </Route>

            {/* Simple routes */}
            <Route element={<SimpleLayout />}>
              <Route path="/" element={<HomePage />} />
            </Route>
          </Routes>
        </TutorialProvider>
      </ProgressProvider>
    </BrowserRouter>
  );
}

export default App;
