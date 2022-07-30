import React, { useEffect, useState } from 'react';

import { Route, Routes, useLocation } from 'react-router-dom';
import SocialSideBar from './layout/SocialSideBar';
import Header from './layout/Header';
import RoutesApp from './routes/Routes.app';

const App: React.FunctionComponent = () => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)
  const [menuIsLigth, setMenuIsLigth] = useState<boolean>(false)
  const [headerTitle, setHeaderTitle] = useState<string>()

  const location = useLocation()

  const handleClickMenu = (value: boolean) => {
    setMenuIsOpen(value)
    value ? 
    document.body.classList.add('heigth-auto') :
    document.body.classList.remove('heigth-auto')
  }

  useEffect(() => {
    const route = RoutesApp.getRouteByPath(location.pathname)
    setHeaderTitle(route?.headerTitle)
    setMenuIsLigth(route?.menuIconLigth ?? false)
  }, [location])

  return (
    <div data-testid="app" className="react-app">      
      <Header onClick={handleClickMenu} menuIsOpen={menuIsOpen} menuIsLigth={menuIsLigth} headerTitle={headerTitle} />
      <main className={`${menuIsOpen ? 'scale' : ''}`}>
        <Routes>
          { RoutesApp.routeList.map(({ path, Component, title }) => (
            <Route key={path} path={path} element={<Component title={title} />} /> 
          ))}
        </Routes>
      </main>
      <SocialSideBar menuIsOpen={menuIsOpen} />     
    </div>
  );
}

export default App;
