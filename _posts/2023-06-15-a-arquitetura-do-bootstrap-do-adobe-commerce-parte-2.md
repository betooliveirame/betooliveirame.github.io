---
layout: post
comments: true
title: "A arquitetura do Bootstrap do Adobe Commerce | Parte 2"
date: "2023-06-15"
categories: 
  - "geral"
  - "magento-2"
  - "software-engineering"
tags: 
  - "adobe-commerce"
  - "softwarearchitecture"
  - "softwareengineering"
coverImage: "bootstrap.jpeg"
---

Olá novamente, conforme prometido, vamos continuar nossa exploração técnica da arquitetura do Bootstrap do Adobe Commerce. Se você está chegando agora, recomendo fortemente que leia a primeira parte deste artigo, onde explicamos profundamente o processo de bootstrap do Adobe Commerce.

Se quiser ler a primeira parte deste artigo: [A arquitetura do Bootstrap do Adobe Commerce \| Parte 1](/geral/software-engineering/2023/06/08/a-arquitetura-do-bootstrap-do-adobe-commerce-parte-1.html)

Bom. Na primeira parte, vimos como funciona o processo de bootstrap, mais precisamente as camadas de baixo nível e o inicio da camada da aplicação e que existe um conjunto de operações iniciais que preparam o ambiente de execução da aplicação. Discutimos como esse processo é comum a todas as aplicações, independentemente de serem desktop, web ou mobile. Além disso, dividimos o processo de bootstrap do Adobe Commerce em seis partes principais: Ponto de Entrada, Bootstrap, Configuração do Ambiente, Criação da Aplicação, Execução da Aplicação, e Front Controller e Roteamento.

Agora, na segunda parte deste artigo, vamos continuar de onde paramos. Vamos aprofundar ainda mais nosso conhecimento sobre o funcionamento interno do Adobe Commerce, explorando em detalhes as etapas finais do processo de bootstrap. Vamos analisar como a aplicação é criada, como é executada e como o Front Controller e o Roteamento funcionam.

Este post, assim como o primeiro será altamente técnico e voltado para aqueles que desejam ir além do básico sobre a plataforma e entender como as coisas acontecem "por debaixo dos panos".

Voltando ao pub/index.php.....

![](/assets/images/image-8.png){:class="img-fluid"}

Estrutura básica do index.php

Como podemos ver na figura a cima, paramos no ponto onde temos uma instancia da classe Bootstrap. Aqui, ```$bootstrap``` é uma instância da classe ```Magento\Framework\App\Bootstrap```. E como vimos no artigo anterior elá é a primeira a ser carregada quando você inicia o Adobe Commerce. Ela é responsável por preparar o ambiente da aplicação, incluindo o manuseio de erros, definição de constantes globais e inicialização de componentes de nível superior.

## Criando a aplicação

Então, seguindo, vemos o método ```createApplication``` da classe ```Magento\Framework\App\Bootstrap``` que é usado para criar uma nova instância da aplicação. Ele aceita uma string que é o nome da classe da aplicação que você quer instanciar.

Neste caso, a classe passada é ```\Magento\Framework\App\Http::class```. Esta é a classe principal para a aplicação web do Adobe Commerce. Ela lida com a solicitação HTTP recebida, faz o roteamento para o controlador apropriado com base na URL da solicitação, e depois gera a resposta HTTP. E ao passar ```\Magento\Framework\App\Http::class``` para ```createApplication```, estamos dizendo para o método criar uma instância da aplicação web.

O motivo para esta abordagem é permitir a modularidade e a flexibilidade. Por exemplo, se você quisesse inicializar o Adobe Commerce em um contexto de linha de comando (como em um script de shell ou em uma tarefa cron), você poderia passar ```\Magento\Framework\Console\Cli::class``` para ```createApplication``` em vez de ```\Magento\Framework\App\Http::class```. Isso criaria uma instância da aplicação de linha de comando em vez da aplicação web.

