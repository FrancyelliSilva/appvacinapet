import React from 'react';
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Inicio.css';


const Inicio: React.FC = () => {
  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle className="ion-text-center"> CARTEIRA DIGITAL VACINA PET </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className='inicio-content'> </IonContent>
    </IonPage>
  );
};

export default Inicio;
