import { useState, FormEvent } from 'react';
import { Mail, MessageCircle, Instagram, Globe, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { brand } from '../config/brand';
import { SEO } from '../components/SEO';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div id="contact-page" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <SEO
        title="Contato"
        description="Fale com a equipe da AL Studio Tech via WhatsApp ou e-mail de suporte."
        canonical="/contato"
      />
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 px-3 py-1 rounded-full">
          Fale Conosco
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Entre em contato
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-base">
          Tem alguma dúvida sobre nossos aplicativos ou precisa de suporte? Estamos à disposição.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Channels */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-[#121824] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h2 className="font-extrabold text-lg text-slate-900 dark:text-white">
              Canais Diretos
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Escolha seu meio de comunicação preferido para falar com a equipe da {brand.name}.
            </p>

            {/* WhatsApp */}
            <a
              id="contact-channel-whatsapp"
              href={brand.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/20 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block">WhatsApp Oficial</span>
                <span className="text-xs text-emerald-800 dark:text-emerald-500 font-medium truncate block">
                  {brand.contact.whatsappFormatted}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-700 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Email */}
            <a
              id="contact-channel-email"
              href={`mailto:${brand.contact.email}`}
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 border border-blue-200 dark:border-blue-500/20 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold text-blue-700 dark:text-blue-400 block">E-mail de Suporte</span>
                <span className="text-xs text-blue-800 dark:text-blue-500 font-medium truncate block">
                  {brand.contact.email}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-700 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Instagram */}
            <a
              id="contact-channel-instagram"
              href={brand.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-pink-50 dark:bg-pink-500/10 hover:bg-pink-100 dark:hover:bg-pink-500/20 border border-pink-200 dark:border-pink-500/20 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-500/20 text-pink-700 dark:text-pink-400 border border-pink-200 dark:border-pink-500/20 flex items-center justify-center shrink-0">
                <Instagram className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold text-pink-700 dark:text-pink-400 block">Instagram</span>
                <span className="text-xs text-pink-800 dark:text-pink-500 font-medium truncate block">
                  {brand.contact.instagram}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-pink-700 dark:text-pink-400 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Site */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0b0f17] border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold text-slate-900 dark:text-white block">Website Principal</span>
                <span className="text-xs text-slate-600 dark:text-slate-400 font-medium truncate block">
                  {brand.contact.site}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Message Form */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-[#121824] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
            <div>
              <h2 className="font-extrabold text-xl text-slate-900 dark:text-white">Envie uma mensagem</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Preencha o formulário abaixo e entraremos em contato o mais breve possível.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 dark:bg-emerald-500/10 rounded-3xl border border-emerald-200 dark:border-emerald-500/20 space-y-3 animate-in fade-in duration-200">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-emerald-800 dark:text-emerald-400">Mensagem enviada com sucesso!</h3>
                <p className="text-xs text-emerald-700 dark:text-emerald-500 max-w-sm mx-auto">
                  Agradecemos seu contato. Nossa equipe responderá no e-mail{' '}
                  <strong className="text-emerald-900 dark:text-emerald-400">{formData.email}</strong> em breve.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="mt-4 px-4 py-2 bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-400 text-xs font-bold rounded-xl hover:bg-emerald-200 dark:hover:bg-emerald-500/30 transition-colors"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="contact-name" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Seu Nome *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: João da Silva"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#0b0f17] border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="contact-email" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Seu E-mail *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Ex: joao@email.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#0b0f17] border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact-subject" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Assunto
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Ex: Dúvida sobre o Gerador de Orçamentos"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#0b0f17] border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact-message" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Mensagem *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Descreva como podemos ajudar você..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#0b0f17] border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  />
                </div>

                <button
                  id="btn-submit-contact"
                  type="submit"
                  className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar mensagem</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
