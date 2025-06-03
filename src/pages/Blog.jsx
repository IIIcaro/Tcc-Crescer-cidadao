"use client"

import { useState, useEffect } from "react"
import "./Blog.css"
import Header from "../components/Header"
import { Footer } from "../components/footer"

const Blog = () => {
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [selectedPost, setSelectedPost] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  // Estados para CMS Admin
  const [isAdmin, setIsAdmin] = useState(false)
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [editingPost, setEditingPost] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Estados para formulário de post
  const [postForm, setPostForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    author: "",
    image: "",
  })

  useEffect(() => {
    // Verificar se é admin (verificação estrita)
    const userToken = localStorage.getItem("usuarioToken")
    const isAdminStored = localStorage.getItem("usuarioIsAdmin")

    // Apenas usuários com flag is_admin podem acessar o painel admin
    if (userToken && isAdminStored === "true") {
      setIsAdmin(true)
    }

    loadPosts()
  }, [])

  // Carregar posts do backend
  const loadPosts = async () => {
    try {
      const response = await fetch("http://localhost/backend/blog/get_posts.php")
      const data = await response.json()

      if (!data.error) {
        setPosts(data.posts || [])

        // Extrair categorias únicas
        if (data.posts && data.posts.length > 0) {
          const uniqueCategories = ["Todos", ...new Set(data.posts.map((post) => post.category))]
          setCategories(uniqueCategories)
        } else {
          setCategories(["Todos"])
        }
      }
    } catch (error) {
      console.error("Erro ao carregar posts:", error)
      setPosts([])
      setCategories(["Todos"])
    }
  }

  // Função para realizar a pesquisa
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setIsSearching(false)
      return
    }

    const query = searchQuery.toLowerCase().trim()
    const results = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query),
    )

    setSearchResults(results)
    setIsSearching(true)
    setSelectedCategory("Todos")
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    setIsSearching(false)
  }

  // Determinar quais posts mostrar
  const displayPosts = isSearching
    ? searchResults
    : selectedCategory === "Todos"
      ? posts
      : posts.filter((post) => post.category === selectedCategory)

  const handleReadMore = (post) => {
    setSelectedPost(post)
    setShowModal(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedPost(null)
    document.body.style.overflow = "auto"
  }

  // Funções do CMS Admin
  const openAdminPanel = () => {
    setShowAdminPanel(true)
    setEditingPost(null)
    resetPostForm()
    document.body.style.overflow = "hidden"
  }

  const closeAdminPanel = () => {
    setShowAdminPanel(false)
    setEditingPost(null)
    resetPostForm()
    document.body.style.overflow = "auto"
  }

  const resetPostForm = () => {
    setPostForm({
      title: "",
      excerpt: "",
      content: "",
      category: "",
      author: "",
      image: "",
    })
  }

  const handleEditPost = (post) => {
    setEditingPost(post)
    setPostForm({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      author: post.author,
      image: post.image,
    })
  }

  const handleDeletePost = async (postId) => {
    if (!confirm("Tem certeza que deseja excluir este post?")) {
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("http://localhost/backend/blog/delete_post.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: postId }),
      })

      const data = await response.json()

      if (!data.error) {
        alert("Post excluído com sucesso!")
        loadPosts()
      } else {
        alert("Erro ao excluir post: " + data.message)
      }
    } catch (error) {
      console.error("Erro ao excluir post:", error)
      alert("Erro ao conectar com o servidor")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSavePost = async (e) => {
    e.preventDefault()

    if (!postForm.title || !postForm.excerpt || !postForm.content || !postForm.category || !postForm.author) {
      alert("Preencha todos os campos obrigatórios")
      return
    }

    setIsLoading(true)
    try {
      const url = editingPost
        ? "http://localhost/backend/blog/update_post.php"
        : "http://localhost/backend/blog/create_post.php"

      const payload = editingPost ? { ...postForm, id: editingPost.id } : postForm

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!data.error) {
        alert(editingPost ? "Post atualizado com sucesso!" : "Post criado com sucesso!")
        loadPosts()
        closeAdminPanel()
      } else {
        alert("Erro ao salvar post: " + data.message)
      }
    } catch (error) {
      console.error("Erro ao salvar post:", error)
      alert("Erro ao conectar com o servidor")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="blog-page">
      <Header />

      <div className="blog-header">
        <div className="container">
          <div className="blog-title">
            <h1>Blog</h1>
            <p>Compartilhando conhecimento, experiências e histórias inspiradoras</p>
            {isAdmin && (
              <div className="admin-badge">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Modo Administrador
              </div>
            )}
          </div>
          <div className="search-container">
            <div className="hero-search">
              <input
                type="text"
                placeholder="Buscar no blog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button onClick={handleSearch}>Buscar</button>
              {isAdmin && (
                <button className="admin-edit-btn" onClick={openAdminPanel}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
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
                  Editar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {!isSearching && posts.length > 0 && (
        <div className="featured-section">
          <div className="container">
            <div className="featured-post">
              <div className="featured-image">
                <img src={posts[0]?.image || "/placeholder.svg"} alt="Post em destaque" />
                <div className="featured-category">{posts[0]?.category}</div>
              </div>
              <div className="featured-content">
                <h2>{posts[0]?.title}</h2>
                <p>{posts[0]?.excerpt}</p>
                <div className="featured-meta">
                  <span className="featured-author">{posts[0]?.author}</span>
                  <span className="featured-date">{posts[0]?.date}</span>
                </div>
                <button className="featured-button" onClick={() => handleReadMore(posts[0])}>
                  Ler artigo completo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="blog-content">
        <div className="container">
          {isSearching && (
            <div className="search-results-header">
              <h2>
                Resultados da pesquisa: {searchResults.length} {searchResults.length === 1 ? "artigo" : "artigos"}{" "}
                encontrado{searchResults.length !== 1 ? "s" : ""} para "{searchQuery}"
              </h2>
              <button className="clear-search-btn" onClick={clearSearch}>
                Limpar pesquisa
              </button>
            </div>
          )}

          {!isSearching && (
            <div className="blog-categories">
              <div className="category-buttons">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`category-button ${selectedCategory === category ? "active" : ""}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="posts-section">
            {!isSearching && (
              <h2>{selectedCategory === "Todos" ? "Artigos Recentes" : `Artigos em ${selectedCategory}`}</h2>
            )}

            {displayPosts.length > 0 ? (
              <div className="posts-grid">
                {displayPosts.map((post) => (
                  <div className="post-card" key={post.id}>
                    <div className="post-image">
                      <img src={post.image || "/placeholder.svg"} alt={post.title} />
                      <div className="post-category">{post.category}</div>
                      {isAdmin && (
                        <div className="admin-post-actions">
                          <button
                            className="admin-action-btn edit"
                            onClick={() => {
                              handleEditPost(post)
                              setShowAdminPanel(true)
                            }}
                            title="Editar post"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
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
                          <button
                            className="admin-action-btn delete"
                            onClick={() => handleDeletePost(post.id)}
                            title="Excluir post"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="3,6 5,6 21,6" />
                              <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2" />
                              <line x1="10" y1="11" x2="10" y2="17" />
                              <line x1="14" y1="11" x2="14" y2="17" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="post-content">
                      <h3>{post.title}</h3>
                      <p>{post.excerpt}</p>
                      <div className="post-meta">
                        <span className="post-author">{post.author}</span>
                        <span className="post-date">{post.date}</span>
                      </div>
                      <button className="read-more-btn" onClick={() => handleReadMore(post)}>
                        Ler mais
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <h3>Nenhum artigo encontrado</h3>
                {isAdmin ? (
                  <div>
                    <p>Comece criando seu primeiro artigo no blog!</p>
                    <button className="admin-btn create" onClick={() => {
                      setEditingPost({})
                      setShowAdminPanel(true)
                    }}>
                      + Criar Novo Post
                    </button>
                  </div>
                ) : (
                  <p>Volte em breve para conferir nossos artigos.</p>
                )}
              </div>
            )}
          </div>

          {!isSearching && displayPosts.length > 0 && (
            <div className="blog-pagination">
              <button className="pagination-btn active">1</button>
              <button className="pagination-btn">2</button>
              <button className="pagination-btn">3</button>
              <button className="pagination-btn next">Próximo →</button>
            </div>
          )}
        </div>
      </div>

      <div className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h2>Inscreva-se em nossa newsletter</h2>
              <p>
                Receba novidades, artigos e histórias inspiradoras diretamente no seu e-mail. Prometemos não enviar
                spam!
              </p>
            </div>
            <form className="newsletter-form">
              <div className="form-group">
                <input type="text" placeholder="Seu nome" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Seu melhor e-mail" required />
              </div>
              <button type="submit">Inscrever-se</button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal de leitura do post */}
      {showModal && selectedPost && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            <div className="modal-header">
              <div className="modal-category">{selectedPost.category}</div>
              <h2>{selectedPost.title}</h2>
              <div className="modal-meta">
                <span className="modal-author">Por {selectedPost.author}</span>
                <span className="modal-date">Publicado em {selectedPost.date}</span>
              </div>
            </div>
            <div className="modal-image">
              <img src={selectedPost.image || "/placeholder.svg"} alt={selectedPost.title} />
            </div>
            <div className="modal-body">
              <p>{selectedPost.content}</p>
            </div>
            <div className="modal-footer">
              <div className="modal-tags">
                <span>Tags:</span>
                <a href="#">inclusão</a>
                <a href="#">educação</a>
                <a href="#">desenvolvimento</a>
              </div>
              <div className="modal-share">
                <span>Compartilhar:</span>
                <button className="share-btn facebook">Facebook</button>
                <button className="share-btn twitter">Twitter</button>
                <button className="share-btn whatsapp">WhatsApp</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal do CMS Admin */}
      {showAdminPanel && (
        <div className="modal-overlay admin-modal-overlay">
          <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>{editingPost && editingPost.id ? "Editar Post" : "Criar Novo Post"}</h2>
              <button className="modal-close" onClick={closeAdminPanel}>
                ×
              </button>
            </div>

            <div className="admin-modal-body">
              {!editingPost && (
                <div className="admin-posts-list">
                  <h3>Posts Existentes</h3>
                  {posts.length > 0 ? (
                    <div className="admin-posts-grid">
                      {posts.map((post) => (
                        <div key={post.id} className="admin-post-item">
                          <div className="admin-post-info">
                            <h4>{post.title}</h4>
                            <p>
                              {post.category} • {post.author} • {post.date}
                            </p>
                          </div>
                          <div className="admin-post-actions-list">
                            <button className="admin-btn edit" onClick={() => handleEditPost(post)}>
                              Editar
                            </button>
                            <button className="admin-btn delete" onClick={() => handleDeletePost(post.id)}>
                              Excluir
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="no-posts-message">
                      <p>Nenhum post encontrado. Comece criando seu primeiro artigo!</p>
                    </div>
                  )}
                  <button className="admin-btn create" onClick={() => setEditingPost({})}>
                    + Criar Novo Post
                  </button>
                </div>
              )}

              {editingPost && (
                <form className="admin-post-form" onSubmit={handleSavePost}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Título *</label>
                      <input
                        type="text"
                        value={postForm.title}
                        onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Categoria *</label>
                      <select
                        value={postForm.category}
                        onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                        required
                      >
                        <option value="">Selecione uma categoria</option>
                        <option value="Saúde">Saúde</option>
                        <option value="Família">Família</option>
                        <option value="Histórias">Histórias</option>
                        <option value="Política">Política</option>
                        <option value="Educação">Educação</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Autor *</label>
                      <input
                        type="text"
                        value={postForm.author}
                        onChange={(e) => setPostForm({ ...postForm, author: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>URL da Imagem</label>
                      <input
                        type="url"
                        value={postForm.image}
                        onChange={(e) => setPostForm({ ...postForm, image: e.target.value })}
                        placeholder="https://exemplo.com/imagem.jpg"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Resumo *</label>
                    <textarea
                      value={postForm.excerpt}
                      onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
                      rows="3"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Conteúdo *</label>
                    <textarea
                      value={postForm.content}
                      onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                      rows="10"
                      required
                    />
                  </div>

                  <div className="admin-form-actions">
                    <button type="button" className="admin-btn cancel" onClick={() => setEditingPost(null)}>
                      Cancelar
                    </button>
                    <button type="submit" className="admin-btn save" disabled={isLoading}>
                      {isLoading ? "Salvando..." : editingPost.id ? "Atualizar" : "Criar"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default Blog
