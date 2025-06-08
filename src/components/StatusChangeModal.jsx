"use client"

import { useState } from "react"
import "./StatusChangeModal.css"

const StatusChangeModal = ({ donation, onClose, onStatusChange }) => {
  const [selectedStatus, setSelectedStatus] = useState(donation.status)
  const [observations, setObservations] = useState(donation.observacoes || "")

  const statusOptions = [
    { value: "Pendente", label: "Pendente", color: "#f59e0b" },
    { value: "Coletado", label: "Coletado", color: "#3b82f6" },
    { value: "Entregue", label: "Entregue", color: "#10b981" },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    onStatusChange(donation.id, selectedStatus)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Alterar Status da Doação</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="donation-info">
            <h3>
              {donation.categoria}: {donation.tipo}
            </h3>
            <p>Doador: {donation.doador}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Novo Status:</label>
              <div className="status-options">
                {statusOptions.map((option) => (
                  <label key={option.value} className="status-option">
                    <input
                      type="radio"
                      name="status"
                      value={option.value}
                      checked={selectedStatus === option.value}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    />
                    <span className="status-label" style={{ borderColor: option.color }}>
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="observations">Observações:</label>
              <textarea
                id="observations"
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                placeholder="Adicione observações sobre a alteração do status..."
                rows="3"
              />
            </div>

            <div className="modal-actions">
              <button type="button" className="btn-cancel" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn-confirm">
                Atualizar Status
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default StatusChangeModal
