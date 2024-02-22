import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Header from './components/Header';
import MainPageBody from './components/MainPageBody';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import { useEffect, useState } from 'react';

function App() {
  const [headerHeight, setHeaderHeight] = useState(0)
  
  return (
    <div>
      <Header setHeaderHeight={setHeaderHeight} />
      <HeroSection headerHeight={headerHeight} />
      <MainPageBody />
      <Footer />
    </div>
  );
}

export default App;
