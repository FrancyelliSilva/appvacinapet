import {IonList, IonInput, IonItem, IonContent, IonHeader, IonPage, IonTitle,
  IonToolbar, IonButton, IonSelect, IonLabel, IonText,
  IonDatetime} from '@ionic/react';
import Especie from '../components/Especie';
import Sexo from '../components/sexo';
import { useState } from 'react';
import {useHistory } from 'react-router-dom';
import './Adicionar.css';

const Adicionar: React.FC = () => {
  const [showPicker, setShowPicker] = useState(false);
  
  const [formData, setFormData] = useState({
    nome: '', 
    dataNascimento: '',
    sexo: '',
    especie: '',
    raca: '',
    observacoes: ''
  });

  const [errors, setErrors] = useState({
    nome: '',
    sexo: '',
    especie: '',
    raca: '' ,
    observacoes: ''
  });

  const history = useHistory();

  const handleDateChange = (e: any) => {
    const value = e.detail.value;
    setFormData({ ...formData, dataNascimento: value });
    setShowPicker(false);
  };
  
  const handleFormChange = (e: any) => {
    const { name, value } = e.target;
    if (name === 'observacoes'){
      setFormData({ ...formData, observacoes: value });
    }else {
      setFormData({ ...formData, [name]: value.trim()});
    }
  
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { nome: '', sexo: '', especie: '', raca: '', observacoes: ''};

    if (!formData.nome) {
      newErrors.nome = 'O nome é obrigatório';
      valid = false;
    }
    if (!formData.sexo) {
      newErrors.sexo = 'O sexo é obrigatório';
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
    if (!formData.observacoes) {
      newErrors.observacoes = 'As observações são obrigatórias';
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
      sexo: '',
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
          <IonTitle class="ion-text-center">ADICIONAR PET</IonTitle>
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
                    <IonLabel position="floating">Data de nascimento:</IonLabel>
                      <IonInput name="dataNascimento" value={formData.dataNascimento} onIonFocus={() => setShowPicker(true)} onIonChange={handleFormChange}
                        pattern="\d{2}/\d{2}/\d{4}" title="Formato esperado: dd/mm/aaaa"/>
                            {showPicker && (
                <IonDatetime presentation="date" min="1994-03-14" max="2050-12-14" value={formData.dataNascimento} onIonChange={handleDateChange}
                />
            )}
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Sexo:</IonLabel>
                  <IonSelect name="sexo" value={formData.sexo} onIonChange={handleFormChange} interface="popover" className='ion-alignement-center'>
                    <Sexo/>
                  </IonSelect>
                {errors.sexo && <IonText color="danger">{errors.sexo}</IonText>}
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
                    <IonInput name="observacoes" value={formData.observacoes} onIonChange={handleFormChange} type="text" />
                     {errors.observacoes && <IonText color = "danger">{errors.observacoes}</IonText>} 
                </IonItem>
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
