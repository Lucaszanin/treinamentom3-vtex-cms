# template ecommerce M3

data: 10/02/2020

## Requisitos

-   Nodejs >= 10.13.0 - recomendo usar o nvm para gerenciar suas versões do nodejs (NVM)[https://github.com/coreybutler/nvm-windows/releases]

## Tarefas Gulp

-   `npm run local` - Ativa um server local e assiste/atualiza mudanças nos arquivos ( html, scss, js e img ), ultilizado para desenvolvimento local.
-   `npm run local:fast` - Ativa um server local e assiste/atualiza mudanças nos arquivos ( html, scss, js e img ), ultilizado para desenvolvimento local. Porem utiliza o sucrase para uma build mais rapida e leve, no qual pode ser util em projetos muito grandes ou em computadores mais fracos.
-   `npm run dev` - Ativa um server local e assiste/atualiza mudanças nos arquivos ( scss, js e img ), ultilizado para desenvolvimento onde o template está.
-   `npm run dev:fast` - Ativa um server local e assiste/atualiza mudanças nos arquivos ( scss, js e img ), ultilizado para desenvolvimento onde o template está. Porem utiliza o sucrase para uma build mais rapida e leve, no qual pode ser util em projetos muito grandes ou em computadores mais fracos.
-   `npm run prod` - Realiza build para implantação na vtex

## Guias de desenvolvimento

- html: [Video Tutorial](https://drive.google.com/file/d/1nopiHENo5VRCsOKKihv6pbDOPOo2J2HV/view?usp=sharing)
- css:
- js:

## Processo de implantação

1. Criação da estrutura padrão das paginas
2. Alterar das requisições dos arquivos( normalmente imagens ), no html, css e js
3. Implantar sub-template ( footer, header, loads-footer, loads-header e tipbar )
    - Substituir controles de desenvolvimentos pelos devidos controles da vtex
    - http://help.vtex.com/tutorial/lista-de-controles-para-templates/
4. Implantar template de prateleira
    - Substituir dados de teste pelos devidos controles da vtex
    - http://help.vtex.com/tutorial/controles-do-template-de-prateleira/
5. Implantação dos templates de pagina
    - Substituir controles de desenvolvimentos pelos devidos controles da vtex
    - http://help.vtex.com/tutorial/lista-de-controles-para-templates/
6. Fazer Upload dos arquivos ( html, css e js )
    - Lembre de habilitar o Flash na pagina do portal
7. Configurar os layouts para cada pasta( config do web site )
    - Apontar templates
        - Obs Erro "404 - File or directory not found." siginifica contentPlaceholder com id duplicado no template
    - Definir "Body Class" correta.
        - Essa classe sera usada para o js identificar em que pagina esta sendo executado.
    - Configurar contentPlaceholder ( Controles para inserção de conteúdo )
8. Configuração Master data
    - Custum Newsletter ( https://gitlab.com/agenciam3/custom-newsletter-form )
    - Fale conosco ( https://gitlab.com/agenciam3/form-fale-conosco-vtex/ )

