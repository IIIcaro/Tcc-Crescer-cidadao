"use client"

import "./ViewDonationModal.css"

const ViewDonationModal = ({ donation, onClose }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("pt-BR")
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content view-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Detalhes da Doação</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="donation-grid">
            <div className="info-section">
              <h3>Informações Gerais</h3>
              <div className="info-item">
                <label>Categoria:</label>
                <span className={`category-badge ${donation.categoria.toLowerCase()}`}>{donation.categoria}</span>
              </div>
              <div className="info-item">
                <label>Tipo:</label>
                <span>{donation.tipo}</span>
              </div>
              <div className="info-item">
                <label>Quantidade:</label>
                <span>{donation.quantidade}</span>
              </div>
              <div className="info-item">
                <label>Status:</label>
                <span className={`status-badge status-${donation.status.toLowerCase()}`}>{donation.status}</span>
              </div>
            </div>

            <div className="info-section">
              <h3>Informações do Doador</h3>
              <div className="info-item">
                <label>Nome:</label>
                <span>{donation.doador}</span>
              </div>
              <div className="info-item">
                <label>Email:</label>
                <span>{donation.email || "N/A"}</span>
              </div>
            </div>

            <div className="info-section">
              <h3>Datas</h3>
              <div className="info-item">
                <label>Data de Cadastro:</label>
                <span>{formatDateTime(donation.dataCadastro)}</span>
              </div>
              <div className="info-item">
                <label>Data de Agendamento:</label>
                <span>{formatDate(donation.dataAgendamento)}</span>
              </div>
            </div>

            {donation.categoria === "Roupa" ? (
              <div className="info-section">
                <h3>Detalhes da Roupa</h3>
                <div className="info-item">
                  <label>Tamanho:</label>
                  <span>{donation.tamanho || "N/A"}</span>
                </div>
                <div className="info-item">
                  <label>Condição:</label>
                  <span>{donation.condicao || "N/A"}</span>
                </div>
              </div>
            ) : (
              <div className="info-section">
                <h3>Detalhes do Alimento</h3>
                {donation.data_validade && (
                  <div className="info-item">
                    <label>Data de Validade:</label>
                    <span>{formatDate(donation.data_validade)}</span>
                  </div>
                )}
              </div>
            )}

            {donation.observacoes && (
              <div className="info-section full-width">
                <h3>Observações</h3>
                <div className="observations">
                  <p>{donation.observacoes}</p>
                </div>
              </div>
            )}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-close" onClick={onClose}>
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewDonationModal
