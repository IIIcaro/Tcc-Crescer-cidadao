"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import { Footer } from "../components/footer"
import "./MeuPainelADM.css"

const MeuPainelADM = () => {
  const [activeTab, setActiveTab] = useState("usuarios")
  const [usuarios, setUsuarios] = useState([])
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()

  // Estados para modal de blog
  const [showBlogModal, setShowBlogModal] = useState(false)
  const [editingBlog, setEditingBlog] = useState(null)
  const [blogForm, setBlogForm] = useState({
    titulo: "",
    conteudo: "",
  })

  // Verificar se é admin
  useEffect(() => {
    const tipoUsuario = localStorage.getItem("usuarioTipo")
    if (tipoUsuario !== "admin") {
      navigate("/")
      return
    }
    carregarDados()
  }, [navigate])

  const carregarDados = async () => {
    setLoading(true)
    try {
      await Promise.all([carregarUsuarios(), carregarBlogs()])
    } catch (error) {
      setError("Erro ao carregar dados")
    } finally {
      setLoading(false)
    }
  }

  const carregarUsuarios = async () => {
    try {
      const response = await fetch("http://localhost/backend/admin/listar_usuarios.php", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("usuarioToken")}`,
        },
      })
      const data = await response.json()
      if (data.error) {
        throw new Error(data.message)
      }
      setUsuarios(data.usuarios)
    } catch (error) {
      setError("Erro ao carregar usuários")
    }
  }

  const carregarBlogs = async () => {
    try {
      const response = await fetch("http://localhost/backend/admin/listar_blogs.php", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("usuarioToken")}`,
        },
      })
      const data = await response.json()
      if (data.error) {
        throw new Error(data.message)
      }
      setBlogs(data.blogs)
    } catch (error) {
      setError("Erro ao carregar blogs")
    }
  }

  const excluirUsuario = async (id) => {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return

    try {
      const response = await fetch("http://localhost/backend/admin/excluir_usuario.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("usuarioToken")}`,
        },
        body: JSON.stringify({ id }),
      })
      const data = await response.json()
      if (data.error) {
        throw new Error(data.message)
      }
      setSuccess("Usuário excluído com sucesso")
      carregarUsuarios()
    } catch (error) {
      setError("Erro ao excluir usuário")
    }
  }

  const abrirModalBlog = (blog = null) => {
    setEditingBlog(blog)
    setBlogForm({
      titulo: blog ? blog.titulo : "",
      conteudo: blog ? blog.conteudo : "",
    })
    setShowBlogModal(true)
  }

  const fecharModalBlog = () => {
    setShowBlogModal(false)
    setEditingBlog(null)
    setBlogForm({ titulo: "", conteudo: "" })
  }

  const salvarBlog = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = editingBlog
        ? "http://localhost/backend/admin/editar_blog.php"
        : "http://localhost/backend/admin/criar_blog.php"

      const body = editingBlog
        ? { ...blogForm, id: editingBlog.id }
        : blogForm

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("usuarioToken")}`,
        },
        body: JSON.stringify(body),
      })

      const data = await response.json()
      if (data.error) {
        throw new Error(data.message)
      }

      setSuccess(editingBlog ? "Blog atualizado com sucesso" : "Blog criado com sucesso")
      fecharModalBlog()
      carregarBlogs()
    } catch (error) {
      setError("Erro ao salvar blog")
    } finally {
      setLoading(false)
    }
  }

  const excluirBlog = async (id) => {
    if (!confirm("Tem certeza que deseja excluir este blog?")) return

    try {
      const response = await fetch("http://localhost/backend/admin/excluir_blog.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("usuarioToken")}`,
        },
        body: JSON.stringify({ id }),
      })
      const data = await response.json()
      if (data.error) {
        throw new Error(data.message)
      }
      setSuccess("Blog excluído com sucesso")
      carregarBlogs()
    } catch (error) {
      setError("Erro ao excluir blog")
    }
  }

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getTipoUsuarioLabel = (tipo) => {
    const tipos = {
      usuario_normal: "Usuário Normal",
      voluntario: "Voluntário",
      admin: "Administrador",
    }
    return tipos[tipo] || tipo
  }

  const getTipoUsuarioClass = (tipo) => {
    const classes = {
      usuario_normal: "tipo-normal",
      voluntario: "tipo-voluntario",
      admin: "tipo-admin",
    }
    return classes[tipo] || "tipo-normal"
  }

  return (
    <div className="admin-page">
      <Header />

      <div className="admin-container">
        <div className="admin-header">
          <h1>Painel Administrativo</h1>
          <p>Gerencie usuários e conteúdo do sistema</p>
        </div>

        {error && (
          <div className="alert alert-error">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            {success}
          </div>
        )}

        <div className="admin-tabs">
          <button
            className={`tab-button ${activeTab === "usuarios" ? "active" : ""}`}
            onClick={() => setActiveTab("usuarios")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Usuários ({usuarios.length})
          </button>
          <button
            className={`tab-button ${activeTab === "blogs" ? "active" : ""}`}
            onClick={() => setActiveTab("blogs")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
            </svg>
            Blogs ({blogs.length})
          </button>
        </div>

        <div className="admin-content">
          {activeTab === "usuarios" && (
            <div className="usuarios-section">
              <div className="section-header">
                <h2>Gerenciar Usuários</h2>
                <button className="btn btn-primary" onClick={carregarUsuarios}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
                  </svg>
                  Atualizar
                </button>
              </div>

              <div className="table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nome</th>
                      <th>Email</th>
                      <th>Tipo</th>
                      <th>Data Cadastro</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map((usuario) => (
                      <tr key={usuario.id}>
                        <td>{usuario.id}</td>
                        <td>{usuario.nome}</td>
                        <td>{usuario.email}</td>
                        <td>
                          <span className={`tipo-badge ${getTipoUsuarioClass(usuario.tipo_usuario)}`}>
                            {getTipoUsuarioLabel(usuario.tipo_usuario)}
                          </span>
                        </td>
                        <td>{formatarData(usuario.data_cadastro)}</td>
                        <td>
                          <div className="action-buttons">
                            {usuario.tipo_usuario !== "admin" && (
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => excluirUsuario(usuario.id)}
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                                </svg>
                                Excluir
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "blogs" && (
            <div className="blogs-section">
              <div className="section-header">
                <h2>Gerenciar Blogs</h2>
                <div className="header-actions">
                  <button className="btn btn-success" onClick={() => abrirModalBlog()}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                    </svg>
                    Novo Blog
                  </button>
                  <button className="btn btn-primary" onClick={carregarBlogs}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
                    </svg>
                    Atualizar
                  </button>
                </div>
              </div>

              <div className="blogs-grid">
                {blogs.map((blog) => (
                  <div key={blog.id} className="blog-card">
                    <div className="blog-header">
                      <h3>{blog.titulo}</h3>
                      <div className="blog-actions">
                        <button className="btn btn-primary btn-sm" onClick={() => abrirModalBlog(blog)}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                          </svg>
                          Editar
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => excluirBlog(blog.id)}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                          </svg>
                          Excluir
                        </button>
                      </div>
                    </div>
                    <div className="blog-content">
                      <p>{blog.conteudo.substring(0, 150)}...</p>
                    </div>
                    <div className="blog-footer">
                      <span className="blog-date">Criado em: {formatarData(blog.data_criacao)}</span>
                      <span className={`status-badge ${blog.status}`}>{blog.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Blog */}
      {showBlogModal && (
        <div className="modal-overlay" onClick={fecharModalBlog}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingBlog ? "Editar Blog" : "Novo Blog"}</h3>
              <button className="modal-close" onClick={fecharModalBlog}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            </div>
            <form onSubmit={salvarBlog} className="modal-form">
              <div className="form-group">
                <label htmlFor="titulo">Título</label>
                <input
                  type="text"
                  id="titulo"
                  value={blogForm.titulo}
                  onChange={(e) => setBlogForm({ ...blogForm, titulo: e.target.value })}
                  required
                  placeholder="Digite o título do blog"
                />
              </div>
              <div className="form-group">
                <label htmlFor="conteudo">Conteúdo</label>
                <textarea
                  id="conteudo"
                  value={blogForm.conteudo}
                  onChange={(e) => setBlogForm({ ...blogForm, conteudo: e.target.value })}
                  required
                  rows="10"
                  placeholder="Digite o conteúdo do blog"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={fecharModalBlog}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Salvando..." : editingBlog ? "Atualizar" : "Criar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default MeuPainelADM
