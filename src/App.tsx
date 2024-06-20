import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { archiveOutline,homeOutline, pawOutline} from 'ionicons/icons';
import Inicio from './pages/Inicio';
import Adicionar from './pages/Adicionar';
import Consultar from './pages/Consultar';
import Editar from './components/Editar';
import './pages/Inicio.css'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';



setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/Inicio">
            <Inicio/>
          </Route>
          <Route exact path="/Adicionar">
            <Adicionar />
          </Route>
          <Route path="/Consultar">
            <Consultar />
          </Route>
          <Route exact path="/">
            <Redirect to="/Inicio" />
          </Route>
          <Route exact path="/Editar">
            <Editar />
          </Route>
        </IonRouterOutlet>
        <IonTabBar className='color' slot="bottom">
          <IonTabButton tab="Inicio" href="/Inicio">
            <IonIcon color="light" aria-hidden="true" icon={homeOutline} />
            <IonLabel color="light">Inicio</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Adicionar" href="/Adicionar">
            <IonIcon color="light" aria-hidden="true" icon={pawOutline} />
            <IonLabel color="light">Adicionar</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Consultar" href="/Consultar">
            <IonIcon color="light" aria-hidden="true" icon={archiveOutline} />
            <IonLabel color="light">Consultar</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
