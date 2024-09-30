import { Link } from 'react-router-dom';
import './App.css';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './components/ui/card';
// import ColorThemePicker from './components/ColorThemePicker/ColorThemePicker';
// import { useThemeStore } from './store/theme';

function App() {
  // const themes = useThemeStore((state) => state.themes);
  // const theme = useThemeStore((state) => state.theme);

  return (
    <main
      className={`px-12 py-8  h-screen overflow-hidden items-center flex w-full justify-center`}
    >
      {/* <ColorThemePicker themes={themes} theme={theme} /> */}
      {/* <Chat /> */}
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>App's</CardTitle>
          <CardDescription>Preview projects</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
          <Link to={'/chat'}>
            <Card className="hover:border-secondary-foreground">
              <CardHeader>
                <CardTitle>Chat</CardTitle>
                <CardDescription>Web socket real time chat</CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link to={'/map'}>
            <Card className="hover:border-secondary-foreground">
              <CardHeader>
                <CardTitle>Map</CardTitle>
                <CardDescription>Route optimizer</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}

export default App;
