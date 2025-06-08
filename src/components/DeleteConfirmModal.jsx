"use client"

import "./DeleteConfirmModal.css"

const DeleteConfirmModal = ({ donation, onClose, onConfirmDelete }) => {
  const handleDelete = () => {
    onConfirmDelete(donation.id)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="warning-icon">
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
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <h2>Confirmar Exclusão</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <p className="warning-text">Tem certeza que deseja excluir esta doação? Esta ação não pode ser desfeita.</p>

          <div className="donation-details">
            <h3>Detalhes da Doação:</h3>
            <div className="detail-item">
              <strong>Tipo:</strong> {donation.categoria} - {donation.tipo}
            </div>
            <div className="detail-item">
              <strong>Doador:</strong> {donation.doador}
            </div>
            <div className="detail-item">
              <strong>Quantidade:</strong> {donation.quantidade}
            </div>
            <div className="detail-item">
              <strong>Status:</strong> {donation.status}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="button" className="btn-delete" onClick={handleDelete}>
              Excluir Doação
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmModal
