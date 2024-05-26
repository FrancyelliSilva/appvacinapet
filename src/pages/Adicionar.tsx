import {IonList, IonInput, IonItem, IonContent, IonHeader, IonPage, IonTitle,
  IonToolbar, IonButton, IonSelect, IonLabel, IonText} from '@ionic/react';
import Especie from '../components/Especie';
import { useState } from 'react';
import {useHistory } from 'react-router-dom';
import './Adicionar.css';


const Adicionar: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '', 
    dataNascimento: '',
    especie: '',
    raca: '',
    observacoes: ''
  });

  const [errors, setErrors] = useState({
    nome: '',
    dataNascimento: '',
    especie: '',
    raca: ''
  });

  const history = useHistory();
  
  const handleFormChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { nome: '', dataNascimento: '', especie: '', raca: ''};

    if (!formData.nome) {
      newErrors.nome = 'O nome é obrigatório';
      valid = false;
    }
    if (!formData.dataNascimento.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      newErrors.dataNascimento = 'Data de nascimento deve estar no formato dd/mm/aaaa';
      valid = false;
    }
    if (!formData.especie) {
      newErrors.especie = 'A espécie é obrigatória';
      valid = false;
    }
    if (!formData.raca) {
      newErrors.raca = 'A raça é obrigatória';
      valid = false;
    }
  
    setErrors(newErrors);
    return valid;
  };

  
  const handleSaveData = () => {
    if (validateForm()) {
    const newPet = { ...formData };
    const petList = JSON.parse(localStorage.getItem('petList') || '[]');
    petList.push(newPet);
    localStorage.setItem('petList', JSON.stringify(petList));
    setFormData({
      nome: '',
      dataNascimento: '',
      especie: '',
      raca: '',
      observacoes: ''
    });
    history.push('/consultar');
  }
};


    return (
 
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">ADICIONAR</IonTitle>
        </IonToolbar>
      </IonHeader>
          <IonContent fullscreen className='center-content'>
            <form>
              <IonList>
                <IonItem>
                  <IonLabel position="stacked">Nome:</IonLabel>
                    <IonInput name="nome" value={formData.nome} onIonChange={handleFormChange} maxlength={45} type="text" />
              {errors.nome && <IonText color="danger">{errors.nome}</IonText>}
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Data de nascimento:</IonLabel>
                  <IonInput name="dataNascimento" value={formData.dataNascimento} onIonChange={handleFormChange} pattern="\d{2}/\d{2}/\d{4}" title="Formato esperado: dd/mm/aaaa" />
              {errors.dataNascimento && <IonText color="danger">{errors.dataNascimento}</IonText>}
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Espécie:</IonLabel>
                    <IonSelect name="especie" value={formData.especie} onIonChange={handleFormChange} interface="popover" className='ion-alignement-center'>
                  <Especie />
                    </IonSelect>
              {errors.especie && <IonText color="danger">{errors.especie}</IonText>}
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Raça:</IonLabel>
                    <IonInput name="raca" value={formData.raca} onIonChange={handleFormChange} type="search" />
              {errors.raca && <IonText color="danger">{errors.raca}</IonText>}
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Observações:</IonLabel>
                    <IonInput name="observacoes" value={formData.observacoes} onIonChange={handleFormChange} maxlength={100} type="text" />                </IonItem>
              </IonList>
            </form>
                  <div className='center-button'>
                      <IonButton shape="round" onClick={handleSaveData}> Adicionar </IonButton>
                  </div>
      </IonContent>
    </IonPage>
  );
};

export default Adicionar;