O padrão [Factory (fábrica)](https://refactoring.guru/pt-br/design-patterns/abstract-factory) é um padrão de design [criacional](https://refactoring.guru/pt-br/design-patterns/creational-patterns) muito utilizado no desenvolvimento de software. Seu principal objetivo é encapsular o processo de criação de objetos. Em outras palavras, ele fornece uma maneira de delegar a lógica de criação de instâncias a classes especializadas, chamadas fábricas.

No coração do padrão Factory está um método, normalmente denominado "create" ou "factory" (no nosso caso "createApplication"), que é responsável por gerar e retornar instâncias de objetos. Este método pode ser parametrizado (ou não) para criar diferentes tipos de objetos.

A grande vantagem desse padrão é que ele isola o cliente (a parte do código que solicita o objeto) das especificidades da criação do objeto. Isso significa que, se o processo de criação precisar ser alterado, essas alterações estarão contidas apenas na fábrica, sem impactar o restante do código.

Além disso, o padrão Factory pode facilitar a criação de famílias de objetos relacionados sem ter que depender de classes concretas. Isso pode ser particularmente útil para melhorar a modularidade e a capacidade de teste do código. Ao fornecer uma interface comum para a criação de objetos (aqui temos a interface \\Magento\\Framework\\AppInterface), o padrão Factory suporta os princípios de programação para interfaces, não para implementações, o que resulta em código mais flexível e fácil de manter.

Em outras palavras, esse design permite que o Adobe Commerce funcione em diferentes contextos de aplicação com base nas necessidades do momento. Você consegue ver estes contextos em outros arquivos que também funcionam como pontos de entradas/saída.

- /pub/get.php

- /pub/cron.php

- /pub/static.php

### O arquivo /pub/get.php: o ponto de saída das mídias.

Vamos começar com ```pub/get.php```. Este arquivo é responsável por servir arquivos de mídia, como imagens de produtos, que são solicitados pelo cliente. Quando um cliente visita uma página de produto pela primeira vez, a Adobe Commerce precisa gerar versões otimizadas desta imagem em vários tamanhos para serem usadas em diferentes partes do site (por exemplo, miniaturas, imagem principal do produto, zoom, etc.). Este processo é conhecido como "materialização", porque as imagens são geradas (ou "materializadas") sob demanda e servidas pelo pub/get.php.

Depois que a imagem é materializada, ela é servida diretamente do cache na próxima vez que é solicitada, tornando o processo de carregamento da página muito mais rápido. Esta abordagem de "materializar sob demanda" ajuda a Adobe Commerce a lidar de maneira eficiente com um grande número de imagens de produtos, sem ter que gerar todas as variantes possíveis de tamanho de imagem antecipadamente.

O processo de materialização é uma prática comum em aplicativos da web e é usada no Adobe Commerce para melhorar a performance. Se quiser entender melhor recomendo dar uma olhada na classe \\Magento\\MediaStorage\\App\\Media. Observe que ela é passada como parâmetro para a função createApplication do Bootstrap no arquivo /pub/get.php. E como explicado acima ele implementa a interface Magento\\Framework\\AppInterface.

### O arquivo /pub/cron.php: Ponto de entrada de execução das crons.

```pub/cron.php``` é o ponto de entrada para a execução de crons no Adobe Commerce. As crons são operações que são executadas em segundo plano em intervalos de tempo definidos, como a limpeza de logs, atualizações de índices, envio de e-mails transacionais, etc. O ```cron.php``` inicia o agendador de crons, que por sua vez executa todas as tarefas cron pendentes que foram agendadas para execução.

No caso do cron.php recomendo dar uma olhada no arquivo Magento\\Framework\\App\\Cron que é passado para o método createApplication e como explicado antes também implementa a interface Magento\\Framework\\AppInterface.

### O arquivo /pub/static.php: O ponto de saída do conteúdo estático.

Por último, ```pub/static.php``` é usado para servir arquivos estáticos, como CSS, JavaScript e imagens, que são parte de temas e módulos do Adobe Commerce. Semelhante ao ```get.php```, o ```static.php``` também usa um processo de materialização. Quando um arquivo estático é solicitado pela primeira vez, ele é gerado (ou "materializado") a partir das fontes apropriadas (por exemplo, compilando arquivos LESS em CSS) e salvo no sistema de arquivos, de onde é servido em solicitações subsequentes. E também implementa a interface Magento\\Framework\\AppInterface.

Esses três arquivos desempenham papéis cruciais no Adobe Commerce, permitindo que a plataforma sirva conteúdo estático e de mídia e execute tarefas programadas de acordo com o contexto da requisição.

Quer ir além? Dá uma olhada nos arquivos bin/magento e ```vendor/magento/framework/Console/Cli.php```.

## O método createApplication

Que tal agora explorarmos o método 'createApplication' da classe Bootstrap? Como veremos, os acontecimentos que se desdobram dentro deste método são realmente bem simples, mas estrategicamente fundamentais para a execução da aplicação..

![](/assets/images/image-9.png){:class="img-fluid"}

Função ```createApplication``` da classe Bootstrap

O método ```createApplication``` usa o ```ObjectManager``` (Lembra dos métodos "create" e "createObjectManagerFactory", explicados no 1 post?) para criar uma instância da classe de aplicação que foi passada como parâmetro. Essa classe de aplicação é o tipo real de aplicação que será executada. Pode ser uma aplicação HTTP para processar solicitações web, uma aplicação de console para processar comandos de console ou qualquer uma das classes já exploradas acima. Veja que você pode criar uma classe de aplicação customizada, para isso basta que ela implemente a interface Magento\\Framework\\AppInterface. E adaptando o Adobe Commerce para um outro contexto de acordo com a necessidade do seu projeto.

Observe também que caso tudo ocorra normalmente será retornado uma instancia da aplicação. E caso ocorra algum problema será chamado o método terminate que pretendo explicar daqui a pouco.

## O método run

O método ```run()``` do Adobe Commerce é o motor que coloca a aplicação para rodar, processando a solicitação recebida e gerando a resposta adequada. Como explicado anteriormente ele recebe uma interface ```Magento\Framework\AppInterface``` como argumento. E na prática ele vai chamar o método launch. Mas antes ele chama alguns métodos auxiliares: initErrorHandler, assertMaintenance e assertInstalled. Observe que antes de chamar estes métodos ele chama o ```\\Magento\\Framework\\Profiler::start('magento');``` obviamente para ativar o profile, caso as configurações dele estiverem ativas.

### O método initErrorHandler

O método ```initErrorHandler()``` é crucial para a forma como o sistema lida com erros e exceções.

![](/assets/images/image-10.png){:class="img-fluid"}

Função ```initErrorHandler``` da classe Boostrap

Este método é responsável por configurar o manipulador de erros PHP global para a aplicação Magento. O PHP permite que os desenvolvedores definam uma função personalizada para lidar com erros não capturados usando a função ```[set_error_handler](https://www.php.net/manual/en/function.set-error-handler.php)()```.

O Adobe Commerce usa essa funcionalidade para definir um manipulador de erros personalizado que converte erros PHP em exceções ```ErrorException```. Essa abordagem permite que o sistema use a estrutura de tratamento de exceções do PHP para lidar com erros de tempo de execução, fornecendo uma maneira consistente de lidar com ambos, erros e exceções.

Ao usar este método, o Adobe Commerce garante que todos os erros sejam tratados da mesma forma, independentemente de serem causados por um problema de programação (como uma variável não definida) ou por uma falha no tempo de execução (como um problema de conexão com o banco de dados).

Isso proporciona uma grande flexibilidade e poder na detecção e na manipulação de erros, permitindo que a aplicação seja mais robusta e resiliente em face de problemas inesperados.

### O método ```assertMaintenance```

Já o método ```assertMaintenance()``` da classe é usado para verificar se o sistema está em modo de manutenção.

![](/assets/images/image-11.png){:class="img-fluid"}

Função ```assertMaintenance``` da classe Bootstrap

Quando o Adobe Commerce está em modo de manutenção, os visitantes do site veem uma mensagem informando que o site está temporariamente indisponível. Isso geralmente ocorre quando há atualizações ou alterações sendo feitas no site que não devem ser exibidas ao público.

O método ```assertMaintenance()``` verifica a existência de um arquivo chamado ```.maintenance.flag``` no diretório var/ do sistema. Se esse arquivo existir, a loja está em modo de manutenção..

Além disso, este método também pode lidar com uma lista de endereços IP isentos, que ainda podem acessar o site mesmo em modo de manutenção. Esses IPs isentos são armazenados em um arquivo chamado ```.maintenance.ip```. de uma olhada nos métodos getAddressInfo e isOn da classe ```\\Magento\\Framework\\App\\MaintenanceMode```.

Portanto, este método verifica se o sistema está em modo de manutenção e se o IP do cliente atual está na lista de IPs isentos. Se o sistema estiver em modo de manutenção e o IP do cliente não estiver na lista de isenções, uma exceção ```\Exception``` será lançada, o que levará ao redirecionamento para a página de manutenção.

### O método ```assertInstalled```

E agora, vamos detalhar o método ```assertInstalled```. Este método tem a responsabilidade de verificar se a aplicação Adobe Commerce está devidamente instalada antes de ser inicializada. Em um nível mais profundo, o que acontece é o seguinte:

1. Primeiro, o método verifica se a constante ```PARAM_REQUIRE_IS_INSTALLED``` foi definida nos parâmetros de inicialização. Essa constante normalmente está definida, pois o sistema precisa saber se a instalação foi concluída.

3. Se a constante ```PARAM_REQUIRE_IS_INSTALLED``` estiver definida, o método ```assertInstalled``` fará uma chamada para o método ```isInstalled``` da classe ```DeploymentConfig```.

5. O método ```isInstalled``` da ```DeploymentConfig``` retornará verdadeiro ou falso, dependendo do estado da instalação do Adobe Commerce. Se o Adobe Commerce estiver corretamente instalado, ele retornará ```true```. Caso contrário, retornará ```false```.

7. Se o método ```isInstalled``` retornar ```false```, o método ```assertInstalled``` lançará uma exceção ```ApplicationIsNotInstalled``` com uma mensagem de erro adequada. Esta exceção interromperá a execução da aplicação e o usuário será informado de que a aplicação ainda não foi instalada.

Já o método ```isAvailable``` da classe ```\Magento\Framework\App\DeploymentConfig``` é uma parte vital do sistema Adobe Commerce. Este método tem como função principal verificar se um determinado componente de configuração está disponível.

Em um nível mais profundo, aqui está o que acontece quando este método é chamado:

1. O método ```isAvailable``` recebe como parâmetro o nome do componente de configuração que se deseja verificar.

3. O método então verifica se este componente de configuração existe no array interno ```$data```, que armazena todas as configurações de implantação.

5. Se o componente de configuração estiver presente no array ```$data```, o método ```isAvailable``` retorna ```true```, indicando que o componente de configuração está disponível.

7. Se o componente de configuração não estiver presente no array ```$data```, o método ```isAvailable``` retorna ```false```, indicando que o componente de configuração não está disponível.

Desta forma, o método ```isAvailable``` permite ao sistema verificar se uma configuração de implantação específica está disponível antes de tentar usá-la. Isso pode ser extremamente útil para evitar erros ao tentar acessar componentes de configuração que não existem.

Além disso, ele também é usado em outros lugares do código do Adobe Commerce para verificar a presença de várias configurações importantes, como as configurações do banco de dados e as configurações do sistema de cache. Isso ajuda a garantir que o sistema esteja corretamente configurado antes de ser iniciado.

Dessa forma, o método ```assertInstalled``` garante que a aplicação só será inicializada se a instalação do Adobe Commerce tiver sido concluída com sucesso. Isso ajuda a evitar que os usuários interajam com uma instalação incompleta do sistema, o que poderia levar a erros e inconsistências.

## O launch da aplicação

Agora, uma vez que dentro do método run é feito algumas validações como se o modo de manutenção está ativado e até mesmo se o Adobe Commerce está totalmente instalado.

É chamado o método launch da aplicação. Que obviamente executa a aplicação de acordo com o contexto: HTTP, imagem, conteúdo estático e etc, retornando uma ```Magento\\Framework\\App\\ResponseInterface```.

No caso de uma requisição HTTP como vimos ele vai chamar o método launch da classe Magento\\Framework\\App\\Http que pode dentro dele podemos ver que vários processos ocorrem ali. Mas na prática ele apenas vai identificar o controller referente a url solicitada e ao router especifico. Isso é feito através da classe Magento\\Framework\\App\\FrontController no método dispatch que é chamado dentro do método launch.

No futuro posso fazer outro post detalhando mais especificamente este processo de frontcontroller do Adobe Commerce. Que também ficaria bem grande.

Voltando ao método run como vemos ele chama o método sendResponse e logo na sequencia dá um stop no profile. Quer saber o que ocorre no método sendResponse do HTTP? Dá uma olhada na classe ```Magento\\Framework\\HTTP\\PhpEnvironment\\Response```.

## Design patterns utilizados no design do Boostrap

Agora que estamos seguindo para o final gostaria de destacar que além de entender o processo de bootstrap como um todo vimos vários exemplos práticos de uso de design patterns. Durante o processo de bootstrap do Adobe Commerce, diversos padrões de design são utilizados para estruturar o código de maneira clara e reutilizável. Aqui estão alguns dos mais significativos:

1. **Padrão Singleton**: O arquivo ```app/bootstrap.php``` cria uma única instância de ```Magento\Framework\App\Bootstrap```, garantindo que apenas um objeto seja criado, independentemente do número de vezes que seja solicitado. Este padrão garante que haja uma única instância de um objeto em toda a aplicação, fornecendo um único ponto de acesso ao objeto.

3. **Padrão Factory**: Este padrão é usado para criar instâncias de objetos sem expor a lógica de criação ao cliente. No processo de bootstrap, é usado para criar instâncias de diferentes classes, como a aplicação HTTP (```Magento\Framework\App\Http```) e o ```ObjectManager```.

5. **Padrão Facade**: A classe ```Magento\Framework\App\Bootstrap``` pode ser vista como um facade, pois fornece uma interface unificada para um conjunto de interfaces no subsistema de inicialização, tornando o subsistema mais fácil de usar. Isso simplifica a interface para o cliente, que não precisa lidar com a complexidade subjacente.

7. **Padrão Strategy**: No método ```run()``` da classe ```Magento\Framework\App\Bootstrap```, é utilizada uma abordagem de padrão de estratégia. Dependendo do tipo de aplicação que está sendo inicializada (```\Magento\Framework\App\Http```, ```\Magento\Framework\App\Cron```, etc.), a execução da aplicação é realizada de forma diferente. A aplicação é fornecida ao método ```run()```, e o método ```launch()``` correspondente da aplicação é chamado.

9. **Padrão Dependency Injection (Injeção de Dependência)**: O Adobe Commerce usa este padrão extensivamente em todo o seu código. O ```ObjectManager``` é o container de injeção de dependência que cria objetos e resolve suas dependências.

Esses são alguns dos padrões de design mais notáveis utilizados durante o processo de bootstrap. Cada um deles desempenha um papel importante na estruturação do código, tornando-o mais fácil de entender, testar e manter.

## Conclusão

Realizamos uma análise abrangente do processo de bootstrap, e descobrimos como os princípios de arquitetura de software são aplicados em muitos sistemas web atuais. Encorajo você a usar esse conhecimento para aprofundar ainda mais seu entendimento de como esses processos funcionam. Em um mercado cada vez mais competitivo, apenas os profissionais mais qualificados se destacarão e estarão aptos a navegar pelos altos e baixos do setor.

Espero sinceramente que as informações compartilhadas aqui sejam úteis para a comunidade de tecnologia. Sei que elas têm o potencial de enriquecer o conhecimento de profissionais de todas as áreas da tecnologia. Continue aprendendo, explorando e compartilhando - essa é a chave para o progresso contínuo na nossa indústria.

Abraços.
