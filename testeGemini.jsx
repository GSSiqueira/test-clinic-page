import React, { useState, useEffect } from 'react';
import { 
  Menu, X, MapPin, Phone, Mail, 
  Brain, Activity, MessageCircle, 
  ArrowLeft, Star, ChevronRight, CheckCircle 
} from 'lucide-react';

// Configuração de Estilo e Cores
const PRIMARY_COLOR = 'rgb(248, 179, 25)';
const PRIMARY_COLOR_HOVER = 'rgb(228, 159, 5)';

// Dados Mockados
const SERVICES_DATA = [
  {
    id: 'neuroestimulacao',
    title: 'Neuroestimulação',
    icon: <Activity size={48} style={{ color: PRIMARY_COLOR }} />,
    shortDesc: 'Técnicas avançadas e não invasivas para modulação da atividade cerebral.',
    fullDesc: 'A neuroestimulação utiliza tecnologias modernas como a Estimulação Magnética Transcraniana (EMT) e a Estimulação por Corrente Contínua (tDCS) para tratar condições como depressão, ansiedade e dores crônicas. É um procedimento seguro, não invasivo e com alta eficácia clínica.',
    benefits: ['Tratamento sem medicação excessiva', 'Sessões rápidas e indolores', 'Resultados comprovados cientificamente', 'Melhora da plasticidade cerebral']
  },
  {
    id: 'mapeamento',
    title: 'Mapeamento Cerebral',
    icon: <Brain size={48} style={{ color: PRIMARY_COLOR }} />,
    shortDesc: 'Análise detalhada do funcionamento elétrico do seu cérebro (QEEG).',
    fullDesc: 'O Mapeamento Cerebral, ou Eletroencefalograma Quantitativo (QEEG), permite visualizar as ondas cerebrais em tempo real. Com isso, identificamos padrões de desregulação que podem estar associados a TDAH, insônia, ansiedade e outros transtornos, permitindo um tratamento personalizado.',
    benefits: ['Diagnóstico mais preciso', 'Visualização gráfica do funcionamento cerebral', 'Personalização do tratamento', 'Monitoramento da evolução clínica']
  },
  {
    id: 'tcc',
    title: 'Terapia Cognitivo Comportamental',
    icon: <MessageCircle size={48} style={{ color: PRIMARY_COLOR }} />,
    shortDesc: 'Abordagem focada na reestruturação de pensamentos e mudança de comportamentos.',
    fullDesc: 'A TCC é uma das abordagens mais eficazes da psicologia moderna. Focamos em identificar e modificar padrões de pensamento disfuncionais que influenciam suas emoções e comportamentos. É uma terapia ativa, estruturada e orientada para o presente e para a resolução de problemas.',
    benefits: ['Foco na solução de problemas', 'Desenvolvimento de autonomia', 'Técnicas práticas para o dia a dia', 'Prevenção de recaídas']
  }
];

const TESTIMONIALS = [
  { id: 1, name: "Mariana S.", text: "Acolhimento incrível desde o primeiro dia. O mapeamento cerebral mudou a forma como entendo minha ansiedade.", rating: 5 },
  { id: 2, name: "Carlos E.", text: "A clínica tem uma energia muito boa. A Dra. Helena é extremamente competente e atenciosa.", rating: 5 },
  { id: 3, name: "Fernanda L.", text: "Faço neuroestimulação há 2 meses e os resultados são visíveis. Recomendo muito!", rating: 4 }
];

