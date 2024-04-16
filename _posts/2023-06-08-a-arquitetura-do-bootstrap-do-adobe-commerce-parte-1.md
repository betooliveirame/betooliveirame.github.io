---
layout: post
comments: true
title: "A arquitetura do Bootstrap do Adobe Commerce | Parte 1"
date: "2023-06-08"
categories: 
  - arquitetura-de-software 
tags: 
    - arquitetura-de-software
    - adobe-commerce
    - desenvolvimento
    - e-commerce
    - tecnologia
coverImage: "7bwkl7.jpg"
---

Neste novo post quero explorar algumas questões mais técnicas e que envolva um dos assuntos que mais me interesso, que é a arquitetura de software em geral. Então resolvi falar um pouco sobre arquitetura da plataforma Adobe Commerce (Magento 2). Plataforma a qual já trabalho a alguns anos e já sofri um pouco com ela. A minha ideia a aqui é explicar sobre o bootstrap da aplicação. Então este post será BEM técnico. E voltado para quem quer sair do básico sobre a plataforma e se aprofundar um pouco mais em como as coisas acontecem por debaixo dos panos.

## O que é o processo de bootstrap?

O processo de bootstrap se refere à série de operações que preparam o ambiente de execução de uma aplicação. Ele envolve a inicialização de uma ampla gama de configurações, serviços e componentes que são essenciais para o funcionamento correto da aplicação. Este processo não é único para a plataforma Adobe Commerce; na verdade, todas as aplicações, sejam elas desktop, web ou mobile, possuem um processo similar.

No contexto do Adobe Commerce, o processo de bootstrap segue padrões comuns encontrados em plataformas web baseadas em PHP, como é o caso do Laravel, por exemplo, um dos frameworks mais utilizados atualmente nesta linguagem de programação. E embora Adobe Commerce e Laravel apresentem diferenças marcantes em suas arquiteturas e princípios de design, seus processos de bootstrap apresentam semelhanças, principalmente por terem a responsabilidade de preparar o ambiente de execução da aplicação.

Portanto, mesmo que a explicação neste post esteja voltada para a plataforma Adobe Commerce, você pode aplicar o conhecimento aqui explorado para entender como o processo de bootstrap funciona na maioria das aplicações PHP.

## Quais são as etapas que fazem parte do processo de boostrap do Adobe Commerce?

Para facilitar o entendimento do processo como um todo vamos dividir ele em etapas. Etapas estas que podem ser divididas em seis partes principais:

1. **Ponto de Entrada**

3. **Bootstrap**

5. **Configuração do Ambiente**

7. **Criação da Aplicação**

9. **Execução da Aplicação**

11. **Front Controller e Roteamento**

Cada uma dessas partes tem um papel vital no processo de inicialização. Entender cada uma delas pode ser útil para aprofundar o conhecimento sobre o funcionamento interno do Adobe Commerce. Então vamos ver como cada uma delas funciona no detalhe. Abaixo vou puxar muitos trechos de código da aplicação e terei que ser BEM técnico. Não se assustem e se for o caso estude cada step devagar até ter toda a compreensão do processo.

_**Um ponto importante:** A ideia aqui não é detalhar linha a linha dos arquivos de bootstrap. Alguns trechos de código que vou exibir abaixo estão resumidos a fim de simplificar e garantir uma visão dos principais pontos do código dentro do processo de boostrap._

### O arquivo index.php: O Ponto de entrada

Como qualquer aplicação tradicional PHP, o processo começa aqui. Mais precisamente no arquivo pub/index.php. Ele é o ponto de entrada principal de todas as requisições feitas na plataforma Adobe Commerce. Quando me refiro a todas as requisições, são todas mesmo. Desde a home, pagina de categorias, pagina de detalhes do produto, paginas do admin e etc. Bom acho que deu pra entender. Tudo!

Bom, vamos então analisar o arquivo index.php:

