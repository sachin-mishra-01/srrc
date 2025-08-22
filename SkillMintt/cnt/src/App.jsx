
import { Routes, Route } from 'react-router-dom';
import Mnpg from './Pages/Manpg';
import Home from './Pages/Homepg';
import Feed from './Pages/Feed';
//import Homepg from './Pages/Homepg';
import Pfpg from './Pages/Pfpg';
import Cp from './Pages/Cp';
import Ntf from './Pages/Ntfpage';
import Skillpg from './Pages/Skillpg';
import SkillD from './Pages/SkillD';
import Edsk from './Pages/Eds';
import Ntfd from './Pages/Ntfdtl';
import Crs from './Pages/Course';
import Crsd from './Pages/Crsdtl';
import Usp from './Pages/Uspf';

function App() {
  
  
  return (
   <div>
 <Routes>
  <Route path="/" element={<Mnpg />} />
  <Route path="/:username" element={<Home />} >
    <Route index element={<Feed />} />
    <Route path='profile' element={<Pfpg />} />
    <Route path='prf/:uusername' element={<Usp/>}/>
    <Route path='chp' element={<Cp />} />
    <Route path='skill' element={<Skillpg />} />
    <Route path='courses' element={<Crs />}>
      <Route path=":courseId" element={<Crsd/>} />
    </Route>
    <Route path='crsntf' element={<Ntf />} >
      <Route path=":ntfId" element={<Ntfd />} />
    </Route>

    {/* Nested skill routes */}
    <Route path=":skillId" element={<SkillD />}>
      <Route path="chskill" element={<Edsk />} />
    </Route>

  </Route>

  <Route path="*" element={<h2>Page not found</h2>} />
</Routes>


   </div>
  ) 
}

export default App;
