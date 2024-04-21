---
layout: post
comments: true
title: "O que aprendi com o livro Craftsmanship Limpo."
date: "2023-05-01"
author: "Herbert de Oliveira"
categories: 
  - livros

tags: 
    - livros
    - profissionalismo
    - metodologias-ageis
    - clean-code
    - comunicacao
    - desenvolvimento
    - mercado-digital
    - padroes-de-qualidade
    - tecnologia
coverImage: "craftmanship.webp"
---

Craftsmanship limpo é um daqueles livros inspiradores e não poderia ser diferente afinal o mesmo vem do Robert C. Martin, uma lenda e inspiração na área de desenvolvimento de software em geral. Este é com certeza um livro divisor de águas, assim como foi "clean code" na minha vida. Sempre digo para meus colegas que a carreira de um programador se divide em duas partes: antes e depois de ler "clean code". O mesmo posso dizer sobre "Craftsmanship Limpo". Este livro se destaca principalmente pelo fato de reforçar as características profissionais da nossa área.

O conteúdo do livro é divido em três pilares principais: as disciplinas, os padrões e ética. E todo o conteúdo abordado aqui, abrange de maneira prática e mais aprofundada os tópicos do [manifesto craftsmanship](https://manifesto.softwarecraftsmanship.org/#/pt-br). Apesar do livro não ser necessariamente sobre ele.

## As disciplinas

Aqui são abordadas as características mais práticas e "mão na massa" do livro. Com disciplinas que deveriam ser o feijão com arroz do dia a dia de qualquer programador: Como Desenvolvimento orientado a testes (TDD), Refatoração, Design Simples, Programação colaborativa e Testes de aceitação. Observe que todas disciplinas são disciplinas abordadas na Extreme Programing (XP). Vale o destaque sobre a parte de testes (TDD).

Neste livro ele faz questão de demonstrar na prática o processo de TDD onde é demonstrado de maneira prática como lidar com os steps: vermelho, verde, refatorar e como aprender este processo faz com que se tenha ganhos realmente consideráveis de produtividade. Mas ao mesmo no livro ele coloca algo que aprendi na prática. Quando vou ensinar o processo de escrever os testes antes do código de produção para outros desenvolvedores, percebo que existe uma dificuldade muito grande na mudança de mindset sobre isso.

Escrever os testes depois do código produtivo é uma péssima prática e faz com que se perca a principal característica do processo de TDD. Que é usar os testes para pensar de maneira progressiva sobre o problema que se está tentando resolver. Um step de cada vez, fazendo com que consigamos "quebrar" o problema em partes menores onde os próprios testes vão nos dando os feedbacks de maneira praticamente instantânea sobre o que estamos pensando. Lembre-se estamos falando de "desenvolvimento guiado por testes".

Já na parte de refatoração que é outro ponto bem explorado no livro onde ele fala sobre a importância da refatoração. E como é exatamente a pratica de refatorar que garante que consigamos deixar o nosso código limpo. Outro ponto também que sinto um pouco de dificuldade por parte de outros programadores que é ter a coragem de mudar código que está funcional. Na prática na maior parte das vezes, só mudamos códigos que precisamos mudar. Precisamos ter a coragem e assumir a boa prática de sempre entregarmos código melhor do que o que recebemos. Por isso a boa prática dos testes é importante. São eles que vão nos dar a estrutura necessária para que tenhamos a coragem de refatorar nosso código tornando ele cada vez melhor.

O design simples também é algo que sempre precisamos buscar, ele nos garante que consigamos mudar nosso software a qualquer momento. E essa é obviamente a principal característica de um software: "Mudar". Para que serve um software que não é possível mudar? E como conseguimos isso? Simples, seguindo sempre a boa prática da refatoração que por sua vez depende da boa prática dos testes. Percebeu?

Desenvolver software do mundo real dificilmente é algo feito por uma unica pessoa. Pode até haver uma primeira versão que seja feita por um programador na garagem dele, mas dificilmente este código será mantido apenas por ele, caso o software venha a ganhar escala. E é isso! Desenvolver software é algo colaborativo, fazemos isso quando, programamos em pair programaing, brainstorms ou code reviews. Vejo estes processos como uma ótima maneira de compartilhar conhecimento. O code review por exemplo, não tem apenas o objetivo de se validar o código, mas também para compartilhar conhecimento. Faça com que os desenvolvedores menos experientes sempre façam code review do que se está desenvolvendo. Eles não precisam fazer o merge, mas participar das discussões é essencial para garantir o aprendizado deles.

Em "as disciplinas" no meu caso fica o aprendizado e reforço do quanto estes processos são importantes no nosso dia a dia. Afinal, sabemos que [desenvolver software não é uma coisa linear](https://betooliveira.com/2023/04/25/o-desenvolvimento-de-software-nao-e-uma-coisa-linear/) e que exatamente por isso precisamos estabelecer boas práticas que tornem nosso trabalho menos complicado e mais assertivo. Sempre fui tido com o "chato" que quer tudo perfeito kkkk. Meus colegas de trabalho sempre sofreram comigo neste quesito e venho tentando melhorar a cada dia, mas ao mesmo tempo sem abrir mão dos princípios que acredito. E neste ponto craftsmanship limpo me ajuda a reforçar e entender que estes processos são essenciais no dia a dia de um programador profissional de verdade.

## Os padrões

Em "os padrões" o livro já começa abordando o obvio: "Não entregamos merda!". Pena que sabemos que na prática nem sempre é assim, lidamos com códigos de terceiros (ou nossos próprios) e sabemos o quanto sofremos com códigos que não seguem boas práticas e não possuem a qualidade esperada. Por isso como profissionais que somos vamos assumir o seguinte: "Não entregamos merda!". Assuma isso no seu dia a dia e garanto que você vai se agradecer por isso.

Para que server um software difícil de mudar? A essência básica de um software é sua característica de ser adaptável. Sem isso não precisaríamos de software. E cada vez que entregamos merda, ou não seguimos as boas praticas tornamos o nosso software menos flexível e com isso complicamos nosso trabalho, afinal em algum momento os débitos técnicos serão cobrados. E teremos que pagá-los, com viradas de noites e litros de café. Bons softwares não são os softwares, sem bugs ou com uma qualidade de codificação acima do padrão. Nenhum destes pontos serve caso o software em questão não seja passível de alteração. Portanto como profissionais precisamos garantir que nossos softwares estejam sempre flexíveis. Design simples lembra?

Um dos pilares da metologia ágil é garantir que sempre vamos entregar software pronto para o cliente. Precisamos garantir que a versão que esta em desenvolvimento esteja sempre pronta: testada, documentada e etc... Não quer dizer que as funcionalidades estejam prontas. Quer dizer que software está rodando e foi testado e que a equipe técnica não possui qualquer objeção quanto a isso e que caso o cliente queira seguir para produção não terá problemas. Portanto como profissionais precisamos garantir que nosso software esteja sempre pronto.

Seguir as boas práticas e garantir a qualidade do software é algo essencial como discutido antes pois isso garante a flexibilidade do software. O que por sua vez garante que consigamos mudar qualquer parte do software a qualquer momento. E que consequentemente garante que consigamos ter sempre produtividade no nosso trabalho. Afinal nada mais tira a nossa produtividade de que um software difícil de manter. Por tanto como profissionais que valorizam a própria produtividade, precisamos garantir as boas práticas e qualidade do software.

Em "os padrões" pra mim fica a lição e também o reforço de que profissionais não abrem mão de qualidade. Sempre buscamos garantir que o time de QAs nunca encontrará nada. Nunca deixamos bugs não verificados para o time de QAs encontrar e ganharmos mais tempo. De novo: Profissionais de verdade não abrem mão de qualidade. Profissionais de verdade tem a coragem de dar estimativas realistas e honestas. Mesmo que não seja o que os gerentes e P.Os não queiram escutar. Eles precisam escutar a realidade e profissionais nunca se omitiram de dizer "não" quando for necessário para garantir o sucesso do projeto. E por ultimo profissionais estão sempre em aprendizado continuo. Eles sabem que não sabem tudo e estão sempre procurando aprender e ensinar.

## Ética

Primeiro, não prejudique.

Como profissionais sabemos a importância do que estamos criando para nossos clientes. Entendemos que a sociedade se beneficiara com o software que estamos criando e o quando de riqueza isso ira gerar. Por isso trabalharemos sempre para não gerar prejuízo para nossos clientes e sociedade como um tudo. Também não vamos gerar prejuízo para nosso colegas de profissão que se dedicam para seguir boas práticas e entregar sempre produtos de qualidade. Trabalharemos sempre para não queimar a imagem da profissão.

Um ponto que me chamou a atenção e que nunca tinha pensado, desta maneira é que também somos "stackholders" do projeto. Quando falamos stackholders \[parte interessada\], sempre pensamos no sentido de negócio e aqui é exposto o obvio: Também somo stackholders! Também temos o dever e a obrigação de nos colocarmos como parte interessada em relação ao futuro do projeto. Afinal apesar de não tomarmos decisões de negocio tomamos decisões referentes a arquitetura e desenvolvimento que impacta diretamente as decisões de negocio. Portante temos o dever de nos posicionarmos nos pontos importantes para garantirmos o sucesso do projeto.

Neste texto coloquei apenas alguns pontos do livro. O mesmo trata de vários outros assuntos, importantíssimos para nossa carreira e de maneira alguma este texto substitui a leitura do livro. O livre é muito bom e sinceramente não recomendo ler ele diretamente, recomendo a leitura dos outros livros da séria "clean" primeiro. Para depois você finalizar com ele pois ele funciona como um rejunte linkando tudo o que é discutido nos outros livros. Pra mim ler na sequencia padrão dos livros do Uncle Bob funcionou muito bem.

Bom… Com certeza outro grande livro do Uncle Bob obrigatório para profissionais da área. E que visa passar uma única mensagem: Não somos meros digitadores de código, somos artesões, mentes pensantes e criativas que entendem o mundo ao nosso redor e que buscam transformar ideias em soluções de tecnologia, com o intuito de mudar o mundo, gerando riqueza, tornando a vida das pessoas cada vez melhor. Conforme colocado no livro: O mundo hoje é regido por softwares, eles estão em todas as partes e com isso: Mandamos no mundo hoje! As pessoas só não sabem ainda, nem mesmo nós sabemos. Mas um dia todos saberão!

Com certeza vale a leitura!
