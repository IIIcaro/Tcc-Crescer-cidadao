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

  useEffect(() => {
    // Simulando dados de posts que seriam carregados de uma API
    const blogPosts = [
      {
        id: 1,
        title: "Terapias que fazem a diferença no desenvolvimento infantil",
        excerpt:
          "Conheça as principais terapias que auxiliam no desenvolvimento de crianças com necessidades especiais.",
        content:
          "As terapias especializadas são fundamentais para o desenvolvimento de crianças com necessidades especiais. Entre as principais abordagens estão a fisioterapia, que trabalha aspectos motores; a terapia ocupacional, que desenvolve habilidades para atividades diárias; a fonoaudiologia, que trata questões de comunicação e linguagem; e a psicoterapia, que aborda aspectos emocionais e comportamentais. Cada criança possui necessidades únicas, e um plano terapêutico individualizado, iniciado precocemente e com participação familiar, oferece os melhores resultados. O acompanhamento multidisciplinar integrado permite um desenvolvimento mais completo, melhorando significativamente a qualidade de vida dessas crianças e suas famílias.",
        image: "/src/assets/img/iconFisioterapia.png",
        date: "28/03/2023",
        author: "Dr. João Santos",
        category: "Saúde",
      },
      {
        id: 2,
        title: "Como apoiar famílias de crianças com deficiência",
        excerpt:
          "Dicas práticas para oferecer suporte emocional e prático para famílias que têm crianças com deficiência.",
        content:
          "Apoiar famílias de crianças com deficiência envolve tanto suporte emocional quanto prático. É importante ouvir sem julgar, respeitando o processo de adaptação de cada família. Oferecer ajuda específica, como cuidar da criança por algumas horas ou auxiliar em tarefas domésticas, é mais efetivo que perguntas genéricas. Informar-se sobre a condição da criança demonstra interesse genuíno e ajuda a evitar perguntas desconfortáveis. Incluir a criança e sua família em atividades sociais combate o isolamento frequentemente enfrentado. Conectar a família a grupos de apoio e recursos comunitários também é valioso. Lembre-se que cada família é única, e o apoio deve ser personalizado às suas necessidades específicas, sempre com respeito e empatia.",
        image: "/src/assets/img/PuloCrianças.png",
        date: "10/03/2023",
        author: "Ana Oliveira",
        category: "Família",
      },
      {
        id: 3,
        title: "Histórias de superação: conheça nossos casos de sucesso",
        excerpt:
          "Histórias inspiradoras de crianças e adolescentes que superaram desafios com o apoio da Crescer Cidadão.",
        content:
          "Na Crescer Cidadão, testemunhamos diariamente histórias extraordinárias de superação. Como a de Pedro, diagnosticado com paralisia cerebral, que através de terapias intensivas e apoio familiar, deu seus primeiros passos aos 7 anos, momento que emocionou toda nossa equipe. Ou a história de Mariana, com síndrome de Down, que desenvolveu habilidades artísticas surpreendentes em nossas oficinas de arte, tendo suas obras expostas em uma galeria local. Temos também o caso de Lucas, com transtorno do espectro autista, que superou barreiras de comunicação e hoje participa ativamente de nossos grupos de socialização. Cada história representa não apenas conquistas individuais, mas o poder transformador do apoio adequado, da persistência e da crença no potencial de cada criança, independentemente de suas limitações iniciais.",
        image: "/src/assets/img/img3.png",
        date: "05/02/2023",
        author: "Carlos Mendes",
        category: "Histórias",
      },
      {
        id: 4,
        title: "Políticas públicas de inclusão: avanços e desafios",
        excerpt:
          "Uma análise sobre as políticas públicas de inclusão no Brasil e os desafios que ainda precisamos superar.",
        content:
          "As políticas públicas de inclusão no Brasil avançaram significativamente nas últimas décadas, com marcos como a Lei Brasileira de Inclusão (2015) e a Política Nacional de Educação Especial na Perspectiva da Educação Inclusiva. Entretanto, persistem desafios estruturais como a implementação efetiva dessas leis, especialmente em regiões menos desenvolvidas. A acessibilidade arquitetônica e comunicacional continua precária em muitos espaços públicos. Na educação, faltam profissionais especializados e recursos adequados para atender estudantes com deficiência. O mercado de trabalho ainda apresenta baixos índices de inclusão, apesar das cotas legais. Para avançarmos, é necessário maior fiscalização das leis existentes, aumento de investimentos em acessibilidade e formação profissional, além de campanhas de conscientização que combatam o preconceito e promovam uma cultura verdadeiramente inclusiva.",
        image: "/src/assets/img/img4.png",
        date: "20/01/2023",
        author: "Dra. Fernanda Lima",
        category: "Política",
      },
      {
        id: 5,
        title: "Inclusão social: transformando vidas através da educação",
        excerpt: "Como a educação inclusiva pode transformar a vida de crianças com deficiência e suas famílias.",
        content:
          "A educação inclusiva representa muito mais que uma abordagem pedagógica – é um poderoso instrumento de transformação social. Quando implementada adequadamente, permite que crianças com deficiência desenvolvam não apenas habilidades acadêmicas, mas também autoconfiança e independência. Para as famílias, ver seus filhos incluídos no ambiente escolar regular traz esperança e novas perspectivas de futuro. A convivência com a diversidade beneficia também os estudantes sem deficiência, que desenvolvem empatia, respeito às diferenças e habilidades sociais valiosas. Escolas verdadeiramente inclusivas adaptam seus métodos e espaços às necessidades de todos os alunos, contam com profissionais capacitados e trabalham em parceria com as famílias. Apesar dos desafios de implementação, os resultados são inegáveis: comunidades mais acolhedoras e uma sociedade que reconhece e valoriza o potencial de cada indivíduo, independentemente de suas características.",
        image: "/src/assets/img/img5.png",
        date: "15/04/2023",
        author: "Maria Silva",
        category: "Educação",
      },
    ]

    setPosts(blogPosts)

    // Extrair categorias únicas
    const uniqueCategories = ["Todos", ...new Set(blogPosts.map((post) => post.category))]
    setCategories(uniqueCategories)
  }, [])

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
    setSelectedCategory("Todos") // Resetar categoria ao pesquisar
  }

  // Função para lidar com a tecla Enter no campo de pesquisa
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  // Função para limpar a pesquisa
  const clearSearch = () => {
    setSearchQuery("")
    setIsSearching(false)
  }

  // Determinar quais posts mostrar com base na categoria e pesquisa
  const displayPosts = isSearching
    ? searchResults
    : selectedCategory === "Todos"
      ? posts
      : posts.filter((post) => post.category === selectedCategory)

  const handleReadMore = (post) => {
    setSelectedPost(post)
    setShowModal(true)
    // Impedir rolagem do body quando o modal está aberto
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedPost(null)
    // Restaurar rolagem do body
    document.body.style.overflow = "auto"
  }

  return (
    <div className="blog-page">
      <Header />

      <div className="blog-header">
        <div className="container">
          <div className="blog-title">
            <h1>Blog</h1>
            <p>Compartilhando conhecimento, experiências e histórias inspiradoras</p>
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
            </div>
          </div>
        </div>
      </div>

      {!isSearching && (
        <div className="featured-section">
          <div className="container">
            <div className="featured-post">
              <div className="featured-image">
                <img src="/src/assets/img/img3.png" alt="Post em destaque" />
                <div className="featured-category">Histórias</div>
              </div>
              <div className="featured-content">
                <h2>Histórias de superação: conheça nossos casos de sucesso</h2>
                <p>
                  Histórias inspiradoras de crianças e adolescentes que superaram desafios com o apoio da Crescer
                  Cidadão.
                </p>
                <div className="featured-meta">
                  <span className="featured-author">Carlos Mendes</span>
                  <span className="featured-date">05/02/2023</span>
                </div>
                <button className="featured-button" onClick={() => handleReadMore(posts[2])}>
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
                <p>Tente uma pesquisa diferente ou explore nossas categorias.</p>
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
            <div className="modal-related">
              <h3>Artigos Relacionados</h3>
              <div className="related-posts">
                {posts
                  .filter((post) => post.id !== selectedPost.id && post.category === selectedPost.category)
                  .slice(0, 2)
                  .map((post) => (
                    <div className="related-post" key={post.id}>
                      <div className="related-post-image">
                        <img src={post.image || "/placeholder.svg"} alt={post.title} />
                      </div>
                      <div className="related-post-content">
                        <h4
                          onClick={() => {
                            closeModal()
                            setTimeout(() => handleReadMore(post), 300)
                          }}
                        >
                          {post.title}
                        </h4>
                        <span>{post.date}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default Blog
