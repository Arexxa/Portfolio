import { CrtOverlay } from '@/components/layout/CrtOverlay'
import { Footer } from '@/components/layout/Footer'
import { SkipLink } from '@/components/layout/SkipLink'
import { StatusBar } from '@/components/layout/StatusBar'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { useHotkey } from '@/hooks/useHotkey'
import { AboutSection } from '@/features/about/AboutSection'
import { BootSequence } from '@/features/boot/BootSequence'
import { useBootSequence } from '@/features/boot/useBootSequence'
import { ContactSection } from '@/features/contact/ContactSection'
import { ExperienceSection } from '@/features/experience/ExperienceSection'
import { Hero } from '@/features/hero/Hero'
import { useActiveSection } from '@/features/navigation/useActiveSection'
import { useDeepLink } from '@/features/navigation/useDeepLink'
import { useSectionNavigation } from '@/features/navigation/useSectionNavigation'
import { ProjectModal } from '@/features/projects/ProjectModal'
import { ProjectsSection } from '@/features/projects/ProjectsSection'
import { SkillsSection } from '@/features/skills/SkillsSection'
import { TerminalDock } from '@/features/terminal/TerminalDock'
import { useTerminal } from '@/features/terminal/useTerminal'

const sectionFallback = (
  <p className="mx-auto max-w-6xl px-5 py-16 text-danger sm:px-8">This section failed to load.</p>
)

/** App shell: boot overlay, status bar, the desktop + content windows, dock and dialogs. */
export function App() {
  const boot = useBootSequence()
  const navigate = useSectionNavigation()
  const active = useActiveSection()
  const { dockOpen, toggleTerminal } = useTerminal()
  useHotkey('`', toggleTerminal, boot.done)
  useDeepLink(boot.done, navigate)

  return (
    <>
      <BootSequence state={boot} />
      <div inert={!boot.done}>
        <SkipLink />
        <StatusBar
          active={active}
          onNavigate={navigate}
          terminalOpen={dockOpen}
          onToggleTerminal={toggleTerminal}
        />
        <main id="main" tabIndex={-1} className="outline-none">
          <Hero booted={boot.done} onNavigate={navigate} />
          <ErrorBoundary fallback={sectionFallback}>
            <AboutSection />
            <ExperienceSection />
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
      <TerminalDock />
      <ProjectModal />
      <CrtOverlay />
    </>
  )
}