// Componente de Botão Reutilizável
const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
  const baseStyle = "px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5";
  const styles = {
    primary: `text-white`,
    outline: `bg-white border-2 border-[${PRIMARY_COLOR}] text-[${PRIMARY_COLOR}] hover:bg-orange-50`,
  };

  // Inline style for dynamic color injection since Tailwind needs exact classes usually
  const customStyle = variant === 'primary' 
    ? { backgroundColor: PRIMARY_COLOR, color: 'white' }
    : { backgroundColor: 'white', border: `2px solid ${PRIMARY_COLOR}`, color: PRIMARY_COLOR };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyle} ${className}`}
      style={customStyle}
    >
      {children}
    </button>
  );
};

// Página de Detalhes do Serviço
const ServiceDetail = ({ service, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-orange-50 pt-24 pb-12 px-4 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-600 mb-8 hover:text-orange-500 transition-colors"
        >
          <ArrowLeft className="mr-2" size={20} /> Voltar para Início
        </button>

        <div className="bg-white rounded-[2.5rem] shadow-xl p-6 md:p-12 overflow-hidden relative">
          {/* Decorative Blob */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-orange-100 opacity-50 -mr-20 -mt-20 pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center mb-8 gap-6">
              <div className="p-6 rounded-3xl bg-orange-50 shadow-inner">
                {service.icon}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-800">{service.title}</h1>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {service.fullDesc}
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Benefícios do Tratamento</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {service.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center bg-orange-50 p-4 rounded-2xl">
                  <CheckCircle className="mr-3 flex-shrink-0" size={24} style={{ color: PRIMARY_COLOR }} />
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 p-8 bg-gray-50 rounded-3xl text-center">
              <h4 className="text-xl font-semibold mb-4">Gostaria de saber mais sobre este tratamento?</h4>
              <Button onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}>
                Agendar Avaliação
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente Principal
export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' or serviceId
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(null);

  const handleNavigate = (viewId) => {
    if (viewId === 'home') {
      setCurrentView('home');
      setActiveService(null);
      window.scrollTo(0, 0);
    } else {
      const service = SERVICES_DATA.find(s => s.id === viewId);
      if (service) {
        setActiveService(service);
        setCurrentView('service');
      }
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (id) => {
    if (currentView !== 'home') {
      handleNavigate('home');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  // Navbar Component
  const Navbar = () => (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-sm py-4 transition-all">
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => handleNavigate('home')}
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: PRIMARY_COLOR }}>
            <Brain className="text-white" size={24} />
          </div>
          <span className="text-2xl font-bold text-gray-800 tracking-tight">
            Clínica <span style={{ color: PRIMARY_COLOR }}>Aurum</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection('about')} className="text-gray-600 hover:text-orange-500 font-medium">A Profissional</button>
          <button onClick={() => scrollToSection('services')} className="text-gray-600 hover:text-orange-500 font-medium">Tratamentos</button>
          <button onClick={() => scrollToSection('testimonials')} className="text-gray-600 hover:text-orange-500 font-medium">Depoimentos</button>
          <Button onClick={() => scrollToSection('contact')}>Fale Conosco</Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-6 px-4 flex flex-col gap-4 border-t border-gray-100">
          <button onClick={() => scrollToSection('about')} className="text-left text-lg py-2 text-gray-700">A Profissional</button>
          <button onClick={() => scrollToSection('services')} className="text-left text-lg py-2 text-gray-700">Tratamentos</button>
          <button onClick={() => scrollToSection('testimonials')} className="text-left text-lg py-2 text-gray-700">Depoimentos</button>
          <Button onClick={() => scrollToSection('contact')} className="w-full text-center mt-2">Fale Conosco</Button>
        </div>
      )}
    </nav>
  );

  // Home View Content
  const HomeContent = () => (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-50 rounded-l-[100px] -z-10 hidden md:block"></div>
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6">
              <div className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-600 font-semibold text-sm">
                Bem-vindo à Clínica Aurum
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Iluminando caminhos para o seu <span style={{ color: PRIMARY_COLOR }}>bem-estar mental.</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                Combinamos tecnologia de ponta em neurociência com acolhimento humano para transformar vidas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button onClick={() => scrollToSection('contact')}>Agendar Consulta</Button>
                <Button variant="outline" onClick={() => scrollToSection('services')}>Conhecer Tratamentos</Button>
              </div>
            </div>
            {/* Mock Image Placeholder */}
            <div className="md:w-1/2 w-full">
              <div className="relative aspect-[4/3] bg-gray-200 rounded-[3rem] overflow-hidden shadow-2xl">
                 {/* Using a div to represent an image for the mock */}
                 <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=2070&auto=format&fit=crop")', backgroundColor: '#f3f4f6' }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-orange-50 rounded-[3rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
            <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0 rounded-full overflow-hidden border-4 shadow-lg" style={{ borderColor: PRIMARY_COLOR }}>
               <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop" alt="Dra. Helena Campos" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Dra. Helena Campos</h2>
              <p className="text-orange-500 font-semibold mb-4">Psicóloga Responsável - CRP 06/12345</p>
              <p className="text-gray-700 leading-relaxed">
                "Acredito que a união entre a ciência do cérebro e a sensibilidade da escuta é o caminho para uma saúde mental plena. Com especialização em Neuropsicologia pela USP e certificação internacional em Neurofeedback, fundei a Clínica Aurum para oferecer tratamentos que integram corpo, mente e tecnologia."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Nossas Especialidades</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Tecnologia e humanização unidas para oferecer os melhores resultados.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES_DATA.map((service) => (
              <div 
                key={service.id}
                className="bg-white p-8 rounded-[2rem] shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100 group cursor-pointer flex flex-col h-full"
                onClick={() => handleNavigate(service.id)}
              >
                <div className="mb-6 p-4 rounded-2xl bg-orange-50 w-fit group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{service.shortDesc}</p>
                <div className="flex items-center font-semibold mt-auto" style={{ color: PRIMARY_COLOR }}>
                  Saiba mais <ChevronRight size={20} className="ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-orange-50/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">Histórias de Transformação</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-white p-8 rounded-[2rem] shadow-md">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < t.rating ? "#FFD700" : "none"} stroke={i < t.rating ? "#FFD700" : "#CBD5E1"} />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6">"{t.text}"</p>
                <p className="font-bold text-gray-900">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Location Section */}
      <section id="contact" className="py-20 px-4 relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-orange-100 rounded-full opacity-50 -z-10"></div>

        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row bg-white rounded-[3rem] shadow-2xl overflow-hidden">
            
            {/* Form Side */}
            <div className="lg:w-1/2 p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Entre em Contato</h2>
              <p className="text-gray-600 mb-8">Estamos prontos para te acolher. Mande uma mensagem.</p>
              
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[rgb(248,179,25)] focus:ring-2 focus:ring-[rgba(248,179,25,0.2)] outline-none transition-all bg-gray-50" placeholder="Seu nome completo" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email ou Telefone</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[rgb(248,179,25)] focus:ring-2 focus:ring-[rgba(248,179,25,0.2)] outline-none transition-all bg-gray-50" placeholder="Contato" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
                  <textarea rows="4" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[rgb(248,179,25)] focus:ring-2 focus:ring-[rgba(248,179,25,0.2)] outline-none transition-all bg-gray-50 resize-none" placeholder="Como podemos ajudar?"></textarea>
                </div>
                <Button className="w-full py-4 mt-4">Enviar Mensagem</Button>
              </form>

              <div className="mt-8 space-y-3">
                <div className="flex items-center text-gray-600">
                  <Phone size={20} className="mr-3 text-orange-400" /> (11) 99999-9999
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail size={20} className="mr-3 text-orange-400" /> contato@clinicaaurum.com.br
                </div>
              </div>
            </div>

            {/* Map Side */}
            <div className="lg:w-1/2 bg-gray-100 relative min-h-[400px]">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975380933167!2d-46.656906!3d-23.561349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1620000000000!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '100%' }} 
                allowFullScreen="" 
                loading="lazy"
                title="Google Maps"
              ></iframe>
              <div className="absolute bottom-6 left-6 bg-white p-4 rounded-2xl shadow-lg flex items-center max-w-xs">
                <MapPin size={24} className="text-orange-500 mr-3 flex-shrink-0" />
                <p className="text-sm text-gray-700">Av. Paulista, 1000 - Bela Vista, São Paulo - SP</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );

  return (
    <div className="font-sans text-gray-800 antialiased selection:bg-orange-200 selection:text-orange-900">
      <Navbar />
      
      <main>
        {currentView === 'home' ? (
          <HomeContent />
        ) : (
          <ServiceDetail 
            service={activeService} 
            onBack={() => handleNavigate('home')} 
          />
        )}
      </main>

      <footer className="bg-gray-900 text-white py-12 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-6">
            <Brain className="text-orange-400" size={32} />
            <span className="text-2xl font-bold">Clínica Aurum</span>
          </div>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">Cuidando da sua mente com ciência e coração.</p>
          <div className="border-t border-gray-800 pt-8 text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Clínica Aurum. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}