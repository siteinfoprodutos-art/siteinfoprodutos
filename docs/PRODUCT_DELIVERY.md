# Product Delivery Architecture

Este documento descreve a arquitetura futura planejada para a entrega de produtos digitais na AL Studio Tech. 

**IMPORTANTE: A arquitetura abaixo NÃO ESTÁ IMPLEMENTADA NA FASE ATUAL. O frontend está apenas preparado visualmente.**

## Fluxo Planejado

1. **Site AL Studio Tech**: O usuário visualiza o produto e clica em "Comprar agora".
2. **Checkout Externo**: O usuário é redirecionado para a plataforma parceira de pagamentos através do campo `checkoutUrl`.
3. **Plataforma confirma pagamento**: A plataforma parceira processa o pagamento com sucesso.
4. **Futuro backend recebe confirmação**: Um Webhook enviará a notificação de compra aprovada para um sistema de backend da AL Studio Tech.
5. **Produto é associado ao comprador**: O backend registra a venda e gera credenciais ou libera o acesso ao e-mail do comprador.
6. **Comprador acessa sua conta**: O usuário entra na página `/acessar` e informa suas credenciais (e-mail/senha ou código).
7. **Produto autorizado é exibido**: Se a autorização for válida, o usuário verá o `appUrl`, link de download ou instruções de acordo com as propriedades `accessType` e `deliveryType`.

## Regras Estritas de Segurança no Frontend

Não utilizar soluções falsas no lado do cliente (frontend) para proteger URLs pagas, tais como:

* **Esconder URLs no código (`appUrl`)**: Não devemos enviar a URL real da aplicação no payload da listagem de produtos ou exibi-la de forma oculta no HTML.
* **LocalStorage / IndexedDB**: Variáveis do tipo `isPaid=true` ou `hasPurchased=true` armazenadas no dispositivo do cliente não representam proteção real. Qualquer usuário avançado pode manipulá-las.
* **URLs Obscuras/Secretas**: Utilizar um endereço de acesso complexo na esperança de que não seja descoberto também não é uma forma robusta de garantir o acesso restrito.

Qualquer sistema real de controle de acesso aos aplicativos e downloads deverá passar por um serviço backend de verificação que responderá de acordo com as autorizações válidas.

## Tipos de Entrega e Acesso (Preparação)

Os modelos de dados (em `src/types/index.ts`) já foram arquitetados para esse momento futuro:

### DeliveryType
* `webapp`: Aplicativos e ferramentas operadas via navegador.
* `download`: Arquivos, templates ZIP, etc.
* `external`: Produtos consumidos ou gerenciados via SaaS de terceiros.
* `instructions`: Acesso manual ou instruções textuais puras.

### AccessType
* `public`: Conteúdo livre e aberto.
* `protected`: Requer validação (login/código) contra uma base de clientes.
* `download`: Geração temporária de link de acesso validado.
* `external`: Delegado a outro sistema (ex. Hotmart, etc).
