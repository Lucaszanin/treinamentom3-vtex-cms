# template ecommerce M3
 data: 20/02/2019

## Tarefas  Gulp

- `npm run local`
	- Ativa um server local e assiste/atualiza mudanças nos arquivos ( html, scss, js e img ), ultilizado para desenvolvimento local.
- `npm run dev`
	- Ativa um server local e assiste/atualiza mudanças nos arquivos ( scss, js e img ), ultilizado para desenvolvimento onde o template está
- `npm run prod`
	- Realiza build para implantação na vtex

## Processo de implantação

1. Criação da estrutura padrão das paginas
2. Alterar das requisições dos arquivos( normalmente imagens ), no html, css e js
3. Implantar sub-template ( footer, header, loads-footer, loads-header e tipbar )
    * Substituir controles de desenvolvimentos pelos devidos controles da vtex
    * http://help.vtex.com/tutorial/lista-de-controles-para-templates/
4. Implantar template de prateleira
    * Substituir dados de teste pelos devidos controles da vtex
    * http://help.vtex.com/tutorial/controles-do-template-de-prateleira/
5. Implantação dos templates de pagina
    * Substituir controles de desenvolvimentos pelos devidos controles da vtex
    * http://help.vtex.com/tutorial/lista-de-controles-para-templates/
6. Fazer Upload dos arquivos ( html, css e js )
    * Lembre de habilitar o Flash na pagina do portal
7. Configurar os layouts para cada pasta( config do web site )
    * Apontar templates
        * Obs Erro "404 - File or directory not found." siginifica contentPlaceholder com id duplicado no template
    * Definir  "Body Class" correta.
        * Essa classe sera usada para o js identificar em que pagina esta sendo executado.
    * Configurar contentPlaceholder ( Controles para inserção de conteúdo )
8. Configuração Master data
    * Custum Newsletter ( https://gitlab.com/agenciam3/custom-newsletter-form )
    * Fale conosco ( https://gitlab.com/agenciam3/form-fale-conosco-vtex/ )

## Estrutura de diretórios
```
thema-ecommerce-simples-m3
├---arquivos
|   ├---imagens
|   |       *.png
|   |
|   ├---js
|   |   |   main.js
|   |   |
|   |   ├---lib
|   |   |       custom-newsletter-form.js
|   |   |       form-fale-conosco-vtex.js
|   |   |       infinitScroll.js
|   |   |       jqinstapics.js
|   |   |       jquery.validate.min.js
|   |   |       m3Dropdown.js
|   |   |       slick.js
|   |   |       vtex-variation-grid.js
|   |   |
|   |   ├---paginas
|   |   |       categoria.js
|   |   |       institucional.js
|   |   |       principal.js
|   |   |       produto.js
|   |   |
|   |   └--parts
|   |           login.js
|   |           menu.js
|   |           prateleira.js
|   |           slide.js
|   |           social.js
|   |           utils.js
|   |
|   ├---sass
|   |   |   base.scss
|   |   |   main.scss
|   |   |
|   |   ├---help
|   |   |       _animacao.scss
|   |   |       _comum.scss
|   |   |       _normalize.scss
|   |   |
|   |   ├---lib
|   |   |       _bootstrap.scss
|   |   |       _slick.scss
|   |   |       _sprite.scss
|   |   |
|   |   ├---paginas
|   |   |       _categoria.scss
|   |   |       _home.scss
|   |   |       _institucional.scss
|   |   |       _paginaDeErro.scss
|   |   |       _produto.scss
|   |   |
|   |   └--parts
|   |           breandcrumb.scss
|   |           _ajustes.scss
|   |           _barraDeVantagens.scss
|   |           _footer.scss
|   |           _header.scss
|   |           _menu.scss
|   |           _newsletter.scss
|   |           _prateleira.scss
|   |
|   └--sprite
|           *.png
|
├---controles-customizados
|       controle-exemplo.html
|
├---template-pagina
|   |   template-404.html
|   |   template-500.html
|   |   template-buscavazia.html
|   |   template-categoria.html
|   |   template-fale-conosco.html
|   |   template-home.html
|   |   template-institucional.html
|   |   template-login.html
|   |   template-meus-pedidos.html
|   |   template-minha-conta.html
|   |   template-produto.html
|   |
|   └--sub-templates
|           template-footer.html
|           template-header.html
|           template-loads-footer.html
|           template-loads-header.html
|           template-menu.html
|
└--template-prateleira
        prateleira-padrao.html
        prateleira-padrao.vtex.html
```
