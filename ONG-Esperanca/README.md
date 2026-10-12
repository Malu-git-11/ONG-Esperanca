# ONG Esperança — versão otimizada

Site demonstrativo de uma organização de arrecadação de roupas e alimentos e mobilização de voluntários.

## Tecnologias

- HTML semântico
- CSS responsivo com pontos de quebra para diferentes telas
- JavaScript modular em um arquivo separado
- Vite para build de produção e minificação
- GitHub Actions para publicação automática no GitHub Pages
- SVGs locais leves para as ilustrações

## Estrutura

```text
ONG-Esperanca/
├── .github/workflows/deploy.yml
├── css/style.css
├── img/
├── js/script.js
├── cadastro.html
├── index.html
├── projetos.html
├── package.json
├── vite.config.js
└── README.md
```

## Executar localmente

É necessário ter Node.js instalado.

```bash
npm install
npm run dev
```

O terminal mostrará o endereço local do Vite para abrir no navegador.

## Gerar a versão de produção

```bash
npm run build
npm run preview
```

O comando `npm run build` gera a pasta `dist`, com HTML, CSS e JavaScript preparados para produção. O Vite minifica CSS e JavaScript; o plugin configurado minifica o HTML.

## Publicar no GitHub Pages com CI/CD

1. Envie estes arquivos para o repositório `Malu-git-11/ONG-Esperanca`.
2. No GitHub, abra **Settings → Pages**.
3. Em **Build and deployment**, escolha **GitHub Actions** como fonte.
4. Faça um `push` para a branch `main`.
5. Acompanhe a execução em **Actions**. Quando o fluxo terminar com sucesso, o site ficará disponível em:

   `https://malu-git-11.github.io/ONG-Esperanca/`

A configuração `base: "/ONG-Esperanca/"` em `vite.config.js` é importante para publicar o projeto como um repositório de usuário/projeto no GitHub Pages. Se o nome do repositório mudar, atualize esse valor.

## Acessibilidade e responsividade

- Estrutura com `header`, `nav`, `main`, `section`, `article` e `footer`.
- Link para pular diretamente ao conteúdo.
- Rótulos explícitos nos campos e mensagens de validação.
- Estados de foco visíveis e suporte a teclado.
- Menu móvel com `aria-expanded`.
- Contraste de texto, textos alternativos nas imagens e respeito à preferência por movimento reduzido.
- Layout adaptável a celular, tablet e desktop.

## Funcionalidades

- Navegação entre Início, Projetos e Quero ajudar.
- Filtro de campanhas por categoria.
- Formulário com validação e mensagens acessíveis.
- Cadastro demonstrativo armazenado no `localStorage`.

**Importante:** o formulário não envia dados para a ONG nem para um servidor. Os cadastros ficam somente no navegador utilizado. Para receber inscrições reais, será necessário integrar um backend ou serviço de formulários e atualizar o aviso de privacidade.

## Otimização de imagens

As ilustrações estão em SVG, um formato vetorial leve que evita arquivos fotográficos grandes. Para fotografias reais, prefira WebP/AVIF quando compatível, comprima os arquivos e defina dimensões adequadas. Não declare uma porcentagem de redução sem comparar os tamanhos reais antes e depois.

## Observação

Confira o nome do repositório e teste a aplicação depois da publicação. O projeto está preparado para um deploy por GitHub Actions; a publicação só estará concluída quando o fluxo aparecer como bem-sucedido na aba **Actions**.