![](https://betooliveira8.files.wordpress.com/2023/06/image-1.png?w=1024)

Versão simplificada do arquivo /pub/index.php

De maneira simplificada temos o seguinte:

1. Carregamento do arquivo /app/boostrap.php que faz o carregamento da camada de mais baixo nível do Adobe Commerce.

3. Carregamento da classe \\Magento\\Framework\\App\\Bootstrap que faz o carregamento da camada de aplicação do Adobe Commerce.

5. Criação de uma instancia da aplicação.

7. Execução da aplicação pela função "run".

### O arquivo /app/bootstrap.php: O start da camada de baixo nível.

Na prática o arquivo /app/bootstrap.php não está diretamente relacionado a nenhuma das camadas tradicionais do modelo MVC (Model-View-Controller), como a camada de aplicação, a camada de negócios ou a camada de dados.: Ele está no que podemos chamar de camada de baixo nível. Onde ocorre alguns processos para que na sequencia tenhamos a camada da aplicação sendo executada.

Portanto, o arquivo /app/bootstrap.php desempenha um papel crucial ao preparar o ambiente de execução da aplicação. Sua primeira responsabilidade é a definição nível de exibição de erros e alguns controles de segurança como é o caso da função stream\_wrapper\_unregister que explicarei mais abaixo.

O `bootstrap.php` tambem se encarrega da inicialização do Autoloader do Composer. Este é um passo fundamental, pois permite que o Adobe Commerce carregue automaticamente classes conforme necessário sem a necessidade de instruções `require` ou `include`. Isso é feito através do `require_once` no arquivo `autoload.php` do Composer.

Por último, mas não menos importante, o arquivo realiza algumas verificações de ambiente e versão para garantir que o ambiente atual suporte a execução do Adobe Commerce. Isso envolve a verificação da versão do PHP.

![](https://betooliveira8.files.wordpress.com/2023/06/image-2.png?w=1024)

Versão simplificado do arquivo /app/bootstrap.php
/app/bootstrap.php 
1. Na função [error\_reporting](https://www.php.net/manual/en/function.error-reporting.php) é feito a definição do nível de exibição de erros da aplicação. Por padrão o Adobe Commerce é configurado para mostrar todos os erros através da constante E\_ALL.
2. A função `[stream_wrapper_unregister](https://www.php.net/manual/en/function.stream-wrapper-unregister.php)()` do PHP é usada para desregistrar (ou desativar) um manipulador de protocolo (wrapper) de fluxo (stream) registrado anteriormente. No caso, aqui ao desregistrar o manipulador 'phar' você está efetivamente desativando a capacidade de acessar arquivos Phar dentro da aplicação como se fossem sistemas de arquivos. Isso é feito por razões de segurança, se você quiser evitar que o código PHP acesse arquivos Phar dessa maneira.
3. Validação da versão do PHP. Exibindo uma mensagem de inconformidade caso não esteja instalada a versão correta no servidor. 
4. [Ajustando o Magento para funcionar no PHP 8](https://github.com/magento/magento2/pull/34062/files) 
5. Carregamento do /app/autoload.php. responsável por configurar toda a estrutura de autoload do Adobe Commerce. 
6. [Configurações do `umask`](https://experienceleague.adobe.com/docs/commerce-operations/installation-guide/next-steps/set-umask.html?lang=en). No Magento 2 é uma configuração que ajuda a determinar as permissões de novos arquivos e diretórios criados pelo sistema, garantindo que eles tenham as permissões adequadas para segurança e funcionamento correto. 
7. Em ENABLE\_IIS\_REWRITES, isso é uma configuração de segurança. "[Prevent Cache Poisoning](https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/security/cache-poisoning.html?lang=en)" é uma configuração de segurança no Adobe Commerce que ajuda a proteger contra um tipo específico de ataque chamado "cache poisoning". 
8. Temos a ativação e execução do processo de profile. `[MAGE_PROFILER](https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/setup/mage-profiler.html?lang=en)` é uma configuração no Magento que permite a ativação do profiler. Ferramenta utilizada por desenvolvedores para identificação de "gargalos" de desemprenho no código. 
9. Depois temos a [definição do fuso horário padrão do sistema para UTC](https://www.php.net/manual/en/function.date-default-timezone-set.php). Isso é importante porque muitas funções de data e hora no PHP podem se comportar de maneira diferente dependendo do fuso horário. [E precisão numérica para operações não formatadas / não string](https://www.php.net/manual/en/ini.core.php#ini.precision). 

Calma ainda vamos ver e entender como o autoload é utilizado na aplicação nos tópicos abaixo.

### O Arquivo /app/autoload.php: Sistema de autoload

Vimos que dentro do arquivo /app/boostrap.php o mesmo faz um require do arquivo /app/autoload.php. Como veremos este arquivo também está na camada de baixo nível da aplicação e tem uma única, mas crucial responsabilidade: configurar o Autoloader do sistema. Isso é feito através da inclusão do `autoload.php` do Composer.

Abrindo um "parenteses" aqui pro pessoal mais novo que não sabe o que faz o autoloader:

A função do Autoloader é carregar automaticamente as classes PHP conforme necessário durante a execução do programa, sem que o desenvolvedor precise escrever manualmente instruções de inclusão para cada classe. Isso facilita significativamente a estrutura do código e a manutenção do software, uma vez que as classes podem ser adicionadas, removidas ou alteradas sem que seja necessário modificar a lista de arquivos incluídos manualmente.

No Adobe Commerce, isso é especialmente importante devido à grande quantidade de classes e módulos que compõem a aplicação. Graças ao Autoloader configurado em `/app/autoload.php`, os desenvolvedores podem se concentrar na lógica dos seus módulos sem se preocupar com a inclusão manual das dependências. Ou seja graças ao composer não precisamos ficar adicionando require, includes e etc.. importando as classes auxiliares para a classe que você está desenvolvendo.

Fim do "parenteses" e voltando autoload.php:

![](https://betooliveira8.files.wordpress.com/2023/06/image-3.png?w=1024)

Visão simplificada do arquivo /app/autoload.php

/`app/autoload.php` |
1. Define algumas constantes importantes como a "BP" (acrônimo para BASE PATH), que armazena o path da pasta root da aplicação, e a VENDOR\_PATH que armazena o path do arquivo onde é definido o path da pasta vendor do composer, no caso, o `app/etc/vendor_path.php`.
2. Utiliza a constante VENDOR\_PATH para fazer o include do arquivo `autoload.php` do composer, especificamente o `vendor/autoload.php`.
3. Finaliza "injetando" o composer autoload no método `AutoloaderRegistry::registerAutoloader`, "envelopado" pela classe `ClassLoaderWrapper`. Isso encapsula o acesso dentro da aplicação ao autoload do composer, aumentando a modularidade e a flexibilidade do sistema como podemos ver [aqui](https://github.com/magento/magento2/blob/d9d3d9b40bfdc683ac7c6a26b605481a25e3493e/app/bootstrap.php#LL46C35-L46C53) e [aqui](https://github.com/magento/magento2/blob/d9d3d9b40bfdc683ac7c6a26b605481a25e3493e/lib/internal/Magento/Framework/App/Bootstrap.php#L140).

### Classe ```\\Magento\\Framework\\App\\Bootstrap::create``` O start da camada da aplicação

Bom até aqui vimos a estrutura e o que acontece na camada de baixo nível da aplicação do Adobe Commerce através dos arquivo pub/index.php, app/bootstrap.php e app/autoload.php. Agora vamos começar a olhar como funciona a camada da aplicação. Para isso vamos voltar ao arquivo pub/index.php e veremos que nele temos o seguinte trecho de código:

![](https://betooliveira8.files.wordpress.com/2023/06/image-4.png?w=1024)

Bootstrap Singleton, criação e execução da aplicação no arquivo index.php

#### O método ```\\Magento\\Framework\\App\\Bootstrap::create```

Aqui temos o carregamento do [singleton](https://refactoring.guru/pt-br/design-patterns/singleton) \\Magento\\Framework\\App\\Bootstrap através do método "[create](https://github.com/magento/magento2/blob/d9d3d9b40bfdc683ac7c6a26b605481a25e3493e/lib/internal/Magento/Framework/App/Bootstrap.php#L121)", responsável por retornar uma instancia da própria classe Bootstrap. E o que é "singleton"? E porque ele é utilizado na inicialização do Adobe Commerce.

O padrão Singleton ([design pattern](https://refactoring.guru/pt-br/design-patterns)) é utilizado na inicialização de aplicações PHP (O adobe commerce não seria diferente), e de muitas outras linguagens de programação, para garantir que apenas uma instância de uma determinada classe seja criada durante todo o ciclo de vida da aplicação.

Na inicialização de aplicações, geralmente é necessário um único ponto de entrada que inicializa vários recursos e configurações. Esse ponto de entrada geralmente precisa ser acessível globalmente e garantir que suas operações sejam realizadas apenas uma vez.

Por exemplo, um objeto de inicialização de aplicação pode ser responsável por configurar conexões de banco de dados, rotas, carregadores de classes, configurações globais, entre outros. Se mais de uma instância desse objeto de inicialização fosse criada, poderia resultar em conexões de banco de dados duplicadas, configurações inconsistentes ou comportamento inesperado.

O padrão Singleton ajuda a evitar esses problemas, garantindo que apenas uma instância do objeto de inicialização seja criada (Magento\\Framework\\App\\Bootstrap). A instância Singleton é criada na primeira vez que o objeto é necessário, e a mesma instância é retornada em todas as chamadas subsequentes. Se quiser entender um pouco mais recomendo está leitura [aqui](https://refactoring.guru/pt-br/design-patterns/singleton).

![](https://betooliveira8.files.wordpress.com/2023/06/image-5.png?w=1024)

Método create na classe Bootstrap

Vamos dar uma olhada nesse tal Singleton e entender sua estrutura. O método "create" já de cara chama o método `populateAutoloader`, que é encarregado de 'popular' a estrutura de autoload da aplicação durante a execução.

Esse processo é realizado chamando o método `createFilesystemDirectoryList`, que retorna a lista das pastas padrões do Adobe Commerce (app, var, generated, etc). Além disso, ele também obtém uma instância do autoloader do composer por meio do método `AutoloaderRegistry::getAutoloader()`. Lembra do método AutoloaderRegistry::registerAutoloader la no arquivo /app/autoloader.php?

Bom, com essas duas instâncias em mãos, ele as entrega para a classe `Magento\Framework\Autoload\Populator no método populateMappings`. E ao explorar a classe `Magento\Framework\Autoload\Populator`, vemos que ela tem uma função bem específica dentro desse processo. Ela é responsável por 'popular' o autoloader com os diretórios que contém os arquivos de classes do Adobe Commerce. No caso, ela adiciona o diretório `generated/code` no autoloader do composer. Diretorio este que é onde são geradas classes dinâmicas em tempo de execução como: interceptos (utilizados no funcionamento dos Plugins), factories e proxies.

Olha que interessante! Dá uma olhada no método `createFilesystemDriverPool` e vê o que poderia ser feito através do parâmetro `$initParams` no método `create`.

![](https://betooliveira8.files.wordpress.com/2023/06/image-6.png?w=1024)

Método `createFilesystemDriverPool` na classe Bootstrap

Sacou?

Outra dica: Quer saber onde são definidas os nomes de pasta padrões do Adobe Commerce? Dá uma olhada [aqui](https://github.com/magento/magento2/blob/d9d3d9b40bfdc683ac7c6a26b605481a25e3493e/lib/internal/Magento/Framework/App/Filesystem/DirectoryList.php#L17).

Voltando. Logo depois, temos a criação da instancia do ObjectManager através do método createObjectManagerFactory. O ObjectManager no Adobe Commerce é um componente essencial do sistema de [injeção de dependência (DI)](https://en.wikipedia.org/wiki/Dependency_injection) da plataforma. Ele atua como uma espécie de fábrica universal que pode instanciar qualquer classe na aplicação Adobe Commerce, resolvendo automaticamente todas as suas dependências.

Na prática, sempre que você precisa de uma instância de uma classe, em vez de criar essa instância diretamente (por exemplo, usando o operador `new`), você pode solicitar ao ObjectManager que faça isso por você. O ObjectManager então analisa a definição da classe, identifica suas dependências, cria instâncias dessas dependências (recursivamente, se necessário), e então cria uma instância da classe solicitada, injetando todas as dependências necessárias no processo.

Isto não apenas torna a criação de objetos mais simples e limpa, mas também torna o código muito mais testável e modular, pois você pode substituir as dependências por stubs ou mocks nos testes, ou até mesmo substituir uma dependência por uma implementação diferente em tempo de execução. Quem programou no magento 1 sabe como era escrever testes unitários nele. Se ainda tem alguém que coda no magento 1 fica a [dica](https://github.com/betooliveirame/codepcetion-magento) kkkk

![](https://betooliveira8.files.wordpress.com/2023/06/image-7.png?w=1024)

Método createObjectManagerFactory na classe Bootstrap

Observe que aqui ele chama novamente o método createFilesystemDirectoryList, já explicado anteriormente. Além disso ele também obtêm uma instancia da classe ```Magento\\Framework\\Filesystem\\DriverPool```. A classe ```Magento\Framework\Filesystem\DriverPool``` no Adobe Commerce é usada para gerenciar um conjunto de drivers de sistema de arquivos. Um driver de sistema de arquivos é uma classe que fornece métodos para interagir com um sistema de arquivos, como ler, escrever e excluir arquivos. Por padrão, o `DriverPool` inclui drivers para interagir com o sistema de arquivos local, bem como para interagir com sistemas de arquivos remotos via FTP ou HTTP. No entanto, você também pode adicionar seus próprios drivers personalizados ao `DriverPool` se precisar.

Obtém uma instancia da classe ```Magento\\Framework\\Config\\File\\ConfigFilePool``` que no Adobe Commerce é usada para gerenciar e centralizar o acesso aos arquivo de configuração env.php e config.php. Ao manter uma lista centralizada de arquivos de configuração, a `ConfigFilePool` ajuda a garantir que todas as partes da aplicação estejam trabalhando com as mesmas configurações. Isso é crucial para a consistência do comportamento da aplicação e para evitar a duplicação de dados de configuração. Também gerencia as variações dos arquivos de configuração: .dist.php e .local.php.

Bom uma vez instanciadas as classes auxiliares são injetadas na classe ```\\Magento\\Framework\\App\\ObjectManagerFactory``` que obviamente retorna uma instancia do ObjectManager.

E para finalizar o método "create" vemos que no final é dado um new na própria classe Bootstrap através de [self](https://www.php.net/manual/en/language.oop5.paamayim-nekudotayim.php); Passando uma instancia da factory do ObjectManager, a pasta root da aplicação e o atributo $initParams retornando lá no arquivo /pub/index.php temos uma instancia da classe Bootstrap com as configurações do ambiente.

............

Cansou? Muita coisa para absorver? Observe que até aqui vimos apenas a explicação apenas dos 3 primeiros pontos da lista:

1. **Ponto de Entrada**

3. **Bootstrap**

5. **Configuração do Ambiente**

Durante essa primeira parte, exploramos um conjunto inicial de pontos que considero fundamentais para uma compreensão de todo o processo de bootstrap do Adobe Commerce. Vimos como funcionam os arquivos /pub/index.php, /app/boostrap.php e /app/autoload.php no detalhe.

Além disso, abordamos o singleton da classe Magento\\Framework\\App\\Bootstrap e mais especificamente o método create responsável por retornar uma instancia da própria classe Bootstrap que como veremos no próximo capitulo será usada para criar uma instancia da aplicação e executar ela fechando assim os próximos 3 tópicos:

1. **Criação da Aplicação**

3. **Execução da Aplicação**

5. **Front Controller e Roteamento**.

Bom espero que tenha gostado e que de alguma maneira este conteúdo tenha te ajudado a entender o que ocorre na camada de baixo nível do dobe commerce.

Em breve disponibilizarei a continuação deste conteúdo. Se tiverem duvidas ou quiserem contribuir com algum ponto, deixem nos comentários.

Abraços.
