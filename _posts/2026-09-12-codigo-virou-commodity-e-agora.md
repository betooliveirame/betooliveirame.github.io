---
layout: post
comments: true
title: "Código virou commodity. E agora?"
date: "2026-09-12"
author: "Herbert de Oliveira"
categories:
  - profissionalismo
  - engenharia-de-software
tags:
  - inteligencia-artificial
  - arquitetura-de-software
  - code-review
  - qualidade-de-software
  - agentes-de-ia
  - automacao
  - produtividade

coverImage: "62a81666-692a-4b18-9909-3060cddcfeab.png"
---

Há alguns anos escrevi um texto chamado [**“Código não tem valor. A solução do problema sim!”**]({{ '/profissionalismo/2023/05/12/codigo-nao-tem-valor-a-solucao-do-problema-sim.html' | relative_url }}){:target="_blank" class="bg-tab" rel="noopener"}. Naquela época, ferramentas como ChatGPT e GitHub Copilot começavam a chamar atenção e já era possível perceber que alguma coisa importante estava mudando na nossa profissão. Eu dizia naquele texto que o código, por si só, estava caminhando para se tornar uma commodity.

Pois bem... acho que chegamos lá.

Durante muitos anos, uma parte considerável do trabalho de um desenvolvedor esteve diretamente relacionada à sua capacidade de transformar uma ideia em código. Recebíamos um requisito, entendíamos o problema, abríamos nossa IDE favorita, colocávamos um bom rock para tocar e começávamos a programar. Horas, dias ou até semanas depois, tínhamos algumas centenas ou milhares de linhas de código prontas para serem testadas e revisadas.

Hoje essa dinâmica mudou completamente. Ferramentas baseadas em inteligência artificial já conseguem receber uma especificação relativamente detalhada e produzir, em pouco tempo, uma quantidade de código que um desenvolvedor levaria dias para escrever. E não estou falando apenas de autocomplete. Estamos falando de agentes capazes de navegar por um repositório, entender parcialmente sua arquitetura, criar classes, testes, migrations, APIs, componentes de frontend, documentação e até abrir um Pull Request.

Em outras palavras, nossa capacidade de produzir código aumentou absurdamente.

Ótimo, certo?

Mais ou menos.

## Criamos um novo gargalo

Durante muito tempo, nosso principal gargalo era escrever software. Hoje começamos a enfrentar exatamente o problema contrário: estamos conseguindo gerar código mais rápido do que conseguimos revisar.

Imagine um agente de inteligência artificial trabalhando durante algumas horas em uma funcionalidade relativamente complexa. Ao terminar, ele entrega um Pull Request com 70 arquivos modificados, 5 mil linhas adicionadas, novos testes, novas interfaces, novos serviços, alterações no banco de dados e mudanças em contratos de API.

Agora vem a pergunta: quem vai revisar tudo isso?

Podemos continuar utilizando o modelo tradicional de Code Review, lendo arquivo por arquivo, linha por linha, tentando entender cada decisão tomada. O problema é que esse modelo simplesmente não escala. Principalmente quando vários agentes começam a produzir código ao mesmo tempo.

Podemos chegar rapidamente a uma situação curiosa onde temos dez agentes produzindo código praticamente sem parar e três seres humanos tentando entender o que diabos eles fizeram.

A conta não fecha.

## Então código perdeu importância?

Não. E acho importante fazer essa distinção.

O código continua sendo extremamente importante porque é ele que será executado em produção. Um erro continua derrubando sistemas, uma vulnerabilidade continua expondo dados e uma decisão arquitetural ruim continua aumentando o custo de manutenção durante anos.

O que está mudando é o custo de produção do código. Quando algo se torna barato, abundante e facilmente produzido, ele começa a se aproximar economicamente de uma commodity.

E isso muda completamente onde está o valor.

Durante muitos anos valorizamos muito o profissional capaz de escrever código rapidamente. Agora talvez precisemos valorizar cada vez mais o profissional capaz de entender se estamos construindo a coisa certa, se a solução respeita nossa arquitetura, quais impactos aquela decisão pode gerar, quais trade-offs estamos aceitando e como garantir que aquilo continue funcionando daqui a alguns anos.

E talvez exista uma pergunta ainda mais importante: **como podemos confiar em uma quantidade de código que não conseguimos mais revisar manualmente?**

## Estamos deixando de fabricar para começar a governar

Talvez essa seja uma das maiores mudanças que teremos na engenharia de software nos próximos anos.

Pense em uma fábrica moderna. O engenheiro responsável por uma linha de produção não fica inspecionando manualmente cada peça produzida pela máquina. Isso seria impossível. Ele cria um processo de controle, define tolerâncias, utiliza sensores, métricas, testes e amostragem. Quando algo sai dos limites estabelecidos, o processo sinaliza o problema ou interrompe a produção.

Talvez precisemos começar a pensar no desenvolvimento de software da mesma maneira.

Ao invés de depender exclusivamente de humanos lendo milhares de linhas de código, precisamos criar mecanismos capazes de verificar continuamente aquilo que está sendo produzido. Análise estática, testes automatizados, análise de segurança, testes de integração, testes funcionais, mutation testing, métricas de complexidade, regras arquiteturais automatizadas, quality gates e observabilidade deixam de ser apenas boas práticas e passam a ser parte fundamental da nossa capacidade de trabalhar com inteligência artificial.

