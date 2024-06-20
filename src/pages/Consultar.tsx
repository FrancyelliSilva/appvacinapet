import React, { useEffect, useState } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonModal,
  IonList, IonItem, IonLabel, IonInput, IonText
} from '@ionic/react';

const Consultar: React.FC = () => {
  const [petList, setPetList] = useState<any[]>([]);
  const [showOuterModal, setShowOuterModal] = useState(false);
  const [showInnerModal, setShowInnerModal] = useState(false);
  const [showAdicionarVermifugoModal, setShowAdicionarVermifugoModal] = useState(false);
  
  const [selectedPet, setSelectedPet] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    nome: '', 
    dataNascimento: '',
    sexo: '',
    especie: '',
    raca: '',
    observacoes: ''
  });

  const [novaVacina, setNovaVacina] = useState({
    nome: '',
    marca: '',
    lote: '',
    dataAplicacao: '',
    proximaAplicacao: '',
    veterinario: '',
    peso:''
  });

  const [showConsultarVacinaModal, setShowConsultarVacinaModal] = useState(false);
  const [errors, setErrors] = useState({
    nome: '',
    marca: '',
    lote: '',
    dataAplicacao: '',
    proximaAplicacao: '',
    veterinario: '',
    peso: ''
  });

  
  const [novaVermifugo, setNovaVermifugo] = useState({ 
    nome: '',
    marca: '',
    lote: '',
    dataAplicacao: '',
    proximaAplicacao: '',
    peso: ''
  });

  const [showConsultarVermifugoModal, setShowConsultarVermifugoModal] = useState (false);
  const [errorsVermifugo, setErrorsVermifugo] = useState({
    nome: '',
    marca: '',
    lote: '',
    dataAplicacao: '',
    proximaAplicacao: '',
    peso: ''
  });
  
 
  useEffect(() => {
    const storedPetList = localStorage.getItem('petList');
    if (storedPetList){
      setPetList(JSON.parse(storedPetList));
    } 
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
  };

  const handleCloseAdicionarVermifugoModal = () => { 
    setShowAdicionarVermifugoModal(false);
  };

  const handleCloseConsultarVacinaModal = () => { 
    setShowConsultarVacinaModal(false);
  };

  const handleCloseConsultarVermifugoModal = () => { 
    setShowConsultarVermifugoModal(false);
  };

  const handleFormChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
  };


  const handleDeletePet = () => {
    const updatedPetList = petList.filter(pet => pet.nome !== selectedPet.nome);
    setPetList(updatedPetList);
    localStorage.setItem('petList', JSON.stringify(updatedPetList));
    setShowOuterModal(false);
  };

  const validateAddVacina = () => {
    let valid = true;
    let newErrors = { nome: "", marca: "", lote: "", dataAplicacao: "", proximaAplicacao: "", veterinario: "" , peso: ""};
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
    setErrors(errors);
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
      veterinario: '',
      peso: ''
    });
    
    setShowInnerModal(false);
  };

    const validateAddVermifugo = () => {
      let valid = true;
      let newErrors = { nome:'', marca: '', lote: '', dataAplicacao: '', proximaAplicacao: '', peso: ''};
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
      if (novaVermifugo.peso === ""){
        newErrors.peso = "Campo obrigatório";
        valid = false;
      }

      setErrorsVermifugo(errors);
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
      peso: ''
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
              <IonTitle class="ion-text-center">DETALHES DO PET</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {selectedPet && (
              <div>
                <p>Nome: {selectedPet.nome}</p>
                <p>Data de Nascimento: {selectedPet.dataNascimento}</p>
                <p>Sexo: {selectedPet.sexo}</p>
                <p>Espécie: {selectedPet.especie}</p>
                <p>Raça: {selectedPet.raca}</p>
                <p>Observações: {selectedPet.observacoes}</p>
                <IonButton onClick={handleOpenInnerModal}>Adicionar Vacina</IonButton>
                <IonButton onClick={handleOpenAdicionarVermifugoModal}>Adicionar Vermifugo</IonButton>
                <IonButton onClick={() => setShowConsultarVacinaModal(true)}>Consultar Vacina</IonButton>
                <IonButton onClick={() => setShowConsultarVermifugoModal(true)}>Consultar Vermifugo</IonButton>
                <p><IonButton onClick={handleDeletePet}>Apagar Pet</IonButton></p>
                <p><IonButton onClick={handleCloseOuterModal}>Fechar</IonButton></p>
              </div>
            )}
          </IonContent>
        </IonModal>
  
<IonModal isOpen={showInnerModal} onDidDismiss={handleCloseInnerModal}>
  <IonHeader>
    <IonToolbar>
      <IonTitle class="ion-text-center">ADICIONAR VACINA</IonTitle>
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
          <IonItem>
            <IonInput
              value={novaVacina.peso}
              placeholder="Peso"
              onIonChange={(e: any) => setNovaVacina({ ...novaVacina, peso: e.target.value })}
            />
            {errors.peso && <p style={{ color: 'red' }}>{errors.peso}</p>}
          </IonItem>
    </IonList>
            <IonButton onClick={handleAddVacina}>Adicionar Vacina</IonButton>
            <IonButton onClick={handleCloseInnerModal}>Fechar</IonButton>
          </IonContent>
</IonModal>
  
<IonModal isOpen={showAdicionarVermifugoModal} onDidDismiss={handleCloseAdicionarVermifugoModal}>
  <IonHeader>
    <IonToolbar>
      <IonTitle class="ion-text-center">ADICIONAR VERMIFUGO</IonTitle>
    </IonToolbar>
  </IonHeader>
    <IonContent>
      <IonList>
        <IonItem>
          <IonInput
            value={novaVermifugo.nome}
            placeholder="Nome do vermifugo"
            onIonChange={(e: any) => setNovaVermifugo({ ...novaVermifugo, nome: e.target.value })}
          />
            {errors.nome && <p style={{ color: 'red' }}>{errors.nome}</p>}
        </IonItem>
        <IonItem>
          <IonInput
            value={novaVermifugo.marca}
            placeholder="Marca"
            onIonChange={(e: any) => setNovaVermifugo({ ...novaVermifugo, marca: e.target.value })}
          />
            {errors.marca && <p style={{ color: 'red' }}>{errors.marca}</p>}
          </IonItem>
          <IonItem>
            <IonInput
              value={novaVermifugo.lote}
              placeholder="Lote"
              onIonChange={(e: any) => setNovaVermifugo({ ...novaVermifugo, lote: e.target.value })}
            />
              {errors.lote && <p style={{ color: 'red' }}>{errors.lote}</p>}
          </IonItem>
          <IonItem>
            <IonInput
              value={novaVermifugo.dataAplicacao}
              placeholder="Data da Aplicação"
              onIonChange={(e: any) => setNovaVermifugo({ ...novaVermifugo, dataAplicacao: e.target.value })}
            />
              {errors.dataAplicacao && <p style={{ color: 'red' }}>{errors.dataAplicacao}</p>}
          </IonItem>
          <IonItem>
            <IonInput
              value={novaVermifugo.proximaAplicacao}
              placeholder="Próxima Aplicação"
              onIonChange={(e: any) => setNovaVermifugo({ ...novaVermifugo, proximaAplicacao: e.target.value })}
            />
            {errors.proximaAplicacao && <p style={{ color: 'red' }}>{errors.proximaAplicacao}</p>}
          </IonItem>
          <IonItem>
            <IonInput
              value={novaVermifugo.peso}
              placeholder="Peso"
              onIonChange={(e: any) => setNovaVermifugo({ ...novaVermifugo, peso: e.target.value })}
            />
            {errors.peso && <p style={{ color: 'red' }}>{errors.peso}</p>}
          </IonItem>
    </IonList>
            <IonButton onClick={handleAdicionarVermifugo}>Adicionar Vermifugo</IonButton>
            <IonButton onClick={handleCloseAdicionarVermifugoModal}>Fechar</IonButton>
          </IonContent>
</IonModal>

<IonModal isOpen={showConsultarVacinaModal} onDidDismiss={handleCloseConsultarVacinaModal}>
  <IonHeader>
    <IonToolbar>
      <IonTitle class="ion-text-center">CONSULTAR VACINA </IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent>
    {selectedPet && (
      <div>
        <IonList>
          {selectedPet.vacinas && selectedPet.vacinas.map((vacina: any, index: number) => (
            <IonItem key={index}>
              <IonLabel class="ion-text-wrap">
                <p><strong>Nome da Vacina:</strong> {vacina.nome}</p>
                <p><strong>Marca:</strong> {vacina.marca}</p>
                <p><strong>Lote:</strong> {vacina.lote}</p>
                <p><strong>Data de Aplicação:</strong> {vacina.dataAplicacao}</p>
                <p><strong>Próxima Aplicação:</strong> {vacina.proximaAplicacao}</p>
                <p><strong>Veterinário:</strong> {vacina.veterinario}</p>
                <p><strong>Peso:</strong> {vacina.peso}</p>
              </IonLabel>
              <IonButton onClick={() => handleDeleteVacina(index)}>Apagar</IonButton>
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
      <IonTitle class="ion-text-center">CONSULTAR VERMIFUGO</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent>
    {selectedPet && (
      <div>
        <IonList>
          {selectedPet.vermifugos && selectedPet.vermifugos.map((vermifugo: any, index: number) => (
            <IonItem key={index}>
              <IonLabel class="ion-text-wrap">
                <p><strong>Nome do vermífugo: </strong>{vermifugo.nome}</p>
                <p><strong>Marca: </strong>{vermifugo.marca}</p>
                <p><strong>Data de aplicação: </strong>{vermifugo.dataAplicacao}</p>
                <p><strong>Próxima aplicação: </strong>{vermifugo.proximaAplicacao}</p>
                <p><strong>Peso: </strong>{vermifugo.peso}</p>
              </IonLabel>
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
