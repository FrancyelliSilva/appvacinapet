// src/components/Editar.tsx
import React, { useState } from 'react';
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from '@ionic/react';

const Editar: React.FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    nome: '',
    dataNascimento: '',
    sexo: '',
    especie: '',
    raca: '',
    observacoes: ''
  });

  const handleInputChange = (e: CustomEvent) => {
    const { name, value } = e.detail;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Adicionar lógica para enviar os dados ao backend, se necessário.
    setIsEditing(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">EDITAR</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={handleSubmit}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked">Nome</IonLabel>
              <IonInput
                name="nome"
                value={formData.nome}
                onIonChange={handleInputChange}
                readonly={!isEditing}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Data de Nascimento</IonLabel>
              <IonInput
                name="dataNascimento"
                type="date"
                value={formData.dataNascimento}
                onIonChange={handleInputChange}
                readonly={!isEditing}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Sexo</IonLabel>
              <IonInput
                name="sexo"
                value={formData.sexo}
                onIonChange={handleInputChange}
                readonly={!isEditing}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Espécie</IonLabel>
              <IonInput
                name="especie"
                value={formData.especie}
                onIonChange={handleInputChange}
                readonly={!isEditing}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Raça</IonLabel>
              <IonInput
                name="raca"
                value={formData.raca}
                onIonChange={handleInputChange}
                readonly={!isEditing}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Observações</IonLabel>
              <IonInput
                name="observacoes"
                value={formData.observacoes}
                onIonChange={handleInputChange}
                readonly={!isEditing}
              />
            </IonItem>
          </IonList>
          <IonButton expand="full" onClick={handleEditClick}>
            {isEditing ? 'Cancelar' : 'Editar'}
          </IonButton>
          {isEditing && (
            <IonButton type="submit" expand="full" color="primary">
              Salvar
            </IonButton>
          )}
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Editar;
