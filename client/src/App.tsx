import './App.css';
import Chat from './components/Chat/Chat';
import ColorThemePicker from './components/ColorThemePicker/ColorThemePicker';
import { useThemeStore } from './store/theme';

function App() {
  const themes = useThemeStore((state) => state.themes);
  const theme = useThemeStore((state) => state.theme);

  return (
    <main
      className={`px-12 py-8 theme-${theme} bg-primary h-screen overflow-hidden`}
    >
      <ColorThemePicker themes={themes} theme={theme} />
      <Chat />
    </main>
  );
}

export default App;
