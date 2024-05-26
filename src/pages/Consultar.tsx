import React, { useEffect, useState } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonModal,
  IonList, IonItem, IonLabel, IonInput
} from '@ionic/react';

const Consultar: React.FC = () => {
  const [petList, setPetList] = useState<any[]>([]);
  const [showOuterModal, setShowOuterModal] = useState(false);
  const [showInnerModal, setShowInnerModal] = useState(false);
  const [showAdicionarVermifugoModal, setShowAdicionarVermifugoModal] = useState(false);
  
  const [selectedPet, setSelectedPet] = useState<any>(null);
  
  const [novaVacina, setNovaVacina] = useState({
    nome: '',
    marca: '',
    lote: '',
    dataAplicacao: '',
    proximaAplicacao: '',
    veterinario: ''
  });

  const [showConsultarVacinaModal, setShowConsultarVacinaModal] = useState(false);
  const [errors, setErrors] = useState({
    nome: '',
    marca: '',
    lote: '',
    dataAplicacao: '',
    proximaAplicacao: '',
    veterinario: ''
  });

  
  const [novaVermifugo, setNovaVermifugo] = useState({ 
    nome: '',
    marca: '',
    lote: '',
    dataAplicacao: '',
    proximaAplicacao: ''
  });

  const [showConsultarVermifugoModal, setShowConsultarVermifugoModal] = useState (false);
  const [errorsVermifugo, setErrorsVermifugo] = useState({
    nome: '',
    marca: '',
    lote: '',
    dataAplicacao: '',
    proximaAplicacao: ''
  })
  
 
  useEffect(() => {
    const petList = JSON.parse(localStorage.getItem('petList') || '[]');
    setPetList(petList);
  }, []);

  const handleOpenOuterModal = (pet: any) => {
    setSelectedPet(pet);
    setShowOuterModal(true);
  };

  const handleCloseOuterModal = () => {
    setShowOuterModal(false);
  };

  const handleOpenInnerModal = () => {
    setShowInnerModal(true);
  };

  const handleCloseInnerModal = () => {
    setShowInnerModal(false);
  };

  const handleOpenAdicionarVermifugoModal = () => { 
    setShowAdicionarVermifugoModal(true);
  }

  const handleCloseAdicionarVermifugoModal = () => { 
    setShowAdicionarVermifugoModal(false);
  }

  const handleCloseConsultarVacinaModal = () => { 
    setShowConsultarVacinaModal(false);
  };

  const handleCloseConsultarVermifugoModal = () => { 
    setShowConsultarVermifugoModal(false);
  }

  const handleDeletePet = () => {
    const updatedPetList = petList.filter(pet => pet.nome !== selectedPet.nome);
    setPetList(updatedPetList);
    localStorage.setItem('petList', JSON.stringify(updatedPetList));
    setShowOuterModal(false);
  };

  const validateAddVacina = () => {
    let valid = true;
    let newErrors = { nome: "", marca: "", lote: "", dataAplicacao: "", proximaAplicacao: "", veterinario: "" };
    if (novaVacina.nome === "") {
      newErrors.nome = "Campo obrigatório";
      valid = false;
    }
    if (novaVacina.marca === "") {
      newErrors.marca = "Campo obrigatório";
      valid = false;
    }
    if (novaVacina.lote === "") {
      newErrors.lote = "Campo obrigatório";
      valid = false;
    }
    if (novaVacina.dataAplicacao === "") {
      newErrors.dataAplicacao = "Campo obrigatório";
      valid = false;
    }
    if (novaVacina.proximaAplicacao === ""){
      newErrors.proximaAplicacao = "Campo obrigatório";
      valid = false;
    }
    if (novaVacina.veterinario === "") {
      newErrors.veterinario = "Campo obrigatório";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleAddVacina = () => {
    if (!validateAddVacina()) return;

    const novaVacinaObj = { ...novaVacina };

    const updatedPetList = petList.map(pet => {
      if (pet.nome === selectedPet.nome) {
        return { ...pet, vacinas: [...(pet.vacinas || []), novaVacinaObj] };
      }
      return pet;
    });

    setPetList(updatedPetList);
    localStorage.setItem('petList', JSON.stringify(updatedPetList));

    setNovaVacina({ 
      nome: '',
      marca: '',
      lote: '',
      dataAplicacao: '',
      proximaAplicacao: '',
      veterinario: ''
    });

    setShowInnerModal(false);
  };

    const validateAddVermifugo = () => {
      let valid = true;
      let newErrors = { nome:'', marca: '', lote: '', dataAplicacao: '', proximaAplicacao: '' };
      if (novaVermifugo.nome === "") {
        newErrors.nome = "Campo obrigatório";
        valid = false;
      }
      if (novaVermifugo.marca === "") {
        newErrors.marca = "Campo obrigatório";
        valid = false;
      }
      if (novaVermifugo.lote === "") {
        newErrors.lote = "Campo obrigatório";
        valid = false;
      }
      if (novaVermifugo.dataAplicacao === "") {
        newErrors.dataAplicacao = "Campo obrigatório";
        valid = false;
      }
      if (novaVermifugo.proximaAplicacao === "") {
        newErrors.proximaAplicacao = "Campo obrigatório";
        valid = false;
      }

      setErrorsVermifugo (newErrors);
      return valid;
     };

    const handleAdicionarVermifugo = () => {
      if (!validateAddVermifugo()) return;

    const novaVermifugoObj = {... novaVermifugo}; 

    const updatedPetList = petList.map(pet => {
      if (pet.nome === selectedPet.nome) {
       pet.vermifugos = [...(pet.vermifugos || []), novaVermifugoObj];
        }
        return pet;
    });

    setPetList(updatedPetList);
    localStorage.setItem('petList', JSON.stringify(updatedPetList));
    
    setNovaVermifugo({
      nome: '',
      marca: '',
      lote: '',
      dataAplicacao: '',
      proximaAplicacao: '',
    });

      setShowAdicionarVermifugoModal(false);
  };

  const handleDeleteVacina = (index: number) => {
    const updatedPetList = petList.map(pet => {
      if (pet.nome === selectedPet.nome && pet.vacinas) {
        const updatedVacinas = pet.vacinas.filter((vacina: any, i: number) => i !== index);
        return { ...pet, vacinas: updatedVacinas };
      }
      return pet;
    });
  
    setPetList(updatedPetList);
    localStorage.setItem('petList', JSON.stringify(updatedPetList));
  };
  
  const handleDeleteVermifugo = (index: number) => {
    const updatedPetList = petList.map(pet => {
      if (pet.nome === selectedPet.nome && pet.vermifugos) {
        const updatedVermifugos = pet.vermifugos.filter((vermifugo: any, i: number) => i !== index);
        return { ...pet, vermifugos: updatedVermifugos };
      }
      return pet;
    });
  
    setPetList(updatedPetList);
    localStorage.setItem('petList', JSON.stringify(updatedPetList));
  };
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">CONSULTAR</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {petList.map((pet, index) => (
            <IonItem key={index} onClick={() => handleOpenOuterModal(pet)}>
              <IonLabel>{pet.nome}</IonLabel>
            </IonItem>
          ))}
        </IonList>
  
        <IonModal isOpen={showOuterModal} onDidDismiss={handleCloseOuterModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>DETALHES DO PET</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {selectedPet && (
              <div>
                <p>Nome: {selectedPet.nome}</p>
                <p>Data de Nascimento: {selectedPet.dataNascimento}</p>
                <p>Espécie: {selectedPet.especie}</p>
                <p>Raça: {selectedPet.raca}</p>
                <p>Observações: {selectedPet.observacoes}</p>
                <IonButton onClick={handleOpenInnerModal}>Adicionar Vacina</IonButton>
                <IonButton onClick={handleOpenAdicionarVermifugoModal}>Adicionar Vermifugo</IonButton>
                <IonButton onClick={handleDeletePet}>Apagar Pet</IonButton>
                <IonButton onClick={() => setShowConsultarVacinaModal(true)}>Consultar Vacina</IonButton>
                <IonButton onClick={() => setShowConsultarVermifugoModal(true)}>Consultar Vermifugo</IonButton>
              </div>
            )}
          </IonContent>
        </IonModal>
  
        <IonModal isOpen={showInnerModal} onDidDismiss={handleCloseInnerModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>ADICIONAR VACINA</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItem>
                <IonInput
                  value={novaVacina.nome}
                  placeholder="Nome da Vacina"
                  onIonChange={(e: any) => setNovaVacina({ ...novaVacina, nome: e.target.value })}
                />
                {errors.nome && <p style={{ color: 'red' }}>{errors.nome}</p>}
              </IonItem>
              <IonItem>
                <IonInput
                  value={novaVacina.marca}
                  placeholder="Marca"
                  onIonChange={(e: any) => setNovaVacina({ ...novaVacina, marca: e.target.value })}
                />
                {errors.marca && <p style={{ color: 'red' }}>{errors.marca}</p>}
              </IonItem>
              <IonItem>
                <IonInput
                  value={novaVacina.lote}
                  placeholder="Lote"
                  onIonChange={(e: any) => setNovaVacina({ ...novaVacina, lote: e.target.value })}
                />
                {errors.lote && <p style={{ color: 'red' }}>{errors.lote}</p>}
              </IonItem>
              <IonItem>
                <IonInput
                  value={novaVacina.dataAplicacao}
                  placeholder="Data da Aplicação"
                  onIonChange={(e: any) => setNovaVacina({ ...novaVacina, dataAplicacao: e.target.value })}
                />
                {errors.dataAplicacao && <p style={{ color: 'red' }}>{errors.dataAplicacao}</p>}
              </IonItem>
              <IonItem>
                <IonInput
                  value={novaVacina.proximaAplicacao}
                  placeholder="Próxima Aplicação"
                  onIonChange={(e: any) => setNovaVacina({ ...novaVacina, proximaAplicacao: e.target.value })}
                />
                {errors.proximaAplicacao && <p style={{ color: 'red' }}>{errors.proximaAplicacao}</p>}
              </IonItem>
              <IonItem>
                <IonInput
                  value={novaVacina.veterinario}
                  placeholder="Veterinário"
                  onIonChange={(e: any) => setNovaVacina({ ...novaVacina, veterinario: e.target.value })}
                />
                {errors.veterinario && <p style={{ color: 'red' }}>{errors.veterinario}</p>}
              </IonItem>
            </IonList>
            <IonButton onClick={handleAddVacina}>Adicionar Vacina</IonButton>
            <IonButton onClick={handleCloseInnerModal}>Fechar</IonButton>
          </IonContent>
        </IonModal>
  
        <IonModal isOpen={showConsultarVermifugoModal} onDidDismiss={handleCloseConsultarVermifugoModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>CONSULTAR VERMIFUGO</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {selectedPet && (
              <div>
                <IonList>
                  {selectedPet.vermifugos && selectedPet.vermifugos.map((vermifugo: any, index: number) => (
                    <IonItem key={index}>
                      <IonLabel>Nome do Vermífugo: {vermifugo.nome}</IonLabel>
                      <IonLabel>Marca: {vermifugo.marca}</IonLabel>
                      <IonLabel>Lote: {vermifugo.lote}</IonLabel>
                      <IonLabel>Data de Aplicação: {vermifugo.dataAplicacao}</IonLabel>
                      <IonLabel>Próxima Aplicação: {vermifugo.proximaAplicacao}</IonLabel>
                      <IonButton onClick={() => handleDeleteVermifugo(index)}>Apagar</IonButton>
                    </IonItem>
                  ))}
                </IonList>
              </div>
            )}
            <IonButton onClick={handleCloseConsultarVermifugoModal}>Fechar</IonButton>
          </IonContent>
        </IonModal>
  
        <IonModal isOpen={showConsultarVacinaModal} onDidDismiss={handleCloseConsultarVacinaModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>CONSULTAR VACINA</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {selectedPet && (
              <div>
                <IonList>
                  {selectedPet.vacinas && selectedPet.vacinas.map((vacina: any, index: number) => (
                    <IonItem key={index}>
            <IonLabel>Nome da Vacina: {vacina.nome}</IonLabel>
            <IonLabel>Marca: {vacina.marca}</IonLabel>
            <IonLabel>Lote: {vacina.lote}</IonLabel>           
            <IonLabel>Data de Aplicação: {vacina.dataAplicacao}</IonLabel>
            <IonLabel>Próxima Aplicação: {vacina.proximaAplicacao}</IonLabel>
            <IonLabel>Veterinário: {vacina.veterinario}</IonLabel>
          </IonItem>
  ))}
          </IonList>
        </div>
    )}
    <IonButton onClick={handleCloseConsultarVacinaModal}>Fechar</IonButton>
  </IonContent>
</IonModal>
    

<IonModal isOpen={showConsultarVermifugoModal} onDidDismiss={handleCloseConsultarVermifugoModal}>
  <IonHeader>
    <IonToolbar>
      <IonTitle>CONSULTAR VERMIFUGO</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent>
    {selectedPet && (
      <div>
        <IonList>
          {selectedPet.vermifugos && selectedPet.vermifugos.map((vermifugo: any, index: number) => (
            <IonItem key={index}>
              <IonLabel>Nome do Vermífugo: {vermifugo.nome}</IonLabel>
              <IonLabel>Marca: {vermifugo.marca}</IonLabel>
              <IonLabel>Lote: {vermifugo.lote}</IonLabel>
              <IonLabel>Data de Aplicação: {vermifugo.dataAplicacao}</IonLabel>
              <IonLabel>Próxima Aplicação: {vermifugo.proximaAplicacao}</IonLabel>
              <IonButton onClick={() => handleDeleteVermifugo(index)}>Apagar</IonButton>
            </IonItem>
          ))}
        </IonList>
      </div>
    )}
    <IonButton onClick={handleCloseConsultarVermifugoModal}>Fechar</IonButton>
  </IonContent>
</IonModal>

      </IonContent>
    </IonPage>
  );
};

export default Consultar;
