import React from 'react';
import { IonSelectOption } from '@ionic/react';

const Sexo: React.FC = () => {
    return (
    <div>
    <IonSelectOption value="Fêmea">Fêmea</IonSelectOption>
    <IonSelectOption value="Macho">Macho</IonSelectOption>

    </div>
    );
};

export default Sexo;