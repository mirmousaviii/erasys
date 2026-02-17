import { Route, Routes } from 'react-router-dom';
import { Footer, Header } from '../components';
import { HomePage, ProfilePage } from '../pages';

export function App() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 antialiased">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
