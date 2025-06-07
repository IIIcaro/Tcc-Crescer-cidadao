"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import "./Dashboard.css"
import Header from "../components/Header"
import { Footer } from "../components/footer"

const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState("todos")
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [clothingDonations, setClothingDonations] = useState([])
  const [foodDonations, setFoodDonations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Função para garantir que o retorno seja sempre um array
  const ensureArray = (data) => {
    if (Array.isArray(data)) {
      return data
    }
    if (data && typeof data === "object") {
      // Se for um objeto, tenta extrair um array de uma propriedade comum
      if (Array.isArray(data.data)) return data.data
      if (Array.isArray(data.items)) return data.items
      if (Array.isArray(data.results)) return data.results
      // Se for um objeto único, coloca em um array
      return [data]
    }
    return []
  }

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Configuração do axios para CORS
        const axiosConfig = {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000, // 10 segundos de timeout
        }

        console.log("Iniciando busca de dados...")

        const [clothingResponse, foodResponse] = await Promise.all([
          axios.get("http://localhost:8080/roupass", axiosConfig),
          axios.get("http://localhost:8080/alimentacao", axiosConfig),
        ])

        console.log("Dados de roupas:", clothingResponse.data)
        console.log("Dados de alimentação:", foodResponse.data)

        // Garantir que os dados sejam sempre arrays
        const clothingData = ensureArray(clothingResponse.data)
        const foodData = ensureArray(foodResponse.data)

        setClothingDonations(clothingData)
        setFoodDonations(foodData)
      } catch (err) {
        console.error("Erro detalhado:", err)

        if (err.code === "ECONNREFUSED" || err.code === "ERR_NETWORK") {
          setError(
            "Não foi possível conectar ao servidor. Verifique se o backend está rodando em http://localhost:8080",
          )
        } else if (err.response) {
          setError(`Erro do servidor: ${err.response.status} - ${err.response.statusText}`)
        } else if (err.request) {
          setError("Erro de rede: Verifique sua conexão e se o CORS está configurado no backend")
        } else {
          setError(`Erro inesperado: ${err.message}`)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Estatísticas calculadas com verificações de segurança
  const totalClothingDonations = Array.isArray(clothingDonations) ? clothingDonations.length : 0
  const totalFoodDonations = Array.isArray(foodDonations) ? foodDonations.length : 0
  const totalDonations = totalClothingDonations + totalFoodDonations

  const pendingDonations = 0 // Temporário até implementar status

  // Filtrar doações
  const getFilteredDonations = () => {
    let filtered = []

    if (activeFilter === "todos" || activeFilter === "roupas") {
      const clothingData = Array.isArray(clothingDonations) ? clothingDonations : []
      filtered = [...filtered, ...clothingData.map((d) => ({ ...d, categoria: "Roupa" }))]
    }

    if (activeFilter === "todos" || activeFilter === "alimentos") {
      const foodData = Array.isArray(foodDonations) ? foodDonations : []
      filtered = [...filtered, ...foodData.map((d) => ({ ...d, categoria: "Alimento" }))]
    }

    // Filtro por termo de busca - usando campos reais
    if (searchTerm) {
      filtered = filtered.filter((donation) => {
        const tipo_roupa = donation?.tipo_roupa || ""
        const tipo_alimento = donation?.tipo_alimento || ""
        const descricao = donation?.descricao || ""

        return (
          tipo_roupa.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tipo_alimento.toLowerCase().includes(searchTerm.toLowerCase()) ||
          descricao.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })
    }

    // Filtro por data - usando data_entrega
    if (dateFilter) {
      filtered = filtered.filter((donation) => donation?.data_entrega === dateFilter)
    }

    return filtered.sort((a, b) => {
      const dateA = new Date(a?.data_cadastro_roupa || a?.data_cadastro_alimento || 0)
      const dateB = new Date(b?.data_cadastro_roupa || b?.data_cadastro_alimento || 0)
      return dateB - dateA
    })
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Data não informada"
    try {
      return new Date(dateString).toLocaleDateString("pt-BR")
    } catch (error) {
      return "Data inválida"
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="dashboard-page">
        <Header />
        <main className="dashboard-container">
          <div className="loading-container">
            <div className="loading-spinner">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-spin"
              >
                <path d="M21 12a9 9 0 11-6.219-8.56" />
              </svg>
            </div>
            <p>Carregando dados...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="dashboard-page">
        <Header />
        <main className="dashboard-container">
          <div className="error-container">
            <div className="error-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h3>Erro ao carregar dados</h3>
            <p>{error}</p>
            <button className="retry-button" onClick={() => window.location.reload()}>
              Tentar novamente
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
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
            <button className="refresh-button" onClick={() => window.location.reload()} disabled={loading}>
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
                className={loading ? "animate-spin" : ""}
              >
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                <path d="M3 21v-5h5" />
              </svg>
              {loading ? "Carregando..." : "Atualizar"}
            </button>
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
                {getFilteredDonations().map((donation, index) => (
                  <tr key={`${donation?.categoria || "unknown"}-${donation?.id || index}`}>
                    <td>
                      <span className={`category-badge ${(donation?.categoria || "").toLowerCase()}`}>
                        {donation?.categoria || "N/A"}
                      </span>
                    </td>
                    <td>
                      <div className="donor-info">
                        <div className="donor-name">ID: {donation?.id || "N/A"}</div>
                        <div className="donor-email">User ID: {donation?.id_user || "N/A"}</div>
                      </div>
                    </td>
                    <td>
                      {donation?.categoria === "Roupa" ? (
                        <div className="donation-details">
                          <div>
                            <strong>Tipo:</strong> {donation?.tipo_roupa || "N/A"}
                          </div>
                          <div>
                            <strong>Qtd:</strong> {donation?.quantidade || "N/A"}
                          </div>
                          <div>
                            <strong>Tamanho:</strong> {donation?.tamanho || "N/A"}
                          </div>
                          <div>
                            <strong>Condição:</strong> {donation?.condicao || "N/A"}
                          </div>
                        </div>
                      ) : (
                        <div className="donation-details">
                          <div>
                            <strong>Tipo:</strong> {donation?.tipo_alimento || "N/A"}
                          </div>
                          <div>
                            <strong>Qtd:</strong> {donation?.quantidade || "N/A"}
                          </div>
                          <div>
                            <strong>Validade:</strong> {formatDate(donation?.data_validade)}
                          </div>
                        </div>
                      )}
                    </td>
                    <td>{formatDate(donation?.data_cadastro_roupa || donation?.data_cadastro_alimento)}</td>
                    <td>{formatDate(donation?.data_entrega)}</td>
                    <td>
                      <span className="status-badge status-ativo">Ativo</span>
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
