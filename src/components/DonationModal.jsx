"use client"

import { useState } from "react"
import "./DonationModal.css"

const DonationModal = ({ type, user, onClose }) => {
  const [formData, setFormData] = useState({
    // Campos comuns
    quantidade: "",
    data_entrega: "",
    descricao: "",
    // Campos específicos para alimentos
    tipo_alimento: "",
    data_validade: "",
    // Campos específicos para roupas
    tipo_roupa: "",
    condicao: "",
    tamanho: "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const action = type === "food" ? "donate_food" : "donate_clothes"

    try {
      const response = await fetch("http://localhost/backend/donations.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action,
          token: user.token,
          ...formData,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setMessage("Doação cadastrada com sucesso!")
        setTimeout(() => {
          onClose()
        }, 1500)
      } else {
        setMessage(data.message)
      }
    } catch (error) {
      setMessage("Erro ao cadastrar doação")
    }

    setLoading(false)
  }

  const getMinDate = () => {
    const today = new Date()
    return today.toISOString().split("T")[0]
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content donation-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>
          &times;
        </button>
        <h3 className="modal-title">{type === "food" ? "Doação de Alimentos" : "Doação de Roupas"}</h3>
        <p className="modal-description">
          Preencha as informações sobre {type === "food" ? "os alimentos" : "as roupas"} que deseja doar
        </p>

        <form onSubmit={handleSubmit} className="donation-form">
          {type === "food" ? (
            <>
              <div className="form-group">
                <label htmlFor="tipo_alimento">Tipo de Alimento *</label>
                <select
                  id="tipo_alimento"
                  name="tipo_alimento"
                  value={formData.tipo_alimento}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione o tipo</option>
                  <option value="arroz">Arroz</option>
                  <option value="feijao">Feijão</option>
                  <option value="macarrao">Macarrão</option>
                  <option value="oleo">Óleo</option>
                  <option value="acucar">Açúcar</option>
                  <option value="sal">Sal</option>
                  <option value="farinha">Farinha</option>
                  <option value="leite-po">Leite em Pó</option>
                  <option value="cafe">Café</option>
                  <option value="sardinha">Sardinha</option>
                  <option value="atum">Atum</option>
                  <option value="molho-tomate">Molho de Tomate</option>
                  <option value="biscoito">Biscoito</option>
                  <option value="aveia">Aveia</option>
                  <option value="outros">Outros</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="data_validade">Data de Validade</label>
                <input
                  type="date"
                  id="data_validade"
                  name="data_validade"
                  value={formData.data_validade}
                  onChange={handleChange}
                />
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="tipo_roupa">Tipo de Roupa *</label>
                <select
                  id="tipo_roupa"
                  name="tipo_roupa"
                  value={formData.tipo_roupa}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione o tipo</option>
                  <option value="camiseta">Camiseta</option>
                  <option value="calca">Calça</option>
                  <option value="vestido">Vestido</option>
                  <option value="blusa">Blusa</option>
                  <option value="shorts">Shorts</option>
                  <option value="saia">Saia</option>
                  <option value="casaco">Casaco</option>
                  <option value="jaqueta">Jaqueta</option>
                  <option value="sapato">Sapato</option>
                  <option value="tenis">Tênis</option>
                  <option value="roupa-intima">Roupa Íntima</option>
                  <option value="outros">Outros</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="condicao">Condição *</label>
                <select
                  id="condicao"
                  name="condicao"
                  value={formData.condicao}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione a condição</option>
                  <option value="nova">Nova (com etiqueta)</option>
                  <option value="seminova">Seminova (pouco uso)</option>
                  <option value="usada-bom-estado">Usada em bom estado</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="tamanho">Tamanho</label>
                <select
                  id="tamanho"
                  name="tamanho"
                  value={formData.tamanho}
                  onChange={handleChange}
                >
                  <option value="">Selecione o tamanho</option>
                  <option value="pp">PP</option>
                  <option value="p">P</option>
                  <option value="m">M</option>
                  <option value="g">G</option>
                  <option value="gg">GG</option>
                  <option value="xgg">XGG</option>
                  <option value="infantil-2">Infantil 2 anos</option>
                  <option value="infantil-4">Infantil 4 anos</option>
                  <option value="infantil-6">Infantil 6 anos</option>
                  <option value="infantil-8">Infantil 8 anos</option>
                  <option value="infantil-10">Infantil 10 anos</option>
                  <option value="infantil-12">Infantil 12 anos</option>
                  <option value="variados">Tamanhos variados</option>
                </select>
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="quantidade">Quantidade *</label>
            <input
              type="text"
              id="quantidade"
              name="quantidade"
              placeholder={type === "food" ? "Ex: 2 pacotes de 1kg, 5 latas, etc." : "Ex: 5 peças"}
              value={formData.quantidade}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="data_entrega">Data para entrega na ONG *</label>
            <input
              type="date"
              id="data_entrega"
              name="data_entrega"
              min={getMinDate()}
              value={formData.data_entrega}
              onChange={handleChange}
              required
            />
            <small className="form-help">Selecione uma data para comparecer à ONG e entregar sua doação</small>
          </div>

          <div className="form-group">
            <label htmlFor="descricao">Descrição adicional</label>
            <textarea
              id="descricao"
              name="descricao"
              rows="3"
              placeholder={
                type === "food"
                  ? "Descreva marcas, condições de armazenamento ou outras informações relevantes..."
                  : "Descreva cores, marcas ou outras informações relevantes..."
              }
              value={formData.descricao}
              onChange={handleChange}
            ></textarea>
          </div>

          {message && <div className={message.includes("sucesso") ? "success-message" : "error-message"}>{message}</div>}

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-secondary" disabled={loading}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Cadastrando..." : "Confirmar Doação"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DonationModal
