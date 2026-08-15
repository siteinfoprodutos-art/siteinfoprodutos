# Documentação Técnica de SEO — AL Studio Tech

Este documento descreve a arquitetura e os padrões de implementação do SEO (Search Engine Optimization) técnico, compartilhamento social e dados estruturados no projeto da **AL Studio Tech**.

---

## 1. Configuração Centralizada (`src/config/seo.ts`)

Todas as configurações globais de SEO ficam centralizadas no arquivo `src/config/seo.ts`:

- **`siteName`**: `"AL Studio Tech"`
- **`siteUrl`**: Domínio principal (padrão: `https://alstudiotech.com`)
- **`defaultTitle`**: `"AL Studio Tech | Aplicativos e Ferramentas Digitais"`
- **`titleTemplate`**: `"%s | AL Studio Tech"`
- **`defaultDescription`**: `"Aplicativos, automações e ferramentas digitais criados para simplificar tarefas e tornar sua rotina mais prática."`
- **`defaultImage`**: `"/og-default.jpg"`
- **`locale`**: `"pt_BR"`

### Como alterar metadados globais
Para alterar as informações padrão do site ou o domínio oficial, edite diretamente os campos em `src/config/seo.ts`.

---

## 2. Componente de SEO Reutilizável (`src/components/SEO.tsx`)

O componente `<SEO />` gerencia dinamicamente as meta tags no `<head>` da página através de `useEffect`.

### Propriedades aceitas:
| Prop | Tipo | Descrição |
| --- | --- | --- |
| `title` | `string` | Título específico da página. |
| `description` | `string` | Descrição meta específica da página. |
| `canonical` | `string` | Caminho relativo (ex: `/produtos`) ou URL absoluta. |
| `image` | `string` | Imagem para compartilhamento Open Graph / Twitter Card. |
| `type` | `string` | Tipo de conteúdo (ex: `"website"` ou `"product"`). |
| `noindex` | `boolean` | Define `robots` como `noindex, nofollow` para páginas privadas/checkout. |
| `jsonLd` | `object` | Objeto ou array de dados estruturados JSON-LD (`schema.org`). |

### Exemplo de uso em uma nova página:
```tsx
import { SEO } from '../components/SEO';

export function MinhaPagina() {
  return (
    <div>
      <SEO
        title="Minha Nova Página"
        description="Descrição otimizada para motores de busca."
        canonical="/minha-pagina"
      />
      {/* Conteúdo da página */}
    </div>
  );
}
```

---

## 3. Como Adicionar SEO a Novos Produtos (`src/data/products.ts`)

A interface `Product` em `src/types/index.ts` suporta campos opcionais de SEO:

```ts
export interface Product {
  // ...outros campos do produto
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: string;
}
```

Ao cadastrar um novo produto em `src/data/products.ts`:
1. Se `seoTitle` não for informado, a página usará `<product.name> | AL Studio Tech`.
2. Se `seoDescription` não for informado, a página usará `product.shortDescription`.
3. Se `seoImage` não for informado, a página usará `product.image`.

### Exemplo de cadastro com SEO customizado:
```ts
{
  id: "novo-app",
  slug: "novo-app-de-automação",
  name: "Novo App de Automação",
  shortDescription: "Automatize tarefas do dia a dia com 1 clique.",
  seoTitle: "Automação de Tarefas para Pequenos Negócios",
  seoDescription: "Descubra o Novo App de Automação da AL Studio Tech e economize até 10 horas semanais.",
  // ...outras propriedades
}
```

---

## 4. Sitemap XML (`public/sitemap.xml`)

O arquivo `public/sitemap.xml` é um arquivo estático localizado no diretório público.

### Como atualizar o sitemap ao lançar novos produtos:
Quando um novo produto ativo ou nova página pública for adicionada, insira uma nova tag `<url>` dentro de `public/sitemap.xml`:

```xml
<url>
  <loc>https://alstudiotech.com/produto/slug-do-novo-produto</loc>
  <lastmod>2026-08-14</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>
```

---

## 5. Estrutura de Open Graph e Compartilhamento Social

Toda página que renderiza o componente `<SEO />` insere automaticamente as meta tags do protocolo Open Graph e Twitter Cards:

- `og:site_name`: AL Studio Tech
- `og:title`: Título dinâmico
- `og:description`: Descrição dinâmica
- `og:image`: Imagem em alta resolução (imagem padrão em `/og-default.jpg`)
- `og:url`: URL canônica
- `og:type`: `"website"` ou `"product"`
- `twitter:card`: `"summary_large_image"`

Além disso, a página de detalhes do produto conta com o botão **Compartilhar**, utilizando a API nativa `navigator.share` em dispositivos móveis e navegadores suportados, com fallback automático para cópia de link para a área de transferência com feedback visual ("Link copiado!").

---

## 6. Configuração da Verificação do Google Search Console

Para validar a propriedade do site no Google Search Console:

1. Acesse o [Google Search Console](https://search.google.com/search-console).
2. Selecione o método de verificação por **Tag HTML** (`<meta name="google-site-verification" content="..." />`).
3. Copie o valor do atributo `content` fornecido pelo Google.
4. Abra o arquivo `src/config/seo.ts` e insira o código na constante `GOOGLE_SITE_VERIFICATION`:

```ts
export const GOOGLE_SITE_VERIFICATION = "SEU_CODIGO_DE_VERIFICACAO_AQUI";
```

O componente `<SEO />` aplicará automaticamente a tag de verificação no `<head>` de todas as páginas públicas.