Se aumentamos nossa capacidade de produção em dez vezes, precisamos aumentar também nossa capacidade de validação. Caso contrário, não estamos aumentando produtividade. Estamos apenas produzindo problemas mais rapidamente.

## Arquitetura também precisa ser executável

Existe ainda outro ponto que considero particularmente importante para arquitetos de software.

Durante muito tempo documentamos arquitetura utilizando diagramas, ADRs, documentação e reuniões. Nada disso deixa de ser importante, mas talvez não seja mais suficiente em um cenário onde agentes conseguem gerar milhares de linhas de código em pouco tempo.

Imagine que definimos arquiteturalmente que nossa camada de domínio não pode depender diretamente da infraestrutura. Colocamos isso na documentação, explicamos para o time, desenhamos no C4 e registramos em um ADR. Tudo certo.

Então um agente de IA gera 3 mil linhas de código e introduz exatamente essa dependência.

Quem percebe?

Talvez alguém encontre durante o Code Review. Talvez.

Mas existe uma alternativa melhor: a pipeline falha.

A regra deixa de existir apenas como documentação e passa a ser uma restrição executável da arquitetura. Ao invés de escrever “o domínio não deve depender da infraestrutura”, transformamos isso em “o build falha caso o domínio dependa da infraestrutura”.

Parece uma pequena diferença, mas não é. É uma mudança importante na forma como governamos software.

Nesse novo cenário, acredito que veremos cada vez mais o uso de **Architecture Fitness Functions**, ou seja, mecanismos automatizados capazes de verificar continuamente se determinadas características arquiteturais continuam verdadeiras.

## E onde entra o desenvolvedor?

Essa discussão inevitavelmente volta para aquela velha pergunta: “Então a IA vai substituir os programadores?”

Continuo achando essa uma pergunta ruim.

A pergunta mais interessante é: **que tipo de programador continuará sendo valioso?**

Se o seu principal diferencial profissional é transformar uma tarefa perfeitamente descrita no Jira em algumas classes e abrir um Pull Request, tenho uma notícia não muito agradável: a inteligência artificial está ficando muito boa nisso. E muito rápido.

Por outro lado, compreender um domínio complexo, identificar requisitos escondidos, questionar decisões ruins, avaliar trade-offs, desenhar uma arquitetura, entender impactos organizacionais e decidir o que realmente precisa ser construído continua sendo uma tarefa muito mais difícil.

O que estamos vendo é um deslocamento de esforço. Antes, boa parte do trabalho era pensar um pouco, programar muito e revisar no final. Agora o fluxo começa a ficar mais parecido com pensar, especificar, gerar, verificar e decidir.

Quanto maior for nossa capacidade de gerar código, mais importante será aquilo que vem antes e depois da geração.

## Planejar não significa escrever documentos gigantes

Aqui também existe uma armadilha.

Quando digo que vamos gastar mais tempo planejando, não estou dizendo que devemos criar documentos de 150 páginas antes de escrever uma linha de código. Por favor, não façam isso.

Planejamento não significa burocracia. Planejamento significa reduzir ambiguidades, entender o problema, definir responsabilidades, estabelecer contratos, identificar riscos, avaliar alternativas e definir critérios de aceite.

Significa, principalmente, tornar explícito aquilo que antes existia apenas na cabeça de desenvolvedores mais experientes.

Isso é particularmente importante quando quem vai executar boa parte do trabalho é uma inteligência artificial. Uma IA trabalhando com uma especificação ruim não necessariamente produzirá pouco código. Esse é justamente o problema: provavelmente produzirá muito código implementando a coisa errada.

Com muita eficiência.

## Nosso trabalho está mudando

Talvez estejamos entrando em uma fase interessante da engenharia de software.

Durante décadas buscamos maneiras de escrever código mais rapidamente. Criamos linguagens melhores, frameworks, bibliotecas, IDEs, autocompletes, ferramentas low-code e, finalmente, chegamos a sistemas capazes de gerar grandes partes de uma aplicação automaticamente.

Conseguimos o que queríamos.

Agora apareceu outro problema: precisamos aprender a controlar toda essa capacidade de produção.

Nesse cenário, acredito que o bom engenheiro de software será cada vez menos avaliado pela quantidade de código que consegue produzir e cada vez mais pela sua capacidade de tomar boas decisões e criar sistemas onde decisões ruins sejam difíceis de implementar.

Para arquitetos isso talvez seja ainda mais evidente. Nosso papel não será revisar cada linha produzida por uma inteligência artificial. Seria uma batalha perdida. Nosso papel será desenhar os limites, contratos, regras, métricas e mecanismos de validação que permitam que humanos e máquinas produzam software em grande escala sem transformar o sistema em um caos.

Código está ficando barato.

Decisões continuam caras.

E talvez essa seja uma das maiores mudanças da nossa profissão desde que começamos a desenvolver software.

A questão não é mais apenas:

**Você sabe programar?**

Talvez a pergunta daqui para frente seja:

**Você sabe garantir que aquilo que está sendo programado deveria existir e está correto?**
