"use client"

import { useState, useEffect } from "react"
import "./Dashboard.css"
import { Footer } from "../components/footer"
import StatusChangeModal from "../components/StatusChangeModal"
import DeleteConfirmModal from "../components/DeleteConfirmModal"
import ViewDonationModal from "../components/ViewDonationModal"

const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState("todos")
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    roupas: 0,
    alimentos: 0,
    pendentes: 0,
    coletados: 0,
    entregues: 0,
  })

  // Modais
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [statusModalOpen, setStatusModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedDonation, setSelectedDonation] = useState(null)

  // Verificar autenticação e autorização
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("usuarioToken")
        const userName = localStorage.getItem("usuarioNome")

        if (!token || !userName) {
          window.location.href = "/Login"
          return
        }

        const response = await fetch("http://localhost/backend/auth.php", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token })
        })

        const authData = await response.json()

        if (!authData.valid) {
          throw new Error('Token inválido')
        }

        if (!authData.user.is_admin) {
          window.location.href = "/"
          return
        }

        setIsAuthenticated(true)
        setIsAdmin(true)
        setAuthLoading(false)
        fetchDonations()

      } catch (error) {
        console.error("Erro na verificação de autenticação:", error)
        localStorage.clear()
        window.location.href = "/Login"
      }
    }

    checkAuth()
  }, [])

  // Buscar doações reais do backend
  const fetchDonations = async () => {
    setLoading(true)
    try {
      const [foodResponse, clothesResponse] = await Promise.all([
        fetch("http://localhost/backend/donations.php?type=food"),
        fetch("http://localhost/backend/donations.php?type=clothes"),
      ])

      const foodData = await foodResponse.json()
      const clothesData = await clothesResponse.json()

      let allDonations = []

      if (foodData.success && foodData.data) {
        allDonations = [
          ...allDonations,
          ...foodData.data.map((d) => ({
            ...d,
            id: d.id,
            categoria: "Alimento",
            tipo: d.tipo_alimento,
            quantidade: d.quantidade,
            dataAgendamento: d.data_entrega,
            dataCadastro: d.data_cadastro_alimento,
            status: d.status || "Pendente",
            doador: d.nome_doador,
          })),
        ]
      }

      if (clothesData.success && clothesData.data) {
        allDonations = [
          ...allDonations,
          ...clothesData.data.map((d) => ({
            ...d,
            id: d.id,
            categoria: "Roupa",
            tipo: d.tipo_roupa,
            quantidade: d.quantidade,
            dataAgendamento: d.data_entrega,
            dataCadastro: d.data_cadastro_roupa,
            status: d.status || "Pendente",
            doador: d.nome_doador,
          })),
        ]
      }

      setDonations(allDonations)
      calculateStats(allDonations)
    } catch (error) {
      console.error("Erro ao buscar doações:", error)
      // Se não conseguir conectar com o backend, usar dados de exemplo
      const exampleData = getExampleData()
      setDonations(exampleData)
      calculateStats(exampleData)
    }
    setLoading(false)
  }

  // Dados de exemplo caso o backend não esteja disponível
  const getExampleData = () => {
    return [
      {
        id: "1",
        categoria: "Alimento",
        tipo: "Arroz",
        quantidade: 5,
        dataCadastro: "2023-12-01T10:00:00",
        dataAgendamento: "2023-12-15",
        status: "Pendente",
        doador: "João Silva",
        email: "joao@email.com",
        data_validade: "2024-06-01",
      },
      {
        id: "2",
        categoria: "Roupa",
        tipo: "Camiseta",
        quantidade: 3,
        dataCadastro: "2023-12-02T14:30:00",
        dataAgendamento: "2023-12-16",
        status: "Coletado",
        doador: "Maria Santos",
        email: "maria@email.com",
        tamanho: "M",
        condicao: "Nova",
      },
    ]
  }

  // Calcular estatísticas
  const calculateStats = (data) => {
    const stats = {
      total: data.length,
      roupas: data.filter((d) => d.categoria === "Roupa").length,
      alimentos: data.filter((d) => d.categoria === "Alimento").length,
      pendentes: data.filter((d) => d.status === "Pendente").length,
      coletados: data.filter((d) => d.status === "Coletado").length,
      entregues: data.filter((d) => d.status === "Entregue").length,
    }

    setStats(stats)
  }

  // Filtrar doações
  const getFilteredDonations = () => {
    let filtered = [...donations]

    if (activeFilter === "roupas") {
      filtered = filtered.filter((d) => d.categoria === "Roupa")
    } else if (activeFilter === "alimentos") {
      filtered = filtered.filter((d) => d.categoria === "Alimento")
    } else if (activeFilter === "pendentes") {
      filtered = filtered.filter((d) => d.status === "Pendente")
    } else if (activeFilter === "coletados") {
      filtered = filtered.filter((d) => d.status === "Coletado")
    } else if (activeFilter === "entregues") {
      filtered = filtered.filter((d) => d.status === "Entregue")
    }

    // Filtro por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(
        (donation) =>
          donation.doador.toLowerCase().includes(searchTerm.toLowerCase()) ||
          donation.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          donation.email?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filtro por data
    if (dateFilter) {
      filtered = filtered.filter((donation) => {
        const donationDate = new Date(donation.dataAgendamento).toISOString().split("T")[0]
        return donationDate === dateFilter
      })
    }

    return filtered.sort((a, b) => new Date(b.dataCadastro) - new Date(a.dataCadastro))
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("pt-BR")
  }

  // Funções para lidar com ações
  const handleViewDonation = (donation) => {
    setSelectedDonation(donation)
    setViewModalOpen(true)
  }

  const handleEditStatus = (donation) => {
    setSelectedDonation(donation)
    setStatusModalOpen(true)
  }

  const handleDeleteDonation = (donation) => {
    setSelectedDonation(donation)
    setDeleteModalOpen(true)
  }

  // Função para atualizar o status (agora salva no backend)
  const updateDonationStatus = async (id, newStatus, observacoes = '') => {
    try {
      const token = localStorage.getItem('usuarioToken');
      const donation = donations.find(d => d.id === id);
      
      if (!donation) {
        alert('Doação não encontrada');
        return;
      }

      const response = await fetch('http://localhost/backend/donations.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'update_status',
          token: token,
          donation_id: id,
          donation_type: donation.categoria,
          new_status: newStatus,
          observacoes: observacoes
        })
      });

      const data = await response.json();

      if (data.success) {
        // Atualizar no estado local
        const updatedDonations = donations.map((donation) =>
          donation.id === id ? { ...donation, status: newStatus } : donation,
        )

        setDonations(updatedDonations)
        calculateStats(updatedDonations)
        alert(`Status atualizado para: ${newStatus}`)
        setStatusModalOpen(false)
      } else {
        alert('Erro ao atualizar status: ' + data.message);
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      alert('Erro ao conectar com o servidor');
    }
  };

  // Função para deletar doação
  const deleteDonation = async (id) => {
    try {
      const token = localStorage.getItem('usuarioToken');
      const donation = donations.find(d => d.id === id);
      
      if (!donation) {
        alert('Doação não encontrada');
        return;
      }

      const response = await fetch('http://localhost/backend/donations.php', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          donation_id: id,
          donation_type: donation.categoria
        })
      });

      const data = await response.json();

      if (data.success) {
        const updatedDonations = donations.filter((donation) => donation.id !== id);
        setDonations(updatedDonations);
        calculateStats(updatedDonations);
        alert('Doação removida com sucesso!');
        setDeleteModalOpen(false);
      } else {
        alert('Erro ao deletar doação: ' + data.message);
      }
    } catch (error) {
      console.error('Erro ao deletar doação:', error);
      alert('Erro ao conectar com o servidor');
    }
  };

  // Renderização condicional
  if (authLoading) {
    return (
      <div className="dashboard-page">
        <div className="loading-container" style={{ 
          height: '100vh', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          flexDirection: 'column'
        }}>
          <div className="loading-spinner"></div>
          <p>Verificando permissões...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !isAdmin) {
    return null
  }

  return (
    <div className="dashboard-page">
      {/* Botão Voltar */}
      <div className="back-button-container">
        <button 
          className="back-button"
          onClick={() => window.location.href = '/'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
          Voltar
        </button>
      </div>

      {/* Container Principal da Dashboard */}
      <div className="dashboard-main-container">
        <main className="dashboard-container">
          {/* Header da Dashboard */}
          <div className="dashboard-header">
            <div className="dashboard-title-section">
              <h1 className="dashboard-title">Dashboard Administrativo</h1>
              <p className="dashboard-subtitle">Gerencie todas as doações recebidas</p>
            </div>
            
            {/* Status Summary Compacto */}
            <div className="status-summary-compact">
              <div className="status-item-compact">
                <span className="status-badge pendente">Pendente</span>
                <span className="status-count">{stats.pendentes}</span>
              </div>
              <div className="status-item-compact">
                <span className="status-badge coletado">Coletado</span>
                <span className="status-count">{stats.coletados}</span>
              </div>
              <div className="status-item-compact">
                <span className="status-badge entregue">Entregue</span>
                <span className="status-count">{stats.entregues}</span>
              </div>
            </div>
          </div>

          {/* Filtros e Busca */}
          <section className="filters-section">
            <div className="filters-container">
              <div className="filter-tabs">
                <button
                  className={`filter-tab ${activeFilter === "todos" ? "active" : ""}`}
                  onClick={() => setActiveFilter("todos")}
                >
                  Todas ({stats.total})
                </button>
                <button
                  className={`filter-tab ${activeFilter === "roupas" ? "active" : ""}`}
                  onClick={() => setActiveFilter("roupas")}
                >
                  Roupas ({stats.roupas})
                </button>
                <button
                  className={`filter-tab ${activeFilter === "alimentos" ? "active" : ""}`}
                  onClick={() => setActiveFilter("alimentos")}
                >
                  Alimentos ({stats.alimentos})
                </button>
                <button
                  className={`filter-tab ${activeFilter === "pendentes" ? "active" : ""}`}
                  onClick={() => setActiveFilter("pendentes")}
                >
                  Pendentes ({stats.pendentes})
                </button>
                <button
                  className={`filter-tab ${activeFilter === "entregues" ? "active" : ""}`}
                  onClick={() => setActiveFilter("entregues")}
                >
                  Entregues ({stats.entregues})
                </button>
              </div>

              <div className="search-controls">
                <div className="search-input">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Buscar por doador, tipo ou email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="date-filter">
                  <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
                </div>

                <button onClick={fetchDonations} className="refresh-btn" disabled={loading}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                    <path d="M21 3v5h-5" />
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                    <path d="M3 21v-5h5" />
                  </svg>
                  {loading ? "Atualizando..." : "Atualizar"}
                </button>
              </div>
            </div>
          </section>

          {/* Lista de Doações */}
          <section className="donations-section">
            <div className="donations-header">
              <h2>Doações Recebidas</h2>
              <span className="donations-count">{getFilteredDonations().length} doação(ões) encontrada(s)</span>
            </div>

            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Carregando doações...</p>
              </div>
            ) : (
              <div className="donations-grid">
                {getFilteredDonations().map((donation) => (
                  <div key={donation.id} className="donation-card">
                    <div className="donation-header">
                      <span className={`category-badge ${donation.categoria.toLowerCase()}`}>{donation.categoria}</span>
                      <span className={`status-badge ${donation.status.toLowerCase()}`}>{donation.status}</span>
                    </div>

                    <div className="donation-content">
                      <h3 className="donation-title">{donation.tipo}</h3>
                      <p className="donation-donor">
                        <strong>Doador:</strong> {donation.doador}
                      </p>
                      <p className="donation-email">{donation.email}</p>

                      <div className="donation-details">
                        <div className="detail-item">
                          <span className="detail-label">Quantidade:</span>
                          <span className="detail-value">{donation.quantidade}</span>
                        </div>
                        {donation.categoria === "Roupa" && (
                          <>
                            <div className="detail-item">
                              <span className="detail-label">Tamanho:</span>
                              <span className="detail-value">{donation.tamanho || "N/A"}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Condição:</span>
                              <span className="detail-value">{donation.condicao || "N/A"}</span>
                            </div>
                          </>
                        )}
                        {donation.categoria === "Alimento" && donation.data_validade && (
                          <div className="detail-item">
                            <span className="detail-label">Validade:</span>
                            <span className="detail-value">{formatDate(donation.data_validade)}</span>
                          </div>
                        )}
                      </div>

                      <div className="donation-dates">
                        <div className="date-item">
                          <span className="date-label">Cadastro:</span>
                          <span className="date-value">{formatDateTime(donation.dataCadastro)}</span>
                        </div>
                        <div className="date-item">
                          <span className="date-label">Agendamento:</span>
                          <span className="date-value">{formatDate(donation.dataAgendamento)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="donation-actions">
                      <button
                        className="action-btn view-btn"
                        onClick={() => handleViewDonation(donation)}
                        title="Visualizar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                      <button
                        className="action-btn edit-btn"
                        onClick={() => handleEditStatus(donation)}
                        title="Editar Status"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDeleteDonation(donation)}
                        title="Excluir"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 6h18" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}

                {getFilteredDonations().length === 0 && (
                  <div className="empty-state">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                    <h3>Nenhuma doação encontrada</h3>
                    <p>Tente ajustar os filtros ou termos de busca</p>
                  </div>
                )}
              </div>
            )}
          </section>
        </main>
      </div>

      {/* Modais */}
      {viewModalOpen && selectedDonation && (
        <ViewDonationModal donation={selectedDonation} onClose={() => setViewModalOpen(false)} />
      )}

      {statusModalOpen && selectedDonation && (
        <StatusChangeModal
          donation={selectedDonation}
          onClose={() => setStatusModalOpen(false)}
          onStatusChange={updateDonationStatus}
        />
      )}

      {deleteModalOpen && selectedDonation && (
        <DeleteConfirmModal
          donation={selectedDonation}
          onClose={() => setDeleteModalOpen(false)}
          onConfirmDelete={deleteDonation}
        />
      )}

      <Footer />
    </div>
  )
}

export default Dashboard
