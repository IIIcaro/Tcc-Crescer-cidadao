"use client"

import { useState } from "react"
import "./Dashboard.css"
import Header from "../components/Header"
import { Footer } from "../components/footer"

const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState("todos")
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("")

  // Dados mockados para demonstração
  const [clothingDonations] = useState([
    {
      id: 1,
      doador: "Maria Silva",
      email: "maria@email.com",
      tipo: "Camiseta",
      condicao: "Nova",
      quantidade: 5,
      tamanho: "M",
      descricao: "Camisetas básicas variadas",
      dataCadastro: "2024-01-14",
      dataAgendamento: "2024-01-19",
      status: "Pendente",
    },
    {
      id: 2,
      doador: "João Santos",
      email: "joao@email.com",
      tipo: "Calça",
      condicao: "Seminova",
      quantidade: 3,
      tamanho: "G",
      descricao: "Calças jeans em ótimo estado",
      dataCadastro: "2024-01-13",
      dataAgendamento: "2024-01-17",
      status: "Coletado",
    },
    {
      id: 3,
      doador: "Ana Costa",
      email: "ana@email.com",
      tipo: "Vestido",
      condicao: "Usada em bom estado",
      quantidade: 2,
      tamanho: "P",
      descricao: "Vestidos sociais",
      dataCadastro: "2024-01-12",
      dataAgendamento: "2024-01-15",
      status: "Entregue",
    },
    {
      id: 4,
      doador: "Carlos Lima",
      email: "carlos@email.com",
      tipo: "Casaco",
      condicao: "Nova",
      quantidade: 1,
      tamanho: "GG",
      descricao: "Casaco de inverno",
      dataCadastro: "2024-01-11",
      dataAgendamento: "2024-01-18",
      status: "Pendente",
    },
  ])

  const [foodDonations] = useState([
    {
      id: 1,
      doador: "Supermercado ABC",
      email: "contato@abc.com",
      tipo: "Arroz",
      quantidade: "10 pacotes de 1kg",
      validade: "2024-12-30",
      descricao: "Arroz branco tipo 1",
      dataCadastro: "2024-01-14",
      dataAgendamento: "2024-01-21",
      status: "Pendente",
    },
    {
      id: 2,
      doador: "Padaria Central",
      email: "padaria@central.com",
      tipo: "Pães",
      quantidade: "50 unidades",
      validade: "2024-01-15",
      descricao: "Pães franceses do dia",
      dataCadastro: "2024-01-14",
      dataAgendamento: "2024-01-16",
      status: "Coletado",
    },
    {
      id: 3,
      doador: "Família Oliveira",
      email: "oliveira@email.com",
      tipo: "Feijão",
      quantidade: "5 pacotes de 1kg",
      validade: "2024-08-29",
      descricao: "Feijão carioca",
      dataCadastro: "2024-01-13",
      dataAgendamento: "2024-01-15",
      status: "Entregue",
    },
    {
      id: 4,
      doador: "Empresa XYZ",
      email: "rh@xyz.com",
      tipo: "Óleo",
      quantidade: "20 garrafas de 900ml",
      validade: "2024-06-14",
      descricao: "Óleo de soja",
      dataCadastro: "2024-01-12",
      dataAgendamento: "2024-01-19",
      status: "Pendente",
    },
  ])

  // Estatísticas calculadas
  const totalClothingDonations = clothingDonations.length
  const totalFoodDonations = foodDonations.length
  const totalDonations = totalClothingDonations + totalFoodDonations
  const pendingDonations = [...clothingDonations, ...foodDonations].filter((d) => d.status === "Pendente").length

  // Filtrar doações
  const getFilteredDonations = () => {
    let filtered = []

    if (activeFilter === "todos" || activeFilter === "roupas") {
      filtered = [...filtered, ...clothingDonations.map((d) => ({ ...d, categoria: "Roupa" }))]
    }

    if (activeFilter === "todos" || activeFilter === "alimentos") {
      filtered = [...filtered, ...foodDonations.map((d) => ({ ...d, categoria: "Alimento" }))]
    }

    // Filtro por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(
        (donation) =>
          donation.doador.toLowerCase().includes(searchTerm.toLowerCase()) ||
          donation.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          donation.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filtro por data
    if (dateFilter) {
      filtered = filtered.filter((donation) => donation.dataAgendamento === dateFilter)
    }

    return filtered.sort((a, b) => new Date(b.dataCadastro) - new Date(a.dataCadastro))
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  return (
    <div className="dashboard-page">
      <Header />

      <main className="dashboard-container">
        {/* Header do Dashboard */}
        <section className="dashboard-header">
          <div className="dashboard-header-content">
            <h1 className="dashboard-title">Dashboard de Doações</h1>
            <p className="dashboard-subtitle">Gerencie e acompanhe todas as doações recebidas</p>
          </div>
        </section>

        {/* Estatísticas */}
        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <div className="stat-content">
                <div className="stat-number">{totalDonations}</div>
                <div className="stat-label">Total de Doações</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
                </svg>
              </div>
              <div className="stat-content">
                <div className="stat-number">{totalClothingDonations}</div>
                <div className="stat-label">Doações de Roupas</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                  <path d="M7 2v20" />
                  <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm-5 1v4a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-4" />
                </svg>
              </div>
              <div className="stat-content">
                <div className="stat-number">{totalFoodDonations}</div>
                <div className="stat-label">Doações de Alimentos</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12,6 12,12 16,14" />
                </svg>
              </div>
              <div className="stat-content">
                <div className="stat-number">{pendingDonations}</div>
                <div className="stat-label">Pendentes</div>
              </div>
            </div>
          </div>
        </section>

        {/* Filtros e Busca */}
        <section className="filters-section">
          <div className="filters-container">
            <div className="filter-tabs">
              <button
                className={`filter-tab ${activeFilter === "todos" ? "active" : ""}`}
                onClick={() => setActiveFilter("todos")}
              >
                Todas
              </button>
              <button
                className={`filter-tab ${activeFilter === "roupas" ? "active" : ""}`}
                onClick={() => setActiveFilter("roupas")}
              >
                Roupas
              </button>
              <button
                className={`filter-tab ${activeFilter === "alimentos" ? "active" : ""}`}
                onClick={() => setActiveFilter("alimentos")}
              >
                Alimentos
              </button>
            </div>

            <div className="search-filters">
              <div className="search-input">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
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
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  placeholder="Filtrar por data"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Lista de Doações */}
        <section className="donations-section">
          <div className="donations-header">
            <h2>Doações Recebidas</h2>
            <span className="donations-count">{getFilteredDonations().length} doação(ões) encontrada(s)</span>
          </div>

          <div className="donations-table-container">
            <table className="donations-table">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Doador</th>
                  <th>Detalhes</th>
                  <th>Data de Cadastro</th>
                  <th>Agendamento</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {getFilteredDonations().map((donation) => (
                  <tr key={`${donation.categoria}-${donation.id}`}>
                    <td>
                      <span className={`category-badge ${donation.categoria.toLowerCase()}`}>{donation.categoria}</span>
                    </td>
                    <td>
                      <div className="donor-info">
                        <div className="donor-name">{donation.doador}</div>
                        <div className="donor-email">{donation.email}</div>
                      </div>
                    </td>
                    <td>
                      {donation.categoria === "Roupa" ? (
                        <div className="donation-details">
                          <div>
                            <strong>Qtd:</strong> {donation.quantidade}
                          </div>
                          <div>
                            <strong>Tamanho:</strong> {donation.tamanho}
                          </div>
                          <div>
                            <strong>Condição:</strong> {donation.condicao}
                          </div>
                        </div>
                      ) : (
                        <div className="donation-details">
                          <div>
                            <strong>Qtd:</strong> {donation.quantidade}
                          </div>
                          <div>
                            <strong>Validade:</strong> {formatDate(donation.validade)}
                          </div>
                        </div>
                      )}
                    </td>
                    <td>{formatDate(donation.dataCadastro)}</td>
                    <td>{formatDate(donation.dataAgendamento)}</td>
                    <td>
                      <span className={`status-badge status-${donation.status.toLowerCase()}`}>{donation.status}</span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-button view-button" title="Visualizar">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </button>
                        <button className="action-button edit-button" title="Editar">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        <button className="action-button delete-button" title="Excluir">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {getFilteredDonations().length === 0 && (
            <div className="empty-state">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <h3>Nenhuma doação encontrada</h3>
              <p>Tente ajustar os filtros ou termos de busca</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Dashboard
