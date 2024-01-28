---
layout: post
comments: true
title: "Como ler o SonarCloud para saber para onde está indo o código da sua aplicação."
date: "2023-04-23"
categories: 
  - "code-quality"
  - "geral"
tags: 
  - "cleancode"
  - "codeoptimization"
  - "codequality"
  - "codereviews"
  - "continuousdelivery"
  - "devops"
  - "softwareengineering"
  - "softwarequality"
  - "sonarcloud"
  - "staticanalysis"
---

![](https://betooliveira8.files.wordpress.com/2023/04/image-2.png?w=1024)

[https://ifunny.co/tags/sonarcloud](https://ifunny.co/tags/sonarcloud)

A análise de qualidade do código-fonte é um processo que como o próprio nome diz, avalia a qualidade do código escrito pelos desenvolvedores com base em critérios como legibilidade, manutenibilidade, eficiência, escalabilidade e segurança. A análise é realizada usando ferramentas de análise estática de código que podem detectar possíveis vulnerabilidades de segurança, erros de sintaxe, problemas de desempenho, código mal formatado, duplicação de código e outras violações de boas práticas de codificação.

A análise de qualidade do código é fundamental para garantir que o software desenvolvido atenda aos requisitos do cliente e esteja livre de bugs e vulnerabilidades. A qualidade do código afeta diretamente a qualidade do software, e é importante que os desenvolvedores sejam capazes de escrever código limpo e bem estruturado para garantir que o software atenda aos padrões de qualidade e segurança. Além disso, a análise de qualidade do código é uma parte crítica do processo de desenvolvimento de software, permitindo que os desenvolvedores identifiquem problemas precocemente, economizando tempo e dinheiro no longo prazo. Por essas razões, a análise de qualidade do código-fonte é uma prática importante e indispensável no desenvolvimento de software moderno.

## Porque equipes de negocio devem investir na qualidade do código que está sendo desenvolvido por suas equipes de desenvolvimento?

Investir na qualidade do software é essencial para equipes de negócios, pois a qualidade do software afeta diretamente a experiência do usuário e, por sua vez, a satisfação do cliente. A qualidade do software afeta a velocidade e eficiência com que as tarefas podem ser realizadas, e pode ter um grande impacto no sucesso geral do negócio. Um software de baixa qualidade pode levar a falhas frequentes, atrasos no lançamento de produtos, insatisfação do cliente final e perda de receita.

Investir na qualidade do software também pode ajudar a melhorar a eficiência e a produtividade das equipes de negócios. Softwares bem construídos e bem testados permitem que as equipes se concentrem em tarefas mais importantes e reduzem a necessidade de lidar com problemas de software. Isso ajuda a aumentar a eficiência do trabalho e a reduzir a sobrecarga administrativa para as equipes de negócios.

Além disso, a qualidade do software pode ter um impacto significativo na segurança do negócio. Softwares com vulnerabilidades de segurança podem levar a violações de dados, o que pode ter um impacto negativo na confiança do cliente e na reputação da empresa. Portanto, investir na qualidade do software, incluindo a segurança do software, é fundamental para garantir a integridade do negócio e proteger a privacidade do cliente.

Por tanto, investir na qualidade do software também pode trazer benefícios econômicos, pois softwares de alta qualidade tendem a durar mais e serem mais fáceis de manter. Isso ajuda a reduzir os custos de manutenção do software e prolongar a vida útil do software, reduzindo a necessidade de substituí-lo regularmente. Ou seja, investir na qualidade do software é uma necessidade para equipes de negócios que desejam garantir a satisfação do cliente, melhorar a eficiência das operações e proteger a integridade e privacidade do negócio.

## Sobre o Sonar cloud

Atualmente no mercado de tecnologia, temos muitas ferramentas voltadas a analisar a qualidade do código do que está sendo entregue pelas equipes de desenvolvimento. Dentre tantas ferramentas que temos, uma das mais famosas com certeza é o SonarCloud. A ideia por trás do SonarCloud é que a ferramenta faça uma analise **constante** de todo o código da aplicação. Onde a ferramenta analisa o código de maneira automatizada, sempre dando uma visão 360° da saúde do código.

Por outro lado temos uma situação muito comum para este tipo de ferramenta que é o fato de que muitas vezes o time técnico não sabe ler o que a ferramenta está dizendo. Normalmente os profissionais leem apenas de maneira "estática" os indicadores e gráficos mostrados na ferramenta:

> Ficou "verde"? Ok. Podemos seguir.

E este é um dos grandes problemas que temos no ciclo de desenvolvimento atualmente: a subutilização de ferramentas que visão principalmente garantir a qualidade do software que está sendo desenvolvido. Então, a ideia deste texto é compartilhar um pouco da maneira como sempre leio as informações disponibilizadas pelo sonarcloud e acima disso quais ações tomo para poder sempre ter controle da saúde do que o time está desenvolvendo.

## Indicadores

Comecemos por analisar quais são os principais indicadores disponibilizados pelo sonar e o que eles indicam:

- \*\*\*Quality gate

- Bugs

- Vulnerabilidades + Security Hot Spots

- Code Smells:

- Coverage

- Duplicação

## O Quality gate

![](https://betooliveira8.files.wordpress.com/2023/02/image.png?w=349)

O Quality gate é um indicador que avalia se o código fonte da aplicação está ou não em conformidade com as boas práticas de codificação, e é um indicador binário que fornece uma visão geral rápida sobre o estado atual do código.

Na prática o Quality gate é uma visão compilada dos outros indicadores e por isso, não devemos ignorar os outros indicadores disponíveis no SonarCloud. Esses indicadores não são binários e fornecem informações valiosas sobre a evolução do código fonte ao longo do tempo, permitindo-nos entender para onde ele está indo. Ao avaliar os gráficos dos indicadores, podemos identificar áreas que precisam de mais atenção e melhorias contínuas. No final do dia, o nosso objetivo é deixar o Quality gate em estado "passed".

![](https://betooliveira8.files.wordpress.com/2023/02/image-1.png?w=349)

### Bugs

Bugs em seu código podem causar problemas a qualquer momento, podendo desde: quebrar alguma funcionalidade ou até mesmo derrubar o site todo. Algo que obviamente vai causar sérios prejuízos. Por isso sempre de atenção imediata a este indicador e tente sempre buscar o valor zero nele.

### Vulnerabilidades + Security Hot Spots

Algo meio obvio aqui temos as brechas de segurança que podem causar sérios problemas na aplicação. No caso especifico do Security Hot Spots são possíveis problemas identificados pelo sonar mas que precisam de revisão para saber se realmente são problemas. Estes indicadores também devem ter atenção imediata buscando sempre o valor zero para ele.

### Code Smells

Code smells são o que chamamos de "mau cheiro" e são pontos que podem estar funcionais, mas que o sonar indica que está fora das boas práticas de desenvolvimento de código e com certeza vai gerar muita dor de cabeça para o time que está sustentando o código.

### Coverage

Aqui temos a velha cobertura de testes indicando o quanto do seu código está coberto por testes unitários. Assim como o code smell aqui teremos muito dor de cabeça para o time de sustentação do código, caso este indice não esteja dentro dos padrões de qualidade aceitos.

### Duplicação

Duplicação de código assim como o nome indica o quanto do seu código está duplicado e este código apesar de estar "funcional" vai também te dar muita dor de cabeça para dar sustentação.

## Lendo os indicadores

Bom agora que entendemos um pouco sobre cada indicador podemos fazer uma analise deles e tentar entender o que realmente eles estão dizendo. E não se preocupe, como veremos é algo muito simples.

### Lendo um "grupo" de indicadores

Uma das maneiras que gosto de ler os indicadores é de maneira agrupada. É uma maneira muito simples de entender o que está acontecendo e porque minha aplicação está se comportando de maneira "estranha" também quais ações preciso tomar ou priorizar para resolver os problemas. No primeiro grupo temos:

### Indicadores que informam a quebra e instabilidade da aplicação

- Bugs

- Vulnerabilidades + Security Hot Spots

E o que estes dois indicadores em conjunto consegue nos dizer? Bom, simples eles são indicadores que informam problemas que podem quebrar a sua aplicação a qualquer momento gerando problemas de mau funcionamento ou segurança.

Logo, se você tem problemas de funcionalidades quebradas ou o site fora do ar com uma certa frequência, resolver os problemas apontados neste dois indicadores vai te ajudar nestes tipos de problemas. Quanto maiores os valores de bugs, Vulnerabilidades e Security Hot Spots mais problemas de instabilidade você terá na sua aplicação. Portanto, priorize a resolução destes problemas imediatamente.

## Indicadores que informam a complexidade na sustentação do código.

- Code Smell

- Coverage

- Duplicação

Com esses outros indicadores em conjunto, podemos identificar as razões pelas quais nossa aplicação está se tornando difícil de sustentar. Quando digo "sustentar", refiro-me a fazer qualquer alteração na estrutura do código. Se você está tendo problemas para corrigir um bug e a implementação da solução está se tornando um desafio, agora você sabe o porquê. Se precisa implementar uma nova funcionalidade solicitada pelo cliente, extremamente importante para gerar novas receitas, mas não sabe por onde começar ao olhar para o código, agora você sabe o porquê.

Portanto, ao analisar esses três indicadores em conjunto, podemos entender o nível de complexidade para mudar o código da aplicação e, consequentemente, a quantidade de esforço necessária para manter esse código será significativa.

## Lendo os gráficos do sonar para entender para onde está indo a saúde do código da aplicação

Agora vamos falar sobre os gráficos do sonar de cada indicador:

### Gráficos de Bugs, Vulnerabilidades + Security Hot Spots e Code Smell

A leitura destes três gráficos e muito simples e indica o obvio que é o aumento de cada índice e que portanto devamos buscar que este gráficos estejam com as linhas de indicação o mais baixo possível.

![](https://betooliveira8.files.wordpress.com/2023/01/image-5.png?w=742)

Se a linha nos gráficos destes indicadores estiverem em posição horizontal indica que o problema está estacionado e não estamos dando a devida importância para os problemas que estão ocorrendo. Se elas estiverem aumentando indicada que estamos deixando passar os problemas provavelmente por code reviews feitos de maneira inadequada.

Para evitar estes tipos de problema as plataformas como github, bitbucket e gitlab possuem ferramentas que se integram com o sonarcloud e bloqueiam pull requests que não estão dentro do padrão. Ative estas ferramentas e converse com o time para revisar e garantir que os code reviews estão sendo feitos da melhor maneira possível.

## Gráfico de Coverage

A interpretação do gráfico de coverage é simples, mas nem sempre é óbvia para todas as pessoas envolvidas no desenvolvimento da plataforma. O gráfico apresenta duas linhas: "Lines to cover" e "Covered lines" que acredito que são alto explicativas.

Muitas vezes, as equipes olham apenas para o valor fixo do nível de coverage, o que não está errado. No entanto, ao utilizar esse gráfico, a equipe pode identificar quando o projeto começa a apresentar problemas de cobertura. A situação ideal para garantir a saúde da aplicação é manter essas duas linhas próximas uma da outra.

Em resumo, a interpretação do gráfico de coverage é essencial para garantir que a aplicação esteja sendo adequadamente testada. Observar tanto a quantidade de linhas que precisam ser cobertas quanto a quantidade de linhas que estão sendo cobertas pelos testes unitários é crucial para manter a qualidade do código.

![](https://betooliveira8.files.wordpress.com/2023/01/image-1.png?w=719)

Caso elas estejam distantes mas, os testes estejam todos "verdes " só podemos chegar a duas possíveis conclusões:

- O código é legado e obviamente a cobertura de testes está sendo tratada agora. Neste caso o time precisa ter um plano claro de como esse debito técnico será tratado o quanto antes. Uma abordagem é o time traçar metas e prazos progressivos e se comprometer com estes objetivos.

- Os testes que estão sendo desenvolvidos estão sendo feitos apenas para ficar "verde", o que indica que os testes não estão sendo feitos da maneira correta e o time vai ter sérios problemas no futuro para refatorar, corrigir ou adicionar novas funcionalidades neste código. Neste caso precisa ser feito um trabalho com o time e ajuda-lo a escrever testes unitários melhores.

## Gráfico de código duplicado

A interpretação do gráfico de duplicação de código, assim como o de cobertura, é simples. O gráfico apresenta duas linhas: "Linas of code" e "Duplicated liness". Na tomada de decisões, devemos seguir a lógica oposta ao gráfico de cobertura, ou seja, é necessário trabalhar para que as duas linhas fiquem o mais distantes possível.

Quando a linha "Duplicated lines" está em ascensão, há um problema sério no time, que está permitindo a duplicação de código. Isso pode ocorrer devido a , um code review fraco, testes unitários de baixa qualidade que geram uma arquitetura frágil e altamente acoplada e complexa, que dificulta o reuso de código e, consequentemente, leva a uma alta frequência de duplicação.

Para solucionar esse problema, é necessário avaliar a cobertura e a qualidade dos testes unitários, e garantir que ambos sejam de alta qualidade. Com isso, o time terá a estrutura necessária para realizar um trabalho de refatoração dentro do próprio ciclo de desenvolvimento. Além disso lembre-se: É importante garantir um code review eficiente!

Em resumo, o time de desenvolvimento deve garantir que a linha "Duplicated lines" esteja sempre em declínio, independentemente da quantidade de linhas de código na aplicação.

![](https://betooliveira8.files.wordpress.com/2023/04/image-1.png?w=723)

## Finalizando

Em resumo, investir na qualidade do código é uma necessidade para equipes de negócios que desejam garantir a satisfação do cliente, melhorar a eficiência das operações e proteger a integridade e privacidade do negócio. Ferramentas como o SonarCloud podem ajudar a garantir a qualidade do código, mas é importante que as equipes técnicas aprendam a interpretar e utilizar os indicadores disponibilizados para obter os melhores resultados.
