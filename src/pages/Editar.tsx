import React, { useState, useEffect } from 'react';
import {
  IonModal, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonList
} from '@ionic/react';

interface EditPetModalProps {
  isOpen: boolean;
  onClose: () => void;
  pet: any;
  onSave: (editedPet: any) => void;
}

const EditPetModal: React.FC<EditPetModalProps> = ({ isOpen, onClose, pet, onSave }) => {
  const [editedPet, setEditedPet] = useState(pet);

  useEffect(() => {
    setEditedPet(pet);
  }, [pet]);

  const handleSave = () => {
    onSave(editedPet);
    onClose();
  };

  const handleInputChange = (e: any, field: string) => {
    setEditedPet({ ...editedPet, [field]: e.detail.value });
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Editar Pet</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel position="floating">Nome</IonLabel>
            <IonInput
              value={editedPet.nome}
              onIonChange={(e) => handleInputChange(e, 'nome')}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Data de Nascimento</IonLabel>
            <IonInput
              value={editedPet.dataNascimento}
              onIonChange={(e) => handleInputChange(e, 'dataNascimento')}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Sexo</IonLabel>
            <IonInput
              value={editedPet.sexo}
              onIonChange={(e) => handleInputChange(e, 'sexo')}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Espécie</IonLabel>
            <IonInput
              value={editedPet.especie}
              onIonChange={(e) => handleInputChange(e, 'especie')}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Raça</IonLabel>
            <IonInput
              value={editedPet.raca}
              onIonChange={(e) => handleInputChange(e, 'raca')}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Observações</IonLabel>
            <IonInput
              value={editedPet.observacoes}
              onIonChange={(e) => handleInputChange(e, 'observacoes')}
            />
          </IonItem>
        </IonList>
        <IonButton expand="full" onClick={handleSave}>Salvar</IonButton>
        <IonButton expand="full" color="medium" onClick={onClose}>Cancelar</IonButton>
      </IonContent>
    </IonModal>
  );
};

export default EditPetModal;
